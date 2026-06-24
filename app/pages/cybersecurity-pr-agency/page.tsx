import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Cybersecurity PR Agency 2026 | Analyst-First Comms',
  description: 'Analyst relations, threat-research amplification and tier-1 security press from a fractional senior operator, for less than a Series B retainer.',
  alternates: { canonical: `${SITE_URL}/pages/cybersecurity-pr-agency` },
  openGraph: {
    title: 'Cybersecurity PR Agency 2026 | Analyst-First Comms',
    description: 'Analyst relations, threat-research amplification and tier-1 security press from a fractional senior operator, for less than a Series B retainer.',
    url: `${SITE_URL}/pages/cybersecurity-pr-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity PR Agency 2026 | Analyst-First Comms',
    description: 'Analyst relations, threat-research amplification and tier-1 security press from a fractional senior operator, for less than a Series B retainer.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__cybersecurity-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__cybersecurity-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-cybersecurity-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
