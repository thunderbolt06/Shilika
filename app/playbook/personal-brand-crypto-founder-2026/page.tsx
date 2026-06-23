import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Build a Personal Brand as a Crypto Founder in 2026',
  description: 'The Twitter-and-LinkedIn playbook for crypto founders who would rather ship. What to post, what to never post, and how to sound like yourself.',
  alternates: { canonical: `${SITE_URL}/playbook/personal-brand-crypto-founder-2026` },
  openGraph: {
    title: 'How to Build a Personal Brand as a Crypto Founder in 2026',
    description: 'The Twitter-and-LinkedIn playbook for crypto founders who would rather ship. What to post, what to never post, and how to sound like yourself.',
    url: `${SITE_URL}/playbook/personal-brand-crypto-founder-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Build a Personal Brand as a Crypto Founder in 2026',
    description: 'The Twitter-and-LinkedIn playbook for crypto founders who would rather ship. What to post, what to never post, and how to sound like yourself.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-66-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-66-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-66-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-66.js" strategy="afterInteractive" />
    </>
  );
}
