import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Go-to-Market Strategy in 2026: Where PR Fits',
  description: 'A GTM plan that treats PR as an afterthought wastes its own launch. Where earned media sits in a token or protocol go-to-market, and in what order.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-go-to-market-strategy-2026` },
  openGraph: {
    title: 'Crypto Go-to-Market Strategy in 2026: Where PR Fits',
    description: 'A GTM plan that treats PR as an afterthought wastes its own launch. Where earned media sits in a token or protocol go-to-market, and in what order.',
    url: `${SITE_URL}/playbook/crypto-go-to-market-strategy-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Go-to-Market Strategy in 2026: Where PR Fits',
    description: 'A GTM plan that treats PR as an afterthought wastes its own launch. Where earned media sits in a token or protocol go-to-market, and in what order.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-119-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-119-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-119-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-119.js" strategy="afterInteractive" />
    </>
  );
}
