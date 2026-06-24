import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Binance Listing PR Agency 2026 | Exchange Announcement Comms',
  description: 'Coordinate the announcement, embargo and KOL wave so a Binance listing actually lands in its 24-hour window.',
  alternates: { canonical: `${SITE_URL}/pages/binance-listing-pr-agency` },
  openGraph: {
    title: 'Binance Listing PR Agency 2026 | Exchange Announcement Comms',
    description: 'Coordinate the announcement, embargo and KOL wave so a Binance listing actually lands in its 24-hour window.',
    url: `${SITE_URL}/pages/binance-listing-pr-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Binance Listing PR Agency 2026 | Exchange Announcement Comms',
    description: 'Coordinate the announcement, embargo and KOL wave so a Binance listing actually lands in its 24-hour window.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__binance-listing-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__binance-listing-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-binance-listing-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
