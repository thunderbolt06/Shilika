import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto PR on a Small Budget in 2026: What\'s Actually Possible',
  description: 'You do not need a $40K sprint to earn coverage. The high-leverage moves a lean team can run themselves, and where to spend the first dollar.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-pr-small-budget-2026` },
  openGraph: {
    title: 'Crypto PR on a Small Budget in 2026: What\'s Actually Possible',
    description: 'You do not need a $40K sprint to earn coverage. The high-leverage moves a lean team can run themselves, and where to spend the first dollar.',
    url: `${SITE_URL}/playbook/crypto-pr-small-budget-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto PR on a Small Budget in 2026: What\'s Actually Possible',
    description: 'You do not need a $40K sprint to earn coverage. The high-leverage moves a lean team can run themselves, and where to spend the first dollar.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-105-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-105-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-105-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-105.js" strategy="afterInteractive" />
    </>
  );
}
