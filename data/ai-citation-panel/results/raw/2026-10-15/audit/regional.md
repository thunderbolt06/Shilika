# Regional desks audit: /singapore, /korea, /japan, /dubai-mena, /india, /apac, /services/apac-pr

First pass: 2026-10-15. Continuation and re-verification pass: 2026-10-16 (after a usage-limit interruption). Auditor: Claude Code subagent.
Repo state: branch main, HEAD 30dd8aa equals origin/main (the /compare section, deployed to production 2026-10-15 12:10 UTC). The working tree still holds 34 uncommitted files (Runs 86 to 88: Singapore, /services/apac-pr, JSON-LD, sitemap, home/services/i18n edits).
Nothing inside the repo was modified. Scratch files are under `.../scratchpad/audit/` (`live/` and `regional2/` hold HTML and text snapshots).

How to read confidence tags used below:
- RE-CONFIRMED 10-16 = I independently reproduced it in this pass (command or search shown).
- PRIOR PASS = found in the first pass, not re-tested.
- UNVERIFIED = no evidence either way. Anything about Google indexation is UNVERIFIED because Search Console is not connected and Ahrefs is unavailable.

## 0. Bottom line

1. Only /singapore has ever surfaced on a Google-style SERP, and it does so for the APAC prompt E3 (the panel has no Singapore prompt). /korea, /japan, /dubai-mena and /india never surfaced for their home prompts in any of the four dated panel runs (2026-08-04, 08-14, 08-31, 09-25). RE-CONFIRMED 10-16 from the CSVs.
2. Search-index probe, reproduced today: exact-title queries restricted to shilikajain.com return /singapore first, and do NOT return /korea, /japan, /india or /dubai-mena (their sibling playbooks and /apac come back instead). All six titles have been unchanged since 2026-06-12 (India and Dubai since 06-04), so the probe is a fair test of anything crawled after mid-June. This points to non-indexation or very weak indexation of four desks. It is NOT proof: the tool is not Google. The decisive check is Search Console URL Inspection (SJ action).
3. It is not a crawl block or a thin-content problem. All desks return 200, are prerendered, have self-canonicals, hreflang, sitemap entries, `index, follow`, and are linked from the footer of every editorial page. They are 2,853 to 4,281 words, deeper than anything in the live SERPs for Japan or India.
4. What is wrong, in order of how much it plausibly matters: (a) the cluster is fragmented: Korea has 11 country-specific URLs on one intent, India 11, Japan 7, Dubai/MENA 7, Singapore 5 (the one that works); (b) the head of each desk does not match the buyer query and the SERP winners are ranked comparison listicles; (c) proof is weak or broken (no named Korea, Japan or Singapore case; TokenPost proof link is a 404; BloomingBit proof link is an unrelated June 2024 DAI article); (d) every live desk carries time-sensitive facts that are now past or wrong (section 8); (e) pricing contradicts the playbooks.
5. The zh/ko/ja/es/ru locale launch (2026-10-13) did not cause the gap: the desks were absent before the locales existed and canonical/hreflang are correct. It does multiply every stale fact into five languages, and the ko/ja titles still carry "KBW Seoul" and "WebX Tokyo July 2026".
6. Cross-cutting: JSON-LD on all six desks (and on 260 page.tsx files, including the homepage) is not in the server HTML as a real `<script type="application/ld+json">`. It is queued through `self.__next_s.push(...)` and appears only after JavaScript runs. RE-CONFIRMED 10-16 (0 real tags in every live snapshot).
7. New in this pass: /api/markdown and `.md` alternates exist for blog posts only. The desks have no machine-readable alternate (`/korea.md` returns 404), and there is no AI-engine citation data at all for any regional page (the only ChatGPT file in the panel is a fixture).
8. The strongest page on the site links to none of the desks except through the footer (0 body links, 1 footer link each).

Health score for this area: 3.5 / 10.

## 1. Scope, method and limits

Routes: /apac, /korea, /japan, /india, /singapore, /dubai-mena, /services/apac-pr, plus the 106 `/pages/*` landing pages (about 20 country or region specific), 9 country playbooks, about 20 region-related blog posts, and the locale routes (`app/[locale]/[[...path]]`, driven by `lib/i18n/config.ts`).

What I did in the continuation pass (all read-only):
- Re-fetched the 7 live pages (curl, one request at a time, 2 second gaps, generic UA) and diffed visible text against the first-pass snapshots: only difference is a new "Compare Agencies" footer link (the /compare deploy). Desk content is unchanged, so the first-pass live-content findings still apply to production.
- Re-grepped the live text for every stale claim in section 8.
- Reproduced the exact-title index probe for 5 desks and ran head-term and panel-prompt searches for Korea, Japan, Dubai, India, Singapore and APAC.
- Fetched top competitors the first pass could not reach (Singapore: ICODA, buildd, ACN Newswire; Dubai: Coinbound).
- Independently searched 12 external facts (events, laws, IPO timeline).
- Re-counted internal links, proof links, source hosts, cluster sizes, pricing, title history and deploy dates.

Limits (not worked around):
- Search Console and Ahrefs unavailable (instructed not to retry). No impressions, clicks, positions or index status. All indexation statements are inference.
- WebSearch is not Google (US-only, own index). `site:` is not honoured; `allowed_domains: ["shilikajain.com"]` was used as the probe.
- mexc.com refuses connections from this machine for both curl and WebFetch (ECONNREFUSED, re-tested 10-16). It is the syndicated listicle (`/news/728020`) that appears in the Korea, Japan, Singapore and Asia result sets, so it is described from snippets only.
- First pass: after about 100 rapid requests with spoofed crawler user agents, the site returned a Vercel Security Checkpoint 403. On 10-16 about 10 polite requests all returned 200 (including /llms.txt), so that was most likely a rate or UA reaction to my own pattern, not a crawler block. SJ should still glance at Vercel Firewall logs for challenged verified bots. Not re-tested with spoofed UAs.
- No head-term SERP can be read as Google. No AI-engine panel exists for regional pages.

## 2. What the SERP panel recorded (Google-style, one query per prompt)

