import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'PR for Tech Startups in 2026: A Founder\'s Guide',
  description: 'The whole PR picture for an early tech startup: when to start, what to spend, what to do yourself, and what actually earns coverage.',
  alternates: { canonical: `${SITE_URL}/playbook/pr-for-tech-startups-guide-2026` },
  openGraph: {
    title: 'PR for Tech Startups in 2026: A Founder\'s Guide',
    description: 'The whole PR picture for an early tech startup: when to start, what to spend, what to do yourself, and what actually earns coverage.',
    url: `${SITE_URL}/playbook/pr-for-tech-startups-guide-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PR for Tech Startups in 2026: A Founder\'s Guide',
    description: 'The whole PR picture for an early tech startup: when to start, what to spend, what to do yourself, and what actually earns coverage.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-102-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-102-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-102-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-102.js" strategy="afterInteractive" />
    </>
  );
}
