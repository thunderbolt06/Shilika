import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Compare Crypto PR Agencies in 2026',
  description: 'A practical framework for comparing crypto PR agencies side by side: access, seniority, model, reporting and price, with a scoring rubric.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-pr-agency-comparison-2026` },
  openGraph: {
    title: 'How to Compare Crypto PR Agencies in 2026',
    description: 'A practical framework for comparing crypto PR agencies side by side: access, seniority, model, reporting and price, with a scoring rubric.',
    url: `${SITE_URL}/playbook/crypto-pr-agency-comparison-2026`,
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
    title: 'How to Compare Crypto PR Agencies in 2026',
    description: 'A practical framework for comparing crypto PR agencies side by side: access, seniority, model, reporting and price, with a scoring rubric.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/compare.jpg`,
        alt: 'Which PR agency to hire for crypto and AI. Side-by-side comparisons with the trade-offs spelled out. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-109-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-109-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-109-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-109.js" strategy="afterInteractive" />
    </>
  );
}
