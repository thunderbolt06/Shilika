import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'The Tier-1 PR Trap: Why Web3 Founders Chase Wrong Outlets',
  description: 'Why a Forbes mention can be worse than a niche placement, and how to read which publications actually move your roadmap. An 8-minute Web3 PR playbook.',
  
  alternates: { canonical: 'https://www.shilikajain.com/playbook/tier-1-pr-trap' },
  openGraph: {
    title: 'The Tier-1 PR Trap: Why Web3 Founders Chase Wrong Outlets',
    description: 'Why a Forbes mention can be worse than a niche placement, and how to read which publications actually move your roadmap.',
    url: 'https://www.shilikajain.com/playbook/tier-1-pr-trap',
    type: 'article',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/playbook.jpg',
        width: 1200,
        height: 630,
        alt: 'The PR playbook for Web3 & AI founders. Guides on Tier-1 pitching, launch PR, KOLs and AI-search citations. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Tier-1 PR Trap: Why Web3 Founders Chase Wrong Outlets',
    description: 'Why a Forbes mention can be worse than a niche placement, and how to read which publications actually move your roadmap.',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/playbook.jpg',
        alt: 'The PR playbook for Web3 & AI founders. Guides on Tier-1 pitching, launch PR, KOLs and AI-search citations. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-1-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-1-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-1-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-1.js" strategy="afterInteractive" />
    </>
  );
}
