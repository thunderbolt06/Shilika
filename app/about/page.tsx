import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'About Shilika Jain: Fractional PR for Web3 & AI Founders',
  description: 'Shilika Jain is a senior fractional PR manager for Web3, AI and cybersecurity founders. Six years, 50+ protocols, 100K+ mentions/quarter, 200+ KOLs. Forbes, CoinDesk, Cointelegraph, Decrypt, Blockworks, AI Magazine placements.',
  
  alternates: { canonical: 'https://www.shilikajain.com/about' },
  openGraph: {
    title: 'About Shilika Jain: Fractional PR for Web3 & AI Founders',
    description: 'Six years placing Web3, AI and cybersecurity founders into Forbes, CoinDesk, Cointelegraph, Decrypt, Blockworks and AI Magazine. APAC operator. Currently leading PR at Myosin.',
    url: 'https://www.shilikajain.com/about',
    type: 'profile',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Shilika Jain: Fractional PR for Web3 & AI Founders',
    description: 'Six years placing Web3, AI and cybersecurity founders into Forbes, CoinDesk, Cointelegraph, Decrypt, Blockworks and AI Magazine. APAC operator. Currently leading PR at Myosin.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
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
