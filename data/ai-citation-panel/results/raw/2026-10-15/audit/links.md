# Internal linking and information architecture audit - shilikajain.com

Analysis date: 2026-10-15. Re-verified in a continuation session after a usage-limit interruption. Scope: repo working tree at /Users/thunderbolt/Documents/projects/Shilika (nothing in the repo was modified), plus read-only GET requests to production for what the repo cannot show (the 299 Supabase blog posts, redirects, llms.txt). No Ahrefs, no GSC. Health score for this area: **6 / 10**.

## 0. Bottom line

- Plumbing is clean. 0 broken internal links (page bodies and all 299 blog posts), 0 hrefs to redirect sources, 0 trailing-slash hrefs, 0 redirect chains. Both big hubs (/playbook, /pages) list 100% of their children. The live sitemap equals the repo sitemap for all 416 non-blog URLs (plus 299 blog URLs live).
- The hub-and-spoke is **real in one direction only**. 108 of 122 playbooks link to at least one service page and 106 of 106 landing pages link to a service, a playbook and a case study. The return path is index-level: the 8 service pages link to only 1-7 playbooks each, the 6 regional desks link to 0 landing pages, only 5 of 122 playbooks link to a landing page, and **0 of 165 landing->playbook links are reciprocated**.
- Winning pages are not winning because of internal links (winners and non-surfacing money pages have similar non-index inbound medians, 19.5 vs 21.0). But three winners are conversion dead ends: `/playbook/crypto-pr-cost-2026` (wins A3, E2) has **0 links to any service or desk** (confirmed live and in the repo), `/playbook/how-to-pitch-cointelegraph-2026` (wins B2) has 0 service links, and the blog post that wins C2 links to no service or playbook. Worse for the regional goal: **E1 (Korea) and E2 (Japan) were won by general playbooks, not by /korea or /japan, and neither winning playbook links to any country desk.**
- Navigation is footer-dependent. The header has 6 links (Work, Services, Blog, About, Testimonials, Contact) and no Playbooks or regional link. The homepage body links to 0 hubs and 0 regional desks (all hub and desk hrefs in `homepage-body.html` sit inside its `<footer>`). Counting body links only, 106 landing pages sit at click depth 5-7 and 151 URLs are unreachable from the home page.
- The blog (299 posts, 42% of all live sitemap URLs) is barely wired in: 24% of posts link to a service page, 8% to a playbook, 0 to the /playbook hub, and the blog template has no related-service or related-playbook block.

## 1. Verification status (what was re-checked in this session)

The earlier draft of this report existed in the scratchpad. I treated it and its stored artifacts as data and re-verified the claims that matter.

| Claim | Status | Evidence |
|---|---|---|
| 0 broken body links, 0 broken blog links, 0 hrefs to redirect sources, 0 trailing slashes | Re-verified, stronger than before | script below: both lists empty; blog targets checked against the live sitemap (earlier draft left 3 translated-blog slugs "unverified") |
| Live sitemap == repo sitemap | Re-verified | live 715 locs; 416 non-blog; diff both ways empty |
| 17 redirect rules, no chains | Re-verified live | probes in 2.1 |
| Depth, zero-service playbooks (14), 0/165 reciprocation, homepage has no hub links | Re-verified from raw files and graph | grep and recompute below |
| crypto-pr-cost-2026 and how-to-pitch-cointelegraph-2026 have 0 service links | Re-verified live and in repo | live HTML parse + `grep` on article-4/13 partials |
| `/resources` has no inbound anywhere | **Corrected** | 3 inbound from the calculators' `ToolCta` (2.2) |
| "Tools get 0 content links" | **Corrected** | the 3 calculators get blog links from 38 posts; the 28 free tools get 0 (2.2) |
| 17 URLs unreachable in all-links BFS | **Clarified** | only /resources (reached via calculator CTA, depth 3), /authors/shilika-jain (linked from blog posts) and 15 localized blog URLs (toggle only) |
| Working tree vs production | Partly verified | repo has 34 modified/untracked files, none newer than the analysis output; 5 sampled pages checked live; the rest unverified against production |

## 2. Method and commands run

Stored artifacts (scratchpad `audit/`): `analyze.py`, `analyze3.py`, `graph.json` (19,433 edges: body 5,142; shell 12,006; pchrome 210; toggle 2,075), `blog_edges.json` (1,970 body links from 299 posts), `analyze2.out`, `links_recheck.py`, `live2/` (fresh live fetches).

1. **URL inventory** from `app/sitemap.ts`: 273 static paths + 28 free tools (`app/tools/_data/free/*.ts`) + 10 compare pages (`app/compare/_data/web3.ts`, `ai.ts`) + 105 localized pages (21 translated pages x 5 locales via `lib/i18n/config.ts`) = **416**. Kinds: playbook 122, landing 106, i18n 105, tool 31, other 16, compare 10, service 8, case 6, region 6, glossary 5, home 1.
2. **Source resolution**: `app/**/page.tsx` -> `app/_partials/*-body.html`; glossary from `data/glossary.ts`; tool CTAs from `app/tools/_data/free/cta.ts`; sitewide chrome from `components/site/EditorialChrome.tsx` (29 distinct internal targets, verified by counting the footer anchors on lines 203-247).
3. **Edge classes**: `body` (contextual), `pchrome` (nav/footer markup embedded inside a partial), `shell` (sitewide header/footer), `toggle` (language switch). Contextual = `body` only.
4. **Metrics**: inbound/outbound, orphans, index-only pages (inbound only from /playbook, /pages, /glossary, /tools, /compare, /blog, /resources), BFS click depth (all links vs body only), anchor stats, an internal PageRank model, blog-graph merge.
5. **Live checks (curl, 2026-10-15/16)**: sitemap.xml, llms.txt, 5 page fetches, 7 redirect probes.

Re-verification commands and key outputs from this session:

