import type { MetadataRoute } from 'next';
import { listPublishedPosts } from '@/lib/blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

const STATIC_PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/testimonials', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.9, changeFrequency: 'daily' },
  { path: '/services/web3-pr-campaigns', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/token-launch-pr', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/ai-startup-pr', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/apac-pr', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/kol-marketing', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/cybersecurity-pr', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/founder-profiling', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/content-writing', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/work/bullieverse', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/work/fluence', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/work/gaia-ai', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/work/mantra-chain', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/work/rari-chain', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/work/web3auth', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/article-1', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/article-2', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/article-3', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/article-4', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/article-5', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/article-6', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/article-7', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/article-8', priority: 0.6, changeFrequency: 'monthly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries = STATIC_PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    priority,
    changeFrequency,
  }));

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await listPublishedPosts();
    blogEntries = posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at),
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    }));
  } catch {
    // Supabase not reachable at build time — ship static-only sitemap and let
    // the next revalidation pick up the blog rows.
  }

  return [...staticEntries, ...blogEntries];
}
