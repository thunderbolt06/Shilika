import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Korea Crypto PR Agency 2026 | KBW, BloomingBit, KOLs',
  description: 'Korea crypto PR after KBW 2026: BloomingBit and TokenPost placement, Korean KOLs, and a Korea Fintech Week (25 to 27 Nov) plan for $3K to $7K a month.',
  alternates: { canonical: `${SITE_URL}/pages/korea-crypto-pr-agency` },
  openGraph: {
    title: 'Korea Crypto PR Agency 2026 | KBW, BloomingBit, KOLs',
    description: 'Korea crypto PR after KBW 2026: BloomingBit and TokenPost placement, Korean KOLs, and a Korea Fintech Week (25 to 27 Nov) plan for $3K to $7K a month.',
    url: `${SITE_URL}/pages/korea-crypto-pr-agency`,
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
    title: 'Korea Crypto PR Agency 2026 | KBW, BloomingBit, KOLs',
    description: 'Korea crypto PR after KBW 2026: BloomingBit and TokenPost placement, Korean KOLs, and a Korea Fintech Week (25 to 27 Nov) plan for $3K to $7K a month.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/korea.jpg`,
        alt: 'Korea PR: the FSC frame is paragraph one. BloomingBit, TokenPost and KBW Seoul. Photo: Shilika Jain smiling mid-talk on stage, microphone in hand.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__korea-crypto-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__korea-crypto-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-korea-crypto-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
