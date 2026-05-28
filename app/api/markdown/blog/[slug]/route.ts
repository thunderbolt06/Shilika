import { NextResponse } from 'next/server';
import { getAuthor, getPostBySlug } from '@/lib/blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const revalidate = 3600;

function escapeYaml(s: string): string {
  // Wrap in double quotes, escape backslashes + quotes inside.
  return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

type Params = Promise<{ slug: string }>;

export async function GET(_: Request, { params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return new NextResponse('Not found', { status: 404 });
  }

  const author = await getAuthor(post.author_slug);
  const canonical = `${SITE_URL}/blog/${post.slug}`;

  const frontmatter = [
    '---',
    `title: ${escapeYaml(post.title)}`,
    `description: ${escapeYaml(post.description)}`,
    `author: ${escapeYaml(post.author)}`,
    post.published_at ? `date: ${escapeYaml(post.published_at)}` : null,
    `tags: [${post.tags.map((t) => escapeYaml(t)).join(', ')}]`,
    `canonical: ${escapeYaml(canonical)}`,
    '---',
  ]
    .filter(Boolean)
    .join('\n');

  const byline = author
    ? `By [${post.author}](${author.url}) — ${post.published_at ? new Date(post.published_at).toLocaleDateString('en-US') : ''}`
    : `By ${post.author}`;

  const ctaLabel = post.cta_label ?? 'Book a 30-min teardown with Shilika';
  const ctaUrl = post.cta_url ?? 'https://calendly.com/shilikajain/30min/';

  const body = [
    frontmatter,
    '',
    `# ${post.title}`,
    '',
    byline,
    '',
    post.description,
    '',
    '---',
    '',
    post.body.trim(),
    '',
    '---',
    '',
    `**${ctaLabel}** — ${ctaUrl}`,
    '',
    `Canonical: ${canonical}`,
    '',
  ].join('\n');

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Tell AI crawlers + search engines this is an alternate representation
      // of the canonical HTML page. They cite the canonical URL.
      Link: `<${canonical}>; rel="canonical"`,
      // Intentionally NO X-Robots-Tag noindex — GPTBot/ClaudeBot/PerplexityBot
      // honour it and we want them to read this route.
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
