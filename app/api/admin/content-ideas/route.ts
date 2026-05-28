import { NextResponse } from 'next/server';
import { ContentIdeaInsert } from '@/lib/blog-schemas';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const supabase = getAdminSupabase();
  const url = new URL(request.url);
  const status = url.searchParams.get('status');

  let q = supabase
    .from('content_ideas')
    .select('*')
    .order('priority', { ascending: true })
    .order('updated_at', { ascending: false });
  if (status) q = q.eq('status', status);

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ rows: data ?? [] });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = ContentIdeaInsert.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from('content_ideas')
    .insert(parsed.data)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
