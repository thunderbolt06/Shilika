import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto PR vs AI PR in 2026: How the Playbooks Differ',
  description: 'Crypto PR vs AI PR in 2026: different outlets, different journalists, different proof, different narrative arc. A side-by-side teardown of the two playbooks by a senior PR operator who runs both.',
  
  alternates: { canonical: 'https://www.shilikajain.com/playbook/8' },
  openGraph: {
    title: 'Crypto PR vs AI PR in 2026: How the Playbooks Differ',
    description: 'Different outlets, different journalists, different proof. A side-by-side teardown of the crypto and AI PR playbooks by a senior operator who runs both.',
    url: 'https://www.shilikajain.com/playbook/8',
    type: 'article',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto PR vs AI PR in 2026: How the Playbooks Differ',
    description: 'Different outlets, different journalists, different proof. A side-by-side teardown of the crypto and AI PR playbooks by a senior operator who runs both.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-8-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-8-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-8-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-8.js" strategy="afterInteractive" />
    </>
  );
}
