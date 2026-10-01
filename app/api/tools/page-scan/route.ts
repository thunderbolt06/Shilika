import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import { NextResponse } from 'next/server';

/**
 * GET /api/tools/page-scan?url=https://example.com
 *
 * Fetches one public web page (plus its robots.txt and llms.txt) and returns
 * the structural facts the AI-citability checker and Open Graph preview need.
 * Scoring happens in the browser. Guards against SSRF: http(s) only, public
 * IPs only (checked on every redirect hop), 8s timeout, 2 MB cap.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const UA = 'Mozilla/5.0 (compatible; ShilikaToolsBot/1.0; +https://www.shilikajain.com/tools)';
const MAX_BYTES = 2_000_000;
const TIMEOUT_MS = 8000;
const MAX_REDIRECTS = 4;

const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'CCBot', 'Applebot-Extended'];

function isPrivateIp(ip: string): boolean {
  if (isIP(ip) === 4) {
    const [a, b] = ip.split('.').map(Number);
    return (
      a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19))
    );
  }
  const v = ip.toLowerCase();
  if (v.startsWith('::ffff:')) return isPrivateIp(v.slice(7));
  return v === '::' || v === '::1' || v.startsWith('fc') || v.startsWith('fd') || v.startsWith('fe8') || v.startsWith('fe9') || v.startsWith('fea') || v.startsWith('feb') || v.startsWith('ff');
}

async function assertPublic(u: URL) {
  if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new Error('Only http and https URLs are supported.');
  if (u.username || u.password) throw new Error('URLs with credentials are not supported.');
  if (u.port && !['80', '443'].includes(u.port)) throw new Error('Only standard ports are supported.');
  const host = u.hostname.replace(/^\[|\]$/g, '');
  if (host === 'localhost' || host.endsWith('.local') || host.endsWith('.internal')) throw new Error('That address is not public.');
  const addrs = isIP(host) ? [{ address: host }] : await lookup(host, { all: true });
  if (!addrs.length || addrs.some((a) => isPrivateIp(a.address))) throw new Error('That address is not public.');
}

async function readCapped(res: Response): Promise<string> {
  if (!res.body) return '';
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BYTES) {
      await reader.cancel();
      break;
    }
    chunks.push(value);
  }
  return new TextDecoder('utf-8', { fatal: false }).decode(Buffer.concat(chunks));
}

async function safeFetch(start: URL): Promise<{ res: Response; url: URL; body: string }> {
  let url = start;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublic(url);
    const res = await fetch(url, {
      redirect: 'manual',
      headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.5' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const loc = res.headers.get('location');
    if (res.status >= 300 && res.status < 400 && loc) {
      url = new URL(loc, url);
      continue;
    }
    return { res, url, body: await readCapped(res) };
  }
  throw new Error('Too many redirects.');
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/\s+/g, ' ')
    .trim();
}

function strip(html: string): string {
  return decode(html.replace(/<[^>]+>/g, ' '));
}

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? decode(m[2] ?? m[3] ?? m[4] ?? '') : null;
}

function metaContent(html: string, key: string): string | null {
  const re = /<meta\b[^>]*>/gi;
  for (const m of html.matchAll(re)) {
    const tag = m[0];
    const k = (attr(tag, 'property') ?? attr(tag, 'name') ?? '').toLowerCase();
    if (k === key.toLowerCase()) return attr(tag, 'content');
  }
  return null;
}

function headings(html: string, level: number): string[] {
  const re = new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)</h${level}>`, 'gi');
  return [...html.matchAll(re)].map((m) => strip(m[1])).filter(Boolean).slice(0, 60);
}

function jsonLdTypes(html: string): string[] {
  const types = new Set<string>();
  const collect = (node: unknown) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) return node.forEach(collect);
    const o = node as Record<string, unknown>;
    const t = o['@type'];
    if (typeof t === 'string') types.add(t);
    if (Array.isArray(t)) t.forEach((x) => typeof x === 'string' && types.add(x));
    Object.values(o).forEach(collect);
  };
  for (const m of html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      collect(JSON.parse(m[1].trim()));
    } catch {
      types.add('(invalid JSON-LD)');
    }
  }
  return [...types];
}

/** Very small robots.txt reader: is "/" disallowed for a given bot? */
function robotsBlocks(robots: string, bot: string): boolean {
  const groups: { agents: string[]; rules: { allow: boolean; path: string }[] }[] = [];
  let cur: (typeof groups)[number] | null = null;
  let lastWasAgent = false;
  for (const raw of robots.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const val = m[2].trim();
    if (key === 'user-agent') {
      if (!cur || !lastWasAgent) {
        cur = { agents: [], rules: [] };
        groups.push(cur);
      }
      cur.agents.push(val.toLowerCase());
      lastWasAgent = true;
    } else {
      lastWasAgent = false;
      if (cur && (key === 'allow' || key === 'disallow')) cur.rules.push({ allow: key === 'allow', path: val });
    }
  }
  const pick = groups.find((g) => g.agents.includes(bot.toLowerCase())) ?? groups.find((g) => g.agents.includes('*'));
  if (!pick) return false;
  const rootAllowed = pick.rules.some((r) => r.allow && r.path === '/');
  return !rootAllowed && pick.rules.some((r) => !r.allow && r.path === '/');
}

