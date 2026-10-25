import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Post-TGE PR: The First 90 Days After Listing',
  description: 'Most teams go quiet after the token lands. The sustained-coverage playbook that keeps momentum, sentiment and AI-citation share alive.',
  alternates: { canonical: `${SITE_URL}/playbook/post-tge-pr-first-90-days-2026` },
  openGraph: {
    title: 'Post-TGE PR: The First 90 Days After Listing',
    description: 'Most teams go quiet after the token lands. The sustained-coverage playbook that keeps momentum, sentiment and AI-citation share alive.',
    url: `${SITE_URL}/playbook/post-tge-pr-first-90-days-2026`,
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
    title: 'Post-TGE PR: The First 90 Days After Listing',
    description: 'Most teams go quiet after the token lands. The sustained-coverage playbook that keeps momentum, sentiment and AI-citation share alive.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/token-launch.jpg`,
        alt: 'Token launch PR: TGE comms, exchange and KOL waves. Photo: Shilika Jain in a black blazer beside the TOKEN2049 Singapore sign in the conference hall.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-34-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-34-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="playbook-34-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-34.js" strategy="afterInteractive" />
    </>
  );
}
