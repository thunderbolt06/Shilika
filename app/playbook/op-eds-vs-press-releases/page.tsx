import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Op-Eds vs Press Releases for Web3 Founders in 2026',
  description:
    'When to announce a fact and when to argue a position. A fractional operator on which earns coverage, why op-eds get cited by AI engines while releases do not, ghostwriting cost, and how to sequence both around a launch.',
  alternates: { canonical: `${SITE_URL}/playbook/op-eds-vs-press-releases` },
  openGraph: {
    title: 'Op-Eds vs Press Releases for Web3 Founders in 2026',
    description:
      'A press release announces; an op-ed argues. Which one earns coverage, which one gets cited by AI engines, and how to run both together around a launch.',
    url: `${SITE_URL}/playbook/op-eds-vs-press-releases`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Op-Eds vs Press Releases for Web3 Founders in 2026',
    description:
      'A press release announces; an op-ed argues. Which one earns coverage, which one gets cited by AI engines, and how to run both together around a launch.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-14-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-14-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-14-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-14.js" strategy="afterInteractive" />
    </>
  );
}
