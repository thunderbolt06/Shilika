import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Crypto PR Agencies in Singapore in 2026',
  description: 'Singapore is APAC\'s crypto capital and a Token2049 anchor. The outlets, the event-led access, and how to choose an agency that has both.',
  alternates: { canonical: `${SITE_URL}/playbook/best-crypto-pr-agency-singapore-2026` },
  openGraph: {
    title: 'Best Crypto PR Agencies in Singapore in 2026',
    description: 'Singapore is APAC\'s crypto capital and a Token2049 anchor. The outlets, the event-led access, and how to choose an agency that has both.',
    url: `${SITE_URL}/playbook/best-crypto-pr-agency-singapore-2026`,
    type: 'article',
    publishedTime: '2026-06-23',
    modifiedTime: '2026-10-17',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/singapore.jpg`,
        width: 1200,
        height: 630,
        alt: 'Singapore PR: the MAS frame is paragraph one. BT, DealStreetAsia and Token2049. Photo: Shilika Jain at the Marina Bay railing with the Singapore financial district skyline behind her.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Crypto PR Agencies in Singapore in 2026',
    description: 'Singapore is APAC\'s crypto capital and a Token2049 anchor. The outlets, the event-led access, and how to choose an agency that has both.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/singapore.jpg`,
        alt: 'Singapore PR: the MAS frame is paragraph one. BT, DealStreetAsia and Token2049. Photo: Shilika Jain at the Marina Bay railing with the Singapore financial district skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-47-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-47-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="playbook-47-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-47.js" strategy="afterInteractive" />
    </>
  );
}
