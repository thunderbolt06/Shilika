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

  const dynamicSection =
    posts.length === 0
      ? ''
      : [
          '',
          '## Recent playbooks (dynamic)',
          '',
          ...posts.map((p) => {
            const url = `${SITE_URL}/blog/${p.slug}`;
            const md = `${SITE_URL}/api/markdown/blog/${p.slug}`;
            return `- [${p.title}](${url}) — ${p.description}\n  Markdown alternate: ${md}`;
          }),
          '',
        ].join('\n');

  const body = `${intro.trim()}\n${dynamicSection}\n## Last updated\n\n${new Date().toISOString().slice(0, 10)}\n`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, must-revalidate',
    },
  });
}
