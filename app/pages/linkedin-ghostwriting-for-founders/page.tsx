import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'LinkedIn Ghostwriting for Founders 2026',
  description: 'A LinkedIn content system tuned to the 2026 algorithm that builds authority without the motivational-account vibe.',
  alternates: { canonical: `${SITE_URL}/pages/linkedin-ghostwriting-for-founders` },
  openGraph: {
    title: 'LinkedIn Ghostwriting for Founders 2026',
    description: 'A LinkedIn content system tuned to the 2026 algorithm that builds authority without the motivational-account vibe.',
    url: `${SITE_URL}/pages/linkedin-ghostwriting-for-founders`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/content.jpg`,
        width: 1200,
        height: 630,
        alt: 'Content writing for founders: op-eds, whitepapers. For Web3 and AI teams. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Ghostwriting for Founders 2026',
    description: 'A LinkedIn content system tuned to the 2026 algorithm that builds authority without the motivational-account vibe.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/content.jpg`,
        alt: 'Content writing for founders: op-eds, whitepapers. For Web3 and AI teams. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
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
