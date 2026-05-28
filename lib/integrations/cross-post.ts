import 'server-only';
import type { BlogPost } from '@/lib/supabase/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export type PlatformResult =
  | { platform: string; status: 'posted'; url: string }
  | { platform: string; status: 'skipped'; reason: string }
  | { platform: string; status: 'error'; error: string };

function canonicalFor(post: BlogPost): string {
  return `${SITE_URL}/blog/${post.slug}`;
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

  const res = await fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: { 'api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      article: {
        title: post.title,
        body_markdown: post.body,
        published: true,
        tags: (post.tags ?? []).slice(0, 4),
        canonical_url: canonicalFor(post),
        description: post.description,
        main_image: post.image ?? null,
      },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
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
    headers: { Authorization: key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: mutation,
      variables: {
        input: {
          title: post.title,
          subtitle: post.description.slice(0, 150),
          contentMarkdown: post.body,
          publicationId: pub,
          tags: (post.tags ?? []).slice(0, 5).map((t) => ({ slug: t, name: t })),
          originalArticleURL: canonicalFor(post),
          coverImageOptions: post.image ? { coverImageURL: post.image } : undefined,
        },
      },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    return {
      platform: 'hashnode',
      status: 'error',
      error: `${res.status} ${text.slice(0, 200)}`,
    };
  }
  const data = (await res.json()) as { errors?: unknown; data?: { publishPost?: { post?: { url?: string } } } };
  if (data.errors) {
    return { platform: 'hashnode', status: 'error', error: JSON.stringify(data.errors).slice(0, 200) };
  }
  return {
    platform: 'hashnode',
    status: 'posted',
    url: data.data?.publishPost?.post?.url ?? '',
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
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
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
  const results = await Promise.allSettled([postDevTo(post), postHashnode(post), postMedium(post)]);
  return results.map((r, i) => {
    const platform = ['dev.to', 'hashnode', 'medium'][i];
    if (r.status === 'fulfilled') return r.value;
    return { platform, status: 'error', error: r.reason?.message ?? String(r.reason) };
  });
}
