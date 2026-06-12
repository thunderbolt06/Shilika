import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Korea Web3 & AI PR 2026: BloomingBit, TokenPost, KBW Seoul',
  description: 'Korea PR for Web3 and AI founders. BloomingBit, TokenPost, BlockMedia, Yonhap. FSC and DABA-aware framing, KBW Seoul Sep 2026, Upbit listings.',
  alternates: { canonical: `${SITE_URL}/korea` },
  openGraph: {
    title: 'Korea Web3 & AI PR 2026: BloomingBit, TokenPost, KBW Seoul',
    description: 'Korea PR for Web3 and AI founders. BloomingBit, TokenPost, BlockMedia, Coinness, CoinReaders, Yonhap, Chosun Biz, Maeil Business. FSC and DABA-aware framing, Korea Blockchain Week Walkerhill Sep 29 to Oct 1 2026, KRW-stablecoin frame.',
    url: `${SITE_URL}/korea`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korea Web3 & AI PR 2026: BloomingBit, TokenPost, KBW Seoul',
    description: 'Korea PR for Web3 and AI founders. FSC-aware framing, KBW 2026 calendar, KRW-stablecoin and DABA anchor.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/korea-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/korea-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="korea-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
