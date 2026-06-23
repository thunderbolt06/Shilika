import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'The Three APAC Press Windows: Timing Crypto News for Asia in 2026',
  description: 'Asia does not read your news when you publish it. The three regional press windows, the translation lag, and how to time a launch across them.',
  alternates: { canonical: `${SITE_URL}/playbook/apac-press-windows-2026` },
  openGraph: {
    title: 'The Three APAC Press Windows: Timing Crypto News for Asia in 2026',
    description: 'Asia does not read your news when you publish it. The three regional press windows, the translation lag, and how to time a launch across them.',
    url: `${SITE_URL}/playbook/apac-press-windows-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Three APAC Press Windows: Timing Crypto News for Asia in 2026',
    description: 'Asia does not read your news when you publish it. The three regional press windows, the translation lag, and how to time a launch across them.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-54-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-54-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-54-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-54.js" strategy="afterInteractive" />
    </>
  );
}
