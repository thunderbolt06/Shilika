import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Vet Crypto KOLs in 2026 (and Spot Fake Engagement)',
  description: 'Most KOL spend is wasted on bought audiences. The independent-audit checklist that catches bots, fake reach and dead engagement before you sign.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-vet-crypto-kols-2026` },
  openGraph: {
    title: 'How to Vet Crypto KOLs in 2026 (and Spot Fake Engagement)',
    description: 'Most KOL spend is wasted on bought audiences. The independent-audit checklist that catches bots, fake reach and dead engagement before you sign.',
    url: `${SITE_URL}/playbook/how-to-vet-crypto-kols-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Vet Crypto KOLs in 2026 (and Spot Fake Engagement)',
    description: 'Most KOL spend is wasted on bought audiences. The independent-audit checklist that catches bots, fake reach and dead engagement before you sign.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-85-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-85-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-85-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-85.js" strategy="afterInteractive" />
    </>
  );
}
