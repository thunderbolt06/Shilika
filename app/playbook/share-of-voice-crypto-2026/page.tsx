import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Share of Voice in Crypto: How to Track It in 2026',
  description: 'Share of voice is the one metric that survives a bear market. How to define your set, measure it, and use it to steer a comms program.',
  alternates: { canonical: `${SITE_URL}/playbook/share-of-voice-crypto-2026` },
  openGraph: {
    title: 'Share of Voice in Crypto: How to Track It in 2026',
    description: 'Share of voice is the one metric that survives a bear market. How to define your set, measure it, and use it to steer a comms program.',
    url: `${SITE_URL}/playbook/share-of-voice-crypto-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Share of Voice in Crypto: How to Track It in 2026',
    description: 'Share of voice is the one metric that survives a bear market. How to define your set, measure it, and use it to steer a comms program.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-99-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-99-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-99-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-99.js" strategy="afterInteractive" />
    </>
  );
}
