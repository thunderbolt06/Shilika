import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Bullieverse Case Study: A $4M Web3 Gaming Raise in India',
  description: 'How Shilika Jain launched Bullieverse $4M metaverse gaming raise: an Economic Times exclusive plus Indian business press and crypto-native outlets in parallel.',
  
  alternates: { canonical: 'https://www.shilikajain.com/work/bullieverse' },
  openGraph: {
    title: 'Bullieverse: A $4M Web3 Gaming Raise, Launched in India',
    description: 'Economic Times, Inc42, YourStory, Business Today and NewsBTC. How an Indian metaverse studio\'s seed round was run on two press tracks at once, by Shilika Jain, fractional PR manager.',
    url: 'https://www.shilikajain.com/work/bullieverse',
    type: 'article',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/work-bullieverse.jpg',
        width: 1200,
        height: 630,
        alt: 'A $4M Web3 gaming raise in India. Photo: Shilika Jain in a pink satin shirt standing in a wood-panelled lounge with framed posters.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bullieverse: A $4M Web3 Gaming Raise, Launched in India',
    description: 'Economic Times, Inc42, YourStory, Business Today and NewsBTC. How an Indian metaverse studio\'s seed round was run on two press tracks at once, by Shilika Jain, fractional PR manager.',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/work-bullieverse.jpg',
        alt: 'A $4M Web3 gaming raise in India. Photo: Shilika Jain in a pink satin shirt standing in a wood-panelled lounge with framed posters.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/work__bullieverse-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/work__bullieverse-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="work-bullieverse-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
