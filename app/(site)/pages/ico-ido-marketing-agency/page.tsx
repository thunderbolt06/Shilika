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
    title: 'ICO & IDO Marketing Agency 2026 | Credible Launch Comms',
    description: 'Build demand and credibility around a public sale without the hype-cycle damage that kills long-term trust.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/token-launch.jpg`,
        alt: 'Token launch PR: TGE comms, exchange and KOL waves. Photo: Shilika Jain in a black blazer beside the TOKEN2049 Singapore sign in the conference hall.',
      },
    ],
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
