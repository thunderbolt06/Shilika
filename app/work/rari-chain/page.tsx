import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'RARI Chain Mainnet Case Study: 11 Tier-1 Placements in 24h',
  description: 'How Shilika Jain ran RARI Chain mainnet on Arbitrum: 11 Tier-1 placements, 9-day CoinDesk embargo, NFT royalty enforcement as the category angle.',
  
  alternates: { canonical: 'https://www.shilikajain.com/work/rari-chain' },
  openGraph: {
    title: 'RARI Chain Mainnet Launch: 11 Tier-1 Placements in 24 Hours',
    description: 'CoinDesk exclusive, The Block, The Defiant, Cointelegraph, CryptoNews. A 2024 mainnet PR campaign teardown by Shilika Jain, fractional PR manager.',
    url: 'https://www.shilikajain.com/work/rari-chain',
    type: 'article',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RARI Chain Mainnet Launch: 11 Tier-1 Placements in 24 Hours',
    description: 'CoinDesk exclusive, The Block, The Defiant, Cointelegraph, CryptoNews. A 2024 mainnet PR campaign teardown by Shilika Jain, fractional PR manager.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/work__rari-chain-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/work__rari-chain-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="work-rari-chain-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
