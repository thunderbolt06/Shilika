import { NextResponse } from 'next/server';
import { parseXlsx } from '@/lib/blog-excel';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'file required' }, { status: 400 });
  }
  const buffer = await file.arrayBuffer();
  const result = parseXlsx(buffer);
  return NextResponse.json(result);
}
