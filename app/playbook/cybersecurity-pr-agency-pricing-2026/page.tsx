import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Cybersecurity PR Agency Retainer Pricing in 2026',
  description: 'What cybersecurity PR costs, why analyst relations changes the math, and how a fractional model compares to a median Series B retainer.',
  alternates: { canonical: `${SITE_URL}/playbook/cybersecurity-pr-agency-pricing-2026` },
  openGraph: {
    title: 'Cybersecurity PR Agency Retainer Pricing in 2026',
    description: 'What cybersecurity PR costs, why analyst relations changes the math, and how a fractional model compares to a median Series B retainer.',
    url: `${SITE_URL}/playbook/cybersecurity-pr-agency-pricing-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity PR Agency Retainer Pricing in 2026',
    description: 'What cybersecurity PR costs, why analyst relations changes the math, and how a fractional model compares to a median Series B retainer.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-89-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-89-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-89-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-89.js" strategy="afterInteractive" />
    </>
  );
}
