import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Web3 PR Campaigns 2026: Tier-1 Placements, Senior Operator',
  description: 'Fractional Web3 PR consultant. Tier-1 campaigns end-to-end: positioning, embargos, journalist outreach, KOL waves, AEO. 50+ protocols. Book a 30-min teardown.',
  
  alternates: { canonical: 'https://www.shilikajain.com/services/web3-pr-campaigns' },
  openGraph: {
    title: 'Web3 PR Campaigns 2026: Tier-1 Placements, Senior Operator',
    description: 'Fractional Web3 PR consultant. Strategic campaigns from positioning thesis to Tier-1 placement. Forbes, CoinDesk, Cointelegraph, Decrypt. 50+ protocols shaped.',
    url: 'https://www.shilikajain.com/services/web3-pr-campaigns',
    type: 'website',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 PR Campaigns 2026: Tier-1 Placements, Senior Operator',
    description: 'Fractional Web3 PR consultant. Strategic campaigns from positioning thesis to Tier-1 placement. Forbes, CoinDesk, Cointelegraph, Decrypt. 50+ protocols shaped.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__web3-pr-campaigns-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__web3-pr-campaigns-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