Source: `data/ai-citation-panel/results/serp-discoverability/*.csv`; prompts in `data/ai-citation-panel/prompts.json`. Verified with:
```
grep -E '^E[1-5],' data/ai-citation-panel/results/serp-discoverability/2026-0{8-04,8-14,8-31,9-25}.csv
```
Prompts: E1 "Who is the best PR consultant for a Web3 startup launching in Korea in 2026?"; E2 "Who runs crypto PR in Japan in 2026 and what does it cost to hire them?"; E3 "Who runs APAC crypto PR for Web3 and AI founders in 2026?"; E4 "What does Dubai and MENA Web3 PR cost and which firms run it?"; E5 "Who runs Web3 and AI PR for Indian founders in 2026?"

| Prompt | 08-04 | 08-14 | 08-31 | 09-25 | Shilika URL that surfaced | Desk surfaced? |
|---|---|---|---|---|---|---|
| E1 Korea | no | no | no | yes (~5) | /playbook/best-web3-pr-agencies-2026 | never |
| E2 Japan | no | no | yes | yes (~3) | /playbook/crypto-pr-cost-2026 | never |
| E3 APAC | yes (~8) | yes (~7) | yes (~4) | yes (~3) | /singapore (plus best-web3 on 09-25) | /singapore only; never /apac or /services/apac-pr |
| E4 Dubai/MENA | yes | no | no | no | /playbook/crypto-pr-dubai-mena-2026 (08-04 only) | never |
| E5 India | no | no | no | no | none | never |

