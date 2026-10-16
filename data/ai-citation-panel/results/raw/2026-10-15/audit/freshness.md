# Freshness honesty and factual integrity audit - shilikajain.com

Audit date: 2026-10-15, re-verified 2026-10-16 (see section 0 for what changed in the re-verification). Repo: /Users/thunderbolt/Documents/projects/Shilika (branch main, HEAD 30dd8aa, 102 commits, 32 modified plus 2 untracked files uncommitted). Read-only: nothing inside the repo was modified. Scratch scripts and raw outputs are in /private/tmp/claude-504/-Users-thunderbolt-Documents-projects-Shilika/c0dc2b3b-3b31-46db-9535-df2409eb89af/scratchpad/audit/ (history.py, an1-an7.py, claims.py, ctx.py, prices.py, events.json, bumps.json, history.pkl).

Score for this area: **4.5 / 10**.

One-paragraph verdict: the date machinery is mostly honest by construction (sitemap lastmod was deliberately stripped of `new Date()`, only 29 of 258 pages have ever had a date moved, and 0 of 46 date moves happened with zero content change). Factual integrity is the weak side. Production still serves several claims that are provably wrong as of 2026-10-16: Korea Blockchain Week given as "September 22 to 28, Impact at COEX" (actual: 29 Sep to 1 Oct, Walkerhill), a "May 2026 Token2049 Dubai press cycle" and a "2026 Q2 Token2049 Dubai (attended)" speaker row for an event that was postponed to April 2027 and never happened, WebX 2026 "this week" in a July stamp, a "zero-threshold Travel Rule live by end May" that is actually a cabinet-approved rule effective about February 2027, and "IMDA Cyber Security Act 2025 amendments" (the Act is CSA-administered). Pages carry "UPDATED SEPTEMBER 2026" stamps on copy whose time-anchored facts were last checked in July, the homepage states three different retainer prices, 218 pages were repriced without any date moving, the three date signals (visible label, JSON-LD, sitemap) disagree on at least 10 URLs, and a cluster of named statistics and case numbers cannot be verified or are contradicted by primary sources. The local refresh runs 86 to 88 fix many of these accurately, but they are LOCAL / UNPUSHED, so production is currently the wrong version.

---

## 0. Scope, method and limits

- Freshness test: rebuilt a per-page timeline from git (42 of 102 commits touch app/_partials), tracking for each of 258 body partials plus JSON-LD: visible "UPDATED/Updated/Last reviewed" labels, JSON-LD dateModified, and word-level visible-text change (style/script/tags stripped, em/en dashes normalised, date phrases removed). The uncommitted working tree (WT) was added as a pseudo-commit.
- Sitemap: read app/sitemap.ts and fetched the live sitemap.xml.
- Facts: grep inventory of time-anchored phrases, then 28 claims checked against primary or well-sourced secondary pages (WebFetch in the first pass, WebSearch plus WebFetch in the re-verification).
- Re-verification on 2026-10-16: the first pass could not use WebSearch (budget exhausted), so 11 items were left UNVERIFIED. WebSearch worked on 2026-10-16 and resolved most of them. Rows marked "RESOLVED 10-16" in section 2.3 changed status. The grep counts, an6.py output (46 date-state changes across 29 units; 30 / 14 / 2 / 0 word buckets) and the live-site observations (/singapore, /services/token-launch-pr, sitemap) were re-run and still hold.
- Limits you should know about:
  - Forbes, Decrypt, Blockworks, Benzinga and CNBC returned HTTP 403 to WebFetch. curl to the live site hits a Vercel bot challenge; I did not try to bypass it.
  - Search-result summaries are secondary sources. Where a claim rests on one only, it is labelled "secondary".
  - Ahrefs and Search Console were not used (as instructed).
  - Git cannot corroborate any edit between 2026-07-21 and 2026-09-25 (no commits in that gap); those dates rest on the owner's run logs in data/ai-citation-panel/summary/.
  - Today per the system clock is 2026-10-16; the task brief says 2026-10-15. Differences of one day do not change any finding.

---

## 1. Freshness honesty

### 1.1 Where dates come from

| Signal | Source | Behaviour |
|---|---|---|
| Visible "UPDATED OCT 2026" / "Updated June 2026" / "Last reviewed and updated 29 July 2026" | Hand-typed in each *-body.html | 143 of 259 tracked units carry a label |
| JSON-LD dateModified | Hand-typed in *-jsonld.json | 137 of 259 units carry one |
| Sitemap lastmod | Hard-coded in app/sitemap.ts (16 entries) plus constant LAST_VERIFIED_ISO for /compare and 10 agency pages (11 entries) | 27 of roughly 421 static plus localized URLs. Blog posts use Supabase updated_at |
| llms.txt "Last updated" | llms-intro.md has a typed date, app/llms.txt/route.ts appends `new Date()` | See 1.5 |

