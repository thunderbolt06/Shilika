import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'APAC PR Agency 2026: Korea, Japan, India, Singapore, MENA',
  description: 'APAC PR for Web3, AI and cybersecurity founders. Native placements across Seoul, Tokyo, Mumbai, Singapore and Dubai. Six markets, one senior operator.',
  alternates: { canonical: `${SITE_URL}/apac` },
  openGraph: {
    title: 'APAC PR Agency 2026: Korea, Japan, India, Singapore, MENA',
    description: 'APAC PR for Web3, AI and cybersecurity founders. Native placements across BloomingBit, TokenPost, CryptoTimes JP, ChainCatcher, Inc42, Cointelegraph Arabic. Country pages for Korea, Japan, India, Singapore, Dubai-MENA.',
    url: `${SITE_URL}/apac`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APAC PR Agency 2026: Korea, Japan, India, Singapore, MENA',
    description: 'APAC PR for Web3, AI and cybersecurity founders. Six markets across APAC plus MENA. Native placements, regional KOL waves, on-ground access.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/apac-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/apac-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="apac-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
