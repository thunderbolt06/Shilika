import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Submit an Op-Ed to TechCrunch (and Where Else) in 2026',
  description: 'TechCrunch rarely runs outside op-eds, so where do founder essays actually land? The real opinion-desk map and a submission that works.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-submit-op-ed-techcrunch-2026` },
  openGraph: {
    title: 'How to Submit an Op-Ed to TechCrunch (and Where Else) in 2026',
    description: 'TechCrunch rarely runs outside op-eds, so where do founder essays actually land? The real opinion-desk map and a submission that works.',
    url: `${SITE_URL}/playbook/how-to-submit-op-ed-techcrunch-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Submit an Op-Ed to TechCrunch (and Where Else) in 2026',
    description: 'TechCrunch rarely runs outside op-eds, so where do founder essays actually land? The real opinion-desk map and a submission that works.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-69-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-69-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-69-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-69.js" strategy="afterInteractive" />
    </>
  );
}
