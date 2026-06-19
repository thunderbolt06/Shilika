import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: '7 Mistakes Web3 Founders Make With PR Agencies in 2026',
  description: 'The seven most expensive PR mistakes Web3 founders make in 2026 — and the fix for each — from a fractional operator who has placed 50+ protocols across Forbes, CoinDesk and Cointelegraph.',

  alternates: { canonical: `${SITE_URL}/playbook/web3-pr-agency-mistakes` },
  openGraph: {
    title: '7 Mistakes Web3 Founders Make With PR Agencies in 2026',
    description: 'Chasing the logo, generalist agencies, junior execution, no news hook, English-only reach, ignoring AI search, and vanity metrics — the seven mistakes and the fix for each.',
    url: `${SITE_URL}/playbook/web3-pr-agency-mistakes`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '7 Mistakes Web3 Founders Make With PR Agencies in 2026',
    description: 'Chasing the logo, generalist agencies, junior execution, no news hook, English-only reach, ignoring AI search, and vanity metrics — the seven mistakes and the fix for each.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-11-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-11-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-11-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-11.js" strategy="afterInteractive" />
    </>
  );
}
