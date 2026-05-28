import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { generateAndStoreHero } from '@/lib/images/pipeline';
import { buildHeroPrompt } from '@/lib/images/prompt';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 120;

const Body = z
  .object({
    ideaId: z.number().int().optional(),
    postId: z.string().uuid().optional(),
    promptOverride: z.string().min(20).optional(),
  })
  .refine((d) => d.ideaId !== undefined || d.postId !== undefined, {
    message: 'ideaId or postId required',
  });

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const parsed = Body.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = getAdminSupabase();

  let slug = '';
  let title = '';
  let description = '';
  let tags: string[] = [];

  if (parsed.data.ideaId !== undefined) {
    const { data } = await supabase
      .from('content_ideas')
      .select('slug, title, description, tags')
      .eq('id', parsed.data.ideaId)
      .maybeSingle();
    if (!data || !data.slug) {
      return NextResponse.json({ error: 'idea missing slug' }, { status: 400 });
    }
    slug = data.slug;
    title = data.title ?? '';
    description = data.description ?? '';
    tags = data.tags ?? [];
  } else if (parsed.data.postId) {
    const { data } = await supabase
      .from('blog_posts')
      .select('slug, title, description, tags')
      .eq('id', parsed.data.postId)
      .maybeSingle();
    if (!data) return NextResponse.json({ error: 'post not found' }, { status: 404 });
    slug = data.slug;
    title = data.title;
    description = data.description;
    tags = data.tags ?? [];
  }

  const prompt =
    parsed.data.promptOverride ?? buildHeroPrompt({ title, description, tags });

  try {
    const result = await generateAndStoreHero({ slug, prompt });

    if (parsed.data.ideaId !== undefined) {
      await supabase
        .from('content_ideas')
        .update({ image_url: result.url })
        .eq('id', parsed.data.ideaId);
    } else if (parsed.data.postId) {
      await supabase.from('blog_posts').update({ image: result.url }).eq('id', parsed.data.postId);
      revalidatePath(`/blog/${slug}`);
    }

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'image generation failed' },
      { status: 500 },
    );
  }
}
