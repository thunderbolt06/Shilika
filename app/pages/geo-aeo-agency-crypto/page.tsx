import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'GEO & AEO Agency 2026 | Get Cited by ChatGPT & Perplexity',
  description: 'Earned media, entity and content work so ChatGPT, Perplexity and Google AI Mode name your brand in the answer.',
  alternates: { canonical: `${SITE_URL}/pages/geo-aeo-agency-crypto` },
  openGraph: {
    title: 'GEO & AEO Agency 2026 | Get Cited by ChatGPT & Perplexity',
    description: 'Earned media, entity and content work so ChatGPT, Perplexity and Google AI Mode name your brand in the answer.',
    url: `${SITE_URL}/pages/geo-aeo-agency-crypto`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEO & AEO Agency 2026 | Get Cited by ChatGPT & Perplexity',
    description: 'Earned media, entity and content work so ChatGPT, Perplexity and Google AI Mode name your brand in the answer.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__geo-aeo-agency-crypto-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__geo-aeo-agency-crypto-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-geo-aeo-agency-crypto-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
