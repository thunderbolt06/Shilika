import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto PR in Dubai and MENA in 2026',
  description: 'MENA pairs real capital with friendly regulation. How to use Token2049 Dubai, VARA clarity and regional outlets to build a credible story.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-pr-dubai-mena-2026` },
  openGraph: {
    title: 'Crypto PR in Dubai and MENA in 2026',
    description: 'MENA pairs real capital with friendly regulation. How to use Token2049 Dubai, VARA clarity and regional outlets to build a credible story.',
    url: `${SITE_URL}/playbook/crypto-pr-dubai-mena-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto PR in Dubai and MENA in 2026',
    description: 'MENA pairs real capital with friendly regulation. How to use Token2049 Dubai, VARA clarity and regional outlets to build a credible story.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-50-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-50-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-50-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-50.js" strategy="afterInteractive" />
    </>
  );
}
