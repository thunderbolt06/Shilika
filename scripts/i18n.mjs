#!/usr/bin/env node
/**
 * i18n.mjs - translation catalogue tooling for the /zh /ko /ja /es /ru pages.
 *
 * Translations are stored per page as { meta, segments } JSON under
 * app/_partials/i18n/<locale>/<key>.json, keyed by a hash of the English
 * source segment (see lib/i18n/segment.ts). This script maintains them.
 *
 *   pnpm i18n extract   Re-cut every page in lib/i18n/config.ts (I18N_PAGES)
 *                       plus the shared UI strings into
 *                       app/_partials/i18n/_source/<key>.json. Run after the
 *                       English copy changes or a page is added to I18N_PAGES.
 *   pnpm i18n check     Compare each locale against _source: lists segments
 *                       that are missing, stale (English changed) or have
 *                       broken <n> placeholders. Exits 1 if anything is off.
 *   pnpm i18n prune     Drop stale segments from the locale files.
 *
 * Blog posts live in Supabase, so `extract` needs .env.local (the package.json
 * script passes --env-file). Without Supabase env the blog pages are skipped.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { register } from 'node:module';

// lib/markdown.ts imports Next's `server-only` marker, which only resolves
// inside the Next bundler. Stub it so the renderer can be reused here.
register(
  'data:text/javascript,' +
    encodeURIComponent(
      `export async function resolve(s, c, next) {
         if (s === 'server-only') return { url: 'data:text/javascript,', shortCircuit: true };
         return next(s, c);
       }`,
    ),
);

const { I18N_PAGES, LOCALES } = await import('../lib/i18n/config.ts');
const { extractSegments, placeholdersMatch } = await import('../lib/i18n/segment.ts');
const { stripLegacyChrome } = await import('../lib/legacy-chrome.ts');

const ROOT = process.cwd();
const I18N_DIR = path.join(ROOT, 'app/_partials/i18n');
const SOURCE_DIR = path.join(I18N_DIR, '_source');

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const writeJson = (file, data) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
};

/** First `title:` / `description:` string literal in a page.tsx metadata export. */
function readPageMeta(file) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const literal = (field) => {
    const m = new RegExp(`\\b${field}:\\s*(['"\`])((?:\\\\.|(?!\\1)[^\\\\])*)\\1`).exec(src);
    if (!m) throw new Error(`${file}: no ${field} literal found`);
    return m[2].replace(/\\(.)/g, '$1');
  };
  return { title: literal('title'), description: literal('description') };
}

async function loadBlogPost(slug) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  const { createClient } = await import('@supabase/supabase-js');
  const { renderMarkdown } = await import('../lib/markdown.ts');
  const { data, error } = await createClient(url, key)
    .from('blog_posts')
    .select('title, description, body')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error(`blog post not found or unpublished: ${slug}`);
  return { meta: { title: data.title, description: data.description }, html: await renderMarkdown(data.body) };
}

async function extract() {
  for (const page of I18N_PAGES) {
    let meta;
    let html;
    if (page.kind === 'blog') {
      const post = await loadBlogPost(page.path.split('/').pop());
      if (!post) {
        console.warn(`skip  ${page.key} (Supabase env not set)`);
        continue;
      }
      ({ meta, html } = post);
    } else {
      meta = readPageMeta(page.source);
      html = fs.readFileSync(path.join(ROOT, 'app/_partials', page.partial), 'utf8');
      if (page.kind === 'playbook') html = stripLegacyChrome(html);
    }
    const segments = extractSegments(html);
    writeJson(path.join(SOURCE_DIR, `${page.key}.json`), { meta, segments });
    console.log(`wrote ${page.key} (${Object.keys(segments).length} segments)`);
  }
  // Shared nav / footer / blog chrome strings: keyed by name, not by hash.
  const ui = readJson(path.join(ROOT, 'lib/i18n/ui.en.json'));
  writeJson(path.join(SOURCE_DIR, 'ui.json'), { segments: ui });
  console.log(`wrote ui (${Object.keys(ui).length} strings)`);
}

function sourceKeys() {
  return fs.readdirSync(SOURCE_DIR).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5));
}

function audit({ prune }) {
  let problems = 0;
  for (const locale of LOCALES) {
    for (const key of sourceKeys()) {
      const source = readJson(path.join(SOURCE_DIR, `${key}.json`));
      const file = path.join(I18N_DIR, locale, `${key}.json`);
      if (!fs.existsSync(file)) {
        console.log(`${locale}/${key}: file missing`);
        problems++;
        continue;
      }
      const target = readJson(file);
      const missing = Object.keys(source.segments).filter((id) => !(id in (target.segments ?? {})));
      const stale = Object.keys(target.segments ?? {}).filter((id) => !(id in source.segments));
      const broken = Object.entries(target.segments ?? {}).filter(
        ([id, text]) => id in source.segments && !placeholdersMatch(source.segments[id], text),
      );
      const noMeta = source.meta && !(target.meta?.title && target.meta?.description);

      if (prune && stale.length) {
        for (const id of stale) delete target.segments[id];
        writeJson(file, target);
        console.log(`${locale}/${key}: pruned ${stale.length} stale`);
        stale.length = 0;
      }
      if (!missing.length && !stale.length && !broken.length && !noMeta) continue;
      problems++;
      const parts = [];
      if (noMeta) parts.push('meta missing');
      if (missing.length) parts.push(`${missing.length} missing [${missing.join(' ')}]`);
      if (stale.length) parts.push(`${stale.length} stale`);
      if (broken.length) parts.push(`${broken.length} broken placeholders [${broken.map(([id]) => id).join(' ')}]`);
      console.log(`${locale}/${key}: ${parts.join(', ')}`);
    }
  }
  if (!problems) console.log('all locales complete');
  return problems;
}

const command = process.argv[2];
if (command === 'extract') await extract();
else if (command === 'check') process.exit(audit({ prune: false }) ? 1 : 0);
else if (command === 'prune') audit({ prune: true });
else {
  console.error('usage: pnpm i18n <extract|check|prune>');
  process.exit(2);
}
