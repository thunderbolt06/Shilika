import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ClientReBoot } from '@/components/site/ClientReBoot';
import { EditorialShell } from '@/components/site/EditorialChrome';
import { EditorialScripts } from '@/components/site/EditorialScripts';
import { topicShareCard } from '@/components/site/Media';
import { assetUrl } from '@/lib/asset-url';
import {
  I18N_PAGES,
  LANGUAGES,
  LOCALES,
  SITE_URL,
  findI18nPage,
  isLocale,
  languageAlternates,
  localizePath,
  type I18nPage,
  type Locale,
} from '@/lib/i18n/config';
import { getPublishedPost, loadCatalogue, loadUi, localizeHtml, type Catalogue } from '@/lib/i18n/load';
import { ogImage } from '@/lib/i18n/og';
import { withEm } from '@/lib/i18n/rich';
import { LANG_TOGGLE_SLOT, languageToggleHtml } from '@/lib/i18n/toggle';
import { jsonLdString, withOrganization } from '@/lib/json-ld';
import { stripLegacyChrome } from '@/lib/legacy-chrome';
import { readingTimeMinutes, renderMarkdown } from '@/lib/markdown';
import { extractToc } from '@/lib/toc';
import '../../blog/blog.css';

/**
 * Translated versions of the pages registered in lib/i18n/config.ts. The
 * English routes stay where they are; this renders the same English partial
 * (or blog post) with each text segment swapped for its translation.
 */

export const dynamicParams = false;

type Params = Promise<{ locale: string; path?: string[] }>;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    I18N_PAGES.map((page) => ({ locale, path: page.path.split('/').filter(Boolean) })),
  );
}

async function resolve(params: Params): Promise<{ locale: Locale; page: I18nPage; catalogue: Catalogue }> {
  const { locale, path: segments = [] } = await params;
  const page = findI18nPage(`/${segments.join('/')}`);
  if (!isLocale(locale) || !page) notFound();
  return { locale, page, catalogue: loadCatalogue(locale, page.key) };
}

function pageMeta(page: I18nPage, catalogue: Catalogue) {
  // Untranslated meta falls back to the English source rather than going blank.
  return catalogue.meta ?? loadCatalogue('_source', page.key).meta ?? { title: 'Shilika Jain', description: '' };
}

/**
 * Share image of a translated route: the same image its English route uses. Partial-backed pages take
 * the card scripts/media/og-map.mjs picks for the English path. A blog post keeps its own cover when it
 * has one and otherwise the topic card, exactly like the English /blog/<slug> page does.
 */
async function shareImage(page: I18nPage) {
  if (page.kind === 'blog') {
    try {
      const post = await getPublishedPost(page.path.split('/').pop()!);
      if (post) {
        if (post.image) return { url: post.image, width: 1200, height: 630, alt: post.title };
        return topicShareCard(post.slug, post.title, ...post.tags);
      }
    } catch {
      // No database at build time: fall through to the blog card.
    }
  }
  return ogImage(page.path, SITE_URL);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, page, catalogue } = await resolve(params);
  const { title, description } = pageMeta(page, catalogue);
  const url = `${SITE_URL}${localizePath(locale, page.path)}`;
  const image = await shareImage(page);
  return {
    // Some titles already carry the brand; skip the layout's "%s | Shilika Jain" for those.
    title: /\|\s*Shilika Jain\s*$/.test(title) ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: languageAlternates(page.path) },
    openGraph: {
      type: page.ogType,
      siteName: 'Shilika Jain',
      title,
      description,
      url,
      locale: LANGUAGES[locale].og,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: image.url, alt: image.alt }] },
  };
}

function jsonLd(page: I18nPage, locale: Locale, catalogue: Catalogue, image: { url: string; width: number; height: number }): string {
  const { title, description } = pageMeta(page, catalogue);
  const url = `${SITE_URL}${localizePath(locale, page.path)}`;
  const english = `${SITE_URL}${page.path === '/' ? '' : page.path}`;
  const article = page.ogType === 'article';
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': article ? 'Article' : 'WebPage',
    '@id': `${url}#${article ? 'article' : 'webpage'}`,
    url,
    [article ? 'headline' : 'name']: title,
    description,
    inLanguage: LANGUAGES[locale].hreflang,
    // The same card the page shares as og:image, so the markup and the preview agree.
    [article ? 'image' : 'primaryImageOfPage']: { '@type': 'ImageObject', url: image.url, width: image.width, height: image.height },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    translationOfWork: { '@id': `${english}#${article ? 'article' : 'webpage'}`, url: english },
    ...(article
      ? {
          author: { '@id': `${SITE_URL}/#person` },
          publisher: { '@id': `${SITE_URL}/#organization` },
          mainEntityOfPage: url,
        }
      : { about: { '@id': `${SITE_URL}/#person` } }),
  });
}

function loadPartial(page: I18nPage): string {
  const html = fs.readFileSync(path.join(process.cwd(), 'app/_partials', page.partial!), 'utf8');
  return page.kind === 'playbook' ? stripLegacyChrome(html) : html;
}

