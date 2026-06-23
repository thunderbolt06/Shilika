import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'PR for a Restaking and Intents Project in 2026',
  description: 'The hardest narratives in crypto are the most technical. How to make restaking, intents and shared security legible to editors and AI engines.',
  alternates: { canonical: `${SITE_URL}/playbook/restaking-pr-2026` },
  openGraph: {
    title: 'PR for a Restaking and Intents Project in 2026',
    description: 'The hardest narratives in crypto are the most technical. How to make restaking, intents and shared security legible to editors and AI engines.',
    url: `${SITE_URL}/playbook/restaking-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PR for a Restaking and Intents Project in 2026',
    description: 'The hardest narratives in crypto are the most technical. How to make restaking, intents and shared security legible to editors and AI engines.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-42-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-42-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-42-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-42.js" strategy="afterInteractive" />
    </>
  );
}
