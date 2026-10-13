import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import type { BlogPost } from '@/lib/supabase/types';
import { localizeLinks, type Locale } from './config';
import { translateHtml } from './segment';
import EN from './ui.en.json';

export type Catalogue = {
  meta?: { title: string; description: string };
  segments: Record<string, string>;
};

const I18N_DIR = path.join(process.cwd(), 'app/_partials/i18n');

/** Translations for one page (or the English source with locale "_source"). */
export function loadCatalogue(locale: Locale | '_source', key: string): Catalogue {
  try {
    return JSON.parse(fs.readFileSync(path.join(I18N_DIR, locale, `${key}.json`), 'utf8'));
  } catch {
    return { segments: {} };
  }
}

/** Nav / footer / blog chrome strings, falling back to English per key. */
export function loadUi(locale: Locale): Record<string, string> {
  return { ...EN, ...loadCatalogue(locale, 'ui').segments };
}

/** English HTML -> translated HTML with internal links pointed at the locale. */
export function localizeHtml(html: string, locale: Locale, catalogue: Catalogue): string {
  return localizeLinks(translateHtml(html, (id) => catalogue.segments[id]), locale);
}

/**
 * Published blog post, read without cookies so the translated blog pages can
 * be statically generated (lib/blog.ts goes through the per-request client).
 */
export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  if (error) throw error;
  return (data as BlogPost | null) ?? null;
}
