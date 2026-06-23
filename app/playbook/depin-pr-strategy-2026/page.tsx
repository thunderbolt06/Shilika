import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'PR Strategy for a DePIN Project in 2026',
  description: 'DePIN had to become a beat before it could become a story. How to make decentralized-infrastructure coverage land, with the Fluence playbook.',
  alternates: { canonical: `${SITE_URL}/playbook/depin-pr-strategy-2026` },
  openGraph: {
    title: 'PR Strategy for a DePIN Project in 2026',
    description: 'DePIN had to become a beat before it could become a story. How to make decentralized-infrastructure coverage land, with the Fluence playbook.',
    url: `${SITE_URL}/playbook/depin-pr-strategy-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PR Strategy for a DePIN Project in 2026',
    description: 'DePIN had to become a beat before it could become a story. How to make decentralized-infrastructure coverage land, with the Fluence playbook.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-37-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-37-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-37-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-37.js" strategy="afterInteractive" />
    </>
  );
}
