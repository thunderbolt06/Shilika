# Performance, rendering and indexation audit: shilikajain.com

Date: 2026-10-15. Scope: server-rendered HTML, speed and page weight, indexation, site hygiene, cron/freshness automation.
Ahrefs API and Google Search Console were not used (unavailable). Nothing inside the project directory was modified.

## 0. Bottom line (score 6 / 10)

| Area | Score | One-line verdict |
|---|---|---|
| Server-side rendering of content | 8.5/10 | All 400 real pages return 200, one H1, canonical = sitemap URL, median 1,834 words in raw HTML. FAQ answers, tables, prices and links are all in server HTML. |
| Structured data delivery | 3/10 | Zero real `<script type="application/ld+json">` tags in server HTML on 400/400 pages. JSON-LD is injected by JavaScript (Next `<Script>`). Non-JS crawlers (most AI crawlers) never see the schema as schema. |
| Performance, content pages | 8.5/10 | Lab mobile Lighthouse 93-99, LCP 2.0-2.6 s, TBT under 65 ms, about 650-680 KB. |
| Performance, home page and locales | 4.5/10 | Home mobile lab score 72 with a 23 s simulated LCP driven by the 7.5 MB autoplay reel plus about 2.7 MB of Calendly assets loaded on page load. /ko mobile scores 57 (FCP 8.1 s) because of a render-blocking CJK font stylesheet. |
| Hygiene (HTTPS, canonical, 404, noindex) | 8/10 | Hard 404s, 308 trailing-slash redirects, no noindex leaks, canonical correct everywhere. Minor: apex to www is a 307, 67% of titles exceed 60 characters. |
| Indexation evidence | 5/10 (low confidence) | Home, 4/8 service pages, 40+ playbooks, blog posts and a few landing pages appear in search results. Zero evidence yet for /compare and all five locales (deployed 2 days ago). Index size cannot be measured without GSC. |
| Freshness automation | 3/10 | All 8 Vercel crons paused since 2026-09-25 (commit 6344f75). Blog lastmod values cluster on two bulk-edit dates. Stale visible dates on the home page. |

The single most important unknown: every non-browser request from this machine (including robots.txt, sitemap.xml and llms.txt) receives a Vercel Security Checkpoint (HTTP 403, `x-vercel-mitigated: challenge`). Whether Googlebot, GPTBot, ClaudeBot, PerplexityBot and others are exempt is unverified. See section 1.2 and 6.

## 1. Method, constraints and honesty notes

### 1.1 What was measured, and where

1. Live site, from this machine with plain `curl`: blocked by the Vercel checkpoint (below).
2. Live site, through the WebFetch tool (a different network path, which does receive real pages) and WebSearch: used for live content, sitemap, robots.txt, llms.txt, 404 behaviour and indexation sampling.
3. Production build of the current working tree: I copied the project (no `.env*`, no `.git`, `node_modules` symlinked) to `scratchpad/build-copy`, ran `next build` and `next start -p 3999` there, and measured that. This gives real server HTML, real bundle sizes and a real Lighthouse run. Caveats: (a) the working tree has 34 uncommitted modified files plus 2 untracked, so it can differ from what is deployed; (b) Supabase was replaced by a local mock returning empty sets, so blog posts, the author page and the 15 locale-blog URLs 404 locally (these 16 are artifacts of my mock, not site defects); (c) local serving has no CDN, so TTFB is unrepresentative; Lighthouse used its simulated mobile throttling (1.6 Mbps, 150 ms RTT, 4x CPU) so the byte weights and render paths are what matter.
4. PageSpeed Insights API: blocked (section 3.1). Lighthouse 12.8.2, already cached on this machine in `~/.npm/_npx/0f94ee7615faf582`, was run locally instead (no download). It is the same engine PSI uses.

### 1.2 The Vercel Security Checkpoint on live

```
$ curl -sS -o /dev/null -D - https://www.shilikajain.com/
HTTP/2 403
cache-control: private, no-store, max-age=0
content-type: text/html; charset=utf-8
server: Vercel
x-vercel-challenge-token: 2.1792066262.60....
x-vercel-mitigated: challenge
```

The body is a page titled "Vercel Security Checkpoint". The same happened for `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/services`, `/playbook`, `/favicon.ico` (all 403, about 34 KB challenge body) with the default curl user agent from this host. I did not try to defeat the challenge (no spoofed user agents, no token solving) because that would be bypassing bot detection. Instead, WebFetch and WebSearch (which reach the real pages) were used.

What this proves: Vercel Attack Challenge Mode or a Firewall/Bot Protection rule is active for unverified non-browser traffic. What it does NOT prove: that Google or AI crawlers are challenged. Vercel normally exempts verified bots, but "verified" lists change and a custom rule can override. This needs a 2-minute check by the owner (see recommendations).

### 1.3 Things I could not verify

