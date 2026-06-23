import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Free Token Listing and Press Release Sites: Worth It in 2026?',
  description: 'The honest read on free listing and PR sites: what they do for visibility, where they hurt credibility, and what to use instead.',
  alternates: { canonical: `${SITE_URL}/playbook/free-token-listing-press-sites-2026` },
  openGraph: {
    title: 'Free Token Listing and Press Release Sites: Worth It in 2026?',
    description: 'The honest read on free listing and PR sites: what they do for visibility, where they hurt credibility, and what to use instead.',
    url: `${SITE_URL}/playbook/free-token-listing-press-sites-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Token Listing and Press Release Sites: Worth It in 2026?',
    description: 'The honest read on free listing and PR sites: what they do for visibility, where they hurt credibility, and what to use instead.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-21-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-21-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-21-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-21.js" strategy="afterInteractive" />
    </>
  );
}
