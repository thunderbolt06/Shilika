# Crawl and AI-bot accessibility audit: shilikajain.com

Audit date: 2026-10-16 (live checks run from one residential IP with curl 8.x and one Browser pane session).
Scope: robots, redirects, sitemap, llms.txt / llms-full.txt, markdown twins, 14 bot user agents, 5 new locales (zh, ko, ja, es, ru).
Not available: Ahrefs API ("Insufficient plan", not retried), Google Search Console, Vercel logs. Anything that needs those is marked "unverified".

Raw evidence (all under `/private/tmp/claude-504/-Users-thunderbolt-Documents-projects-Shilika/c0dc2b3b-3b31-46db-9535-df2409eb89af/scratchpad/audit/raw/`):
`sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, `allstatus.txt` (715 URL statuses), `allpages_meta.json` (715 pages: canonical, robots, title, H1, words), `ua_results.tsv` + `ua/` (153 bot-UA responses), `locale_check.json` (126 locale URLs), `internal_links.json`, `locs.txt`.

---

## 0. Bottom line

Crawl access is healthy. Nothing blocks any AI or search bot, every sitemap URL is a clean 200 with a self-canonical and `index, follow`, hreflang is correct across all 126 translated and source URLs checked, and there are zero broken internal links.

The real defects are about what a **non-JS crawler** and a **slow dynamic origin** see, not about access:

1. **No page serves JSON-LD in its raw HTML.** All structured data (FAQPage, Person, Service, Article) is injected by JavaScript via `next/script`. Googlebot renders it; GPTBot, ClaudeBot, PerplexityBot, CCBot and similar fetchers that parse raw HTML do not see any of it (high).
2. **All ~300 blog posts, `/blog`, `/authors/shilika-jain` and `sitemap.xml` are fully dynamic** (`cache-control: private, no-cache, no-store`, `x-vercel-cache: MISS`, 1.3 to 3.9 s TTFB on every request) despite `revalidate = 3600` in the code. Root cause is `cookies()` inside `getServerSupabase()` (medium).
3. `llms.txt` / `llms-full.txt` / markdown twins cover the blog only. The ~122 playbooks, 106 landing pages, 9 service pages, 6 regional desks, 11 compare pages and 105 locale pages are absent from llms.txt (except 15 playbooks and the service/region pages) and have no markdown alternate (medium).
4. Apex to www is a 307 (temporary) and takes two hops from http (medium).
5. Translated pages ship `<html lang="en">` in raw HTML and a thin JS-only JSON-LD (medium).

Score: **7.5 / 10** for crawl and bot accessibility.

---

## 1. Config and code read

| File | What it does | Verdict |
|---|---|---|
| `app/robots.ts` | `*` group allow `/`, disallow `/admin`, `/admin/*`, `/api/admin/*`, `/api/cron/*`. Identical group repeated for 9 AI bots (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, GPTBot, ClaudeBot, Google-Extended, CCBot). `sitemap` and `host`. | Correct. Repeating the `*` rules per bot is harmless but redundant because `*` already allows everything. |
| `middleware.ts` | Only matches `/admin/:path*` and `/api/admin/:path*` (auth gate, 307 to login / 401). | No effect on public crawling. |
| `next.config.ts` | 8 legacy `/article-N` and 8 `/playbook/N` 301/308 redirects; `/blog/:slug.md` rewrite to `/api/markdown/blog/:slug`; headers for md, llms.txt, assets, `/admin` noindex; no `trailingSlash` setting (Next default: strip slash with 308). | Fine. `llms.txt` header block sets `max-age=3600, must-revalidate`. |
| `vercel.json` | One redirect: `/ads/` to `/ads` (permanent). | Fine. No firewall or bot rules in repo. |
| `app/sitemap.ts` | 715 URLs live. `lastModified` only where a real date is tracked (comment explicitly rejects `new Date()`). Blog entries use Supabase `updated_at`. Localized entries carry `alternates.languages`. try/catch swallows Supabase failure and ships a static-only sitemap. | Good design. Uses `listPublishedPosts()` which does `select('*')` (full bodies) just to get slug and date; the cheap `listAllPublishedSlugs()` in `lib/blog.ts:52` is unused. |
| `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts` | Intro from `app/_partials/llms-intro.md` plus dynamic blog list / blog bodies. `revalidate = 3600`. | See section 5. |
| `app/api/markdown/blog/[slug]/route.ts` | Markdown with frontmatter, `Link: <canonical>; rel="canonical"`, deliberately no noindex. | Good. Blog only (no other markdown route exists under `app/api/markdown/`). |
| `public/` | No static `robots.txt`, `llms.txt` or `sitemap.xml` that could shadow the routes. | Fine. |
| `app/[locale]/layout.tsx`, `app/[locale]/[[...path]]/page.tsx`, `lib/i18n/config.ts`, `lib/i18n/toggle.ts` | `dynamicParams = false`, 21 pages x 5 locales statically generated; canonical + `languages` in metadata; language switcher is plain `<a href hreflang>` in a `<details>`. `<html lang>` cannot be set per locale (root layout) so a client script rewrites it. | See section 7. |

Git state: `main` equals `origin/main` (30dd8aa). 34 files are modified but uncommitted (including `app/sitemap.ts` lastmod bumps for `/services/apac-pr` and `/singapore`, `app/singapore/page.tsx`, and the zh/ko/ja/es/ru `home|services|singapore` catalogues). Those changes are **not live**; every live observation below reflects commit 30dd8aa.

---

## 2. Redirects, hosts, headers (live)

```
$ curl -sS -o /dev/null -w 'code=%{http_code} redirect=%{redirect_url}' <url>
http://shilikajain.com/                   308 -> https://shilikajain.com/
http://www.shilikajain.com/               308 -> https://www.shilikajain.com/
https://shilikajain.com/                  307 -> https://www.shilikajain.com/
https://shilikajain.com/services          307 -> https://www.shilikajain.com/services
https://www.shilikajain.com/services/     308 -> https://www.shilikajain.com/services
https://www.shilikajain.com/services/apac-pr/  308 -> .../services/apac-pr
https://www.shilikajain.com/              200 (218,924 bytes)

$ curl -sSIL http://shilikajain.com/services/apac-pr
HTTP/1.0 308  Location: https://shilikajain.com/services/apac-pr
HTTP/2   307  location: https://www.shilikajain.com/services/apac-pr
HTTP/2   200
hops=2
```

Findings:
- Trailing slash: 308 to no-slash. Good. `/Services` and `/SERVICES/apac-pr` return 404 (case sensitive, acceptable). `/services//apac-pr` 308s to the clean path. Query strings keep a self canonical without the query (`/services/apac-pr?utm_source=x` canonical = `.../services/apac-pr`).
- **Apex to www is a 307 (temporary), and `http://apex` needs two hops (308 then 307).** Single permanent hop is the norm. Fix in Vercel Project > Domains (set the apex redirect to 308).
- `x-robots-tag`: absent on all public HTML, md, llms and sitemap responses. Present (`noindex, nofollow`) only on `/admin*`.
- `Link` header: present only on the markdown route (`<.../blog/slug>; rel="canonical"`); HTML pages carry no `Link` header (Next adds only CSS preload hints).
- HEAD works on all tested URLs. Brotli is on (llms-full.txt 3.74 MB raw, 1.30 MB on the wire; sitemap 218 KB raw, 16 KB wire).
- DNS: apex A 64.29.17.65 / 216.198.79.65; www A 64.29.17.1 / 216.198.79.1; CAA allows letsencrypt.org, pki.goog, sectigo.com.

### Content types and caching (www host)

| URL | status | content-type | cache-control | x-vercel-cache |
|---|---|---|---|---|
| /robots.txt | 200 | text/plain | public, max-age=0, must-revalidate | HIT (age 23,521 s) |
| /sitemap.xml | 200 | application/xml | public, max-age=0, must-revalidate | **MISS every time (2.2 to 3.5 s)** |
| /llms.txt | 200 | text/markdown; charset=utf-8 | public, max-age=3600, must-revalidate | HIT after first (cold request 3.35 s) |
| /llms-full.txt | 200 | text/markdown; charset=utf-8 | public, max-age=3600, must-revalidate | MISS then HIT |
| /services/apac-pr | 200 | text/html | public, max-age=0, must-revalidate | HIT (age ~23,600 s) |
| /playbook/fractional-vs-agency | 200 | text/html | public, max-age=0, must-revalidate | HIT |
| /api/markdown/blog/analyst-relations-101-startups | 200 | text/markdown; charset=utf-8 | public, max-age=3600 | HIT |
| /blog/analyst-relations-101-startups.md | 200 | text/markdown | public, max-age=3600 | HIT (rewrite works) |
| **/blog/analyst-relations-101-startups** | 200 | text/html | **private, no-cache, no-store, max-age=0, must-revalidate** | **MISS (1.26 to 2.23 s TTFB, 3 of 3 runs)** |
| **/blog** | 200 | text/html (738 KB) | **private, no-cache, no-store** | **MISS (2.3 to 2.8 s TTFB)** |
| **/authors/shilika-jain** | 200 | text/html (388 KB) | **private, no-cache, no-store** | **MISS (2.3 to 3.7 s TTFB)** |

