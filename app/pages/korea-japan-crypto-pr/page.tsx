import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Korea & Japan Crypto PR 2026 | Dual-Market Access',
  description: 'Coordinated native coverage across the two highest-value, highest-bar APAC crypto markets.',
  alternates: { canonical: `${SITE_URL}/pages/korea-japan-crypto-pr` },
  openGraph: {
    title: 'Korea & Japan Crypto PR 2026 | Dual-Market Access',
    description: 'Coordinated native coverage across the two highest-value, highest-bar APAC crypto markets.',
    url: `${SITE_URL}/pages/korea-japan-crypto-pr`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korea & Japan Crypto PR 2026 | Dual-Market Access',
    description: 'Coordinated native coverage across the two highest-value, highest-bar APAC crypto markets.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__korea-japan-crypto-pr-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__korea-japan-crypto-pr-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-korea-japan-crypto-pr-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
