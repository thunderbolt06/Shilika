import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Newsjacking for Crypto Brands in 2026',
  description: 'The fastest free coverage is a smart reaction to breaking news. How to newsjack responsibly, where it backfires, and how to move in minutes.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-newsjacking-2026` },
  openGraph: {
    title: 'Newsjacking for Crypto Brands in 2026',
    description: 'The fastest free coverage is a smart reaction to breaking news. How to newsjack responsibly, where it backfires, and how to move in minutes.',
    url: `${SITE_URL}/playbook/crypto-newsjacking-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newsjacking for Crypto Brands in 2026',
    description: 'The fastest free coverage is a smart reaction to breaking news. How to newsjack responsibly, where it backfires, and how to move in minutes.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-111-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-111-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-111-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-111.js" strategy="afterInteractive" />
    </>
  );
}
