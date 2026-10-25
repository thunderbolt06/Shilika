import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto PR in Korea in 2026: Outlets, KOLs and Access',
  description: 'Crypto PR in Korea after KBW 2026: native outlets, KOL tiers, FSC rules, and the next window (Korea Fintech Week, Nov 2026). Updated Oct 2026.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-pr-korea-2026` },
  openGraph: {
    title: 'Crypto PR in Korea in 2026: Outlets, KOLs and Access',
    description: 'Crypto PR in Korea after KBW 2026: native outlets, KOL tiers, FSC rules, and the next window (Korea Fintech Week, Nov 2026). Updated Oct 2026.',
    url: `${SITE_URL}/playbook/crypto-pr-korea-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/korea.jpg`,
        width: 1200,
        height: 630,
        alt: 'Korea PR: the FSC frame is paragraph one. BloomingBit, TokenPost and KBW Seoul. Photo: Shilika Jain smiling mid-talk on stage, microphone in hand.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto PR in Korea in 2026: Outlets, KOLs and Access',
    description: 'Crypto PR in Korea after KBW 2026: native outlets, KOL tiers, FSC rules, and the next window (Korea Fintech Week, Nov 2026). Updated Oct 2026.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/korea.jpg`,
        alt: 'Korea PR: the FSC frame is paragraph one. BloomingBit, TokenPost and KBW Seoul. Photo: Shilika Jain smiling mid-talk on stage, microphone in hand.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-48-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-48-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-48-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-48.js" strategy="afterInteractive" />
    </>
  );
}
