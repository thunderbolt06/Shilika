import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getAuthor, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { readingTimeMinutes, renderMarkdown } from '@/lib/markdown';

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

  const url = `${SITE_URL}/blog/${post.slug}`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': isTechnical(post.tags) ? 'TechArticle' : 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at,
    image: post.image ?? undefined,
    mainEntityOfPage: url,
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
      name: 'Shilika Jain — Fractional PR',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/shilika-press-square-1200.jpg`,
      },
    },
    keywords: post.tags.join(', '),
  };

  const ctaLabel = post.cta_label ?? 'Book a 30-min teardown with Shilika';
  const ctaUrl = post.cta_url ?? 'https://calendly.com/shilikajain/30min/';

  return (
    <article className="post-page">
      <Script
        id={`post-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <header className="post-head">
        <p className="post-kicker">
          <span className="post-kicker-num">PLAYBOOK</span>
          <Link href="/blog">All posts</Link>
        </p>
        <h1 className="post-title">{post.title}</h1>
        <p className="post-deck">{post.description}</p>
        <div className="post-meta">
          <span>{formatDate(post.published_at)}</span>
          <span>{readingTimeMinutes(post.body)} min read</span>
          <a href={`/blog/${post.slug}.md`}>Markdown</a>
          {post.tags.map((t) => (
            <span key={t} className="post-tag">
              {t}
            </span>
          ))}
        </div>
      </header>

      {post.image && (
        <div className="post-hero-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt={post.title} width={1200} height={630} />
        </div>
      )}

      <section className="post-body-wrap">
        <div
          className="prose-shilika"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <aside className="post-cta">
          <h3>
            Want this <em>playbook</em> applied to your launch?
          </h3>
          <p>
            Shilika has placed 50+ Web3 and AI founders in Forbes, CoinDesk, Cointelegraph,
            Decrypt, The Block, Blockworks, and AI Magazine across six APAC markets.
          </p>
          <a href={ctaUrl} target="_blank" rel="noopener" data-magnet>
            {ctaLabel}
            <span aria-hidden>→</span>
          </a>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="post-related">
          <h2>Related playbooks</h2>
          <div className="post-related-list">
            {related.map((r) => (
              <a key={r.id} href={`/blog/${r.slug}`} className="post-related-card" data-magnet>
                <h3>{r.title}</h3>
                <p>{r.description}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {author && (
        <section className="post-body-wrap">
          <div className="post-author">
            {author.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={author.image_url} alt={author.name} />
            ) : (
              <div />
            )}
            <div>
              <p className="post-author-kicker">Written by</p>
              <p className="post-author-name">{author.name}</p>
              <p className="post-author-role">{author.title}</p>
              <p className="post-author-bio">{author.bio}</p>
            </div>
          </div>
        </section>
      )}

      <div className="post-back">
        <a href="/blog">All playbooks</a>
      </div>
    </article>
  );
}
