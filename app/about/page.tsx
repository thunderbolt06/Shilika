import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { languageAlternates } from '@/lib/i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'About Shilika Jain: Fractional PR for Web3 & AI Founders',
  description: 'Senior fractional PR for Web3, AI and cybersecurity founders. 6 years, 50+ protocols, 200+ KOLs. Forbes, CoinDesk, Decrypt placements. Book a teardown.',
  
  alternates: { canonical: 'https://www.shilikajain.com/about', languages: languageAlternates('/about') },
  openGraph: {
    title: 'About Shilika Jain: Fractional PR for Web3 & AI Founders',
    description: 'Six years placing Web3, AI and cybersecurity founders into Forbes, CoinDesk, Cointelegraph, Decrypt, Blockworks and AI Magazine. APAC operator. Currently leading PR at Myosin.',
    url: 'https://www.shilikajain.com/about',
    type: 'profile',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/about.jpg',
        width: 1200,
        height: 630,
        alt: 'The operator behind the Tier-1 placement. Six years of PR for Web3, crypto and AI startups. Photo: Shilika Jain in a pink satin shirt standing in a wood-panelled lounge with framed posters.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Shilika Jain: Fractional PR for Web3 & AI Founders',
    description: 'Six years placing Web3, AI and cybersecurity founders into Forbes, CoinDesk, Cointelegraph, Decrypt, Blockworks and AI Magazine. APAC operator. Currently leading PR at Myosin.',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/about.jpg',
        alt: 'The operator behind the Tier-1 placement. Six years of PR for Web3, crypto and AI startups. Photo: Shilika Jain in a pink satin shirt standing in a wood-panelled lounge with framed posters.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/about-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/about-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="about-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
