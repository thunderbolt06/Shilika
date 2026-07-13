import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Zero-Knowledge Proof PR in 2026: Explaining ZK Without Losing the Reader',
  description: 'ZK tech is genuinely hard to explain. The translation layer that turns proof systems into a story a mainstream reporter can run.',
  alternates: { canonical: `${SITE_URL}/playbook/zk-proof-pr-2026` },
  openGraph: {
    title: 'Zero-Knowledge Proof PR in 2026: Explaining ZK Without Losing the Reader',
    description: 'ZK tech is genuinely hard to explain. The translation layer that turns proof systems into a story a mainstream reporter can run.',
    url: `${SITE_URL}/playbook/zk-proof-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zero-Knowledge Proof PR in 2026: Explaining ZK Without Losing the Reader',
    description: 'ZK tech is genuinely hard to explain. The translation layer that turns proof systems into a story a mainstream reporter can run.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-121-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-121-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-121-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-121.js" strategy="afterInteractive" />
    </>
  );
}
