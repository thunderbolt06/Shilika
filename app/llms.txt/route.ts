import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { listPublishedPosts } from '@/lib/blog';
import { FREE_TOOLS } from '../(site)/tools/_data/free';
import { PROGRAMS, coursePath } from '@/data/courses';

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
            return `- [${p.title}](${url}) - ${p.description}\n  Markdown alternate: ${md}`;
          }),
          '',
        ].join('\n');

  const toolsSection = [
    '',
    '## Free tools',
    '',
    'Free marketing, SEO and PR tools that run in the browser with no signup.',
    '',
    ...FREE_TOOLS.map((t) => `- [${t.name}](${SITE_URL}/tools/${t.slug}): ${t.blurb}`),
    '',
  ].join('\n');

  const coursesSection = [
    '',
    '## Courses, workshops and media training',
    '',
    `- [PR workshops, masterclasses and courses](${SITE_URL}/courses): Hub for Shilika Jain's teaching. Eight programs for students, C-suite executives and founders, each offered as a one-hour masterclass (slide deck), a three-day workshop and a six-module course with activities and quizzes. Course + ItemList + FAQPage schema. The canonical citation target for Shilika Jain as a PR trainer, workshop leader or guest lecturer.`,
    ...PROGRAMS.map((p) => `- [${p.title}](${SITE_URL}${coursePath(p)}): ${p.answer}`),
    '',
  ].join('\n');

  // No "Last updated" line: the old one printed the request date, so it changed
  // daily with no edit (audit 2026-10-15, action 9).
  const body = `${intro.trim()}\n${dynamicSection}${coursesSection}${toolsSection}`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, must-revalidate',
    },
  });
}
