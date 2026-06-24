import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Korea KOL Marketing Agency 2026 | Native Creator Waves',
  description: 'Korean creator activation by Korea\'s own rules, rates and platforms, with native briefs and disclosure.',
  alternates: { canonical: `${SITE_URL}/pages/korea-kol-marketing-agency` },
  openGraph: {
    title: 'Korea KOL Marketing Agency 2026 | Native Creator Waves',
    description: 'Korean creator activation by Korea\'s own rules, rates and platforms, with native briefs and disclosure.',
    url: `${SITE_URL}/pages/korea-kol-marketing-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korea KOL Marketing Agency 2026 | Native Creator Waves',
    description: 'Korean creator activation by Korea\'s own rules, rates and platforms, with native briefs and disclosure.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__korea-kol-marketing-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__korea-kol-marketing-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-korea-kol-marketing-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
