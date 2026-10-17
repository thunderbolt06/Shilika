import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'What a Token Launch PR Campaign Costs in 2026',
  description: 'Sprint vs retainer vs full launch-plus-tail, what each tier buys, and the hidden line items in a TGE budget.',
  alternates: { canonical: `${SITE_URL}/playbook/token-launch-pr-campaign-cost-2026` },
  openGraph: {
    title: 'What a Token Launch PR Campaign Costs in 2026',
    description: 'Sprint vs retainer vs full launch-plus-tail, what each tier buys, and the hidden line items in a TGE budget.',
    url: `${SITE_URL}/playbook/token-launch-pr-campaign-cost-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/token-launch.jpg`,
        width: 1200,
        height: 630,
        alt: 'Token launch PR: TGE comms, exchange and KOL waves. Photo: Shilika Jain in a black blazer beside the TOKEN2049 Singapore sign in the conference hall.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What a Token Launch PR Campaign Costs in 2026',
    description: 'Sprint vs retainer vs full launch-plus-tail, what each tier buys, and the hidden line items in a TGE budget.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/token-launch.jpg`,
        alt: 'Token launch PR: TGE comms, exchange and KOL waves. Photo: Shilika Jain in a black blazer beside the TOKEN2049 Singapore sign in the conference hall.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-27-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-27-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-27-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-27.js" strategy="afterInteractive" />
    </>
  );
}
