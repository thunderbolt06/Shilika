import 'server-only';
import { getAdminSupabase } from '@/lib/supabase/server';
import type { LlmBatch } from '@/lib/supabase/types';

/**
 * CRUD for the llm_batches ledger. Each row tracks one submitted Anthropic
 * Message Batch and the mapping from custom_id back to the work it represents.
 */

export type BatchKind = LlmBatch['kind'];

export async function recordBatch(args: {
  kind: BatchKind;
  batchId: string;
  requestMap: LlmBatch['request_map'];
  meta?: Record<string, unknown> | null;
}): Promise<void> {
  const supabase = getAdminSupabase();
  const { error } = await supabase.from('llm_batches').insert({
    provider: 'anthropic',
    kind: args.kind,
    batch_id: args.batchId,
    status: 'pending',
    request_map: args.requestMap,
    meta: args.meta ?? null,
  });
  if (error) throw new Error(`failed to record batch ${args.batchId}: ${error.message}`);
}

export async function listPendingBatches(): Promise<LlmBatch[]> {
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from('llm_batches')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });
  if (error) throw new Error(`failed to list pending batches: ${error.message}`);
  return (data ?? []) as LlmBatch[];
}

export async function markBatch(
  batchId: string,
  status: 'processed' | 'failed' | 'canceled',
  opts?: { resultSummary?: Record<string, unknown>; error?: string },
): Promise<void> {
  const supabase = getAdminSupabase();
  const now = new Date().toISOString();
  await supabase
    .from('llm_batches')
    .update({
      status,
      result_summary: opts?.resultSummary ?? null,
      error: opts?.error ?? null,
      processed_at: now,
      updated_at: now,
    })
    .eq('batch_id', batchId);
}
