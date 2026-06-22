import 'server-only';
import Anthropic from '@anthropic-ai/sdk';
import { withRetry } from '@/lib/retry';

/**
 * Thin wrapper around the Anthropic Message Batches API
 * (`client.beta.messages.batches.*`).
 *
 * The agents (writer, topic-research) no longer call `messages.create`
 * synchronously. They build request params, hand them here to be submitted as
 * an async batch (50% cheaper, results within ~1h, max 24h), and a separate
 * poll cron retrieves the results. See lib/agents/batch-pipeline.ts.
 */

export type AnthropicBatchRequest = {
  // Must be unique within a batch. We use it to map results back to work
  // (e.g. `idea-42`). Anthropic may return results out of order.
  custom_id: string;
  // Messages API creation params (model, max_tokens, system, messages, tools).
  // Typed loosely because we pass server-tool definitions the strict beta
  // param types don't cleanly model.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
};

export type BatchProcessingStatus = 'in_progress' | 'canceling' | 'ended';

export type BatchResultOutcome = 'succeeded' | 'errored' | 'canceled' | 'expired';

export type BatchResult = {
  custom_id: string;
  outcome: BatchResultOutcome;
  // Populated only when outcome === 'succeeded'.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  message: any | null;
  error?: string;
};

function client(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY missing — required for the batch API');
  }
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

/** Submit a batch and return its server-assigned id. */
export async function submitAnthropicBatch(
  requests: AnthropicBatchRequest[],
  label = 'anthropic-batch:submit',
): Promise<string> {
  if (requests.length === 0) throw new Error('cannot submit an empty batch');
  const c = client();
  const batch = await withRetry(
    () => c.beta.messages.batches.create({ requests }),
    { label },
  );
  return batch.id;
}

/** Current processing status of a batch ('ended' once all requests finished). */
export async function getAnthropicBatchStatus(batchId: string): Promise<BatchProcessingStatus> {
  const c = client();
  const batch = await withRetry(
    () => c.beta.messages.batches.retrieve(batchId),
    { label: 'anthropic-batch:status' },
  );
  return batch.processing_status;
}

/**
 * Stream the individual results of a completed batch. Each yields a normalized
 * {custom_id, outcome, message} regardless of the underlying result variant.
 */
export async function* iterateAnthropicBatchResults(
  batchId: string,
): AsyncGenerator<BatchResult> {
  const c = client();
  const results = await c.beta.messages.batches.results(batchId);
  for await (const r of results) {
    const result = r.result;
    if (result.type === 'succeeded') {
      yield { custom_id: r.custom_id, outcome: 'succeeded', message: result.message };
    } else if (result.type === 'errored') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = (result as any).error;
      const detail = err?.error?.message ?? (typeof err === 'string' ? err : JSON.stringify(err));
      yield {
        custom_id: r.custom_id,
        outcome: 'errored',
        message: null,
        error: String(detail).slice(0, 480),
      };
    } else {
      // 'canceled' | 'expired'
      yield { custom_id: r.custom_id, outcome: result.type, message: null };
    }
  }
}
