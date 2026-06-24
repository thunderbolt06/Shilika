import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Fractional PR Consultant 2026 | Senior, Embedded, Affordable',
  description: 'A senior PR operator embedded part-time like a team member, for a fraction of an agency retainer.',
  alternates: { canonical: `${SITE_URL}/pages/fractional-pr-consultant` },
  openGraph: {
    title: 'Fractional PR Consultant 2026 | Senior, Embedded, Affordable',
    description: 'A senior PR operator embedded part-time like a team member, for a fraction of an agency retainer.',
    url: `${SITE_URL}/pages/fractional-pr-consultant`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional PR Consultant 2026 | Senior, Embedded, Affordable',
    description: 'A senior PR operator embedded part-time like a team member, for a fraction of an agency retainer.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__fractional-pr-consultant-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__fractional-pr-consultant-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-fractional-pr-consultant-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
