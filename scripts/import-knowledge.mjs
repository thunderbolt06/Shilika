// Sync Shilika's X posts (Notion "X Tweets Archive") and portfolio into the
// knowledge_base table the blog writer reads.
//
//   node --env-file=.env.local scripts/import-knowledge.mjs            # pull Notion + upsert
//   node --env-file=.env.local scripts/import-knowledge.mjs --offline  # upsert from the JSON snapshot
//
// Only posts tagged New page / Quote in page / Social proof / Idea bank are
// imported; "Archive only" (banter, greetings, replies) never reaches the writer.
// Rows are keyed by metadata.key, so re-running updates in place.

import fs from 'node:fs/promises';
import path from 'node:path';
import { Client } from '@notionhq/client';
import { createClient } from '@supabase/supabase-js';

const ROOT = process.cwd();
const TWEETS_SNAPSHOT = path.join(ROOT, 'data/knowledge/x-tweets.json');
const PORTFOLIO = path.join(ROOT, 'data/knowledge/portfolio.json');
const X_DATA_SOURCE = '3f8d70ad-d6ce-8164-af17-000b2a2fd3c8';
const USEFUL = ['New page', 'Quote in page', 'Social proof', 'Idea bank'];

const offline = process.argv.includes('--offline');

const slug = (s) =>
  s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const text = (p) => (p?.rich_text ?? p?.title ?? []).map((t) => t.plain_text).join('');

async function pullTweets() {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const rows = [];
  let cursor;
  do {
    const res = await notion.request({
      path: `data_sources/${X_DATA_SOURCE}/query`,
      method: 'post',
      body: {
        page_size: 100,
        start_cursor: cursor,
        filter: {
          and: [
            { or: USEFUL.map((u) => ({ property: 'Website use', select: { equals: u } })) },
            { property: 'Format', select: { does_not_equal: 'Reply' } },
          ],
        },
      },
    });
    for (const r of res.results) {
      const p = r.properties;
      rows.push({
        id: text(p['Tweet ID']),
        url: p['Tweet URL']?.url ?? null,
        date: p['Date']?.date?.start?.slice(0, 10) ?? null,
        text: text(p['Full text']) || text(p['Tweet']),
        quoted: text(p['Quoted tweet']) || null,
        category: p['Category']?.select?.name ?? null,
        cluster: p['Page cluster']?.select?.name ?? null,
        topics: (p['Topics']?.multi_select ?? []).map((t) => t.name),
        website_use: p['Website use']?.select?.name ?? null,
        target_page: text(p['Target page']) || null,
        used_in_article: text(p['Used in article']) || null,
        score: p['Score']?.number ?? 0,
        likes: p['Likes']?.number ?? 0,
        views: p['Views']?.number ?? 0,
      });
    }
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  rows.sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));
  return rows;
}

function tweetEntry(t) {
  const clean = t.text.replace(/\s+/g, ' ').trim();
  const title = clean.length > 90 ? `${clean.slice(0, 87).replace(/\s+\S*$/, '')}...` : clean;
  const tags = new Set(['x-post', ...t.topics.map(slug)]);
  if (t.cluster) tags.add(slug(t.cluster));
  if (t.category) tags.add(slug(t.category));
  if (t.website_use) tags.add(slug(t.website_use));
  tags.delete('reply');
  const body = [
    t.text.trim(),
    t.quoted ? `\n(Quoting: ${t.quoted.trim()})` : '',
  ].join('');
  return {
    title: `X post (${t.date ?? 'undated'}): ${title}`,
    kind: 'snippet',
    body,
    tags: [...tags],
    source_url: t.url,
    metadata: {
      source: 'x_tweets',
      key: `x:${t.id}`,
      date: t.date,
      website_use: t.website_use,
      page_cluster: t.cluster,
      category: t.category,
      target_page: t.target_page,
      used_in_article: t.used_in_article,
      score: t.score,
      likes: t.likes,
      views: t.views,
    },
  };
}

function portfolioEntry(e) {
  return {
    title: e.title,
    kind: e.kind,
    body: e.body,
    tags: e.tags,
    source_url: e.source_url,
    metadata: { source: 'portfolio', key: `portfolio:${e.key}` },
  };
}

async function main() {
  let tweets;
  if (offline) {
    tweets = JSON.parse(await fs.readFile(TWEETS_SNAPSHOT, 'utf8'));
  } else {
    tweets = await pullTweets();
    await fs.mkdir(path.dirname(TWEETS_SNAPSHOT), { recursive: true });
    await fs.writeFile(TWEETS_SNAPSHOT, `${JSON.stringify(tweets, null, 2)}\n`);
  }
  const portfolio = JSON.parse(await fs.readFile(PORTFOLIO, 'utf8')).entries;

  const desired = [...tweets.filter((t) => t.id && t.text).map(tweetEntry), ...portfolio.map(portfolioEntry)];

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);
  const { data: existing, error } = await supabase
    .from('knowledge_base')
    .select('id, metadata')
    .in('metadata->>source', ['x_tweets', 'portfolio']);
  if (error) throw error;

  const byKey = new Map(existing.map((r) => [r.metadata.key, r.id]));
  const inserts = [];
  let updated = 0;
  for (const row of desired) {
    const id = byKey.get(row.metadata.key);
    if (id) {
      const { error: e } = await supabase
        .from('knowledge_base')
        .update({ ...row, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (e) throw e;
      byKey.delete(row.metadata.key);
      updated++;
    } else {
      inserts.push(row);
    }
  }
  for (let i = 0; i < inserts.length; i += 200) {
    const { error: e } = await supabase.from('knowledge_base').insert(inserts.slice(i, i + 200));
    if (e) throw e;
  }
  const stale = [...byKey.values()];
  if (stale.length) {
    const { error: e } = await supabase.from('knowledge_base').delete().in('id', stale);
    if (e) throw e;
  }

  const uses = tweets.reduce((m, t) => ((m[t.website_use] = (m[t.website_use] ?? 0) + 1), m), {});
  console.log(
    `tweets: ${tweets.length} ${JSON.stringify(uses)} | portfolio: ${portfolio.length} | inserted ${inserts.length}, updated ${updated}, removed ${stale.length}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
