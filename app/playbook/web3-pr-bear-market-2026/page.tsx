import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Web3 PR in a Bear Market in 2026',
  description: 'Bear markets are when share of voice is cheapest to win. How to keep building narrative and credibility when budgets and attention contract.',
  alternates: { canonical: `${SITE_URL}/playbook/web3-pr-bear-market-2026` },
  openGraph: {
    title: 'Web3 PR in a Bear Market in 2026',
    description: 'Bear markets are when share of voice is cheapest to win. How to keep building narrative and credibility when budgets and attention contract.',
    url: `${SITE_URL}/playbook/web3-pr-bear-market-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 PR in a Bear Market in 2026',
    description: 'Bear markets are when share of voice is cheapest to win. How to keep building narrative and credibility when budgets and attention contract.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-110-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-110-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-110-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-110.js" strategy="afterInteractive" />
    </>
  );
}
