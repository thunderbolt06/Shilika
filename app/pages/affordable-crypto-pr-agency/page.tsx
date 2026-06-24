import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Affordable Crypto PR Agency 2026 | Lean Budget, Real Results',
  description: 'What affordable PR really buys, the models that fit a small budget, and the cheap traps to avoid.',
  alternates: { canonical: `${SITE_URL}/pages/affordable-crypto-pr-agency` },
  openGraph: {
    title: 'Affordable Crypto PR Agency 2026 | Lean Budget, Real Results',
    description: 'What affordable PR really buys, the models that fit a small budget, and the cheap traps to avoid.',
    url: `${SITE_URL}/pages/affordable-crypto-pr-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affordable Crypto PR Agency 2026 | Lean Budget, Real Results',
    description: 'What affordable PR really buys, the models that fit a small budget, and the cheap traps to avoid.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__affordable-crypto-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__affordable-crypto-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-affordable-crypto-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
