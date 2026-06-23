import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Turning Threat Research Into Coverage in 2026',
  description: 'A good vulnerability report is the best PR a security vendor has. How to package research for coverage without crossing disclosure lines.',
  alternates: { canonical: `${SITE_URL}/playbook/cybersecurity-threat-research-pr-2026` },
  openGraph: {
    title: 'Turning Threat Research Into Coverage in 2026',
    description: 'A good vulnerability report is the best PR a security vendor has. How to package research for coverage without crossing disclosure lines.',
    url: `${SITE_URL}/playbook/cybersecurity-threat-research-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turning Threat Research Into Coverage in 2026',
    description: 'A good vulnerability report is the best PR a security vendor has. How to package research for coverage without crossing disclosure lines.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-92-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-92-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-92-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-92.js" strategy="afterInteractive" />
    </>
  );
}
