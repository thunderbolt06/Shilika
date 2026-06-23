import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Crypto PR Agencies in Singapore in 2026',
  description: 'Singapore is APAC\'s crypto capital and a Token2049 anchor. The outlets, the event-led access, and how to choose an agency that has both.',
  alternates: { canonical: `${SITE_URL}/playbook/best-crypto-pr-agency-singapore-2026` },
  openGraph: {
    title: 'Best Crypto PR Agencies in Singapore in 2026',
    description: 'Singapore is APAC\'s crypto capital and a Token2049 anchor. The outlets, the event-led access, and how to choose an agency that has both.',
    url: `${SITE_URL}/playbook/best-crypto-pr-agency-singapore-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Crypto PR Agencies in Singapore in 2026',
    description: 'Singapore is APAC\'s crypto capital and a Token2049 anchor. The outlets, the event-led access, and how to choose an agency that has both.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-47-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-47-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-47-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-47.js" strategy="afterInteractive" />
    </>
  );
}
