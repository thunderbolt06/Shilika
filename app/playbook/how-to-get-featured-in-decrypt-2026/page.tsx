import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Get Featured in Decrypt in 2026: Pitch Guide',
  description: 'What Decrypt\'s editors filter for, the explainer-friendly angle that lands, and a pitch template from a senior Web3 operator\'s playbook.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-get-featured-in-decrypt-2026` },
  openGraph: {
    title: 'How to Get Featured in Decrypt in 2026: Pitch Guide',
    description: 'What Decrypt\'s editors filter for, the explainer-friendly angle that lands, and a pitch template from a senior Web3 operator\'s playbook.',
    url: `${SITE_URL}/playbook/how-to-get-featured-in-decrypt-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Get Featured in Decrypt in 2026: Pitch Guide',
    description: 'What Decrypt\'s editors filter for, the explainer-friendly angle that lands, and a pitch template from a senior Web3 operator\'s playbook.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-15-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-15-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-15-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-15.js" strategy="afterInteractive" />
    </>
  );
}
