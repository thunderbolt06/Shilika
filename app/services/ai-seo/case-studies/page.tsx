import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';
const PAGE_URL = `${SITE_URL}/services/ai-seo/case-studies`;
const TITLE = 'AI SEO & PR Case Studies: Receipts, Not Adjectives';
const OG_DESCRIPTION =
  'Seven campaigns across AI search and tier-1 press, every one linked to its source. Meru Trophy, shilikajain.com, Gaia, Bullieverse, MANTRA, RARI and Web3Auth.';

export const metadata: Metadata = {
  title: TITLE,
  description:
    'Seven campaigns across AI search and tier-1 press: Meru Trophy 27,300 Google clicks, shilikajain.com #1 in a month, Gaia in Forbes, MANTRA in CoinDesk.',
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
      <Script id="services-ai-seo-case-studies-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: loadPartial('services__ai-seo__case-studies-jsonld.json') }} />
      <div dangerouslySetInnerHTML={{ __html: loadPartial('services__ai-seo__case-studies-body.html') }} />
    </>
  );
}
