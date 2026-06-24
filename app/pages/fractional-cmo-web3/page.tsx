import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Fractional CMO Web3 2026 | When You Need One',
  description: 'A fractional CMO owns the whole growth function. When that fits, when fractional PR fits, and the overlap.',
  alternates: { canonical: `${SITE_URL}/pages/fractional-cmo-web3` },
  openGraph: {
    title: 'Fractional CMO Web3 2026 | When You Need One',
    description: 'A fractional CMO owns the whole growth function. When that fits, when fractional PR fits, and the overlap.',
    url: `${SITE_URL}/pages/fractional-cmo-web3`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CMO Web3 2026 | When You Need One',
    description: 'A fractional CMO owns the whole growth function. When that fits, when fractional PR fits, and the overlap.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__fractional-cmo-web3-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__fractional-cmo-web3-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-fractional-cmo-web3-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
