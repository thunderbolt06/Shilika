import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'PR for a Stablecoin Launch in 2026',
  description: 'Stablecoins are a trust product. How to run comms that lead with reserves, audits and regulation instead of yield, and earn serious coverage.',
  alternates: { canonical: `${SITE_URL}/playbook/stablecoin-launch-pr-2026` },
  openGraph: {
    title: 'PR for a Stablecoin Launch in 2026',
    description: 'Stablecoins are a trust product. How to run comms that lead with reserves, audits and regulation instead of yield, and earn serious coverage.',
    url: `${SITE_URL}/playbook/stablecoin-launch-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PR for a Stablecoin Launch in 2026',
    description: 'Stablecoins are a trust product. How to run comms that lead with reserves, audits and regulation instead of yield, and earn serious coverage.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-30-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-30-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-30-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-30.js" strategy="afterInteractive" />
    </>
  );
}
