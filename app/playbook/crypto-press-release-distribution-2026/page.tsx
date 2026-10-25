import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Press Release Distribution in 2026',
  description: 'Wires, crypto-native PR networks, and direct pitching compared. Where distribution helps, where it is theatre, and what editors actually read.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-press-release-distribution-2026` },
  openGraph: {
    title: 'Crypto Press Release Distribution in 2026',
    description: 'Wires, crypto-native PR networks, and direct pitching compared. Where distribution helps, where it is theatre, and what editors actually read.',
    url: `${SITE_URL}/playbook/crypto-press-release-distribution-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/content.jpg`,
        width: 1200,
        height: 630,
        alt: 'Content writing for founders: op-eds, whitepapers. For Web3 and AI teams. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Press Release Distribution in 2026',
    description: 'Wires, crypto-native PR networks, and direct pitching compared. Where distribution helps, where it is theatre, and what editors actually read.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/content.jpg`,
        alt: 'Content writing for founders: op-eds, whitepapers. For Web3 and AI teams. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-19-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-19-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-19-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-19.js" strategy="afterInteractive" />
    </>
  );
}
