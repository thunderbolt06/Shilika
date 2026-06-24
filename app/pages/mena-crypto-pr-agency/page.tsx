import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'MENA Crypto PR Agency 2026 | Dubai, Abu Dhabi, VARA',
  description: 'MENA placement, VARA-aware framing and Token2049 Dubai leverage, with the MANTRA RWA story behind it.',
  alternates: { canonical: `${SITE_URL}/pages/mena-crypto-pr-agency` },
  openGraph: {
    title: 'MENA Crypto PR Agency 2026 | Dubai, Abu Dhabi, VARA',
    description: 'MENA placement, VARA-aware framing and Token2049 Dubai leverage, with the MANTRA RWA story behind it.',
    url: `${SITE_URL}/pages/mena-crypto-pr-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MENA Crypto PR Agency 2026 | Dubai, Abu Dhabi, VARA',
    description: 'MENA placement, VARA-aware framing and Token2049 Dubai leverage, with the MANTRA RWA story behind it.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__mena-crypto-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__mena-crypto-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-mena-crypto-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
