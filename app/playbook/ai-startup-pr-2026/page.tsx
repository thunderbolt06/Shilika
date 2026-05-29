import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'PR Strategy for AI Startups 2026: The Playbook',
  description:
    'A 14-minute PR playbook for AI startups in the 2026 funding environment. Positioning, narrative architecture, journalist mapping, AI Overviews citations and a Gaia AI worked example.',
  alternates: { canonical: `${SITE_URL}/playbook/ai-startup-pr-2026` },
  openGraph: {
    title: 'PR Strategy for AI Startups in 2026: The Playbook',
    description:
      'Positioning, narrative architecture, journalist mapping, AI Overviews citations, KOL waves and measurement for AI founders raising and scaling in 2026.',
    url: `${SITE_URL}/playbook/ai-startup-pr-2026`,
    type: 'article',
    publishedTime: '2026-05-29',
    modifiedTime: '2026-05-29',
    authors: ['Shilika Jain'],
    tags: ['AI startup PR', 'Generative engine optimization', 'AI Overviews', 'Founder profiling'],
    images: [
      {
        url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg',
        width: 1200,
        height: 628,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PR Strategy for AI Startups in 2026: The Playbook',
    description:
      'Positioning, narrative architecture, journalist mapping, AI Overviews citations and a Gaia AI worked example for AI founders in 2026.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-9-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-9-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script
        id="playbook-9-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
