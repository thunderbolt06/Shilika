import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Gaia AI Case Study: How We Placed the Stripe for AI Agents',
  description: 'How Shilika Jain placed Gaia AI in Forbes, Decrypt, and Benzinga as the Stripe for AI agents. Named outlets, named reporters, 6-podcast founder tour. 2025 campaign teardown.',
  
  alternates: { canonical: 'https://www.shilikajain.com/work/gaia-ai' },
  openGraph: {
    title: 'Gaia AI Case Study: Placing the Stripe for AI Agents in Forbes',
    description: 'Forbes, Decrypt, Benzinga, CryptoDaily, Binance Square. A 2025 AI PR campaign teardown by Shilika Jain, fractional PR manager.',
    url: 'https://www.shilikajain.com/work/gaia-ai',
    type: 'article',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaia AI Case Study: Placing the Stripe for AI Agents in Forbes',
    description: 'Forbes, Decrypt, Benzinga, CryptoDaily, Binance Square. A 2025 AI PR campaign teardown by Shilika Jain, fractional PR manager.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/work__gaia-ai-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/work__gaia-ai-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="work-gaia-ai-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
