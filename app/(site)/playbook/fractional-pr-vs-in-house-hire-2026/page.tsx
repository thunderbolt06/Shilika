import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Fractional PR vs Hiring an In-House PR Lead in 2026',
  description: 'The build-vs-rent decision for comms. Cost, speed, seniority and risk compared, with a decision tree for founders at each stage.',
  alternates: { canonical: `${SITE_URL}/playbook/fractional-pr-vs-in-house-hire-2026` },
  openGraph: {
    title: 'Fractional PR vs Hiring an In-House PR Lead in 2026',
    description: 'The build-vs-rent decision for comms. Cost, speed, seniority and risk compared, with a decision tree for founders at each stage.',
    url: `${SITE_URL}/playbook/fractional-pr-vs-in-house-hire-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/compare.jpg`,
        width: 1200,
        height: 630,
        alt: 'Which PR agency to hire for crypto and AI. Side-by-side comparisons with the trade-offs spelled out. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional PR vs Hiring an In-House PR Lead in 2026',
    description: 'The build-vs-rent decision for comms. Cost, speed, seniority and risk compared, with a decision tree for founders at each stage.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/compare.jpg`,
        alt: 'Which PR agency to hire for crypto and AI. Side-by-side comparisons with the trade-offs spelled out. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-79-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-79-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="playbook-79-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-79.js" strategy="afterInteractive" />
    </>
  );
}
