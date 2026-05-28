import { NextResponse } from 'next/server';
import { getAdminSupabase } from '@/lib/supabase/server';

export const runtime = 'nodejs';
type Params = Promise<{ id: string }>;

export async function POST(_req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from('content_ideas')
    .update({ status: 'archived', reviewed_at: new Date().toISOString() })
    .eq('id', Number(id))
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
