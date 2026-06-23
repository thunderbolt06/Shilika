import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'The TGE Communications Timeline for 2026: Week by Week',
  description: 'An eight-week, dated comms timeline into and out of a token generation event, mapping narrative, media, KOLs and crisis prep to the calendar.',
  alternates: { canonical: `${SITE_URL}/playbook/tge-communications-timeline-2026` },
  openGraph: {
    title: 'The TGE Communications Timeline for 2026: Week by Week',
    description: 'An eight-week, dated comms timeline into and out of a token generation event, mapping narrative, media, KOLs and crisis prep to the calendar.',
    url: `${SITE_URL}/playbook/tge-communications-timeline-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The TGE Communications Timeline for 2026: Week by Week',
    description: 'An eight-week, dated comms timeline into and out of a token generation event, mapping narrative, media, KOLs and crisis prep to the calendar.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-32-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-32-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-32-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-32.js" strategy="afterInteractive" />
    </>
  );
}