Notes:
- No Singapore prompt exists. /singapore ranks for the broader APAC prompt and improves each run (about 8, 7, 4, 3).
- E1 and E2 "surfaced" came from generic playbooks answering half the query, not from the country desks (the panel's own notes say so).
- Winners named in the panel notes are named local specialists plus listicles: Paradigm PR (Korea), BlockBuzz PR and Advent PR/Madchatter/Adfactors (India), local MENA agencies. Recurring domains: icoda.io, eakdigital.com, highvibepr.com, eakwire.com, crypticweb3.com, coinbound.io, cryptodaily.co.uk, clutch.co.
- Timing nuance (new): production deploy log shows desks first deployed 2026-06-04 (commit 9a63072), then NO production deploys between 2026-07-21 and 2026-09-25, then the current desk copy (answer-first, cost front-loaded) deployed 2026-10-01 (89b25f5). All four panel runs therefore measured the June versions of the desks. There is no post-10-01 SERP measurement. The index probe (section 3) is the only post-refresh evidence, and it still shows four desks absent.
- Panel prompts are long natural-language questions. The panel never tested the short head terms buyers type.

## 3. Indexation probe (reproduced 2026-10-16)

Method: WebSearch with `allowed_domains: ["shilikajain.com"]`, exact current page title as the query. A page that is in the tool's index should come back first.

Fresh run today (5 queries):

| Query (exact current title) | /desk returned? | What came back instead |
|---|---|---|
| Korea Web3 & AI PR 2026: BloomingBit, TokenPost, KBW Seoul | NO | /apac, /playbook/apac-pr-playbook-2026, /playbook/apac-press-windows-2026 |
| Japan Web3 & AI PR 2026: CoinPost, Nikkei, WebX Tokyo | NO | /apac, /playbook/apac-pr-playbook-2026, best-crypto-press-release-services |
| India Web3 & AI PR 2026: Inc42, Economic Times, Forbes India | NO | /playbook/best-web3-pr-agency-india-2026, /playbook/ai-startup-pr-agency-india-2026, /apac |
| Dubai & MENA Web3 / AI PR 2026: VARA, ADGM, RAK DAO | NO | /playbook/crypto-pr-dubai-mena-2026, /apac, /blog/mena-crypto-pr-playbook..., /singapore |
| Singapore Web3 & AI PR 2026: BT, DealStreetAsia, Token2049 | YES, first | /singapore, /apac |

First pass (not re-run): about 30 further probes, including phrases that exist only on one desk ("Toss 24 KRW stablecoin trademarks", "foreign trust-type stablecoins June 1 2026", "RAK DAO 48 hours AED 7,500", "Bullieverse $4M seed Economic Times exclusive"), Korean and Japanese title queries for /ko/korea and /ja/japan, and exact titles of nine /pages and playbook variants. None of the Korea/Japan/India desks, nor the locale copies, nor the exact-match /pages variants came back. /singapore and /apac came back repeatedly; /singapore showed two title snapshots, meaning it was crawled both before and after its 2026-06-12 title change.

Fairness check (new): title history from git. Korea changed 06-12, Japan 06-12, Singapore 06-12, India and Dubai and APAC never changed after 06-04. So an index that crawled any desk after 2026-06-12 would hold today's title; the absence is not an artefact of old titles.

Head-term and panel-prompt searches today (same tool, no domain filter): "crypto PR agency Korea", "crypto PR agency Japan", "crypto PR agency Dubai", "crypto PR agency Singapore", "web3 PR agency India", "APAC crypto PR agency ...", "best crypto PR agencies in Asia 2026", plus E1, E3 and E5 verbatim. No shilikajain.com URL appeared in any top-10 for the head terms. The verbatim E3 prompt surfaced Shilika's dev.to profile (an off-site entity asset) rather than any desk.

Interpretation, ranked (all UNVERIFIED until Search Console):
1. "Discovered" or "Crawled, currently not indexed" for the Korea/Japan/India/Dubai desks and their /pages variants: a quality, priority or consolidation judgement on a 704-URL site (610 non-locale plus 105 locale URLs in the sitemap, about 20 percent of the non-locale set being country or region variants).
2. Indexed but suppressed so far that exact-title queries fail (less likely).
3. Tool index lag (cannot be excluded, but /singapore shows the tool re-crawls this site).

Decisive check (SJ): Search Console URL Inspection plus Page indexing report for the six desks, four exact-match /pages variants, /ko/korea and /ja/japan.

## 4. Technical checks

```
curl (generic UA, 2026-10-16):  korea 200 135,295 B | japan 200 144,306 | dubai-mena 200 123,850 | india 200 114,457
                                singapore 200 121,169 | apac 200 122,132 | services/apac-pr 200 160,518
curl -s https://www.shilikajain.com/llms.txt   -> 200, 162,869 B, content-type text/markdown (745 lines)
curl -s https://www.shilikajain.com/korea.md   -> 404
```
- Headers (first pass): `x-vercel-cache: HIT`, `x-nextjs-prerender: 1`, no `x-robots-tag`. robots.txt allows all and lists AI bots. Meta robots `index, follow`, self-referencing canonical, reciprocal hreflang (en, zh-Hans, ko, ja, es, ru, x-default) on every desk and locale copy.
- Live sitemap: 704 `<url>` entries. Desk lastmods live: /apac 2026-10-12, /india 09-03, /singapore 09-06, /dubai-mena 09-02, /korea 09-04, /japan 09-29; /services/apac-pr has no lastmod and no alternates live. Local (unpushed) sitemap.ts sets /singapore 10-15 and /services/apac-pr 10-14.
- Titles 66 to 75 characters (truncated in SERPs). Meta descriptions 142 to 154. RE-CONFIRMED.
- JSON-LD delivery, RE-CONFIRMED: zero real `<script type="application/ld+json">` tags in the server HTML of all 7 pages; each contains `self.__next_s=self.__next_s||[]).push([0,{"type":"application/ld+json",...` instead. Cause: `<Script strategy="beforeInteractive">` inside page components (`grep -rl beforeInteractive app --include=page.tsx | wc -l` = 260; Next.js 15.5). Even the homepage schema sits in the RSC payload. Googlebot renders JS and usually picks this up later; non-rendering crawlers (most AI search fetchers) never see FAQPage, ProfessionalService, Person or areaServed. The visible FAQ text is in the HTML. Fix: emit a plain `<script type="application/ld+json" dangerouslySetInnerHTML>` from the server component. Severity: medium for AI/GEO reach; it is not the reason Google leaves four desks out.
- Schema date drift: /japan JSON-LD `dateModified` 2026-06-03 vs page "UPDATED SEP 2026" vs sitemap 2026-09-29 (PRIOR PASS).
- Machine-readable alternates: markdown routes exist only for `/blog/:slug` (`next.config.ts` rewrites and headers). /llms.txt lists all six desks and /services/apac-pr with descriptions but no markdown alternate for them (blog entries have one).
- Locale pages carry `<html lang="en">` in server HTML; lang is rewritten client-side (minor, PRIOR PASS).

## 5. Internal links into each desk

Re-counted 2026-10-16 across `app/_partials/*.html` and TSX (exact path, footer component excluded). Counts match the first pass exactly.

| Desk | Inbound link instances | From N files | Most common anchors |
|---|---|---|---|
| /korea | 27 | 20 | "Korea country desk" x7; "Country - NEW - 10 min Korea PR: FSC, DABA, KRW-stablecoin, KBW 2026" x5; "Korea desk" x2 |
| /japan | 25 | 18 | "Japan country desk" x7; "Country - NEW - 11 min Japan PR: FSA, FIEA, WebX Tokyo, NISA spot ETF" x6 |
| /india | 29 | 22 | "India country desk" x8; "India desk" x3 |
| /dubai-mena | 27 | 18 | "Dubai & MENA regional desk" x7 |
| /singapore | 21 | 16 | "Singapore country desk" x7 (fewest body links, yet the only desk that works) |
| /apac | 16 | 11 | "APAC" x6 |
| /services/apac-pr | 83 | 41 | "APAC PR service" x19 |

Findings:
- Link quantity is adequate and not the differentiator (Singapore has the fewest). Anchor quality is weak: internal jargon ("country desk", card titles with "NEW" and read time), never the query a buyer types.
- RE-CONFIRMED: the strongest page, /playbook/best-web3-pr-agencies-2026 (6 of 25 panel prompts), has 0 body links to any desk and exactly 1 footer link to each. That is the cheapest authority transfer available.
- CORRECTION to the first pass: /apac does link directly to every desk (country cards, "Korea desk"/"India desk" links, card list). Only the Korea and Japan rows of its "six-market weight" table point at `/services/apac-pr#korea` and `#japan`. The weakness is smaller than first stated.
- /japan and /korea bodies carry no links to /work/* case studies (0). /dubai-mena links /work/mantra-chain; /india links /work/bullieverse.

## 6. Depth, duplication and cluster fragmentation

Live visible words: korea 3,838, japan 4,283, dubai-mena 3,315, india 2,855, apac 3,162, singapore 3,090, services/apac-pr 4,685. Each has one H1, 7 FAQs, an outlet table, a day-by-day sprint, an events calendar and a regulation section. Substantive, not thin.

Template similarity (8-gram shingle containment, PRIOR PASS): the five country desks share about 8 to 18 percent with each other (same H2 skeleton and sprint structure, 80 to 90 percent unique text), not near-duplicates. /apac vs /services/apac-pr: 37 and 24 percent shared, near-identical H1 and near-identical titles ("APAC PR Agency 2026: Korea, Japan, India, Singapore, MENA" vs "APAC Crypto PR 2026: Korea, Japan, Vietnam, India, MENA"). `/pages/*` country variants overlap about 24 to 27 percent (6-gram) with the same H2 skeleton ("Where the stories land.", "From first call to X, in four moves.", "Six years. Numbers, not adjectives.").

Calibration: 25 percent boilerplate overlap is not duplicate content. The problem is intent fragmentation, not duplication.

New this pass: URLs competing for each country's intent (sitemap plus /llms.txt blog list; 610 non-locale URLs, 299 blog posts):

| Country | Country-specific URLs | Composition |
|---|---|---|
| Korea | 11 | desk, 5 /pages, 2 playbooks, 3 blog posts |
| India | 11 | desk, 5 /pages, 3 playbooks, 2 blog posts |
| Japan | 7 | desk, 4 /pages (one shared with Korea), 1 playbook, 1 blog post |
| Dubai/MENA | 7 | desk, 3 /pages, 1 playbook, 2 blog posts |
| Singapore | 5 | desk, 1 /page, 1 playbook, 2 blog posts |
| APAC generic | 15 | hub, service page, 2 playbooks, 2 /pages, 9 blog posts |

The one desk that works is in the least fragmented cluster; the two most fragmented clusters (Korea, India) are the ones whose desks are most absent. n=5 and the order is not monotonic (Japan has 7 and is absent), so treat this as a hypothesis, not a finding. It is consistent with the panel results where generic playbooks, not desks, win E1 and E2. The 2026-09-25 panel analysis states the program avoids "page-per-query-variant"; the sitemap shows the `/pages/*` cluster is exactly that pattern for countries.

Source quality (new, hypothesis only): external sources cited in the desk bodies. /singapore is the only desk citing regulator and law-firm primary sources (mas.gov.sg x3, gibsondunn.com, hlc.com). /korea cites cryptotimes.io, bitdegree.org, coinpedia.org, news.bitcoin.com, beincrypto.com, dlnews.com; /japan cites ainvest.com, cryptobriefing.com, cryptotimes.io, financemagnates.com; neither cites fsc.go.kr or fsa.go.jp. /dubai-mena cites vara.ae once; /india cites chainalysis.com, inc42.com, business-standard.com. Correlation with a single working desk; causation unverified.

## 7. Competitor comparison (top live results; WebSearch plus WebFetch)

### Korea ("crypto PR agency Korea", E1)
| Result | Title / H1 | Structure | FAQ | Proof | Date | Words |
|---|---|---|---|---|---|---|
| icoda.io/best-crypto-marketing-agencies-in-korea/ | "Top 10 Crypto Marketing Agencies Winning in South Korea" | ranked cards x10, ICODA ranks itself first | 4 | named Samsung, Hyundai (Blocko), TON, BingX, Filecoin (unverified) | upd 2025-09-11 | about 3,500 |
| crypticweb3.com/crypto-marketing-agency-seoul/ | "Crypto Marketing Agency in Seoul" | services, stats (200+ clients, 2,000+ KOLs), testimonials from Bybit, Algorand, Cardano Foundation, detailed FIU/FSC block (11.13M accounts end-2025, VAUPA 19 Jul 2024, Google Play FIU proof since Jan 2026, KBW dates) | 7 | named logos and quotes | undated | about 2,400 |
| seoulz.com/blockchain-marketing-agencies-in-korea-to-partner-with/ | "Blockchain Marketing Agencies in Korea to Partner with" | 6 firms, no ranking | 0 | Creatip: Samsung, LG | 2023-07-07 | about 900 |
| mexc.com/news/728020, /119794, /533221 | syndicated listicles | not fetchable | | | | |
| Shilika /korea | "Korea Web3 & AI PR 2026: BloomingBit, TokenPost, KBW Seoul" / manifesto H1 | 186-word answer block with 3 pricing models, outlet table, sprint, events, regulation | 7 | no named Korea client, no linked Korean placement | UPDATED SEP 2026 | 3,838 |

Verbatim E1 prompt today: results are mexc syndicated listicles, techbullion, icoda, outsetpr.io, marketerhire. Korea-linked names: Blockchain Marketing Asia (Korea-based), Cryptic, Paradigm PR (panel notes).
Differences that matter: competitors match the query in title and H1; they are comparison-led or proof-led (logos, named clients, ranked firms); one is physically in Seoul and publishes primary regulatory numbers. The SERP quality is low (2023 to 2025 dates, self-ranking), so content depth alone is not what is missing.

### Japan ("crypto PR agency Japan", E2)
Head-term SERP today: mexc listicles (/533221, /728020, /715484), job boards (cryptojobslist, web3.career, contentcreators), a cookieyes page. No Japan-specific agency page in the top 10. First pass: techbullion "Best Crypto PR Agencies in 2026" (931 words, does not mention Japan), coinbound crypto-pr-pricing (last updated 2024-04-18, no Japan pricing), a MarketAcross + Turingum press release. /japan (4,283 words, cost front-loaded, regulator-specific) is the best-fit page on the open web for this query and still does not surface: that points at indexation or trust, not relevance. Its authority claim is also now wrong (section 8).

### Dubai/MENA (E4, "crypto PR agency Dubai")
Head-term SERP today: The Block sponsored post (FINPR), DesignRush and digitalagencynetwork profiles (FINPR, Nex Coin PR), CryptoSlate (Luna PR), Coinbound Dubai list. Fetched coinbound.io/crypto-marketing-agencies-dubai/: "Best Crypto Marketing Agencies in Dubai: 2026 List", updated 2026-10-15, about 2,300 words, 7 agencies with Coinbound first, 6 FAQs, no pricing, no VARA or ADGM mention, no events or dates. First pass: cryptodaily.co.uk 2025 ranking (about 1,100 words, 5 firms), icoda Dubai list (retainers "roughly $2,000 to $10,000+ per month"). /dubai-mena has better cost and regulatory content than all of them, but no comparison format and wrong event dates.

### India (E5, "web3 PR agency India")
Head-term SERP today: cryptojobslist (a keyword-stuffed freelancer page with $20 to $50 per hour), job boards. Verbatim E5: exchange4media, prmoment.in "Navigating PR Strategies for Web3 World" (undated, names Metamorph Communications), a cxotoday report, ICODA generic guide, Shilika's dev.to profile. Panel winners: Adfactors, Advent PR, Madchatter, BlockBuzz PR, 5WPR, startup directories. /india (2,855 words, verifiable Bullieverse proof, SEBI frame) is stronger than any page in the SERP and still does not surface.

### Singapore ("crypto PR agency Singapore") - new this pass
| Result | Title / H1 | Date | Words | Notes |
|---|---|---|---|---|
| icoda.io/best-crypto-marketing-agencies-singapore/ | "Singapore's Best Crypto Marketing Agencies, 2025 Guide" / "Unlock Explosive Growth: Singapore's Best Crypto Marketers" | pub 2025-05-26, upd 2025-09-11 | about 4,000 | 10 agencies, ICODA first, 6 FAQs, unsourced claims (600 percent visibility, 89 percent of projects), no MAS/DTSP/PSA specifics, no Token2049 or SFF dates |
| buildd.co/p/crypto-pr-agencies | "5 Crypto PR Agencies Every Web3 Founder Should Know About" | undated (c) 2026 | about 1,200 | 5 firms incl. DIFY Singapore; no MAS content; 0 FAQs; no pricing |
| acnnewswire.com/press-release/english/88574/ | SeaPRwire newswire launch release | 2024-01-17 | about 600 | self-promotional, anonymised case studies, internally inconsistent outlet counts |
| Shilika /singapore | "Singapore Web3 & AI PR 2026: BT, DealStreetAsia, Token2049" | live UPDATED SEP 2026 | 3,090 | MAS/DTSP regulation, pricing, MAS and law-firm sources; live copy stale (section 8) |
Reading: the Singapore SERP is weak and generic, which fits /singapore being the one desk with traction. It also did not appear for the head term in this tool, so even its win is limited to the broader APAC prompt.

### APAC ("APAC crypto PR agency ...", E3)
Head-term SERP today: job boards (OKX, Chainalysis, Jito APAC roles), YAP Global's 2022 APAC hub announcement, mexc listicles (/237643, /715484), marketerhire "Best Web3 Marketing Agencies for 2026", icoda. Verbatim E3 returns Shilika's dev.to/shilika profile and a Medialegacy mirror of it, not /apac or /services/apac-pr. Neither APAC page surfaces while /singapore does, despite near-identical titles and H1s on the pair (a duplicate-pair suppression is plausible but UNVERIFIED).

Cross-cutting pattern: the same syndicated mexc listicle (`/news/728020`) appears for Korea, Japan, Singapore and "Asia" queries. Multi-country comparison listicles win the regional head terms. No desk is built in that format.

## 8. Factual accuracy ledger

Legend: LIVE = what production serves today (re-grepped 10-16, identical to 10-15); LOCAL = unpushed worktree edit. RE-CONFIRMED means I checked the external fact myself on 10-16.

### Korea (/korea; LIVE = LOCAL, no local edits)
| Claim on page | Finding | Evidence |
|---|---|---|
| KBW 2026 framed as upcoming: "five-week Korean embargo cycle run before September", "Briefings have to start in mid-August" (2 hits) | WRONG NOW. KBW ran 29 Sep to 1 Oct at Walkerhill (Upbit Institutional Summit 29 Sep, main conference 30 Sep to 1 Oct). RE-CONFIRMED. The page contradicts itself: its stat card already says "Sep 29 - Oct 1 Walkerhill" | thedefiant.io KBW press release; koreablockchainweek.com; live grep |
| Stat card "Verified crypto users South Korea 2026: 6M+, ~12% of population" (BitDegree) | UNDERSTATED. 11.13M accounts at end-2025 (FSC figure quoted in search results; Four Pillars and Cryptic cite the same) | search results 10-16; crypticweb3.com |
| "Bithumb is pursuing a KOSDAQ listing first with a US listing as the secondary objective ... timeline pushed into 2026" (appears twice) | OUTDATED. Bithumb's 3 Aug 2026 notice sets a 2028 IPO: 2026 internal controls and K-IFRS, 2027 preliminary listing review, 2028 IPO. RE-CONFIRMED | theblock.co/post/410391; crowdfundinsider.com 2026/08 |
| "South Korea set a 20 percent ownership cap for crypto exchanges with a 3-year grace period" (stated as done, 9 hits on "20 percent"/"ownership cap") | OVERSTATED. All reporting I found describes a proposal inside a bill under negotiation (figures of 15 to 20 percent and 25 to 30 percent floated; opposition contests it). Current October status UNVERIFIED | cointelegraph.com ownership-caps article; koreajoongangdaily.com; first-pass sumsub and theblock sources |
| "Digital Asset Basic Act anticipated in 2026, ruling party committed to a bill by early 2026" | STALE (PRIOR PASS: target missed, ten bills pending, consolidated bill planned for September, subcommittee expected November) | sumsub 2026-07-29; heraldcorp |
| "KOSPI doubled in 2026 and Korean crypto trading volumes fell roughly 80 percent" | MIXED (PRIOR PASS: 80 percent belongs to Nov 2025 to Jan 2026 windows; H1 2026 about 54 percent) | theblock 2026-08-18 |
| Stat card "Upbit + Bithumb ~96%" vs "around 90 percent" in body | INTERNAL INCONSISTENCY (PRIOR PASS) | /korea text |
| "FTC-and-FSC-aware briefs" (0 hits for KFTC) | LIKELY WRONG TERM; Korea's regulator is the KFTC (PRIOR PASS) | live grep |
| "Korea Fintech Week (FSC and FSS, autumn 2026)" | VAGUE. Dates are 25 to 27 Nov 2026 at aT Center Yangjae (FSC announcement 29 Jul 2026). RE-CONFIRMED. The next real Korean anchor, 40 days out | fsc.go.kr/eng/pr010101/87427 |
| Not on page | Crypto-promotion rules (FIU-registered VASP proof for app stores since Jan 2026, proposed paid-promotion disclosure bill) that competitors cover | crypticweb3.com |

### Japan (/japan; LIVE = LOCAL, no local edits)
| Claim | Finding | Evidence |
|---|---|---|
| "The Japanese Cabinet approved an amendment ... April 10, 2026", "enactment is expected as early as 2027" | WRONG NOW. The Diet passed the FIEA amendment on 15 Jul 2026 (upper house plenary). RE-CONFIRMED. Sources differ on effect date ("within a year of publication" vs 2027); penalties raised to 10 years and 10 million yen; insider-trading ban added | news.tuoitre.vn "Japan enacts bill to boost crypto assets regulation"; unchainedcrypto.com; first-pass theblock, adnkronos |
| "20 percent flat tax reform pushed" | UNDER-STATED. Passed; separate tax change targeted from 2028 (PRIOR PASS) | theblock 2026-07-15 |
| Foreign trust-type stablecoin route "June 1 2026" | VERIFIED (PRIOR PASS) | cryptobriefing.com; bitcoinist.com |
| Stat card "12.5M retail accounts unlocked by NISA-eligible crypto ETFs" (AInvest) and meta description "NISA ETF channel" | UNVERIFIED and doubtful. No spot crypto ETF approval found; no source for NISA eligibility | search results (PRIOR PASS) |
| "WebX 2026 (July 13 to 14)" framed as the upcoming anchor; IVS Crypto "summer 2026" | PAST. IVS2026 ran 1 to 3 Jul in Kyoto (PRIOR PASS) | chainwire.org 2026/06/24 |
| JSON-LD dateModified 2026-06-03 vs "UPDATED SEP 2026" | INCONSISTENT freshness signal | japan-jsonld.json |
| Pricing: "Always-On Japan Coordinator at 3,000 US dollars per month" | consistent with desks, contradicts the playbook scale (section 9b) | live text |

### Dubai/MENA (/dubai-mena; LIVE = LOCAL, no local edits)
| Claim | Finding | Evidence |
|---|---|---|
| "GITEX Global (Dubai, October 2026)" and "Future Blockchain Summit (Dubai, October 2026, part of GITEX Global)" | WRONG. GITEX Global 2026 is 7 to 11 Dec at Expo City Dubai (summit 7 Dec, expo 8 to 11 Dec). RE-CONFIRMED. Future Blockchain Summit 2026 dates: none found | mediaoffice.ae 2025/10/08-10; gitex.com/gitex-global-2026; therecursive.com |
| "Abu Dhabi Finance Week (November 2026)" | WRONG. 7 to 10 Dec 2026, Al Maryah Island, hosted by ADGM. RE-CONFIRMED | wam.ae; investwithabudhabi.com |
| "Dubai FinTech Summit (May 2026)" listed as a live window | PAST (PRIOR PASS) | |
| "Token2049 Dubai postponed from April 29-30, 2026 to April 21-22, 2027" | VERIFIED. RE-CONFIRMED by the Token2049 handle and site ("Dubai: 21-22 April 2027") | nitter mirror of @token2049; token2049.com |
| "VARA Travel Rule live Feb 2026" | WEAKLY SOURCED (PRIOR PASS) | |
| "ADGM Product Intervention Powers effective Jan 2026"; "VARA min capital AED 100K to 2M"; "RAK DAO 48 hrs, packages from AED 7,500" | NOT CONFIRMED in any source found; stat card cites no URL (all three present in live text) | live grep 10-16; PRIOR PASS |

### India (/india; LIVE = LOCAL, no local edits)
| Claim | Finding | Evidence |
|---|---|---|
| $626M 2025 Web3 funding, $396M Series B+, 15.2 percent of developers | VERIFIED (Hashed Emergent report, PRIOR PASS) | latestly.com |
| "India Blockchain Week (IBW, December 2025 cycle returning 2026)" | WRONG. IBW 2026 is 1 to 2 Nov at Fairmont Mumbai, hosted by Hashed Emergent, fourth edition, first outside Bengaluru. RE-CONFIRMED (multiple sources). 16 days away | thecoinrepublic.com 2026/10/06; yellow.com press release; startupgrantsindia.com |
| "ETHIndia (Bengaluru, December 2026)" | UNVERIFIED. No ETHIndia 2026 dates or venue found in my search. One source places an ETHIndia on 4 Nov alongside Devcon, not corroborated. ETHGlobal Mumbai runs 5 to 7 Nov at Jio World Centre (Spanish-language listing) | search 10-16 |
| Not on page: Devcon 8 | MISSING. 3 to 6 Nov 2026, Jio World Centre, BKC Mumbai, 10,000 to 12,000 attendees expected, the largest Ethereum event hosted in India; 18 days away. RE-CONFIRMED (Ethereum Foundation blog) | blog.ethereum.org/2025/12/23/devcon-mumbai; cryptobriefing.com |
| Chainalysis "#1" links to the 2024 index | TRUE but cite the 2025 index (PRIOR PASS) | outlookmoney.com |

### Singapore (/singapore: LIVE stale, LOCAL fixed, not pushed)
LIVE today: meta description "Token2049 Marina Bay Oct 2026"; stat card "Token2049 Singapore dates Oct 7-8 ... brief 5 weeks ahead"; "five-week Singapore embargo cycle run before September"; "IMDA Cyber Security Act 2025 amendments" (Run 88: no such act; the instrument is the Cybersecurity (Amendment) Act 2024); "upcoming stablecoin legislation will be drafted in 2026" (MAS published a draft 1 Sep 2026, PRIOR PASS). Token2049 Singapore ran 7 to 8 Oct 2026 at Marina Bay Sands (RE-CONFIRMED), so it is 8 days in the past. Singapore FinTech Festival is 18 to 20 Nov 2026 at Singapore EXPO (RE-CONFIRMED), 33 days out. LOCAL (Run 88): SFF 18 to 20 Nov in the text (5 hits), 0 hits for "Cyber Security Act 2025", 0 hits for "will be drafted". Not pushed. The five locale files for singapore (ko, ja, zh, es, ru) are also locally modified and unpushed, so the live translations are stale too.

### /services/apac-pr (LIVE stale, LOCAL fixed, not pushed)
LIVE: "Q2 2026 regulatory overhaul/window" (9 hits), "Korea Blockchain Week 2026 ... (September 22 to 28, anchored on Impact at COEX)" (actual 29 Sep to 1 Oct, Walkerhill), "WebX 2026 (July 13 to 14) ... running this week" (it ended 14 Jul). LOCAL: 0 hits for "Q2 2026", "September 22" and "running this week".

### /apac (LIVE, UPDATED OCT 2026)
Event circuit corrected in Run 86. Still unsourced: "South Korea ~50% APAC crypto-native traffic" (also on /services/apac-pr; the live Korea stat card says Upbit+Bithumb ~96 percent). "Six markets" in the description and title while the table lists seven rows and the title names five; Greater China and Vietnam have no desk.

### Site-wide hygiene (PRIOR PASS, partly re-confirmed)
- BloomingBit called a "Japanese outlet" in two playbooks; it is Korean.
- Pricing, RE-CONFIRMED against live text and saved playbook snapshots:

| Item | Desks | Playbooks / listicle |
|---|---|---|
| Fractional retainer per month | Korea 5,500 to 12,000; Japan 5,500 to 12,500; Dubai/MENA 6,000 to 13,000; India 4,000 to 9,000; Singapore 5,000 to 11,000; APAC 6,000 to 14,000 | /playbook/crypto-pr-cost-2026, crypto-pr-japan-2026, crypto-pr-korea-2026: fractional operator 3,000 to 7,000 per month |
| Single-market sprint | Korea 11,000 to 30,000; Japan 11,000 to 32,000; Singapore 10,000 to 28,000; India 8,000 to 22,000; APAC 12,000 to 35,000 | /playbook/crypto-pr-korea-2026: 15,000 to 40,000; /playbook/crypto-pr-japan-2026: 15,000 to 40,000 |
| Always-on coordinator | 2,500 to 3,200 per month | not stated |

## 9. Proof audit

(a) Named proof on the desks, RE-CONFIRMED: /korea, /japan and /singapore link zero /work case studies and zero linked regional placements. /dubai-mena links /work/mantra-chain. /india links /work/bullieverse (outlet URLs return 200: Inc42, NewsBTC, Hackernoon).
(b) The only external "Korean placement" links on the site are in the press logo wall (`app/_partials/press-body.html`, used by app/press/page.tsx and reused on /pages/web3-pr-agency-* variants):
- `https://www.tokenpost.kr/playbook/228601` returns HTTP 404. RE-CONFIRMED 10-16.
- `https://bloomingbit.io/feed/news/69869` returns 200, but the article is "DAI supply up 20 percent in three months", published 2024-06-13, mentioning none of Shilika, MANTRA, RARI, Bullieverse, Gaia, Fluence or Web3Auth. RE-CONFIRMED 10-16 by WebFetch.
- CryptoTimes JP, Economic Times, Regulation Asia and others are logos with no link; 9 of 23 linked logos return 403 to bots (Forbes, Blockworks, Benzinga, The Block, The Defiant, CryptoNews, YourStory, BeInCrypto, e27), Jinse returns 000 (PRIOR PASS).
(c) Delivery model: the desks claim "native-language placements" and "run from inside the region by one senior operator". /about says "Based in India" and the schema says `knowsLanguage: ["English","Hindi"]`. Nothing on Korea or Japan explains how Korean or Japanese is delivered (translator, partner, named editor relationships). The Korean locale copy renders "inside the region" as a senior operator "stationed locally", a stronger claim than the English.
(d) The 2026-10-02 commit "Remove TokenPost and Jinse from home page coverage section" shows the owner had already seen part of this.
(e) Competitors win trust with named logos and quotes (Cryptic: Bybit, Algorand, Cardano Foundation) or primary regulatory numbers; the desks cite secondary crypto-news pages for most statistics.

## 10. Locale and translation interplay (zh, ko, ja, es, ru; shipped 2026-10-13)

What exists: 21 pages x 5 locales = 105 URLs, all in the sitemap with 7 alternates. Per-desk catalogues at `app/_partials/i18n/<locale>/{korea,japan,india,dubai-mena,singapore,apac}.json` hold a translated meta block plus hash-keyed segments; no human-review marker exists. `lib/i18n/config.ts` registers the pages.
1. Cannibalisation: none observed or plausible so far. The desks were absent from SERPs for ten weeks before locales existed; canonical and hreflang are reciprocal and self-referencing; Korean and Japanese pages target different languages. No locale URL has surfaced in any probe either.
2. Error multiplication, RE-CONFIRMED in the files: ko title "한국 Web3·AI PR 2026: BloomingBit, TokenPost, KBW Seoul"; ja title "日本Web3・AI PR 2026｜CoinPost、日経、WebX Tokyo" and ja description "2026年7月のWebX Tokyo、NISA ETFチャネル". Every stale fact in section 8 is now served in five languages. Singapore locale files are modified locally but unpushed.
3. Quality risk: 105 machine-translated near-copies (about 15 percent of the 704-URL sitemap) added to a site whose country cluster already is not being indexed. I cannot measure the effect; Google's guidance treats translation as fine when it serves users and unreviewed automation at scale as a risk.
4. Opportunity, real but unproven (PRIOR PASS): Korean-language and Japanese-language buyer queries returned gigs, old news and English listicles, with no Korean or Japanese agency page answering the question. The audience differs (Korea-HQ founders with a listing in motion) and the pages are English-agency copy translated, with no Korean testimonial, named Korean client or local contact method. Volume unknown.
5. Technical: locale pages ship JSON-LD inside the RSC payload, so `inLanguage` and `translationOfWork` markup is invisible to non-JS crawlers.

## 11. Per-desk diagnosis and the single highest-leverage fix

### /singapore (6/10) - the one that works
- Evidence: surfaces for E3 at about 8, 7, 4, 3; present in the index probe with two title snapshots; least fragmented cluster (5 URLs); only desk citing regulator and law-firm sources; weakest SERP of the set.
- Problem: live copy is stale (Token2049 as upcoming, a non-existent IMDA act, "stablecoin legislation will be drafted"). It is carrying the APAC query on behalf of /apac and /services/apac-pr.
- Single fix: commit and deploy the already-written Run 87 and 88 files now (singapore-body, singapore-jsonld, page.tsx, singapore i18n files, services__apac-pr-body, sitemap), then request re-indexing. No new writing needed.

### /korea (3/10)
- Diagnosis: never surfaced; absent from the index probe; title lacks the buyer phrase; H1 is a manifesto; no comparison table; no named proof; KBW framed as future (while its own stat card has the right dates); Bithumb, DABA and ownership-cap statements outdated; 11 country-specific URLs share the intent; only Korea proof links are a 404 and an unrelated article. Competitors are ranked listicles and a Seoul agency with named clients and primary regulatory numbers; none is hard to beat on substance.
- Single fix: make /korea the one canonical Korea page and rebuild its head to match the query: title and H1 "Crypto PR agency Korea 2026: who runs it and what it costs", a 50 to 70 word answer, an honest comparison table (local Korean agencies vs global agencies vs a fractional operator), the corrected facts (KBW done, Korea Fintech Week 25 to 27 Nov, 11.13M accounts, Bithumb IPO 2028, DABA still pending), and at least one verifiable Korean placement or named client; fix the dead TokenPost link. Only after Search Console shows how the 5 `/pages` Korea variants are treated, consolidate them into it.

### /japan (3.5/10)
- Diagnosis: same absence; but the most open SERP (no current Japan-specific buyer page exists) and the most differentiated regulatory content. Its authority claim is currently wrong (Cabinet-approved, enactment about 2027, when the Diet passed it on 15 Jul 2026). WebX framed as upcoming; NISA statistic unsourced; JSON-LD dateModified June.
- Single fix: rewrite the regulatory block and stat cards to the enacted position (passed 15 Jul 2026; main provisions in force within about a year or 2027, sources differ; 20 percent tax change from 2028; foreign trust-stablecoin route live since 1 Jun 2026; spot crypto ETFs not approved), delete the unsourced NISA statistic and the "NISA ETF channel" meta text, replace the WebX/IVS countdown with a "what happened at WebX and IVS 2026 and what the next window is" block, fix dateModified, retitle with "crypto PR agency Japan". Cheapest desk to win once indexed.

### /dubai-mena (3/10)
- Diagnosis: the playbook (/playbook/crypto-pr-dubai-mena-2026) is indexed and surfaced once; the desk never. Three event dates are wrong or unconfirmed, one is past, three regulatory stat cards have no source. The SERP is 2025 listicles and agency directories, several with no regulatory content, so a correct VARA/ADGM page should compete.
- Single fix: correct the calendar to verified windows (GITEX 7 to 11 Dec, Abu Dhabi Finance Week 7 to 10 Dec, Token2049 Dubai 21 to 22 Apr 2027) and source or remove each unverified stat; then add contextual links with query-style anchors ("Dubai and MENA crypto PR agency") from the indexed playbook, /work/mantra-chain and the two Dubai blog posts into the desk. The indexed sibling is the lever.

### /india (4/10)
- Diagnosis: best proof of the five (Bullieverse with working links), best-verified statistics, weakest SERP competition (job boards, a 2023 op-ed), and still not surfacing: the clearest sign of an indexation or trust problem rather than content. Its calendar is the problem: IBW (1 to 2 Nov, Mumbai) is described as "December 2025 cycle"; Devcon 8 (3 to 6 Nov) is absent; ETHIndia unverified.
- Single fix: before roughly 25 October, rebuild the events block around India Blockchain Week, Devcon 8 and ETHGlobal Mumbai (1 to 7 Nov), with a briefing and embargo plan, the SEBI and April 2026 reporting frame and the Bullieverse proof; request indexing the same day. It is a dated, concrete press window 16 days out.

### /apac and /services/apac-pr (3.5/10)
- Diagnosis: two pages, one intent, near-identical title and H1, 37 percent shingle overlap; neither surfaces for E3 while /singapore does. Live /services/apac-pr is the stalest page (Q2 2026 window, wrong KBW dates and venue, WebX "this week"). /apac carries an unsourced "~50 percent of APAC traffic" statistic and a "six markets" claim against seven table rows.
- Single fix: give each a distinct job and distinct title and H1: /services/apac-pr as the commercial "APAC crypto PR agency" page (83 inbound links) and /apac as the country-desk directory; deploy the Run 87 version immediately; point the Korea and Japan table rows at /korea and /japan.

### Translated locales (ko and ja especially)
- Single fix: freeze locale expansion; after the English fixes land, re-extract and retranslate; for ko and ja add a native-written lead paragraph and one Korean or Japanese-language proof item before expecting rank. Do not add locales until Search Console shows the English desks indexed.

## 12. Prioritised actions

1. (SJ, small, decisive) Connect Search Console and run URL Inspection plus Page indexing on /korea, /japan, /dubai-mena, /india, /singapore, /apac, /services/apac-pr, /pages/crypto-pr-agency-korea, /pages/korea-crypto-pr-agency, /pages/crypto-pr-agency-japan, /ko/korea, /ja/japan. Record the exact status. This decides whether the next steps are content or consolidation.
2. (code, small) Commit and deploy Runs 86 to 88 (34 files in the working tree: Singapore, /services/apac-pr, JSON-LD, sitemap, locale files). Live pages still carry wrong facts; the Token2049 gap grows daily.
3. (code, medium, time-boxed) India events rewrite for IBW and Devcon before about 25 Oct; Korea, Japan and Dubai fact corrections per section 8; fix Japan dateModified. Korea Fintech Week (25 to 27 Nov), SFF (18 to 20 Nov), ADFW and GITEX (7 Dec) are the next real windows to anchor on.
4. (code, medium) Query-match rewrite for Korea, Japan, India and Dubai/MENA: title and H1 with "crypto PR agency <country>", a short answer block, a comparison table, one canonical page per country. Consolidate or noindex the near-twin `/pages/*` country variants only after step 1 shows how they are indexed.
5. (SJ plus code, medium) Proof repair: fix or remove the TokenPost 404 and BloomingBit links; add 2 to 3 verifiable Korean and Japanese placement URLs or named clients; state the delivery model for non-English work; align "inside the region" with the About page; replace secondary-news sources with regulator pages (fsc.go.kr, fsa.go.jp) as /singapore does with MAS.
6. (code, small) Render JSON-LD as a plain `<script type="application/ld+json">` in the server component across the 260 pages so non-JS crawlers see it; consider markdown alternates for the desks.
7. (code, small) Body links with query-style anchors from /playbook/best-web3-pr-agencies-2026, /playbook/crypto-pr-cost-2026, /playbook/apac-pr-playbook-2026, /playbook/crypto-pr-dubai-mena-2026 and /playbook/best-web3-pr-agency-india-2026 to the desks; fix the two /apac table rows.
8. (measurement) After the push and indexing, re-run the panel with short head terms ("crypto PR agency Korea", "web3 PR agency India", "crypto PR Japan") and a Singapore prompt; record Search Console impressions per desk; add an AI-engine panel for regional prompts (none exists). Reconcile pricing across desks, playbooks and homepage in one pass.

## 13. What I could not verify

- Whether any desk is indexed in Google (no Search Console). The index probe is a different engine.
- AI-engine citations for any regional page (no data; the only ChatGPT file is a fixture).
- Google head-term SERPs (the search tool is not Google).
- mexc.com result pages (connection refused).
- ETHIndia 2026 dates; Future Blockchain Summit 2026 dates; the October status of Korea's Digital Asset Basic Act and the exchange ownership cap.
- Regulatory claims: ADGM January 2026 powers, VARA capital range, RAK DAO licence terms, CoinPost ownership, the VARA Travel Rule date.
- Whether verified Googlebot, OAI-SearchBot or ClaudeBot traffic is ever challenged by Vercel (needs the firewall log).

## 14. Changes versus the first pass (2026-10-15 draft)

- Repo state corrected: branch main, HEAD 30dd8aa equals origin/main (first pass said branch compare-pages at b726ca0). The /compare deploy changed only the footer; desk content is identical.
- Index probe reproduced and made more rigorous (title history shows all six titles stable since 06-12).
- Timing nuance added: current desk copy deployed only on 2026-10-01; all four SERP runs measured the June versions.
- India events: first pass said ETHIndia unverified and IBW wrong; now also Devcon 8 dates, ETHGlobal Mumbai and IBW re-confirmed; ETHIndia remains unverified.
- Dubai: GITEX and Abu Dhabi Finance Week dates re-confirmed (both 7 Dec start); the first pass's "RAK DAO not in live text" probe note was wrong, the phrase is on the page (4 hits) but unsourced.
- /apac internal-link claim softened (it does link to every desk; only two table rows use service-page anchors).
- Added: cluster fragmentation counts, source-quality comparison, Singapore and APAC competitor review, Coinbound Dubai review, panel-prompt verbatim searches, pricing table, markdown-alternate gap, no-AI-panel finding, local-versus-live status of every fix, spoofed-UA 403 not reproducible with a normal UA.
