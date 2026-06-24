import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Token Launch PR Agency India 2026 | Compliant Dual-Track',
  description: 'Launch a token with an Indian base or audience: the compliance reality and a dual-track domestic plus crypto-native launch.',
  alternates: { canonical: `${SITE_URL}/pages/token-launch-pr-agency-india` },
  openGraph: {
    title: 'Token Launch PR Agency India 2026 | Compliant Dual-Track',
    description: 'Launch a token with an Indian base or audience: the compliance reality and a dual-track domestic plus crypto-native launch.',
    url: `${SITE_URL}/pages/token-launch-pr-agency-india`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Token Launch PR Agency India 2026 | Compliant Dual-Track',
    description: 'Launch a token with an Indian base or audience: the compliance reality and a dual-track domestic plus crypto-native launch.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__token-launch-pr-agency-india-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__token-launch-pr-agency-india-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-token-launch-pr-agency-india-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
