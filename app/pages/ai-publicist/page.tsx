import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'AI Publicist 2026 | Specialist AI Founder PR',
  description: 'What an AI publicist should actually deliver, and the senior fractional model that delivers it: the technical story, tier-1 press and AI-search visibility.',
  alternates: { canonical: `${SITE_URL}/pages/ai-publicist` },
  openGraph: {
    title: 'AI Publicist 2026 | Specialist AI Founder PR',
    description: 'What an AI publicist should actually deliver, and the senior fractional model that delivers it: the technical story, tier-1 press and AI-search visibility.',
    url: `${SITE_URL}/pages/ai-publicist`,
    type: 'website',
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
    title: 'AI Publicist 2026 | Specialist AI Founder PR',
    description: 'What an AI publicist should actually deliver, and the senior fractional model that delivers it: the technical story, tier-1 press and AI-search visibility.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/ai.jpg`,
        alt: 'AI PR with analyst-grade credibility. Tier-1 AI coverage, plus the AI-search work that gets you cited. Photo: Shilika Jain speaking on stage with a microphone in front of a presentation screen.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__ai-publicist-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__ai-publicist-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-ai-publicist-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
