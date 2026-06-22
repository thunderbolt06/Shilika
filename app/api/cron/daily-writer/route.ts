import { requireCronAuth, withRunLedger } from '@/lib/cron-auth';
import { submitWriterBatch } from '@/lib/agents/batch-pipeline';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

/**
 * Submit the top P0/P1 idea to the writer as an async Anthropic batch. The
 * draft + hero image are finalized later by /api/cron/batch-poller once the
 * batch completes (usually within the hour).
 */
export async function GET(request: Request) {
  const unauthorized = requireCronAuth(request);
  if (unauthorized) return unauthorized;

  return withRunLedger<Record<string, unknown>>('daily-writer', async () => {
    const supabase = getAdminSupabase();
    const { data: nextIdea } = await supabase
      .from('content_ideas')
      .select('id, title, priority')
      .eq('status', 'idea')
      .order('priority', { ascending: true })
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (!nextIdea) {
      return { status: 'success', summary: { ran: false, reason: 'no idea in queue' } };
    }

    const result = await submitWriterBatch([nextIdea.id]);
    if (!result.batch_id) {
      return {
        status: 'partial',
        summary: { ran: false, reason: 'failed to build writer request', skipped: result.skipped },
      };
    }

    return {
      status: 'success',
      summary: {
        ran: true,
        submitted: result.submitted,
        batch_id: result.batch_id,
        idea_id: nextIdea.id,
        title: nextIdea.title,
        priority: nextIdea.priority,
        note: 'draft will be finalized by batch-poller once the batch completes',
      },
    };
  });
}
