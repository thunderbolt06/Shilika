import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Influencer and KOL Pricing: 2026 Rates',
  description: 'What KOLs actually charge in 2026 by tier and platform, the all-in budget multiplier, and where creator spend quietly leaks.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-influencer-pricing-rates-2026` },
  openGraph: {
    title: 'Crypto Influencer and KOL Pricing: 2026 Rates',
    description: 'What KOLs actually charge in 2026 by tier and platform, the all-in budget multiplier, and where creator spend quietly leaks.',
    url: `${SITE_URL}/playbook/crypto-influencer-pricing-rates-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Influencer and KOL Pricing: 2026 Rates',
    description: 'What KOLs actually charge in 2026 by tier and platform, the all-in budget multiplier, and where creator spend quietly leaks.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-83-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-83-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-83-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-83.js" strategy="afterInteractive" />
    </>
  );
}
