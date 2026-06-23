import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'PR for AI x Crypto and Agentic Projects in 2026',
  description: 'Projects at the AI-and-crypto seam need both playbooks at once. How to run credibility-led AI PR and speed-led crypto PR in parallel.',
  alternates: { canonical: `${SITE_URL}/playbook/ai-x-crypto-agent-pr-2026` },
  openGraph: {
    title: 'PR for AI x Crypto and Agentic Projects in 2026',
    description: 'Projects at the AI-and-crypto seam need both playbooks at once. How to run credibility-led AI PR and speed-led crypto PR in parallel.',
    url: `${SITE_URL}/playbook/ai-x-crypto-agent-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PR for AI x Crypto and Agentic Projects in 2026',
    description: 'Projects at the AI-and-crypto seam need both playbooks at once. How to run credibility-led AI PR and speed-led crypto PR in parallel.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-44-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-44-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-44-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-44.js" strategy="afterInteractive" />
    </>
  );
}
