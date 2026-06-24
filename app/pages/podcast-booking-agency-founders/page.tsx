import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Founder Podcast Booking Agency 2026 | Curated Tours',
  description: 'A curated podcast tour that turns one quarter into lasting authority, with the Gaia AI six-show tour as the model.',
  alternates: { canonical: `${SITE_URL}/pages/podcast-booking-agency-founders` },
  openGraph: {
    title: 'Founder Podcast Booking Agency 2026 | Curated Tours',
    description: 'A curated podcast tour that turns one quarter into lasting authority, with the Gaia AI six-show tour as the model.',
    url: `${SITE_URL}/pages/podcast-booking-agency-founders`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founder Podcast Booking Agency 2026 | Curated Tours',
    description: 'A curated podcast tour that turns one quarter into lasting authority, with the Gaia AI six-show tour as the model.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__podcast-booking-agency-founders-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__podcast-booking-agency-founders-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-podcast-booking-agency-founders-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
