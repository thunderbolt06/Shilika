import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'PR for an Enterprise AI Company in 2026',
  description: 'Enterprise buyers trust analysts and peers, not hype. How to run AI PR that lands in the rooms a CIO actually reads, including analyst relations.',
  alternates: { canonical: `${SITE_URL}/playbook/enterprise-ai-pr-2026` },
  openGraph: {
    title: 'PR for an Enterprise AI Company in 2026',
    description: 'Enterprise buyers trust analysts and peers, not hype. How to run AI PR that lands in the rooms a CIO actually reads, including analyst relations.',
    url: `${SITE_URL}/playbook/enterprise-ai-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PR for an Enterprise AI Company in 2026',
    description: 'Enterprise buyers trust analysts and peers, not hype. How to run AI PR that lands in the rooms a CIO actually reads, including analyst relations.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-58-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-58-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-58-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-58.js" strategy="afterInteractive" />
    </>
  );
}
