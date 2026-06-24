import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Twitter KOL Marketing 2026 | X Creator Waves',
  description: 'X-native KOL waves with credibility anchors and disclosure language built in.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-twitter-kol-marketing` },
  openGraph: {
    title: 'Crypto Twitter KOL Marketing 2026 | X Creator Waves',
    description: 'X-native KOL waves with credibility anchors and disclosure language built in.',
    url: `${SITE_URL}/pages/crypto-twitter-kol-marketing`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Twitter KOL Marketing 2026 | X Creator Waves',
    description: 'X-native KOL waves with credibility anchors and disclosure language built in.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-twitter-kol-marketing-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-twitter-kol-marketing-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-twitter-kol-marketing-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
