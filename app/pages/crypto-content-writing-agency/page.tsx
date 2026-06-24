import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Content Writing Agency 2026 | Op-Eds & Whitepapers',
  description: 'Founder essays, op-eds and whitepapers structured for human readers and AI search, in the founder\'s own voice.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-content-writing-agency` },
  openGraph: {
    title: 'Crypto Content Writing Agency 2026 | Op-Eds & Whitepapers',
    description: 'Founder essays, op-eds and whitepapers structured for human readers and AI search, in the founder\'s own voice.',
    url: `${SITE_URL}/pages/crypto-content-writing-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Content Writing Agency 2026 | Op-Eds & Whitepapers',
    description: 'Founder essays, op-eds and whitepapers structured for human readers and AI search, in the founder\'s own voice.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-content-writing-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-content-writing-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-content-writing-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
