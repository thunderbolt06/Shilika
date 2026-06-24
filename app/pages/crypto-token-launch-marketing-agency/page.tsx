import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Token Launch Marketing Agency 2026 | PR + KOL',
  description: 'PR, KOL waves and community sequencing timed to one launch cycle, run by the operator doing the work.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-token-launch-marketing-agency` },
  openGraph: {
    title: 'Crypto Token Launch Marketing Agency 2026 | PR + KOL',
    description: 'PR, KOL waves and community sequencing timed to one launch cycle, run by the operator doing the work.',
    url: `${SITE_URL}/pages/crypto-token-launch-marketing-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Token Launch Marketing Agency 2026 | PR + KOL',
    description: 'PR, KOL waves and community sequencing timed to one launch cycle, run by the operator doing the work.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-token-launch-marketing-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-token-launch-marketing-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-token-launch-marketing-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