```
$ grep -c 'href="/services' article-4-body.html article-13-body.html   (via grep -oE ... | wc -l)
article-4-body.html  services=0 playbook=0 region=0
article-13-body.html services=0 playbook=3 region=0
article-2-body.html  services=0 playbook=0 region=2     # apac-pr-playbook-2026, the most-linked playbook

$ homepage-body.html hub/desk hrefs, position vs <footer> (python):  all 12 of /playbook /pages /korea /japan /india /singapore /dubai-mena /apac /glossary /tools /compare /speaker  => in_footer True

$ recompute from graph.json (body edges only)
depth ALL : x(unreachable)=17, 0:1, 1:45, 2:333, 3:20
depth BODY: x=151, 0:1, 1:28, 2:21, 3:5, 4:101, 5:6, 6:2, 7:101
landing->playbook pairs 165 reciprocated 0 ; playbook->landing playbooks 5 ; landing->region 16 ; region->landing 0
playbooks 122, with >=1 service link 108, zero 14
English sitemap URLs with zero body inbound: ['/authors/shilika-jain', '/resources', '/speaker']   (before blog merge, before ToolCta fix)

$ broken-target scan (live sitemap + known routes as the allow-list)
BODY edges to unknown targets: {}   BLOG-POST edges to unknown targets: 0
edges to a redirect source: []      trailing-slash hrefs: 0
blog posts link 79 .pdf and 13 .xlsx assets under /resources/ (assets, not pages)

$ curl live
sitemap 200 (715 locs; non-blog 416; repo-not-live [] ; live-not-repo [])
llms.txt 200 (670 shilikajain URLs: playbooks 15, /pages 0, services 8, regions 6, blog 299)
crypto-pr-cost-2026 live body-ish internal links=3 services=0 playbook=0 desks=0
how-to-pitch-cointelegraph-2026 live links=5 services=0 playbook=3
home live (header/nav/footer stripped) links=34 services=12 playbook=7 pages=0 desks=0
singapore live links=10 services=3 playbook=1 desks=5
zh/about live: self-canonical, 6 hreflang tags, 18 body links of which only 5 are /zh-prefixed
```

Caveats stated up front:
- Static HTML only. No JS-injected service links were found (earlier grep of `public/assets/*.js`), so what is parsed is what a crawler sees.
- Localized page body links are inferred from the English partial plus `localizeLinks()` in `lib/i18n/config.ts`; one live check (`/zh/about`) is consistent (mostly English targets, a few translated ones). Tool-page links come from `cta.ts` and the tool components; compare-page body links and glossary pages are partly derived.
- Click depth, inbound counts and the PageRank model are structural. There is no crawl-frequency, impression or link-equity data, so "importance" is inferred.
- Production differs from the working tree for any page touched by the 34 local edits (runs 85-88 are flagged LOCAL / UNPUSHED in `data/ai-citation-panel/summary/`).

## 3. Findings

### 3.1 Broken links, redirects, URL hygiene (healthy)

```
redirect rules: 17 (8 /article-N, 8 /playbook/N in next.config.ts, /ads/ in vercel.json). None chain, none are linked internally.
http://shilikajain.com/                    => 2 hops, final 200 https://www.shilikajain.com/   (http apex -> https apex -> https www; normal)
https://shilikajain.com/about              => 1 hop
https://www.shilikajain.com/about/         => 1 hop -> /about
https://www.shilikajain.com/article-4      => 1 hop -> /playbook/crypto-pr-cost-2026 (200)
https://www.shilikajain.com/playbook/4     => 1 hop -> same
https://www.shilikajain.com/ads/           => 1 hop -> /ads
https://www.shilikajain.com/playbook/crypto-pr-cost-2026/ => 1 hop -> no slash
app routes not in sitemap (intentional): /ads, /pitch/ai-pr, /pitch/web3-pr, /thank-you
```

Note: 143 body links point at home-page fragments (`/#contact`, `/#work`, `/#services`), 113 of them the anchor "Book a 30-min teardown ->". These are CTAs, not SEO links, and resolve to `/`. Meanwhile `/contact` (a real indexable page) has 42 distinct body sources but **0 outbound links**, and `/press` (6 sources) and `/authors/shilika-jain` also have 0 outbound.

### 3.2 Orphans and thin-inbound pages

Zero-contextual-inbound English sitemap URLs (before blog links):

| URL | Reality |
|---|---|
| `/speaker` | footer link only (EditorialChrome.tsx:208); no body link from any page |
| `/resources` | **3 inbound only**, all from the "Browse free resources" secondary CTA in `ToolCta` (`app/tools/_components/ToolSections.tsx:78`), rendered on `/tools/gtm-planner`, `/tools/marketing-budget-calculator`, `/tools/marketing-checklist`. Not in the header, footer, /tools hub or any content page. Earlier draft said "no inbound anywhere"; that was wrong |
| `/authors/shilika-jain` | no body inbound in the repo graph; linked from every blog post (author byline), so reachable |

Index-only pages (inbound only from /playbook, /pages, /glossary, /tools, /compare, /blog, /resources):

| Group | Before blog | After merging blog links |
|---|---|---|
| Landing pages | 46 | 35 |
| Playbooks | 15 | 11 |
| Free tools | 28 (+3 calculators) | 28 (the 3 calculators are rescued: gtm-planner 21 posts, marketing-budget-calculator 20, marketing-checklist 8) |
| Glossary | 2 | 2 (`what-is-a-kol-wave`, `what-is-aeo-answer-engine-optimization`) |
| Other | 1 | 3 (`/glossary` hub, `/resources`, `/speaker`) |
| **English total** | 95 | **79** |

The 11 playbooks still index-only after blog links: `ai-x-crypto-agent-pr-2026`, `best-crypto-press-release-services-2026`, `best-founder-personal-branding-agencies-2026`, `best-nft-news-outlets-to-pitch-2026`, `crypto-sustainability-esg-pr-2026`, `free-token-listing-press-sites-2026`, `how-to-get-bloomberg-crypto-coverage-2026`, `how-to-get-covered-the-block-blockworks-2026`, `how-to-get-covered-the-information-2026`, `token-launch-pr-mistakes-2026`, `zk-proof-pr-2026`.

