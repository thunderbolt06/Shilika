import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import { GLOSSARY, getGlossaryTerm } from '@/data/glossary';
import { AVATAR_IDS, Photo, pickPhoto, regionOf } from '@/components/site/Media';
import { articleNode } from '@/lib/article-schema';
import { ogImage } from '@/lib/i18n/og';
import '../../blog/blog.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const dynamicParams = false;

const CARD = ogImage('/glossary', SITE_URL);

type Params = Promise<{ term: string }>;

export function generateStaticParams() {
  return GLOSSARY.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { term } = await params;
  const entry = getGlossaryTerm(term);
  if (!entry) return {};
  const url = `${SITE_URL}/glossary/${entry.slug}`;
  return {
    title: entry.metaTitle,
    description: entry.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: entry.metaTitle,
      description: entry.metaDescription,
      url,
      type: 'article',
      images: [CARD],
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.metaTitle,
      description: entry.metaDescription,
      images: [{ url: CARD.url, alt: CARD.alt }],
    },
  };
}

function buildJsonLd(entry: NonNullable<ReturnType<typeof getGlossaryTerm>>) {
  const url = `${SITE_URL}/glossary/${entry.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DefinedTerm',
        '@id': `${url}#term`,
        name: entry.term,
        description: entry.answer,
        url,
        inDefinedTermSet: {
          '@type': 'DefinedTermSet',
          '@id': `${SITE_URL}/glossary#set`,
          name: 'Web3 & AI PR Glossary',
          url: `${SITE_URL}/glossary`,
        },
      },
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: entry.title,
        description: entry.metaDescription,
        inLanguage: 'en',
        datePublished: entry.datePublished,
        dateModified: entry.dateModified,
        isPartOf: { '@id': `${SITE_URL}/glossary#set` },
        about: entry.about.map((name) => ({ '@type': 'Thing', name })),
        author: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: 'Shilika Jain',
          url: `${SITE_URL}/`,
          sameAs: [
            'https://www.linkedin.com/in/shilika/',
            'https://x.com/Shilika_jain',
            'https://cryptodaily.co.uk/author/ShilikaJain',
          ],
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'Shilika Jain - Fractional PR',
          url: `${SITE_URL}/`,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/shilika-press-square-1200.jpg` },
        },
      },
      articleNode({
        url,
        headline: entry.title,
        description: entry.metaDescription,
        datePublished: entry.datePublished,
        dateModified: entry.dateModified,
        about: `${url}#term`,
      }),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${SITE_URL}/glossary` },
          { '@type': 'ListItem', position: 3, name: entry.title, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: entry.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

export default async function GlossaryTermPage({ params }: { params: Params }) {
  const { term } = await params;
  const entry = getGlossaryTerm(term);
  if (!entry) notFound();

  const jsonLd = JSON.stringify(buildJsonLd(entry));
  const avatarId = pickPhoto({
    seed: entry.slug,
    crop: 'sq',
    region: regionOf(entry.slug, entry.title),
    from: AVATAR_IDS,
  });
  const modified = new Date(entry.dateModified).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <script
        id={`glossary-${entry.slug}-jsonld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <EditorialShell active="playbook">
        <main className="post-page">
          <article className="post-main">
            <header className="post-head">
              <p className="post-kicker">
                <span className="post-kicker-num">Glossary</span>
                <a href="/glossary">All terms</a>
                <span>·</span>
                <span>{entry.tag}</span>
              </p>
              <h1 className="post-title">{entry.title}</h1>
              <p className="post-deck">{entry.deck}</p>

              <div className="post-meta-row">
                <div className="post-meta-author">
                  <Photo id={avatarId} crop="sq" sizes="44px" alt="" />
                  <div>
                    <p className="post-meta-author-name">
                      <a href="/about">Shilika Jain</a>
                    </p>
                    <p className="post-meta-author-meta">Reviewed {modified}</p>
                  </div>
                </div>
              </div>
            </header>

            <div className="post-body-wrap">
              <div className="prose-shilika">
                <div className="glossary-answer">
                  <p className="glossary-answer-label">In short</p>
                  <p>{entry.answer}</p>
                </div>

                <div dangerouslySetInnerHTML={{ __html: entry.bodyHtml }} />

                <section aria-labelledby="faq-heading">
                  <h2 id="faq-heading">Frequently asked questions</h2>
                  {entry.faqs.map((f) => (
                    <div className="glossary-faq-item" key={f.q}>
                      <h3>{f.q}</h3>
                      <p>{f.a}</p>
                    </div>
                  ))}
                </section>

                <p className="glossary-meta">
                  Written by{' '}
                  <a href="/about">Shilika Jain</a>, a senior Web3, AI and cybersecurity PR operator. Last
                  reviewed {modified}.
                </p>

                {entry.related.length > 0 && (
                  <section aria-labelledby="related-heading">
                    <h2 id="related-heading">Related reading</h2>
                    <ul>
                      {entry.related.map((r) => (
                        <li key={r.href}>
                          <a href={r.href}>{r.label}</a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              <div className="post-cta">
                <p className="post-cta-kicker">
                  <span className="post-cta-dot" /> Work with Shilika
                </p>
                <h3>
                  Want this run for <em>your</em> launch?
                </h3>
                <p>
                  Fractional, senior PR for Web3, AI and cybersecurity teams. Book a 30-minute teardown and
                  leave with a plan you can act on.
                </p>
                <a
                  href="https://calendly.com/shilikajain/30min/"
                  target="_blank"
                  rel="noopener"
                  className="post-cta-sticky"
                  data-magnet
                >
                  Book a 30-min teardown →
                </a>
              </div>
            </div>
          </article>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
