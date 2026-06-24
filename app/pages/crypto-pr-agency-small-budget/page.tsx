import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto PR Agency Small Budget 2026 | High-Leverage Moves',
  description: 'The high-leverage PR moves a lean team can run, and where to spend the first dollar.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-pr-agency-small-budget` },
  openGraph: {
    title: 'Crypto PR Agency Small Budget 2026 | High-Leverage Moves',
    description: 'The high-leverage PR moves a lean team can run, and where to spend the first dollar.',
    url: `${SITE_URL}/pages/crypto-pr-agency-small-budget`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto PR Agency Small Budget 2026 | High-Leverage Moves',
    description: 'The high-leverage PR moves a lean team can run, and where to spend the first dollar.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-pr-agency-small-budget-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-pr-agency-small-budget-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-pr-agency-small-budget-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
