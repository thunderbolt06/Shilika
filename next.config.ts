import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'yzgaxyxoosazxfnsyqta.supabase.co' },
      { protocol: 'https', hostname: 'www.shilikajain.com' },
      { protocol: 'https', hostname: 'shilikajain.com' },
    ],
  },
  async rewrites() {
    // Phase 1: route the legacy static HTML pages through public/ with clean URLs.
    // Phase 2 will replace these with native Next.js routes.
    const pages = [
      'about',
      'ads',
      'testimonials',
      'article-1',
      'article-2',
      'article-3',
      'article-4',
      'article-5',
      'article-6',
      'article-7',
      'article-8',
    ];
    const services = [
      'ai-startup-pr',
      'apac-pr',
      'content-writing',
      'cybersecurity-pr',
      'founder-profiling',
      'kol-marketing',
      'token-launch-pr',
      'web3-pr-campaigns',
    ];
    const work = [
      'bullieverse',
      'fluence',
      'gaia-ai',
      'mantra-chain',
      'rari-chain',
      'web3auth',
    ];

    return [
      ...pages.map((p) => ({ source: `/${p}`, destination: `/${p}.html` })),
      ...services.map((s) => ({ source: `/services/${s}`, destination: `/services/${s}.html` })),
      ...work.map((w) => ({ source: `/work/${w}`, destination: `/work/${w}.html` })),
    ];
  },
  async headers() {
    return [
      {
        source: '/api/markdown/blog/:slug',
        headers: [
          { key: 'Content-Type', value: 'text/markdown; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600' },
        ],
      },
      {
        source: '/assets/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/markdown; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
