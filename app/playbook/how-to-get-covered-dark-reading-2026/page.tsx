import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Get Covered by Dark Reading in 2026',
  description: 'Dark Reading rewards research, not pitches. What its editors run, why threat findings beat product news, and a pitch that respects the desk.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-get-covered-dark-reading-2026` },
  openGraph: {
    title: 'How to Get Covered by Dark Reading in 2026',
    description: 'Dark Reading rewards research, not pitches. What its editors run, why threat findings beat product news, and a pitch that respects the desk.',
    url: `${SITE_URL}/playbook/how-to-get-covered-dark-reading-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Get Covered by Dark Reading in 2026',
    description: 'Dark Reading rewards research, not pitches. What its editors run, why threat findings beat product news, and a pitch that respects the desk.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-90-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-90-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-90-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-90.js" strategy="afterInteractive" />
    </>
  );
}
