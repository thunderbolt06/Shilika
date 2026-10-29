import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { languageAlternates } from '@/lib/i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Dubai & MENA Web3 / AI PR 2026: VARA, ADGM, RAK DAO',
  description: 'Dubai and MENA PR for Web3, AI and RWA founders. Arabian Business, Gulf News, The National, AGBI, Cointelegraph Arabic. VARA, ADGM, RAK DAO-aware framing.',
  alternates: { canonical: `${SITE_URL}/dubai-mena`, languages: languageAlternates('/dubai-mena') },
  openGraph: {
    title: 'Dubai & MENA Web3 / AI PR 2026: VARA, ADGM, RAK DAO',
    description: 'Dubai and MENA PR for Web3, AI and RWA founders. Arabian Business, Gulf News, The National, AGBI, Wamda, Cointelegraph Arabic. VARA Travel Rule + Token Issuance + Derivatives Rulebooks, ADGM Product Intervention Powers, RAK DAO DLT Foundations framing.',
    url: `${SITE_URL}/dubai-mena`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/mena.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dubai and MENA PR: VARA is paragraph one. VARA, ADGM and RAK DAO. Photo: Shilika Jain in front of a red Press Lounge wall at the Consensus conference.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dubai & MENA Web3 / AI PR 2026: VARA, ADGM, RAK DAO',
    description: 'Dubai and MENA PR for Web3, AI and RWA founders. VARA, ADGM, RAK DAO-aware framing. Post-Token2049 calendar reshape.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/mena.jpg`,
        alt: 'Dubai and MENA PR: VARA is paragraph one. VARA, ADGM and RAK DAO. Photo: Shilika Jain in front of a red Press Lounge wall at the Consensus conference.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/dubai-mena-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/dubai-mena-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="dubai-mena-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
