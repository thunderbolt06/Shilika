import 'server-only';
import type { BlogPost } from '@/lib/supabase/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';
const USER_AGENT = 'ShilikaBlogBot/1.0 (+https://www.shilikajain.com)';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type PlatformResult =
  | { platform: string; status: 'posted'; url: string }
  | { platform: string; status: 'skipped'; reason: string }
  | { platform: string; status: 'error'; error: string };

function canonicalFor(post: BlogPost): string {
  return `${SITE_URL}/blog/${post.slug}`;
}

/**
 * Rewrite root-relative URLs in markdown (and embedded HTML) to absolute URLs
 * pointing back to the canonical site. Otherwise dev.to / Hashnode render
 * `/blog/foo` against their own host (e.g. https://dev.to/blog/foo), which
 * breaks every internal backlink.
 *
 * Patterns handled:
 *   [text](/path)          markdown link
 *   ![alt](/path)          markdown image
 *   <a href="/path">       raw HTML anchor
 *   <img src="/path">      raw HTML image
 *   [ref]: /path           reference-style link definition
 *
 * Protocol-relative URLs (`//cdn...`) and absolute URLs are left untouched.
 * Anchor-only (`#section`) and mailto:/tel: links are left untouched.
 */
function absolutizeMarkdown(md: string): string {
  const base = SITE_URL.replace(/\/$/, '');
  const isRelative = (u: string) =>
    u.startsWith('/') && !u.startsWith('//');
  const fix = (u: string) => (isRelative(u) ? base + u : u);

  return md
    // ![alt](/path "title")  and  [text](/path "title")
    .replace(
      /(!?\[[^\]]*\])\((\/[^)\s]*)(\s+"[^"]*")?\)/g,
      (_m, label, url, title) => `${label}(${fix(url)}${title ?? ''})`,
    )
    // <a href="/path">  /  <a href='/path'>
    .replace(
      /(<a\s[^>]*href=["'])(\/[^"']+)(["'])/gi,
      (_m, pre, url, post) => `${pre}${fix(url)}${post}`,
    )
    // <img src="/path">
    .replace(
      /(<img\s[^>]*src=["'])(\/[^"']+)(["'])/gi,
      (_m, pre, url, post) => `${pre}${fix(url)}${post}`,
    )
    // Reference-style:  [ref]: /path
    .replace(
      /^(\s*\[[^\]]+\]:\s+)(\/\S+)/gm,
      (_m, pre, url) => `${pre}${fix(url)}`,
    );
}

