import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookCallCTA } from '@/components/blog/CTA';
import { PostBody } from '@/components/blog/PostBody';
import { getAuthor, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { readingTimeMinutes, renderMarkdown } from '@/lib/markdown';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const revalidate = 3600;

// Rendered on demand and cached for an hour. We could pre-render via
// generateStaticParams once Supabase is wired in CI, but for now this avoids
// failed builds when env vars are missing.
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
    alternates: { canonical: url },
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
  };
}

function isTechnical(tags: string[]) {
  const t = new Set(tags.map((x) => x.toLowerCase()));
  return ['developer', 'tutorial', 'code', 'technical', 'engineering'].some((k) => t.has(k));
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

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <article className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />

      <header className="mx-auto max-w-3xl px-6 pt-16 pb-10">
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-widest text-ink/60">
          <Link href="/blog" className="hover:text-ink">← Playbooks</Link>
          <span>{date}</span>
          <span>{readingTimeMinutes(post.body)} min read</span>
        </div>
        <h1 className="mt-6 font-serif text-4xl leading-tight tracking-tight md:text-6xl">
          {post.title}
        </h1>
        <p className="mt-6 max-w-prose text-lg text-ink/70">{post.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-ink/20 px-3 py-1 font-mono text-xs uppercase tracking-widest text-ink/70"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt={post.title}
          width={1200}
          height={630}
          className="mx-auto block w-full max-w-5xl"
        />
      )}

      <div className="mx-auto max-w-3xl px-6 py-12">
        <PostBody html={html} />

        <BookCallCTA label={post.cta_label} url={post.cta_url} />

        {related.length > 0 && (
          <section className="mt-16 border-t border-ink/10 pt-10">
            <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
              Related playbooks
            </p>
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={`/blog/${r.slug}`} className="group block">
                    <h3 className="font-serif text-xl leading-tight tracking-tight text-ink group-hover:text-rust">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink/70">{r.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {author && (
          <section className="mt-16 border-t border-ink/10 pt-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-start">
              {author.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={author.image_url}
                  alt={author.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
                  Written by
                </p>
                <p className="mt-2 font-serif text-2xl tracking-tight">{author.name}</p>
                <p className="text-sm text-ink/70">{author.title}</p>
                <p className="mt-3 max-w-prose text-sm text-ink/70">{author.bio}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
