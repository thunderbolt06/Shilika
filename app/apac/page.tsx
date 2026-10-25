import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { languageAlternates } from '@/lib/i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'APAC PR Agency 2026: Korea, Japan, India',
  description: 'APAC PR for Web3, AI and cybersecurity founders. Native placements across Seoul, Tokyo, Mumbai, Singapore and Dubai. Six markets, one senior operator.',
  alternates: { canonical: `${SITE_URL}/apac`, languages: languageAlternates('/apac') },
  openGraph: {
    title: 'APAC PR Agency 2026: Korea, Japan, India',
    description: 'APAC PR for Web3, AI and cybersecurity founders. Native placements across BloomingBit, TokenPost, CryptoTimes JP, ChainCatcher, Inc42, Cointelegraph Arabic. Country pages for Korea, Japan, India, Singapore, Dubai-MENA.',
    url: `${SITE_URL}/apac`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/apac.jpg`,
        width: 1200,
        height: 630,
        alt: 'APAC PR that is not a translated press release. Korea, Japan, India, Singapore and MENA. Photo: Shilika Jain leaning on the Marina Bay railing with the Singapore skyline across the water.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APAC PR Agency 2026: Korea, Japan, India',
    description: 'APAC PR for Web3, AI and cybersecurity founders. Six markets across APAC plus MENA. Native placements, regional KOL waves, on-ground access.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/apac.jpg`,
        alt: 'APAC PR that is not a translated press release. Korea, Japan, India, Singapore and MENA. Photo: Shilika Jain leaning on the Marina Bay railing with the Singapore skyline across the water.',
      },
    ],
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
      <script id="apac-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
