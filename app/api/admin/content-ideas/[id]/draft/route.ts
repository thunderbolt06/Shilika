import { NextResponse } from 'next/server';
import { runDraftPipeline } from '@/lib/agents/pipeline';

export const runtime = 'nodejs';
export const maxDuration = 300; // up to 5 minutes for the writer + image gen

type Params = Promise<{ id: string }>;

export async function POST(_req: Request, { params }: { params: Params }) {
  const { id } = await params;
  try {
    const result = await runDraftPipeline(Number(id));
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
