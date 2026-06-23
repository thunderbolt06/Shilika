import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Web3 PR Agency Reviews on Clutch in 2026: How to Read Them',
  description: 'Review sites are gameable. How to read Clutch, G2 and Trustpilot ratings for PR agencies without being misled by curated testimonials.',
  alternates: { canonical: `${SITE_URL}/playbook/web3-pr-agency-reviews-clutch-2026` },
  openGraph: {
    title: 'Web3 PR Agency Reviews on Clutch in 2026: How to Read Them',
    description: 'Review sites are gameable. How to read Clutch, G2 and Trustpilot ratings for PR agencies without being misled by curated testimonials.',
    url: `${SITE_URL}/playbook/web3-pr-agency-reviews-clutch-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 PR Agency Reviews on Clutch in 2026: How to Read Them',
    description: 'Review sites are gameable. How to read Clutch, G2 and Trustpilot ratings for PR agencies without being misled by curated testimonials.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-101-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-101-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-101-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-101.js" strategy="afterInteractive" />
    </>
  );
}
