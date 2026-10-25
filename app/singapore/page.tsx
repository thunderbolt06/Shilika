import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { languageAlternates } from '@/lib/i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Singapore Web3 & AI PR 2026: BT, Token2049',
  description: 'Singapore PR for Web3 and AI founders. Business Times, Channel News Asia, DealStreetAsia, e27. MAS DTSP-aware framing, SFF Nov 2026 and Token2049 calendar.',
  alternates: { canonical: `${SITE_URL}/singapore`, languages: languageAlternates('/singapore') },
  openGraph: {
    title: 'Singapore Web3 & AI PR 2026: BT, Token2049',
    description: 'Singapore PR for Web3 and AI founders. The Business Times, Channel News Asia, DealStreetAsia, Tech in Asia, e27, Lianhe Zaobao. MAS DTSP-aware framing, Project Guardian institutional partners, SFF Nov 2026 and Token2049 calendar.',
    url: `${SITE_URL}/singapore`,
    type: 'website',
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
    title: 'Singapore Web3 & AI PR 2026: BT, Token2049',
    description: 'Singapore PR for Web3 and AI founders. MAS-aware framing, SFF Nov 2026 and Token2049 calendar, Project Guardian institutional anchor.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/singapore.jpg`,
        alt: 'Singapore PR: the MAS frame is paragraph one. BT, DealStreetAsia and Token2049. Photo: Shilika Jain at the Marina Bay railing with the Singapore financial district skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/singapore-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/singapore-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="singapore-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
