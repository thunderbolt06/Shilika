import { NextResponse } from 'next/server';
import { submitWriterBatch } from '@/lib/agents/batch-pipeline';

export const runtime = 'nodejs';
export const maxDuration = 60;

type Params = Promise<{ id: string }>;

/**
 * Manually queue a draft for an idea. The writer now runs through the async
 * Anthropic batch API, so this submits the batch and returns immediately — the
 * draft + hero image are finalized by the batch-poller cron once the batch
 * completes (usually within the hour). The idea moves to status 'draft' while
 * it's in flight and 'ready_for_review' once finalized.
 */
export async function POST(_req: Request, { params }: { params: Params }) {
  const { id } = await params;
  try {
    const result = await submitWriterBatch([Number(id)]);
    if (!result.batch_id) {
      const reason = result.skipped[0]?.error ?? 'failed to build writer request';
      return NextResponse.json({ error: reason }, { status: 500 });
    }
    return NextResponse.json({
      ok: true,
      status: 'submitted',
      batch_id: result.batch_id,
      note: 'Draft is generating via the batch API and will appear once the batch-poller finalizes it.',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
