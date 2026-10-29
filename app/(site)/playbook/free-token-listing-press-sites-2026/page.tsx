import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Free Token Listing Press Sites: Worth It?',
  description: 'The honest read on free listing and PR sites: what they do for visibility, where they hurt credibility, and what to use instead.',
  alternates: { canonical: `${SITE_URL}/playbook/free-token-listing-press-sites-2026` },
  openGraph: {
    title: 'Free Token Listing Press Sites: Worth It?',
    description: 'The honest read on free listing and PR sites: what they do for visibility, where they hurt credibility, and what to use instead.',
    url: `${SITE_URL}/playbook/free-token-listing-press-sites-2026`,
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
    title: 'Free Token Listing Press Sites: Worth It?',
    description: 'The honest read on free listing and PR sites: what they do for visibility, where they hurt credibility, and what to use instead.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/token-launch.jpg`,
        alt: 'Token launch PR: TGE comms, exchange and KOL waves. Photo: Shilika Jain in a black blazer beside the TOKEN2049 Singapore sign in the conference hall.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-21-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-21-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="playbook-21-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-21.js" strategy="afterInteractive" />
    </>
  );
}
