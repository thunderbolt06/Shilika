import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { BlogPostUpdate } from '@/lib/blog-schemas';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';
type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = BlogPostUpdate.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from('blog_posts')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (data?.slug) revalidatePath(`/blog/${data.slug}`);
  revalidatePath('/blog');
  return NextResponse.json(data);
}

export async function DELETE(_req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = getAdminSupabase();
  const { data: row } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('id', id)
    .maybeSingle();
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (row?.slug) revalidatePath(`/blog/${row.slug}`);
  revalidatePath('/blog');
  revalidatePath('/sitemap.xml');
  return NextResponse.json({ ok: true });
}