Command:
```
$ grep -n "new Date()" app/llms.txt/route.ts
53:  const body = `${intro.trim()}\n${dynamicSection}${toolsSection}\n## Last updated\n\n${new Date().toISOString().slice(0, 10)}\n`;
$ grep -n "Last updated" -A2 app/_partials/llms-intro.md
105:## Last updated
107:2026-08-29
```
Live tail of https://www.shilikajain.com/llms.txt (WebFetch, 2026-10-15) shows "## Last updated 2026-10-15", so the served file carries two contradictory stamps (2026-08-29 inside the intro, today's date appended).

### 1.2 Git evidence (commands and results)

```
$ git log --format='%h %ad %s' --date=short -- app/_partials | wc -l      -> 42 commits touch partials (of 102 total)
$ python3 history.py                                                      -> 1253 events; 259 units
$ python3 an6.py   (cumulative diff between consecutive date states; re-run 2026-10-16, identical)
46 date-state changes across 29 units        (29 of 258 pages = 11% ever had a date move)
Counter({'>150': 30, '41-150': 14, '11-40': 2})     (0-10 words: 0)
```
Key result: **0 of 46 date changes happened with zero content change.** Two of the 46 are not real bumps (/about 2026-06-19 only deleted a footer "Last updated 23 May 2026" line; /apac 2026-10-01 back-filled a dateModified that matched the existing label).

Per-commit view (how much changed in the commit that moved the date):

| Commit | Date | Pages with date moved | Words changed in that commit (range) | Verdict |
|---|---|---|---|---|
| fa548f2 | 2026-06-12 | 2 (homepage, article-4) | 832, 2204 | material |
| 8125d48, 1597a7c, 776dc43 | 07-01 to 07-15 | 3 | 85, 199, 141 | material (new FAQs, new hero) |
| **1a0655a "Freshness refresh on flagship page, service pages and oldest playbooks"** | **2026-07-13** | **13** | **5 to 89 words; 12 of 13 are 44 words or fewer** | **thin catch-up bumps** |
| 89b25f5 | 2026-10-01 | 22 | 0 to 1062 (median about 330; five service pages 412 to 539) | material (FAQ blocks, "who runs this" sections, comparison tables) |
| cbc5c01 | 2026-10-13 | 3 (apac, article-56, kol-marketing) | 381, 498, 38 | material (event corrections, repricing) |
| WT (uncommitted) | 2026-10-15 | 2 (singapore, services/apac-pr) | 380, 545 | material (documented in run 87, run 88 with cited sources) |

**The one clearly cosmetic freshness event is commit 1a0655a** (`git show 1a0655a --shortstat`: 17 files, 44 insertions, 44 deletions). It moved labels MAY to JULY on 8 service pages and 1 landing page, and moved dateModified to 2026-07-13 on 4 playbooks, mostly by inserting time anchors:
```
$ for f in $(git show 1a0655a --name-only --format= -- app/_partials | grep body.html); do ... grep -ci "mid-2026\|this week\|now live\|weeks out"
3 services__web3-pr-campaigns   3 services__token-launch-pr   3 services__kol-marketing
2 services__founder-profiling   2 services__apac-pr           2 services__ai-startup-pr
1 services__cybersecurity-pr    1 services__content-writing    1 pages__web3-pr-agency
1 article-8   1 article-3   1 article-2   0 article-1
```
Example added text (services__cybersecurity-pr, 5 words changed): "by" became "Through mid-2026". Example (services__web3-pr-campaigns): "WebX 2026, opening this week in Tokyo (July 13 to 14 ... 13,160 attendees from 88 countries)". Mitigating factor: between the previous stamp (MAY) and this one, those service pages had accumulated 700 to 1,100 words of real edits from June commits (an6.py "cum" column), so the JULY stamp was not fabricated; it was a late catch-up using a minimal edit. Aggravating factor: the anchors "this week" and "ten weeks out" went stale within a day and are still live 3 months later (re-confirmed on live /services/token-launch-pr on 2026-10-16: "WebX 2026 (July 13 to 14, The Prince Park Tower Tokyo, this week's press cycle)" under "UPDATED SEPTEMBER 2026").

Count answering "pages whose lastmod/dateModified moved without material change":
- Strict (zero change since previous stamp): **0**.
- Thin (date moved in a commit that changed 45 words or fewer, all adding time anchors): **12 pages**, all in 1a0655a: article-2, article-3, article-8, pages/web3-pr-agency, services/ai-startup-pr, apac-pr, content-writing, cybersecurity-pr, founder-profiling, kol-marketing, token-launch-pr, web3-pr-campaigns.
- Sitemap lastmod specifically: 0 of the 27 entries is demonstrably unearned. 25 trace to real edits or run logs (e.g. run 80 token-launch 09-25, run 81 cybersecurity 09-28, run 82 japan 09-29, run 85 article-56 10-12, run 86 apac 10-12). Two are unverifiable from git (article-9 and article-10 at 07-29: FAQ blocks were committed on 10-01, no commit exists on 07-29).

### 1.3 Largest mismatches (ranked)

1. **/services/token-launch-pr (live, re-fetched 2026-10-16)**: header "UPDATED SEPTEMBER 2026", sitemap lastmod 2026-09-25, but body still says WebX "this week's press cycle", Korea Blockchain Week "September 22 to 28, Impact at COEX" (wrong dates, see 2.3 row 11) and "the May 2026 Token2049 Dubai press cycle" (event postponed to 2027, see row 3). The September stamp reflects a 527-word "who runs token launch PR" section (89b25f5); the July time-anchored facts were never rechecked. Stamp says fresh, facts are stale and wrong.
2. **/services/web3-pr-campaigns (live)**: "UPDATED JULY 2026", "WebX 2026, opening this week in Tokyo", "KBW ... roughly ten weeks out" (fetched live 2026-10-15).
3. **/services/apac-pr (live)**: "UPDATED JULY 2026", "Q2 2026 regulatory overhaul now live", Token2049 Dubai "(May)", WebX "running this week"; live sitemap has no lastmod for it. Repo WT has a sourced rewrite (label OCT 2026, sitemap 10-14) but it is unpushed. In the repo the page has no JSON-LD dateModified at all.
4. **/japan**: three different dates: label "UPDATED SEP 2026", JSON-LD dateModified 2026-06-03, sitemap lastmod 2026-09-29 (live confirmed). Live page also says WebX "is expected to host roughly 13,160 attendees" under a September stamp.
5. **/singapore (live, re-fetched 2026-10-16)**: "UPDATED SEP 2026", live sitemap lastmod 2026-09-06, still treats Token2049 Singapore (7 to 8 Oct) as upcoming, says "the upcoming stablecoin legislation will be drafted in 2026" (MAS published the draft on 1 Sep 2026, a week before the sitemap date) and says cyber copy must name the "IMDA Cyber Security Act 2025 amendments". Fix exists only in WT (WT has 0 occurrences of "IMDA Cyber Security Act", HEAD has 1).
6. **106 /pages landing pages**: label "Updated June 2026" (one says July), no JSON-LD dateModified at all, yet 101 of 106 changed more than 10 words since creation (credibility strip injection, 10-13 repricing). A visible date without matching structured data conflicts with Google's guidance that a visible date should match structured data.
7. **8 service pages**: visible label plus (for 5) sitemap lastmod, but no JSON-LD dateModified.
8. **/testimonials**: "UPDATED MAY 2026" and "19 unedited LinkedIn recommendations ... from 2021 to 2026", but data/testimonials.json dates are 16 in 2025, 2 in 2022, 1 in 2019 (a teacher); none from 2021 or 2026.
9. **/about**: "Updated 23 May 2026" while the page was materially edited on 2026-10-13 (price change, X field notes).
10. **Homepage**: label "Updated 30 June 2026" (FAQ block), JSON-LD dateModified 2026-07-15, content edited 10-01 and 10-13.

### 1.4 Under-reporting (material edits with no date move)

```
$ units where cbc5c01 replaced "$5,000 to $12,000" with "$3,000 to $7,000": 220 (106 articles, 106 /pages, 8 other)
  of which a date moved: 2
