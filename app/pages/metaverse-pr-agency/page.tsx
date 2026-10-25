import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Metaverse PR Agency 2026 | Worlds, IP & Communities',
  description: 'Coverage for metaverse and immersive projects grounded in product and community, not 2021 hype: worlds, IP, creators and real user traction.',
  alternates: { canonical: `${SITE_URL}/pages/metaverse-pr-agency` },
  openGraph: {
    title: 'Metaverse PR Agency 2026 | Worlds, IP & Communities',
    description: 'Coverage for metaverse and immersive projects grounded in product and community, not 2021 hype: worlds, IP, creators and real user traction.',
    url: `${SITE_URL}/pages/metaverse-pr-agency`,
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
    title: 'Metaverse PR Agency 2026 | Worlds, IP & Communities',
    description: 'Coverage for metaverse and immersive projects grounded in product and community, not 2021 hype: worlds, IP, creators and real user traction.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/web3.jpg`,
        alt: 'Web3 PR that lands Tier-1 headlines. Forbes, CoinDesk, Cointelegraph, Decrypt and The Block. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__metaverse-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__metaverse-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="lp-metaverse-pr-agency-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
