import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Web3 PR Agency in 2026 | Fractional Senior Operator',
  description:
    'Hire a fractional senior Web3 PR operator instead of a $15K–$45K/mo agency. 50+ founders placed in Forbes, CoinDesk, Cointelegraph, Decrypt, The Block. Send a brief or book a call.',
  alternates: { canonical: `${SITE_URL}/pages/web3-pr-agency` },
  openGraph: {
    title: 'Best Web3 PR Agency in 2026 | Fractional Senior Operator',
    description:
      'A fractional senior Web3 PR operator who actually pitches your story. 50+ founders placed across tier-1 crypto and mainstream press.',
    url: `${SITE_URL}/pages/web3-pr-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Web3 PR Agency in 2026 | Fractional Senior Operator',
    description:
      'A fractional senior Web3 PR operator who actually pitches your story. 50+ founders placed across tier-1 crypto and mainstream press.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__web3-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__web3-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-web3-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
