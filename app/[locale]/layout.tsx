import { notFound } from 'next/navigation';
import '../globals.css';
import '../media.css';
import RootShell from '@/components/site/RootShell';
import TalkPopup from '@/components/site/TalkPopup';
import { LANGUAGES, LOCALES, isLocale, type Locale } from '@/lib/i18n/config';
import { loadUi } from '@/lib/i18n/load';

export { metadata, viewport } from '@/lib/site-metadata';

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
 * Root layout of the translated pages (/zh, /ko, /ja, /es, /ru). It is its own root
 * layout, separate from app/(site)/layout.tsx, so <html lang> is the page's language
 * in the static HTML. Crawlers that don't run JavaScript read that attribute and
 * compare it with the hreflang annotation (zh-Hans for /zh, etc.).
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
    <RootShell lang={hreflang}>
      <div lang={hreflang} className={`i18n i18n-${locale}`}>
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
    </RootShell>
  );
}
