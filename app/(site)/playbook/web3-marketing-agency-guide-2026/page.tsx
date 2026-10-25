import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Choose a Web3 Marketing Agency in 2026',
  description: 'A buyer\'s guide to picking a Web3 marketing partner: the questions that expose depth, the red flags, and how to match model to stage.',
  alternates: { canonical: `${SITE_URL}/playbook/web3-marketing-agency-guide-2026` },
  openGraph: {
    title: 'How to Choose a Web3 Marketing Agency in 2026',
    description: 'A buyer\'s guide to picking a Web3 marketing partner: the questions that expose depth, the red flags, and how to match model to stage.',
    url: `${SITE_URL}/playbook/web3-marketing-agency-guide-2026`,
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
    title: 'How to Choose a Web3 Marketing Agency in 2026',
    description: 'A buyer\'s guide to picking a Web3 marketing partner: the questions that expose depth, the red flags, and how to match model to stage.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/playbook.jpg`,
        alt: 'The PR playbook for Web3 & AI founders. Guides on Tier-1 pitching, launch PR, KOLs and AI-search citations. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-88-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-88-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-88-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-88.js" strategy="afterInteractive" />
    </>
  );
}
