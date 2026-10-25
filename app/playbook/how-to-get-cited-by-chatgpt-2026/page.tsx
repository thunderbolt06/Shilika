import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Get Cited by ChatGPT in 2026',
  description: 'Citations come from trust signals AI engines can extract. The concrete tactics that turn earned coverage into answer-engine mentions.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-get-cited-by-chatgpt-2026` },
  openGraph: {
    title: 'How to Get Cited by ChatGPT in 2026',
    description: 'Citations come from trust signals AI engines can extract. The concrete tactics that turn earned coverage into answer-engine mentions.',
    url: `${SITE_URL}/playbook/how-to-get-cited-by-chatgpt-2026`,
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
    title: 'How to Get Cited by ChatGPT in 2026',
    description: 'Citations come from trust signals AI engines can extract. The concrete tactics that turn earned coverage into answer-engine mentions.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/ai.jpg`,
        alt: 'AI PR with analyst-grade credibility. Tier-1 AI coverage, plus the AI-search work that gets you cited. Photo: Shilika Jain speaking on stage with a microphone in front of a presentation screen.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-96-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-96-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="playbook-96-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-96.js" strategy="afterInteractive" />
    </>
  );
}
