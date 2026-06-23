import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Choose a Web3 PR Agency in 2026: The Checklist',
  description: 'A founder-ready checklist for evaluating Web3 PR agencies: the questions that expose real access, the red flags, and the model-fit test.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-choose-web3-pr-agency-checklist-2026` },
  openGraph: {
    title: 'How to Choose a Web3 PR Agency in 2026: The Checklist',
    description: 'A founder-ready checklist for evaluating Web3 PR agencies: the questions that expose real access, the red flags, and the model-fit test.',
    url: `${SITE_URL}/playbook/how-to-choose-web3-pr-agency-checklist-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Choose a Web3 PR Agency in 2026: The Checklist',
    description: 'A founder-ready checklist for evaluating Web3 PR agencies: the questions that expose real access, the red flags, and the model-fit test.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-100-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-100-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-100-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-100.js" strategy="afterInteractive" />
    </>
  );
}
