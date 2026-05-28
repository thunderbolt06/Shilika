import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { BlogPostInsert } from '@/lib/blog-schemas';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET() {
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ rows: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = BlogPostInsert.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(parsed.data)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (parsed.data.published) {
    revalidatePath('/blog');
    revalidatePath(`/blog/${parsed.data.slug}`);
    revalidatePath('/sitemap.xml');
  }
  return NextResponse.json(data);
}
