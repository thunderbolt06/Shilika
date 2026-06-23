import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Announce a Binance Listing: PR Strategy for 2026',
  description: 'An exchange listing is a 24-hour window. How to coordinate the announcement, the embargo, and the KOL wave so the listing actually lands.',
  alternates: { canonical: `${SITE_URL}/playbook/binance-listing-announcement-pr-2026` },
  openGraph: {
    title: 'How to Announce a Binance Listing: PR Strategy for 2026',
    description: 'An exchange listing is a 24-hour window. How to coordinate the announcement, the embargo, and the KOL wave so the listing actually lands.',
    url: `${SITE_URL}/playbook/binance-listing-announcement-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Announce a Binance Listing: PR Strategy for 2026',
    description: 'An exchange listing is a 24-hour window. How to coordinate the announcement, the embargo, and the KOL wave so the listing actually lands.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-25-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-25-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-25-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-25.js" strategy="afterInteractive" />
    </>
  );
}
