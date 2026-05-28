import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'APAC Crypto PR 2026: Korea, Japan, Vietnam, India, MENA',
  description: 'APAC PR for Web3, AI and cybersecurity founders. Native placements in BloomingBit, TokenPost, CryptoTimes JP, ChainCatcher, Jinse, Inc42. Regional KOLs.',
  
  alternates: { canonical: 'https://www.shilikajain.com/services/apac-pr' },
  openGraph: {
    title: 'APAC Crypto PR 2026: Korea, Japan, Vietnam, India, MENA',
    description: 'APAC PR for Web3, AI and cybersecurity founders. Native-language placements across Korea, Japan, Vietnam, China, India, Singapore and MENA. Regional KOLs, on-ground events, local journalist databases. RARI, MANTRA, Bullieverse, Web3Auth proof.',
    url: 'https://www.shilikajain.com/services/apac-pr',
    type: 'website',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APAC Crypto PR 2026: Korea, Japan, Vietnam, India, MENA',
    description: 'APAC PR for Web3, AI and cybersecurity founders. Native-language placements across Korea, Japan, Vietnam, China, India, Singapore and MENA. Regional KOLs, on-ground events, local journalist databases. RARI, MANTRA, Bullieverse, Web3Auth proof.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__apac-pr-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__apac-pr-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="services-apac-pr-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
