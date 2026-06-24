import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Thought Leadership Ghostwriting 2026 | Defensible POV',
  description: 'Ghostwritten essays built on a genuine, defensible point of view, placed on real desks.',
  alternates: { canonical: `${SITE_URL}/pages/thought-leadership-ghostwriting` },
  openGraph: {
    title: 'Thought Leadership Ghostwriting 2026 | Defensible POV',
    description: 'Ghostwritten essays built on a genuine, defensible point of view, placed on real desks.',
    url: `${SITE_URL}/pages/thought-leadership-ghostwriting`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thought Leadership Ghostwriting 2026 | Defensible POV',
    description: 'Ghostwritten essays built on a genuine, defensible point of view, placed on real desks.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__thought-leadership-ghostwriting-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__thought-leadership-ghostwriting-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-thought-leadership-ghostwriting-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