The apex host answers 307 for every path including `/robots.txt`, `/sitemap.xml`, `/llms.txt` (Google follows redirects on robots.txt, so this is only the permanence issue above).

Root cause of the dynamic blog (code evidence, symptom verified live): `lib/supabase/server.ts` `getServerSupabase()` does `const cookieStore = await cookies()` (from `next/headers`). Every function in `lib/blog.ts` goes through it. In Next 15, touching `cookies()` opts the route into dynamic rendering, which overrides `export const revalidate = 3600` in `app/blog/[slug]/page.tsx` and `revalidate = 600` in `app/blog/page.tsx`. The local `.next/prerender-manifest.json` also has no `/blog` routes in the prerendered set (local build, may be stale).

---

## 3. robots.txt (live vs repo)

Live body is byte-identical for all 17 user agents tested (md5 distinct count = 1, 1,224 bytes) and matches `app/robots.ts` output: `User-Agent: *` plus the 9 named bots, each `Allow: /` with the same 4 disallows; trailing `Host:` and `Sitemap: https://www.shilikajain.com/sitemap.xml`.

- No bot is blocked. `/api/markdown/*`, `/_next/*`, `/assets/*`, `/llms*.txt` are all crawlable.
- Not named explicitly (fall through to `*` = allowed): Perplexity-User, Applebot-Extended, Bytespider, Bingbot, Googlebot, Meta-ExternalAgent, Amazonbot. This is a policy gap, not a defect. Note that Google-Extended and Applebot-Extended are robots.txt tokens, not separate fetchers, and Perplexity-User is documented by Perplexity as ignoring robots.txt for user-initiated fetches.
- `Host:` is a Yandex-only directive; harmless.
- The site deliberately allows training crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended). That is a choice, flagged so it is a conscious one.

