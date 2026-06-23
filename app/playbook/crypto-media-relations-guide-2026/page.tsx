import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Media Relations in 2026: Building Real Journalist Relationships',
  description: 'Coverage is a relationship, not a transaction. How to build a real journalist network, what to never do, and how trust compounds.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-media-relations-guide-2026` },
  openGraph: {
    title: 'Crypto Media Relations in 2026: Building Real Journalist Relationships',
    description: 'Coverage is a relationship, not a transaction. How to build a real journalist network, what to never do, and how trust compounds.',
    url: `${SITE_URL}/playbook/crypto-media-relations-guide-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Media Relations in 2026: Building Real Journalist Relationships',
    description: 'Coverage is a relationship, not a transaction. How to build a real journalist network, what to never do, and how trust compounds.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-24-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-24-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-24-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-24.js" strategy="afterInteractive" />
    </>
  );
}