export async function GET(req: Request) {
  const raw = new URL(req.url).searchParams.get('url')?.trim() ?? '';
  if (!raw) return NextResponse.json({ ok: false, error: 'Add a URL to scan.' }, { status: 400 });

  let target: URL;
  try {
    target = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return NextResponse.json({ ok: false, error: 'That does not look like a valid URL.' }, { status: 400 });
  }

  try {
    const page = await safeFetch(target);
    const type = page.res.headers.get('content-type') ?? '';
    if (!page.res.ok) {
      return NextResponse.json({ ok: false, error: `The page returned HTTP ${page.res.status}.` }, { status: 502 });
    }
    if (type && !/html|xml/i.test(type)) {
      return NextResponse.json({ ok: false, error: 'That URL is not an HTML page.' }, { status: 422 });
    }

    const html = page.body;
    const head = html.match(/<head\b[\s\S]*?<\/head>/i)?.[0] ?? html.slice(0, 50000);
    const bodyHtml = (html.match(/<body\b[\s\S]*<\/body>/i)?.[0] ?? html)
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ');
    const mainHtml = bodyHtml.match(/<(main|article)\b[\s\S]*?<\/\1>/i)?.[0] ?? bodyHtml;
    const text = strip(mainHtml);
    const words = text ? text.split(/\s+/).length : 0;

    const canonicalTag = head.match(/<link\b[^>]*rel\s*=\s*["']?canonical["']?[^>]*>/i)?.[0];
    const imgs = [...bodyHtml.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
    const links = [...bodyHtml.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1]);
    let internal = 0;
    let external = 0;
    for (const href of links) {
      try {
        const u = new URL(href, page.url);
        if (u.protocol.startsWith('http')) (u.host === page.url.host ? internal++ : external++);
      } catch {
        // ignore
      }
    }
    const h2 = headings(html, 2);
    const h3 = headings(html, 3);
    const paragraphs = [...mainHtml.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => strip(m[1])).filter((p) => p.length > 0);
    const firstPara = paragraphs.find((p) => p.split(/\s+/).length >= 12) ?? '';

    const origin = page.url.origin;
    const [robotsRes, llmsRes] = await Promise.allSettled([
      safeFetch(new URL('/robots.txt', origin)),
      safeFetch(new URL('/llms.txt', origin)),
    ]);
    const robotsTxt = robotsRes.status === 'fulfilled' && robotsRes.value.res.ok ? robotsRes.value.body.slice(0, 100000) : '';
    const llmsOk =
      llmsRes.status === 'fulfilled' &&
      llmsRes.value.res.ok &&
      !/text\/html/i.test(llmsRes.value.res.headers.get('content-type') ?? '') &&
      llmsRes.value.body.trim().startsWith('#');

    return NextResponse.json({
      ok: true,
      url: target.toString(),
      finalUrl: page.url.toString(),
      https: page.url.protocol === 'https:',
      lang: attr(html.match(/<html\b[^>]*>/i)?.[0] ?? '', 'lang'),
      meta: {
        title: strip(head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ''),
        description: metaContent(head, 'description'),
        canonical: canonicalTag ? attr(canonicalTag, 'href') : null,
        robots: metaContent(head, 'robots'),
        viewport: metaContent(head, 'viewport'),
        og: {
          title: metaContent(head, 'og:title'),
          description: metaContent(head, 'og:description'),
          image: metaContent(head, 'og:image'),
          url: metaContent(head, 'og:url'),
          siteName: metaContent(head, 'og:site_name'),
          type: metaContent(head, 'og:type'),
        },
        twitter: {
          card: metaContent(head, 'twitter:card'),
          title: metaContent(head, 'twitter:title'),
          description: metaContent(head, 'twitter:description'),
          image: metaContent(head, 'twitter:image'),
          site: metaContent(head, 'twitter:site'),
        },
        favicon: (() => {
          const tag = head.match(/<link\b[^>]*rel\s*=\s*["'][^"']*icon[^"']*["'][^>]*>/i)?.[0];
          const href = tag ? attr(tag, 'href') : null;
          try {
            return new URL(href ?? '/favicon.ico', page.url).toString();
          } catch {
            return null;
          }
        })(),
      },
      headings: { h1: headings(html, 1), h2, h3 },
      jsonLdTypes: jsonLdTypes(html),
      content: {
        words,
        paragraphs: paragraphs.length,
        firstParagraph: firstPara.slice(0, 600),
        lists: (mainHtml.match(/<(ul|ol)\b/gi) ?? []).length,
        tables: (mainHtml.match(/<table\b/gi) ?? []).length,
        images: imgs.length,
        imagesWithAlt: imgs.filter((t) => (attr(t, 'alt') ?? '').trim().length > 0).length,
        questionHeadings: [...h2, ...h3].filter((h) => /\?\s*$/.test(h) || /^(what|how|why|when|who|which|where|can|is|are|do|does|should)\b/i.test(h)).length,
        internalLinks: internal,
        externalLinks: external,
      },
      signals: {
        author: metaContent(head, 'author') ?? (html.match(/"author"\s*:/) ? 'in schema' : null),
        datePublished: metaContent(head, 'article:published_time') ?? html.match(/"datePublished"\s*:\s*"([^"]+)"/)?.[1] ?? null,
        dateModified: metaContent(head, 'article:modified_time') ?? html.match(/"dateModified"\s*:\s*"([^"]+)"/)?.[1] ?? null,
      },
      robots: {
        found: Boolean(robotsTxt),
        blocked: Object.fromEntries(AI_BOTS.map((b) => [b, robotsTxt ? robotsBlocks(robotsTxt, b) : false])),
        sitemap: /^\s*sitemap\s*:/im.test(robotsTxt),
      },
      llmsTxt: llmsOk,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Could not fetch that page.';
    const friendly = /abort|timeout/i.test(msg) ? 'The page took too long to respond.' : /ENOTFOUND|getaddrinfo/i.test(msg) ? 'That domain could not be found.' : msg;
    return NextResponse.json({ ok: false, error: friendly }, { status: 502 });
  }
}
