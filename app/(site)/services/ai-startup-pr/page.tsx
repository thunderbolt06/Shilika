import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'AI Startup PR in 2026: Fractional Senior Operator',
  description: 'Fractional PR for AI founders and CMOs. Forbes, AI Magazine, Decrypt placements. Category narrative, op-eds, podcast tour. Book a 30-min teardown.',
  
  alternates: { canonical: 'https://www.shilikajain.com/services/ai-startup-pr' },
  openGraph: {
    title: 'AI Startup PR in 2026: Fractional Senior Operator',
    description: 'Fractional PR for AI founders and CMOs. Forbes, AI Magazine, Decrypt. Named senior operator. The Gaia AI Forbes feature is the proof point.',
    url: 'https://www.shilikajain.com/services/ai-startup-pr',
    type: 'website',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/ai.jpg',
        width: 1200,
        height: 630,
        alt: 'AI PR with analyst-grade credibility. Tier-1 AI coverage, plus the AI-search work that gets you cited. Photo: Shilika Jain speaking on stage with a microphone in front of a presentation screen.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Startup PR in 2026: Fractional Senior Operator',
    description: 'Fractional PR for AI founders and CMOs. Forbes, AI Magazine, Decrypt. Named senior operator. The Gaia AI Forbes feature is the proof point.',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/ai.jpg',
        alt: 'AI PR with analyst-grade credibility. Tier-1 AI coverage, plus the AI-search work that gets you cited. Photo: Shilika Jain speaking on stage with a microphone in front of a presentation screen.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__ai-startup-pr-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__ai-startup-pr-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="services-ai-startup-pr-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
