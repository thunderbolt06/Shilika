import { requireCronAuth, withRunLedger } from '@/lib/cron-auth';
import { crossPostAll } from '@/lib/integrations/cross-post';
import { getAdminSupabase } from '@/lib/supabase/server';
import type { BlogPost } from '@/lib/supabase/types';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

type CrossPostMetadata = {
  cross_posted_at?: string;
  results?: unknown[];
};

export async function GET(request: Request) {
  const unauthorized = requireCronAuth(request);
  if (unauthorized) return unauthorized;

  return withRunLedger<Record<string, unknown>>('cross-poster', async () => {
    const supabase = getAdminSupabase();

    // Find posts published in the last 24 hours that haven't been cross-posted.
    // The marker lives in content_ideas.source_signals, since blog_posts has no
    // dedicated metadata column. We mirror onto cron_runs ledger for visibility.
    const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .gte('published_at', since);

    const candidates = (posts ?? []) as BlogPost[];

    // Tie cross-post status to content_ideas.notes (additive). Skip posts that
    // already have a cross-post marker.
    const { data: ideas } = await supabase
      .from('content_ideas')
      .select('slug, source_signals')
      .in('slug', candidates.map((c) => c.slug));
    const alreadyCrossposted = new Set<string>();
    for (const i of ideas ?? []) {
      const meta = (i.source_signals as CrossPostMetadata) ?? {};
      if (meta.cross_posted_at && i.slug) alreadyCrossposted.add(i.slug);
    }

    const results: {
      slug: string;
      platforms: Awaited<ReturnType<typeof crossPostAll>>;
    }[] = [];

    for (const post of candidates) {
      if (alreadyCrossposted.has(post.slug)) continue;
      const platforms = await crossPostAll(post);
      results.push({ slug: post.slug, platforms });

      // Record the marker so future runs skip this post.
      await supabase
        .from('content_ideas')
        .update({
          source_signals: {
            cross_posted_at: new Date().toISOString(),
            results: platforms,
          },
        })
        .eq('slug', post.slug);
    }

    const anyError = results.some((r) => r.platforms.some((p) => p.status === 'error'));
    return {
      status: (anyError ? 'partial' : 'success') as 'success' | 'partial',
      summary: {
        posts_evaluated: candidates.length,
        already_done: alreadyCrossposted.size,
        new_cross_posts: results.length,
        results,
      },
    };
  });
}
