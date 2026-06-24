import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Marketing Agency India 2026 | PR, KOL & Growth',
  description: 'Full-funnel crypto marketing for Indian and India-targeting projects: PR, KOL and community.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-marketing-agency-india` },
  openGraph: {
    title: 'Crypto Marketing Agency India 2026 | PR, KOL & Growth',
    description: 'Full-funnel crypto marketing for Indian and India-targeting projects: PR, KOL and community.',
    url: `${SITE_URL}/pages/crypto-marketing-agency-india`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Marketing Agency India 2026 | PR, KOL & Growth',
    description: 'Full-funnel crypto marketing for Indian and India-targeting projects: PR, KOL and community.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-marketing-agency-india-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-marketing-agency-india-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-marketing-agency-india-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
