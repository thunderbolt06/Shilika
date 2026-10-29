import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Exchange Listing PR 2026 | Binance, OKX, Bybit',
  description: 'A repeatable listing-announcement playbook across Binance, OKX, Bybit and more, with the compliance lines built in.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-exchange-listing-pr` },
  openGraph: {
    title: 'Crypto Exchange Listing PR 2026 | Binance, OKX, Bybit',
    description: 'A repeatable listing-announcement playbook across Binance, OKX, Bybit and more, with the compliance lines built in.',
    url: `${SITE_URL}/pages/crypto-exchange-listing-pr`,
    type: 'website',
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
    title: 'Crypto Exchange Listing PR 2026 | Binance, OKX, Bybit',
    description: 'A repeatable listing-announcement playbook across Binance, OKX, Bybit and more, with the compliance lines built in.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/token-launch.jpg`,
        alt: 'Token launch PR: TGE comms, exchange and KOL waves. Photo: Shilika Jain in a black blazer beside the TOKEN2049 Singapore sign in the conference hall.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-exchange-listing-pr-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-exchange-listing-pr-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="lp-crypto-exchange-listing-pr-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
