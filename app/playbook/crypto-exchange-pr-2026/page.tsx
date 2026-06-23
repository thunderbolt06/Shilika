import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'PR for a Crypto Exchange in 2026',
  description: 'Exchanges live and die on trust. How to run comms across listings, security, regulation and regional access without one breach erasing it all.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-exchange-pr-2026` },
  openGraph: {
    title: 'PR for a Crypto Exchange in 2026',
    description: 'Exchanges live and die on trust. How to run comms across listings, security, regulation and regional access without one breach erasing it all.',
    url: `${SITE_URL}/playbook/crypto-exchange-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PR for a Crypto Exchange in 2026',
    description: 'Exchanges live and die on trust. How to run comms across listings, security, regulation and regional access without one breach erasing it all.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-40-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-40-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-40-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-40.js" strategy="afterInteractive" />
    </>
  );
}
