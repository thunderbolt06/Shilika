import { NextResponse } from 'next/server';

const ALLOWED = new Set([
  'queue-filler',
  'daily-writer',
  'hourly-publisher',
  'cross-poster',
  'gsc-daily-pull',
  'ga-daily-pull',
  'seo-content-analysis',
]);

export const runtime = 'nodejs';
export const maxDuration = 300;

type Params = Promise<{ name: string }>;

/**
 * Manual trigger for any cron, gated by the admin middleware. Fires the
 * actual cron route with the configured CRON_SECRET so it produces a real
 * cron_runs ledger entry.
 */
export async function POST(request: Request, { params }: { params: Params }) {
  const { name } = await params;
  if (!ALLOWED.has(name)) {
    return NextResponse.json({ error: `unknown cron: ${name}` }, { status: 400 });
  }
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 500 });
  }
  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`;
  const target = `${origin}/api/cron/${name}${name === 'queue-filler' ? '?force=1' : ''}`;
  const res = await fetch(target, {
    headers: { Authorization: `Bearer ${secret}` },
    cache: 'no-store',
  });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { 'Content-Type': res.headers.get('content-type') ?? 'application/json' },
  });
}
