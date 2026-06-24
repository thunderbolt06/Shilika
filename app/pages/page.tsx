import type { Metadata } from 'next';
import Script from 'next/script';
import PagesIndex from './PagesIndex';
import pagesData from '@/data/landing-pages.json';
import '../blog/blog.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

type LP = { slug: string; h1: string; title: string };

export const metadata: Metadata = {
  title: 'Service Pages: Web3, AI, Token Launch & APAC PR | Shilika Jain',
  description:
    '100 service pages on Web3 PR, token launch, AI startup PR, KOL marketing, cybersecurity PR, founder profiling and APAC, filterable by service, region and vertical. Send a brief or book a call.',
  alternates: { canonical: `${SITE_URL}/pages` },
  openGraph: {
    title: 'Service Pages — Shilika Jain Fractional PR',
    description:
      'Filterable directory of fractional PR service pages for Web3, AI and cybersecurity founders.',
    url: `${SITE_URL}/pages`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
};

export default function Page() {
  const items = pagesData as LP[];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/pages#collection`,
        url: `${SITE_URL}/pages`,
        name: 'Service Pages — Shilika Jain Fractional PR',
        description:
          'Filterable directory of fractional PR service pages for Web3, AI, token launch, KOL, cybersecurity, founder profiling and APAC.',
        inLanguage: 'en',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        author: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: 'Shilika Jain',
          url: `${SITE_URL}/about`,
        },
        mainEntity: {
          '@type': 'ItemList',
          name: 'Shilika Jain Service Pages',
          numberOfItems: items.length,
          itemListElement: items.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE_URL}/pages/${p.slug}`,
            name: p.title,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Pages', item: `${SITE_URL}/pages` },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="pages-collection-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PagesIndex />
    </>
  );
}
