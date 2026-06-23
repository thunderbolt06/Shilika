import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Top Crypto Marketing Agencies in 2026: How to Compare Them',
  description: 'Marketing, PR, KOL and growth get lumped together and shouldn\'t be. A map of the field and how to choose by what you actually need.',
  alternates: { canonical: `${SITE_URL}/playbook/top-crypto-marketing-agencies-2026` },
  openGraph: {
    title: 'Top Crypto Marketing Agencies in 2026: How to Compare Them',
    description: 'Marketing, PR, KOL and growth get lumped together and shouldn\'t be. A map of the field and how to choose by what you actually need.',
    url: `${SITE_URL}/playbook/top-crypto-marketing-agencies-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Crypto Marketing Agencies in 2026: How to Compare Them',
    description: 'Marketing, PR, KOL and growth get lumped together and shouldn\'t be. A map of the field and how to choose by what you actually need.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-87-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-87-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-87-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-87.js" strategy="afterInteractive" />
    </>
  );
}
