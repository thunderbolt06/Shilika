import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Web3 PR Agency USA 2026 | Tier-1 Crypto & Mainstream',
  description: 'Cut through the most crowded crypto press market in the world with a senior operator who pitches, not an account team.',
  alternates: { canonical: `${SITE_URL}/pages/web3-pr-agency-usa` },
  openGraph: {
    title: 'Web3 PR Agency USA 2026 | Tier-1 Crypto & Mainstream',
    description: 'Cut through the most crowded crypto press market in the world with a senior operator who pitches, not an account team.',
    url: `${SITE_URL}/pages/web3-pr-agency-usa`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/press.jpg`,
        width: 1200,
        height: 630,
        alt: 'Where the stories land. Forbes, CoinDesk, Cointelegraph, Decrypt, The Block and more. Photo: Shilika Jain in front of a red Press Lounge wall at the Consensus conference.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 PR Agency USA 2026 | Tier-1 Crypto & Mainstream',
    description: 'Cut through the most crowded crypto press market in the world with a senior operator who pitches, not an account team.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/press.jpg`,
        alt: 'Where the stories land. Forbes, CoinDesk, Cointelegraph, Decrypt, The Block and more. Photo: Shilika Jain in front of a red Press Lounge wall at the Consensus conference.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__web3-pr-agency-usa-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__web3-pr-agency-usa-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="lp-web3-pr-agency-usa-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
