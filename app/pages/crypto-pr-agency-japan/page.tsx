import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto PR Agency Japan 2026 | CryptoTimes JP, CoinPost',
  description: 'Native Japanese placement and a pitch approach built for how Japanese newsrooms actually work.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-pr-agency-japan` },
  openGraph: {
    title: 'Crypto PR Agency Japan 2026 | CryptoTimes JP, CoinPost',
    description: 'Native Japanese placement and a pitch approach built for how Japanese newsrooms actually work.',
    url: `${SITE_URL}/pages/crypto-pr-agency-japan`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/japan.jpg`,
        width: 1200,
        height: 630,
        alt: 'Japan PR: the FSA frame is paragraph one. CoinPost, Nikkei and WebX Tokyo. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto PR Agency Japan 2026 | CryptoTimes JP, CoinPost',
    description: 'Native Japanese placement and a pitch approach built for how Japanese newsrooms actually work.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/japan.jpg`,
        alt: 'Japan PR: the FSA frame is paragraph one. CoinPost, Nikkei and WebX Tokyo. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-pr-agency-japan-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-pr-agency-japan-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-pr-agency-japan-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
