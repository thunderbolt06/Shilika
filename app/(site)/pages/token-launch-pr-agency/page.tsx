import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Token Launch & TGE PR Agency 2026 | Shilika Jain',
  description: 'A senior operator who runs your TGE comms end to end: embargo, tier-1 outreach, exchange coordination and a three-wave KOL launch.',
  alternates: { canonical: `${SITE_URL}/pages/token-launch-pr-agency` },
  openGraph: {
    title: 'Token Launch & TGE PR Agency 2026 | Shilika Jain',
    description: 'A senior operator who runs your TGE comms end to end: embargo, tier-1 outreach, exchange coordination and a three-wave KOL launch.',
    url: `${SITE_URL}/pages/token-launch-pr-agency`,
    type: 'website',
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
    title: 'Token Launch & TGE PR Agency 2026 | Shilika Jain',
    description: 'A senior operator who runs your TGE comms end to end: embargo, tier-1 outreach, exchange coordination and a three-wave KOL launch.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/token-launch.jpg`,
        alt: 'Token launch PR: TGE comms, exchange and KOL waves. Photo: Shilika Jain in a black blazer beside the TOKEN2049 Singapore sign in the conference hall.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__token-launch-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__token-launch-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="lp-token-launch-pr-agency-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
