import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Cybersecurity Marketing Agency 2026 | Analyst-Literate',
  description: 'Marketing for security vendors that understands analysts, threat research and the trust game, from category narrative to credible press coverage.',
  alternates: { canonical: `${SITE_URL}/pages/cybersecurity-marketing-agency` },
  openGraph: {
    title: 'Cybersecurity Marketing Agency 2026 | Analyst-Literate',
    description: 'Marketing for security vendors that understands analysts, threat research and the trust game, from category narrative to credible press coverage.',
    url: `${SITE_URL}/pages/cybersecurity-marketing-agency`,
    type: 'website',
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
    title: 'Cybersecurity Marketing Agency 2026 | Analyst-Literate',
    description: 'Marketing for security vendors that understands analysts, threat research and the trust game, from category narrative to credible press coverage.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/cyber.jpg`,
        alt: 'Cybersecurity PR from a senior operator. Fractional, hands-on, built for security founders. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__cybersecurity-marketing-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__cybersecurity-marketing-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-cybersecurity-marketing-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
