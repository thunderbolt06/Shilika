import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Web3 Marketing Agency 2026 | PR, KOL, Growth',
  description: 'How to choose a Web3 marketing partner by what you actually need, with the red flags to avoid.',
  alternates: { canonical: `${SITE_URL}/pages/best-web3-marketing-agency` },
  openGraph: {
    title: 'Best Web3 Marketing Agency 2026 | PR, KOL, Growth',
    description: 'How to choose a Web3 marketing partner by what you actually need, with the red flags to avoid.',
    url: `${SITE_URL}/pages/best-web3-marketing-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Web3 Marketing Agency 2026 | PR, KOL, Growth',
    description: 'How to choose a Web3 marketing partner by what you actually need, with the red flags to avoid.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__best-web3-marketing-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__best-web3-marketing-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-best-web3-marketing-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
