import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

const PRIVATE = ['/admin', '/admin/*', '/api/admin/*', '/api/cron/*'];

const AI_BOTS = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'CCBot'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: ['/'], disallow: PRIVATE },
      // Explicit AI bot allow rules so they read the full site, including
      // /api/markdown/blog/* — the GEO-friendly alternate format.
      ...AI_BOTS.map((ua) => ({ userAgent: ua, allow: ['/'], disallow: PRIVATE })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