```
So **218 pages had a pricing fact cut by about 40 percent on 2026-10-13 with dateModified and labels left alone**. Not spam (it is the opposite), but it makes "Last reviewed and updated" labels false in the other direction: e.g. /playbook/fractional-vs-agency still says "Last reviewed and updated: July 30, 2026", and its FAQ was find-and-replaced into a self-contradiction (see 3, retainer row).

### 1.5 Code-level freshness issues

- llms.txt and llms-full.txt: the route appends `new Date()` at regeneration time, so the "Last updated" value is the build/ISR day, not an edit date; the intro file contributes a second, stale 2026-08-29 stamp. Google says it ignores llms.txt (page last updated 2026-07-10), so impact is on other engines only, but it is the one place a fake-fresh date is generated by code.
- Blog posts (Supabase): `dateModified = post.updated_at` (app/blog/[slug]/page.tsx:94) and sitemap `lastModified = updated_at`. supabase/migrations/0001_blog_foundation.sql installs a BEFORE UPDATE trigger `set_updated_at` on blog_posts, and app/api/admin/images/regenerate/route.ts:73 does `update({ image })`, so an image regeneration or Excel import moves dateModified and lastmod with no text change. Cannot quantify (no DB access). Unverified, medium risk.
- /compare and 10 agency pages share one constant `LAST_VERIFIED_ISO = '2026-10-15'` (app/compare/_data/shilika.ts:4). Honest today (pages created today; live sitemap shows /compare lastmod 2026-10-15), but one constant bump would re-stamp 11 URLs.
- "NEW" badges are still on related-reading cards in 9 files (apac, korea, singapore, dubai-mena, india, 4 service pages), first added 2026-06-04 to 06-20, so 4 months old; commit cb75d81 "remove NEW service tags" was partial.

### 1.6 Against Google's guidance

Google Search Central, "Creating helpful, reliable, people-first content": under "Avoid creating search engine-first content" it lists the warning-sign question "Are you changing the date of pages to make them seem fresh when the content has not substantially changed?" (a warning sign, not a named spam policy). Google's publication-dates doc says visible dates should be labelled and match structured data. By that standard: no manipulation pattern at scale, one thin-bump commit (1a0655a), and a real structured-data parity problem (labels without JSON-LD on roughly 114 pages, and /japan and homepage disagreeing). Google's AI optimization guide (updated 2026-07-10) does not address freshness manipulation. The more serious exposure is not date inflation but stamping a page "UPDATED <recent month>" while it still carries wrong time-anchored facts, which is a trust problem for readers and for any AI engine that quotes the stamp.

---

## 2. Factual accuracy

### 2.1 Grep inventory (working tree, *-body.html and *-jsonld.json; re-run 2026-10-16, identical)

```
"Q[1-4] 202[5-7]"  28 hits in 14 files   (WT: regulatory "Q2 2026" framing now only survives as a hypothetical in article-108; HEAD still had 9 in services__apac-pr and 2 in homepage)
"this week"        17 hits in 13 files   (2 genuine stale: services__token-launch-pr, services__web3-pr-campaigns; others are generic advice)
"weeks out"        73 hits in 45 files   (generic lead-time advice except services__web3-pr-campaigns "roughly ten weeks out")
"mid-2026"         25 hits in 20 files   (many inserted by 1a0655a; the "through mid-2026" assertions are unverifiable)
"May 2026"         39 hits in 28 files   (mix of Google core update, Token2049 Dubai, Korea Travel Rule, Anthropic round; several now known wrong, see 2.3)
"upcoming"          5 hits               (generic)
"this quarter"     19 hits in 17 files   (article-6 changelog "this quarter" is stale)
"will be drafted"   0 in WT              (live /singapore still has it)
```
Residual wrong or stale facts in the repo (WT), not just live:
- "Korea Blockchain Week 2026 (September 22 to 28, Impact at COEX)" in 5 service pages (ai-startup-pr, kol-marketing, founder-profiling, token-launch-pr, web3-pr-campaigns) plus their JSON-LD and /speaker. Actual dates are 29 Sep to 1 Oct at Walkerhill (which /apac, /korea and the apac-pr WT already say), and the event is now over.
- "May 2026 Token2049 Dubai press cycle" in services/token-launch-pr and services/web3-pr-campaigns (+JSON-LD); Token2049 Dubai was scheduled 29 to 30 April 2026, then postponed to 21 to 22 April 2027.
- /speaker "Recent and upcoming appearances": "2026 Q3 (planned) Korea Blockchain Week 2026 ... September 22 to 28, Impact at COEX, Seoul. Awaiting confirmation." and "2026 Q3 (planned) WebX 2026 ... July 13 to 14 ... Awaiting confirmation" (both events are past), and "2026 Q2 | Token2049 Dubai - networking, MENA RWA press cycle (attended) | Madinat Jumeirah, Dubai. Networking attendance, no stage slot." That last row is a first-person attendance claim for an event that did not take place. The page was last edited in 1aab448 ("verified speaking entries"), not modified in WT.
- /dubai-mena: "Future Blockchain Summit (Dubai, October 2026, part of GITEX Global)" vs the evidence in row 12.
- /korea (and /apac, /services/apac-pr, llms-intro, articles 87 and 120): "zero-threshold Travel Rule live by end May" stated as in force (row 22) and "South Korea set a 20 percent ownership cap" stated as settled (row 23).
- /apac event grid still lists "Token2049 Singapore (Marina Bay, Oct 2026)" in present tense while the FAQ on the same page says it "has also run".

### 2.2 Live vs local

Run logs (data/ai-citation-panel/summary/2026-10-14-run-87..., 2026-10-15-run-88...) state "LOCAL / UNPUSHED". Live WebFetch on 2026-10-15 and again on 2026-10-16 confirms production still has the pre-fix text on /singapore, /services/token-launch-pr (and, on 10-15, /services/apac-pr and /services/web3-pr-campaigns). The live sitemap shows /singapore lastmod 2026-09-06, not 2026-10-15, and /services/apac-pr with no lastmod. Run 83 (2026-10-01) already documented the same push-lag pattern.

### 2.3 Verification of high-risk claims (28 checked; 11 contradicted or unsupported, 13 verified, 4 still unverified)

| # | Claim and location | Result | Evidence |
|---|---|---|---|
| 1 | "Princeton GEO study (arXiv:2311.09735) found pages combining citations, statistics and named quotations get cited 30 to 40 percent more" (about 50 pages incl. 6 /work pages, services, playbooks) | **OVERSTATED** (re-fetched 10-16) | https://arxiv.org/abs/2311.09735 : abstract says GEO "can boost visibility by up to 40%"; neither "30" nor "30 to 40" appears; no combined-method claim. KDD 2024, benchmark visibility metric, not "cited more in the wild" |
| 2 | Token2049 Singapore 7 to 8 Oct 2026, Marina Bay Sands (/apac, /singapore WT) | VERIFIED | https://www.token2049.com/llms.txt ; The Block post 393543 also cites Oct 7 to 8 at Marina Bay Sands. Live /singapore still presents it as upcoming |
| 3 | Token2049 Dubai: "May 2026 Token2049 Dubai press cycle" (token-launch-pr, web3-pr-campaigns, apac-pr HEAD, JSON-LD) and /speaker "2026 Q2 ... (attended)" | **CONTRADICTED, RESOLVED 10-16 (high)** | Originally 29 to 30 April 2026; postponed in March 2026 to 21 to 22 April 2027 over regional security (Iran conflict). https://www.theblock.co/post/393543/token2049-dubai-moved-to-2027-amid-heightened-security-risks-in-uae ; https://cointelegraph.com/news/crypto-conference-token2049-postpones-dubai-event-to-2027 ; https://www.bloomberg.com/news/articles/2026-03-13/dubai-crypto-event-token2049-postponed-as-iran-war-continues. So the month is wrong, the event did not occur, and the "attended" line is false |
| 4 | Japan Diet passed FIEA crypto bill 15 Jul 2026 (WT services/apac-pr) | VERIFIED | https://english.adnkronos.com/2026/07/15/japan-enacts-bill-to-boost-crypto-assets-regulation/ (insider trading rules, penalties to 10 years / 10M yen) |
| 5 | "April 2026 Cabinet-approved FIEA reclassification of 105 crypto assets" (japan, services pages, FAQs) | VERIFIED, RESOLVED 10-16 (secondary) | Cabinet approval 10 Apr 2026 per https://www.theblock.co/post/396982/japans-bill-classify-crypto-financial-products ; the 105 figure traces to an Asahi report on the FSA plan, cited by Bitcoin Magazine and others |
| 5b | "20 percent flat capital-gains tax reform replacing the progressive rate up to 55 percent" (japan-body, 2 sentences, plus FAQ) | **OVERSTATED / UNDATED** | Search summaries: flat 20% is part of the 2026 Tax Reform Outline with effect from 2028, and sources disagree on whether it is legislated or a plan (https://coinpaprika.com/news/japan-cuts-55-crypto-tax-20-reclassifies/ vs https://bitcoinmagazine.com/news/japan-reclassifies-bitcoin-and-crypto). The page gives no effective year in those sentences, so a reader assumes it is current. "12.5M NISA accounts" remains UNVERIFIED |
| 6 | HKMA first stablecoin licences 10 Apr 2026 to HSBC and Anchorpoint | VERIFIED | https://cointelegraph.com/news/hong-kong-first-stablecoin-licenses-issued |
| 7 | Australia Digital Assets Framework bill passed ~1 Apr 2026, AFSL, ~12 months after Royal Assent | VERIFIED (date inferred from article date) | https://www.theblock.co/post/396009/australia-passes-crypto-bill |
| 8 | MAS draft Payment Services Act stablecoin amendments 1 Sep 2026, consultation closes 16 Oct 2026, no enactment date | VERIFIED | https://www.gibsondunn.com/singapore-publishes-draft-legislation-to-implement-its-stablecoin-framework/ . Live /singapore says "will be drafted in 2026" |
| 9 | Singapore FinTech Festival 18 to 20 Nov 2026, Singapore EXPO | VERIFIED | https://www.ft.lk/financial-services/Singapore-FinTech-Festival-2026-in-November-to-bring-global-leaders-together-for-Insights-to-Action/42-794478 |
| 10 | WebX 2026 13 to 14 Jul, Prince Park Tower Tokyo | VERIFIED date and venue | https://webx-asia.com/en/ ; https://fintechnews.hk/hong-kong-fintech-events/event/webx-2026/ |
| 10b | "13,160 attendees from 88 countries" (also "296 speakers, 195 sponsors") attached to WebX 2026 (services web3-pr-campaigns, founder-profiling, /japan) | **NOT SUPPORTED, timing impossible** | No such figure on webx-asia.com. Post-event coverage reports about 13,600 attendees from more than 90 countries for 2026 (https://www.aicoin.com/en/article/546798 ; https://www.odaily.news/en/post/5212256) and over 14,000 from 90+ countries for 2025 (https://coinedition.com/webx-2025-draws-over-14000-attendees-in-its-latest-edition-in-tokyo/). "88 countries" appears only in an event-listing blurb about earlier editions. The figure was first added in 9a63072 on 2026-06-04, five weeks before the event, while the text says the event is "opening this week" |
| 11 | Korea Blockchain Week 2026 "September 22 to 28, Impact at COEX" (5 service pages, /speaker, JSON-LD) vs "29 Sep to 1 Oct, Walkerhill" (/apac, /korea) | **CONTRADICTED, RESOLVED 10-16 (high)** | Organiser press release: KBW 2026 runs 29 Sep to 1 Oct 2026 in Seoul, Walkerhill, Upbit main sponsor ; https://thedefiant.io/news/press-releases/kbw-2026-returns-to-seoul-september-29-october-1-upbit-joins-as-main-sponsor ; https://www.dlnews.com/external/kbw-2026-returns-to-seoul-september-29october-1-upbit-joins-as-main-sponsor/ . The "Sept 22 to 28 / COEX" text is wrong in both dates and venue, and the event ended 1 Oct, so every "highest-leverage window" sentence is now also in the wrong tense |
| 12 | "Future Blockchain Summit (Dubai, October 2026, part of GITEX Global)" (/dubai-mena, JSON-LD) | **CONTRADICTED / UNSUPPORTED, RESOLVED 10-16** | The 8th edition ran 12 to 15 Oct 2025; no 2026 edition found. Earlier fetch: futureblockchainsummit.com redirects to https://www.gitexfdx.com/ ("GITEX Future Digital Assets Forum", Dubai, 8 to 10 Dec 2026; a third-party directory lists the same dates). Treat "October 2026" as wrong until the owner has a source |
| 13 | MANTRA Chain $11M raise, CoinDesk 2024-03-19 | VERIFIED (article, amount, Shorooq lead); "CoinDesk exclusive" **UNVERIFIED** | https://www.coindesk.com/business/2024/03/19/mantra-chain-raises-11m-for-rwa-tokenization-with-middle-east-tint/ : by Danny Nelson, no exclusive label in fetched text |
| 14 | RARI Chain mainnet coverage, The Block 2024-01-24 | VERIFIED (article). "11 tier-1 placements in 24 hours" and "9-day CoinDesk embargo" **UNVERIFIED** (repeated on 100+ pages) | https://www.theblock.co/post/273833/... ; Jana Bertram is quoted as Rari Foundation Head of Strategy (also a testimonial author) |
| 15 | Web3Auth "Yahoo Finance" placement | **MISLEADING** | https://finance.yahoo.com/news/trust-wallet-partners-web3auth-simplify-180500670.html is a paid GlobeNewswire press release (2023-04-26), labelled paid by Yahoo; used as a Yahoo Finance coverage logo on the press strip of 106 pages and in the homepage "Coverage in ... Yahoo Finance" |
| 16 | "The May 2026 core update explicitly down-weights mass-produced, experience-light content" (work/mantra-chain; article-9, article-10) | **UNSUPPORTED, re-checked 10-16** | Google's status dashboard lists "May 2026 core update", started 21 May 2026, no description (https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history). Reports quote Google calling it "a regular update" and say it published no update-specific content guidance; "scaled content was hit" is third-party analysis. Source cited on page is a third-party blog (plandigi.com) |
| 17 | "Google's own June 2026 guidance" (articles 11, 14, 95, 97) vs "Google's own May 2026 guidance" (article-8; live /services/token-launch-pr says "Google's May 2026 AI optimization guide") | INCONSISTENT | Google's AI optimization guide page shows "last updated 2026-07-10"; the same document is dated two different months across pages |
| 18 | Fluence: "up to roughly 80 percent" saving "by Fluence's own 2025 figures", "$1M ARR", product "Fluence Network" (/work/fluence, "UPDATED MAY 2026") | STALE / UNVERIFIED | https://fluence.ai/ (301 from fluence.network): now "Fluence Cloud", headline "up to 85%", no ARR figure. A 10-16 search found no source for "$1 million ARR". CoinDesk's author page lists Tom Trowbridge as co-founder and CEO of Fluence, so the title variants on the site are compatible (see section 3) |
| 19 | Bullieverse "$4M seed", Inc42 | PARTLY VERIFIED | https://inc42.com/buzz/metaverse-startup-bullieverse-raises-funding-to-build-play-to-earn-games/ : 19 Feb 2022, $4M, no named lead, not described as "seed"; "Economic Times exclusive" not checked |
| 20a | Anthropic "$965B post-money on May 28, 2026" (article-4, article-9, article-9 JSON-LD description) | VERIFIED, RESOLVED 10-16 | $65B Series H, announced 28 May 2026: https://news.bloomberglaw.com/private-equity/anthropic-raises-at-965-billion-valuation-eclipsing-openai-1 ; https://www.newsquawk.com/headlines/anthropic-has-raised-usd-65bln-in-a-series-h-funding-round-at-a-post-money-valuation-of-usd-965bln-bloomberg-reports |
| 20b | OpenAI "$852B" (article-9) | VERIFIED, RESOLVED 10-16 | $122B round closed 31 Mar 2026 at $852B post-money: https://news.bloomberglaw.com/tech-and-telecom-law/openai-valued-at-852-billion-after-closing-122-billion-round |
| 20c | "Mistral doubled to $14B in under a year after ASML's EUR 2B investment" (article-9) | **INACCURATE, RESOLVED 10-16** | $14B (about EUR 11.7 to 12B) is the Sept 2025 valuation (https://www.bloomberg.com/news/articles/2025-09-03/mistral-set-for-14-billion-valuation-with-new-funding-round). The prior mark was EUR 5.8B in June 2024, so the doubling took about 15 months, and the figure is 13 months old on an article stamped 2026 that compares it with May 2026 marks |
| 21 | Forbes (Cloris Chen, 2024-12-23), Decrypt 297060, Blockworks Web3Auth, Benzinga Gaia links | UNVERIFIED (403) | Access blocked, not evidence of falsity |
| 22 | Korea: "FSC rolled five-minute exchange balance reconciliation and a zero-threshold Travel Rule live by end May" (apac, korea, services/apac-pr, llms-intro, articles 87 and 120; 7 body pages mention Travel Rule) | **HALF VERIFIED, HALF CONTRADICTED (NEW 10-16)** | Five-minute reconciliation: VERIFIED, FSC press release 6 Apr 2026 (exchanges to reconcile ledger to wallets at five-minute intervals, five major exchanges to build by May): https://fsc.go.kr/eng/pr010101/86638 . Zero-threshold Travel Rule: NOT live in May. Cabinet approved removal of the 1M won threshold on 11 Aug 2026, effective about 19 or 20 Feb 2027: https://cointelegraph.com/news/south-korea-expands-travel-rule-aml-overhaul ; https://tradeinformer.com/regulations/south-korea-abolishes-the-1-million-won-travel-rule-threshold-and-tightens-vasp-registration . A rule stated as in force is actually pending. Whether the May reconciliation deadline was met is not confirmed |
| 23 | Korea: "South Korea set a 20 percent ownership cap for crypto exchanges with a 3-year grace period" (korea-body) | **OVERSTATED (NEW 10-16)** | Terms were agreed in a March 2026 consultation; the Digital Asset Basic Act had not passed as of late September 2026 and was expected in an Assembly subcommittee in November: https://www.theblock.co/post/392169/south-korean-authorities-settle-ownership-limit ; https://sumsub.com/media/news/south-korea-plans-consolidated-digital-asset-bill/ . "Set" should read "proposed" |
| 24 | Singapore: "the IMDA Cyber Security Act 2025 amendments" (live /singapore; WT removed it) | **WRONG NAME AND AGENCY (NEW 10-16)** | The law is the Cybersecurity Act 2018, amended by the Cybersecurity (Amendment) Act 2024, administered by CSA not IMDA; first tranche in force 31 Oct 2025 (Gazette S 677/2025): https://www.bakermckenzie.com/en/insight/publications/alerts/2025/11/singapore-cybersecurity-act-amendments-effective ; https://privacymatters.dlapiper.com/2025/12/singapore-key-amendments-to-the-cybersecurity-act-now-in-force/ |
| 25 | /dubai-mena: "ADGM FSRA Product Intervention Powers effective January 1, 2026, allowing them to restrict crypto-derivatives" | UNVERIFIED (NEW 10-16) | Searches found a 2025 amendment adding a virtual-asset product intervention power but no 1 Jan 2026 date and no derivatives-specific scope |
| 26 | /japan: "June 1 2026 Payment Services Act amendments" | SUPPORTED, date disputed (NEW 10-16) | Digital Policy Alert and CryptoSlate give 1 Jun 2026; Global Law Experts gives 13 Jun 2026. No official source found |
| 27 | Blockworks listed as a current placement and pitch outlet (246 of 258 bodies, 152 JSON-LD files; article-1: "Blockworks for institutional") | **STALE FOR NEW PITCHES, RESOLVED 10-16** | Blockworks closed its news division and laid off its journalists on 29 Oct 2025 and pivoted to data and software: https://www.blockhead.co/2025/10/30/blockworks-shuts-down-news-division-lays-off-journalists-in-pivot-to-data-business/ ; https://talkingbiznews.com/media-news/blockworks-is-shutting-its-news-operation/ . Past placements (for example Web3Auth, if before Oct 2025) can be true; forward advice to pitch Blockworks news and any 2026 placement claim cannot |
| 28 | "Google AI Mode has passed one billion monthly users" (services/cybersecurity-pr, llms-intro) | SUPPORTED (secondary) | Multiple reports of Google's I/O 2026 announcement and Alphabet Q2 2026 coverage, e.g. https://tech-insider.org/google-ai-mode-1-billion-users-io-2026/ ; primary Google post not fetched |

Not independently checked (no primary source reachable): "position-one CTR fell from 27 to 11 percent", "AI Overviews on roughly 48 percent of US queries" (cited to three different sources on three pages: WordStream/Heroic Rankings, BrightEdge, Search Engine Land), "earned media drives 48 percent of LLM brand citations" (AuthorityTech/Profound), "3.2x" (ALM Corp), "73 percent of B2B buyers" (AuthorityTech), "~$23.5K median Series B agency retainer" (services/cybersecurity-pr and llms-intro, no source), "12.5M NISA accounts", "400K Gaia nodes", "more than 1,170 active projects as of Q1 2025 (Messari)". The coincidence of the figure 48 percent attached to two unrelated statistics is itself a generation-drift signal.

Recent refresh runs 86, 87 and 88 deserve credit: every fact I could check from their cited sources (rows 2, 3 as corrected in apac WT, 4, 6, 7, 8, 9) is correct. The errors that remain sit in pages those runs did not touch (service pages, /speaker, /dubai-mena, /korea) or in text that predates them.

---

## 3. Claim consistency table

| Claim | Variants found (where) | Contradiction? |
|---|---|---|
| Years of experience | "Six years" / "6 years" (about, homepage, 100+ landing pages, YouTube description in sitemap); "since 2019" (about stat "Years 6 since 2019", article-9, article-10, pages/ai-search-visibility-agency "50+ protocols since 2019"); homepage footer "2019-2026"; career timeline starts 2020 (CryptoDailyUK, Momentum6); article-79 "senior fractional operator with ten to fifteen years of active, category-specific placement experience" | **Yes.** 2019 to 2026 is 7 years; the timeline says 2020 (6); article-79 implies 10 to 15. The "six years" counter has not ticked since it was written |
| Protocols / clients | "50+ protocols/founders" (about 500 hits, never changes); homepage "50+ Product launches", "500+ Media placements", "150+ Tier-1 publications", "5B+ impressions", "25+ Countries"; "100K+ media mentions per quarter" (about, JSON-LD); "200+ vetted KOLs"; "100+ journalists, 150+ KOLs" (CMC tenure) | Not contradictory but **none sourced**; 50+ unchanged across 2025 to 2026 video, JSON-LD and copy |
| Retainer price (Shilika fractional) | $3K-$7K (about 384 file hits, llms.txt, compare pages, SHILIKA_PRICING constant); **$5k-10k** (homepage intro sentence, homepage meta description in app/page.tsx, home.json source, so also OG); $5K-$14K Web3 (faq-body, homepage FAQ and JSON-LD); AI $6K-$14K (article-4, article-9); cybersecurity $7.5K-$15K (faq, article-4) vs **$3,000-$7,000 in article-10 and /services/cybersecurity-pr "$3K-$7K" in llms.txt**; $4K-$10K founder voice; $6K-$14K pre-TGE and APAC; $8K-$15K Fluence case; $3K-$7K Gaia case; $6K-$12K Web3Auth case; $5K-$12K stat cards | **Yes, severe.** Live homepage shows $3k-7k, $5k-10k and $5K-14K in one page. 11 playbooks have a $5K-$12K hero stat card above $3K-$7K prose (article-100, 106, 28, 39, 56, 57, 60, 80, 90, 93, 94). Cause: the 100-article generator brief (scripts/gen-playbooks.workflow.js line 47) literally cites "$5K-$12K/mo" as the example stat, and the 10-13 repricing replaced prose but not stat cards |
| Roles and titles | Myosin: "Head of PR" (about, article-1/4/9/10 bios) vs "APAC PR & Partnerships at Myosin" (apac-body, llms-intro, article-117) vs "leads PR & partnerships" (about); the about timeline gives "APAC PR & Partnerships" as the CoinMarketCap title (2021 to 2023). Self-description: "Mentor, advisor & Web3 PR consultant" (article-1), "Fractional PR Manager" (llms-intro, article-117), "Senior Web3 & AI PR consultant" (article-4), "fractional senior operator" (services). CoinMarketCap listed both as employer and as a client ("Led PR for Gaia AI, CoinMarketCap, Polygon") | **Yes (titles).** myosin.xyz homepage fetch did not list her (inconclusive) |
| Tom Trowbridge (Fluence) | "co-founder" (15 mentions), "Fluence CEO" (services/content-writing, 2 mentions), "unknown DePIN operator" (article-3) | **Downgraded 10-16: not a title contradiction.** CoinDesk's author page lists him as co-founder and CEO of Fluence (https://www.coindesk.com/author/tom-trowbridge), so both variants are true. "Unknown DePIN operator" in article-3 is a characterisation of an identifiable, publicly known person and should be reviewed for tone and accuracy |
| Web3Auth | "30+ placements across seven languages ... in one week" (pages/web3-infrastructure-pr-agency) vs "four language markets" (/work/web3auth) vs "syndicated into three more language markets" (services/cybersecurity-pr) | **Yes** |
| RARI Chain | "11 tier-1 placements in 24 hours" (100+ pages) but outlet list includes NFTNow, CryptoNews and "10+ regional APAC outlets", plus APAC translations counted among the 11 | Definition inflation |
| Team size | "no AE or junior writer layer" (services) vs "we placed / our network" voice in 51 bodies (70 uses, mostly campaign-team "we") | Minor |
| Testimonials | "19 unedited LinkedIn recommendations ... founders, CMOs, exchange leads and journalists at CoinDesk, Cointelegraph, Decrypt, The Block and Forbes ... 2021 to 2026" | **Yes.** Data: 5 clients, 6 same-team colleagues, 4 managers, 3 other-company, 1 teacher; zero journalists at named outlets (one "Ex-Journalist, Aspiring Film Writer"); 16 dated 2025, 2 in 2022, 1 in 2019 |
| Blockworks | Listed as a current placement/pitch outlet in 246 of 258 bodies and 20+ how-to-pitch playbooks vs a Supabase blog stating "In October 2025, Blockworks shut down its news division and laid off its journalism team" | **Resolved 10-16: the blog is right, the 246 pages are stale** (row 27). Pitching and "placed in Blockworks" claims need a date qualifier |
| Event facts across pages | KBW: "Sept 22 to 28, Impact at COEX" (5 service pages, /speaker) vs "29 Sep to 1 Oct, Walkerhill" (/apac, /korea, apac-pr WT); Token2049 Dubai: "May 2026" (service pages) vs "21 to 22 Apr 2027" (/apac, /dubai-mena, kol-marketing) vs "2026 Q2 attended" (/speaker) | **Yes.** The site contradicts itself, and the correct version is the minority one |

---

## 4. Unreviewed AI-generated text risk: 12 pages sampled

Context: commit 1aab448 and the 100-article generator scripts/gen-playbooks.workflow.js ("ghostwriting ... in the voice of Shilika Jain") show most of the 106 playbooks and 106 landing pages were generated by agents, with a style check (scripts/check-humanization.mjs) and an FAQ-parity check (258/258) but no factual review gate. The brief tells writers not to fabricate statistics yet also mandates "real numbers" in a hero stat card. Machine-translated zh/ko/ja/es/ru pages (about 110 sitemap URLs) carry no translation disclosure and inherit every claim below.

| # | Page | Items that could not be verified, are wrong, or look generated |
|---|---|---|
| 1 | / | 500+ placements, 150+ tier-1, 5B+ impressions, 50+ launches, 25+ countries; client wall (Ripple, Polygon, OKX, Solana, Stellar, Gnosis Guild, ...) with no per-client evidence; three prices; "Yahoo Finance" coverage is a paid release; Blockworks listed as an outlet |
| 2 | /about | "100K+ media mentions per quarter across network", "200+ vetted KOLs", "100+ journalists, 150+ KOLs"; "Years 6 since 2019" |
| 3 | /testimonials | JSON-LD adds `aggregateRating 5.0 / 19 reviews` and per-review `reviewRating 5` on a Person; LinkedIn recommendations carry no star ratings, so the ratings are invented (rich-result eligibility of self-authored ratings on a Person is doubtful; not verified against Google's review-snippet policy in this audit). Only 4 of 19 are marked up, and they are spliced excerpts (Gafoor Khan, Nicole Rochette: middle sentences dropped) while the page says "unedited, no edits" |
| 4 | /speaker | "2026 Q2 Token2049 Dubai ... (attended)" for an event that was postponed to 2027 (row 3); two past events listed as upcoming "planned ... Awaiting confirmation"; KBW dates and venue wrong; page last edited 2026-10-13 in the commit titled "verified speaking entries" |
| 5 | /work/fluence | "more than 1,170 active projects as of Q1 2025 (Messari)" (no link), "$1M ARR" (no source found), "up to roughly 80 percent" (vendor now says 85), "35 percent more organic clicks (industry data, May 2026)", "unknown DePIN operator" |
| 6 | /work/gaia-ai | "400K Gaia nodes at campaign peak", "3.2 times the rate (ALM Corp May 2026 sample)", "48 percent (AuthorityTech / Profound)", Forbes link unreachable |
| 7 | /work/web3auth | Yahoo Finance paid release as placement; "seven languages / four / three" |
| 8 | /services/web3-pr-campaigns | "13,160 attendees from 88 countries" for an event not yet held when written, and not matching post-event reports; "opening this week"; KBW and Token2049 Dubai errors |
| 9 | /services/cybersecurity-pr | "27 percent to as low as 11 percent", "press releases account for roughly one percent", "$23.5K median Series B agency retainer" (no source, repeated in llms-intro); the AI Mode one billion claim is supported (row 28) |
| 10 | /services/token-launch-pr | "this week's press cycle", wrong KBW dates, "May 2026 Token2049 Dubai", "11 simultaneous tier-1 placements" |
| 11 | /playbook/ai-startup-pr-2026 | Anthropic $965B and OpenAI $852B are correct; "Mistral doubled to $14B in under a year" is not (row 20c); "May 2026 core update accelerated this"; sources are secondary blogs; sitemap lastmod 07-29 not corroborated by git |
| 12 | /playbook/fractional-vs-agency | "Rates have held steady into H2 2026 ... Fractional retainers still sit at $3,000 to $7,000" where the sentence originally read "$5,000 to $12,000" (git show 89b25f5 vs cbc5c01); changelog "this quarter"; "73 percent of B2B buyers" (AuthorityTech) |

Extra checks: /work/mantra-chain ("explicitly down-weights" claim, "CoinDesk exclusive"), /work/rari-chain (11 placements), /korea (ownership cap and Travel Rule stated as settled or live), /singapore (IMDA mislabel), and the Supabase blog "how-to-pitch-coindesk-the-block-blockworks-decrypt-2026", which names journalists with titles (Jesse Hamilton "Deputy Managing Editor, Global Policy and Regulation", Omkar Godbole "Managing Editor, Markets", Ian Allison "Senior Reporter") and asserts a Blockworks news shutdown (the shutdown is correct, row 27); named-person claims with no sources, high risk if any title is wrong. The 106 playbook bodies themselves avoid naming individual journalists, which is a positive.

Fabricated-looking quotes: none found in the 12 sampled pages beyond the testimonial excerpting in row 3 above. Invented case numbers: not proven, but 13,160 / 88 / 296 / 195 (WebX), $1M ARR (Fluence), "400K nodes" (Gaia) and "11 in 24 hours" (RARI) each lack a retrievable source and in the WebX case conflict with the published post-event counts.

Lower-risk, checked and fine: press-strip links exist for MANTRA (CoinDesk), RARI (The Block), Cointelegraph (a "Hashing It Out" podcast write-up dated 2024-04-04, not news coverage), Inc42 Bullieverse.

---

## 5. What is working

- Sitemap `lastModified: new Date()` was removed and replaced by sparse, hand-set dates with an explanatory comment in app/sitemap.ts.
- Date moves are tied to real edits in all 46 events; the recent run logs (85 to 88) document what changed, with cited sources, and their facts check out.
- Sitemap, labels and JSON-LD agree for article-56, article-70, dubai-mena, india, korea, apac and singapore (WT).
- FAQ visible-vs-schema parity is enforced by script (258/258).
- The 106 playbook articles avoid named-journalist claims.
- The latest refresh (WT) already corrects the Token2049 Dubai move, the MAS draft timing, the Japan Diet vote and the IMDA mislabel; shipping it removes several of the worst items.

## 6. Recommendations (ranked)

1. Push or discard the 32 uncommitted files so production stops serving known-wrong facts (/singapore, /services/apac-pr, homepage Q2 2026). Owner: code/SJ. Effort: small.
2. Fix the confirmed-wrong event facts everywhere, then rewrite them in the past tense: KBW 2026 = 29 Sep to 1 Oct, Walkerhill (5 service pages, JSON-LD, /speaker); delete "May 2026 Token2049 Dubai press cycle" and the /speaker "2026 Q2 Token2049 Dubai (attended)" row (the event moved to 21 to 22 Apr 2027); remove WebX "this week" and "ten weeks out"; resolve the /dubai-mena Future Blockchain Summit line. Owner: code + SJ for the speaker row. Effort: small.
3. Correct regulatory statements stated as done: Korea zero-threshold Travel Rule (approved 11 Aug 2026, effective about Feb 2027), Korea 20 percent cap ("proposed"), Japan 20 percent tax (give the 2028 timing and status), "IMDA Cyber Security Act" (Cybersecurity Act, CSA). Owner: code. Effort: small.
4. Single source of truth for price and experience: one constants file feeding homepage hero, meta description, FAQ, JSON-LD, llms-intro, stat cards; reconcile $3K-$7K vs $5K-$10K vs $5K-$14K; fix 11 stat cards and article-6 "held steady". Owner: code + SJ decision on the real number. Effort: medium.
5. One `lastReviewed` per page driving visible label, JSON-LD dateModified and sitemap lastmod, with a CI check that fails on mismatch or on a date moved without a content-hash change; add dateModified to the 8 service pages and 106 /pages (or drop their labels); remove `new Date()` from the llms routes and the hard-coded date in llms-intro.md. Owner: code. Effort: medium.
6. Remove invented rating markup (aggregateRating 5/19 and Review.reviewRating on a Person), quote testimonials verbatim or mark excerpts. Owner: code. Effort: small.
7. Source or delete unverifiable numbers: 13,160/88/296, 400K nodes, 1,170 projects, $1M ARR, 3.2x, 48 percent x2, 35 percent, $23.5K, 500+/150+/5B+/25+, "11 tier-1 placements in 24 hours" (keep a list of the 11 URLs on /work/rari-chain). Reword the Princeton GEO line to "up to 40 percent visibility improvement in the paper's benchmark", drop "explicitly down-weights" for the May core update, fix "Mistral doubled in under a year". Owner: SJ. Effort: medium.
8. Add a fact-review gate to generation: lint that bans time-relative words ("this week", "weeks out", "now live", "through mid-2026") and requires a dated source for each named statistic; add a human review checkbox before dateModified may move; add a dated qualifier to Blockworks and label the Web3Auth Yahoo item as a paid release. Owner: code + SJ. Effort: medium.

## 7. Reproduce

```
cd /private/tmp/claude-504/-Users-thunderbolt-Documents-projects-Shilika/c0dc2b3b-3b31-46db-9535-df2409eb89af/scratchpad/audit
python3 history.py         # builds events.json, history.pkl, final.json from git
python3 an6.py             # date-state changes with cumulative word counts -> bumps.json
python3 price2.py          # pages with both $5K-12K and $3K-7K
python3 ctx.py "<regex>" 90 40   # context grep across partials and app code
cd /Users/thunderbolt/Documents/projects/Shilika
git grep -l "five-minute" HEAD -- app/_partials          # HEAD vs WT comparison of a claim
grep -oE "September 22 to 28[^.]{0,60}" app/_partials/*.html   # stale KBW dates
```
Key repo paths: app/sitemap.ts, app/llms.txt/route.ts, app/_partials/llms-intro.md, app/compare/_data/shilika.ts, app/testimonials/page.tsx, data/testimonials.json, app/_partials/testimonials-jsonld.json, app/_partials/speaker-body.html, app/_partials/korea-body.html, app/_partials/singapore-body.html, scripts/gen-playbooks.workflow.js, supabase/migrations/0001_blog_foundation.sql, data/ai-citation-panel/summary/*.md.
