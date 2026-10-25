import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Media Relations Guide for 2026',
  description: 'Coverage is a relationship, not a transaction. How to build a real journalist network, what to never do, and how trust compounds.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-media-relations-guide-2026` },
  openGraph: {
    title: 'Crypto Media Relations Guide for 2026',
    description: 'Coverage is a relationship, not a transaction. How to build a real journalist network, what to never do, and how trust compounds.',
    url: `${SITE_URL}/playbook/crypto-media-relations-guide-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/playbook.jpg`,
        width: 1200,
        height: 630,
        alt: 'The PR playbook for Web3 & AI founders. Guides on Tier-1 pitching, launch PR, KOLs and AI-search citations. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Media Relations Guide for 2026',
    description: 'Coverage is a relationship, not a transaction. How to build a real journalist network, what to never do, and how trust compounds.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/playbook.jpg`,
        alt: 'The PR playbook for Web3 & AI founders. Guides on Tier-1 pitching, launch PR, KOLs and AI-search citations. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-24-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-24-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="playbook-24-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-24.js" strategy="afterInteractive" />
    </>
  );
}
