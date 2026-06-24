import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Whitepaper Writing Service 2026 | Clear, Credible',
  description: 'A whitepaper sprint that turns a technical thesis into a document investors and media actually read.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-whitepaper-writing-service` },
  openGraph: {
    title: 'Crypto Whitepaper Writing Service 2026 | Clear, Credible',
    description: 'A whitepaper sprint that turns a technical thesis into a document investors and media actually read.',
    url: `${SITE_URL}/pages/crypto-whitepaper-writing-service`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Whitepaper Writing Service 2026 | Clear, Credible',
    description: 'A whitepaper sprint that turns a technical thesis into a document investors and media actually read.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-whitepaper-writing-service-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-whitepaper-writing-service-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-whitepaper-writing-service-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
