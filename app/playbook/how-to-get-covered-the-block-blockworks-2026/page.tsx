import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Get Covered by The Block and Blockworks in 2026',
  description: 'The Block still runs a scoop-and-data newsroom. Blockworks closed its news desk in 2025. How to pitch The Block and get onto Blockworks shows in 2026.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-get-covered-the-block-blockworks-2026` },
  openGraph: {
    title: 'How to Get Covered by The Block and Blockworks in 2026',
    description: 'The Block still runs a scoop-and-data newsroom. Blockworks closed its news desk in 2025. How to pitch The Block and get onto Blockworks shows in 2026.',
    url: `${SITE_URL}/playbook/how-to-get-covered-the-block-blockworks-2026`,
    type: 'article',
    publishedTime: '2026-06-23',
    modifiedTime: '2026-10-24',
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
    title: 'How to Get Covered by The Block and Blockworks in 2026',
    description: 'The Block still runs a scoop-and-data newsroom. Blockworks closed its news desk in 2025. How to pitch The Block and get onto Blockworks shows in 2026.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/playbook.jpg`,
        alt: 'The PR playbook for Web3 & AI founders. Guides on Tier-1 pitching, launch PR, KOLs and AI-search citations. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-16-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-16-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-16-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-16.js" strategy="afterInteractive" />
    </>
  );
}
