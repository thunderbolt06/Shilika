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

const EntrySchema = z.object({
  title: z.string().min(1).max(300),
  kind: z.enum(KINDS),
  body: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  source_url: z.string().url().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).nullable().optional(),
});

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const supabase = getAdminSupabase();
  const url = new URL(request.url);
  const kind = url.searchParams.get('kind');
  const search = url.searchParams.get('q');

  let q = supabase
    .from('knowledge_base')
    .select('*')
    .order('updated_at', { ascending: false });

  if (kind && (KINDS as readonly string[]).includes(kind)) {
    q = q.eq('kind', kind);
  }

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let rows = data ?? [];
  if (search) {
    const s = search.toLowerCase();
    rows = rows.filter(
      (r) =>
        r.title.toLowerCase().includes(s) ||
        r.body.toLowerCase().includes(s) ||
        r.tags?.some((t: string) => t.toLowerCase().includes(s)),
    );
  }

  return NextResponse.json({ rows });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = EntrySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from('knowledge_base')
    .insert(parsed.data)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
