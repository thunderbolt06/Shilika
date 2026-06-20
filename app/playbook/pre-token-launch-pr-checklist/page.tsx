import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Pre-Token Launch PR Checklist 2026: 25 Steps Before TGE',
  description: 'The 25-item, five-phase pre-token-launch PR checklist for 2026: positioning, press kit, embargo, KOL waves, launch week and post-TGE, from a fractional operator. Free PDF.',

  alternates: { canonical: `${SITE_URL}/playbook/pre-token-launch-pr-checklist` },
  openGraph: {
    title: 'The Pre-Token Launch PR Checklist for 2026',
    description: '25 steps across five phases over an eight-week run-up: foundation, narrative and assets, media and KOL outreach, launch week, and post-TGE follow-through. Free one-page PDF.',
    url: `${SITE_URL}/playbook/pre-token-launch-pr-checklist`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Pre-Token Launch PR Checklist for 2026',
    description: '25 steps across five phases over an eight-week run-up to a TGE, from a fractional Web3 PR operator. Free one-page PDF.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-12-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-12-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-12-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-12.js" strategy="afterInteractive" />
    </>
  );
}