The 28 index-only tools: `ab-test-significance-calculator, ad-budget-planner, ai-citability-checker, bio-and-caption-generator, break-even-calculator, character-counter, content-calendar-template, cpm-cpc-ctr-calculator, email-subject-line-tester, hashtag-generator, headline-analyzer, image-compressor-converter, journalist-pitch-email-builder, keyword-density-checker, llms-txt-generator, ltv-cac-calculator, media-kit-builder, meta-title-description-checker, open-graph-preview, personal-brand-bio-writer, press-release-generator, qr-code-generator, readability-checker, robots-txt-sitemap-generator, roi-roas-calculator, schema-markup-generator, social-image-resizer, utm-builder`.

Compare pages (10): inbound is 90 links from sibling compare pages plus 10 from the /compare hub; no playbook, landing, service or blog page links to any of them.

Localized pages: 30 of 105 have zero in-body inbound. They are the 15 localized blog URLs (`/{zh,ko,ja,es,ru}/blog/{analyst-relations-101-startups, how-to-pitch-coindesk-the-block-blockworks-decrypt-2026, token2049-singapore-pr-playbook-earned-media}`) and 15 localized playbooks (`/{locale}/playbook/{ai-startup-pr-agency-india-2026, best-token-launch-marketing-agencies-2026, how-to-submit-op-ed-techcrunch-2026}`). There is no translated /playbook or /blog hub in `lib/i18n/config.ts` (kinds are only home, partial, playbook, blog), so these are reachable by language toggle, hreflang and sitemap only.

Distribution of distinct non-index contextual inbound sources (English pages, before blog): services min 30 / median 42 / max 99; regions 10-21; playbooks min 0 / **median 2** / max 35; landing pages min 0 / **median 1** / max 14; free tools 0.

### 3.3 Click depth

All links (nav, footer, body, toggle): depth 0: 1, 1: 45, 2: 333, 3: 20, unreachable in the repo-only BFS 17. Those 17 are `/resources` (depth 3 once the calculator CTA is counted), `/authors/shilika-jain` (linked from blog posts), and 15 localized blog URLs (reached by language toggle from the 3 English posts, which I did not verify in the toggle graph). So every URL is in practice reachable and max depth is about 3, **but only because of the footer**.

Body links only (what editorial linking alone delivers): depth 1: 28, 2: 21, 3: 5, 4: 101, 5: 6, 6: 2, 7: 101, unreachable 151 (105 localized pages, 31 tools, 10 compare pages, 5 other). All 106 landing pages sit at depth 5-7 and playbooks at 1-4. Cause: the homepage body links to 28 targets (6 case studies, 8 services, 6 playbooks, press, faq, testimonials, contact, blog, about) and to no hub and no desk; its hub and desk links live only in the footer block (positions 70,649+ of a 74,626-character file). The whole discovery of 228 playbook and landing pages rides on 29 identical footer links repeated on 414 pages.

### 3.4 Hubs and how they distribute links

| Hub | Unique body outlinks | Note |
|---|---|---|
| `/playbook` | 124 | all 122 playbooks (index slugs == sitemap playbooks). Flat card list; no grouping logic found by grep in `app/playbook/page.tsx` |
| `/pages` | 107 | all 106 landing pages (json == sitemap). Flat; no grouping logic found in `app/pages/PagesIndex.tsx` |
| `/tools` | 29 | plus 3 calculators |
| `/` | 28 | no hubs, no desks in body |
| `/services/ai-startup-pr` | 19 | next best service page; the others 9-18 |
| `/playbook/web3-pr-agency-mistakes` | 16 | the only playbook acting as a mini hub |
| `/services` | 8 body outlinks, 2 body inbound | pure index of the 8 services; contextual inbound only from `/` and one glossary term; links no desk and no playbook |
| `/press`, `/contact`, `/authors/shilika-jain` | 0 | dead ends |

