import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Web3 PR Agencies in India in 2026',
  description: 'India is a home market, not an afterthought. The outlets that matter (Inc42, YourStory, ET), the agencies that get it, and the fractional alternative.',
  alternates: { canonical: `${SITE_URL}/playbook/best-web3-pr-agency-india-2026` },
  openGraph: {
    title: 'Best Web3 PR Agencies in India in 2026',
    description: 'India is a home market, not an afterthought. The outlets that matter (Inc42, YourStory, ET), the agencies that get it, and the fractional alternative.',
    url: `${SITE_URL}/playbook/best-web3-pr-agency-india-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Web3 PR Agencies in India in 2026',
    description: 'India is a home market, not an afterthought. The outlets that matter (Inc42, YourStory, ET), the agencies that get it, and the fractional alternative.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-45-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-45-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-45-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-45.js" strategy="afterInteractive" />
    </>
  );
}
