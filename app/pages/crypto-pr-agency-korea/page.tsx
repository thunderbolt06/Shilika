import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto PR Agency Korea 2026 | BloomingBit',
  description: 'Native Korean placement and KOL access in the market that drives roughly half of Asia\'s crypto media traffic.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-pr-agency-korea` },
  openGraph: {
    title: 'Crypto PR Agency Korea 2026 | BloomingBit',
    description: 'Native Korean placement and KOL access in the market that drives roughly half of Asia\'s crypto media traffic.',
    url: `${SITE_URL}/pages/crypto-pr-agency-korea`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/korea.jpg`,
        width: 1200,
        height: 630,
        alt: 'Korea PR: the FSC frame is paragraph one. BloomingBit, TokenPost and KBW Seoul. Photo: Shilika Jain smiling mid-talk on stage, microphone in hand.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto PR Agency Korea 2026 | BloomingBit',
    description: 'Native Korean placement and KOL access in the market that drives roughly half of Asia\'s crypto media traffic.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/korea.jpg`,
        alt: 'Korea PR: the FSC frame is paragraph one. BloomingBit, TokenPost and KBW Seoul. Photo: Shilika Jain smiling mid-talk on stage, microphone in hand.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-pr-agency-korea-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-pr-agency-korea-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="lp-crypto-pr-agency-korea-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
