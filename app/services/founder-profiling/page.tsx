import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Founder Profiling 2026: Op-Eds, Podcast Tours, Category Voice',
  description: 'Founder profiling for Web3 and AI founders. Op-ed ghostwriting, podcast tours, LinkedIn/X strategy, speaker placement. Senior fractional operator. Book a call.',
  
  alternates: { canonical: 'https://www.shilikajain.com/services/founder-profiling' },
  openGraph: {
    title: 'Founder Profiling 2026: Op-Eds, Podcast Tours, Category Voice',
    description: 'Founder profiling and thought leadership for Web3 and AI founders. Op-ed ghostwriting in CoinDesk and Forbes, podcast tour booking, LinkedIn/X strategy, speaker placement. Fluence DePIN, Gaia AI, MANTRA proof.',
    url: 'https://www.shilikajain.com/services/founder-profiling',
    type: 'website',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founder Profiling 2026: Op-Eds, Podcast Tours, Category Voice',
    description: 'Founder profiling and thought leadership for Web3 and AI founders. Op-ed ghostwriting in CoinDesk and Forbes, podcast tour booking, LinkedIn/X strategy, speaker placement. Fluence DePIN, Gaia AI, MANTRA proof.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__founder-profiling-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__founder-profiling-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
