import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Cybersecurity Analyst Relations Agency 2026 | MQ & Wave',
  description: 'Briefing cadence and positioning that earns Magic Quadrant and Wave consideration before press even runs.',
  alternates: { canonical: `${SITE_URL}/pages/cybersecurity-analyst-relations-agency` },
  openGraph: {
    title: 'Cybersecurity Analyst Relations Agency 2026 | MQ & Wave',
    description: 'Briefing cadence and positioning that earns Magic Quadrant and Wave consideration before press even runs.',
    url: `${SITE_URL}/pages/cybersecurity-analyst-relations-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cybersecurity Analyst Relations Agency 2026 | MQ & Wave',
    description: 'Briefing cadence and positioning that earns Magic Quadrant and Wave consideration before press even runs.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__cybersecurity-analyst-relations-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__cybersecurity-analyst-relations-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-cybersecurity-analyst-relations-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
