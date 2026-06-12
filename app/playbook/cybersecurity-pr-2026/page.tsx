import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Cybersecurity PR in 2026: Analyst Relations + AI Citations',
  description:
    'A 12-minute cybersecurity PR playbook. Gartner and Forrester cadence, threat-research news engines, named security desks, AI Mode citation tactics for vendors.',
  alternates: { canonical: `${SITE_URL}/playbook/cybersecurity-pr-2026` },
  openGraph: {
    title: 'Cybersecurity PR in 2026: How Vendors Get Cited by Analysts and AI Engines',
    description:
      'Analyst relations as the spine, threat research as the news engine, AI Mode and AI Overviews as the measurement layer. Named Gartner, Forrester, Dark Reading, SC Media and CyberScoop playbooks for 2026 cybersecurity vendors.',
    url: `${SITE_URL}/playbook/cybersecurity-pr-2026`,
    type: 'article',
    publishedTime: '2026-05-30',
    modifiedTime: '2026-05-30',
    authors: ['Shilika Jain'],
    tags: [
      'Cybersecurity PR',
      'Analyst relations',
      'Generative engine optimization',
      'AI Overviews',
      'Magic Quadrant',
      'Forrester Wave',
    ],
    images: [
      {
        url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg',
        width: 1200,
        height: 628,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity PR in 2026: How Vendors Get Cited by Analysts and AI Engines',
    description:
      'A 12-minute playbook on analyst relations, threat-research amplification and AI Mode citations for cybersecurity vendors in 2026.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-10-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-10-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script
        id="playbook-10-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
