import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'B2B Tech PR in 2026: What\'s Different',
  description: 'B2B PR sells to a buying committee, not a crowd. How category narrative, analyst relations and customer proof replace consumer-style hype.',
  alternates: { canonical: `${SITE_URL}/playbook/b2b-tech-pr-guide-2026` },
  openGraph: {
    title: 'B2B Tech PR in 2026: What\'s Different',
    description: 'B2B PR sells to a buying committee, not a crowd. How category narrative, analyst relations and customer proof replace consumer-style hype.',
    url: `${SITE_URL}/playbook/b2b-tech-pr-guide-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B Tech PR in 2026: What\'s Different',
    description: 'B2B PR sells to a buying committee, not a crowd. How category narrative, analyst relations and customer proof replace consumer-style hype.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-103-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-103-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-103-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-103.js" strategy="afterInteractive" />
    </>
  );
}
