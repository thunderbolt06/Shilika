import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Fractional PR Cost and Monthly Retainer Pricing in 2026',
  description: 'What fractional PR really costs, what a retainer should include, and how to tell a fair price from an underqualified one.',
  alternates: { canonical: `${SITE_URL}/playbook/fractional-pr-cost-pricing-2026` },
  openGraph: {
    title: 'Fractional PR Cost and Monthly Retainer Pricing in 2026',
    description: 'What fractional PR really costs, what a retainer should include, and how to tell a fair price from an underqualified one.',
    url: `${SITE_URL}/playbook/fractional-pr-cost-pricing-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/services.jpg`,
        width: 1200,
        height: 630,
        alt: 'Web3 & AI PR, founder profiling, KOL marketing. Fractional PR from a senior operator. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional PR Cost and Monthly Retainer Pricing in 2026',
    description: 'What fractional PR really costs, what a retainer should include, and how to tell a fair price from an underqualified one.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/services.jpg`,
        alt: 'Web3 & AI PR, founder profiling, KOL marketing. Fractional PR from a senior operator. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-77-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-77-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="playbook-77-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-77.js" strategy="afterInteractive" />
    </>
  );
}
