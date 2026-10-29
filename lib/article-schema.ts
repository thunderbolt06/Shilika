import { SITE_URL } from '@/lib/i18n/config';

// schema.org Article node for pages that are written content but whose other markup is a Service,
// WebPage, DefinedTerm or similar. Site Audit and AI crawlers look for headline, author,
// datePublished and dateModified on an Article-family type; this keeps them identical everywhere.

export const SITE_AUTHOR = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Shilika Jain',
  url: `${SITE_URL}/`,
  sameAs: [
    'https://www.linkedin.com/in/shilika/',
    'https://x.com/Shilika_jain',
    'https://cryptodaily.co.uk/author/ShilikaJain',
  ],
};

export const SITE_PUBLISHER = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Shilika Jain - Fractional PR',
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/shilika-press-square-1200.jpg` },
};

export function articleNode({
  url,
  headline,
  description,
  datePublished,
  dateModified,
  inLanguage = 'en',
  about,
}: {
  url: string;
  headline: string;
  description?: string;
  datePublished: string;
  dateModified: string;
  inLanguage?: string;
  /** `@id` of the node this article is about (the Service, DefinedTerm, ...). */
  about?: string;
}) {
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: headline.slice(0, 110),
    ...(description ? { description } : {}),
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage,
    datePublished,
    dateModified,
    author: SITE_AUTHOR,
    publisher: SITE_PUBLISHER,
    ...(about ? { about: { '@id': about } } : {}),
  };
}
