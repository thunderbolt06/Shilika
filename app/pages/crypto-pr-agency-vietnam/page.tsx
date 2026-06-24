import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto PR Agency Vietnam 2026 | High-Adoption SEA Market',
  description: 'Reach one of the highest crypto-adoption markets on earth with native media and community access.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-pr-agency-vietnam` },
  openGraph: {
    title: 'Crypto PR Agency Vietnam 2026 | High-Adoption SEA Market',
    description: 'Reach one of the highest crypto-adoption markets on earth with native media and community access.',
    url: `${SITE_URL}/pages/crypto-pr-agency-vietnam`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto PR Agency Vietnam 2026 | High-Adoption SEA Market',
    description: 'Reach one of the highest crypto-adoption markets on earth with native media and community access.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-pr-agency-vietnam-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-pr-agency-vietnam-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-pr-agency-vietnam-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
