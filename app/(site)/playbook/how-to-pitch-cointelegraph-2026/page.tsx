import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';
import { languageAlternates } from '@/lib/i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Pitch Cointelegraph in 2026: Pitch Guide',
  description:
    'How to pitch Cointelegraph in 2026: newsroom structure, the dated news peg, the under-150-word pitch, the editorial firewall and the APAC editions.',

  alternates: { canonical: `${SITE_URL}/playbook/how-to-pitch-cointelegraph-2026`, languages: languageAlternates('/playbook/how-to-pitch-cointelegraph-2026') },
  openGraph: {
    title: 'How to Pitch Cointelegraph in 2026: Pitch Guide',
    description:
      'The dated news peg, the under-150-word pitch, the editorial firewall, and the multilingual editions, from a senior Web3 PR operator. The sister guide to the CoinDesk playbook.',
    url: `${SITE_URL}/playbook/how-to-pitch-cointelegraph-2026`,
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
    title: 'How to Pitch Cointelegraph in 2026: Pitch Guide',
    description:
      'The dated news peg, the under-150-word pitch, the editorial firewall, and the multilingual editions, from a senior Web3 PR operator.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/playbook.jpg`,
        alt: 'The PR playbook for Web3 & AI founders. Guides on Tier-1 pitching, launch PR, KOLs and AI-search citations. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-13-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-13-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-13-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-13.js" strategy="afterInteractive" />
    </>
  );
}
