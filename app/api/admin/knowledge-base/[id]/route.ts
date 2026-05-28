import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminSupabase } from '@/lib/supabase/server';

const KINDS = [
  'case_study',
  'human_note',
  'transcript',
  'snippet',
  'brand_voice',
  'long_tail_seed',
] as const;

const UpdateSchema = z.object({
  title: z.string().min(1).max(300).optional(),
  kind: z.enum(KINDS).optional(),
  body: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).optional(),
  source_url: z.string().url().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).nullable().optional(),
});

type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from('knowledge_base')
    .update(parsed.data)
    .eq('id', id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = getAdminSupabase();
  const { error } = await supabase.from('knowledge_base').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
