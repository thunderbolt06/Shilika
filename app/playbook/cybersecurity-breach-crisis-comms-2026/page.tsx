import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Cybersecurity Breach and Crisis Communications in 2026',
  description: 'When you are the breach, not the researcher. The first-hour playbook, the holding statement, and how to communicate through an incident.',
  alternates: { canonical: `${SITE_URL}/playbook/cybersecurity-breach-crisis-comms-2026` },
  openGraph: {
    title: 'Cybersecurity Breach and Crisis Communications in 2026',
    description: 'When you are the breach, not the researcher. The first-hour playbook, the holding statement, and how to communicate through an incident.',
    url: `${SITE_URL}/playbook/cybersecurity-breach-crisis-comms-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity Breach and Crisis Communications in 2026',
    description: 'When you are the breach, not the researcher. The first-hour playbook, the holding statement, and how to communicate through an incident.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-93-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-93-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-93-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-93.js" strategy="afterInteractive" />
    </>
  );
}
