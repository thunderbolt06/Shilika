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
  async redirects() {
    // Legacy /article-N URLs were renamed to /playbook/N in Phase 8.
    // 301s preserve any inbound link equity from before the move.
    return [
      { source: '/article-1', destination: '/playbook/1', permanent: true },
      { source: '/article-2', destination: '/playbook/2', permanent: true },
      { source: '/article-3', destination: '/playbook/3', permanent: true },
      { source: '/article-4', destination: '/playbook/4', permanent: true },
      { source: '/article-5', destination: '/playbook/5', permanent: true },
      { source: '/article-6', destination: '/playbook/6', permanent: true },
      { source: '/article-7', destination: '/playbook/7', permanent: true },
      { source: '/article-8', destination: '/playbook/8', permanent: true },
    ];
  },
  async rewrites() {
    // /blog/<slug>.md serves the markdown alternate of the post.
    return [
      {
        source: '/blog/:slug.md',
        destination: '/api/markdown/blog/:slug',
      },
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
        source: '/blog/:slug.md',
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
