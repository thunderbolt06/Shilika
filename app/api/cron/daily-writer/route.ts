import { requireCronAuth, withRunLedger } from '@/lib/cron-auth';
import { runDraftPipeline } from '@/lib/agents/pipeline';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

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

    const result = await runDraftPipeline(nextIdea.id);
    return {
      status: 'success',
      summary: {
        ran: true,
        idea_id: nextIdea.id,
        title: nextIdea.title,
        priority: nextIdea.priority,
        slug: result.draft.slug,
        image_url: result.imageUrl,
        humanization_passes: result.humanizationPasses,
        final_violations: result.finalViolations,
      },
    };
  });
}
