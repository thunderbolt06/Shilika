# Programmatic and tool pages audit: /pages, /compare, /glossary, /tools, /resources

Audit date: 2026-10-15. Site: https://www.shilikajain.com. Repo: /Users/thunderbolt/Documents/projects/Shilika (read only; nothing in the repo was modified).
Scratch scripts and raw outputs: /private/tmp/claude-504/-Users-thunderbolt-Documents-projects-Shilika/c0dc2b3b-3b31-46db-9535-df2409eb89af/scratchpad/audit/ (dup.py, dup2.py, dump.py, triage.py, dup_out.txt, dup2_out.txt, triage_final.json, triage_table.md).

## 0. Verdict in one screen

| Area | URLs | Health (0-10) | Spam-policy exposure | Call |
|---|---|---|---|---|
| /pages landing pages | 106 (+ hub) | 2 | HIGH | Keep 26, noindex-and-test 12, 301-merge 68 |
| /compare | 11 (hub + 10) | 6 | LOW for spam, MEDIUM for legal and reputation | Keep all 11, fix 6 specific claims |
| /glossary | 6 (hub + 5 terms) | 7 | LOW | Keep |
| /tools | 32 (hub + 28 free tools + 3 legacy tools) | 7 | LOW | Keep, freeze at current count, watch 8 off-ICP utilities |
| /resources | 1 page + 12 files | 7 | LOW | Keep |
| Area score (weighted by URL count, /pages dominates) | | 3.5 | | |

