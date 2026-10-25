import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';
const PAGE_URL = `${SITE_URL}/services/ai-seo/web3-ai-startups`;
const TITLE = 'AI SEO for Web3 & AI Startups: PR + GEO in One Team';
const OG_DESCRIPTION =
  'AI SEO for crypto, Web3 and AI startups. Tier-1 press mentions plus answer pages, schema and a citation panel, run by Shilika Jain and Rahil Jain.';

export const metadata: Metadata = {
  title: TITLE,
  description:
    'Get your protocol or AI startup cited when founders, investors and developers ask ChatGPT and Perplexity about your category. Tier-1 PR plus AI SEO.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: OG_DESCRIPTION,
    url: PAGE_URL,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: OG_DESCRIPTION,
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadPartial(file: string): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials', file), 'utf8');
}

export default function Page() {
  return (
    <>
      <Script id="services-ai-seo-web3-ai-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: loadPartial('services__ai-seo__web3-ai-startups-jsonld.json') }} />
      <div dangerouslySetInnerHTML={{ __html: loadPartial('services__ai-seo__web3-ai-startups-body.html') }} />
    </>
  );
}
