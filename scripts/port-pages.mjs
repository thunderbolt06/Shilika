#!/usr/bin/env node
/**
 * Phase 2 port: convert public/*.html → app/<route>/page.tsx with the
 * lift-and-shift pattern (head metadata + dangerouslySetInnerHTML body).
 *
 * For each HTML file:
 *   1. Extract <title>, <meta name="description">, canonical, OG/Twitter tags
 *   2. Extract every <script type="application/ld+json"> → _partials/<slug>-jsonld.json
 *   3. Extract <style>...</style> + body markup → _partials/<slug>-body.html
 *      (style stays inline so per-page CSS overrides globals.css)
 *   4. Extract inline <script>...</script> from body → public/assets/<slug>.js
 *   5. Generate app/<route>/page.tsx
 *
 * Idempotent — re-run any time to regenerate from the source HTML.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const APP_DIR = path.join(ROOT, 'app');
const PARTIALS_DIR = path.join(APP_DIR, '_partials');

const SOURCES = [
  // root pages
  { html: 'about.html', route: 'about' },
  { html: 'ads.html', route: 'ads', noindex: true },
  { html: 'testimonials.html', route: 'testimonials' },
  { html: 'article-1.html', route: 'article-1' },
  { html: 'article-2.html', route: 'article-2' },
  { html: 'article-3.html', route: 'article-3' },
  { html: 'article-4.html', route: 'article-4' },
  { html: 'article-5.html', route: 'article-5' },
  { html: 'article-6.html', route: 'article-6' },
  { html: 'article-7.html', route: 'article-7' },
  { html: 'article-8.html', route: 'article-8' },
  // services
  { html: 'services/ai-startup-pr.html', route: 'services/ai-startup-pr' },
  { html: 'services/apac-pr.html', route: 'services/apac-pr' },
  { html: 'services/content-writing.html', route: 'services/content-writing' },
  { html: 'services/cybersecurity-pr.html', route: 'services/cybersecurity-pr' },
  { html: 'services/founder-profiling.html', route: 'services/founder-profiling' },
  { html: 'services/kol-marketing.html', route: 'services/kol-marketing' },
  { html: 'services/token-launch-pr.html', route: 'services/token-launch-pr' },
  { html: 'services/web3-pr-campaigns.html', route: 'services/web3-pr-campaigns' },
  // case studies
  { html: 'work/bullieverse.html', route: 'work/bullieverse' },
  { html: 'work/fluence.html', route: 'work/fluence' },
  { html: 'work/gaia-ai.html', route: 'work/gaia-ai' },
  { html: 'work/mantra-chain.html', route: 'work/mantra-chain' },
  { html: 'work/rari-chain.html', route: 'work/rari-chain' },
  { html: 'work/web3auth.html', route: 'work/web3auth' },
];

function pickAttr(input, attr) {
  const re = new RegExp(`${attr}\\s*=\\s*"([^"]*)"`, 'i');
  const m = input.match(re);
  return m ? m[1] : null;
}

function extractHead(html) {
  const headMatch = html.match(/<head[\s\S]*?<\/head>/i);
  const head = headMatch ? headMatch[0] : '';

  const title = (head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '').trim();

  const metaTags = [...head.matchAll(/<meta[^>]+>/gi)].map((m) => m[0]);

  const get = (key, val) =>
    metaTags
      .map((m) => {
        if (pickAttr(m, key)?.toLowerCase() === val.toLowerCase()) {
          return pickAttr(m, 'content');
        }
        return null;
      })
      .find(Boolean) ?? null;

  const description = get('name', 'description');
  const keywords = get('name', 'keywords');
  const ogTitle = get('property', 'og:title');
  const ogDescription = get('property', 'og:description');
  const ogImage = get('property', 'og:image');
  const ogType = get('property', 'og:type');
  const twitterImage = get('name', 'twitter:image');
  const canonical =
    head.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0]
      ?.match(/href=["']([^"']+)["']/i)?.[1] ?? null;

  const jsonLdBlocks = [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1].trim(),
  );

  return {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    twitterImage,
    canonical,
    jsonLdBlocks,
  };
}

function extractStyleAndBody(html) {
  const styleMatch = html.match(/<style>[\s\S]*?<\/style>/i);
  const style = styleMatch ? styleMatch[0] : '';

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : '';

  // Pull inline scripts out of the body — they'd never execute via
  // dangerouslySetInnerHTML anyway. Each gets concatenated into one file.
  const scripts = [];
  body = body.replace(
    /<script(?:\s+(?:type=["']text\/javascript["']|src=["'][^"']+["'])?[^>]*)?>([\s\S]*?)<\/script>/gi,
    (whole, inner) => {
      // External <script src=...> we keep as a Script tag in page.tsx, so
      // detect by absence of inner content + presence of src.
      const srcMatch = whole.match(/src=["']([^"']+)["']/i);
      if (srcMatch) {
        scripts.push({ external: srcMatch[1], async: /async/i.test(whole), defer: /defer/i.test(whole) });
        return '';
      }
      const trimmed = (inner || '').trim();
      if (trimmed) scripts.push({ inline: trimmed });
      return '';
    },
  );

  // Strip <noscript> blocks too — typically Calendly/analytics fallbacks
  // that don't add value in the SSR'd page.
  body = body.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');

  return { style, body, scripts };
}

const HTML_ENTITIES = {
  '&amp;': '&',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&lt;': '<',
  '&gt;': '>',
  '&nbsp;': ' ',
  '&mdash;': '—',
  '&ndash;': '–',
  '&hellip;': '…',
};

function decodeEntities(s) {
  if (!s) return s;
  let out = s;
  for (const [from, to] of Object.entries(HTML_ENTITIES)) {
    out = out.split(from).join(to);
  }
  // Numeric refs &#123;
  out = out.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
  return out;
}

function tsEscape(s) {
  return decodeEntities(s ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '')
    .replace(/\n/g, '\\n');
}

function arrayLiteral(arr) {
  return `[${arr.map((s) => `'${tsEscape(s)}'`).join(', ')}]`;
}

function ogImageBlock(image) {
  if (!image) return 'undefined';
  return `[{ url: '${tsEscape(image)}', width: 1200, height: 628 }]`;
}

function pageTemplate({ route, slug, head, hasJsonLd, externalScripts, hasSiteJs }) {
  const m = head;
  const titleLine = m.title ? `'${tsEscape(m.title)}'` : 'undefined';
  const descriptionLine = m.description ? `'${tsEscape(m.description)}'` : 'undefined';
  const canonicalLine = m.canonical
    ? `'${tsEscape(m.canonical)}'`
    : `\`\${SITE_URL}/${route}\``;
  const keywordsList = m.keywords
    ? m.keywords.split(',').map((k) => k.trim()).filter(Boolean)
    : [];

  const externalScriptLines = externalScripts
    .map(
      (s) =>
        `      <Script src="${tsEscape(s.external)}" strategy="${s.async ? 'afterInteractive' : s.defer ? 'lazyOnload' : 'afterInteractive'}" />`,
    )
    .join('\n');

  return `import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: ${titleLine},
  description: ${descriptionLine},
  ${keywordsList.length ? `keywords: ${arrayLiteral(keywordsList)},` : ''}
  alternates: { canonical: ${canonicalLine} },
  ${m.ogTitle || m.ogDescription || m.ogImage
    ? `openGraph: {
    title: ${m.ogTitle ? `'${tsEscape(m.ogTitle)}'` : titleLine},
    description: ${m.ogDescription ? `'${tsEscape(m.ogDescription)}'` : descriptionLine},
    url: ${canonicalLine},
    type: '${tsEscape(m.ogType || 'website')}',
    images: ${ogImageBlock(m.ogImage)},
  },`
    : ''}
  ${m.ogTitle || m.ogDescription || m.twitterImage
    ? `twitter: {
    card: 'summary_large_image',
    title: ${m.ogTitle ? `'${tsEscape(m.ogTitle)}'` : titleLine},
    description: ${m.ogDescription ? `'${tsEscape(m.ogDescription)}'` : descriptionLine},
    ${m.twitterImage ? `images: ['${tsEscape(m.twitterImage)}'],` : ''}
  },`
    : ''}
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/${slug}-body.html'), 'utf8');
}

${
  hasJsonLd
    ? `function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/${slug}-jsonld.json'), 'utf8');
}

`
    : ''
}export default function Page() {
  const body = loadBody();
  ${hasJsonLd ? `const jsonLd = loadJsonLd();` : ''}
  return (
    <>
      ${hasJsonLd ? '<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />' : ''}
      <div dangerouslySetInnerHTML={{ __html: body }} />
${externalScriptLines}
${hasSiteJs ? `      <Script src="/assets/${slug}.js" strategy="afterInteractive" />` : ''}
    </>
  );
}
`;
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function portOne({ html: rel, route, noindex }) {
  const slug = route.replace(/\//g, '__');
  const input = path.join(PUBLIC_DIR, rel);

  let raw;
  try {
    raw = await fs.readFile(input, 'utf8');
  } catch (e) {
    console.warn(`skip ${rel} — ${e.message}`);
    return null;
  }

  const head = extractHead(raw);
  const { style, body, scripts } = extractStyleAndBody(raw);

  // Body partial = style block + body markup. Style sits in the rendered
  // body, after globals.css, so its selectors win for shared classnames.
  const bodyOut = `${style}\n${body}`.trim() + '\n';
  const bodyPath = path.join(PARTIALS_DIR, `${slug}-body.html`);
  await fs.writeFile(bodyPath, bodyOut, 'utf8');

  let hasJsonLd = false;
  if (head.jsonLdBlocks.length) {
    hasJsonLd = true;
    const jsonLdOut =
      head.jsonLdBlocks.length === 1
        ? head.jsonLdBlocks[0]
        : `[${head.jsonLdBlocks.join(',\n')}]`;
    const jsonLdPath = path.join(PARTIALS_DIR, `${slug}-jsonld.json`);
    await fs.writeFile(jsonLdPath, jsonLdOut, 'utf8');
  }

  const inlineScripts = scripts.filter((s) => s.inline).map((s) => s.inline);
  const externalScripts = scripts.filter((s) => s.external);

  let hasSiteJs = false;
  if (inlineScripts.length) {
    hasSiteJs = true;
    const jsPath = path.join(PUBLIC_DIR, 'assets', `${slug}.js`);
    await fs.writeFile(
      jsPath,
      `/* Extracted from public/${rel} inline scripts */\n${inlineScripts.join('\n\n')}\n`,
      'utf8',
    );
  }

  const pageDir = path.join(APP_DIR, ...route.split('/'));
  await ensureDir(pageDir);
  const page = pageTemplate({ route, slug, head, hasJsonLd, externalScripts, hasSiteJs });
  await fs.writeFile(path.join(pageDir, 'page.tsx'), page, 'utf8');

  // If marked noindex (only used for /ads at the moment), drop a marker
  // so we can render the appropriate meta header. We achieve this by
  // overriding the metadata.robots inline.
  if (noindex) {
    const pagePath = path.join(pageDir, 'page.tsx');
    const current = await fs.readFile(pagePath, 'utf8');
    const patched = current.replace(
      'export const metadata: Metadata = {',
      "export const metadata: Metadata = {\n  robots: { index: false, follow: true },",
    );
    await fs.writeFile(pagePath, patched, 'utf8');
  }

  return { route, slug, hasJsonLd, externalScripts: externalScripts.length, hasSiteJs };
}

async function main() {
  await ensureDir(PARTIALS_DIR);
  await ensureDir(path.join(PUBLIC_DIR, 'assets'));

  const results = [];
  for (const src of SOURCES) {
    const r = await portOne(src);
    if (r) results.push(r);
  }

  console.log('Ported pages:');
  for (const r of results) {
    console.log(
      `  /${r.route.padEnd(40)} ${r.hasJsonLd ? '+JSON-LD' : '        '} ${r.externalScripts ? '+ext-scripts' : '            '} ${r.hasSiteJs ? '+site.js' : ''}`,
    );
  }
  console.log(`Total: ${results.length}`);
}

await main();