Headline finding, stated plainly: the 106 /pages are NOT near-duplicates of each other at text level (this is the one place where the owner's earlier audit was right), but they ARE one page per query variant, generated from one template by 100 parallel LLM sub-agents, and Google's own AI optimisation guide (last updated 2026-07-10) names that exact pattern as scaled content abuse. None of the 106 has ever surfaced in the owner's own SERP panel (0 of 48 URL hits over four runs), and 68 of the 106 duplicate an intent that a stronger URL on the same site already serves.

## 1. Method, tools and honest limits

- Ahrefs: not used (told "Insufficient plan", not retried). GSC: not connected. So there is NO impression, click, position or index-coverage data in this report. Anything about ranking is inferred from (a) the owner's SERP panel CSVs in data/ai-citation-panel/results/serp-discoverability/, and (b) web-search probes. Everything inferred is labelled.
- The WebSearch tool does not honour the `site:` operator (5 `site:` queries returned zero shilikajain.com results, including for pages that are indexed). I therefore probed with `allowed_domains: [shilikajain.com, www.shilikajain.com]` and each page's exact title. That backend is not Google. A miss is weak evidence; a hit proves the URL is indexed somewhere.
- curl to the live site returns HTTP 403 with `x-vercel-mitigated: challenge` ("Vercel Security Checkpoint"). I did not try to bypass it. WebFetch got through (it fetched /compare, /sitemap.xml, /tools/utm-builder normally). See risk R8.
- Duplication scripts: Python 3.11 with BeautifulSoup, stdlib difflib and a hand-written TF-IDF (no sklearn available).

Commands that produced the numbers below (all re-runnable):

```
cd .../scratchpad/audit
python3 dup.py     # 5-word shingle Jaccard, boilerplate share, repeated blocks      -> dup_out.txt
python3 dup2.py    # raw-HTML byte share, difflib near-dup blocks, TF-IDF cosine, FAQ -> dup2_out.txt
python3 triage.py  # intent-cluster triage, then manual corrections                   -> triage_final.json
node --experimental-strip-types run.mjs   # exports app/tools/_data/free and app/compare/_data to JSON
```

## 2. /pages: the 106 landing pages

### 2.1 What they are and how they were made

- 106 body partials app/_partials/pages__*-body.html and 106 JSON-LD files, 106 route folders under app/pages/, data/landing-pages.json lists them. One `lp-hero ... lead-section, cta-strip` skeleton: `distinct top-level section sequences across 106 pages: 1`, and exactly 9 H2 slots on every page (`h2 count distribution {9: 106}`).
- Provenance (scripts/gen-landing.workflow.js): "Generate 99 commercial-intent /pages landing pages ... cloned from the web3-pr-agency gold template", `one subagent per landing page`, `model: 'sonnet'`, brief says the page is "optimised for GEO/AEO (getting cited by ChatGPT, Perplexity and Google AI Mode)". Topics come from scripts/landing-topics.py (a keyword-variant table with serviceKey, region, vertical, intent). 83 pages are region "Global"; facets: web3 31, ai 13, apac 13, tge 12, kol 11, content 11, founder 9, cyber 6.
- git: pages first added 2026-06-23 (e52310a), 6 more 2026-07-13 (1071c30). So they have been live roughly 14 to 16 weeks, i.e. they are not too new to have shown any traction.

### 2.2 Duplication, quantified (the requested script)

All numbers from dup_out.txt and dup2_out.txt.

| Metric | Result |
|---|---|
| Visible words per page (style, script, form, nav, footer removed) | min 1,297, median 1,525, mean 1,522, max 1,689 |
| Raw HTML | 3,961,007 bytes total. 71.3% of bytes sit on lines identical across at least 20 pages (per page 68.3% to 75.7%). One identical 16.3 KB `<style>` block is inlined in all 106 pages (1 distinct block, about 44% of a median page's bytes) |
| Template boilerplate share of visible words (blocks repeated on 10 or more pages) | mean 20.2%, median 19.7%, range 16.1% to 28.5% |
| Unique-content words (blocks that appear on exactly one page) | median 1,174 per page (min 827, max 1,365), about 77% of visible words |
| Pairwise 5-word-shingle Jaccard, all 5,565 pairs | median 0.108, p90 0.130, p99 0.164, max 0.281. Pairs at or above 0.30: 0. Above 0.50: 0 |
| Per-page nearest-neighbour Jaccard | median 0.150, max 0.281 |
| Same, after removing boilerplate blocks | median 0.020, p99 0.055, max 0.149 |
| TF-IDF cosine (all pairs) | median 0.055, p90 0.111, p99 0.237, max 0.459. Pages whose nearest neighbour is at or above 0.40: 2 |
| Near-duplicate blocks (difflib ratio at or above 0.75, blocks of 10+ words, vs any other page) | median 11.6% of a page's words, p90 19.4%, max 36.9% (web3-pr-agency, the gold template itself) |
| Authored copy only (answer box, lead, advantage/step/proof/xlink bodies, FAQ answers), near-match at or above 0.60 on another page | median 3.6%, mean 6.3%, p90 17.1%, max 44.1% |
| FAQ (from JSON-LD) | 530 questions (exactly 5 per page), 470 distinct question strings, 529 distinct answers; only 3 of 530 answers have 0.5 or more 4-gram Jaccard with another page's answer. Most repeated questions: "How do I get started?" x14, "What does the process look like and how long does it take?" x12 |
| Same section headings on every page | "Where the stories land.", "Six years. Numbers, not adjectives.", "Go deeper before you decide.", "What founders say after the dust settles." (+ 2 identical testimonials, same 13-outlet trust bar, same stats) on 106/106 |
| Proof reuse | RARI Chain on 106/106 pages, Gaia 100, MANTRA 74, Fluence 70, Web3Auth 39, Bullieverse 31. Six case studies carry the whole cluster |

Reading of these numbers: the sentences are rewritten for every page, so a "duplicate content" filter would not catch this cluster. That matches the owner's 2026-08-09 audit (data/site-audit/2026-08-09-thin-content-audit.md: "Cluster mean unique-content ratio: 84.3%", "KEEP 106"). The flaw in that audit is the metric (unique sentences), not the arithmetic. Google's wording targets the purpose of the pages, not sentence uniqueness.

Worst clusters by TF-IDF cosine (same buyer, same offer, different words):

| Cosine | Pair | Intent |
|---|---|---|
| 0.459 | b2b-saas-pr-agency / b2b-tech-pr-agency | B2B tech PR |
| 0.389 | ico-ido-marketing-agency / crypto-presale-marketing-agency | presale and ICO marketing |
| 0.384 | web3-pr-agency-uae / mena-crypto-pr-agency | UAE and MENA crypto PR |
| 0.383 | crypto-kol-agency-korea / korea-kol-marketing-agency | Korea KOL |
| 0.373 | web3-pr-agency-india / india-crypto-pr-agency | India crypto PR |
| 0.372 | crypto-pr-agency-dubai / mena-crypto-pr-agency | Dubai and MENA |
| 0.370 | enterprise-ai-pr-agency / b2b-saas-pr-agency | enterprise AI and B2B |
| 0.369 | cybersecurity-marketing-agency / cybersecurity-pr-agency-usa | cyber PR |
| 0.322 | affordable-crypto-pr-agency / crypto-pr-agency-small-budget | budget crypto PR |
| 0.312 | crypto-pr-agency-japan / japan-crypto-pr-agency | Japan crypto PR |
| 0.317 | founder-essay-ghostwriting / thought-leadership-ghostwriting | ghostwriting (5 pages, pairs 0.27 to 0.32) |

Worst intent clusters (counting only /pages, before counting the siblings on the rest of the site):
- Korea: crypto-pr-agency-korea, korea-crypto-pr-agency, korea-japan-crypto-pr, korea-kol-marketing-agency, crypto-kol-agency-korea (5 pages) + /korea desk + /playbook/crypto-pr-korea-2026. I read the first two in full: same buyer (global crypto founder entering Korea), same $3K-$7K offer, same BloomingBit/TokenPost outlets, same six proof points, same 4-step "audit, narrative, launch, compound".
- India: web3-pr-agency-india, india-crypto-pr-agency, crypto-marketing-agency-india, token-launch-pr-agency-india, ai-pr-agency-india (5) + /india.
- Fractional / consultant: fractional-pr-consultant, fractional-pr-consultant-web3, fractional-head-of-pr, fractional-cmo-web3, crypto-pr-consultant, ai-pr-consultant, crypto-publicist (7).
- KOL: crypto-kol-marketing-agency, web3-kol-agency, crypto-influencer-marketing-agency, crypto-twitter-kol-marketing, crypto-youtube-influencer-agency (5) + /services/kol-marketing.
- Cybersecurity: cybersecurity-pr-agency, cybersecurity-marketing-agency, infosec-pr-agency, cybersecurity-pr-agency-usa (4) + /services/cybersecurity-pr.
- Token launch: token-launch-pr-agency, tge-pr-agency, crypto-token-launch-marketing-agency, token-launch-marketing-agency, token-launch-pr-agency-india, apac-token-launch-pr (6) + /services/token-launch-pr.
- Ghostwriting: op-ed-ghostwriting-service, founder-essay-ghostwriting, thought-leadership-ghostwriting, crypto-ghostwriting-agency (4) + /services/content-writing.
- "Best/top/cheap crypto agency": best-crypto-pr-agency, top-crypto-marketing-agency, best-web3-marketing-agency, web3-marketing-agency, affordable-crypto-pr-agency, crypto-pr-agency-small-budget (6) + /playbook/best-web3-pr-agencies-2026 (the site's single strongest page).

### 2.3 Same-intent siblings elsewhere on the site

- 59 of 106 landing pages have a /services, regional-desk or /playbook URL with a slug-token Jaccard of 0.5 or more (siblings.json). Examples: /pages/token-launch-pr-agency vs /services/token-launch-pr (1.00), /pages/ai-startup-pr-agency vs /services/ai-startup-pr (1.00), /pages/cybersecurity-pr-agency vs /services/cybersecurity-pr (1.00), /pages/crypto-pr-agency-korea vs /playbook/crypto-pr-korea-2026 (0.75), /pages/crypto-pr-agency-small-budget vs /playbook/crypto-pr-small-budget-2026 (0.80).
- The 8 "head" pages (n=1 to 8) each duplicate one of the 8 /services pages. 23 region-variant pages (India, Korea, Japan, Singapore, Dubai, UAE, MENA, UK, USA, Vietnam, APAC, etc.) sit on top of 6 regional desks (/apac /india /singapore /dubai-mena /korea /japan), and the panel already records that the desks themselves do not surface.

### 2.4 Self-referential "made for search" copy (a policy tell)

- "Why this page exists" section on 106/106 pages; the sentence "This page is built to be that answer/source/citation ..." appears on 79/106 (48 use the exact wording "built to be that answer"); the hub /pages says "these are the pages built to be the answer".
- A hard-coded ".aeo-demo" block labelled "Ask AI" with a scripted AI answer that names Shilika Jain, on 106/106 pages. It is not labelled as an illustration. Example (web3-pr-agency): the bar reads `Ask AI · "best Web3 PR agency for a token launch"` and the "answer" credits Shilika with RARI and MANTRA. A reviewer or an engine ingesting the page can read it as a fabricated AI answer.
- The owner's own logs say the program has "no page-per-query-variant" (data/ai-citation-panel/summary/2026-09-25-serp-panel-analysis.md, line "Google guidelines check") and "No query-variation padding" (2026-08-14-day90-report.md). That is contradicted by the 106-page /pages cluster. The guardrail was applied to new content and never to this cluster.

### 2.5 Structured data and facts that disagree with the page

- Visible price: every one of the 106 bodies states "$3K-$7K/month" (94 of 106 "Direct answer" boxes contain it). JSON-LD Service.offers.priceSpecification says 5000 to 12000 per MONTH on 100 pages and 5000 to 12000 per PROJECT on 1 more; the other 5 are 2 sprint ranges, 1 campaign range (200 to 100000) and 2 monthly ranges (1500-6000, 1500-12000). So at least 101 pages carry markup that contradicts the visible text. Google's structured-data guidelines require markup to reflect visible content.
- The same business is quoted with several fractional-retainer bands across the site. In web searches limited to shilikajain.com, the engine's own summaries flagged it: "Pricing (inconsistent across her pages)": $5k-10k (homepage), $3k-7k (hero), $5K-$12K (best-agencies guide), $6K-$14K (APAC and AI pages), $4K-$10K (publicist piece). Local partial count: $3K-$7K appears in 208 /pages files, 184 playbook/blog partials, 8 service partials, 9 others; $6K-$14K in 4 services and 4 playbook partials. The /compare hub FAQ adds "most established agencies charge $10K-$15K a month at the entry level" while /pages say agencies run "$15K-$45K". For an entity-trust strategy, contradictory price facts are the cheapest thing to fix.
- "Updated June 2026" is a static stamp on 105/106 pages (1 says July 2026). Sitemap has no lastmod for any /pages URL (good, not faked), but the visible freshness label is four months old while files were last touched 2026-10-12.
- Hub metadata says "100 service pages"; the grid shows 106.

### 2.6 Sitemap, internal links, indexation, rankings

Sitemap and crawlability
- 106/106 are listed in app/sitemap.ts (priority 0.8, no lastmod); the live sitemap fetched via WebFetch lists 106 /pages/ URLs. Every route has a static page.tsx with a self-referencing canonical and no robots meta (`grep -l robots app/pages/*/page.tsx` = 0). robots.ts allows all crawlers, including OAI-SearchBot, ClaudeBot, PerplexityBot.
- No-JS content is visible (app/pages/layout.tsx adds a noscript override for the data-reveal opacity rule).

Internal linking (HTML hrefs only)
- The only sitewide path is footer "Pages" -> /pages (server-rendered card grid with 106 anchors, flat, with client-side filters). No category URLs, so there is no browsable hierarchy (the doorway-policy test).
- Homepage links /pages once; services pages and regional desks do not link to individual landing pages; only 5 of 122 playbook partials link to any /pages URL.
- Landing-to-landing: 47 of 106 pages receive 0 links from other landing pages; 46 receive no href from any partial other than the hub. Distribution of distinct landing pages linking in: 0 -> 47, 1 -> 30, 2 -> 15, 3 -> 7, 4 -> 4, 6 -> 1, 7 -> 1, 11 -> 1. web3-pr-agency is linked from 11 other landing pages (the maximum), most pages from 0 or 1.
- The link graph is effectively the template's mandatory 4 "xlink" cards per page (each page links 2 playbooks, 1 service, 1 sibling landing page).

Indexation sample (14 unique pages, exact-title queries restricted to shilikajain.com; the 5 `site:` queries were inconclusive)

| Page probed | Own URL returned? |
|---|---|
| /pages/web3-pr-agency | no (returned /playbook/best-web3-pr-agencies-2026, services, homepage) |
| /pages/token-launch-pr-agency | no (playbooks on token-launch cost and timeline) |
| /pages/ai-startup-pr-agency | no (/services/ai-startup-pr, blog, playbooks) |
| /pages/crypto-kol-marketing-agency | no (returned /services/kol-marketing and /pages/korea-kol-marketing-agency) |
| /pages/cybersecurity-pr-agency | no (returned /services/cybersecurity-pr and /pages/cybersecurity-analyst-relations-agency) |
| /pages/best-crypto-pr-agency | no (playbooks only) |
| /pages/crypto-pr-agency-korea | no (returned /apac, /pages/korea-kol-marketing-agency, playbooks) |
| /pages/korea-crypto-pr-agency | no (same set) |
| /pages/defi-pr-agency | no (/playbook/best-defi-pr-agency-2026 and blog) |
| /pages/web3-pr-agency-india | no (/playbook/best-web3-pr-agency-india-2026, /pages/depin-marketing-agency) |
| /pages/crypto-publicist | no (/playbook/crypto-publicist-vs-agency-2026) |
| /pages/crypto-press-release-service | no (playbooks only) |
| /pages/fractional-pr-consultant | no (playbooks, services) |
| /pages/geo-aeo-agency-crypto | no (playbook, blog, glossary) |

Result: 0 of 14 sampled pages returned for their own exact title; in every case a /playbook or /services page for the same intent returned instead. Four OTHER /pages URLs appeared incidentally across all probes: b2b-saas-pr-agency, cybersecurity-analyst-relations-agency, korea-kol-marketing-agency, depin-marketing-agency. So the site is indexed in that backend (dozens of other URLs returned across the probes) and at least 4 of 106 landing pages are known to be indexed; the other 102 are unverified. Extra signal: the search engine's own summary of the site calls it "one consultant's site" with "pricing inconsistent between pages".

Rankings: the owner's SERP panel (25 buyer prompts x 4 runs, Google SERP, files 2026-08-04, 08-14, 08-31, 09-25):

| Run | Prompts with a Shilika URL | /pages URLs among them |
|---|---|---|
| 2026-08-04 | 9/25 | 0 |
| 2026-08-14 | 7/25 | 0 |
| 2026-08-31 | 7/25 | 0 |
| 2026-09-25 | 13/25 | 0 |

Across the 4 runs the surfaced URLs are playbook 29, services 12, blog 3, /singapore 4 = 48 URL hits, 0 on /pages. The panel prompts are generic buyer questions, so this does not prove no /pages URL ranks for a long-tail variant (e.g. "crypto PR agency Vietnam"). It does prove that for E1 ("PR for a Web3 startup launching in Korea") the Korea landing pages, desk and playbook all failed to be the surfaced page, and that the winning pages are the ones that differ from the template. Whether any /pages URL has impressions is unverified until GSC is connected (query: Performance, Pages, filter URL contains /pages/).

### 2.7 Exposure under Google's spam policies

Sources fetched today: Google spam policies (developers.google.com/search/docs/essentials/spam-policies, shows last updated 2026-08-28) and the AI optimisation guide (developers.google.com/search/docs/fundamentals/ai-optimization-guide, last updated 2026-07-10). The guide says making separate pages for every query or fan-out variation to manipulate rankings or AI responses falls under the scaled content abuse policy, that a high page count does not make a site higher quality, and that unique, non-commodity content is the biggest factor. It also says llms.txt, special markup and content chunking give no benefit. The spam policies' doorway section covers pages built for specific, similar queries that funnel users to one destination (it lists region and city-targeted pages), and substantially similar pages outside a clear browsable hierarchy. The 24 Sep 2026 spam update is recorded in the owner's panel notes as confirmed on Google's status dashboard; I could only corroborate it from press coverage, not from Google's own page.

Scorecard (my judgement, not Google's):

| Factor | Evidence | Direction |
|---|---|---|
| One page per query variant | 106 pages from a keyword-variant table (8 service keys x 7 regions), generator brief, 68 with an existing canonical | pushes toward scaled content abuse |
| Same template and proof | 1 section sequence, 9 identical H2 slots, 6 case studies on every page | pushes toward abuse |
| Funnel to one destination | 106 pages end in the same intent form and the same Calendly link; region pages duplicate desks | doorway pattern |
| "Made for search" language | "Why this page exists" 106/106, "This page is built to be that answer/source" 79/106, fake "Ask AI" box 106/106 | adds to the pattern |
| Text uniqueness | median 3.6% near-match in authored copy, 0 pairs at or above 0.30 Jaccard | mitigates |
| First-hand specifics | real outlets, named cases, but identical proof set | partly mitigates |
| Traction | 0 of 48 panel hits, 0 of 14 probes | no evidence of value to users |
| Age | 14 to 16 weeks live | long enough to have shown something |
| Site-wide spill-over | The playbooks and services pages that DO win share the domain. Google does not publish whether spam classifiers act site-wide. Unverified, but the downside is losing the 13-of-25 surface the panel just earned | raises stakes |

Exposure level for /pages: HIGH. Reason: the pattern matches the named policy language on provenance and intent, and the only mitigation (varied sentences) is exactly what the policy says is not the test. Likelihood that Google has already filtered most of them (indexed but never shown): plausible, unverified.

### 2.8 Recommendation: keep / noindex / merge, with counts

Rule (explicit so it can be re-run with GSC data):
1. Cluster by search intent.
2. MERGE (301): head pages whose intent is already served by a /services page (8), same-intent variants of a kept page, and region variants that duplicate one of the 6 desks. 68 pages.
3. KEEP: the single best page per remaining intent, or a distinct segment (vertical, sub-service, buyer) with no same-intent sibling on the site. 26 pages.
4. NOINDEX-and-test (keep live for outreach and ads, remove from sitemap and hub, self-canonical, revisit in 90 days with GSC): distinct segments whose intent is already covered by a live playbook. 12 pages.
5. Tie-break: where a page is one of the 4 seen indexed (b2b-saas, cybersecurity-analyst-relations, korea-kol, depin-marketing), keep it as the cluster keeper. Two manual corrections were applied (defi-pr-agency and airdrop-marketing-agency moved from KEEP to NOINDEX because playbooks exist that the slug heuristic missed).

Counts: KEEP 26 / NOINDEX 12 / MERGE 68 = 106. Merge targets: 29 to /services pages, 21 to a kept /pages keeper, 14 to regional desks, 4 to playbooks. Net sitemap change: 106 -> 26 (plus 12 removed from sitemap while noindexed), a 75% cut. Do the 301s in next.config.ts `redirects()`, repoint the 4 mandatory xlink cards, fold any outlet-specific paragraph worth keeping (for example the KBW detail on korea-crypto-pr-agency) into the desk before redirecting.

Because none of the 68 merge pages has any demonstrated ranking, redirecting loses nothing measurable. If SJ wants evidence first, a 7-day GSC pull on /pages/ can overturn individual rows; do not wait on it for the 14 regional duplicates and the 8 head pages.

Full table (generated by triage.py, then two manual corrections):

| # | Page | Action | Target or reason |
|---|---|---|---|
| 1 | /pages/b2b-saas-pr-agency | KEEP | cluster keeper (merge target for sibling variants); seen indexed |
| 2 | /pages/crypto-exchange-listing-pr | KEEP | cluster keeper (merge target for sibling variants) |
| 3 | /pages/crypto-pr-agency-for-startups | KEEP | distinct segment (early-stage and budget), absorbs 2 budget variants |
| 4 | /pages/crypto-presale-marketing-agency | KEEP | cluster keeper (merge target for sibling variants) |
| 5 | /pages/crypto-press-release-distribution-service | KEEP | cluster keeper (merge target for sibling variants) |
| 6 | /pages/crypto-regulatory-pr | KEEP | distinct segment, no same-intent sibling |
| 7 | /pages/crypto-whitepaper-writing-service | KEEP | distinct segment, no same-intent sibling |
| 8 | /pages/cybersecurity-analyst-relations-agency | KEEP | distinct sub-service; seen indexed in the search probe |
| 9 | /pages/dao-pr-agency | KEEP | distinct segment, no same-intent sibling |
| 10 | /pages/deeptech-pr-agency | KEEP | distinct segment, no same-intent sibling |
| 11 | /pages/depin-marketing-agency | KEEP | cluster keeper; seen indexed |
| 12 | /pages/founder-media-training | KEEP | distinct segment, no same-intent sibling |
| 13 | /pages/founder-thought-leadership-agency | KEEP | distinct segment, absorbs executive-visibility |
| 14 | /pages/fractional-pr-consultant | KEEP | cluster keeper, absorbs 5 fractional and consultant variants |
| 15 | /pages/geo-aeo-agency-crypto | KEEP | distinct segment, absorbs ai-search-visibility |
| 16 | /pages/korea-kol-marketing-agency | KEEP | cluster keeper; seen indexed |
| 17 | /pages/layer2-pr-agency | KEEP | distinct segment, no same-intent sibling |
| 18 | /pages/linkedin-ghostwriting-for-founders | KEEP | distinct segment |
| 19 | /pages/memecoin-marketing-agency | KEEP | distinct segment |
| 20 | /pages/metaverse-pr-agency | KEEP | distinct segment |
| 21 | /pages/op-ed-ghostwriting-service | KEEP | cluster keeper, absorbs 4 ghostwriting variants |
| 22 | /pages/podcast-booking-agency-founders | KEEP | distinct segment |
| 23 | /pages/telegram-marketing-agency-crypto | KEEP | distinct segment, absorbs community-growth |
| 24 | /pages/threat-intelligence-pr-agency | KEEP | distinct segment |
| 25 | /pages/web3-investor-relations-agency | KEEP | distinct segment |
| 26 | /pages/web3-partnership-announcement-pr | KEEP | distinct segment |
| 27 | /pages/ai-thought-leadership-agency | NOINDEX | /playbook/ai-thought-leadership-pr-2026 |
| 28 | /pages/airdrop-marketing-agency | NOINDEX | /playbook/crypto-airdrop-pr-strategy-2026 |
| 29 | /pages/blockchain-gaming-pr-agency | NOINDEX | /playbook/blockchain-gaming-pr-2026 |
| 30 | /pages/crypto-exchange-pr-agency | NOINDEX | /playbook/crypto-exchange-pr-2026 |
| 31 | /pages/defi-pr-agency | NOINDEX | /playbook/best-defi-pr-agency-2026 |
| 32 | /pages/enterprise-ai-pr-agency | NOINDEX | /playbook/enterprise-ai-pr-2026 |
| 33 | /pages/fintech-ai-pr-agency | NOINDEX | /services/ai-startup-pr |
| 34 | /pages/healthcare-ai-pr-agency | NOINDEX | /playbook/healthcare-ai-pr-2026 |
| 35 | /pages/nft-pr-agency | NOINDEX | /playbook/nft-project-pr-2026 |
| 36 | /pages/rwa-tokenization-pr-agency | NOINDEX | /playbook/rwa-tokenization-pr-2026 |
| 37 | /pages/stablecoin-pr-agency | NOINDEX | /playbook/stablecoin-launch-pr-2026 |
| 38 | /pages/web3-infrastructure-pr-agency | NOINDEX | /playbook/web3-infrastructure-pr-2026 |
| 39 | /pages/affordable-crypto-pr-agency | MERGE | /pages/crypto-pr-agency-for-startups |
| 40 | /pages/ai-pr-agency | MERGE | /services/ai-startup-pr |
| 41 | /pages/ai-pr-agency-india | MERGE | /india |
| 42 | /pages/ai-pr-consultant | MERGE | /pages/fractional-pr-consultant |
| 43 | /pages/ai-publicist | MERGE | /services/ai-startup-pr |
| 44 | /pages/ai-search-visibility-agency | MERGE | /pages/geo-aeo-agency-crypto |
| 45 | /pages/ai-startup-pr-agency | MERGE | /services/ai-startup-pr |
| 46 | /pages/apac-crypto-pr-agency | MERGE | /services/apac-pr |
| 47 | /pages/apac-token-launch-pr | MERGE | /services/token-launch-pr |
| 48 | /pages/b2b-tech-pr-agency | MERGE | /pages/b2b-saas-pr-agency |
| 49 | /pages/best-crypto-pr-agency | MERGE | /playbook/best-web3-pr-agencies-2026 |
| 50 | /pages/best-web3-marketing-agency | MERGE | /playbook/best-web3-pr-agencies-2026 |
| 51 | /pages/binance-listing-pr-agency | MERGE | /pages/crypto-exchange-listing-pr |
| 52 | /pages/crypto-community-growth-agency | MERGE | /pages/telegram-marketing-agency-crypto |
| 53 | /pages/crypto-content-marketing-agency | MERGE | /services/content-writing |
| 54 | /pages/crypto-content-writing-agency | MERGE | /services/content-writing |
| 55 | /pages/crypto-founder-personal-branding | MERGE | /services/founder-profiling |
| 56 | /pages/crypto-ghostwriting-agency | MERGE | /pages/op-ed-ghostwriting-service |
| 57 | /pages/crypto-influencer-marketing-agency | MERGE | /services/kol-marketing |
| 58 | /pages/crypto-kol-agency-japan | MERGE | /pages/korea-kol-marketing-agency |
| 59 | /pages/crypto-kol-agency-korea | MERGE | /pages/korea-kol-marketing-agency |
| 60 | /pages/crypto-kol-marketing-agency | MERGE | /services/kol-marketing |
| 61 | /pages/crypto-marketing-agency-india | MERGE | /india |
| 62 | /pages/crypto-pr-agency-dubai | MERGE | /dubai-mena |
| 63 | /pages/crypto-pr-agency-japan | MERGE | /japan |
| 64 | /pages/crypto-pr-agency-korea | MERGE | /korea |
| 65 | /pages/crypto-pr-agency-singapore | MERGE | /singapore |
| 66 | /pages/crypto-pr-agency-small-budget | MERGE | /pages/crypto-pr-agency-for-startups |
| 67 | /pages/crypto-pr-agency-uk | MERGE | /services/web3-pr-campaigns |
| 68 | /pages/crypto-pr-agency-vietnam | MERGE | /apac |
| 69 | /pages/crypto-pr-consultant | MERGE | /pages/fractional-pr-consultant |
| 70 | /pages/crypto-press-release-service | MERGE | /pages/crypto-press-release-distribution-service |
| 71 | /pages/crypto-publicist | MERGE | /pages/fractional-pr-consultant |
| 72 | /pages/crypto-token-launch-marketing-agency | MERGE | /services/token-launch-pr |
| 73 | /pages/crypto-twitter-kol-marketing | MERGE | /services/kol-marketing |
| 74 | /pages/crypto-youtube-influencer-agency | MERGE | /services/kol-marketing |
| 75 | /pages/cybersecurity-marketing-agency | MERGE | /services/cybersecurity-pr |
| 76 | /pages/cybersecurity-pr-agency | MERGE | /services/cybersecurity-pr |
| 77 | /pages/cybersecurity-pr-agency-usa | MERGE | /services/cybersecurity-pr |
| 78 | /pages/depin-pr-agency | MERGE | /pages/depin-marketing-agency |
| 79 | /pages/executive-visibility-agency | MERGE | /pages/founder-thought-leadership-agency |
| 80 | /pages/founder-essay-ghostwriting | MERGE | /pages/op-ed-ghostwriting-service |
| 81 | /pages/founder-personal-branding-agency | MERGE | /services/founder-profiling |
| 82 | /pages/founder-pr-agency | MERGE | /services/founder-profiling |
| 83 | /pages/fractional-cmo-web3 | MERGE | /playbook/fractional-cmo-web3-2026 |
| 84 | /pages/fractional-head-of-pr | MERGE | /pages/fractional-pr-consultant |
| 85 | /pages/fractional-pr-consultant-web3 | MERGE | /pages/fractional-pr-consultant |
| 86 | /pages/generative-ai-pr-agency | MERGE | /services/ai-startup-pr |
| 87 | /pages/ico-ido-marketing-agency | MERGE | /pages/crypto-presale-marketing-agency |
| 88 | /pages/india-crypto-pr-agency | MERGE | /india |
| 89 | /pages/infosec-pr-agency | MERGE | /services/cybersecurity-pr |
| 90 | /pages/japan-crypto-pr-agency | MERGE | /japan |
| 91 | /pages/korea-crypto-pr-agency | MERGE | /korea |
| 92 | /pages/korea-japan-crypto-pr | MERGE | /korea |
| 93 | /pages/mena-crypto-pr-agency | MERGE | /dubai-mena |
| 94 | /pages/pr-agency-for-tech-startups | MERGE | /pages/b2b-saas-pr-agency |
| 95 | /pages/tge-pr-agency | MERGE | /services/token-launch-pr |
| 96 | /pages/thought-leadership-ghostwriting | MERGE | /pages/op-ed-ghostwriting-service |
| 97 | /pages/token-launch-marketing-agency | MERGE | /services/token-launch-pr |
| 98 | /pages/token-launch-pr-agency | MERGE | /services/token-launch-pr |
| 99 | /pages/token-launch-pr-agency-india | MERGE | /services/token-launch-pr |
| 100 | /pages/top-crypto-marketing-agency | MERGE | /playbook/best-web3-pr-agencies-2026 |
| 101 | /pages/web3-kol-agency | MERGE | /services/kol-marketing |
| 102 | /pages/web3-marketing-agency | MERGE | /services/web3-pr-campaigns |
| 103 | /pages/web3-pr-agency | MERGE | /services/web3-pr-campaigns |
| 104 | /pages/web3-pr-agency-india | MERGE | /india |
| 105 | /pages/web3-pr-agency-uae | MERGE | /dubai-mena |
| 106 | /pages/web3-pr-agency-usa | MERGE | /services/web3-pr-campaigns |

Caveats on the table: the sibling heuristic is slug-token overlap, so it can miss a playbook (it missed two, corrected) and can over-merge where the "agency" page serves a hire intent and the sibling serves a how-to intent. Review the 21 merges that point at /pages keepers and the 4 that point at playbooks before shipping. "web3-pr-agency" being merged into /services/web3-pr-campaigns will move the page that receives the most landing-to-landing links (11 other landing pages); repoint those.

Fixes that apply to the 26 survivors (cheap, do them regardless):
1. Remove "Why this page exists" and the "This page is built to be..." sentence; either delete the ".aeo-demo" box or relabel it as an illustrative example.
2. Make JSON-LD Offer match the visible price (or delete Offer); use one constant, for example `SHILIKA_PRICING` in app/compare/_data/shilika.ts, for every price on the site.
3. Replace "Updated June 2026" with a real date or remove it.
4. Add one piece of page-specific first-hand evidence per survivor (a named outlet list with dates, a real campaign timeline, a regulator reference) so the page is not the template plus nouns.

## 3. /compare (11 URLs: hub + 10 "Shilika Jain vs X" pages)

Status: committed in 30dd8aa (2026-10-15) and live today (WebFetch of /compare returned the hub; live sitemap lists the hub and 10 pages with lastmod 2026-10-15). Note: the brief called app/compare "untracked"; git shows it tracked in that commit. Only footer link `/compare` (components/site/EditorialChrome.tsx line 232) points to it; 0 of 122 playbook partials link to it. None of the 11 URLs surfaced in the "Shilika Jain vs Wachsman" probe (expected, they are hours old).

Content
- 10 agencies: Wachsman, Coinbound, MarketAcross, Luna PR, Melrose PR (crypto) and Highwire PR, Bospar, Inkhouse, Hotwire, SHIFT Communications (AI and tech). Per page: about 730 words of agency-specific data (652 to 913) plus about 320 words of shared template (30% shared). Pairwise 5-gram Jaccard across the 10 pages: median 0.195, max 0.261. This is hand-curated, sourced and varied; it is not a scaled-content problem. Each page lists 5 to 7 source URLs (company site, Clutch, trade press, O'Dwyer's, Glassdoor, Business Wire), hedged language ("No stated Korean, Japanese, Chinese or Gulf media teams", "reported from"), a "What X does well" section, a "Last verified October 2026" stamp and a corrections email.
- Accuracy spot checks I could do today (independent web search): Hotwire revenue fell 19% in FY26 (confirmed against Enero results coverage); an EBITDA fall of 33% to $7.4M appears in the investor announcement but the snippet did not name the segment, so treat it as likely rather than confirmed; the CEO transition is real though coverage dates the exit to July 2025 and the new appointment to a January; Highwire acquired The Bliss Group on 2026-01-14 with a combined 250+ staff (confirmed, O'Dwyer's and the press release); Luna PR announced its Singapore and Hong Kong push on 2026-08-11 (confirmed); Wachsman founded 2015 with roughly 100 to 150 staff and offices incl. Dublin, Singapore, Geneva (confirmed range; sources disagree on exact headcount, the page's "80-150" is hedged). NOT verified by me: Clutch ratings and review counts (Coinbound 5.0 from 14, MarketAcross 5.0 from 9), all Glassdoor scores (3.5, 3.5, 3.7, 3.2), the "$10K+ Clutch minimum", Luna's "six-month retainers", Melrose's "$8K a month" third-party figure, and all 6 "est." agency prices (Luna, Highwire, Bospar, Inkhouse, Hotwire, SHIFT) which are Shilika's own benchmark-based estimates, not published fees.

Problems, ordered by severity
1. Unsubstantiated claim repeated 11 times: "Agencies already hire Shilika ... Shilika is regularly that subcontractor." Appears as a callout on all 10 pages and in the hub FAQ ("Do agencies really subcontract freelancers? ... Shilika is regularly brought in this way"), and therefore inside FAQPage JSON-LD that AI engines quote. On a page named "Shilika Jain vs Wachsman" the reader infers the named firm lacks Asian reach and subcontracts it. I found no evidence on the site that supports it (no named agency, no case). This is the highest legal and reputation risk in the area (comparative advertising: a factual claim you must be able to prove). Not legal advice; have counsel look at it or remove it.
2. Employee-review inferences about named competitors: Glassdoor scores and gloss ("senior managers pushing work to junior staff", "high turnover", "heavy workloads and thin onboarding") for Highwire, Bospar, Inkhouse and SHIFT. These are opinion data from anonymous reviews, used to make a competitor look bad. Remove or reduce to the published numeric score with link; do not characterise.
3. Asymmetric scoring: the coverage matrix gives Shilika "2 = native, in-house media relationships" in 7 of 8 regions (UK and Europe 1) and gives competitors 0 where a team is merely "not evident". The matrix drives the "Native markets: X of 8" cards and the MarketFinder. The key at types.ts defines 0 as "not evident" but the page prints "Native markets" as a fact. Also "400+ working journalists" appears ONLY on the compare pages (4 files); the rest of the site says "100+ journalists" or "100+ working journalists" (grep of app/_partials, app/services, app/about, components), so /compare quotes a figure 4x the one used elsewhere. A new, unevidenced headline number introduced on the pages that invite the most scrutiny.
4. No conflict-of-interest line above the fold. The hub title is "Best Crypto & AI PR Agencies 2026, Compared | Shilika Jain" and the page ranks the competitors; the disclosure is only in the footer note ("Rankings reflect how often each firm appears in founder shortlists and public rankings, not a paid placement"), which is an unreproducible methodology. The hub's own FAQ also says "$10K-$15K a month at the entry level", at odds with "$15K-$45K" used across /pages.
5. Cannibalisation with the proven asset: the hub targets "best crypto PR agencies 2026", the same head term as /playbook/best-web3-pr-agencies-2026, which the panel shows as the single strongest page (6 of 25 prompts on 2026-09-25). Two same-intent self-ranked listicles split signals.
6. Title demand mismatch (unverified, no keyword data available): "Shilika Jain vs Wachsman (2026): Cost, Team & Market Reach" matches a query nobody searches. The searched forms are "Wachsman alternatives", "Coinbound vs ...", "Highwire alternatives". 
7. The pages are desk research from public sources; Google's guidance rewards first-hand experience. Fine for an "alternatives" page if the author's own perspective is explicit; currently it reads as neutral.

Spam-policy exposure: LOW (10 distinct, sourced pages; do not scale beyond about 15). Legal and reputational exposure: MEDIUM until items 1 to 3 are fixed. Recommendation: KEEP all 11 indexed; fix items 1 to 4 this week; retitle for "alternatives"; decide which of hub vs playbook owns "best" and canonicalise or differentiate.

## 4. /tools (28 free tools + 3 legacy tools + hub)

- Data from app/tools/_data/free/*.ts exported with node --experimental-strip-types: 28 free tools (everyday 8, seo 7, calculators 6, pr 7). Live sitemap shows 31 /tools/ URLs (the 28 plus gtm-planner, marketing-budget-calculator, marketing-checklist).
- Uniqueness: 0 duplicate titles, descriptions or blurbs; 84 FAQs (3 per tool) with 0 repeated questions or answers; max pairwise 4-gram Jaccard of the static text 0.031. Static server-rendered text per tool (intro, 3 steps, 3 FAQs): min 168, median 204, max 234 words. Thin as prose, but these are interactive utilities, where the value is the widget; no near-duplicates.
- Gating: none. `EmailResult.tsx` is an optional "email me this result" box ("Never blocks using the tool"), `/resources` says "no email gate", and the legacy tools have no email code. WebFetch of /tools/utm-builder returned the H1, all form labels (Website URL, utm_source, utm_medium, utm_campaign...), the how-to and FAQ with no gate and no bot challenge, so crawlers see the content (tool components are 'use client' but server-render their initial markup).
- Markup: SoftwareApplication/WebApplication + FAQPage + BreadcrumbList per tool, price 0, creator Shilika Jain. FAQ rich results are not expected to show for a commercial consulting site (Google restricted them in 2023, from memory, not re-verified today), so FAQPage here has no visible upside and is harmless.
- Discovery: of 5 tool queries run, only /tools/press-release-generator surfaced (twice). utm-builder, llms-txt, ai-citability and schema generators did not. That is in line with competing against large utility sites.
- Fit: 8 of the 28 serve a generic marketer rather than a Web3, AI or cybersecurity founder: qr-code-generator, hashtag-generator, bio-and-caption-generator, character-counter, social-image-resizer, image-compressor-converter, utm-builder, email-subject-line-tester. They are legitimate, distinct tools, so I rate the exposure LOW, but they dilute topical focus and will not out-rank dedicated tool sites. The CTA copy (cta.ts) routes each tool to a matching /services page, which is good internal linking.
- Recommendation: KEEP all 28 + 3. Freeze the count (do not add a 29th tool per keyword). Keep 20 on-ICP tools in the footer and hub; consider noindex only for the 8 above if the domain shows volatility after the spam update. Add a visible "last updated" only where a real change was made. Note that Google's guide says llms.txt files give no Google benefit, so the llms.txt generator should not be sold as a ranking tool.

## 5. /glossary (hub + 5 terms) and /resources

Glossary
- 5 terms: what-is-fractional-pr, what-is-geo-generative-engine-optimization, what-is-a-tge-comms-plan, what-is-aeo-answer-engine-optimization, what-is-a-kol-wave. Body 271 to 391 words each, plus 4 FAQs each, a front-loaded ~50-word definition, DefinedTerm + DefinedTermSet + FAQ schema, datePublished and dateModified 2026-06-22 and 2026-06-28.
- Indexed evidence: /glossary/what-is-a-tge-comms-plan and /glossary/what-is-aeo-answer-engine-optimization and the hub all surfaced in probes. 
- Risks: low. Only 5 terms, so no scale issue. Intent overlap on GEO/AEO is high (glossary x2, /pages/geo-aeo-agency-crypto, /pages/ai-search-visibility-agency, 2 playbooks, 2 blog posts, the AI citability tool, a GEO checklist PDF): 8 or more URLs for one theme; the merge table above handles the two landing pages. The data file comment calls the entries "answer-engine bait", which is the wrong frame given Google's guide; irrelevant to users but worth rewording.
- Recommendation: KEEP. Add 5 to 10 more terms only where there is real first-hand content (for example "TGE embargo", "APAC press window").

Resources
- /resources lists 12 free downloads (10 PDFs, 2 XLSX) in public/resources/, direct links with the `download` attribute, JSON-LD collection, no email gate. Files are crawlable (PDFs can be indexed). Inbound links: tool pages, /apac, /india; not in the footer.
- Risk: low. They are generic marketing templates (startup marketing checklist, 20-channel playbook, budget template) rather than Web3, AI or cyber PR, except the press kit, pitch-email, media-list, agency scorecard and GEO checklist. One of them, the GEO checklist, promotes llms.txt, which Google says does nothing for Google.
- Recommendation: KEEP. Consider an HTML landing page per PR-specific resource (5 of 12) so they can rank as pages and carry FAQ text, rather than only as PDFs.

## 6. What is working

1. Text-level uniqueness is genuine: median 1,174 unique words per landing page, 529 of 530 FAQ answers distinct, 0 pairs above 0.30 Jaccard.
2. All 106 landing pages are technically sound for crawl: sitemap, self-canonicals, no accidental noindex, content visible without JS.
3. The pages that do win (per the owner's panel) are playbooks, /services/ai-startup-pr, /services/kol-marketing, /services/content-writing and /singapore: specific, opinionated, non-template. The 09-25 run surfaced 13 of 25 prompts.
4. /compare is well sourced and hedged, and several facts check out against independent sources.
5. The 28 tools are unique, free, ungated, server-rendered and route to matching services.
6. Glossary is small, first-hand and already indexed.
7. A thin-content audit script exists (scripts/thin-content-audit.mjs) and the team re-measures monthly.

## 7. What is not working

1. 0 of 48 SERP-panel URL hits and 0 of 14 exact-title probes are /pages URLs; the same-intent playbook or service page wins instead.
2. 68 of 106 pages duplicate an intent already served by a /services, desk or playbook URL; 59 have a slug-level sibling.
3. The scaled, template-cloned, "built to be the answer" construction matches Google's scaled content and doorway language (Section 2.7).
4. JSON-LD price (5000-12000) contradicts the visible $3K-$7K on at least 101 pages; the site quotes at least five fractional price bands.
5. Static "Updated June 2026" labels, a fake "Ask AI" demo on every page, and a hub page that describes itself as pages "built to be the answer".
6. Weak internal linking: 46 pages reachable only via the hub, home and services pages do not link to them.
7. /compare carries an unproven subcontractor claim (11 placements), Glassdoor-based characterisations, and an unevidenced "400+ journalists" number.
8. The earlier audit (2026-08-09) concluded KEEP 106 by measuring sentence uniqueness; the program's guardrail "no page-per-query-variant" was not applied to this cluster.

## 8. Risks

- R1 Spam update spill-over: a spam classifier hit on the /pages cluster could depress the playbooks and services that currently win. Google does not say if it acts site-wide; unverified.
- R2 The 24 Sep 2026 spam update window (rolled out through about 2026-10-08 per the panel notes) has passed with no GSC visibility into whether any /pages URL lost impressions.
- R3 Structured-data mismatch on 101 pages (price) could be treated as misleading markup.
- R4 Fake "Ask AI" answers could be read as fabricated testimonials.
- R5 /compare subcontractor claim and Glassdoor characterisations: defamation and false-advertising exposure (not legal advice).
- R6 Pricing inconsistency is already surfaced by AI engines as a reason to discount the site's claims.
- R7 Unpushed work: git status shows about 30 modified partials and i18n files locally; the 2026-10-01 verification found that local fixes had not reached production. Ship the pruning as one reviewed deploy, not on top of unreviewed changes.
- R8 curl is served the Vercel Security Checkpoint (403, x-vercel-mitigated: challenge) from this IP. If the same rule challenges non-Google crawlers or AI user agents, AI SEO work is invisible to them. Unverified for crawlers; check Vercel Firewall, Attack Challenge Mode and bot protection allow verified bots and the AI bots listed in robots.ts.

## 9. Recommendations (priority order)

1. (code, high, medium) Execute the triage in 2.8: 301 the 68 merge pages in next.config.ts, add `robots: { index: false }` to the 12, remove 80 URLs from app/sitemap.ts, shrink the PagesIndex grid to the 26 (and fix "100 service pages"). Review once, deploy once.
2. (code, high, small) On the surviving pages remove "Why this page exists", the "built to be that answer" sentence and the unlabelled "Ask AI" box; replace with one page-specific proof block.
3. (code, high, small) Make JSON-LD Offer, visible prices and /compare agree; define one price constant and one agency-range statement for the whole site.
4. (code, high, small) /compare: delete or evidence the subcontractor claim (10 pages + hub FAQ + JSON-LD), drop Glassdoor characterisations, evidence or delete "400+ journalists", add a top-of-page disclosure, retitle toward "alternatives", decide hub vs /playbook/best-web3-pr-agencies-2026.
5. (measurement, high, small) SJ connects GSC and pulls /pages/ impressions for the last 16 weeks; it can overturn any row of the table. Run real Google `site:shilikajain.com/pages/` and the 12-URL check. Then re-run the SERP panel with 10 prompts built from landing-page head terms (for example "crypto PR agency Korea", "DeFi PR agency").
6. (code, medium, small) Remove the stale "Updated June 2026" stamps or tie them to real edits; keep sitemap lastmod only for real changes.
7. (code, medium, medium) After pruning, add contextual links from /services, desks and the 5 strongest playbooks to the 26 survivors (currently 46 pages have no inbound link beyond the hub).
8. (off-site, high, large) SJ: the panel shows head terms are lost to third-party listicles; no on-site page count will change that. Spend the effort on inclusion in "best X PR agency" lists and referring domains.

## 10. Raw evidence index

- dup_out.txt, dup2_out.txt: duplication outputs quoted above.
- triage_final.json, triage_table.md: the 106-row decision table.
- tools.json, agencies.json: exported tool and compare datasets.
- Google pages fetched: developers.google.com/search/docs/fundamentals/ai-optimization-guide (last updated 2026-07-10); developers.google.com/search/docs/essentials/spam-policies (last updated 2026-08-28).
- Owner data used: data/site-audit/2026-08-09-thin-content-audit.md; data/ai-citation-panel/results/serp-discoverability/2026-08-04.csv, 08-14, 08-31, 09-25; data/ai-citation-panel/summary/2026-09-25-serp-panel-analysis.md, 2026-10-01-production-state-verification.md, 2026-08-14-day90-report.md.


## 11. Addendum, re-verification on 2026-10-16 (after the usage-limit interruption)

The report above was completed on 2026-10-15. On resuming I re-checked the load-bearing numbers against the current working tree. No pages__*, app/pages, app/compare, app/tools or landing-pages.json file is modified in `git status`, so the audited content is unchanged since commit 30dd8aa.

| Check | Command or source | Result |
|---|---|---|
| Landing page count | `ls app/_partials/pages__*-body.html \| wc -l`; same for jsonld, app/pages folders; data/landing-pages.json length | 106 / 106 / 106 / 106 |
| Duplication script reproducible | `python3 dup.py` diffed against dup_out.txt (first 30 lines) | identical (median Jaccard 0.108, max 0.281, 0 pairs at or above 0.30) |
| Triage counts | recount of triage_final.json | KEEP 26, NOINDEX 12, MERGE 68; merge targets 29 services, 21 /pages keeper, 14 desk, 4 playbook |
| "Why this page exists" | grep | 106/106 |
| ".aeo-demo" block | grep | 106/106 |
| "Updated June 2026" | grep | 105/106 |
| "This page is built to ..." | grep | 79/106 (exact "built to be that answer": 48) |
| robots meta on /pages routes | `grep -l robots app/pages/*/page.tsx` | 0 (all indexable, none noindexed) |
| Visible price | grep of bodies | "$3K-$7K/month" style range present in 106/106 (some use an en dash in the source) |
| JSON-LD Offer price | walk of 106 pages__*-jsonld.json | 100 pages 5000-12000 per MONTH, 1 page 5000-12000 per PROJECT, 5 others use other ranges; none matches the visible $3K-$7K |
| /compare subcontractor claim | `grep -rn subcontract app/compare` | present in hub FAQ (page.tsx:55-56), the shared Shilika data file (_data/shilika.ts:102) and the per-agency callout ([slug]/page.tsx:202-206), so on all 10 agency pages and the hub FAQ JSON-LD |
| "400+ journalists" | grep across repo | only in 4 files under app/compare; elsewhere the site says 100+ |
| Glassdoor characterisations | grep app/compare/_data/ai.ts | lines 46, 248, 453, 479 (Highwire, Inkhouse, SHIFT, plus SHIFT body copy) |
| Sitemap | app/sitemap.ts | /pages and 106 landing URLs at priority 0.8 without lastmod; /compare hub and 10 pages with lastModified = LAST_VERIFIED_ISO; 4 legacy tools plus 28 free tools |
| robots.ts | read | `*` allow /, plus explicit allow for 9 AI crawlers, disallow only /admin and /api/admin and /api/cron |

Extra indexation probes run on 2026-10-16 (WebSearch limited to shilikajain.com; the `site:shilikajain.com/pages` query again returned zero shilikajain.com results and unrelated "Shilpi Jain" pages, so the operator is not honoured by this backend):
- "crypto PR agency Vietnam Shilika Jain" returned /playbook/apac-pr-playbook-2026, /playbook/crypto-pr-cost-2026, /apac, the homepage, and other playbooks. /pages/crypto-pr-agency-vietnam did NOT return.
- "memecoin marketing agency Shilika Jain" returned /pages/korea-kol-marketing-agency and /pages/depin-marketing-agency (both already on the known-indexed list), /services/kol-marketing and playbooks. /pages/memecoin-marketing-agency did NOT return.
- "Shilika Jain vs Wachsman cost team market reach" returned only playbooks and services; no /compare URL (the compare pages are under two days old at the time of the probe, so this is expected and not evidence of a problem).
- Updated totals: 16 distinct /pages URLs probed by exact or topical query, 0 returned for their own query; the same 4 other /pages URLs are the only ones ever seen incidentally (b2b-saas-pr-agency, cybersecurity-analyst-relations-agency, korea-kol-marketing-agency, depin-marketing-agency; the last two were re-seen today). The engine summary again flagged "Pricing (inconsistent across her pages)" and that "her ranking of competitors in her own best agencies guide favors herself", the exact perception risk the /compare hub inherits.
- Still unverified: whether any /pages URL has Google impressions; the 102 pages never seen indexed may be indexed but unreturned. GSC is the only way to settle it.