---

## 4. Sitemap (715 URLs) and lastmod

```
$ curl -sS https://www.shilikajain.com/sitemap.xml   # 218,137 bytes, 3.1 s, 715 <url>, 882 xhtml:link, 325 <lastmod>
```

Composition: blog 299 (+ `/blog`), playbook 122 (+ `/playbook`), pages 106 (+ `/pages`), tools 31 (+ `/tools`), compare 10 (+ `/compare`), services 8 (+ `/services`), work 6 (+ `/work`), glossary 5 (+ `/glossary`), 6 regional desks, 105 locale URLs (21 x 5), plus about, speaker, testimonials, press, faq, contact, resources, authors, home. No duplicates. Single file, well under the 50,000 URL limit.

**Status check of every URL (not a 40-URL sample):**
```
$ cat locs.txt | xargs -P 6 -I{} curl -sS -o /dev/null -A "$UA" -w '%{http_code} ... {}\n' {}
715 200      # 0 redirects, 0 4xx, 0 5xx; includes all 8 service pages and all 6 regional pages
```

**Per-page tags (fetched all 715 HTML pages, `allpages_meta.json`):**
- canonical present exactly once on 715/715 and equal to the sitemap `<loc>` on 715/715 (home canonical has no trailing slash, equivalent).
- robots meta `index, follow` on 715/715; no `x-robots-tag` on any.
- Duplicate titles 0, duplicate descriptions 0. Every non-blog page has exactly one H1. All 311 blog URLs (300 English + 11 localized) have **two** H1s (the template H1 plus the markdown `# Title` repeated inside `.prose-shilika`), a minor structural duplicate.
- Thin pages (<300 visible words): `/press` 192, `/contact` 203, and the localized contact pages (117 to 222), plus 6 localized playbook/blog/services pages (203 to 291). Mostly short by design.

