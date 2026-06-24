import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Founder Personal Branding Agency 2026 | Shilika Jain',
  description: 'Positioning, op-eds, a podcast tour and an author-entity build that turns a technical founder into the cited voice of their category.',
  alternates: { canonical: `${SITE_URL}/pages/founder-personal-branding-agency` },
  openGraph: {
    title: 'Founder Personal Branding Agency 2026 | Shilika Jain',
    description: 'Positioning, op-eds, a podcast tour and an author-entity build that turns a technical founder into the cited voice of their category.',
    url: `${SITE_URL}/pages/founder-personal-branding-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founder Personal Branding Agency 2026 | Shilika Jain',
    description: 'Positioning, op-eds, a podcast tour and an author-entity build that turns a technical founder into the cited voice of their category.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__founder-personal-branding-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__founder-personal-branding-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-founder-personal-branding-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
