import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'India Crypto PR Agency 2026 | Inc42, ET, Dual-Track',
  description: 'Home-market Indian coverage plus crypto-native reach, with a compliance-aware dual-track launch.',
  alternates: { canonical: `${SITE_URL}/pages/india-crypto-pr-agency` },
  openGraph: {
    title: 'India Crypto PR Agency 2026 | Inc42, ET, Dual-Track',
    description: 'Home-market Indian coverage plus crypto-native reach, with a compliance-aware dual-track launch.',
    url: `${SITE_URL}/pages/india-crypto-pr-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Crypto PR Agency 2026 | Inc42, ET, Dual-Track',
    description: 'Home-market Indian coverage plus crypto-native reach, with a compliance-aware dual-track launch.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__india-crypto-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__india-crypto-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-india-crypto-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
