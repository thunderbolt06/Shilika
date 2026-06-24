import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Fractional PR Consultant Web3 2026 | Crypto-Native Senior',
  description: 'Web3 moves too fast for agency layers. A senior fractional operator who runs your PR directly.',
  alternates: { canonical: `${SITE_URL}/pages/fractional-pr-consultant-web3` },
  openGraph: {
    title: 'Fractional PR Consultant Web3 2026 | Crypto-Native Senior',
    description: 'Web3 moves too fast for agency layers. A senior fractional operator who runs your PR directly.',
    url: `${SITE_URL}/pages/fractional-pr-consultant-web3`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional PR Consultant Web3 2026 | Crypto-Native Senior',
    description: 'Web3 moves too fast for agency layers. A senior fractional operator who runs your PR directly.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__fractional-pr-consultant-web3-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__fractional-pr-consultant-web3-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-fractional-pr-consultant-web3-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
