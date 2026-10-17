import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'AI Thought Leadership Agency 2026 | Executive Positioning',
  description: 'Position a technical AI founder as a cited category authority across op-eds, podcasts and analyst rooms.',
  alternates: { canonical: `${SITE_URL}/pages/ai-thought-leadership-agency` },
  openGraph: {
    title: 'AI Thought Leadership Agency 2026 | Executive Positioning',
    description: 'Position a technical AI founder as a cited category authority across op-eds, podcasts and analyst rooms.',
    url: `${SITE_URL}/pages/ai-thought-leadership-agency`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/founder.jpg`,
        width: 1200,
        height: 630,
        alt: 'Founder profiling: op-eds, podcasts, category voice. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Thought Leadership Agency 2026 | Executive Positioning',
    description: 'Position a technical AI founder as a cited category authority across op-eds, podcasts and analyst rooms.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/founder.jpg`,
        alt: 'Founder profiling: op-eds, podcasts, category voice. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__ai-thought-leadership-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__ai-thought-leadership-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-ai-thought-leadership-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
