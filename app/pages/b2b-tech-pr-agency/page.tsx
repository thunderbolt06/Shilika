import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'B2B Tech PR Agency 2026 | Category, Analysts, Proof',
  description: 'B2B PR that sells to a committee, not a crowd, with category narrative and customer proof.',
  alternates: { canonical: `${SITE_URL}/pages/b2b-tech-pr-agency` },
  openGraph: {
    title: 'B2B Tech PR Agency 2026 | Category, Analysts, Proof',
    description: 'B2B PR that sells to a committee, not a crowd, with category narrative and customer proof.',
    url: `${SITE_URL}/pages/b2b-tech-pr-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B Tech PR Agency 2026 | Category, Analysts, Proof',
    description: 'B2B PR that sells to a committee, not a crowd, with category narrative and customer proof.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__b2b-tech-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__b2b-tech-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-b2b-tech-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
