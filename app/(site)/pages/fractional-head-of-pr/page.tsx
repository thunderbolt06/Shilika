import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Fractional Head of PR 2026 | Senior Comms Leadership',
  description: 'Senior comms leadership without a full-time hire, embedded and accountable: narrative, media relations, launches and crisis readiness for your team.',
  alternates: { canonical: `${SITE_URL}/pages/fractional-head-of-pr` },
  openGraph: {
    title: 'Fractional Head of PR 2026 | Senior Comms Leadership',
    description: 'Senior comms leadership without a full-time hire, embedded and accountable: narrative, media relations, launches and crisis readiness for your team.',
    url: `${SITE_URL}/pages/fractional-head-of-pr`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/services.jpg`,
        width: 1200,
        height: 630,
        alt: 'Web3 & AI PR, founder profiling, KOL marketing. Fractional PR from a senior operator. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional Head of PR 2026 | Senior Comms Leadership',
    description: 'Senior comms leadership without a full-time hire, embedded and accountable: narrative, media relations, launches and crisis readiness for your team.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/services.jpg`,
        alt: 'Web3 & AI PR, founder profiling, KOL marketing. Fractional PR from a senior operator. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__fractional-head-of-pr-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__fractional-head-of-pr-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="lp-fractional-head-of-pr-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
