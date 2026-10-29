import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Cybersecurity PR in 2026: Fractional Senior Operator',
  description: 'Fractional PR for cybersecurity founders and CMOs - analyst relations, tier-1 security press, breach comms, and AI-search visibility. Book a 30-min teardown.',
  
  alternates: { canonical: 'https://www.shilikajain.com/services/cybersecurity-pr' },
  openGraph: {
    title: 'Cybersecurity PR in 2026: Fractional Senior Operator',
    description: 'Fractional PR for cybersecurity founders and CMOs. Analyst relations, tier-1 security press, coordinated disclosure, AEO. A senior operator, no agency markup.',
    url: 'https://www.shilikajain.com/services/cybersecurity-pr',
    type: 'website',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/cyber.jpg',
        width: 1200,
        height: 630,
        alt: 'Cybersecurity PR from a senior operator. Fractional, hands-on, built for security founders. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity PR in 2026: Fractional Senior Operator',
    description: 'Fractional PR for cybersecurity founders and CMOs. Analyst relations, tier-1 security press, coordinated disclosure, AEO. A senior operator, no agency markup.',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/cyber.jpg',
        alt: 'Cybersecurity PR from a senior operator. Fractional, hands-on, built for security founders. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__cybersecurity-pr-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__cybersecurity-pr-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="services-cybersecurity-pr-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
