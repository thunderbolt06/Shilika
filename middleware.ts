import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/admin-session';
import { classifyAiTraffic, logAiTraffic } from '@/lib/ai-traffic';

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // /admin routes - gate everything except the login screen itself.
  if (pathname.startsWith('/admin')) {
    if (pathname !== '/admin/login') {
      const session = await verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
      if (!session) {
        const loginUrl = new URL('/admin/login', req.url);
        loginUrl.searchParams.set('next', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
    return NextResponse.next();
  }

  // /api/admin/* - same gate, but respond with JSON 401 instead of a redirect.
  if (pathname.startsWith('/api/admin/')) {
    const session = await verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Public pages: log AI crawler hits and AI referrals. Never blocks and never
  // waits: the log runs after the response via waitUntil.
  const hit = classifyAiTraffic({
    userAgent: req.headers.get('user-agent'),
    referer: req.headers.get('referer'),
    utmSource: req.nextUrl.searchParams.get('utm_source'),
    path: pathname,
  });
  if (hit) event.waitUntil(logAiTraffic(hit));

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    // Public pages plus llms.txt, robots.txt and sitemap.xml. Skips Next
    // internals, other API routes, static assets and router prefetches.
    {
      source:
        '/((?!_next/|api/|admin|.*\\.(?:png|jpe?g|webp|avif|gif|svg|ico|css|js|map|json|woff2?|ttf|otf|mp4|webm|mp3|pdf|zip)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
