import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Bullieverse Case Study: A $4M Web3 Gaming Raise in India',
  description: 'How Shilika Jain launched the Bullieverse $4M metaverse gaming raise as an Economic Times exclusive, then ran mainstream Indian business press and crypto-native outlets in parallel. A regional Web3 PR case study.',
  
  alternates: { canonical: 'https://www.shilikajain.com/work/bullieverse' },
  openGraph: {
    title: 'Bullieverse: A $4M Web3 Gaming Raise, Launched in India',
    description: 'Economic Times, Inc42, YourStory, Business Today and NewsBTC. How an Indian metaverse studio\'s seed round was run on two press tracks at once, by Shilika Jain, fractional PR manager.',
    url: 'https://www.shilikajain.com/work/bullieverse',
    type: 'article',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bullieverse: A $4M Web3 Gaming Raise, Launched in India',
    description: 'Economic Times, Inc42, YourStory, Business Today and NewsBTC. How an Indian metaverse studio\'s seed round was run on two press tracks at once, by Shilika Jain, fractional PR manager.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
