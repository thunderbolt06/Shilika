import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Crypto Press Release Services Compared in 2026',
  description: 'A criteria-led look at the main crypto PR-distribution services, what they really deliver, and the cheaper earned-media alternative.',
  alternates: { canonical: `${SITE_URL}/playbook/best-crypto-press-release-services-2026` },
  openGraph: {
    title: 'Best Crypto Press Release Services Compared in 2026',
    description: 'A criteria-led look at the main crypto PR-distribution services, what they really deliver, and the cheaper earned-media alternative.',
    url: `${SITE_URL}/playbook/best-crypto-press-release-services-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Crypto Press Release Services Compared in 2026',
    description: 'A criteria-led look at the main crypto PR-distribution services, what they really deliver, and the cheaper earned-media alternative.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-20-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-20-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-20-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-20.js" strategy="afterInteractive" />
    </>
  );
}
