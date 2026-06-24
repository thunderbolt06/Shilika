import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto PR Agency Singapore 2026 | Token2049 & SEA Access',
  description: 'Singapore and SEA media plus Token2049 event leverage, from an operator with native APAC access.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-pr-agency-singapore` },
  openGraph: {
    title: 'Crypto PR Agency Singapore 2026 | Token2049 & SEA Access',
    description: 'Singapore and SEA media plus Token2049 event leverage, from an operator with native APAC access.',
    url: `${SITE_URL}/pages/crypto-pr-agency-singapore`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto PR Agency Singapore 2026 | Token2049 & SEA Access',
    description: 'Singapore and SEA media plus Token2049 event leverage, from an operator with native APAC access.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-pr-agency-singapore-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-pr-agency-singapore-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-pr-agency-singapore-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