**Internal link graph (crawled all 715 pages):** 1,031 unique internal hrefs. 315 are not sitemap URLs: 299 are `/blog/<slug>.md` links and 16 are PDFs/XLSX/JPG under `/resources` and `/assets`; all 315 return 200. Zero broken internal links. Every sitemap URL has at least 1 inbound internal link; lowest is `/tools/qr-code-generator` with 1. The 106 `/pages/*` landing pages are linked from the `/pages` hub (which is in every footer) and from each other, but not from services, playbooks or the homepage (0 `/pages/*` links on `/`, `/services`, `/playbook`), so they sit at click depth 2 with thin internal authority.

**lastmod plausibility:**

| Group | URLs with lastmod | Values | Verdict |
|---|---|---|---|
| Blog posts | 299 of 299 | ISO timestamps. 100 posts at 2026-10-01T07:40:36 to 07:41:33Z (2 minutes), 119 posts on 2026-10-15 (11:27 to 11:28Z cluster of 102, rest 03:39Z), 6 on 05-28, 6 on 06-06, 68 across 06-18 to 06-21 | Technically honest: lastmod equals `published_at` for 297 of 299 (frontmatter `date` compared). It is not faked, but see the bulk-publishing risk in section 9. |
| Compare | 11 of 11 | 2026-10-15 | Plausible (pages created that day). |
| Services | 5 of 9 | 2026-09-21 to 2026-09-28 | Plausible. `/services/apac-pr`, `/services/web3-pr-campaigns`, `/services/kol-marketing`, `/services` have none (omitted by design). |
| Regional | 6 of 6 | `/apac` 2026-10-12, `/india` 09-03, `/singapore` 09-06, `/dubai-mena` 09-02, `/korea` 09-04, `/japan` 09-29 | Plausible but stale on live (local uncommitted edits would move `/singapore` to 10-15 and `/services/apac-pr` to 10-14). |
| Playbooks | 4 of 123 | 07-29, 09-01, 10-12 | Fine; 119 omit lastmod rather than fake it. |
| `/pages/*` (106), tools, glossary, locale pages (105), home, about | 0 | - | Omitted by design. 390 of 715 URLs carry no lastmod, so Google and Bing get no freshness signal for the playbooks, landing pages and locale pages. |

No future-dated lastmod. Blog URL set in the sitemap equals the llms.txt blog list (299).

---

## 5. llms.txt, llms-full.txt, markdown twins

```
$ curl -sS https://www.shilikajain.com/llms.txt       # 200, 162,869 bytes (46.7 KB brotli), 745 lines, text/markdown
$ curl -sS https://www.shilikajain.com/llms-full.txt  # 200, 3,738,524 bytes (1.30 MB brotli), ~934k tokens at chars/4
```

llms.txt structure (headings in order): Core pages, Service pages, Case studies, Playbooks, Regional desks, Glossary, Services, Key facts, Author, How to cite, **Last updated (2026-08-29)**, Recent playbooks (dynamic), Free tools, **Last updated (2026-10-15)**.

