import { NextResponse } from 'next/server';
import { sendLeadEmail, isEmailConfigured, type LeadPayload } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: unknown, max = 2000): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if (clean(data.website) || clean(data._gotcha)) {
    return NextResponse.json({ ok: true });
  }

  const payload: LeadPayload = {
    name: clean(data.name, 200),
    email: clean(data.email, 200),
    company: clean(data.company, 200),
    service: clean(data.service, 120),
    stage: clean(data.stage, 120),
    timeline: clean(data.timeline, 120),
    budget: clean(data.budget, 120),
    region: clean(data.region, 200),
    message: clean(data.message, 5000),
    source: clean(data.source, 300),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json(
      { ok: false, error: 'Name, email, and message are required.' },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(payload.email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 400 });
  }

  if (!isEmailConfigured()) {
    // Don't lose the lead in logs if email isn't wired yet.
    console.error('[contact] email not configured; lead received:', JSON.stringify(payload));
    return NextResponse.json(
      { ok: false, error: 'Email service is not configured yet.' },
      { status: 503 },
    );
  }

  try {
    await sendLeadEmail(payload);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed:', err);
    return NextResponse.json({ ok: false, error: 'Could not send. Try again.' }, { status: 502 });
  }
}
