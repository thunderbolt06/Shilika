import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Founder Personal Branding 2026 | X + LinkedIn',
  description: 'An X and LinkedIn system that builds authority and still sounds like you, not a content mill.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-founder-personal-branding` },
  openGraph: {
    title: 'Crypto Founder Personal Branding 2026 | X + LinkedIn',
    description: 'An X and LinkedIn system that builds authority and still sounds like you, not a content mill.',
    url: `${SITE_URL}/pages/crypto-founder-personal-branding`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Founder Personal Branding 2026 | X + LinkedIn',
    description: 'An X and LinkedIn system that builds authority and still sounds like you, not a content mill.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-founder-personal-branding-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-founder-personal-branding-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-founder-personal-branding-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