Defects:
1. **Duplicate and contradictory "Last updated".** The static intro says 2026-08-29; the route appends `new Date().toISOString().slice(0, 10)` (request date, cached up to 1 h), so the second date is always "today" regardless of real edits. This is the same fake-freshness pattern the sitemap code comment rejects.
2. **Coverage is lopsided.** 670 unique own-site URLs: 300 `/blog`, 299 `/api/markdown/blog`, 28 `/tools`, only **15 of 123 `/playbook`**, **0 of 106 `/pages/*`**, 0 compare, 0 locale pages, 8 services, 6 work, 5 glossary, 6 regional. Compared to the sitemap, 108 playbooks, 107 landing pages, 11 compare pages and 105 locale URLs are missing from llms.txt. The ~300 auto-generated blog entries (each with a markdown alternate line) make up about 75% of the file while the money pages get single entries.
3. **Size.** 162 KB is far beyond the "concise curated map" intent of the llms.txt convention; a model that reads the first N KB sees the intro and core pages and truncates before the free tools and most posts.
4. **llms-full.txt is 3.74 MB and contains only the 299 blog bodies** (299 `Source:` lines, all `/blog/`), under a heading that says "Full playbooks (verbatim markdown)". It contains none of the 122 playbook bodies, service pages, regional desks, compare or landing pages (they live in `app/_partials/*.html`, not in Supabase). Post-body `##` headings collide with the file's own section headings. At ~934k tokens it cannot be ingested whole by any current fetcher.
5. 65 em dashes and 9 en dashes remain in the llms.txt text (cosmetic; the repo already did one dash-cleanup commit).
6. Content-Type `text/markdown` makes Chrome download the file instead of displaying it; many sites use `text/plain` for llms.txt for easier human checking (low).

What works: all 72 non-blog URLs listed in llms.txt return 200; all 299 listed markdown alternates return 200 `text/markdown; charset=utf-8` with `Link: <canonical>; rel="canonical"`; blog HTML advertises `<link rel="alternate" type="text/markdown" href=".../blog/<slug>.md">` (only 3 blog URLs carry hreflang alternates).

