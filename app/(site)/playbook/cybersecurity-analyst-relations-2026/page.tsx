import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Cybersecurity Analyst Relations in 2026',
  description: 'Analysts shape the shortlist before press ever runs. The briefing cadence, the Magic Quadrant and Wave reality, and how vendors earn inclusion.',
  alternates: { canonical: `${SITE_URL}/playbook/cybersecurity-analyst-relations-2026` },
  openGraph: {
    title: 'Cybersecurity Analyst Relations in 2026',
    description: 'Analysts shape the shortlist before press ever runs. The briefing cadence, the Magic Quadrant and Wave reality, and how vendors earn inclusion.',
    url: `${SITE_URL}/playbook/cybersecurity-analyst-relations-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/cyber.jpg`,
        width: 1200,
        height: 630,
        alt: 'Cybersecurity PR from a senior operator. Fractional, hands-on, built for security founders. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity Analyst Relations in 2026',
    description: 'Analysts shape the shortlist before press ever runs. The briefing cadence, the Magic Quadrant and Wave reality, and how vendors earn inclusion.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/cyber.jpg`,
        alt: 'Cybersecurity PR from a senior operator. Fractional, hands-on, built for security founders. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-91-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-91-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="playbook-91-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-91.js" strategy="afterInteractive" />
    </>
  );
}
