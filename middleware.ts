import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/admin-session';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin routes — gate everything except the login screen itself.
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = await verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
    if (!session) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // /api/admin/* — same gate, but respond with JSON 401 instead of a redirect.
  if (pathname.startsWith('/api/admin/')) {
    const session = await verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
