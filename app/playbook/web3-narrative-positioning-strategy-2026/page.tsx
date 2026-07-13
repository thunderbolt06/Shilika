import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Web3 Narrative and Positioning Strategy in 2026',
  description: 'Positioning decides which category you compete in before a single pitch goes out. How to build a narrative that a reporter, an investor and a user all believe.',
  alternates: { canonical: `${SITE_URL}/playbook/web3-narrative-positioning-strategy-2026` },
  openGraph: {
    title: 'Web3 Narrative and Positioning Strategy in 2026',
    description: 'Positioning decides which category you compete in before a single pitch goes out. How to build a narrative that a reporter, an investor and a user all believe.',
    url: `${SITE_URL}/playbook/web3-narrative-positioning-strategy-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 Narrative and Positioning Strategy in 2026',
    description: 'Positioning decides which category you compete in before a single pitch goes out. How to build a narrative that a reporter, an investor and a user all believe.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-118-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-118-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-118-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-118.js" strategy="afterInteractive" />
    </>
  );
}
