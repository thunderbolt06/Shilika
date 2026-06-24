import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'ICO & IDO Marketing Agency 2026 | Credible Launch Comms',
  description: 'Build demand and credibility around a public sale without the hype-cycle damage that kills long-term trust.',
  alternates: { canonical: `${SITE_URL}/pages/ico-ido-marketing-agency` },
  openGraph: {
    title: 'ICO & IDO Marketing Agency 2026 | Credible Launch Comms',
    description: 'Build demand and credibility around a public sale without the hype-cycle damage that kills long-term trust.',
    url: `${SITE_URL}/pages/ico-ido-marketing-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICO & IDO Marketing Agency 2026 | Credible Launch Comms',
    description: 'Build demand and credibility around a public sale without the hype-cycle damage that kills long-term trust.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__ico-ido-marketing-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__ico-ido-marketing-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-ico-ido-marketing-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
