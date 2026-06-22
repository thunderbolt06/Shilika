import { requireCronAuth, withRunLedger } from '@/lib/cron-auth';
import { submitWriterBatch } from '@/lib/agents/batch-pipeline';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

const MAX_IDEAS = 10;

/**
 * Batch variant of daily-writer: submits up to 10 of the top P0/P1 ideas to the
 * writer in a single async Anthropic batch. Drafts + hero images are finalized
 * later by /api/cron/batch-poller once the batch completes.
 */
export async function GET(request: Request) {
  const unauthorized = requireCronAuth(request);
  if (unauthorized) return unauthorized;

  return withRunLedger<Record<string, unknown>>('daily-writer-10x', async () => {
    const supabase = getAdminSupabase();
    const { data: ideas } = await supabase
      .from('content_ideas')
      .select('id, title, priority')
      .eq('status', 'idea')
      .order('priority', { ascending: true })
      .order('created_at', { ascending: true })
      .limit(MAX_IDEAS);

    if (!ideas || ideas.length === 0) {
      return { status: 'success', summary: { ran: false, reason: 'no idea in queue', submitted: 0 } };
    }

    const result = await submitWriterBatch(ideas.map((i) => i.id));
    if (!result.batch_id) {
      return {
        status: 'partial',
        summary: { ran: false, reason: 'failed to build writer requests', skipped: result.skipped },
      };
    }

    return {
      status: result.skipped.length > 0 ? 'partial' : 'success',
      summary: {
        ran: true,
        requested: ideas.length,
        submitted: result.submitted,
        batch_id: result.batch_id,
        idea_ids: result.idea_ids,
        skipped: result.skipped,
        note: 'drafts will be finalized by batch-poller once the batch completes',
      },
    };
  });
}
