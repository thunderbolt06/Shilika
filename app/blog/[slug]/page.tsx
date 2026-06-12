import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getAuthor, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { readingTimeMinutes, renderMarkdown } from '@/lib/markdown';
import { extractToc } from '@/lib/toc';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ReadingProgress } from '@/components/blog/ReadingProgress';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const revalidate = 3600;
export const dynamicParams = true;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
      types: { 'text/markdown': `${url}.md` },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: [post.author],
      tags: post.tags,
      images: post.image ? [{ url: post.image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
    other: {
      'article:author': post.author,
    },
  };
}

function isTechnical(tags: string[]) {
  const t = new Set(tags.map((x) => x.toLowerCase()));
  return ['developer', 'tutorial', 'code', 'technical', 'engineering'].some((k) => t.has(k));
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [html, author, related] = await Promise.all([
    renderMarkdown(post.body),
    getAuthor(post.author_slug),
    getRelatedPosts(post.related_posts),
  ]);

  const toc = extractToc(html);
  const minutes = readingTimeMinutes(post.body);

  const url = `${SITE_URL}/blog/${post.slug}`;
  const articleType = isTechnical(post.tags) ? 'TechArticle' : 'Article';
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': articleType,
        '@id': `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.published_at ?? undefined,
        dateModified: post.updated_at,
        image: post.image ?? undefined,
        mainEntityOfPage: url,
        url,
        inLanguage: 'en',
        author: author
          ? {
              '@type': 'Person',
              '@id': author.url,
              name: author.name,
              url: author.url,
              image: author.image_url ?? undefined,
              sameAs: author.same_as,
            }
          : { '@type': 'Person', name: post.author },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#org`,
          name: 'Shilika Jain — Fractional PR',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/assets/shilika-press-square-1200.jpg`,
          },
        },
        keywords: post.tags.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  const ctaLabel = post.cta_label ?? 'Book a 30-min teardown';
  const ctaUrl = post.cta_url ?? 'https://calendly.com/shilikajain/30min/';

  return (
    <article className="post-page">
      <Script
        id={`post-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <ReadingProgress />

      <header className="post-head">
        <p className="post-kicker">
          <span className="post-kicker-num">PLAYBOOK</span>
          <Link href="/blog">All posts</Link>
        </p>
        <h1 className="post-title">{post.title}</h1>
        <p className="post-deck">{post.description}</p>

        <div className="post-meta-row">
          <div className="post-meta-author">
            {author?.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={author.image_url} alt={author.name} />
            ) : (
              <div className="post-meta-author-placeholder" aria-hidden />
            )}
            <div>
              <p className="post-meta-author-name">{post.author}</p>
              <p className="post-meta-author-meta">
                <span>{formatDate(post.published_at)}</span>
                <span aria-hidden> · </span>
                <span>{minutes} min read</span>
              </p>
            </div>
          </div>
          <div className="post-meta-tags">
            {post.tags.slice(0, 4).map((t) => (
              <span key={t} className="post-tag">
                {t}
              </span>
            ))}
            <a href={`/blog/${post.slug}.md`} className="post-meta-md">
              .md
            </a>
          </div>
        </div>
      </header>

      {post.image && (
        <div className="post-hero-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt={post.title} width={1200} height={630} />
        </div>
      )}

      <div className="post-body-grid">
        <div className="post-rail post-rail-left">
          <div className="post-rail-inner">
            <TableOfContents items={toc} />
          </div>
        </div>

        <div className="post-main">
          {toc.length > 0 && (
            <details className="post-toc-mobile">
              <summary>
                <span className="post-toc-mobile-label">On this page</span>
                <span className="post-toc-mobile-count">{toc.length}</span>
                <span className="post-toc-mobile-chev" aria-hidden>↓</span>
              </summary>
              <ol>
                {toc.map((it) => (
                  <li key={it.id} className={`lvl-${it.level}`}>
                    <a href={`#${it.id}`}>{it.text}</a>
                  </li>
                ))}
              </ol>
            </details>
          )}

          <div
            className="prose-shilika"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <aside className="post-cta post-cta-sticky post-mobile-block">
            <p className="post-cta-kicker">
              <span className="post-cta-dot" aria-hidden />
              Work with Shilika
            </p>
            <h3>
              Apply this <em>playbook</em> to your launch
            </h3>
            <p>
              50+ Web3 &amp; AI founders placed in Forbes, CoinDesk, Decrypt, The Block,
              Blockworks &amp; AI Magazine — across six APAC markets.
            </p>
            <a href={ctaUrl} target="_blank" rel="noopener" data-magnet>
              {ctaLabel}
              <span aria-hidden>→</span>
            </a>
          </aside>

          {author && (
            <aside className="post-author-card post-mobile-block">
              {author.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={author.image_url} alt={author.name} />
              ) : (
                <div className="post-author-card-placeholder" aria-hidden />
              )}
              <p className="post-author-card-kicker">Written by</p>
              <p className="post-author-card-name">{author.name}</p>
              <p className="post-author-card-role">{author.title}</p>
              <p className="post-author-card-bio">{author.bio}</p>
              {author.same_as && author.same_as.length > 0 && (
                <div className="post-author-card-links">
                  {author.same_as.slice(0, 4).map((s) => {
                    let host = s;
                    try {
                      host = new URL(s).hostname.replace('www.', '').split('.')[0];
                    } catch {}
                    return (
                      <a key={s} href={s} target="_blank" rel="noopener">
                        {host}
                      </a>
                    );
                  })}
                </div>
              )}
            </aside>
          )}
        </div>

        <div className="post-rail post-rail-right">
          <div className="post-rail-inner">
            <aside className="post-cta post-cta-sticky">
              <p className="post-cta-kicker">
                <span className="post-cta-dot" aria-hidden />
                Work with Shilika
              </p>
              <h3>
                Apply this <em>playbook</em> to your launch
              </h3>
              <p>
                50+ Web3 &amp; AI founders placed in Forbes, CoinDesk, Decrypt, The Block,
                Blockworks &amp; AI Magazine — across six APAC markets.
              </p>
              <a href={ctaUrl} target="_blank" rel="noopener" data-magnet>
                {ctaLabel}
                <span aria-hidden>→</span>
              </a>
              <div className="post-cta-stats">
                <div>
                  <span className="post-cta-stat-num">50+</span>
                  <span className="post-cta-stat-label">Founders placed</span>
                </div>
                <div>
                  <span className="post-cta-stat-num">6</span>
                  <span className="post-cta-stat-label">APAC markets</span>
                </div>
              </div>
            </aside>

            {author && (
              <aside className="post-author-card">
                {author.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={author.image_url} alt={author.name} />
                ) : (
                  <div className="post-author-card-placeholder" aria-hidden />
                )}
                <p className="post-author-card-kicker">Written by</p>
                <p className="post-author-card-name">{author.name}</p>
                <p className="post-author-card-role">{author.title}</p>
                <p className="post-author-card-bio">{author.bio}</p>
                {author.same_as && author.same_as.length > 0 && (
                  <div className="post-author-card-links">
                    {author.same_as.slice(0, 4).map((s) => {
                      let host = s;
                      try {
                        host = new URL(s).hostname.replace('www.', '').split('.')[0];
                      } catch {}
                      return (
                        <a key={s} href={s} target="_blank" rel="noopener">
                          {host}
                        </a>
                      );
                    })}
                  </div>
                )}
              </aside>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="post-related">
          <div className="post-related-head">
            <p className="post-related-kicker">
              <span aria-hidden>—</span> Keep reading
            </p>
            <h2>Similar playbooks</h2>
          </div>
          <div className="post-related-list">
            {related.map((r, i) => (
              <a key={r.id} href={`/blog/${r.slug}`} className="post-related-card" data-magnet>
                <span className="post-related-card-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{r.title}</h3>
                <p>{r.description}</p>
                <span className="post-related-card-cta">
                  Read playbook <span aria-hidden>→</span>
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="post-back">
        <a href="/blog">All playbooks</a>
      </div>
    </article>
  );
}
