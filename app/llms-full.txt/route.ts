import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { listPublishedPosts } from '@/lib/blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const revalidate = 3600;

function loadIntro(): string {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'app/_partials/llms-intro.md'), 'utf8');
  } catch {
    return '';
  }
}

export async function GET() {
  const intro = loadIntro();
  let posts: Awaited<ReturnType<typeof listPublishedPosts>> = [];
  try {
    posts = await listPublishedPosts();
  } catch {
    posts = [];
  }

  const sections = posts.map((p) => {
    const url = `${SITE_URL}/blog/${p.slug}`;
    return [
      `---`,
      ``,
      `# ${p.title}`,
      ``,
      `Source: ${url}`,
      `Markdown alternate: ${SITE_URL}/api/markdown/blog/${p.slug}`,
      p.published_at ? `Published: ${p.published_at}` : '',
      p.tags?.length ? `Tags: ${p.tags.join(', ')}` : '',
      ``,
      p.description,
      ``,
      p.body.trim(),
      ``,
    ]
      .filter(Boolean)
      .join('\n');
  });

  const body = [
    intro.trim(),
    '',
    '## Full playbooks (verbatim markdown)',
    '',
    ...sections,
    '## Last updated',
    '',
    new Date().toISOString().slice(0, 10),
    '',
  ].join('\n');

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, must-revalidate',
    },
  });
}
