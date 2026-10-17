import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Cybersecurity PR Agency USA 2026 | Security Press & Analysts',
  description: 'US security press and analyst access from a senior operator, for less than a Series B agency retainer.',
  alternates: { canonical: `${SITE_URL}/pages/cybersecurity-pr-agency-usa` },
  openGraph: {
    title: 'Cybersecurity PR Agency USA 2026 | Security Press & Analysts',
    description: 'US security press and analyst access from a senior operator, for less than a Series B agency retainer.',
    url: `${SITE_URL}/pages/cybersecurity-pr-agency-usa`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/cyber.jpg`,
        width: 1200,
        height: 630,
        alt: 'Cybersecurity PR from a senior operator. Fractional, hands-on, built for security founders. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity PR Agency USA 2026 | Security Press & Analysts',
    description: 'US security press and analyst access from a senior operator, for less than a Series B agency retainer.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/cyber.jpg`,
        alt: 'Cybersecurity PR from a senior operator. Fractional, hands-on, built for security founders. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__cybersecurity-pr-agency-usa-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__cybersecurity-pr-agency-usa-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-cybersecurity-pr-agency-usa-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
