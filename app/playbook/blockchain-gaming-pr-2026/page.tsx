import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Blockchain Gaming PR in 2026: How to Promote a Web3 Game',
  description: 'Web3 games have two audiences who hate each other\'s language. How to run dual-track PR for gamers and crypto media without alienating either.',
  alternates: { canonical: `${SITE_URL}/playbook/blockchain-gaming-pr-2026` },
  openGraph: {
    title: 'Blockchain Gaming PR in 2026: How to Promote a Web3 Game',
    description: 'Web3 games have two audiences who hate each other\'s language. How to run dual-track PR for gamers and crypto media without alienating either.',
    url: `${SITE_URL}/playbook/blockchain-gaming-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blockchain Gaming PR in 2026: How to Promote a Web3 Game',
    description: 'Web3 games have two audiences who hate each other\'s language. How to run dual-track PR for gamers and crypto media without alienating either.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-38-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-38-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-38-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-38.js" strategy="afterInteractive" />
    </>
  );
}