async function BlogPost({ page, locale, catalogue }: { page: I18nPage; locale: Locale; catalogue: Catalogue }) {
  const post = await getPublishedPost(page.path.split('/').pop()!);
  if (!post) notFound();

  const ui = loadUi(locale);
  const { title, description } = pageMeta(page, catalogue);
  const html = localizeHtml(await renderMarkdown(post.body), locale, catalogue);
  const toc = extractToc(html);
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString(LANGUAGES[locale].hreflang, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';
  const ctaUrl = post.cta_url ?? 'https://calendly.com/shilikajain/30min/';

  const cta = (
    <>
      <p className="post-cta-kicker">
        <span className="post-cta-dot" aria-hidden />
        {ui['post.ctaKicker']}
      </p>
      <h3>{withEm(ui['post.ctaTitle'])}</h3>
      <p>{ui['post.ctaBody']}</p>
      <a href={ctaUrl} target="_blank" rel="noopener" data-magnet>
        {ui['post.ctaLabel']}
        <span aria-hidden>→</span>
      </a>
    </>
  );

  return (
    <article className="post-page">
      <ReadingProgress />

      <header className="post-head">
        <p className="post-kicker">
          <span className="post-kicker-num">{ui['post.kicker']}</span>
          <a href="/blog">{ui['post.allPosts']}</a>
        </p>
        <h1 className="post-title">{title}</h1>
        <p className="post-deck">{description}</p>

        <div className="post-meta-row">
          <div className="post-meta-author">
            <div>
              <p className="post-meta-author-name">
                <a href={localizePath(locale, '/about')}>{post.author}</a>
              </p>
              <p className="post-meta-author-meta">
                <span>{date}</span>
                <span aria-hidden> · </span>
                <span>
                  {readingTimeMinutes(post.body)} {ui['post.minRead']}
                </span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {post.image && (
        <div className="post-hero-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt={title} width={1200} height={630} />
        </div>
      )}

      <div className="post-body-grid">
        <div className="post-rail post-rail-left">
          <div className="post-rail-inner">
            <TableOfContents items={toc} label={ui['post.onThisPage']} />
          </div>
        </div>

        <div className="post-main">
          {toc.length > 0 && (
            <details className="post-toc-mobile">
              <summary>
                <span className="post-toc-mobile-label">{ui['post.onThisPage']}</span>
                <span className="post-toc-mobile-count">{toc.length}</span>
                <span className="post-toc-mobile-chev" aria-hidden>↓</span>
              </summary>
              <ol>
                {toc.map((it) => (
                  <li key={it.id} className={`lvl-${it.level}`}>
                    <a href={`#${it.id}`}>{it.text}</a>
                  </li>
                ))}
              </ol>
            </details>
          )}

          <div className="prose-shilika" dangerouslySetInnerHTML={{ __html: html }} />

          <aside className="post-cta post-cta-sticky post-mobile-block">{cta}</aside>
        </div>

        <div className="post-rail post-rail-right">
          <div className="post-rail-inner">
            <aside className="post-cta post-cta-sticky">
              {cta}
              <div className="post-cta-stats">
                <div>
                  <span className="post-cta-stat-num">50+</span>
                  <span className="post-cta-stat-label">{ui['post.statFounders']}</span>
                </div>
                <div>
                  <span className="post-cta-stat-num">6</span>
                  <span className="post-cta-stat-label">{ui['post.statMarkets']}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <div className="post-back">
        <a href="/blog">{ui['post.backToBlog']}</a>
      </div>
    </article>
  );
}

export default async function LocalizedPage({ params }: { params: Params }) {
  const { locale, page, catalogue } = await resolve(params);
  const image = await shareImage(page);
  // Plain <script>, not next/script: it must be in the served HTML for crawlers that skip JS.
  // The translated homepages carry the site's Organization item (with sameAs) like the English one.
  const doc = jsonLd(page, locale, catalogue, image);
  const ld = (
    <script
      id={`i18n-jsonld-${page.key}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString(page.kind === 'home' ? withOrganization(doc) : doc) }}
    />
  );

  if (page.kind === 'home') {
    // Mirrors app/page.tsx: the homepage partial carries its own nav + footer.
    const body = localizeHtml(loadPartial(page), locale, catalogue).replace(
      LANG_TOGGLE_SLOT,
      languageToggleHtml(locale, '/', loadUi(locale)['lang.label']),
    );
    return (
      <>
        {ld}
        <div dangerouslySetInnerHTML={{ __html: body }} />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src={assetUrl('assets/intro-cards.js')} />
        <Script src={assetUrl('assets/site.js')} strategy="afterInteractive" />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
        <ClientReBoot />
      </>
    );
  }

  return (
    <>
      {ld}
      <EditorialShell active={page.active} strings={loadUi(locale)}>
        {page.kind === 'blog' ? (
          <BlogPost page={page} locale={locale} catalogue={catalogue} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: localizeHtml(loadPartial(page), locale, catalogue) }} />
        )}
      </EditorialShell>
      {page.script && <Script src={page.script} strategy="afterInteractive" />}
      <EditorialScripts />
    </>
  );
}
