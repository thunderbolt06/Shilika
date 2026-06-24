import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'LinkedIn Ghostwriting for Founders 2026 | Authority, Not Cringe',
  description: 'A LinkedIn content system tuned to the 2026 algorithm that builds authority without the motivational-account vibe.',
  alternates: { canonical: `${SITE_URL}/pages/linkedin-ghostwriting-for-founders` },
  openGraph: {
    title: 'LinkedIn Ghostwriting for Founders 2026 | Authority, Not Cringe',
    description: 'A LinkedIn content system tuned to the 2026 algorithm that builds authority without the motivational-account vibe.',
    url: `${SITE_URL}/pages/linkedin-ghostwriting-for-founders`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Ghostwriting for Founders 2026 | Authority, Not Cringe',
    description: 'A LinkedIn content system tuned to the 2026 algorithm that builds authority without the motivational-account vibe.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__linkedin-ghostwriting-for-founders-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__linkedin-ghostwriting-for-founders-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-linkedin-ghostwriting-for-founders-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