- Live raw HTML (so JSON-LD location on live is inferred from the identical code path, plus WebFetch not surfacing any schema text).
- Live response headers on a 200 page (HSTS on www, X-Robots-Tag, cache headers).
- Google index counts, Core Web Vitals field data (CrUX), crawl stats.
- WebSearch is not Google. It ignores the `site:` operator (three `site:shilikajain.com...` queries returned unrelated sites). I used domain-filtered searches (`allowed_domains`) instead. The shared WebSearch budget ran out after 11 effective queries, so the indexation sample is small.

## 2. Rendering (no JavaScript)

### 2.1 Result on a production build of the working tree (16 pages fetched with plain curl, saved to `scratchpad/audit/raw/html/`)

| Page | HTML bytes | Words in HTML | H1 | H2 | Canonical OK | FAQ details | Real JSON-LD tags |
|---|---|---|---|---|---|---|---|
| / | 219,034 | 3,032 | 1 | 11 | yes | 1 | 0 |
| /services | 38,030 | 665 | 1 | 0 | yes | 1 | 0 (none at all, even JS-injected) |
| /services/ai-startup-pr | 116,346 | 2,797 | 1 | 10 | yes | 1 | 0 |
| /services/apac-pr | 162,828 | 4,856 | 1 | 13 | yes | 1 | 0 |
| /services/cybersecurity-pr | 127,376 | 3,492 | 1 | 12 | yes | 1 | 0 |
| /playbook/crypto-pr-cost-2026 | 155,481 | 4,641 | 1 | 14 | yes | 1 (6 tables) | 0 |
| /playbook/how-to-build-ai-search-visibility-geo-2026 | 122,492 | 3,691 | 1 | 8 | yes | 1 | 0 |
| /playbook/zk-proof-pr-2026 | 103,492 | 2,666 | 1 | 9 | yes | 1 | 0 |
| /pages/web3-pr-agency | 107,799 | 1,528 | 1 | 9 | yes | 6 | 0 |
| /compare, /compare/shilika-jain-vs-coinbound | 86,403 / 73,886 | 1,943 / 1,715 | 1 | 5 / 8 | yes | 6 / 5 | 0 |
| /ko, /zh/playbook/crypto-pr-cost-2026 | 202,948 / 126,974 | 2,598 / 1,438 | 1 | 11 / 14 | yes | | 0 |
| /tools/press-release-generator, /singapore, /glossary/... | 47,428 / 125,121 / 43,173 | 1,414 / 3,287 / 799 | 1 | | yes | | 0 |

Across the full crawl of all 416 sitemap URLs on the local build: 400 return 200, each with exactly 1 H1, `index, follow`, and a canonical equal to the sitemap URL. The 16 non-200 are the mock-Supabase artifacts noted above.

