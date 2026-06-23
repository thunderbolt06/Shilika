import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Get Speaking Slots at Crypto Conferences in 2026',
  description: 'Consensus, Token2049, ETHDenver and the rest. How conference programming actually works and how founders earn a real slot, not a side stage.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-get-speaking-slots-crypto-conferences-2026` },
  openGraph: {
    title: 'How to Get Speaking Slots at Crypto Conferences in 2026',
    description: 'Consensus, Token2049, ETHDenver and the rest. How conference programming actually works and how founders earn a real slot, not a side stage.',
    url: `${SITE_URL}/playbook/how-to-get-speaking-slots-crypto-conferences-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Get Speaking Slots at Crypto Conferences in 2026',
    description: 'Consensus, Token2049, ETHDenver and the rest. How conference programming actually works and how founders earn a real slot, not a side stage.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-71-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-71-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-71-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-71.js" strategy="afterInteractive" />
    </>
  );
}
