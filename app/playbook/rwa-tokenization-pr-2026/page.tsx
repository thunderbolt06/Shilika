import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'PR for an RWA and Tokenization Project in 2026',
  description: 'Real-world assets is where TradFi credibility meets crypto distribution. How to earn coverage that institutions and crypto media both take seriously.',
  alternates: { canonical: `${SITE_URL}/playbook/rwa-tokenization-pr-2026` },
  openGraph: {
    title: 'PR for an RWA and Tokenization Project in 2026',
    description: 'Real-world assets is where TradFi credibility meets crypto distribution. How to earn coverage that institutions and crypto media both take seriously.',
    url: `${SITE_URL}/playbook/rwa-tokenization-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PR for an RWA and Tokenization Project in 2026',
    description: 'Real-world assets is where TradFi credibility meets crypto distribution. How to earn coverage that institutions and crypto media both take seriously.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-41-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-41-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-41-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-41.js" strategy="afterInteractive" />
    </>
  );
}
