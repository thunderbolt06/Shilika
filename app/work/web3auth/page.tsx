import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Web3Auth Case Study: Google Cloud Meets Web3 Wallets',
  description: 'How Shilika Jain turned the Web3Auth and Google Cloud Firebase launch into tier-1 coverage: Blockworks, CoinDesk, Yahoo Finance, Benzinga, syndicated EU.',
  
  alternates: { canonical: 'https://www.shilikajain.com/work/web3auth' },
  openGraph: {
    title: 'Web3Auth: Selling Wallet Infrastructure to Tier-1 Media',
    description: 'Blockworks, CoinDesk, Yahoo Finance, Benzinga and Cointelegraph. How a developer-infrastructure launch became a Web2-meets-Web3 story by Shilika Jain, fractional PR manager.',
    url: 'https://www.shilikajain.com/work/web3auth',
    type: 'article',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/work-web3auth.jpg',
        width: 1200,
        height: 630,
        alt: 'Google Cloud meets Web3 wallets. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3Auth: Selling Wallet Infrastructure to Tier-1 Media',
    description: 'Blockworks, CoinDesk, Yahoo Finance, Benzinga and Cointelegraph. How a developer-infrastructure launch became a Web2-meets-Web3 story by Shilika Jain, fractional PR manager.',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/work-web3auth.jpg',
        alt: 'Google Cloud meets Web3 wallets. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/work__web3auth-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/work__web3auth-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="work-web3auth-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
