import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Write a Crypto Press Release That Gets Picked Up in 2026',
  description: 'Most releases die in the inbox. The structure, the dated news peg, and the compliance lines that make a release pickup-ready.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-write-crypto-press-release-2026` },
  openGraph: {
    title: 'How to Write a Crypto Press Release That Gets Picked Up in 2026',
    description: 'Most releases die in the inbox. The structure, the dated news peg, and the compliance lines that make a release pickup-ready.',
    url: `${SITE_URL}/playbook/how-to-write-crypto-press-release-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Write a Crypto Press Release That Gets Picked Up in 2026',
    description: 'Most releases die in the inbox. The structure, the dated news peg, and the compliance lines that make a release pickup-ready.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-108-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-108-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-108-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-108.js" strategy="afterInteractive" />
    </>
  );
}