Live confirmation via WebFetch (a non-JS fetch that converts HTML to markdown) of three live pages: `/services/apac-pr`, `/playbook/zk-proof-pr-2026`, `/playbook/crypto-pr-cost-2026` all returned the real H1, the FAQ questions (13, 5 and 13 respectively), pricing numbers, and body links (/korea, /japan, /singapore, /dubai-mena, /india, /work/*). The home page returned the H1 "Web3 PR & AI PR that lands Tier-1 headlines.", nav links and the language switcher (/zh /ko /ja /es /ru).

Verdict: content, headings, tables, FAQ text and internal links are in server HTML. Good.

### 2.2 Structured data is NOT in the server HTML (high severity for an AI-SEO project)

```
$ grep -c '<script[^>]*application/ld+json' home.html pb-cost.html ...   # 16 files
0 in every file
```

What the HTML actually contains:

- Home (`app/page.tsx` lines 60-64): `<Script id="homepage-jsonld" type="application/ld+json" dangerouslySetInnerHTML=...>`. With the default `afterInteractive` strategy, Next renders nothing on the server. The JSON only exists inside the RSC flight payload (`self.__next_f.push`).
- Playbooks (for example `app/playbook/crypto-pr-cost-2026/page.tsx` line 43): same component with `strategy="beforeInteractive"`. In the App Router outside the root layout this becomes `<script>(self.__next_s=self.__next_s||[]).push([0,{"type":"application/ld+json","children":"{...}"}])</script>`, again a JavaScript call that builds the tag in the browser.
- Browser check on the local build (home page after hydration): `document.querySelectorAll('script[type="application/ld+json"]').length` returned 1 (0 in server HTML).
- Coverage once JS runs: 395 of 400 pages carry JSON-LD, 298 carry FAQPage, 305 BreadcrumbList, 303 Person, 122 BlogPosting, 115 Service. Only /services, /work, /press, /faq, /contact have none at all.
- 266 JSON-LD injection sites exist in `app`, `components`, `lib` (mostly one per playbook page), so this is systematic, not a one-off.

Consequences:
- Googlebot renders JavaScript, so Google will most likely pick the schema up after rendering (inference, unverified without Search Console's rich results report).
- Crawlers that fetch raw HTML only cannot read it. Third-party studies (for example Vercel and MERJ, Dec 2024) report that OpenAI and Anthropic crawlers do not execute JavaScript; I did not re-verify that. The same applies to non-JS site auditors and to the tool WebFetch (it reported "no JSON-LD visible" on every page above, which is consistent but not proof, because markdown conversion may strip scripts).
- Google restricted FAQ rich results to a few site types in 2023 (general knowledge, not re-verified), so FAQPage schema earns no SERP feature here. Its remaining value is machine readability for AI systems, which is exactly what the JS injection undermines.

Fix (code, small): render JSON-LD as a plain server element, `<script type="application/ld+json" dangerouslySetInnerHTML={{__html: json}} />` (not `next/script`), in every page.tsx that currently uses `<Script type="application/ld+json">`. This one change moves schema into raw HTML on about 395 pages.

### 2.3 Other rendering notes

- HTML duplication: on the home page 138,115 bytes of the 219,034-byte document (63%) is the RSC flight payload, because the whole partial is injected with `dangerouslySetInnerHTML` and then serialised again for hydration. Transfer is still small (gzip 45,367 B, brotli 27,243 B), but parse cost and raw size are inflated. Median server HTML across 400 pages is 111 KB, max 365 KB.
- `<html lang="en">` on translated pages: `app/layout.tsx` hard-codes `lang="en"`; `app/[locale]/layout.tsx` sets `lang` on a wrapper div and rewrites `document.documentElement.lang` via an inline script. Server HTML for /ko, /zh, /ja, /es, /ru therefore says `lang="en"` on the root element. Low severity (hreflang and canonical are correct, 7 hreflang links on every translated page), but non-JS parsers see the wrong language.
- Intro deck gating: the home page opens on a 6-card full-screen intro ("I'm Shilika Jain", "01 / 06", "Scroll or tap to continue"). The real H1 and copy are in the DOM behind it, so crawlers are unaffected, but real visitors must click through before reading the page, which is a bounce and engagement risk (unmeasured).
- The 5 translated locales are static (`generateStaticParams`, 105 URLs). They are machine-translated per the commit log (e0c3828), which is a content-quality and duplication risk but outside this audit.

## 3. Performance

### 3.1 PageSpeed Insights API: blocked

```
$ curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https%3A%2F%2Fwww.shilikajain.com%2F&strategy=mobile&category=performance&category=seo&category=accessibility"
HTTP 429  RESOURCE_EXHAUSTED  "Quota exceeded for quota metric 'Queries' and limit 'Queries per day' ... consumer 'project_number:583797351490'"
quota_limit_value: "0"
```

Three retries with 20 s pauses all returned 429 with `quota_limit_value: "0"`. A daily limit of 0 on the shared unauthenticated project is permanent, not transient, so no retry strategy helps; a free API key from the owner's own Google Cloud project would fix it. Also, PSI could not reach the live site anyway if the checkpoint challenges Google's fetcher, which is another reason to check section 6.

### 3.2 Fallback: local Lighthouse 12.8.2 on a production build (simulated Moto G Power, 1.6 Mbps / 150 ms / 4x CPU; desktop preset for desktop)

Raw JSON: `scratchpad/audit/raw/lh/*.json`, summary `summary.json`. Lab numbers, not field data.

| Page | Device | Perf | SEO | A11y | FCP s | LCP s | TBT ms | CLS | Weight KB | Req |
|---|---|---|---|---|---|---|---|---|---|---|
| / | mobile | 72 | 100 | 91 | 1.80 | 23.43 | 109 | 0.070 | 6,465 | 55 |
| / | desktop | 97 | 100 | 92 | 0.60 | 0.70 | 0 | 0.094 | 6,724 | 55 |
| /services | mobile | 99 | 100 | 89 | 1.53 | 2.00 | 25 | 0.002 | 649 | 36 |
| /services | desktop | 100 | 100 | 89 | 0.52 | 0.52 | 0 | 0.007 | 648 | 36 |
| /services/ai-startup-pr | mobile | 95 | 100 | 91 | 1.67 | 2.60 | 30 | 0.071 | 670 | 37 |
| /services/ai-startup-pr | desktop | 96 | 100 | 92 | 0.61 | 0.87 | 0 | 0.111 | 670 | 37 |
| /services/apac-pr | mobile | 93 | 100 | 91 | 1.68 | 2.61 | 43 | 0.105 | 682 | 37 |
| /services/apac-pr | desktop | 99 | 100 | 92 | 0.56 | 0.56 | 0 | 0.053 | 683 | 37 |
| /playbook/crypto-pr-cost-2026 | mobile | 96 | 100 | 91 | 1.67 | 2.59 | 23 | 0.022 | 682 | 38 |
| /playbook/crypto-pr-cost-2026 | desktop | 99 | 100 | 92 | 0.57 | 0.83 | 0 | 0.022 | 683 | 38 |
| /playbook/how-to-build-ai-search-visibility-geo-2026 | mobile | 96 | 100 | 91 | 1.67 | 2.59 | 38 | 0.023 | 677 | 38 |
| /playbook/how-to-build-ai-search-visibility-geo-2026 | desktop | 95 | 100 | 92 | 0.57 | 0.83 | 0 | 0.121 | 675 | 38 |
| /pages/web3-pr-agency | mobile | 98 | 100 | 91 | 1.66 | 2.10 | 38 | 0.007 | 671 | 38 |
| /pages/web3-pr-agency | desktop | 99 | 100 | 91 | 0.55 | 0.82 | 0 | 0.011 | 672 | 39 |
| /ko | mobile | 57 | 100 | 92 | 8.07 | 12.26 | 11 | 0.000 | 7,454 | 71 |
| /ko | desktop | 87 | 100 | 92 | 0.74 | 0.77 | 0 | 0.247 | 7,131 | 71 |
| /compare/shilika-jain-vs-coinbound | mobile | 98 | 100 | 92 | 1.68 | 2.11 | 61 | 0.040 | 668 | 39 |
| /compare/shilika-jain-vs-coinbound | desktop | 99 | 100 | 92 | 0.82 | 0.82 | 0 | 0.013 | 668 | 39 |

INP cannot be measured in the lab; TBT is the proxy: 0-61 ms on content pages, 109 ms on the home page (all under the 200 ms good band). Main-thread work on home mobile: 2.3 s total (script evaluation 579 ms, style/layout 528 ms).

Reading the table:
- Content pages (services, playbooks, landing pages, compare): healthy. Mobile LCP 2.0-2.6 s sits at the 2.5 s "good" boundary on four of them (2.59-2.61 s), so they are one small change from clean. The shared cost is about 200 KB of JS evaluated from analytics (PostHog 209 KB transfer, Google tag 170 KB), 113 KB of Google Fonts, and render-blocking Google Fonts CSS (Lighthouse estimates 750-900 ms saving on the home page).
- Layout shift: culprits are web-font swap on headlines and subtitles (for example `p.svc-sub` on /services/apac-pr, `h1.article-headline` on playbooks, hero marquee text on home and /ko). Pages sit at 0.05-0.12; /ko desktop is 0.247 (poor). Fix with `next/font` (self-hosted, `size-adjust`) instead of the Google Fonts `<link>`.
- Accessibility 89-92: `color-contrast` and `heading-order` fail on most pages. Low severity.
- SEO category 100 everywhere in the lab (title, description, canonical, crawlable links, robots OK).

### 3.3 The home page: biggest weight offenders

Lighthouse `total-byte-weight` for home mobile (the run ended before the reel finished, so the video line understates the true cost):

| Resource | Transfer KB | Notes |
|---|---|---|
| `/assets/hero-reel.mp4` | 2,369 (file is 7,531,160 B = 7.2 MB) | autoplay hero reel, `preload="auto"`, no `fetchpriority` |
| `assets.calendly.com/.../booking-cfa4554f7.js` | 1,393 | Calendly inline widget iframe |
| `assets.calendly.com/.../booking-69eea1e6b.css` | 1,277 | same |
| `js.stripe.com/v3` | 268 | pulled in by the Calendly booking app |
| Google tag (`gtag/js?id=AW-18324652879`) | 166 | |
| `/assets/hero-reel-poster.jpg` | 160 | JPEG, Lighthouse estimates 136 KB saving with WebP/AVIF and resizing |
| `assets.calendly.com/pxwebj3qd.js` | 151 | |
| PostHog `array.js` (+ recorder 66 KB, surveys 33 KB) | 104 (+99) | session recorder and surveys loaded |
| Google Fonts (19 font files on /ko, about 8 on home) | about 113 on home | three families, 11 weights requested |

Findings:

1. Hero reel (7.2 MB, 42.2 s, 720x1280 H.264 at about 1.35 Mbps, faststart OK, with audio).
   - Verified in a browser on the local build: the video request starts at about 73 ms (the same time as CSS and JS), and about 17.6 s of the 42.2 s (roughly 3.1 MB) was buffered while the tab sat idle, because `preload="auto"` plus `autoplay in view` makes the browser pull it eagerly. The wrapper sits at y=673 px on a 812 px phone, so it is nearly above the fold.
   - Lighthouse identifies the `<video class="hero-reel-video">` as the LCP element on mobile. Observed (unthrottled) LCP was about 1.87 s, almost all "element render delay" (1,844 ms); the simulated mobile LCP is 23.4 s because Lantern places the large media file on the LCP path. PSI would report this same simulated number, so the headline mobile score for the home page is 72 even though real phones may paint sooner. Treat 23 s as "what the Google score will say", and field reality as unmeasured.
   - Git history shows this was tuned and reverted on 2026-10-13: 7d3e024 "Re-encode hero reel as SDR 540p and preload it during the intro", then 6525150/8076b45 (tone change and revert), then 4f85f47 "Restore original hero reel encode". The current file is the larger original.
   - Cost model, not measurement: if the site is on Vercel Hobby (the cron commit says it is), the plan includes roughly 100 GB per month of transfer; at about 7.5 MB per full pull that is about 13,000 complete home loads before the cap. Real pulls are partial, so treat it as an upper-bound risk, and verify the plan and usage in the Vercel dashboard.
2. Calendly inline widget initialises on every home load: `homepage-body.html` line 692 has `<div class="calendly-inline-widget" id="calendly-widget">`, and `app/page.tsx` loads `assets.calendly.com/assets/external/widget.js` with `lazyOnload`. In the Lighthouse trace the iframe document is requested at 516 ms and the 2.7 MB booking bundle plus Stripe arrive between 1.2 s and 3.5 s, even though the widget is far below the fold. About 2.9 MB of third-party bytes on every home visit, and the same widget is on /contact and /ads.
3. Third parties (Lighthouse "third parties" insight, home mobile): PostHog 209 KB, Google tag 170 KB, YouTube thumbnails 140 KB, Google Fonts 113 KB, Calendly 5 KB at page level, Apollo tracker 2.8 KB, Google Ads 3 KB. Unused JavaScript: 223 KB on home and about 204 KB on every content page (mostly PostHog and the Google tag).
4. `<script src="/assets/intro-cards.js">` on the home page is a deliberate parser-blocking script (comment in `app/page.tsx`). It is only 1.4 KB brotli, so low cost.
5. Next.js JS is fine: shared First Load JS 107 kB, home 109 kB, content pages 108-117 kB. `polyfills` (35 KB brotli) is `noModule`, so modern browsers skip it.

### 3.4 Locales (/zh /ko /ja /es /ru): slow on mobile

`/ko` mobile: Perf 57, FCP 8.07 s, LCP 12.26 s, 7.4 MB, 71 requests. Cause: `app/[locale]/layout.tsx` adds `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600&display=swap" precedence="default">`, which React hoists as render-blocking. Lighthouse lists it as 46 KB of CSS with a 1,872 ms blocking penalty, leading to 19 font requests and 638 KB of fonts. The same pattern applies to zh (Noto Serif SC) and ja (Noto Serif JP), and ru (PT Serif, much lighter). It also inherits the hero reel and the Calendly widget from the home page. These are the pages meant to win Korean, Japanese and Chinese queries, so this matters.

Fixes: load the CJK font with `media="print" onload` or `next/font` with subsetting; drop the display-serif swap on CJK headlines entirely (system serif stack); and lazy-load the Calendly widget.

### 3.5 Estimated impact order (page weight, biggest first)

1. Hero reel 7.2 MB (home and the 5 locale homes)
2. Calendly booking app + Stripe about 2.9 MB (home, /contact, /ads, locale homes)
3. CJK web font CSS and fonts 638 KB (ko; zh and ja similar order)
4. PostHog (209 KB incl. recorder and surveys) and Google tag (170 KB) on every page
5. Hero poster JPEG 160 KB (WebP could save about 130 KB)

## 4. Indexation

### 4.1 What is expected: the sitemap

- Local build (no blog rows): exactly 416 URLs = 311 static (123 playbook incl. index, 107 /pages incl. index, 32 /tools, 11 /compare, 9 /services, 7 /work, 6 /glossary, 6 regional desks, plus core pages) + 105 locale URLs (5 locales x 21 pages). 861 hreflang `xhtml:link` entries, 27 `lastmod` values, no duplicates.
- Live sitemap (WebFetch, 218,137 characters, read in three chunks; counts are LLM-tallied so treat as plus or minus 5%): the 416 plus roughly 290-300 `/blog/*` posts, so about 705-715 URLs. `</urlset>` terminates correctly.
- `app/robots.ts` allows `*` and nine named AI/search bots, disallows only `/admin`, `/api/admin/*`, `/api/cron/*`. Live robots.txt (via WebFetch) matches, with a non-standard `Host:` line (ignored by crawlers, harmless).

### 4.2 What the search layer shows (WebSearch with `allowed_domains`, 11 effective queries; NOT Google, top-10 per query, so a floor on what is indexed and nothing more)

Domain-filtered results surfaced these distinct shilikajain.com URLs:

| Section | In sitemap | Distinct URLs surfaced | Examples |
|---|---|---|---|
| Home | 1 | 1 | `/` titled "Web3 PR & AI PR Consultant" |
| /services/* | 8 + index | 4 | ai-startup-pr, cybersecurity-pr, content-writing, kol-marketing (not surfaced: web3-pr-campaigns, token-launch-pr, apac-pr, founder-profiling, the index) |
| /playbook/* | 122 + index | about 42 | crypto-pr-cost-2026, how-to-pitch-cointelegraph-2026, best-web3-pr-agencies-2026, how-to-build-ai-search-visibility-geo-2026, and others |
| /pages/* | 106 + index | 4 | b2b-saas-pr-agency, korea-kol-marketing-agency, depin-marketing-agency, cybersecurity-analyst-relations-agency |
| /blog/* | about 295 | 12 | post-tge-pr-90-day-communications-plan, product-hunt-launch-checklist, others |
| Regional desks | 6 | 2 | /apac, /singapore (not surfaced: /korea /japan /india /dubai-mena) |
| /glossary | 5 + index | 3 | index, what-is-a-tge-comms-plan, what-is-aeo-answer-engine-optimization |
| /tools | 31 + index | 1 | /tools/press-release-generator |
| /work, /testimonials | 6, 1 | 1, 1 | /work/web3auth, /testimonials |
| /compare (+10 pages) | 11 | 0 | not found for an exact-title query |
| /zh /ko /ja /es /ru | 105 | 0 | not found, including Korean and Chinese queries |
| /resources, /faq, /about, /speaker, /press, /contact, /authors | 7 | 0 | not surfaced |
| Other host | n/a | `app.shilikajain.com` (AIPitchroom) | separate product site, indexed |

Interpretation, with confidence levels:
- The engine does index the core of the site: home, services, playbooks, blog and several landing pages (high confidence that these exist in this engine's index).
- /compare and the locales shipped on 2026-10-13 to 2026-10-15 (commits e0c3828, 30dd8aa). Absence two days after launch is normal and not evidence of a problem. Re-check in 2-4 weeks.
- Absence of /about, /speaker, /faq, /resources and the /tools index is more worrying because those are old (low confidence: ten results per query cannot show absence, so verify in GSC "Pages").
- Index size, coverage rate and "crawled, currently not indexed" counts are unverified; the only way to get them is Search Console (not connected). With about 105 + 123 + 107 + about 295 near-template pages sharing one author and one topic cluster, a Google "crawled, not indexed" backlog on /pages/* and later playbooks is a plausible risk but is a hypothesis.
- Internal linking is thin for the programmatic set (local crawl, distinct inbound internal pages): /pages/* median 2 inbound links (index plus one other), 117 URLs with 2 or fewer; /resources only 3; core nav pages 314-399. Landing pages are reachable but weakly linked.

### 4.3 Titles and snippets

416-URL local crawl: 280 titles (67%) exceed 60 characters (111 exceed 70, max 88), 42 descriptions exceed 160 characters, 15 are under 70. No duplicate titles or descriptions among real pages (the only duplicates are the 16 mock-404 pages). Several surfaced titles in search results are visibly truncated mid-word ("...PR: The 90-Day Communications Plan for Founders Running a"), consistent with the length finding.

## 5. Hygiene

| Check | Result | Evidence |
|---|---|---|
| HTTPS | OK | `http://shilikajain.com/` returns 308 to `https://shilikajain.com/`; `http://www.shilikajain.com/` returns 308 to https www. |
| Apex to www | Works, but the apex hop is a 307 (temporary) | `curl -D- https://shilikajain.com/` returns `HTTP/2 307`, `location: https://www.shilikajain.com/`. A 308 or 301 is the right signal for a permanent canonical host; change the redirect type in Vercel Domains. |
| HSTS | Present | `strict-transport-security: max-age=63072000` (2 years) on the apex response. No `includeSubDomains` or `preload` seen. On www 200 responses: unverified (checkpoint). |
| Soft 404 | None | Live: WebFetch of `/this-page-does-not-exist-audit-test-7731` returned "HTTP 404 Not Found". Local: bogus URLs at /, /playbook/, /pages/, /ko/ return 404 with `<meta name="robots" content="noindex">` and title "404: This page could not be found." |
| Trailing slash duplicates | Handled | Local: `/services/`, `/playbook/x/`, `/pages/x/`, `/ko/`, `/compare/` all 308 to the slashless URL. Zero internal hrefs end in a slash. `vercel.json` also redirects `/ads/` to `/ads`. Live behaviour unverified (checkpoint) but the same Next and Vercel defaults apply. |
| Query parameters | Handled | `/services?utm_source=x` returns 200 with canonical `https://www.shilikajain.com/services`. |
| Legacy URLs | Handled | `/playbook/1` and `/article-4` return 308 to the slug URLs (`next.config.ts`). |
| noindex leaks | None found | 416/416 sitemap URLs are `index, follow` with no `X-Robots-Tag`. Intentionally noindex: `/thank-you` (noindex, nofollow), `/ads` (noindex, follow), `/admin/*` (X-Robots-Tag header; the /admin/login body still says `index, follow`, header wins). |
| Canonical coverage | OK | All 400 real pages self-canonical to the www host without trailing slash. |
| Case variants | Duplicate content exists, canonicalised | Local `next start`: `/PLAYBOOK/crypto-pr-cost-2026` returned 200 with the lowercase canonical. |
| robots.txt | OK | 9 named AI/search bots allowed; sitemap declared; `/api/cron/*` disallowed. |
| llms.txt | Works but heavy and self-contradictory | Live file is 162,719 characters (about 40k tokens); the local build without blog rows is 33.7 KB. It lists every blog post twice (page + Markdown alternate). It contains two "Last updated" headings: a hard-coded `2026-08-29` in `app/_partials/llms-intro.md` line 107 and a dynamic footer set from `new Date()` at each ISR regeneration (`app/llms.txt/route.ts` line 53), i.e. always "today", which is not a real modification date. |
| Visible and schema freshness stamps | Stale on the home page | Home visible text "Updated 30 June 2026" (`homepage-body.html` line 849) and JSON-LD `dateModified: 2026-07-15`, although the page changed through October. `/playbook/crypto-pr-cost-2026` shows "Last reviewed and updated: July 30, 2026"; `/playbook/zk-proof-pr-2026` shows June 23, 2026 with no update date. |
| Sitemap lastmod | Honest for static, noisy for blog | Static and locale entries omit `lastmod` on about 390 of 416 URLs by design (comment in `app/sitemap.ts`). Blog `lastmod` comes from `updated_at`; in the part of the live sitemap I could read, roughly 219 of about 222 entries share two dates (about 100 on 2026-10-01, about 119 on 2026-10-15; counts are LLM-tallied, the clustering is clear in the first 60 entries which are all 2026-10-15). That looks like a bulk re-save, not organic editing, which weakens `lastmod` as a signal. |

Other build-quality notes seen in passing:
- `next build` fails if Supabase is unreachable: the locale route `app/[locale]/[[...path]]` fetches blog rows at build time (my first build died with "Export encountered an error on /[locale]/[[...path]]/page: /es/blog/...". The sitemap and llms.txt routes have try/catch; the locale blog pages do not. A Supabase outage during a deploy would block releases.
- `/blog` and `/blog/[slug]` are ISR (`revalidate` 600 and 3600 s) and hit Supabase on first request after expiry.
- Local-only caveat worth a one-off check on a preview deployment: on the local `next start` build, a mixed-case request (`/Services/apac-pr`) overwrote the prerendered file `.next/server/app/services/apac-pr.html` (116 KB real page replaced by a 10 KB error shell), after which the canonical lowercase URL returned 404 until rebuild. I reproduced it twice and rebuilt. I did NOT test this on production (a test could poison a live page). Vercel hosts prerender output differently, so this may not apply; mention it only as an item to verify on a Vercel preview.

## 6. Cron pause (commit 6344f75, 2026-09-25) and what it means for freshness

The commit removed the whole `crons` block from `vercel.json` with the message "Hourly crons exceed the Hobby plan limit and block every deploy". The schedules removed (from `git show 6344f75`):

| Route | Schedule (UTC) | Purpose (from route comments) |
|---|---|---|
| `/api/cron/gsc-daily-pull` | 04:00 daily | pull Search Console data into Supabase |
| `/api/cron/ga-daily-pull` | 04:30 daily | pull GA data |
| `/api/cron/queue-filler` | 01:00 on the 1st of the month | topic research (Anthropic batch) |
| `/api/cron/daily-writer` | 01:30 on the 1st of the month | submit top idea to the writer (also a `daily-writer-10x` variant that has no schedule) |
| `/api/cron/batch-poller` | 01:15 daily | finalise completed LLM batches into drafts and images |
| `/api/cron/hourly-publisher` | every hour at :00 | promote reviewed ideas to `blog_posts` and revalidate |
| `/api/cron/cross-poster` | every hour at :30 | cross-post new articles (dev.to, Hashnode) |
| `/api/cron/seo-content-analysis` | Sunday 06:00 | join GSC + GA + posts into a brief that the next queue-filler run reads |

What it means:
1. Only two jobs (hourly-publisher and cross-poster) violated the Hobby once-per-day rule, but all eight were removed. So automation that fits Hobby limits (GSC and GA pulls, weekly analysis) is also off.
2. Nothing now publishes, writes, cross-posts or learns from Search Console on its own. The feedback loop (GSC to weekly SEO brief to queue-filler topics) is broken; there is no new performance data entering Supabase.
3. The site is not frozen, though: blog `lastmod` values show bulk updates on 2026-10-01 and 2026-10-15, and recent commits (Oct 13-15) added reels, locales, compare pages and writer knowledge-base feeds. So content changes now come from manual bulk operations (admin Excel import `/admin/blog/excel`, scripts in `scripts/`, "Run now" in `/admin/cron`), not the pipeline. The uncommitted `queue-filler` change (`?focus=` parameter) fits that manual workflow.
4. Hobby limits (from Vercel documentation as I remember it; verify in the dashboard): a small number of cron jobs, minimum interval once per day, and roughly 100 GB per month of transfer. Restoring the 6 compatible schedules and moving the two hourly ones to daily (or a GitHub Actions or external scheduler that calls the routes with `Authorization: Bearer $CRON_SECRET`) would revive freshness without upgrading, subject to the job-count cap.
5. Related fragility: if `CRON_SECRET` is unset, the cron routes return 500 (`lib/cron-auth.ts`), and `/api/cron/*` is correctly disallowed in robots.txt.

## 7. Prioritised recommendations

| # | Action | Impact | Effort | Owner |
|---|---|---|---|---|
| 1 | Render JSON-LD as plain server `<script type="application/ld+json">` tags instead of `next/script` (about 395 pages, 266 call sites) | High | Small to medium (find and replace plus a shared component) | code |
| 2 | In Vercel, open Firewall / Security events, filter `mitigated: challenge` and check whether Googlebot, Bingbot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot are challenged; if Attack Challenge Mode or Bot Protection is on, exempt verified bots (or turn it off) | High (unknown, possibly critical) | Small | SJ |
| 3 | Make the hero reel opt-in: `preload="none"` (or `metadata`), load the file only after the intro and when in view, serve a smaller 540p encode (about 1.5-2 MB) with a WebP poster, add `fetchpriority` only to the poster | High | Small | code |
| 4 | Lazy-load the Calendly widget on interaction (click "Book a call") or via IntersectionObserver instead of `lazyOnload` auto-init (saves about 2.9 MB on home, /contact, /ads) | High | Small | code |
| 5 | Fix locale fonts: stop render-blocking Noto Serif KR/SC/JP CSS; use a system serif stack or `next/font` with subsets (/ko mobile 57 to 90+ expected) | High for the new locales | Small | code |
| 6 | Connect Google Search Console and submit the sitemap; check Pages, Crawl stats and Core Web Vitals (field data) to replace the estimates in this report | High | Small | SJ |
| 7 | Restore crons that fit Hobby limits (GSC pull, GA pull, weekly SEO analysis, batch-poller, queue-filler) as daily or weekly, replace the two hourly jobs with daily or an external scheduler | Medium | Small | code + SJ |
| 8 | Replace Google Fonts `<link>` with `next/font` self-hosting (fixes render-blocking CSS and CLS 0.05-0.25) | Medium | Small | code |
| 9 | Shorten titles to 60 characters or fewer (280 of 416 exceed it) and descriptions to 160 or fewer (42) | Medium | Medium (template change plus partial edits) | code |
| 10 | Make freshness signals real: update home "Updated 30 June 2026" and `dateModified 2026-07-15`, drive sitemap `lastmod` from each page's real `dateModified`, remove or fix the hard-coded `2026-08-29` and `new Date()` stamps in llms.txt, stop bulk-bumping `updated_at` | Medium | Small to medium | code + SJ |
| 11 | Raise internal links to /pages/* and /resources (median 2 and 3 inbound), for example from playbooks and a footer or hub block | Medium | Medium | code |
| 12 | Trim llms.txt (162k characters listing every post twice) to a curated index with a pointer to llms-full.txt | Low to medium | Small | code |
| 13 | Change apex to www redirect from 307 to 308 in Vercel Domains; add `includeSubDomains` only after checking the app.* subdomain is HTTPS | Low | Small | SJ |
| 14 | Guard locale blog pages against Supabase failure at build time (try/catch with fallback) | Low | Small | code |
| 15 | Get a PageSpeed API key (free, own Google Cloud project) to run the PSI measurements the quota block prevented | Low | Small | SJ |

## 8. Commands and artifacts

- Live checks: `curl -sS -o /dev/null -D - https://www.shilikajain.com/`, same for apex and http variants (output in section 1.2 and 5).
- PSI: `curl ".../pagespeedonline/v5/runPagespeed?url=...&strategy=mobile..."` returning 429 with `quota_limit_value: "0"` (3 retries, 20 s apart).
- Build: `next build` and `next start -p 3999` in `scratchpad/build-copy` with `NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54329` pointing at `scratchpad/tools/mock-supabase.mjs`. Logs: `scratchpad/audit/raw/next-build.log`, `next-build2.log`.
- Crawl: `scratchpad/tools/crawl_local.py` against 416 sitemap URLs, output `scratchpad/audit/raw/crawl.json`.
- HTML analysis: `scratchpad/tools/analyze_html.py`, output `scratchpad/audit/raw/analysis.jsonl`, saved pages in `scratchpad/audit/raw/html/`.
- Lighthouse: `node ~/.npm/_npx/0f94ee7615faf582/node_modules/lighthouse/cli/index.js http://127.0.0.1:3999<path> --form-factor=mobile|desktop --only-categories=performance,seo,accessibility`; 18 JSON reports in `scratchpad/audit/raw/lh/`, extraction script `scratchpad/tools/lh_extract.py`.
- Browser measurements (local home): video request start 73 ms, 0-17.6 s of 42.2 s buffered, 1 JSON-LD tag after hydration, 0 in server HTML.
- Source references: `app/page.tsx` lines 60-80 (JSON-LD `<Script>`, intro script, Calendly `lazyOnload`), `app/_partials/homepage-body.html` lines 108-109 (reel) and 692 (Calendly), `app/layout.tsx` (Google Fonts link, gtag, PostHog, Apollo), `app/[locale]/layout.tsx` (CJK font link, lang rewrite), `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts`, `vercel.json`, `next.config.ts`, `SETUP.md` section 7 (cron design).
- Local servers and the mock were stopped after the work; the project directory itself was not touched.
