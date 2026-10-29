import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'RARI Chain Case Study: 11 Tier-1 Placements',
  description: 'How Shilika Jain ran RARI Chain mainnet on Arbitrum: 11 Tier-1 placements, 9-day CoinDesk embargo, NFT royalty enforcement as the category angle.',
  
  alternates: { canonical: 'https://www.shilikajain.com/work/rari-chain' },
  openGraph: {
    title: 'RARI Chain Mainnet Launch: 11 Tier-1 Placements in 24 Hours',
    description: 'CoinDesk exclusive, The Block, The Defiant, Cointelegraph, CryptoNews. A 2024 mainnet PR campaign teardown by Shilika Jain, fractional PR manager.',
    url: 'https://www.shilikajain.com/work/rari-chain',
    type: 'article',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/work-rari-chain.jpg',
        width: 1200,
        height: 630,
        alt: '11 Tier-1 placements in 24 hours. RARI Chain mainnet launch. Photo: Shilika Jain leaning on the Marina Bay railing with the Singapore skyline across the water.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RARI Chain Mainnet Launch: 11 Tier-1 Placements in 24 Hours',
    description: 'CoinDesk exclusive, The Block, The Defiant, Cointelegraph, CryptoNews. A 2024 mainnet PR campaign teardown by Shilika Jain, fractional PR manager.',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/work-rari-chain.jpg',
        alt: '11 Tier-1 placements in 24 hours. RARI Chain mainnet launch. Photo: Shilika Jain leaning on the Marina Bay railing with the Singapore skyline across the water.',
      },
    ],
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
      <script id="work-rari-chain-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
