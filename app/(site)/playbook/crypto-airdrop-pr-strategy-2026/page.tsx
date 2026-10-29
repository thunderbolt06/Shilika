import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Airdrop PR and Comms Strategy for 2026',
  description: 'Airdrops are a comms event, not just a distribution mechanic. How to message eligibility, avoid a farming-only narrative, and earn real coverage.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-airdrop-pr-strategy-2026` },
  openGraph: {
    title: 'Airdrop PR and Comms Strategy for 2026',
    description: 'Airdrops are a comms event, not just a distribution mechanic. How to message eligibility, avoid a farming-only narrative, and earn real coverage.',
    url: `${SITE_URL}/playbook/crypto-airdrop-pr-strategy-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/token-launch.jpg`,
        width: 1200,
        height: 630,
        alt: 'Token launch PR: TGE comms, exchange and KOL waves. Photo: Shilika Jain in a black blazer beside the TOKEN2049 Singapore sign in the conference hall.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airdrop PR and Comms Strategy for 2026',
    description: 'Airdrops are a comms event, not just a distribution mechanic. How to message eligibility, avoid a farming-only narrative, and earn real coverage.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/token-launch.jpg`,
        alt: 'Token launch PR: TGE comms, exchange and KOL waves. Photo: Shilika Jain in a black blazer beside the TOKEN2049 Singapore sign in the conference hall.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-33-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-33-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="playbook-33-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-33.js" strategy="afterInteractive" />
    </>
  );
}
