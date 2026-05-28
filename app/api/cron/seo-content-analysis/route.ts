import { requireCronAuth, withRunLedger } from '@/lib/cron-auth';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 120;
export const dynamic = 'force-dynamic';

/**
 * Weekly cron. Joins GSC + GA + blog_posts into a brief that the queue-filler
 * reads on its next run. The brief is just a knowledge_base entry of kind
 * 'human_note' tagged with seo-brief, so the writer + topic-research agents
 * pick it up automatically.
 */
export async function GET(request: Request) {
  const unauthorized = requireCronAuth(request);
  if (unauthorized) return unauthorized;

  return withRunLedger<Record<string, unknown>>('seo-content-analysis', async () => {
    const supabase = getAdminSupabase();

    const since28 = new Date();
    since28.setUTCDate(since28.getUTCDate() - 28);
    const sinceStr = since28.toISOString().slice(0, 10);

    // Top opportunity queries
    const { data: gscRows } = await supabase
      .from('analytics_search_console')
      .select('query, page, impressions, clicks, avg_position, ctr')
      .gte('date', sinceStr)
      .gte('impressions', 50)
      .lt('ctr', 0.02)
      .order('impressions', { ascending: false })
      .limit(30);

    // Top + worst engaged posts
    const { data: gaRows } = await supabase
      .from('content_metrics')
      .select('post_id, page_path, sessions, engaged_sessions, avg_session_duration')
      .gte('date', sinceStr);

    const byPath = new Map<
      string,
      { sessions: number; engaged: number; duration: number; n: number }
    >();
    for (const r of gaRows ?? []) {
      const cur = byPath.get(r.page_path) ?? { sessions: 0, engaged: 0, duration: 0, n: 0 };
      cur.sessions += r.sessions ?? 0;
      cur.engaged += r.engaged_sessions ?? 0;
      cur.duration += Number(r.avg_session_duration ?? 0);
      cur.n += 1;
      byPath.set(r.page_path, cur);
    }
    const blogPages = [...byPath.entries()]
      .filter(([path]) => path.startsWith('/blog/'))
      .map(([path, m]) => ({
        path,
        sessions: m.sessions,
        engaged_rate: m.sessions ? m.engaged / m.sessions : 0,
        avg_duration: m.n ? m.duration / m.n : 0,
      }));

    const topBlog = [...blogPages].sort((a, b) => b.sessions - a.sessions).slice(0, 10);
    const lowEngaged = [...blogPages]
      .filter((b) => b.sessions >= 50 && b.engaged_rate < 0.4)
      .sort((a, b) => a.engaged_rate - b.engaged_rate)
      .slice(0, 10);

    const briefMd = [
      `# Weekly SEO brief — ${new Date().toISOString().slice(0, 10)}`,
      '',
      '## Opportunity queries (impressions high, CTR < 2%)',
      ...(gscRows ?? []).map(
        (r) =>
          `- "${r.query}" -> ${r.page ?? '(no page)'} | ${r.impressions} imp | pos ${Number(r.avg_position ?? 0).toFixed(1)} | CTR ${(Number(r.ctr ?? 0) * 100).toFixed(2)}%`,
      ),
      '',
      '## Top blog pages by sessions',
      ...topBlog.map(
        (p) =>
          `- ${p.path} | ${p.sessions} sessions | engaged ${(p.engaged_rate * 100).toFixed(1)}% | avg ${p.avg_duration.toFixed(0)}s`,
      ),
      '',
      '## Posts to rewrite (low engagement, decent traffic)',
      ...lowEngaged.map(
        (p) =>
          `- ${p.path} | ${p.sessions} sessions | engaged ${(p.engaged_rate * 100).toFixed(1)}%`,
      ),
      '',
      '_The topic-research agent reads this brief on its next run to weight rewrite-vs-new-topic decisions._',
    ].join('\n');

    // Persist as a knowledge_base entry so the writer pipeline can read it.
    const { error } = await supabase.from('knowledge_base').insert({
      title: `Weekly SEO brief — ${new Date().toISOString().slice(0, 10)}`,
      kind: 'human_note',
      body: briefMd,
      tags: ['seo-brief', 'auto-generated'],
      source_url: null,
      metadata: { generated_by: 'seo-content-analysis', generated_at: new Date().toISOString() },
    });
    if (error) throw new Error(`brief insert failed: ${error.message}`);

    return {
      status: 'success' as const,
      summary: {
        opportunity_queries: gscRows?.length ?? 0,
        top_blog_pages: topBlog.length,
        low_engagement_pages: lowEngaged.length,
      },
    };
  });
}
