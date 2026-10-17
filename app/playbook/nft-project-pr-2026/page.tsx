import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'PR for an NFT Project in 2026: Beyond the Hype Cycle',
  description: 'NFTs grew up. How to earn coverage for utility, IP and culture now that the speculative wave is over, with named outlets and angles.',
  alternates: { canonical: `${SITE_URL}/playbook/nft-project-pr-2026` },
  openGraph: {
    title: 'PR for an NFT Project in 2026: Beyond the Hype Cycle',
    description: 'NFTs grew up. How to earn coverage for utility, IP and culture now that the speculative wave is over, with named outlets and angles.',
    url: `${SITE_URL}/playbook/nft-project-pr-2026`,
    type: 'article',
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
    title: 'PR for an NFT Project in 2026: Beyond the Hype Cycle',
    description: 'NFTs grew up. How to earn coverage for utility, IP and culture now that the speculative wave is over, with named outlets and angles.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/web3.jpg`,
        alt: 'Web3 PR that lands Tier-1 headlines. Forbes, CoinDesk, Cointelegraph, Decrypt and The Block. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-31-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-31-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-31-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-31.js" strategy="afterInteractive" />
    </>
  );
}
