import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Get Into a Forbes Council in 2026 (and Whether You Should)',
  description: 'Forbes Councils are pay-to-publish, and that changes what they are worth. The honest cost-benefit, the credibility trap, and the alternatives.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-get-into-forbes-councils-2026` },
  openGraph: {
    title: 'How to Get Into a Forbes Council in 2026 (and Whether You Should)',
    description: 'Forbes Councils are pay-to-publish, and that changes what they are worth. The honest cost-benefit, the credibility trap, and the alternatives.',
    url: `${SITE_URL}/playbook/how-to-get-into-forbes-councils-2026`,
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
    title: 'How to Get Into a Forbes Council in 2026 (and Whether You Should)',
    description: 'Forbes Councils are pay-to-publish, and that changes what they are worth. The honest cost-benefit, the credibility trap, and the alternatives.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/playbook.jpg`,
        alt: 'The PR playbook for Web3 & AI founders. Guides on Tier-1 pitching, launch PR, KOLs and AI-search citations. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-74-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-74-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-74-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-74.js" strategy="afterInteractive" />
    </>
  );
}
