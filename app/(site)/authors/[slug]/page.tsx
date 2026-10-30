import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogFooter, BlogHeader } from '@/components/blog/BlogChrome';
import { getAuthor } from '@/lib/blog';
import { getPublicSupabase } from '@/lib/supabase/server';
import type { BlogPost } from '@/lib/supabase/types';
import { Photo } from '@/components/site/Media';
import { ogImage } from '@/lib/i18n/og';
import { jsonLdString } from '@/lib/json-ld';
import authorEvidence from '@/data/author-evidence.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return [{ slug: 'shilika-jain' }];
}

type Params = Promise<{ slug: string }>;

type EvidenceGroup = { title: string; items: { date: string; text: string; url: string }[] };

/** Dated, linked track record for Shilika's profile (data/author-evidence.json); other authors get none. */
function loadEvidence(slug: string): EvidenceGroup[] {
  return slug === 'shilika-jain' ? (authorEvidence.groups as EvidenceGroup[]) : [];
}

const SHILIKA_KNOWS_ABOUT = [
  'Web3 public relations',
  'Crypto media relations',
  'Token launch communications',
  'Earned media strategy',
  'Crisis communications',
  'Generative engine optimization',
  'Founder thought leadership',
  'Asia-Pacific crypto markets',
];

const META_DESCRIPTION_MAX = 160;

/** Keep the snippet inside Google's display length: end on a sentence, else a word. */
function clipDescription(text: string): string {
  if (text.length <= META_DESCRIPTION_MAX) return text;
  const window = text.slice(0, META_DESCRIPTION_MAX);
  const sentence = window.lastIndexOf('. ');
  if (sentence >= 80) return window.slice(0, sentence + 1);
  return `${window.slice(0, window.lastIndexOf(' ', META_DESCRIPTION_MAX - 1))}…`;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const author = await safeGetAuthor(slug);
  if (!author) return {};
  const url = `${SITE_URL}/authors/${author.slug}`;
  const card = ogImage(`/authors/${author.slug}`, SITE_URL);
  const description = clipDescription(author.bio);
  return {
    // Name and role already identify the site, so skip the layout's "| Shilika Jain" suffix.
    title: { absolute: `${author.name} - ${author.title}` },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'profile',
      title: author.name,
      description,
      url,
      images: [card],
    },
    twitter: {
      card: 'summary_large_image',
      title: author.name,
      description,
      images: [{ url: card.url, alt: card.alt }],
    },
  };
}

async function listPostsByAuthor(slug: string): Promise<BlogPost[]> {
  try {
    const supabase = getPublicSupabase();
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
  const evidence = loadEvidence(slug);
  const url = `${SITE_URL}/authors/${author.slug}`;
  // Shilika's profile uses a close portrait from the media library; any other author keeps
  // the image stored with their record.
  const portraitId = /shilika/i.test(author.name) ? 'sg-bridge-a' : null;

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#profile`,
        url,
        name: `${author.name} - ${author.title}`,
        description: author.bio,
        inLanguage: 'en',
        mainEntity: {
          '@type': 'Person',
          '@id': url,
          name: author.name,
          url,
          image: author.image_url ?? undefined,
          jobTitle: author.title,
          description: author.bio,
          sameAs: author.same_as,
          ...(evidence.length ? { knowsAbout: SHILIKA_KNOWS_ABOUT } : {}),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Authors', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: author.name, item: url },
        ],
      },
    ],
  };

  return (
    <div className="bg-paper text-ink">
      <BlogHeader />
      <main>
        <script
          id={`author-jsonld-${author.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(ld) }}
        />

        <header className="mx-auto max-w-3xl px-6 pt-16 pb-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            {portraitId ? (
              <Photo
                id={portraitId}
                crop="sq"
                sizes="160px"
                priority
                pictureClassName="block shrink-0"
                className="h-40 w-40 rounded-full object-cover"
              />
            ) : (
              author.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={author.image_url}
                  alt={author.name}
                  width={160}
                  height={160}
                  className="h-40 w-40 rounded-full object-cover"
                />
              )
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

        {evidence.length > 0 && (
          <section className="mx-auto max-w-3xl px-6 pb-16" aria-labelledby="track-record">
            <h2
              id="track-record"
              className="border-b border-ink/10 pb-3 font-mono text-xs uppercase tracking-widest text-ink/60"
            >
              Track record, dated and linked
            </h2>
            <p className="mt-4 max-w-prose text-ink/70">
              Every line below paraphrases a public post on X and links to it, so each claim can be checked at the source.
            </p>
            {evidence.map((group) => (
              <div key={group.title} className="mt-8">
                <h3 className="font-serif text-2xl leading-tight tracking-tight">{group.title}</h3>
                <ul className="mt-3">
                  {group.items.map((item) => (
                    <li key={item.url} className="flex flex-col gap-1 border-b border-ink/10 py-3 sm:flex-row sm:gap-6">
                      <time className="w-24 shrink-0 font-mono text-xs uppercase tracking-widest text-ink/50">
                        {item.date}
                      </time>
                      <span className="text-ink/80">
                        {item.text}{' '}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener"
                          className="font-mono text-xs uppercase tracking-widest text-ink/60 underline decoration-ink/30 underline-offset-4 hover:text-rust"
                        >
                          Source
                        </a>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

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
