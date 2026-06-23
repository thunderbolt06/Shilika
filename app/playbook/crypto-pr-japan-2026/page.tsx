import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto PR in Japan in 2026: Outlets and Approach',
  description: 'Japan rewards patience, precision and process. The native outlets, the regulatory migration, and why Western pitch habits fail here.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-pr-japan-2026` },
  openGraph: {
    title: 'Crypto PR in Japan in 2026: Outlets and Approach',
    description: 'Japan rewards patience, precision and process. The native outlets, the regulatory migration, and why Western pitch habits fail here.',
    url: `${SITE_URL}/playbook/crypto-pr-japan-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto PR in Japan in 2026: Outlets and Approach',
    description: 'Japan rewards patience, precision and process. The native outlets, the regulatory migration, and why Western pitch habits fail here.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-49-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-49-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-49-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-49.js" strategy="afterInteractive" />
    </>
  );
}
