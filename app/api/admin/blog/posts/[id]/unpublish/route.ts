import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';
type Params = Promise<{ id: string }>;

export async function POST(_req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from('blog_posts')
    .update({ published: false })
    .eq('id', id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (data?.slug) revalidatePath(`/blog/${data.slug}`);
  revalidatePath('/blog');
  revalidatePath('/sitemap.xml');
  return NextResponse.json(data);
}
