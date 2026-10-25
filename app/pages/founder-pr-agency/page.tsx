import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Founder PR Agency 2026 | Profiles, Op-Eds, Speaking',
  description: 'Profiles, op-eds, podcasts and speaking that make the founder a category voice, with a senior operator pitching and placing every piece personally.',
  alternates: { canonical: `${SITE_URL}/pages/founder-pr-agency` },
  openGraph: {
    title: 'Founder PR Agency 2026 | Profiles, Op-Eds, Speaking',
    description: 'Profiles, op-eds, podcasts and speaking that make the founder a category voice, with a senior operator pitching and placing every piece personally.',
    url: `${SITE_URL}/pages/founder-pr-agency`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/founder.jpg`,
        width: 1200,
        height: 630,
        alt: 'Founder profiling: op-eds, podcasts, category voice. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founder PR Agency 2026 | Profiles, Op-Eds, Speaking',
    description: 'Profiles, op-eds, podcasts and speaking that make the founder a category voice, with a senior operator pitching and placing every piece personally.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/founder.jpg`,
        alt: 'Founder profiling: op-eds, podcasts, category voice. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__founder-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__founder-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-founder-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
