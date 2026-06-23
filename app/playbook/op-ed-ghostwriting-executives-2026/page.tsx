import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Op-Ed Ghostwriting for Executives in 2026: How It Works',
  description: 'The founder\'s name, the founder\'s thinking, an editor-ready piece. What ghostwriting actually involves, what it costs, and how to keep it authentic.',
  alternates: { canonical: `${SITE_URL}/playbook/op-ed-ghostwriting-executives-2026` },
  openGraph: {
    title: 'Op-Ed Ghostwriting for Executives in 2026: How It Works',
    description: 'The founder\'s name, the founder\'s thinking, an editor-ready piece. What ghostwriting actually involves, what it costs, and how to keep it authentic.',
    url: `${SITE_URL}/playbook/op-ed-ghostwriting-executives-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Op-Ed Ghostwriting for Executives in 2026: How It Works',
    description: 'The founder\'s name, the founder\'s thinking, an editor-ready piece. What ghostwriting actually involves, what it costs, and how to keep it authentic.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-70-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-70-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-70-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-70.js" strategy="afterInteractive" />
    </>
  );
}
