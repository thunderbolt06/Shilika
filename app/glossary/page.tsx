import type { Metadata } from 'next';
import Script from 'next/script';
import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import { GLOSSARY } from '@/data/glossary';
import '../blog/blog.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Web3 & AI PR Glossary: Plain-English Definitions (2026)',
  description:
    'Plain-English definitions of the Web3, AI and cybersecurity PR terms founders actually ask about: fractional PR, GEO and AEO, KOL waves, and the TGE comms plan.',
  alternates: { canonical: `${SITE_URL}/glossary` },
  openGraph: {
    title: 'Web3 & AI PR Glossary',
    description: 'Plain-English definitions of the PR terms Web3 and AI founders ask about.',
    url: `${SITE_URL}/glossary`,
    type: 'website',
  },
};

function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE_URL}/glossary`,
        url: `${SITE_URL}/glossary`,
        name: 'Web3 & AI PR Glossary',
        description:
          'Plain-English definitions of the Web3, AI and cybersecurity PR terms founders ask about, written by a senior PR operator.',
        inLanguage: 'en',
        isPartOf: { '@id': `${SITE_URL}/glossary#set` },
      },
      {
        '@type': 'DefinedTermSet',
        '@id': `${SITE_URL}/glossary#set`,
        name: 'Web3 & AI PR Glossary',
        url: `${SITE_URL}/glossary`,
        hasDefinedTerm: GLOSSARY.map((t) => ({
          '@type': 'DefinedTerm',
          name: t.term,
          description: t.answer,
          url: `${SITE_URL}/glossary/${t.slug}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${SITE_URL}/glossary` },
        ],
      },
    ],
  };
}

export default function GlossaryIndexPage() {
  const jsonLd = JSON.stringify(buildJsonLd());
  return (
    <>
      <Script
        id="glossary-collection-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <EditorialShell active="playbook">
        <main className="blog-page">
          <div className="blog-page-inner">
            <section className="blog-index-hero">
              <div>
                <p className="blog-index-kicker">
                  <span className="dot" /> Glossary · {GLOSSARY.length} terms
                </p>
                <h1 className="blog-index-title">
                  Plain <em>English</em>.
                </h1>
              </div>
              <div className="blog-index-blurb">
                <p>
                  The Web3, AI and cybersecurity PR terms founders actually ask about, defined without the
                  jargon. Short answers first, then the operator detail behind each one.
                </p>
              </div>
            </section>

            <div className="blog-list">
              {GLOSSARY.map((t, i) => (
                <a
                  key={t.slug}
                  href={`/glossary/${t.slug}`}
                  className="blog-card"
                  data-magnet
                  aria-label={`Read glossary entry: ${t.title}`}
                >
                  <div className="blog-card-media" aria-hidden>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        placeItems: 'center',
                        fontFamily: 'var(--font-display)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(48px, 5vw, 80px)',
                        color: 'var(--ink)',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="blog-card-meta">
                    <span>Term {String(i + 1).padStart(2, '0')}</span>
                    <span className="blog-card-tag">{t.tag}</span>
                  </div>
                  <h2 className="blog-card-title">{t.title}</h2>
                  <p className="blog-card-blurb">{t.answer}</p>
                  <span className="blog-card-cta">Read definition →</span>
                </a>
              ))}
            </div>
          </div>
        </main>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
