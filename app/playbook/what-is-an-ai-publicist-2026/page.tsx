import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'What an AI Publicist Actually Does in 2026',
  description: 'Half buzzword, half real role. What an AI publicist is, what they should deliver, and how to tell a specialist from a rebadged generalist.',
  alternates: { canonical: `${SITE_URL}/playbook/what-is-an-ai-publicist-2026` },
  openGraph: {
    title: 'What an AI Publicist Actually Does in 2026',
    description: 'Half buzzword, half real role. What an AI publicist is, what they should deliver, and how to tell a specialist from a rebadged generalist.',
    url: `${SITE_URL}/playbook/what-is-an-ai-publicist-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What an AI Publicist Actually Does in 2026',
    description: 'Half buzzword, half real role. What an AI publicist is, what they should deliver, and how to tell a specialist from a rebadged generalist.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-60-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-60-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-60-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-60.js" strategy="afterInteractive" />
    </>
  );
}
