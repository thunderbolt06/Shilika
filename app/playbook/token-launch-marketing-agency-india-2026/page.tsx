import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Token Launch Marketing Agencies in India in 2026',
  description: 'Launching a token with an Indian home base or audience. The agencies, the compliance reality, and the dual-track launch that works here.',
  alternates: { canonical: `${SITE_URL}/playbook/token-launch-marketing-agency-india-2026` },
  openGraph: {
    title: 'Token Launch Marketing Agencies in India in 2026',
    description: 'Launching a token with an Indian home base or audience. The agencies, the compliance reality, and the dual-track launch that works here.',
    url: `${SITE_URL}/playbook/token-launch-marketing-agency-india-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Token Launch Marketing Agencies in India in 2026',
    description: 'Launching a token with an Indian home base or audience. The agencies, the compliance reality, and the dual-track launch that works here.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-52-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-52-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-52-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-52.js" strategy="afterInteractive" />
    </>
  );
}
