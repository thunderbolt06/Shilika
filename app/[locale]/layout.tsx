import { notFound } from 'next/navigation';
import TalkPopup from '@/components/site/TalkPopup';
import { LANGUAGES, LOCALES, isLocale, type Locale } from '@/lib/i18n/config';
import { loadUi } from '@/lib/i18n/load';

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

// Instrument Serif has no CJK or Cyrillic glyphs; pair it with a serif that does.
const DISPLAY_FONT: Partial<Record<Locale, string>> = {
  zh: 'Noto+Serif+SC:wght@400;600',
  ja: 'Noto+Serif+JP:wght@400;600',
  ko: 'Noto+Serif+KR:wght@400;600',
  ru: 'PT+Serif:ital,wght@0,400;1,400',
};

/**
 * Wrapper for the translated pages (/zh, /ko, /ja, /es, /ru). The root layout
 * owns <html lang="en"> and cannot see the locale segment without opting the
 * whole site into dynamic rendering, so the language is declared on a wrapper
 * element and mirrored onto <html> before first paint.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { hreflang } = LANGUAGES[locale];
  const font = DISPLAY_FONT[locale];

  return (
    <div lang={hreflang} className={`i18n i18n-${locale}`}>
      <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(hreflang)}` }} />
      {font && (
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css2?family=${font}&display=swap`}
          precedence="default"
        />
      )}
      {children}
      <TalkPopup strings={loadUi(locale)} />
    </div>
  );
}
