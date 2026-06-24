import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Influencer Marketing Agency 2026 | Cost-Per-Wallet',
  description: 'Influencer campaigns measured on cost-per-wallet and on-chain attribution, not vanity reach.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-influencer-marketing-agency` },
  openGraph: {
    title: 'Crypto Influencer Marketing Agency 2026 | Cost-Per-Wallet',
    description: 'Influencer campaigns measured on cost-per-wallet and on-chain attribution, not vanity reach.',
    url: `${SITE_URL}/pages/crypto-influencer-marketing-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Influencer Marketing Agency 2026 | Cost-Per-Wallet',
    description: 'Influencer campaigns measured on cost-per-wallet and on-chain attribution, not vanity reach.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-influencer-marketing-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-influencer-marketing-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-influencer-marketing-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
