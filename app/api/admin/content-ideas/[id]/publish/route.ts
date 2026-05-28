import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';
type Params = Promise<{ id: string }>;

/**
 * Promote an approved or ready_for_review idea to blog_posts and publish.
 * Used by the hourly publisher cron and the admin "publish now" button.
 */
export async function POST(_req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = getAdminSupabase();

  const { data: idea, error: ideaErr } = await supabase
    .from('content_ideas')
    .select('*')
    .eq('id', Number(id))
    .maybeSingle();
  if (ideaErr) return NextResponse.json({ error: ideaErr.message }, { status: 500 });
  if (!idea) return NextResponse.json({ error: 'not found' }, { status: 404 });
  if (!['approved', 'ready_for_review'].includes(idea.status)) {
    return NextResponse.json(
      { error: `cannot publish from status '${idea.status}'` },
      { status: 400 },
    );
  }
  if (!idea.body || !idea.slug || !idea.title) {
    return NextResponse.json({ error: 'idea is missing required fields' }, { status: 400 });
  }

  // Upsert into blog_posts by slug — keeps re-runs idempotent.
  const { data: post, error: postErr } = await supabase
    .from('blog_posts')
    .upsert(
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
    )
    .select()
    .single();
  if (postErr) return NextResponse.json({ error: postErr.message }, { status: 500 });

  await supabase
    .from('content_ideas')
    .update({
      status: 'published',
      published_url: `/blog/${idea.slug}`,
    })
    .eq('id', Number(id));

  revalidatePath('/blog');
  revalidatePath(`/blog/${idea.slug}`);
  revalidatePath('/sitemap.xml');
  revalidatePath('/');
  return NextResponse.json({ ok: true, post });
}