**Markdown twins exist for blog only.**
```
404 /api/markdown/playbook/fractional-vs-agency
404 /playbook/fractional-vs-agency.md
404 /services/apac-pr.md
404 /api/markdown/services/apac-pr
404 /about.md  /index.md
Accept: text/markdown on /playbook/..., /blog/..., /services/... -> still text/html
```
The ~122 playbooks, 9 service pages, 6 regional desks and 106 landing pages (the pages the GEO pass was meant to get cited) have no machine-friendly alternate and no `<link rel="alternate" type="text/markdown">`. Also no RSS/Atom feed (`/rss.xml`, `/feed.xml`, `/feed`, `/atom.xml`, `/blog/rss.xml` all 404) and `/favicon.ico`, `/apple-touch-icon.png`, `/manifest.webmanifest` 404 (favicon is a `data:` URI in `app/layout.tsx`, which Google's favicon fetcher does not support).

---

## 6. Bot user-agent matrix

17 user agents x 9 URLs = 153 requests, all against `https://www.shilikajain.com`. UAs: browser (Chrome 130 on macOS), GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, Claude-SearchBot, Claude-User, Google-Extended, Googlebot, Bingbot, Applebot-Extended, CCBot, Bytespider, plus curl and python-requests defaults. UA strings are in `raw/uas.tsv`, script is `audit/uatest.sh`.

```
status codes: Counter({'200': 153})   # no 403, 429, 5xx, challenge or interstitial
```

| URL | browser bytes | bot bytes (all 16 other UAs) | md5 identical across UAs |
|---|---|---|---|
| / | 218,924 | 218,924 | yes |
| /services/apac-pr | 160,518 | 160,518 | yes |
| /playbook/fractional-vs-agency | 108,461 | 108,461 | yes |
| /blog/analyst-relations-101-startups | 94,747 | 94,747 (94,419 for Google-Extended, Bingbot, Applebot-Extended) | no, 2 variants (see below) |
| /api/markdown/blog/analyst-relations-101-startups | 14,552 | 14,552 | yes |
| /robots.txt | 1,224 | 1,224 | yes |
| /llms.txt | 162,869 | 162,869 | yes |
| /sitemap.xml | 218,137 | 218,137 | yes |
| /zh/about | 106,693 | 106,693 | yes |

The only blog variance is Next.js streaming markup (`<div hidden><!--$--><!--/$--></div>` and RSC boundary indices differ because Next serves a non-streamed shell to bot-like UAs). A character diff confirmed no content cloaking. No differing robots rules (robots.txt identical for every UA). Rate limiting: the 715-URL crawl ran at 6 parallel with zero 429s, and a 40-request burst at 10 parallel to `/about` and `/pages/web3-pr-agency` returned 80 of 80 200s.

Caveats (unverified): spoofed UAs from one non-verified IP cannot exercise reverse-DNS or IP-range verified bot allow/deny rules (for example a Vercel Firewall "verified bot" rule). There is no `x-vercel-mitigated` header on any response and no UA-triggered difference, so no UA-based block exists, but whether the real GPTBot/ClaudeBot ranges are served identically is unverified. Real bot hit logs were not available.

**JS-only content check.** Server HTML contains the full copy: raw-HTML visible words are 3,018 (home), 4,673 (`/services/apac-pr`), 2,736 (`/playbook/fractional-vs-agency`), 2,775 (blog post), 3,078 (`/singapore`), 2,597 (`/about`), with 9 to 13 H2s each. Copy is not JS-gated. **Structured data is.**

```
# survey of 36 page types, raw server HTML, regex for real <script ... ld+json> tags
/ , /about, /services/apac-pr, /playbook/*, /blog, /blog/<slug>, /pages/*, /compare/*, /tools/*, /glossary/*, /authors/..., /zh, /ja/services ...
real_script_tags = 0 on all 36
```
How it is delivered: homepage and blog posts via `next/script` default strategy, which exists only inside the `self.__next_f.push(...)` RSC flight payload; service, playbook, regional pages via `strategy="beforeInteractive"`, which Next emits as `(self.__next_s=self.__next_s||[]).push([0,{"type":"application/ld+json","children":"..."}])`, i.e. an inline bootstrap that creates the tag at runtime. In source, 263 `page.tsx` files reference `application/ld+json` and none use a plain `<script>` tag (`app/services/apac-pr/page.tsx` is representative).

Browser verification (real Chrome pane): after load, `/services/apac-pr` has 1 ld+json element with `Service, BreadcrumbList, FAQPage`; `/zh/about` has 1 element, type `WebPage` only, but raw HTML fetched in the same session has 0 tags. So Google (which renders) is fine; any crawler that reads raw HTML will see zero schema on every page. `/faq` uses microdata (23 `itemtype`) in the body, which is in raw HTML; `/services`, `/contact`, `/press`, `/work` have no structured data at all (no `*-jsonld.json` partial exists for them).

---

## 7. Locales added 2026-10-13 (zh, ko, ja, es, ru)

URL structure: `/{locale}` and `/{locale}/{english-path}`, 21 translated pages per locale (home, about, services, contact, 6 regional desks, 8 playbooks, 3 blog posts) = 105 URLs. `dynamicParams = false`, statically generated; untranslated paths 404 with `noindex` (`/zh/services/apac-pr`, `/zh/playbook/tier-1-pr-trap`, `/fr/about` all return 404 with `<meta name="robots" content="noindex">`).

Check run on 21 source paths x 6 languages = 126 URLs (`raw/locale_check.json`):
```
pages checked 126
problems 0
```
Verified on every one: HTTP 200; exactly one canonical equal to the page's own URL; exactly 7 `<link rel="alternate" hreflang>` entries (en, zh-Hans, ko, ja, es, ru, x-default); the hreflang set is identical across all 6 language variants of a path (reciprocal and self-referencing); `robots` = `index, follow`; localized, unique `<title>` and meta description in the target language; `og:locale` set (zh_CN, ko_KR, ja_JP, es_ES, ru_RU). The same 7-entry hreflang set is also emitted in `sitemap.xml` for each of the 126 URLs, and the 105 locale URLs are all in the sitemap. Body text is genuinely translated (for example `/ja/about` 5,695 native-script characters of 11,197 visible; `/ru/about` 10,207 of 17,990, remainder are proper nouns and brand names). Translation quality itself is unverified (machine translation).

Language switcher: present on every English and translated page, as server-rendered `<details><ul><li><a href="/zh/about" hreflang="zh-Hans" lang="zh-Hans">` with no JS needed. Crawlable. On English-only pages (for example `/services/apac-pr`, `/pages/*`, `/blog`) the switcher links to the locale **homepage** (`/zh`, `/ko`, ...) while still carrying `hreflang`/`lang` attributes, which semantically asserts a translation that is not the same page (low).

Defects:
1. **`<html lang="en">` in raw HTML on all 105 translated pages.** `app/[locale]/layout.tsx` wraps content in `<div lang="zh-Hans">` and an inline script sets `document.documentElement.lang` after parse. Rendered DOM shows `zh-Hans` (verified in the browser pane), raw HTML shows `en`. No `Content-Language` header or meta. Google detects language from content and hreflang, but crawlers that read raw HTML (and Bing's documented use of the lang attribute and Content-Language) get a contradictory signal. Impact unverified.
2. **Translated pages carry only a thin `WebPage` JSON-LD, delivered by `next/script` (JS-only).** English `/about` has `ProfilePage + Person + FAQPage`; `/zh/about` has a single `WebPage` with `inLanguage`, no Person, no FAQ, no sameAs. So the translated pages lose the entity and FAQ signals the English page has, and even the thin block is invisible to non-rendering crawlers.
3. Translated pages exist for 21 pages only; 122 playbooks (8 translated), 106 landing pages and compare pages remain English-only. This is fine for crawling (hreflang only on real pairs) but means locale coverage of the GEO surface is small.
4. Localized pages are not in llms.txt and have no markdown alternate.
5. Localized contact pages are thin (117 to 222 words).

---

## 8. Page weight and speed (sitemap sweep, 6 parallel)

| Group | n | median total time | p95 | max | HTML size |
|---|---|---|---|---|---|
| Static/ISR pages (home, services, playbooks, pages, tools, compare, locales) | 414 | 0.41 s | 0.53 s | 1.02 s | 31 KB to 366 KB |
| Blog posts | 299 | 1.44 s | 2.11 s | 5.80 s | 43 KB to 80 KB |
| `/blog` index | 1 | 3.9 s | - | - | 738 KB (all 300 posts on one page, no pagination) |
| `/authors/shilika-jain` | 1 | 3.7 s | - | - | 388 KB |
| `/sitemap.xml` | 1 | 2.2 to 3.5 s on every request | - | - | 218 KB |

Real-time AI fetchers (ChatGPT-User, Claude-User, Perplexity-User) typically have short timeouts; their actual limits are not published and were not tested, so whether a 1.3 to 2.5 s TTFB on blog URLs loses any fetch is unverified. It is, however, 3 to 10 times slower than every other page type and has no CDN protection if Supabase is slow.

---

## 9. Risks and open questions

- **Bulk publishing.** 219 of 299 blog posts (73%) were published in two bursts: 100 posts in about 60 seconds on 2026-10-01 and 119 on 2026-10-15 (102 in one minute). Cron routes `daily-writer-10x`, `hourly-publisher`, `queue-filler` exist. Whether Google or Bing indexed or throttled these is unverified (no GSC). Mass-produced content at that cadence is the pattern search engines treat as scaled content; consider staggering.
- **Supabase failure mode.** `sitemap.ts` catches errors and silently drops all 299 blog URLs; `/blog` renders an empty list with HTTP 200 (and is no-store, so it is not masked by cache); `llms.txt` drops the dynamic section; `/blog/<slug>` would 500. Because none of it is cached, a database blip during a crawl is exposed directly.
- **Uncommitted work is not live.** 34 modified files (APAC and Singapore refresh runs 87 and 88, zh/ko/ja/es/ru `home|services|singapore` catalogue updates, sitemap lastmod bumps) have not been deployed. Live `/singapore` still shows the old "Token2049 Marina Bay Oct 2026" description and lastmod 2026-09-06.
- **IP-verified bot rules untested** (spoofed UA from one IP) and **no server logs or GSC**, so actual GPTBot / OAI-SearchBot / ClaudeBot / PerplexityBot crawl activity and indexed-page counts are unverified.
- **Fake freshness in llms.txt** (request-date as "Last updated") can be discounted by consumers that compare it to real edit dates.
- **Machine translation** is indexable and in the sitemap (105 URLs); quality and any duplicate-content treatment by Google are unverified.
- **Policy gap:** robots.txt explicitly allows training crawlers; no explicit stance on Bytespider, Applebot-Extended, Meta-ExternalAgent, Amazonbot.

---

## 10. Recommendations (ordered by impact over effort)

1. **Emit JSON-LD as a plain server-rendered tag** (`<script type="application/ld+json" dangerouslySetInnerHTML={{__html: ...}} />`, not `next/script`) in all ~263 `page.tsx` files, `app/page.tsx`, `app/blog/[slug]/page.tsx` and `app/[locale]/[[...path]]/page.tsx`; scriptable codemod. Add Person/FAQ-level JSON-LD to the translated pages. Verify with `curl -s URL | grep -c 'application/ld+json"'` (should be at least 1 per page). Owner: code. Effort: medium.
2. **Make the blog cacheable.** Swap the cookie-based Supabase client for a cookie-free anon client (`createClient(URL, PUBLISHABLE_KEY)`) in `lib/blog.ts` read functions (public rows under RLS), add `generateStaticParams` to `app/blog/[slug]/page.tsx`, and give `sitemap.ts` a lightweight `select('slug, updated_at')` (the unused `listAllPublishedSlugs` shape). Target: HIT with `s-maxage`, TTFB under 0.3 s. Owner: code. Effort: small to medium.
3. **Set the apex to www redirect to 308** and keep it a single hop from `http://shilikajain.com`. Owner: SJ (Vercel Domains). Effort: small.
4. **Rebuild llms.txt** as a curated file under about 30 KB: all service, regional, compare, tools hub, `/pages` hub and about/speaker/author pages; the 20 to 30 pillar playbooks; locale roots; drop the 299-post dump (move it to a `/llms-blog.txt` or keep it only in llms-full). Remove the duplicate "Last updated" and use a real build or content date. Owner: code. Effort: medium.
5. **Extend markdown twins** beyond the blog: generate `.md` for playbooks, services, regional desks and landing pages from the same `_partials` (strip HTML to markdown), add `<link rel="alternate" type="text/markdown">`, and rebuild llms-full.txt from those (in chunks) instead of 299 posts. Owner: code. Effort: medium to large.
6. **Fix locale `<html lang>`** at the server: restructure with route groups so `[locale]` has its own root layout that sets `<html lang>`, or at minimum add `Content-Language` headers via `next.config.ts` for `/zh|ko|ja|es|ru`. Owner: code. Effort: medium.
7. **Stagger blog publishing** (for example 2 to 5 per day), then check GSC Pages report for "Crawled, currently not indexed" on the two bursts. Owner: SJ. Effort: small.
8. **Add measurement:** connect Search Console, enable Vercel log access to count real GPTBot / OAI-SearchBot / ClaudeBot / PerplexityBot / Googlebot hits and 4xx/5xx by bot, and re-run this audit script weekly (status, raw-HTML JSON-LD presence, TTFB). Also add `/favicon.ico`, an RSS feed, and commit/deploy the 34 pending files. Owner: measurement.

---

## Appendix: key commands run

```bash
# redirects
curl -sS -o /dev/null -w 'code=%{http_code} redirect=%{redirect_url}\n' http://shilikajain.com/ https://shilikajain.com/ ...
curl -sSIL http://shilikajain.com/services/apac-pr            # hops=2 (308 then 307)

# core files, headers
curl -sS -D - -o /dev/null -A "$UA" https://www.shilikajain.com/{robots.txt,sitemap.xml,llms.txt,llms-full.txt}

# whole sitemap
grep -o '<loc>[^<]*</loc>' sitemap.xml | sed 's/<[^>]*>//g' > locs.txt          # 715
cat locs.txt | xargs -P 6 -I{} curl -sS -o /dev/null -A "$UA" -w '%{http_code} %{size_download} %{time_total} {}\n' {}   # 715 x 200

# bot matrix
bash audit/uatest.sh        # 17 UAs x 9 paths -> raw/ua_results.tsv, all 200, md5 compared

# JSON-LD delivery
python3 -I (36 page types, regex for real <script ... ld+json> in raw HTML) -> 0 on all
Browser pane: document.querySelectorAll('script[type="application/ld+json"]') -> 1 after JS; raw fetch -> 0
```
