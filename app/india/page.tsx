import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'India Web3 & AI PR 2026: Inc42, Economic Times, Forbes India',
  description: 'India PR for Web3 and AI founders. Home-market exclusives in Inc42, YourStory, Economic Times, Forbes India, Mint. SEBI-aware framing, ETHIndia leverage.',
  alternates: { canonical: `${SITE_URL}/india` },
  openGraph: {
    title: 'India Web3 & AI PR 2026: Inc42, Economic Times, Forbes India',
    description: 'India PR for Web3 and AI founders. Inc42, YourStory, Economic Times, Forbes India, Mint, Moneycontrol. SEBI-aware framing, $626M India Web3 funding context, ETHIndia leverage.',
    url: `${SITE_URL}/india`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Web3 & AI PR 2026: Inc42, Economic Times, Forbes India',
    description: 'India PR for Web3 and AI founders. Home-market exclusives + crypto-native tracks. Bullieverse, RARI, MANTRA, Web3Auth proof.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/india-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/india-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="india-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
