import type { Metadata } from 'next';
import Script from 'next/script';
import { listPublishedPosts } from '@/lib/blog';
import type { BlogPost } from '@/lib/supabase/types';
import { Photo, PhotoBand, pickPhoto, regionOf } from '@/components/site/Media';
import { ogImage } from '@/lib/i18n/og';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const revalidate = 600;

const CARD = ogImage('/blog', SITE_URL);
// Photo for the header band. Cover fallbacks below never reuse it, so no photo appears twice
// until the library (16 photos) runs out.
const BAND_PHOTO = 'library';

export const metadata: Metadata = {
  title: 'Blog - field notes on Web3 PR, AI PR, and embargo strategy',
  description:
    'Field notes from inside Web3 and AI PR: embargo strategy, tier-1 placement, APAC localisation, crisis comms, and KOL waves.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Shilika Jain - Blog',
    description: 'Field notes from inside Web3 and AI PR.',
    url: `${SITE_URL}/blog`,
    type: 'website',
    images: [CARD],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: CARD.url, alt: CARD.alt }],
  },
};

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function BlogIndexPage() {
  let posts: BlogPost[] = [];
  try {
    posts = await listPublishedPosts();
  } catch {
    posts = [];
  }

  // Posts without cover art get a photo from the media library instead of an empty frame. Seeded
  // by slug, limited to photos that fit the post's place, and `taken` keeps cards from repeating.
  const taken = new Set<string>([BAND_PHOTO]);
  const fallback = new Map<string, string>();
  for (const p of posts) {
    if (p.image) continue;
    const id = pickPhoto({
      seed: p.slug,
      crop: 'land',
      region: regionOf(p.slug, p.title, ...(p.tags ?? [])),
      exclude: taken,
    });
    taken.add(id);
    fallback.set(p.id, id);
  }

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: 'Shilika Jain - Blog',
        description:
          'Field notes from inside Web3 and AI PR: embargo strategy, tier-1 placement, APAC localisation, crisis comms, and KOL waves.',
        inLanguage: 'en',
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#org`,
          name: 'Shilika Jain - Fractional PR',
        },
        author: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: 'Shilika Jain',
          url: `${SITE_URL}/about`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/blog#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        ],
      },
    ],
  };

  return (
    <main className="blog-page">
      <Script
        id="blog-index-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <div className="blog-page-inner">
        <section className="blog-index-hero">
          <div>
            <p className="blog-index-kicker">
              <span className="dot" /> Blog · field notes
            </p>
            <h1 className="blog-index-title">
              Playbooks <em>in</em> public.
            </h1>
          </div>
          <div className="blog-index-blurb">
            <p>
              Embargo strategy, tier-1 placement, APAC localisation, crisis communications, and
              KOL wave design. Drawn from six years and 50+ launches.
            </p>
          </div>
        </section>

        <PhotoBand
          id={BAND_PHOTO}
          eyebrow="Field notes"
          title={
            <>
              Notes from <em>inside the launches</em>.
            </>
          }
          sub="Six years, 50+ launches, six APAC markets."
          sizes="(min-width: 1344px) 1280px, 100vw"
        />

        {posts.length === 0 ? (
          <p className="blog-empty">New playbooks are being prepped. Check back soon.</p>
        ) : (
          <div className="blog-list">
            {posts.map((p) => (
              <a key={p.id} href={`/blog/${p.slug}`} className="blog-card" data-magnet>
                {p.image ? (
                  <div className="blog-card-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </div>
                ) : fallback.has(p.id) ? (
                  <div className="blog-card-media blog-card-media--photo" aria-hidden>
                    <Photo id={fallback.get(p.id)!} crop="land" sizes="(min-width: 1344px) 560px, (min-width: 900px) 42vw, 92vw" alt="" />
                  </div>
                ) : (
                  <div className="blog-card-media" aria-hidden />
                )}
                <div className="blog-card-meta">
                  <span>{formatDate(p.published_at)}</span>
                  {p.tags?.slice(0, 1).map((t) => (
                    <span key={t} className="blog-card-tag">
                      {t}
                    </span>
                  ))}
                  {p.tags?.slice(1, 3).map((t) => (
                    <span key={t} className="blog-card-tag subtle">
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="blog-card-title">{p.title}</h2>
                <p className="blog-card-blurb">{p.description}</p>
                <span className="blog-card-cta">Read playbook →</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
