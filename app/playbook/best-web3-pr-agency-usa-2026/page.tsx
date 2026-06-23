import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Web3 PR Agencies in the USA in 2026',
  description: 'The US crypto press is the most crowded room in the world. How to choose a US-focused agency and what separates access from noise.',
  alternates: { canonical: `${SITE_URL}/playbook/best-web3-pr-agency-usa-2026` },
  openGraph: {
    title: 'Best Web3 PR Agencies in the USA in 2026',
    description: 'The US crypto press is the most crowded room in the world. How to choose a US-focused agency and what separates access from noise.',
    url: `${SITE_URL}/playbook/best-web3-pr-agency-usa-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Web3 PR Agencies in the USA in 2026',
    description: 'The US crypto press is the most crowded room in the world. How to choose a US-focused agency and what separates access from noise.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-46-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-46-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-46-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-46.js" strategy="afterInteractive" />
    </>
  );
}
