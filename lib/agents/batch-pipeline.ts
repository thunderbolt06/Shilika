import 'server-only';
import {
  buildWriterRequest,
  parseWriterDraft,
  ideaIdFromCustomId,
} from './writer';
import { processTopicResearchMessage } from './topic-research';
import { finalizeWriterDraft, claimIdeaForWriter, rollbackIdea } from './pipeline';
import {
  submitAnthropicBatch,
  getAnthropicBatchStatus,
  iterateAnthropicBatchResults,
  type AnthropicBatchRequest,
} from './anthropic-batch';
import { recordBatch, listPendingBatches, markBatch } from './batch-store';
import type { LlmBatch } from '@/lib/supabase/types';

export type WriterSubmitResult = {
  batch_id: string | null;
  submitted: number;
  idea_ids: number[];
  skipped: { idea_id: number; error: string }[];
};

/**
 * Build a writer request per idea and submit them as one async batch. Returns
 * batch_id: null when there was nothing to submit (no ideas, or all failed to
 * build). The batch is finalized later by pollAndProcessBatches.
 */
export async function submitWriterBatch(ideaIds: number[]): Promise<WriterSubmitResult> {
  const requests: AnthropicBatchRequest[] = [];
  const idea_ids: number[] = [];
  const skipped: { idea_id: number; error: string }[] = [];

  for (const ideaId of ideaIds) {
    try {
      requests.push(await buildWriterRequest(ideaId));
      idea_ids.push(ideaId);
    } catch (err) {
      skipped.push({ idea_id: ideaId, error: err instanceof Error ? err.message : String(err) });
    }
  }

  if (requests.length === 0) {
    return { batch_id: null, submitted: 0, idea_ids: [], skipped };
  }

  const batchId = await submitAnthropicBatch(requests, 'anthropic-batch:writer');

  const requestMap: LlmBatch['request_map'] = {};
  for (const ideaId of idea_ids) requestMap[`idea-${ideaId}`] = { ideaId };
  await recordBatch({ kind: 'writer', batchId, requestMap });

  // Claim ideas only after the batch is safely recorded so a failed submit
  // never strands a row in 'draft'.
  for (const ideaId of idea_ids) await claimIdeaForWriter(ideaId);

  return { batch_id: batchId, submitted: idea_ids.length, idea_ids, skipped };
}

type BatchOutcome = {
  batch_id: string;
  kind: LlmBatch['kind'];
  status: 'processed' | 'failed' | 'pending';
  succeeded: number;
  failed: number;
  detail?: string;
};

async function processWriterBatch(row: LlmBatch): Promise<{ succeeded: number; failed: number }> {
  let succeeded = 0;
  let failed = 0;
  for await (const res of iterateAnthropicBatchResults(row.batch_id)) {
    const mapped = row.request_map[res.custom_id];
    const ideaId = mapped?.ideaId ?? ideaIdFromCustomId(res.custom_id);
    if (ideaId == null) continue; // unknown custom_id — nothing to finalize

    if (res.outcome === 'succeeded') {
      try {
        const parsed = parseWriterDraft(res.message);
        await finalizeWriterDraft({
          ideaId,
          draft: parsed.draft,
          imagePrompt: parsed.imagePrompt,
          finalViolations: parsed.finalViolations,
        });
        succeeded += 1;
      } catch (err) {
        await rollbackIdea(ideaId, err instanceof Error ? err.message : String(err));
        failed += 1;
      }
    } else {
      await rollbackIdea(ideaId, res.error ?? res.outcome);
      failed += 1;
    }
  }
  return { succeeded, failed };
}

async function processTopicResearchBatch(row: LlmBatch): Promise<{ succeeded: number; failed: number }> {
  let succeeded = 0;
  let failed = 0;
  for await (const res of iterateAnthropicBatchResults(row.batch_id)) {
    if (res.outcome === 'succeeded') {
      try {
        await processTopicResearchMessage(res.message);
        succeeded += 1;
      } catch (err) {
        console.warn('[batch-poller] topic-research process failed:', err);
        failed += 1;
      }
    } else {
      console.warn(`[batch-poller] topic-research request ${res.custom_id} ${res.outcome}: ${res.error ?? ''}`);
      failed += 1;
    }
  }
  return { succeeded, failed };
}

/**
 * Poll every pending batch. Batches still processing are left for a later run;
 * completed batches are finalized (drafts + hero images, or inserted ideas) and
 * marked processed. Used by the /api/cron/batch-poller cron.
 */
export async function pollAndProcessBatches(): Promise<{
  checked: number;
  processed: number;
  still_pending: number;
  outcomes: BatchOutcome[];
}> {
  const pending = await listPendingBatches();
  const outcomes: BatchOutcome[] = [];
  let processed = 0;
  let stillPending = 0;

  for (const row of pending) {
    try {
      const status = await getAnthropicBatchStatus(row.batch_id);
      if (status !== 'ended') {
        stillPending += 1;
        outcomes.push({ batch_id: row.batch_id, kind: row.kind, status: 'pending', succeeded: 0, failed: 0 });
        continue;
      }

      const counts =
        row.kind === 'writer'
          ? await processWriterBatch(row)
          : await processTopicResearchBatch(row);

      await markBatch(row.batch_id, 'processed', {
        resultSummary: { succeeded: counts.succeeded, failed: counts.failed },
      });
      processed += 1;
      outcomes.push({ batch_id: row.batch_id, kind: row.kind, status: 'processed', ...counts });
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      await markBatch(row.batch_id, 'failed', { error: detail }).catch(() => {});
      outcomes.push({ batch_id: row.batch_id, kind: row.kind, status: 'failed', succeeded: 0, failed: 0, detail });
    }
  }

  return { checked: pending.length, processed, still_pending: stillPending, outcomes };
}
