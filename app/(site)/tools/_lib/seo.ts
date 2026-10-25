import type { Metadata } from 'next';
import { articleNode } from '@/lib/article-schema';
import { ogImage } from '@/lib/i18n/og';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export interface Faq {
  q: string;
  a: string;
}

export function toolMetadata({
  path,
  title,
  description,
  ogTitle,
}: {
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const card = ogImage(path, SITE_URL);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle ?? title,
      description,
      url,
      type: 'website',
      images: [card],
    },
    twitter: {
      card: 'summary_large_image',
      images: [{ url: card.url, alt: card.alt }],
    },
  };
}

export function toolJsonLd({
  path,
  name,
  description,
  faqs,
  category = 'BusinessApplication',
  article,
}: {
  path: string;
  name: string;
  description: string;
  faqs: Faq[];
  category?: string;
  /** Adds an Article node for tool pages that also carry long-form guidance. */
  article?: { datePublished: string; dateModified: string };
}) {
  const url = `${SITE_URL}${path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['WebApplication', 'SoftwareApplication'],
        '@id': `${url}#app`,
        name,
        url,
        description,
        applicationCategory: category,
        operatingSystem: 'Any (web browser)',
        browserRequirements: 'Requires JavaScript',
        isAccessibleForFree: true,
        inLanguage: 'en',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        creator: { '@type': 'Person', name: 'Shilika Jain', url: `${SITE_URL}/about` },
      },
      ...(article
        ? [articleNode({ url, headline: name, description, ...article, about: `${url}#app` })]
        : []),
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_URL}/tools` },
          { '@type': 'ListItem', position: 3, name, item: url },
        ],
      },
    ],
  };
}
