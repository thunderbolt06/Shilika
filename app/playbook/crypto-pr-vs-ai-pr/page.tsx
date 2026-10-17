import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto PR vs AI PR in 2026: How the Playbooks Differ',
  description: 'Crypto PR vs AI PR in 2026: different outlets, journalists, proof and narrative arc. A side-by-side teardown by a senior operator who runs both.',
  
  alternates: { canonical: 'https://www.shilikajain.com/playbook/crypto-pr-vs-ai-pr' },
  openGraph: {
    title: 'Crypto PR vs AI PR in 2026: How the Playbooks Differ',
    description: 'Different outlets, different journalists, different proof. A side-by-side teardown of the crypto and AI PR playbooks by a senior operator who runs both.',
    url: 'https://www.shilikajain.com/playbook/crypto-pr-vs-ai-pr',
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
    title: 'Crypto PR vs AI PR in 2026: How the Playbooks Differ',
    description: 'Different outlets, different journalists, different proof. A side-by-side teardown of the crypto and AI PR playbooks by a senior operator who runs both.',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/playbook.jpg',
        alt: 'The PR playbook for Web3 & AI founders. Guides on Tier-1 pitching, launch PR, KOLs and AI-search citations. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-8-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-8-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-8-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-8.js" strategy="afterInteractive" />
    </>
  );
}
