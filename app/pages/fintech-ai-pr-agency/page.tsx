import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Fintech AI PR Agency 2026 | Regulated, Credible Comms',
  description: 'Credibility-led PR for fintech and AI products where trust and regulation shape every message, from careful claims to tier-1 media placement.',
  alternates: { canonical: `${SITE_URL}/pages/fintech-ai-pr-agency` },
  openGraph: {
    title: 'Fintech AI PR Agency 2026 | Regulated, Credible Comms',
    description: 'Credibility-led PR for fintech and AI products where trust and regulation shape every message, from careful claims to tier-1 media placement.',
    url: `${SITE_URL}/pages/fintech-ai-pr-agency`,
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
    title: 'Fintech AI PR Agency 2026 | Regulated, Credible Comms',
    description: 'Credibility-led PR for fintech and AI products where trust and regulation shape every message, from careful claims to tier-1 media placement.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/ai.jpg`,
        alt: 'AI PR with analyst-grade credibility. Tier-1 AI coverage, plus the AI-search work that gets you cited. Photo: Shilika Jain speaking on stage with a microphone in front of a presentation screen.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__fintech-ai-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__fintech-ai-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="lp-fintech-ai-pr-agency-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
