/**
 * Locale config + the registry of pages that have translations.
 *
 * English stays at the root (/about). Each translated locale lives in a
 * subfolder (/zh/about, /ko/about, ...). Only the pages listed in I18N_PAGES
 * exist under a locale prefix; every other URL is English-only.
 *
 * No imports on purpose: scripts/i18n.mjs loads this file directly with
 * `node --experimental-strip-types`.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const LOCALES = ['zh', 'ko', 'ja', 'es', 'ru'] as const;
export type Locale = (typeof LOCALES)[number];
export type Lang = 'en' | Locale;

export const LANGUAGES: Record<Lang, { hreflang: string; label: string; short: string; og: string }> = {
  en: { hreflang: 'en', label: 'English', short: 'EN', og: 'en_US' },
  zh: { hreflang: 'zh-Hans', label: '简体中文', short: '中文', og: 'zh_CN' },
  ko: { hreflang: 'ko', label: '한국어', short: '한국어', og: 'ko_KR' },
  ja: { hreflang: 'ja', label: '日本語', short: '日本語', og: 'ja_JP' },
  es: { hreflang: 'es', label: 'Español', short: 'ES', og: 'es_ES' },
  ru: { hreflang: 'ru', label: 'Русский', short: 'RU', og: 'ru_RU' },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export type I18nPage = {
  /** English path, e.g. "/about". */
  path: string;
  /** Translation file name: app/_partials/i18n/<locale>/<key>.json */
  key: string;
  kind: 'home' | 'partial' | 'playbook' | 'blog';
  /** Body partial under app/_partials (not used by blog posts, which live in Supabase). */
  partial?: string;
  /** English page.tsx, read by scripts/i18n.mjs for the source title/description. */
  source?: string;
  /** Page-specific script the English route loads. */
  script?: string;
  active?: 'blog' | 'playbook' | 'about' | 'testimonials';
  ogType: 'website' | 'article' | 'profile';
};

function partialPage(slug: string, extra: Partial<I18nPage> = {}): I18nPage {
  return {
    path: `/${slug}`,
    key: slug,
    kind: 'partial',
    partial: `${slug}-body.html`,
    source: `app/(site)/${slug}/page.tsx`,
    ogType: 'website',
    ...extra,
  };
}

function playbookPage(slug: string, article: number): I18nPage {
  return {
    path: `/playbook/${slug}`,
    key: `playbook__${slug}`,
    kind: 'playbook',
    partial: `article-${article}-body.html`,
    source: `app/(site)/playbook/${slug}/page.tsx`,
    script: `/assets/article-${article}.js`,
    active: 'playbook',
    ogType: 'article',
  };
}

function blogPage(slug: string): I18nPage {
  return { path: `/blog/${slug}`, key: `blog__${slug}`, kind: 'blog', active: 'blog', ogType: 'article' };
}

export const I18N_PAGES: I18nPage[] = [
  { path: '/', key: 'home', kind: 'home', partial: 'homepage-body.html', source: 'app/(site)/page.tsx', ogType: 'website' },
  partialPage('about', { active: 'about', ogType: 'profile' }),
  partialPage('services'),
  partialPage('contact'),
  // Regions
  partialPage('apac'),
  partialPage('india'),
  partialPage('japan'),
  partialPage('korea'),
  partialPage('singapore'),
  partialPage('dubai-mena'),
  // Playbooks
  playbookPage('crypto-pr-cost-2026', 4),
  playbookPage('fractional-vs-agency', 6),
  playbookPage('best-web3-pr-agencies-2026', 7),
  playbookPage('how-to-pitch-cointelegraph-2026', 13),
  playbookPage('best-token-launch-marketing-agencies-2026', 28),
  playbookPage('ai-startup-pr-agency-india-2026', 53),
  playbookPage('best-b2b-saas-pr-agencies-2026', 64),
  playbookPage('how-to-submit-op-ed-techcrunch-2026', 69),
  // Blog posts
  blogPage('analyst-relations-101-startups'),
  blogPage('how-to-pitch-coindesk-the-block-blockworks-decrypt-2026'),
  blogPage('token2049-singapore-pr-playbook-earned-media'),
];

function normalizePath(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

export function findI18nPage(path: string): I18nPage | undefined {
  const target = normalizePath(path);
  return I18N_PAGES.find((p) => p.path === target);
}

/** "/about" + "zh" -> "/zh/about"; English keeps the bare path. */
export function localizePath(lang: Lang, path: string): string {
  const target = normalizePath(path);
  if (lang === 'en') return target;
  return target === '/' ? `/${lang}` : `/${lang}${target}`;
}

/** "/zh/about" -> { lang: "zh", path: "/about" }; anything else is English. */
export function splitLocalePath(pathname: string): { lang: Lang; path: string } {
  const target = normalizePath(pathname);
  const [, first, ...rest] = target.split('/');
  if (first && isLocale(first)) return { lang: first, path: rest.length ? `/${rest.join('/')}` : '/' };
  return { lang: 'en', path: target };
}

/**
 * hreflang map for a translated page, for Next's `alternates.languages`.
 * Returns undefined for pages that only exist in English.
 */
export function languageAlternates(path: string): Record<string, string> | undefined {
  const page = findI18nPage(path);
  if (!page) return undefined;
  const english = `${SITE_URL}${page.path === '/' ? '' : page.path}`;
  const languages: Record<string, string> = { en: english };
  for (const locale of LOCALES) {
    languages[LANGUAGES[locale].hreflang] = `${SITE_URL}${localizePath(locale, page.path)}`;
  }
  languages['x-default'] = english;
  return languages;
}

/**
 * Point internal links at the translated version of their target when one
 * exists. Links to English-only pages are left alone.
 */
export function localizeLinks(html: string, locale: Locale): string {
  const origin = SITE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const href = new RegExp(`(\\shref=")(?:${origin})?(/[^"#?]*)?((?:[#?][^"]*)?")`, 'g');
  return html.replace(href, (match, pre: string, path: string | undefined, post: string) => {
    if (!path || !findI18nPage(path)) return match;
    return `${pre}${localizePath(locale, path)}${post}`;
  });
}
