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
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 PR Agency USA 2026 | Tier-1 Crypto & Mainstream',
    description: 'Cut through the most crowded crypto press market in the world with a senior operator who pitches, not an account team.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
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
      <Script id="lp-web3-pr-agency-usa-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