// dev.to tags: alphanumeric only, max 4, lowercase, <=30 chars each.
function devToTags(tags: string[] | null | undefined): string[] {
  return (tags ?? [])
    .map((t) => t.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter((t) => t.length > 0 && t.length <= 30)
    .slice(0, 4);
}

// Hashnode tag slugs: lowercase, hyphenated, alphanumeric.
function hashnodeTags(tags: string[] | null | undefined): { slug: string; name: string }[] {
  return (tags ?? [])
    .map((t) => {
      const slug = t
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      return { slug, name: t };
    })
    .filter((t) => t.slug.length > 0)
    .slice(0, 5);
}

/**
 * Dev.to publish via REST API.
 *   POST https://dev.to/api/articles
 *   Header: api-key: <DEVTO_API_KEY>
 *   Body: { article: { title, body_markdown, published, tags, canonical_url } }
 */
async function postDevTo(post: BlogPost): Promise<PlatformResult> {
  const key = process.env.DEVTO_API_KEY;
  if (!key) return { platform: 'dev.to', status: 'skipped', reason: 'DEVTO_API_KEY missing' };

  const body = JSON.stringify({
    article: {
      title: post.title,
      body_markdown: absolutizeMarkdown(post.body),
      published: true,
      tags: devToTags(post.tags),
      canonical_url: canonicalFor(post),
      description: post.description,
      main_image: post.image ?? null,
    },
  });

  // dev.to allows ~10 article creations / 30s. Retry once on 429 after the
  // server-suggested cooldown (default 30s).
  let res: Response | null = null;
  let lastText = '';
  for (let attempt = 0; attempt < 2; attempt++) {
    res = await fetch('https://dev.to/api/articles', {
      method: 'POST',
      headers: {
        'api-key': key,
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
      },
      body,
    });
    if (res.status !== 429) break;
    lastText = await res.text();
    const retryAfter = Number(res.headers.get('retry-after')) || 30;
    await sleep((retryAfter + 1) * 1000);
  }
  if (!res) return { platform: 'dev.to', status: 'error', error: 'no response' };
  if (!res.ok) {
    const text = lastText || (await res.text());
    return { platform: 'dev.to', status: 'error', error: `${res.status} ${text.slice(0, 200)}` };
  }
  const data = (await res.json()) as { url?: string };
  return { platform: 'dev.to', status: 'posted', url: data.url ?? '' };
}

/**
 * Hashnode publish via GraphQL.
 *   POST https://gql.hashnode.com/
 *   Authorization: <HASHNODE_API_KEY>
 *   mutation publishPost(input: { ..., publicationId, originalArticleURL })
 */
async function postHashnode(post: BlogPost): Promise<PlatformResult> {
  const key = process.env.HASHNODE_API_KEY;
  const pub = process.env.HASHNODE_PUBLICATION_ID;
  if (!key || !pub) {
    return {
      platform: 'hashnode',
      status: 'skipped',
      reason: 'HASHNODE_API_KEY or HASHNODE_PUBLICATION_ID missing',
    };
  }

  const mutation = `mutation Publish($input: PublishPostInput!) {
    publishPost(input: $input) { post { id url } }
  }`;
  const res = await fetch('https://gql.hashnode.com/', {
    method: 'POST',
    headers: {
      Authorization: key,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': USER_AGENT,
    },
    body: JSON.stringify({
      query: mutation,
      variables: {
        input: {
          title: post.title,
          subtitle: post.description.slice(0, 150),
          contentMarkdown: post.body,
          publicationId: pub,
          tags: hashnodeTags(post.tags),
          originalArticleURL: canonicalFor(post),
          coverImageOptions: post.image ? { coverImageURL: post.image } : undefined,
        },
      },
    }),
  });
  const text = await res.text();
  let data: { errors?: unknown; data?: { publishPost?: { post?: { url?: string } } } } | null = null;
  try {
    data = JSON.parse(text);
  } catch {
    return {
      platform: 'hashnode',
      status: 'error',
      error: `${res.status} non-JSON response (content-type=${res.headers.get('content-type') ?? 'n/a'}): ${text.slice(0, 200)}`,
    };
  }
  if (!res.ok) {
    return {
      platform: 'hashnode',
      status: 'error',
      error: `${res.status} ${text.slice(0, 200)}`,
    };
  }
  if (data?.errors) {
    return { platform: 'hashnode', status: 'error', error: JSON.stringify(data.errors).slice(0, 300) };
  }
  return {
    platform: 'hashnode',
    status: 'posted',
    url: data?.data?.publishPost?.post?.url ?? '',
  };
}

/**
 * Medium publish via deprecated /v1/users/:userId/posts endpoint. Medium's
 * REST API still serves existing tokens. New tokens must be requested via
 * partner program. Skipped if MEDIUM_INTEGRATION_TOKEN missing.
 */
async function postMedium(post: BlogPost): Promise<PlatformResult> {
  const token = process.env.MEDIUM_INTEGRATION_TOKEN;
  const userId = process.env.MEDIUM_USER_ID;
  if (!token || !userId) {
    return {
      platform: 'medium',
      status: 'skipped',
      reason: 'MEDIUM_INTEGRATION_TOKEN or MEDIUM_USER_ID missing',
    };
  }
  const res = await fetch(`https://api.medium.com/v1/users/${userId}/posts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': USER_AGENT,
    },
    body: JSON.stringify({
      title: post.title,
      contentFormat: 'markdown',
      content: post.body,
      canonicalUrl: canonicalFor(post),
      tags: (post.tags ?? []).slice(0, 5),
      publishStatus: 'public',
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    return { platform: 'medium', status: 'error', error: `${res.status} ${text.slice(0, 200)}` };
  }
  const data = (await res.json()) as { data?: { url?: string } };
  return { platform: 'medium', status: 'posted', url: data.data?.url ?? '' };
}

export async function crossPostAll(post: BlogPost): Promise<PlatformResult[]> {
  // Hashnode and Medium are disabled until their auth issues are resolved
  // (Hashnode WAF returning HTML; Medium tokens deprecated). Keep the
  // implementations above so they're easy to re-enable.
  const results = await Promise.allSettled([postDevTo(post)]);
  const platforms: PlatformResult[] = results.map((r, i) => {
    const platform = ['dev.to'][i];
    if (r.status === 'fulfilled') return r.value;
    return { platform, status: 'error', error: r.reason?.message ?? String(r.reason) };
  });
  platforms.push(
    { platform: 'hashnode', status: 'skipped', reason: 'disabled: auth issue' },
    { platform: 'medium', status: 'skipped', reason: 'disabled: auth issue' },
  );
  return platforms;
}
