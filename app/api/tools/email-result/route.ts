import { NextResponse } from 'next/server';
import { isEmailConfigured, sendLeadEmail, sendToolResultEmail } from '@/lib/email';
import { addLeadToNotion } from '@/lib/notion';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_RE = /^[a-z0-9-]{2,80}$/;

// Best-effort per-instance throttle. Serverless instances don't share it,
// but it stops a single client hammering one warm Lambda.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

function clean(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: pretend success, send nothing.
  if (clean(data.website, 200)) return NextResponse.json({ ok: true });

  const email = clean(data.email, 200);
  const slug = clean(data.slug, 80);
  const tool = clean(data.tool, 120);
  const result = clean(data.result, 20000);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 400 });
  }
  if (!SLUG_RE.test(slug) || !tool) {
    return NextResponse.json({ ok: false, error: 'Unknown tool.' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests. Try again in a few minutes.' }, { status: 429 });
  }

  const toolUrl = `${SITE_URL}/tools/${slug}`;
  const lead = {
    name: email.split('@')[0] || email,
    email,
    service: 'Free tool',
    source: `Tool: ${tool} (${toolUrl})`,
    message: result ? `Emailed their ${tool} result:\n\n${result.slice(0, 1800)}` : `Asked to hear about new tools from ${tool}.`,
  };

  const [userMail, notify, notion] = await Promise.allSettled([
    sendToolResultEmail({ to: email, toolName: tool, toolUrl, result }),
    isEmailConfigured() ? sendLeadEmail(lead) : Promise.resolve(),
    addLeadToNotion(lead),
  ]);

  if (notify.status === 'rejected') console.error('[tools/email-result] notify failed:', notify.reason);
  if (notion.status === 'rejected') console.error('[tools/email-result] notion failed:', notion.reason);
  if (userMail.status === 'rejected') {
    console.error('[tools/email-result] user email failed:', userMail.reason);
    return NextResponse.json(
      { ok: false, error: 'We could not send the email right now. Please copy your result instead.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
