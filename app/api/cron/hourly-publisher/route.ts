import { revalidatePath } from 'next/cache';
import { requireCronAuth, withRunLedger } from '@/lib/cron-auth';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 120;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const unauthorized = requireCronAuth(request);
  if (unauthorized) return unauthorized;

  return withRunLedger<Record<string, unknown>>('hourly-publisher', async () => {
    const supabase = getAdminSupabase();
    const { data: approved } = await supabase
      .from('content_ideas')
      .select('*')
      .eq('status', 'approved')
      .order('reviewed_at', { ascending: true });

    const published: { id: number; slug: string }[] = [];
    const errors: { id: number; error: string }[] = [];

    for (const idea of approved ?? []) {
      if (!idea.body || !idea.slug || !idea.title) {
        errors.push({ id: idea.id, error: 'missing body/slug/title' });
        continue;
      }

      const { error: upsertErr } = await supabase.from('blog_posts').upsert(
        {
          slug: idea.slug,
          title: idea.title,
          description: idea.description ?? '',
          body: idea.body,
          image: idea.image_url ?? null,
          author: 'Shilika Jain',
          author_slug: 'shilika-jain',
          tags: idea.tags ?? [],
          related_posts: idea.related_posts ?? [],
          published: true,
          published_at: new Date().toISOString(),
        },
        { onConflict: 'slug' },
      );
      if (upsertErr) {
        errors.push({ id: idea.id, error: upsertErr.message });
        continue;
      }

      await supabase
        .from('content_ideas')
        .update({ status: 'published', published_url: `/blog/${idea.slug}` })
        .eq('id', idea.id);
      revalidatePath(`/blog/${idea.slug}`);
      published.push({ id: idea.id, slug: idea.slug });
    }

    if (published.length) {
      revalidatePath('/blog');
      revalidatePath('/sitemap.xml');
      revalidatePath('/');
    }

    return {
      status: (errors.length ? 'partial' : 'success') as 'success' | 'partial',
      summary: {
        published_count: published.length,
        published,
        errors,
        approved_seen: approved?.length ?? 0,
      },
    };
  });
}
