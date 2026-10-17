import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'PR Agency for Tech Startups 2026 | A Founder\'s Guide',
  description: 'The whole PR picture for an early tech startup, and the fractional alternative to a full agency.',
  alternates: { canonical: `${SITE_URL}/pages/pr-agency-for-tech-startups` },
  openGraph: {
    title: 'PR Agency for Tech Startups 2026 | A Founder\'s Guide',
    description: 'The whole PR picture for an early tech startup, and the fractional alternative to a full agency.',
    url: `${SITE_URL}/pages/pr-agency-for-tech-startups`,
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
    title: 'PR Agency for Tech Startups 2026 | A Founder\'s Guide',
    description: 'The whole PR picture for an early tech startup, and the fractional alternative to a full agency.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/services.jpg`,
        alt: 'Web3 & AI PR, founder profiling, KOL marketing. Fractional PR from a senior operator. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__pr-agency-for-tech-startups-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__pr-agency-for-tech-startups-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-pr-agency-for-tech-startups-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
