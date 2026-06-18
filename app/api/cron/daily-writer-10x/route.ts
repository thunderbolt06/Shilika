import { requireCronAuth, withRunLedger } from '@/lib/cron-auth';
import { runDraftPipeline } from '@/lib/agents/pipeline';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

const MAX_IDEAS = 10;

type Processed = {
  idea_id: number;
  title: string;
  priority: number | null;
  ok: boolean;
  slug?: string;
  image_url?: string | null;
  humanization_passes?: number;
  final_violations?: number;
  error?: string;
};

/**
 * Batch variant of daily-writer: drains up to 10 of the top P0/P1 ideas in a
 * single run, writing a draft + hero image for each and marking it
 * ready_for_review. A per-idea failure is isolated so the rest of the batch
 * still ships; the run is reported `partial` if any idea failed.
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
      return { status: 'success', summary: { ran: false, reason: 'no idea in queue', processed: 0 } };
    }

    const processed: Processed[] = [];
    for (const idea of ideas) {
      try {
        const result = await runDraftPipeline(idea.id);
        processed.push({
          idea_id: idea.id,
          title: idea.title,
          priority: idea.priority,
          ok: true,
          slug: result.draft.slug,
          image_url: result.imageUrl,
          humanization_passes: result.humanizationPasses,
          final_violations: result.finalViolations,
        });
      } catch (err) {
        // runDraftPipeline already rolled the row back to 'idea'; keep going.
        processed.push({
          idea_id: idea.id,
          title: idea.title,
          priority: idea.priority,
          ok: false,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    const succeeded = processed.filter((p) => p.ok).length;
    const failed = processed.length - succeeded;

    return {
      status: failed > 0 ? 'partial' : 'success',
      summary: {
        ran: true,
        requested: MAX_IDEAS,
        processed: processed.length,
        succeeded,
        failed,
        results: processed,
      },
    };
  });
}
