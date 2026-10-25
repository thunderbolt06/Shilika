import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'AEO vs SEO: What Startups Actually Need in 2026',
  description: 'Answer-engine optimization is not a replacement for SEO, it\'s a layer on top. What\'s different, what overlaps, and where to spend first.',
  alternates: { canonical: `${SITE_URL}/playbook/aeo-vs-seo-startups-2026` },
  openGraph: {
    title: 'AEO vs SEO: What Startups Actually Need in 2026',
    description: 'Answer-engine optimization is not a replacement for SEO, it\'s a layer on top. What\'s different, what overlaps, and where to spend first.',
    url: `${SITE_URL}/playbook/aeo-vs-seo-startups-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/ai.jpg`,
        width: 1200,
        height: 630,
        alt: 'AI PR with analyst-grade credibility. Tier-1 AI coverage, plus the AI-search work that gets you cited. Photo: Shilika Jain speaking on stage with a microphone in front of a presentation screen.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AEO vs SEO: What Startups Actually Need in 2026',
    description: 'Answer-engine optimization is not a replacement for SEO, it\'s a layer on top. What\'s different, what overlaps, and where to spend first.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/ai.jpg`,
        alt: 'AI PR with analyst-grade credibility. Tier-1 AI coverage, plus the AI-search work that gets you cited. Photo: Shilika Jain speaking on stage with a microphone in front of a presentation screen.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-97-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-97-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="playbook-97-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-97.js" strategy="afterInteractive" />
    </>
  );
}
