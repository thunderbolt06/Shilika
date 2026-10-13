import { LANGUAGES, LOCALES, findI18nPage, localizePath, type Lang } from './config';

const GLOBE =
  '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.1"/><path d="M1 7h12M7 1c2 2.2 2 9.8 0 12M7 1c-2 2.2-2 9.8 0 12" stroke="currentColor" stroke-width="1.1"/></svg>';

/** Where the homepage partial wants the switcher (it inlines its own nav). */
export const LANG_TOGGLE_SLOT = '<!--lang-toggle-->';

/**
 * Language switcher markup. Plain <details> + links so the same string works
 * in the JSX nav and in the homepage partial, with no client JS required.
 *
 * Each option links to the same page in that language; on a page that is
 * English-only the other languages link to their translated homepage.
 */
export function languageToggleHtml(lang: Lang, path: string, label = 'Language'): string {
  const translated = Boolean(findI18nPage(path));
  const options = (['en', ...LOCALES] as Lang[])
    .map((code) => {
      const { hreflang, label: name } = LANGUAGES[code];
      const href = code === 'en' || translated ? localizePath(code, path) : localizePath(code, '/');
      const current = code === lang ? ' aria-current="true"' : '';
      return `<li><a href="${href}" hreflang="${hreflang}" lang="${hreflang}"${current}>${name}</a></li>`;
    })
    .join('');
  return `<details><summary aria-label="${label}: ${LANGUAGES[lang].label}">${GLOBE}<span lang="${LANGUAGES[lang].hreflang}">${LANGUAGES[lang].short}</span></summary><ul>${options}</ul></details>`;
}
