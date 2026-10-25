import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Blockchain Gaming PR Agency 2026 | Dual-Track Comms',
  description: 'Dual-track PR for gamers and crypto media, with the Bullieverse India launch as the worked example. Built for Web3 studios and game launches.',
  alternates: { canonical: `${SITE_URL}/pages/blockchain-gaming-pr-agency` },
  openGraph: {
    title: 'Blockchain Gaming PR Agency 2026 | Dual-Track Comms',
    description: 'Dual-track PR for gamers and crypto media, with the Bullieverse India launch as the worked example. Built for Web3 studios and game launches.',
    url: `${SITE_URL}/pages/blockchain-gaming-pr-agency`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/web3.jpg`,
        width: 1200,
        height: 630,
        alt: 'Web3 PR that lands Tier-1 headlines. Forbes, CoinDesk, Cointelegraph, Decrypt and The Block. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blockchain Gaming PR Agency 2026 | Dual-Track Comms',
    description: 'Dual-track PR for gamers and crypto media, with the Bullieverse India launch as the worked example. Built for Web3 studios and game launches.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/web3.jpg`,
        alt: 'Web3 PR that lands Tier-1 headlines. Forbes, CoinDesk, Cointelegraph, Decrypt and The Block. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__blockchain-gaming-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__blockchain-gaming-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="lp-blockchain-gaming-pr-agency-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
