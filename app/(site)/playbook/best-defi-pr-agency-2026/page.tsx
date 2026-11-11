import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best DeFi PR Agencies in 2026: 5 Options Compared',
  description: 'Big crypto agencies, DeFi boutiques, Web3 generalists, launch sprints or a fractional lead: fees from $3K to $45K a month, fit and conflicts compared.',
  alternates: { canonical: `${SITE_URL}/playbook/best-defi-pr-agency-2026` },
  openGraph: {
    title: 'Best DeFi PR Agencies in 2026: 5 Options Compared',
    description: 'Big crypto agencies, DeFi boutiques, Web3 generalists, launch sprints or a fractional lead: fees from $3K to $45K a month, fit and conflicts compared.',
    url: `${SITE_URL}/playbook/best-defi-pr-agency-2026`,
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
    title: 'Best DeFi PR Agencies in 2026: 5 Options Compared',
    description: 'Big crypto agencies, DeFi boutiques, Web3 generalists, launch sprints or a fractional lead: fees from $3K to $45K a month, fit and conflicts compared.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/web3.jpg`,
        alt: 'Web3 PR that lands Tier-1 headlines. Forbes, CoinDesk, Cointelegraph, Decrypt and The Block. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-36-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-36-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="playbook-36-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-36.js" strategy="afterInteractive" />
    </>
  );
}