Internal PageRank model (damping 0.85, 715 nodes incl. 299 blog posts; a structural model, not Google's):

| Edge set | services (median x1e-4) | regions | playbooks | landing | tools |
|---|---|---|---|---|---|
| all edges (chrome + body + blog) | 194.4 | 160.1 | **3.7** | **3.6** | 4.9 |
| body edges only (+ blog) | 151.1 | 124.7 | 5.8 | 3.9 | 4.7 |

Services rank 2-14 of 715 on all edges; the three desks I ranked (Korea 24, Singapore 26, Japan 29; the other three were not ranked); `/playbook/crypto-pr-cost-2026` ranks 42 (9 on body edges, because the homepage and 35 pages link it), `/playbook/best-web3-pr-agencies-2026` ranks 48 (33), `/playbook/fractional-cmo-web3-2026` 292 (280), `/playbook/cybersecurity-pr-agency-pricing-2026` 382 (259). In plain terms: internal authority concentrates on 8 service pages and the homepage, while the 228 child pages that actually win long-tail queries sit about 50x lower, so the two thin-inbound winners are fragile.

Money page inbound, English pages, distinct non-index sources, before blog (carried forward from `analyze2.out`): web3-pr-campaigns 99, ai-startup-pr 55, token-launch-pr 43, kol-marketing 42, apac-pr 41, founder-profiling 34, content-writing 33, cybersecurity-pr 30; /india 21, /korea 19, /dubai-mena 17, /japan 17, /singapore 15, /apac 10. Including the 105 translated pages the service figures are 124, 95, 73, 52, 81, 44, 53, 40 (re-computed this session); desk figures do not change because translated pages link translated desk URLs. Blog adds service inbound from 32, 17, 11, 8, 7, 5, 3, 3 posts (ai-startup-pr, founder-profiling, web3-pr-campaigns, apac-pr, content-writing, kol-marketing, cybersecurity-pr, token-launch-pr) and desk inbound from only 4, 4, 3, 3, 2, 0 posts (korea, india, dubai-mena, japan, singapore, apac).

### 3.5 Is playbook -> service hub-and-spoke real?

Playbooks (122):

```
with >=1 body link to a service : 108 (89%)    avg service links per playbook 1.17
playbooks linking each service  : web3-pr-campaigns 43, ai-startup-pr 19, kol-marketing 18, token-launch-pr 17, apac-pr 14, founder-profiling 13, cybersecurity-pr 11, content-writing 8
keyword-heuristic topical match : 93 of 122 link to the service the slug implies (76%) [heuristic, see analyze.py expected_service()]
with >=1 body link to a landing page: 5     with >=1 to a region desk: 8
playbook -> playbook links      : 294 total, 66 reciprocated (22%); 40 playbooks have 0 playbook inbound; 6 have 0 playbook outbound
```

The 14 playbooks with zero service links (re-verified list): `affordable-pr-tech-startup-2026`, `apac-pr-playbook-2026`, `crypto-pr-agency-comparison-2026`, `crypto-pr-cost-2026`, `crypto-pr-vs-ai-pr`, `founder-profiling-sprint`, `fractional-pr-cost-pricing-2026`, `fractional-pr-vs-in-house-hire-2026`, `fractional-vs-agency`, `how-to-build-ai-search-visibility-geo-2026`, `how-to-choose-web3-pr-agency-checklist-2026`, `how-to-pitch-cointelegraph-2026`, `tier-1-pr-trap`, `web3-marketing-agency-guide-2026`. They include the oldest and strongest pages (`apac-pr-playbook-2026` has 67 inbound sources, the most-linked playbook; `crypto-pr-cost-2026` 35; `fractional-vs-agency` 33; `crypto-pr-vs-ai-pr` 25). The pre-2026-template articles (article-1..8, 13) contain only `/blog`, `/about`, `/#contact`, Calendly and 0-6 sibling links. The auto-generated playbooks (article-15+) use a pattern of 2 sibling playbooks + 1 service + 1 landing page in a related block, which is why 108 pass.

Downward links (service -> playbook), re-verified from the raw partials:

| Service page | Distinct playbooks it links | Topical playbooks that exist (heuristic) | Desks linked | Landing pages linked |
|---|---|---|---|---|
| web3-pr-campaigns | 2 | 51 | 5 | 0 |
| token-launch-pr | 2 | 16 | 5 | 0 |
| ai-startup-pr | 7 | 15 | 5 | 0 |
| apac-pr | 1 | 9 | 6 | 0 |
| kol-marketing | 1 | 6 | 5 | 0 |
| cybersecurity-pr | 3 | 7 | 5 | 0 |
| founder-profiling | 3 | 11 | 5 | 0 |
| content-writing | 5 | 7 | 0 | 0 |

The service -> desk links come mostly from each page's "Per-country FAQ" H2, which is a good pattern worth copying for playbooks.

Landing pages (106): link to a service 106/106, a playbook 105/106 (165 landing->playbook pairs covering 86 distinct playbooks), a case study 106/106, a sibling landing page 105/106, a region desk only 16/106. **Reciprocation: 0 of 165**; only 4 to 5 landing pages receive any playbook body link. Regional desks link 0 landing pages and 1 playbook each (2 for `/apac`).

Verdict: playbook -> service exists (mostly one generic link, 35% of them to the all-purpose web3-pr-campaigns). Service -> playbook, playbook -> landing, desk -> landing and landing -> desk are index-level or absent: only the /playbook and /pages hubs and the footer carry downward distribution.

### 3.6 Anchor text diversity (English contextual links, index pages excluded; re-computed for 8 targets)

| Target | links | unique anchors | top anchors |
|---|---|---|---|
| /services/web3-pr-campaigns | 182 | 49 | "web3 pr campaigns" 92 (51%), "web3 pr campaign" 10, card-title blurb 7 |
| /services/ai-startup-pr | 99 | 38 | "ai startup pr" 34, "ai startup pr service" 9, "ai startup pr service page" 8 |
| /services/token-launch-pr | 83 | 27 | "token launch pr" 31, "token launch pr service" 15 |
| /services/apac-pr | 82 | 46 | "apac pr service" 19, "apac pr" 8 |
| /services/kol-marketing | 74 | 39 | "kol marketing" 14, "kol marketing service" 7 |
| /services/founder-profiling | 74 | 26 | "founder profiling" 36 (49%) |
| /services/content-writing | 56 | 27 | "content writing" 15 |
| /services/cybersecurity-pr | 51 | 24 | "cybersecurity pr" 11 |
| /korea | 26 | 14 | "korea country desk" 7, card title "country · new · 10 min korea pr: fsc, daba, krw-stablecoin, kbw 2026" 5 |
| /japan | 24 | 12 | "japan country desk" 7, card title 6 |
| /singapore | 20 | 11 | "singapore country desk" 7, card titles 3+2 |
| /playbook/crypto-pr-cost-2026 | 60 | 21 | "how much crypto pr costs in 2026" 19 |
| /playbook/best-web3-pr-agencies-2026 | 39 | 22 | "best web3 pr agencies in 2026" 12 |
| /playbook/apac-pr-playbook-2026 | 33 | 9 | "apac pr playbook" 16 |

Reading: no "click here" problem. The issue is homogeneity: money pages are linked almost only by their own name, "X service", "X service page" or a full card title (title plus blurb as anchor text, which reads as noise). Nothing carries buyer-query wording ("PR consultant for a Web3 startup launching in Korea", "what crypto PR in Japan costs", "pre-TGE PR"). That wording is exactly what the panel prompts use.

### 3.7 SERP comparison (data/ai-citation-panel, run 79, 2026-09-25, 13 of 25 prompts surfaced, Google only)

The latest SERP data is the 2026-09-25 CSV; runs 80-88 changed pages but did not re-measure (run 83 found runs 80-82 were not live until 2026-10-01; runs 85-88 are local and unpushed). Per-prompt winners (re-read from `results/serp-discoverability/2026-09-25.csv`):

| Prompt | Winner on Google |
|---|---|
| A1 fractional PR vs agency | best-web3-pr-agencies-2026, fractional-cmo-web3-2026 |
| A3 fractional PR cost | best-web3-pr-agencies-2026, crypto-pr-cost-2026, fractional-cmo-web3-2026 |
| A4 AI startup fractional vs agency | /services/ai-startup-pr |
| A5 recently funded startup | best-web3-pr-agencies-2026 |
| B1 best Web3 PR agencies | best-web3-pr-agencies-2026 |
| B2 CoinDesk/Cointelegraph/Decrypt | how-to-pitch-cointelegraph-2026 |
| B5 KOL campaign | /services/kol-marketing |
| C2 AI vs crypto PR | /blog/ai-startup-pr-techcrunch-the-information-forbes-2026, /services/ai-startup-pr |
| C3 ghostwrite op-eds | /services/ai-startup-pr, /services/content-writing |
| D4 cybersecurity PR cost | cybersecurity-pr-agency-pricing-2026 |
| E1 Korea consultant | **best-web3-pr-agencies-2026 (not /korea)** |
| E2 Japan crypto PR cost | **crypto-pr-cost-2026 (not /japan)** |
| E3 APAC crypto PR | best-web3-pr-agencies-2026, /singapore |
| Not surfaced | A2, B3, B4, C1, C4, C5, D1, D2, D3, D5, E4 (Dubai/MENA), E5 (India) |

Winners vs the graph:

| Page | Prompts | Non-index inbound (before blog) | Outbound to service / desk |
|---|---|---|---|
| /playbook/best-web3-pr-agencies-2026 | A1 A3 A5 B1 E1 E3 | 24 | 2 / **0** |
| /services/ai-startup-pr | A4 C2 C3 | 55 | n/a |
| /playbook/fractional-cmo-web3-2026 | A1 A3 | **1** | 1 / 0 |
| /playbook/crypto-pr-cost-2026 | A3 E2 | 35 | **0 / 0** |
| /playbook/how-to-pitch-cointelegraph-2026 | B2 | 9 | **0** / 0 |
| /services/kol-marketing | B5 | 42 | n/a |
| /services/content-writing | C3 | 33 | n/a |
| /playbook/cybersecurity-pr-agency-pricing-2026 | D4 | **2** | 1 / 0 |
| /singapore | E3 | 15 | n/a |
| /blog/ai-startup-pr-techcrunch-the-information-forbes-2026 | C2 | 4 posts | **0** (body links: author, 3 blog posts, /blog) |

Non-surfacing money pages: /services/token-launch-pr (43 inbound), /services/web3-pr-campaigns (99, the most-linked page on the site), /services/cybersecurity-pr (30), /korea 19, /japan 17, /india 21, /dubai-mena 17, /apac 10.

Reading (n is tiny, 10 repo-visible winners): more internal links do not predict a win (median non-index inbound, winners 19.5 vs non-surfacing 21.0). Wins track topic specificity and pricing intent. What linking can still change: (a) 3 winners have 1 to 2 inbound sources (fragile), (b) 3 winners have no outbound path to a service, so their traffic cannot convert, (c) the Korea and Japan buyers land on a general playbook with no way to reach the desk written for them, and (d) the 5 desks that fail to surface have link profiles similar to /singapore (which does surface), so their problem is content or off-site, not internal links.

### 3.8 Blog (299 posts, Supabase, live crawl; re-computed from `blog_edges.json`)

```
posts with >=1 body link to a /services/* : 71 (24%)   to a /playbook/* : 23 (8%)   to a /pages/* landing : 29 (10%)
posts linking a desk: korea 4, japan 3, india 4, singapore 2, dubai-mena 3, apac 0
posts linking another blog post: 211 (71%)   to /contact: 105   to /work/*: 26   to /tools/<calculator>: 38 (gtm-planner 21, marketing-budget-calculator 20, marketing-checklist 8)
posts linking the /playbook hub: 0   the /pages hub: 0   /tools hub: 0   /glossary/*: 0   /compare/*: 0
service targets from the blog: ai-startup-pr 32, founder-profiling 17, web3-pr-campaigns 11, apac-pr 8, content-writing 7, kol-marketing 5, cybersecurity-pr 3, token-launch-pr 3
posts with 0 inbound from other posts: 141 of 299 (47%)
```

The blog template (`app/blog/[slug]/page.tsx`) renders the author link, a Calendly CTA from `post.cta_url` (lines 133, 238, 291), related-post cards (`getRelatedPosts`, block at line 340) and "All posts" (line 148). There is no related-service or related-playbook module, so cross-linking depends on whatever the markdown contains.

### 3.9 llms.txt and machine-readable link discovery

Live `/llms.txt` (162,869 bytes) lists 670 shilikajain.com URLs: all 8 services, all 6 desks, all 299 blog entries, but only **15 of 122 playbooks and 0 of 106 landing pages**. Relevant to GEO rather than classic crawl.

## 4. Top 15 fixes

Format: URL to edit -> link to add -> suggested anchor -> placement. Section names are the actual H2s from the partial files (re-checked this session).

1. **`/playbook/crypto-pr-cost-2026`** (`app/_partials/article-4-body.html`; wins A3 and E2; 35 inbound sources; 0 service links, 0 desk links, 0 playbook links). Its H2s already name every service but link none. Add: "What a Web3 PR retainer actually covers" -> `/services/web3-pr-campaigns`, anchor "Web3 PR campaigns"; "Token launch PR: the sprint model" -> `/services/token-launch-pr`, "token launch PR service"; "APAC PR: per-market, not bundled" -> `/services/apac-pr`, "APAC PR service"; "AI startup PR: how the brackets shift from Web3" -> `/services/ai-startup-pr`, "AI startup PR"; "Cybersecurity PR: the analyst-relations line item" -> `/services/cybersecurity-pr`, "cybersecurity PR service"; "Content writing service: the lower-cost on-ramp" -> `/services/content-writing`, "content writing service"; "Regional PR pricing for Web3 and AI: per-market math" -> `/japan` "what crypto PR in Japan costs" (E2 wording), `/korea` "Korea crypto PR costs", `/dubai-mena` "Dubai and MENA Web3 PR cost", `/india` "Web3 and AI PR for Indian founders", `/singapore` "Singapore PR desk".
2. **`/playbook/best-web3-pr-agencies-2026`** (`article-7-body.html`; wins 6 prompts including E1 Korea and E3 APAC; 24 inbound; links 2 services, 5 playbooks, **0 desks, 0 compare pages**). In "The decision tree" add one line per market: Korea -> `/korea` "PR consultant for a Web3 startup launching in Korea" (E1); Japan -> `/japan` "who runs crypto PR in Japan"; Singapore and APAC -> `/singapore` "Singapore PR desk" and `/apac` "APAC crypto PR for Web3 and AI founders" (E3); Dubai and MENA -> `/dubai-mena` "Dubai and MENA Web3 PR"; India -> `/india` "Web3 and AI PR for Indian founders". Under "1. Shilika Jain - fractional senior operator" add `/services/apac-pr` "APAC PR service" and `/services/kol-marketing` "KOL marketing". In "All six firms at a glance" link `/compare/shilika-jain-vs-coinbound` "Shilika Jain vs Coinbound" (Coinbound is the one firm in both the listicle and the compare set).
3. **`/playbook/how-to-pitch-cointelegraph-2026`** (`article-13-body.html`; wins B2; 9 inbound; 0 service links). "What I do for clients on this" -> `/services/web3-pr-campaigns` "Web3 PR campaigns"; "Step 6: Use the multilingual editions for real APAC reach" -> `/services/apac-pr` "APAC PR" and `/korea` "Korea crypto PR"; "Step 4: Write the under-150-word pitch" -> `/tools/journalist-pitch-email-builder` "pitch email builder" (also rescues an index-only tool).
4. **The other legacy playbooks with 0 service links**, one in-body link plus a 3-link related block each: `/playbook/fractional-vs-agency` ("The hybrid model nobody talks about" -> `/services/web3-pr-campaigns` "fractional Web3 PR"; the AI search section -> `/services/ai-startup-pr`), `/playbook/tier-1-pr-trap` -> `/services/web3-pr-campaigns` "Tier-1 outreach", `/playbook/founder-profiling-sprint` -> `/services/founder-profiling` "founder profiling service", `/playbook/crypto-pr-vs-ai-pr` -> `/services/ai-startup-pr` and `/services/web3-pr-campaigns`; `/playbook/fractional-pr-cost-pricing-2026`, `/playbook/fractional-pr-vs-in-house-hire-2026`, `/playbook/affordable-pr-tech-startup-2026`, `/playbook/crypto-pr-agency-comparison-2026`, `/playbook/web3-marketing-agency-guide-2026`, `/playbook/how-to-choose-web3-pr-agency-checklist-2026` -> `/services/web3-pr-campaigns` "fractional Web3 PR"; `/playbook/how-to-build-ai-search-visibility-geo-2026` -> `/services/ai-startup-pr` "AI search visibility".
5. **`/playbook/apac-pr-playbook-2026`** (`article-2-body.html`; 67 inbound sources, the best-linked playbook; links only /apac and /india). Under each H2: "Korea: the only market where Telegram channels matter more than the homepage" -> `/korea` "Korea crypto PR desk" + `/playbook/crypto-pr-korea-2026`; "Japan: regulatory framing or you don't get printed" -> `/japan` "Japan crypto PR desk" + `/playbook/crypto-pr-japan-2026`; "Vietnam: community over outlet, every time" -> `/playbook/crypto-pr-vietnam-2026` (2 inbound); "India: founder voice beats company news" -> `/india` with a varied anchor "PR for Indian founders"; "China: forget Mainland. Hong Kong is where the access lives." -> `/services/apac-pr` "APAC PR service". In "The portable principle" add `/singapore` "Singapore PR desk" and `/dubai-mena` "Dubai and MENA desk". Cheapest way to lift desk inbound, since this page already has 67 sources.
6. **Service pages -> playbooks, "Go deeper" block before "How to start", SERP-linked first.** `/services/cybersecurity-pr`: `/playbook/cybersecurity-pr-agency-pricing-2026` "what cybersecurity PR costs for a Series B vendor" (D4 winner, 2 inbound), under "Analyst relations is the part most security PR skips" -> `/playbook/cybersecurity-analyst-relations-2026`, under "Threat research is your news engine" -> `/playbook/cybersecurity-threat-research-pr-2026`, plus `/playbook/how-to-get-covered-dark-reading-2026`, `/playbook/cybersecurity-breach-crisis-comms-2026`, `/playbook/best-cybersecurity-marketing-agencies-2026`. `/services/ai-startup-pr`: `/playbook/enterprise-ai-pr-2026`, `/playbook/how-to-get-covered-the-information-2026` (0 inbound), `/playbook/ai-x-crypto-agent-pr-2026` "PR for AI agent startups" (0 inbound, C5), `/playbook/healthcare-ai-pr-2026`, `/playbook/ai-product-launch-pr-2026`. `/services/token-launch-pr` (links 2 of 16): under "How a token launch actually unfolds" add `/playbook/tge-communications-timeline-2026`, `/playbook/token-launch-pr-campaign-cost-2026`, `/playbook/token-launch-pr-mistakes-2026` (0 inbound), `/playbook/free-token-listing-press-sites-2026` (0), `/playbook/crypto-airdrop-pr-strategy-2026`, `/playbook/exchange-listing-pr-best-practices-2026`; this also supports the prompts the page fails (B3, B4). `/services/kol-marketing` (0 of 6): under "How creators are vetted" -> `/playbook/how-to-vet-crypto-kols-2026`; under "How a KOL wave actually unfolds" -> `/playbook/kol-campaign-token-launch-2026`; plus `/playbook/crypto-influencer-pricing-rates-2026`, `/playbook/best-crypto-kol-marketing-agencies-2026`, `/playbook/crypto-kol-marketing-korea-2026`, `/playbook/web3-kol-agency-vs-in-house-2026`. `/services/web3-pr-campaigns` (2 of 51): `/playbook/fractional-cmo-web3-2026` "fractional CMO for Web3 startups", `/playbook/how-to-pitch-cointelegraph-2026`, `/playbook/best-web3-pr-agencies-2026`, `/playbook/how-to-get-covered-the-block-blockworks-2026`, `/playbook/how-to-get-bloomberg-crypto-coverage-2026`. `/services/founder-profiling`: `/playbook/best-founder-personal-branding-agencies-2026` (0), `/playbook/how-to-get-podcast-interviews-founder-2026`, `/playbook/linkedin-strategy-founders-2026`. `/services/content-writing`: `/playbook/best-crypto-press-release-services-2026` (0), `/playbook/how-to-write-crypto-press-release-2026`, `/playbook/how-to-submit-op-ed-techcrunch-2026`. `/services/apac-pr`: `/playbook/crypto-pr-japan-2026`, `/playbook/crypto-pr-korea-2026`, `/playbook/crypto-pr-vietnam-2026`, `/playbook/apac-press-windows-2026`.
7. **Regional desks -> their spokes.** None of the 6 desks links a landing page. Add a "Specialist pages for <country>" list before "How to start" on each desk: `/korea` -> `/pages/crypto-pr-agency-korea` "crypto PR agency in Korea", `/pages/korea-crypto-pr-agency`, `/pages/crypto-kol-agency-korea` "Korean KOL agency", `/pages/korea-kol-marketing-agency`, `/playbook/crypto-kol-marketing-korea-2026`; `/japan` -> `/pages/crypto-pr-agency-japan`, `/pages/japan-crypto-pr-agency`, `/pages/crypto-kol-agency-japan`, `/pages/korea-japan-crypto-pr`; `/dubai-mena` -> `/pages/crypto-pr-agency-dubai`, `/pages/mena-crypto-pr-agency`, `/pages/web3-pr-agency-uae`; `/india` -> `/pages/web3-pr-agency-india`, `/pages/india-crypto-pr-agency`, `/pages/crypto-marketing-agency-india`, `/pages/ai-pr-agency-india`, `/pages/token-launch-pr-agency-india`; `/singapore` -> `/pages/crypto-pr-agency-singapore`, `/playbook/best-crypto-pr-agency-singapore-2026`; `/apac` -> `/pages/apac-crypto-pr-agency`, `/pages/apac-token-launch-pr`, `/playbook/apac-press-windows-2026`. Use query-style anchors (E1, E2, E4, E5 wording).
8. **Reciprocal playbook -> landing links (0 of 165 today).** Generate from `data/landing-pages.json` plus the existing landing->playbook pairs: add one line "Hiring for this? <landing h1>" to each playbook's related block. Priority pairs: `/playbook/fractional-cmo-web3-2026` -> `/pages/fractional-cmo-web3` "fractional CMO for Web3"; `/playbook/best-web3-pr-agencies-2026` -> `/pages/best-crypto-pr-agency`, `/pages/web3-pr-agency`; `/playbook/cybersecurity-pr-agency-pricing-2026` -> `/pages/cybersecurity-pr-agency-usa`; `/playbook/enterprise-ai-pr-2026` -> `/pages/enterprise-ai-pr-agency`. Also `/pages/cybersecurity-pr-agency` should link `/playbook/cybersecurity-pr-agency-pricing-2026`.
9. **Blog template: add a "Related service" and "Related playbooks" module** to `app/blog/[slug]/page.tsx` (insert before the Calendly CTA blocks at lines 226 to 238 and above the related-posts block at line 340). Map by tag or keyword to the 8 services and 2 to 3 topical playbooks; anchors in the form "<topic> PR service" and "<topic> playbook". One template edit adds links from 299 posts (today 71 link a service, 23 a playbook).
10. **The SERP-winning blog post `/blog/ai-startup-pr-techcrunch-the-information-forbes-2026`** (Supabase content, edit via admin). Body links today: author, 3 blog posts, /blog. Add `/services/ai-startup-pr` "AI startup PR service" in the intro, `/playbook/ai-startup-pr-2026` "AI startup PR playbook", `/playbook/how-to-get-ai-startup-in-techcrunch-2026`, `/playbook/how-to-get-covered-the-information-2026` (0 inbound), `/playbook/enterprise-ai-pr-2026`.
11. **Thin-inbound SERP winners.** `/playbook/fractional-cmo-web3-2026` (1 non-index source): link from `/services/web3-pr-campaigns`, `/glossary/what-is-fractional-pr` (its `related` list in `data/glossary.ts`), `/playbook/fractional-pr-cost-pricing-2026`, `/playbook/when-to-hire-fractional-pr-2026`, `/playbook/fractional-pr-vs-in-house-hire-2026`, `/pages/fractional-pr-consultant-web3`, `/pages/fractional-head-of-pr`, anchors "fractional PR cost for Web3 startups" (A3) and "what a fractional PR consultant does" (A1). `/playbook/cybersecurity-pr-agency-pricing-2026` (2 sources): `/services/cybersecurity-pr`, `/pages/cybersecurity-pr-agency`, `/pages/cybersecurity-marketing-agency`, `/playbook/cybersecurity-pr-2026`, `/playbook/best-cybersecurity-marketing-agencies-2026`, anchor "cybersecurity PR pricing for a Series B vendor" (D4).
12. **The 11 index-only playbooks and 35 index-only landing pages need a topical parent each.** `how-to-get-covered-the-block-blockworks-2026` and `how-to-get-bloomberg-crypto-coverage-2026` <- `/playbook/get-featured-coindesk-2026`, `/playbook/coindesk-vs-cointelegraph-where-to-pitch-2026`, `/playbook/best-web3-pr-agencies-2026`; `free-token-listing-press-sites-2026`, `best-nft-news-outlets-to-pitch-2026`, `token-launch-pr-mistakes-2026` <- `/services/token-launch-pr` (fix 6); `zk-proof-pr-2026` <- `/playbook/web3-infrastructure-pr-2026`, `/pages/web3-infrastructure-pr-agency`; `ai-x-crypto-agent-pr-2026`, `how-to-get-covered-the-information-2026` <- `/services/ai-startup-pr`, `/playbook/crypto-pr-vs-ai-pr`; `crypto-sustainability-esg-pr-2026` <- `/services/web3-pr-campaigns`, `/playbook/web3-infrastructure-pr-2026`; `best-crypto-press-release-services-2026` <- `/services/content-writing`, `/pages/crypto-press-release-service`; `best-founder-personal-branding-agencies-2026` <- `/services/founder-profiling`, `/pages/founder-personal-branding-agency`. For landing pages, fixes 7 and 8 plus each service page listing its 3 to 5 landing pages (heuristic landing counts per service: web3-pr-campaigns 20, token-launch-pr 5, apac-pr 4, founder-profiling 4, ai-startup-pr 4, cybersecurity-pr 3, kol-marketing 3, content-writing 3).
13. **Navigation and homepage body.** Add "Playbooks" (`/playbook`) to the header nav in `components/site/EditorialChrome.tsx` (EditorialNav, lines 124 to 153) and to the nav inside `app/_partials/homepage-body.html`. In the homepage body add a "Regional desks" strip linking `/apac`, `/korea`, `/japan`, `/singapore`, `/india`, `/dubai-mena` (anchors "Korea crypto PR", "Japan crypto PR", "Singapore PR", "India PR", "Dubai and MENA PR", "APAC PR") and "Read the playbooks" -> `/playbook`, `/pages`. On `/services` (body links only the 8 services) add a "Regional desks" row and 6 top playbooks. Also give the dead ends outbound links: `/press` -> `/services/web3-pr-campaigns` and `/work`; `/contact` -> `/faq` and `/services`. This should move landing body depth from 5-7 and playbook body depth from up to 4 down to 2 or 3 (an estimate from the graph structure, not a measurement).
14. **Orphans, tool and compare wiring.** `/resources`: add to the footer Resources column (EditorialChrome.tsx lines 227 to 232) and link from `/tools` and `/about`; today only the calculators' secondary CTA points to it. `/speaker`: link from `/about` and `/press` ("speaking and panels"). The 28 free tools get 0 content links: `/tools/press-release-generator` <- `/playbook/how-to-write-crypto-press-release-2026` and `/services/content-writing`; `/tools/llms-txt-generator`, `/tools/ai-citability-checker`, `/tools/schema-markup-generator` <- `/playbook/how-to-get-cited-by-chatgpt-2026`, `/playbook/how-to-build-ai-search-visibility-geo-2026`, `/glossary/what-is-geo-generative-engine-optimization`; `/tools/media-kit-builder` <- `/services/founder-profiling`; `/tools/roi-roas-calculator` <- `/playbook/how-to-measure-pr-roi-2026`; `/tools/marketing-budget-calculator` <- `/playbook/crypto-pr-cost-2026`, `/playbook/crypto-pr-small-budget-2026`; `/tools/gtm-planner` <- `/playbook/crypto-go-to-market-strategy-2026`; `/tools/marketing-checklist` <- `/playbook/pre-token-launch-pr-checklist`. Compare pages (`/compare/shilika-jain-vs-<slug>`): link "vs Coinbound", "vs Luna PR", "vs Wachsman", "vs MarketAcross", "vs Melrose PR" from `/playbook/best-web3-pr-agencies-2026`, `/playbook/crypto-pr-agency-comparison-2026`, `/pages/best-crypto-pr-agency`; and "vs HighWire PR", "vs Bospar", "vs Inkhouse", "vs Hotwire", "vs Shift Communications" from `/playbook/best-b2b-saas-pr-agencies-2026`, `/pages/ai-pr-agency`, `/playbook/ai-pr-agency-pricing-packages-2026`. Today no non-compare page links them.
15. **Anchor diversification pass, tied to the panel prompts.** Keep exact-name anchors for about half the links and rewrite the rest as buyer-query anchors: `/services/token-launch-pr` "pre-TGE PR" and "PR strategy for a token launch" (B3, B4); `/services/cybersecurity-pr` "cybersecurity PR for the US market" (D5); `/services/ai-startup-pr` "PR for a Series A AI infrastructure company" and "PR for AI agent startups" (C4, C5); `/services/content-writing` "op-ed ghostwriting for AI founders" (C3); `/korea` "PR consultant for a Web3 startup launching in Korea" (E1); `/japan` "crypto PR in Japan and what it costs" (E2); `/dubai-mena` "Dubai and MENA Web3 PR cost" (E4); `/india` "Web3 and AI PR for Indian founders" (E5). Replace the repeated "country desk" anchor (7 uses per desk) and full-card-title anchors in related blocks with a short descriptive anchor.

Related, outside link work: `app/llms.txt/route.ts` lists 15 of 122 playbooks and 0 landing pages. Add the `/playbook` and `/pages` index entries plus the top 30 playbooks so AI crawlers that read llms.txt can reach the full spoke set.

Suggested order of work: fixes 1, 2, 3, 13 (one afternoon, directly serve the winning pages and the regional gap), then 6 and 9 (template-level leverage), then 7, 8, 12 (generated, can be scripted from `data/landing-pages.json`), then 4, 5, 10, 11, 14, 15.

## 5. Open items and what I could not verify

- Blog body links come from rendered HTML of 299 posts, parsed inside `<article>` only; I did not diff them against the Supabase source. Links in components outside `<article>` are excluded by design.
- Localized page body links are inferred (one live spot check on `/zh/about`); I did not render every `/zh`, `/ko`, `/ja`, `/es`, `/ru` page. I did not verify the language-toggle edges for the 15 localized blog URLs.
- Tool-page "related tools" blocks, compare-page body links and glossary pages are partly derived, not fully parsed from rendered HTML.
- "Topical match" of playbooks to services is a slug-keyword heuristic; treat the 76% as indicative.
- The PageRank figures are a model over this site's own link graph; they say nothing about Google's view and there is no crawl, impression or backlink data in this audit.
- The claim "internal links do not predict SERP wins" rests on 10 repo-visible winners from one 25-prompt Google panel on 2026-09-25. Runs 80-88 are not reflected in any SERP measurement.
- Production differs from the working tree for pages touched by the 34 local edits; only 5 pages were fetched live this session (home, singapore, crypto-pr-cost-2026, how-to-pitch-cointelegraph-2026, zh/about) and the earlier run checked 6 pages with identical in-body hrefs.
- Ahrefs (Insufficient plan) and GSC (not connected) were not used.
