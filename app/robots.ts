import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

const PRIVATE = ['/admin', '/admin/*', '/api/admin/*', '/api/cron/*'];

// AI answer-engine crawlers we explicitly welcome so Shilika's pages can be
// discovered and cited when buyers ask AI assistants about Web3, AI and
// cybersecurity PR. Each vendor runs separate user agents for training vs.
// live search vs. user-directed fetch, so they are listed by documented role.
// Verified against OpenAI, Anthropic, Perplexity and Google docs, Sep 2026.
const AI_BOTS = [
  // Search + citation crawlers: these are what surface and link us in AI answers
  'OAI-SearchBot', // ChatGPT search index + source links
  'ChatGPT-User', // ChatGPT live fetch on a user question
  'Claude-SearchBot', // Anthropic search index
  'Claude-User', // Claude live fetch on a user question
  'PerplexityBot', // Perplexity answer engine, cites sources with links
  // Model + data crawlers: broaden how AI models understand the Shilika entity
  'GPTBot', // OpenAI model training
  'ClaudeBot', // Anthropic model training
  'Google-Extended', // opt-in token for Gemini training + grounding
  'CCBot', // Common Crawl, feeds many open models
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: ['/'], disallow: PRIVATE },
      // Explicit AI bot allow rules so they read the full site, including
      // /api/markdown/blog/*, the GEO-friendly alternate format.
      ...AI_BOTS.map((ua) => ({ userAgent: ua, allow: ['/'], disallow: PRIVATE })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
