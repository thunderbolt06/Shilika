import { NextResponse } from 'next/server';
import { ContentIdeaUpdate } from '@/lib/blog-schemas';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';
type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = ContentIdeaUpdate.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from('content_ideas')
    .update(parsed.data)
    .eq('id', Number(id))
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = getAdminSupabase();
  const { error } = await supabase.from('content_ideas').delete().eq('id', Number(id));
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
