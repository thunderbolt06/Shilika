import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Crypto KOL Marketing Agencies in 2026',
  description: 'A criteria-led look at KOL agencies, the fraud problem nobody audits, and how to choose one that vets creators before it bills you.',
  alternates: { canonical: `${SITE_URL}/playbook/best-crypto-kol-marketing-agencies-2026` },
  openGraph: {
    title: 'Best Crypto KOL Marketing Agencies in 2026',
    description: 'A criteria-led look at KOL agencies, the fraud problem nobody audits, and how to choose one that vets creators before it bills you.',
    url: `${SITE_URL}/playbook/best-crypto-kol-marketing-agencies-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/kol.jpg`,
        width: 1200,
        height: 630,
        alt: 'Web3 KOL marketing with 200+ vetted creators. FTC-safe campaigns. Photo: Shilika Jain in a pink dress and sunglasses on the Singapore River at dusk.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Crypto KOL Marketing Agencies in 2026',
    description: 'A criteria-led look at KOL agencies, the fraud problem nobody audits, and how to choose one that vets creators before it bills you.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/kol.jpg`,
        alt: 'Web3 KOL marketing with 200+ vetted creators. FTC-safe campaigns. Photo: Shilika Jain in a pink dress and sunglasses on the Singapore River at dusk.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-81-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-81-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="playbook-81-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-81.js" strategy="afterInteractive" />
    </>
  );
}
