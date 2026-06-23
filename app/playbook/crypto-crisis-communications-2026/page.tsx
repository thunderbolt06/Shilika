import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Crisis Communications in 2026: Exploits, Hacks and Depegs',
  description: 'The first hour decides the story. A field guide to running comms through an exploit, hack or depeg, with the holding-statement template.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-crisis-communications-2026` },
  openGraph: {
    title: 'Crypto Crisis Communications in 2026: Exploits, Hacks and Depegs',
    description: 'The first hour decides the story. A field guide to running comms through an exploit, hack or depeg, with the holding-statement template.',
    url: `${SITE_URL}/playbook/crypto-crisis-communications-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Crisis Communications in 2026: Exploits, Hacks and Depegs',
    description: 'The first hour decides the story. A field guide to running comms through an exploit, hack or depeg, with the holding-statement template.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-43-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-43-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-43-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-43.js" strategy="afterInteractive" />
    </>
  );
}
