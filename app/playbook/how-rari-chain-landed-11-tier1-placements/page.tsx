import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Land 11 Tier-1 Placements in 24 Hours (2026)',
  description:
    'A step-by-step teardown of the launch-day PR method behind RARI Chain\'s 11-placement mainnet: sell a category not an announcement, give one outlet a real exclusive, pre-build and pre-brief the rest, hold a hard launch moment.',
  alternates: { canonical: `${SITE_URL}/playbook/how-rari-chain-landed-11-tier1-placements` },
  openGraph: {
    title: 'How to Land 11 Tier-1 Placements in 24 Hours: A Teardown',
    description:
      'The repeatable category-first launch method behind RARI Chain\'s 11 simultaneous tier-1 placements, rebuilt as a playbook for 2026.',
    url: `${SITE_URL}/playbook/how-rari-chain-landed-11-tier1-placements`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/work-rari-chain.jpg`,
        width: 1200,
        height: 630,
        alt: '11 Tier-1 placements in 24 hours. RARI Chain mainnet launch. Photo: Shilika Jain leaning on the Marina Bay railing with the Singapore skyline across the water.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Land 11 Tier-1 Placements in 24 Hours: A Teardown',
    description:
      'The repeatable category-first launch method behind RARI Chain\'s 11 simultaneous tier-1 placements, rebuilt as a playbook for 2026.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/work-rari-chain.jpg`,
        alt: '11 Tier-1 placements in 24 hours. RARI Chain mainnet launch. Photo: Shilika Jain leaning on the Marina Bay railing with the Singapore skyline across the water.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-117-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-117-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-117-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-117.js" strategy="afterInteractive" />
    </>
  );
}
