#!/usr/bin/env node
// indexnow-ping.mjs
// Tells IndexNow (Bing, Yandex, Seznam, Naver) which URLs changed, so they recrawl sooner.
// Dependency-free. Dry run by default: nothing is sent unless you pass --send.
//
// Usage (run from the repo root):
//   node scripts/indexnow-ping.mjs --since <git-ref>          list URLs changed since a commit or tag
//   node scripts/indexnow-ping.mjs --since <git-ref> --send   same, then post them
//   node scripts/indexnow-ping.mjs /india /services/apac-pr --send   post explicit paths or full URLs
//   node scripts/indexnow-ping.mjs --all --send               post every sitemap URL (use rarely)
//
// Typical use after a weekly merge is live in production:
//   node scripts/indexnow-ping.mjs --since <previous merge sha> --send
//
// How it works:
//   1. Reads the live sitemap. Only URLs in the sitemap are ever sent.
//   2. With --since, maps files from "git diff --name-only <ref> HEAD" to URLs:
//        app/(site)/<route>/page.tsx           -> /<route>
//        app/_partials/<a>__<b>-body.html      -> /<a>/<b>   (homepage -> /)
//        app/_partials/article-N-*             -> first site URL in article-N-jsonld.json
//        app/_partials/i18n/<locale>/<name>.json -> /<locale>/<path>
//      Files it cannot map are listed and skipped. It never guesses.
//   3. Checks the key file is live at keyLocation before posting.
//   4. POSTs JSON to https://api.indexnow.org/indexnow. 200 or 202 means accepted.
//
// The key is public by design (it is served at /<key>.txt). It only proves host ownership.
// Run this only after the deploy is live, or engines will recrawl the old version.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const HOST = 'www.shilikajain.com';
const SITE = `https://${HOST}`;
const KEY = '74a7acd52bf1566888def8ebd4f13dd5';
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const LOCALES = ['es', 'ja', 'ko', 'ru', 'zh'];
const MAX_URLS = 10000;

const args = process.argv.slice(2);
const send = args.includes('--send');
const all = args.includes('--all');
const sinceIdx = args.indexOf('--since');
const since = sinceIdx >= 0 ? args[sinceIdx + 1] : null;
const explicit = args.filter((a, i) => !a.startsWith('--') && !(sinceIdx >= 0 && i === sinceIdx + 1));

if (!all && !since && explicit.length === 0) {
  console.error('Nothing to do. Pass --since <git-ref>, --all, or one or more paths. See the header of this file.');
  process.exit(1);
}
if (sinceIdx >= 0 && !since) {
  console.error('--since needs a git ref.');
  process.exit(1);
}

const norm = (u) => {
  const url = u.startsWith('http') ? u : SITE + (u.startsWith('/') ? u : '/' + u);
  return url.length > SITE.length + 1 ? url.replace(/\/$/, '') : SITE + '/';
};

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => norm(m[1].trim())));
}

// "services__ai-seo" -> "/services/ai-seo", "homepage" -> "/"
const nameToPath = (name) => (name === 'homepage' || name === 'home' ? '/' : '/' + name.split('__').join('/'));

function articleUrl(n) {
  const file = `app/_partials/article-${n}-jsonld.json`;
  if (!existsSync(file)) return null;
  const m = readFileSync(file, 'utf8').match(/"url":\s*"(https:\/\/www\.shilikajain\.com\/(?:blog|playbook)\/[^"]+)"/);
  return m ? m[1] : null;
}

function mapFile(file) {
  let m;
  if ((m = file.match(/^app\/_partials\/i18n\/([^/]+)\/(.+)\.json$/))) {
    const [, loc, name] = m;
    if (name === 'ui') return [];
    const path = nameToPath(name);
    if (loc === '_source') return [path];
    if (!LOCALES.includes(loc)) return null;
    return [`/${loc}${path === '/' ? '' : path}`];
  }
  if ((m = file.match(/^app\/_partials\/article-(\d+)-(?:body\.html|jsonld\.json|meta\.json)$/))) {
    const url = articleUrl(m[1]);
    return url ? [url] : null;
  }
  if ((m = file.match(/^app\/_partials\/(.+)-(?:body\.html|jsonld\.json|meta\.json)$/))) {
    return [nameToPath(m[1])];
  }
  if ((m = file.match(/^app\/\(site\)\/(.*?)\/?page\.tsx$/))) {
    if (m[1].includes('[')) return null;
    return ['/' + m[1]];
  }
  return undefined; // not a page file, ignore quietly
}

function changedSince(ref) {
  const out = execFileSync('git', ['diff', '--name-only', ref, 'HEAD'], { encoding: 'utf8' });
  const urls = new Set();
  const unmapped = [];
  for (const file of out.split('\n').filter(Boolean)) {
    const mapped = mapFile(file);
    if (mapped === null) unmapped.push(file);
    else if (mapped) mapped.forEach((p) => urls.add(norm(p)));
  }
  return { urls, unmapped };
}

const known = await sitemapUrls();
let wanted = new Set(explicit.map(norm));
let unmapped = [];
if (all) wanted = new Set(known);
if (since) {
  const r = changedSince(since);
  r.urls.forEach((u) => wanted.add(u));
  unmapped = r.unmapped;
}

const urlList = [...wanted].filter((u) => known.has(u)).sort();
const dropped = [...wanted].filter((u) => !known.has(u)).sort();

console.log(`Sitemap URLs: ${known.size}. To send: ${urlList.length}.`);
urlList.forEach((u) => console.log('  ' + u));
if (dropped.length) {
  console.log(`Not in the sitemap, skipped (${dropped.length}):`);
  dropped.forEach((u) => console.log('  ' + u));
}
if (unmapped.length) {
  console.log(`Changed page files with no URL mapping, skipped (${unmapped.length}). Pass their URLs by hand if needed:`);
  unmapped.forEach((f) => console.log('  ' + f));
}

if (urlList.length === 0) {
  console.log('Nothing to send.');
  process.exit(0);
}
if (urlList.length > MAX_URLS) {
  console.error(`More than ${MAX_URLS} URLs. Split the run.`);
  process.exit(1);
}
if (!send) {
  console.log('Dry run. Add --send to post.');
  process.exit(0);
}

const keyRes = await fetch(KEY_LOCATION);
const keyBody = keyRes.ok ? (await keyRes.text()).trim() : '';
if (keyBody !== KEY) {
  console.error(`Key file is not live at ${KEY_LOCATION} (status ${keyRes.status}). Deploy first, then retry.`);
  process.exit(1);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});
console.log(`IndexNow response: ${res.status} ${res.statusText}`);
if (res.status !== 200 && res.status !== 202) {
  console.error((await res.text()).slice(0, 500));
  process.exit(1);
}
console.log(`Accepted ${urlList.length} URLs.`);
