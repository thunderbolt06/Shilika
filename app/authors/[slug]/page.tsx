import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogFooter, BlogHeader } from '@/components/blog/BlogChrome';
import { getAuthor } from '@/lib/blog';
import { getServerSupabase } from '@/lib/supabase/server';
import type { BlogPost } from '@/lib/supabase/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const revalidate = 3600;
export const dynamicParams = true;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const author = await safeGetAuthor(slug);
  if (!author) return {};
  const url = `${SITE_URL}/authors/${author.slug}`;
  return {
    title: `${author.name} — ${author.title}`,
    description: author.bio,
    alternates: { canonical: url },
    openGraph: {
      type: 'profile',
      title: author.name,
      description: author.bio,
      url,
      images: author.image_url
        ? [{ url: author.image_url, width: 1080, height: 1080 }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: author.name,
      description: author.bio,
      images: author.image_url ? [author.image_url] : undefined,
    },
  };
}

async function listPostsByAuthor(slug: string): Promise<BlogPost[]> {
  try {
    const supabase = await getServerSupabase();
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .or(`author_slug.eq.${slug},author.ilike.${slug.replace(/-/g, ' ')}%`)
      .eq('published', true)
      .order('published_at', { ascending: false });
    return (data ?? []) as BlogPost[];
  } catch {
    return [];
  }
}

async function safeGetAuthor(slug: string) {
  try {
    return await getAuthor(slug);
  } catch {
    return null;
  }
}

export default async function AuthorPage({ params }: { params: Params }) {
  const { slug } = await params;
  const author = await safeGetAuthor(slug);
  if (!author) notFound();

  const posts = await listPostsByAuthor(slug);
  const url = `${SITE_URL}/authors/${author.slug}`;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': url,
      name: author.name,
      url,
      image: author.image_url ?? undefined,
      jobTitle: author.title,
      description: author.bio,
      sameAs: author.same_as,
    },
  };

  return (
    <div className="bg-paper text-ink">
      <BlogHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />

        <header className="mx-auto max-w-3xl px-6 pt-16 pb-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            {author.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={author.image_url}
                alt={author.name}
                width={160}
                height={160}
                className="h-40 w-40 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
                Author profile
              </p>
              <h1 className="mt-2 font-serif text-5xl leading-tight tracking-tight md:text-6xl">
                {author.name}
              </h1>
              <p className="mt-2 text-lg text-ink/70">{author.title}</p>
              <p className="mt-4 max-w-prose text-ink/80">{author.bio}</p>

              {author.same_as.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {author.same_as.map((href) => {
                    const label = labelFor(href);
                    return (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener"
                        className="rounded-full border border-ink/20 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-ink/80 hover:bg-ink hover:text-cream"
                      >
                        {label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-3xl px-6 pb-20">
          <h2 className="border-b border-ink/10 pb-3 font-mono text-xs uppercase tracking-widest text-ink/60">
            Playbooks by {author.name}
          </h2>
          {posts.length === 0 ? (
            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-ink/40">
              No playbooks published yet.
            </p>
          ) : (
            <ul className="mt-2">
              {posts.map((p) => (
                <li key={p.id} className="border-b border-ink/10 py-6">
                  <Link href={`/blog/${p.slug}`} className="group block">
                    <h3 className="font-serif text-2xl leading-tight tracking-tight group-hover:text-rust">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-ink/70">{p.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <BlogFooter />
    </div>
  );
}

function labelFor(href: string): string {
  try {
    const u = new URL(href);
    const host = u.hostname.replace(/^www\./, '');
    if (host.includes('linkedin')) return 'LinkedIn';
    if (host === 'x.com' || host.includes('twitter')) return 'X / Twitter';
    if (host.includes('calendly')) return 'Calendly';
    if (host.includes('cryptodaily')) return 'CryptoDaily byline';
    if (host.includes('t.me') || host.includes('telegram')) return 'Telegram';
    if (host.includes('github')) return 'GitHub';
    return host;
  } catch {
    return href;
  }
}
