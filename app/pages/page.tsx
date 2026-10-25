import type { Metadata } from 'next';
import PagesIndex from './PagesIndex';
import { PhotoBand } from '@/components/site/Media';
import { ogImage } from '@/lib/i18n/og';
import pagesData from '@/data/landing-pages.json';
import '../blog/blog.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

type LP = { slug: string; h1: string; title: string };

const CARD = ogImage('/pages', SITE_URL);

export const metadata: Metadata = {
  title: 'Web3, AI & Token Launch PR Service Pages',
  description:
    '100 service pages on Web3 PR, token launch, AI startup PR, KOL marketing, cybersecurity PR and APAC, filterable by service, region and vertical.',
  alternates: { canonical: `${SITE_URL}/pages` },
  openGraph: {
    title: 'Service Pages - Shilika Jain Fractional PR',
    description:
      'Filterable directory of fractional PR service pages for Web3, AI and cybersecurity founders.',
    url: `${SITE_URL}/pages`,
    type: 'website',
    images: [CARD],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: CARD.url, alt: CARD.alt }],
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
        name: 'Service Pages - Shilika Jain Fractional PR',
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
      <script
        id="pages-collection-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PagesIndex
        band={
          <PhotoBand
            id="depin-day-hk"
            eyebrow="Service pages"
            title={
              <>
                Find the page that <em>fits your launch</em>.
              </>
            }
            sub="Filter by service, region or vertical, then send a brief."
            sizes="(min-width: 1344px) 1280px, 100vw"
          />
        }
      />
    </>
  );
}
