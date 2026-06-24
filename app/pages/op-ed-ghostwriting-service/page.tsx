import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Op-Ed Ghostwriting Service 2026 | Editor-Ready Founder Essays',
  description: 'Your name, your thinking, an editor-ready op-ed placed on a real opinion desk, in your voice.',
  alternates: { canonical: `${SITE_URL}/pages/op-ed-ghostwriting-service` },
  openGraph: {
    title: 'Op-Ed Ghostwriting Service 2026 | Editor-Ready Founder Essays',
    description: 'Your name, your thinking, an editor-ready op-ed placed on a real opinion desk, in your voice.',
    url: `${SITE_URL}/pages/op-ed-ghostwriting-service`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Op-Ed Ghostwriting Service 2026 | Editor-Ready Founder Essays',
    description: 'Your name, your thinking, an editor-ready op-ed placed on a real opinion desk, in your voice.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__op-ed-ghostwriting-service-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__op-ed-ghostwriting-service-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-op-ed-ghostwriting-service-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
