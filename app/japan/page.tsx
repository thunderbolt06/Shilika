import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { languageAlternates } from '@/lib/i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Japan Web3 & AI PR 2026: CoinPost, Nikkei, WebX Tokyo',
  description: 'Japan PR for Web3 and AI founders. CoinPost, CoinDesk Japan, CryptoTimes JP, Nikkei, Asahi. FSA-aware framing, WebX Tokyo July 2026, NISA ETF channel.',
  alternates: { canonical: `${SITE_URL}/japan`, languages: languageAlternates('/japan') },
  openGraph: {
    title: 'Japan Web3 & AI PR 2026: CoinPost, Nikkei, WebX Tokyo',
    description: 'Japan PR for Web3 and AI founders. CoinPost, CoinDesk Japan, Cointelegraph Japan, CryptoTimes JP, Iolite, Nikkei, Asahi Shimbun. FSA-aware framing under the June 1 2026 Payment Services Act amendments, the FIEA reclassification track and the spot BTC/ETH ETF NISA pipeline. WebX 2026 The Prince Park Tower Tokyo, July 13 to 14.',
    url: `${SITE_URL}/japan`,
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
    title: 'Japan Web3 & AI PR 2026: CoinPost, Nikkei, WebX Tokyo',
    description: 'Japan PR for Web3 and AI founders. FSA-aware framing, WebX 2026 calendar, JPY-stablecoin and FIEA-reclassification anchor.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/japan.jpg`,
        alt: 'Japan PR: the FSA frame is paragraph one. CoinPost, Nikkei and WebX Tokyo. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/japan-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/japan-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="japan-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
