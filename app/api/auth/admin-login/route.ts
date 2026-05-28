import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, ADMIN_TTL, checkAdminPassword, issueSessionToken } from '@/lib/admin-session';

export async function POST(request: Request) {
  let body: { password?: string; next?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 });
  }

  if (!checkAdminPassword(body.password)) {
    // Constant-time mismatch — avoid leaking which guess was close.
    return NextResponse.json({ error: 'wrong password' }, { status: 401 });
  }

  const token = await issueSessionToken();
  const res = NextResponse.json({
    ok: true,
    next: body.next && body.next.startsWith('/admin') ? body.next : '/admin',
  });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ADMIN_TTL,
  });
  return res;
}
