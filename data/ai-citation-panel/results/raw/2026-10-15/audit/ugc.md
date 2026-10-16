# Audit: Community and UGC surfaces that feed AI answers (Shilika Jain, shilikajain.com)

Date of audit: 2026-10-15. Scope: Reddit, Quora, Hacker News, X, LinkedIn Pulse, Medium, Substack, YouTube, plus the adjacent creator platforms that turned up (dev.to, HackerNoon, Binance Square, Notion sites, beehiiv). Nothing inside the Shilika repo was modified. Scratch files are under `/private/tmp/claude-504/-Users-thunderbolt-Documents-projects-Shilika/c0dc2b3b-3b31-46db-9535-df2409eb89af/scratchpad/audit/` (this report, `serp_log.py`, `tally_output.txt`, `tally_output2.txt`, `raw/`).

Health score for this area: **3 / 10.** Short version: Shilika owns a handful of real profiles (LinkedIn, X, YouTube, dev.to, HackerNoon) and one of them (the dev.to profile) is the only Shilika-owned URL that surfaced for the buyer prompts in this audit. But she has zero presence inside any thread, listicle or video that ranks for the 25 buyer prompts, Reddit could not be audited at all with the tools available, and the profiles disagree with each other about who she is and what she does.

---

## 0. Read this first: limits of the evidence

1. **Reddit is unreachable from every tool in this environment.** I could not list a single Reddit thread, so every Reddit statement in this report is either "unverified" or a procedure for SJ to run by hand. Details in section 2.
2. **WebSearch is not Google and is not an AI engine.** It is a US-only search tool whose results I treated as a proxy for "what a retrieval-based answer engine can see". "Likely cited" below means "ranks in that tool for the query", never "observed in a ChatGPT/Perplexity/Gemini/Claude answer". The repo has no real AI-engine citation data: `data/ai-citation-panel/results/chatgpt/zz-fixture-2026-08-04.csv` contains only a header row, and the only real panel data is the four Google SERP CSVs in `results/serp-discoverability/`.
3. **Quora, Medium and X pages could not be fetched** (HTTP 403 / 402 / "Command failed"). For those platforms, thread age, answer counts and "open to replies" are marked unverified and the "who is mentioned" column relies on the search tool's own snippet summaries, which I treat as lower confidence.
4. **The search tool's summaries can be wrong.** Example found during this audit: one summary attributed a sponsored ViFox Coin article on HackerNoon to Shilika. Fetching the page showed the author is "Nica Furs" (@nicafurs), published 2026-05-13 under HackerNoon's Business Blogging Program. It is not Shilika's. I only report facts I re-fetched, and say so when I did not.
5. Numbers pulled from vendor pages (GrackerAI, Tinuiti, Profound, etc.) are vendor claims with their own incentives.

---

## 1. Method and commands run

| Step | Command / tool | Result |
|---|---|---|
| Read the 25 buyer prompts | `python3` over `data/ai-citation-panel/prompts.json` | 25 prompts, buckets A to E (A1..A5, B1..B5, C1..C5, D1..D5, E1..E5). Note: `data/ai-citation-panel/README.md` words C3, E1, E2 slightly differently from prompts.json (README is stale; prompts.json is the source of truth, revised 2026-08-16). |
| Run each prompt verbatim, no filter | 25 x WebSearch (standard mode) | 315 result slots, 268 distinct URLs, 138 distinct domains. Transcribed into `serp_log.py`. |
| Probe for Reddit organically | 7 x WebSearch with "reddit" / "site:reddit.com/..." wording | 64 slots, 31 domains, **0 reddit.com URLs**. |
| Platform-filtered searches | 41 x WebSearch with `allowed_domains` for quora.com, news.ycombinator.com, medium.com, substack.com, linkedin.com, youtube.com, x.com/twitter.com, dev.to | 406 slots, see section 3. |
| Reddit with domain filter | 4 x WebSearch `allowed_domains: ["reddit.com"]` | All 4 returned `API Error: 400 ... domains are not accessible to our user agent: ['reddit.com']`. Not retried. |
| Reddit fetch | WebFetch `reddit.com/r/BlockchainStartups/search.json?...` | `Claude Code is unable to fetch from www.reddit.com` |
| Reddit via curl | `curl ... reddit.com/r/BlockchainStartups/search.json` | `HTTP 403 size 189908` (bot-wall HTML page). I did not try to get around it. |
| Reddit via Browser pane | `mcp__Claude_Browser__navigate` to reddit.com search | `https://reddit.com is not allowed due to safety restrictions and cannot be opened in the Browser pane.` I stopped here and did not try mirrors, archives or proxies. |
| Reddit policy page | WebFetch `redditinc.com/policies/content-policy` | `Claude Code is unable to fetch from redditinc.com` |
| Hacker News API | `curl https://hn.algolia.com/api/v1/search?...`; WebFetch same | curl: `HTTP 000` timeout; WebFetch: `connect ECONNREFUSED`. HN item pages themselves (`news.ycombinator.com/item?id=...`) fetched fine via curl and WebFetch. |
| Quora fetch | WebFetch / curl on quora.com threads | WebFetch `Command failed with no output` (3 tries), then `HTTP 403`; curl `HTTP 000`. Quora policy page: 403. |
| Medium fetch | WebFetch on two medium.com articles | `HTTP 403 Forbidden` |
| X fetch | WebFetch `x.com/tradeguru/status/2000594584758309295` | `HTTP 402 Payment Required` |
| Sitemap size | `curl https://www.shilikajain.com/sitemap.xml` | HTTP 200, 715 URLs: blog 300, playbook 123, pages 107, tools 32, 5 locales x 21, compare 11, services 9, work 7, glossary 6. |
| YouTube metadata | `curl https://www.youtube.com/oembed?url=...` and `curl https://www.youtube.com/@shilikajain/videos` then parse | Channel "Shilika Jain \| PR Lead in Web3 and AI": **3 subscribers, 19 videos** (page HTML). First 7 videos show views 29, 10, 27K, 5, 4, 4, 3, all "5 mo ago". |
| HN thread metadata | `curl news.ycombinator.com/item?id=N` and regex | See section 4.2. `grep -i shilika` on each page: no match. |
| SERP panel recount | `python3 -I` over four CSVs with exact domain matching | See section 3.3. (My first pass wrongly matched `otrenix.com` on the substring "x.com"; the recount uses suffix matching.) |
| Google policy check | WebFetch of Google Search Central pages | See section 7. |

Tally output (`tally_output.txt`, abbreviated):

```
prompt_unfiltered : 25 searches, 315 slots
  dev.to 4 | notion.site 4 | hackernoon 3 | beehiiv 3 | pearltrees 3 | substack 2 | linkedin 2
  binance-square 2 | sites.google.com 1 | patreon 1 | hashnode 1 | medium 1 | vocal.media 1
  reddit 0 | quora 0 | news.ycombinator.com 0 | x 0 | youtube 0
shilikajain.com appearances in the 25 prompt searches: 0
Shilika-owned surfaces in the 25 prompt searches: A1 dev.to/shilika, A1 medialegacy1.dev.to/shilika_b760..., C2 dev.to/shilika, E3 dev.to/shilika
```

---

## 2. Reddit: what could and could not be done

**Could not do:** enumerate any Reddit thread (r/BlockchainStartups, r/CryptoMarkets, r/startups, r/PR, r/AI_Agents, r/cybersecurity, r/CryptoMarketing and similar), read thread age, comment counts, lock status, or whether Shilika or a competitor is named. Every route is blocked (see commands above). The absence of Reddit URLs in 25 verbatim prompt searches plus 7 Reddit probes (0 of 379 slots) is a property of the tool, not evidence that Reddit does not rank.

**Why it still matters (third-party estimates, unverified, they disagree):**
- Profound (Aug 2024 to Jun 2025, as reported by a roundup): Reddit 1.8% of ChatGPT citations, 2.2% of Google AI Overviews, 6.6% of Perplexity.
- Tinuiti (as reported): Reddit about 24 to 25% of Perplexity citations in Jan to Feb 2026, then 7% by April 2026.
- GrackerAI cybersecurity report (fetched, `gracker.ai/data-and-research-reports/state-of-ai-search-visibility-cybersecurity-2026`): says Reddit is about 11% of ChatGPT citations and names r/cybersecurity and r/sysadmin as increasingly cited, with no sample size for that figure. GrackerAI sells GEO tooling.
- Semrush, Otterly and Evertune are reported to rank Reddit first or near first in early 2026 samples. Methods differ, so treat the range 2% to 25% as "unknown, platform-dependent".

**What SJ should do by hand (logged in, her own browser), 45 minutes:**
1. In Reddit search, sorted by Top, time filter "Past year", run these and log URL, subreddit, age, comment count, locked or archived status, whether any agency or consultant is named, and whether the thread is an ask for recommendations:
   - `crypto PR agency`, `web3 PR`, `token launch PR`, `TGE PR`, `KOL marketing agency`, `fractional PR`, `PR consultant startup`, `AI startup PR`, `cybersecurity PR`, `analyst relations startup`, `Korea crypto marketing`, `Japan crypto PR`, `Dubai crypto PR`, `India web3 PR`.
2. Subreddits to check first (existence and rules to be confirmed by SJ): r/BlockchainStartups, r/CryptoMarkets, r/CryptoMarketing, r/startups, r/PR, r/AI_Agents, r/cybersecurity, r/Entrepreneur, r/SaaS.
3. Paste results into a new CSV (suggested path `data/ai-citation-panel/results/ugc-reddit/2026-10-xx.csv`; I did not create it).
4. Run the 25 prompts by hand in ChatGPT (search on) and Perplexity, and record every cited domain. That is the only way to learn whether Reddit, Quora, YouTube or LinkedIn is actually cited for these buyer prompts.

---

## 3. Platform counts

### 3.1 The 25 buyer prompts, verbatim, unfiltered (315 result slots, 138 domains)

| Group | Slots | Share |
|---|---|---|
| Agency / vendor-owned blogs (coinbound, icoda, guerrillabuzz, everything-pr, authoritytech, marketerhire, ninjapromo, avenuez, bospar, 5wpr, etc.; my classification) | 92 | 29.2% |
| Syndicated or sponsored crypto news (mexc.com/news, techbullion, cryptodaily, beincrypto, bitcoinist, blockchainreporter, chaincatcher) | 55 | 17.5% |
| UGC / creator platforms, all kinds | 28 | 8.9% |
| Big five community platforms (Reddit, Quora, news.ycombinator, X, YouTube) | **0** | **0.0%** |
| shilikajain.com | **0** | 0.0% |

Within the 28 UGC / creator slots: dev.to 4 (3 prompts: A1, C2, E3), notion.site 4, HackerNoon 3, beehiiv 3, pearltrees 3, Substack 2, LinkedIn 2, Binance Square 2, sites.google.com 1, Patreon 1, Hashnode 1, Medium 1, vocal.media 1. Fifteen of 25 prompts (A1, A4, A5, B2, B3, B4, B5, C1, C2, C3, C5, E1, E2, E3, E5) had at least one such URL. Top single domains: mexc.com 39 slots over 9 prompts, everything-pr.com 22 over 10, coinbound.io 11, authoritytech.io 10, techbullion.com 9, icoda.io 9, marketerhire.com 8.

Reading: in this search index, buyer prompts about PR firms are answered mostly by vendor-owned listicles and syndicated sponsored posts, not by community threads. That may differ in ChatGPT or Perplexity, which is why section 2 step 4 matters.

### 3.2 Platform-filtered searches (retrievability, not share)

Because each search was restricted to one platform, these counts only show that the platform has indexable content for these topics.

| Platform | Searches | Result slots | Notes |
|---|---|---|---|
| Quora | 9 | 91 | Many threads, most ICO-era (2017 to 2019 wording) or generic "PR for startups"; none about AI, cybersecurity or regional PR specifically. |
| Medium | 8 topical (+1 name query) | 81 | Heavy: 2025 and 2026 "best crypto marketing agency" listicles, token-launch guides, KOL guides, Korea/Japan/India/Dubai guides. |
| Hacker News | 6 | 70 | Old PR-for-startups threads (2008 to 2016), "Who is hiring" threads, and 2025/26 GEO meta-discussions. Nothing on crypto PR agencies. |
| LinkedIn | 5 topical (+1 name query) | 58 | Pulse listicles (2023 to 2026), fractional CMO articles, individual profiles. |
| YouTube | 4 topical (+1 name query) | 44 | Agency ads and explainers; one KOL explainer. |
| Substack | 4 | 40 | Founder-PR and Web3 launch newsletters, analyst-relations newsletters. |
| X | 1 topical (+1 name query) | 12 | Agency self-promo threads (FINPR), one tier list, one "CMO crisis" thread. |
| dev.to | 1 | 10 | Exact title of Shilika's own "Fractional PR for Web3 Startups" post did not return the post; it returned unrelated dev.to posts. Individual dev.to posts are not visibly ranking; only the profile page does. |

Reddit: 0 searches possible (400 error).

### 3.3 Shilika's own SERP panel (Google, from the repo)

`data/ai-citation-panel/results/serp-discoverability/*.csv`, column `top_competitor_domains`, exact domain matching:

| Run | Competitor-domain slots | UGC platform slots | Prompts where shilika_surfaced = true |
|---|---|---|---|
| 2026-08-04 | 138 | 0 | 9 of 25 |
| 2026-08-14 | 138 | 0 (1 `ycombinator.com`, which is the YC site, not Hacker News) | 7 of 25 |
| 2026-08-31 | 143 | 0 | 7 of 25 |
| 2026-09-25 | 163 | 4: `belkinmarketing.medium.com` (A3), `medium.com` (B3), `linkedin.com` (B4), `ventureunlockedcapital.substack.com` (E5), plus `ycombinator.com` (E5) | 13 of 25 |

Reddit, Quora, Hacker News, X and YouTube appear in 0 of 582 recorded competitor-domain slots across the four runs. Caveat: the column holds only the top few domains per prompt. So in Google, community platforms are not what displaces Shilika; agency and listicle sites are. UGC matters here mainly as an AI-answer input, not as a Google rival.

---

## 4. Highest-visibility threads and posts for the 25 prompts

"Prompts" = which buyer prompts the item plausibly feeds, based on topic match. "Shilika" = whether Shilika is mentioned (checked by fetch where I could; otherwise from the search tool's summary). None of the items below mention Shilika.

### 4.1 Quora (age and answer counts unverified: quora.com blocks fetches)

| URL | Prompts | Who is named instead (search-tool summary) | Age / activity | Open to replies |
|---|---|---|---|---|
| https://www.quora.com/What-are-the-best-crypto-PR-agencies-in-the-world | B1, B4, A2, E1 to E3 | Baden Bower PR and others | unverified (generation looks ICO-era) | unverified |
| https://www.quora.com/What-is-the-best-marketing-and-PR-agency-specialized-in-Blockchain-and-ICO | B1, B4 | Baden Bower PR (tool reports that answer is about 1,600 days old) | about 4.4 years for that answer | unverified |
| https://www.quora.com/Which-marketing-agency-has-been-providing-successful-crypto-marketing-services | B1, B3 | TelegramBooster (TGB Agency) | unverified | unverified |
| https://www.quora.com/Which-crypto-marketing-agency-provides-the-best-in-class-crypto-marketing-services | B1, B5 | Cryptoclicks.io (personal endorsement), Crowdcreate (self-description) | unverified | unverified |
| https://www.quora.com/How-does-a-crypto-PR-agency-help-create-and-spread-press-releases-that-work-well-in-the-cryptocurrency-industry | B2, B3 | an agency operator's answer | unverified | unverified |
| https://www.quora.com/What-are-good-PR-firms-for-technology-startups-looking-for-national-press-coverage-How-much-do-they-normally-charge | C1, C5, D1, D5, A3 | Edelman, Weber Shandwick, Highwire PR, LaunchSquad, OutCast, Macias PR, 9FigureMedia | tool says several answers are 5 to 6 years old | unverified |
| https://www.quora.com/Is-20k-per-month-too-high-for-a-PR-retainer | A3, D4 | content not seen | unverified | unverified |
| https://www.quora.com/Are-there-any-ICO-marketing-agencies-which-can-provide-Asian-marketing-services | E1 to E3 | TGB, Crowdcreate; one answer argues no single agency covers all of Asia | unverified | unverified |
| https://www.quora.com/How-much-does-a-crypto-marketing-agency-or-cryptocurrency-promotion-agency-cost | A3, E2 | one answer cites $5K to $80K retainers | unverified | unverified |
| https://www.quora.com/What-s-the-best-way-to-distribute-a-crypto-press-release | B2 | wire services | unverified | unverified |

Takeaway: Quora has live, indexable "who is the best crypto PR agency" threads, answered mostly by anonymous or promotional accounts, with no AI-startup, cybersecurity, Korea, Japan, Dubai or India specific thread surfacing. Those gaps (C-bucket, D-bucket, E-bucket) are open ground for a real-name expert answer, if the question exists or is asked.

### 4.2 Hacker News (fetched; exact metadata)

| URL | Date | Points / comments | Relevance | Shilika |
|---|---|---|---|---|
| news.ycombinator.com/item?id=2218209 "Why Your Startup Doesn't Need a PR Agency" | 2011-02-14 | 23 / 9 | PR-agency skepticism, old | no |
| item?id=10438634 "How to Get Press for Your Startup" | 2015-10-23 | 151 / 64 | press tactics, old | no |
| item?id=12557943 "Getting Press for Your Startup" | 2016-09-22 | 295 / 32 | press tactics, old | no |
| item?id=187668 "Ask PG: What Marketing/PR strategies..." | 2008-05-12 | 30 / 17 | PR firms for YC startups | no |
| item?id=49536375 "Three sites made 215,128 'best software' pages for AI. Perplexity cites them" | 2026-09-02 | 519 / 251 | critique of mass-produced "best X" pages that answer engines cite | no |
| item?id=46907123 "Ask HN: How does ChatGPT decide which websites to recommend?" | 2026-02-05 | 5 / 15 | GEO meta | no |

Reply status is unverified: logged-out HN HTML contains no reply controls, so I cannot tell. HN has no thread about crypto PR agencies, AI-startup PR firms or cybersecurity PR in these results. The 2026-09-02 thread is relevant as a warning: HN commenters are hostile to scaled "best X" pages that exist to be cited. Shilika's site has 106 `/pages/` landing pages, 123 playbooks and 300 blog posts (sitemap counts), so it should expect the same suspicion if it ever shows up on HN.

### 4.3 LinkedIn Pulse and profiles

| URL | Date / activity | Prompts | Named | Shilika |
|---|---|---|---|---|
| https://www.linkedin.com/pulse/top-10-web3-marketing-agencies-2026-jesper-mount-dkt3e | 2026-01-28; 17 reactions, 3 comments (fetched) | A2, B1, E3 | NinjaPromo, Lunar Strategy, One Click Ninja, MarketAcross, Coinbound, Crowdcreate, X10 Agency, Single Grain, OMNI Agency, ICODA; a commenter promotes GG Marketing; author's affiliation not stated, closing link goes to Lunar Strategy | no |
| https://www.linkedin.com/pulse/want-waste-your-cyber-security-start-up-funding-hire-pr-amoroso | date unverified | D1, D4 | n/a | no |
| https://www.linkedin.com/in/robertalynch323/ | profile | D1, D5 | solo cybersecurity PR, month-to-month from $3K (per tool summary) | no |
| fractional-CMO Pulse pieces (e.g. https://www.linkedin.com/pulse/what-fractional-cmo-ben-arritt) | various | A1, A4 | fractional CMO framing, not PR | no |

### 4.4 Medium (fetch blocked; titles and URLs from search results, contents unverified)

| URL | Prompts | Notes |
|---|---|---|
| https://medium.com/coinmonks/12-best-crypto-marketing-agencies-in-2026-full-review-ce5ee7c7c073 | A2, B1 | 2026 review; summary names Coinbound, MarketAcross, Lunar Strategy |
| https://medium.com/coinmonks/token-launch-marketing-2026-7-campaign-stages-every-web3-founder-should-know-03731072f66a | B3 | also appeared in the unfiltered B3 search |
| https://medium.com/@yuuceen/ai-startups-need-smart-pr-heres-who-s-delivering-cd88430e54e6 | C1 | only PR-specific Medium hit for AI startups; names Highwire PR and APCO Worldwide; tool flags it as sponsor-driven |
| https://belkinmarketing.medium.com/how-much-does-a-cmo-really-cost-a-tech-or-web3-startup-in-2026-the-full-breakdown-b8388e3d54aa | A3 | the SERP panel lists `belkinmarketing.medium.com` among A3 competitor domains on 2026-09-25 (same row where Shilika has 3 URLs) |
| https://medium.com/coinmonks/the-biggest-kol-marketing-mistakes-web3-startups-should-avoid-94d2eeba34b7 | B5 | KOL guide |
| https://medium.com/@thewebdesigninsider/top-10-crypto-marketing-agencies-in-south-korea-61babfde133f | E1 | Korea listicle, about 2 years old per tool |
| https://medium.com/@pattansey2004/pr-firms-in-dubai-whos-got-the-sauce-in-the-middle-east-ab3ebcf08cb9 | E4 | Dubai |
| https://medium.com/@coinscapture/best-web3-marketing-agency-in-india-2a082b94ea10 | E5 | India |

Shilika has no Medium profile surfacing in any search. Medium cross-posting is disabled in code (section 6).

### 4.5 Substack (fetched; exact dates and open comment sections)

| URL | Date | Engagement shown | Named | Comments | Shilika |
|---|---|---|---|---|---|
| https://theweb3marketer.substack.com/p/do-you-really-need-a-pr-agency | 2025-12-04 | 1 unlabeled count, no comments | names no agency; offers recommendations via DM | open | no |
| https://theweb3marketer.substack.com/p/the-50k-mistake-what-you-need-to | 2026-05-07 | about 3 comments | names no agency | open | no |
| https://presskit.substack.com/p/ai-search-is-sending-this-startup | 2026-03-30 | unlabeled 4 and 1 | an interview about PR placements feeding AI search; no agency named | appears open | no |
| https://cybersecandbiz.substack.com/p/why-analyst-briefings-matter-for | 2025-06-17 | about 4 comments | Gartner, Forrester, Omdia, IDC | open | no |
| https://davidobrovitsky.substack.com/p/from-zero-to-tge-your-web3-launch | 2025-09-23 | unlabeled 2, no comments | no agency | not stated | no |
| https://substack.com/@newsmeta (A1 unfiltered hit) | n/a | profile of a "Fractional CMO for web3 projects", no posts | n/a | n/a | no |

### 4.6 YouTube

| URL | Channel | Prompt |
|---|---|---|
| https://www.youtube.com/watch?v=OJ9HmeHqOfk "Crypto KOL Marketing Explained: Rates, Funnels, Contracts & What Works in 2025-2026" | InnMind | B5 |
| https://www.youtube.com/watch?v=QHfYSQtuWpk "Ultimate Crypto PR Guide - Crypto Press Releases (What to Know)" | Ty Smith | B2 |
| https://www.youtube.com/watch?v=50RTiw8Cy28 "Crypto Promo: Best Crypto Marketing Agency in 2026?" | Crypto Volt | B1 (agency promo) |
| https://www.youtube.com/watch?v=GfTeyv76Bi0 "Crypto PR Agency: Press Releases, Influencers & Media Coverage..." | Blockchain Buzz Beat | B1, B2 (agency promo) |

Search `fractional PR Shilika Jain` restricted to YouTube returned unrelated videos plus an unrelated "shilika" channel about After Effects (not hers). Her real channel is `youtube.com/@shilikajain` (found via oEmbed, not via search).

### 4.7 X

| URL | Date (decoded from the snowflake ID) | Content (tool summary, page not fetchable) | Shilika |
|---|---|---|---|
| https://x.com/tradeguru/status/2000594584758309295 | 2025-12-15 | crypto influencer-marketing agency tier list: MarketAcross, ICODA, FINPR, Lunar, Greendots | no |
| https://x.com/0xAbhiP/status/2043624022295171524 | 2026-04-13 | first result for "crypto PR agency recommendation thread"; content unverified | unverified |
| https://x.com/DeanKD_/status/1878970291336183970 | 2025-01-14 | "Crypto CMO crisis" options; names two PR specialists (per tool) | no |
| FINPR Agency posts (x.com/finpragency/status/1903024927986323654 and others) | 2025-03 | agency's own "top agencies" listicles that include itself | no |

### 4.8 Adjacent creator platforms that ranked in the prompt searches

dev.to/shilika (A1, C2, E3), `medialegacy1.dev.to/shilika_b760a675f394e9bd3` (A1, a dev.to alias URL), HackerNoon (A5 AI-visibility article, B2 press-release submission guide, E5 author profile `hackernoon.com/u/tanmaypatange` that markets itself as a Web3/AI PR agency), Binance Square hashtag pages (B5), Notion sites (B2 to B4, C3), beehiiv newsletters (B2, B3), vocal.media (E1 Korea crypto PR), Hashnode tag page (B2).

### 4.9 Per-prompt coverage (UGC only)

| Prompt | UGC surfaces seen | Shilika-owned UGC in results |
|---|---|---|
| A1 | dev.to profile (first result), Substack fractional-CMO profile, Medium/LinkedIn fractional CMO pieces | yes: dev.to x2 |
| A2 | Medium 2026 reviews, LinkedIn Pulse 2026 list, X tier list, Quora thread | no |
| A3 | Quora retainer threads, Substack (2 posts), Medium (Belkin) | no |
| A4 | LinkedIn fractional articles, one LinkedIn profile | no |
| A5 | Substack (presskit), HackerNoon | no |
| B1 | Quora, Medium, LinkedIn, X, YouTube listicles | no |
| B2 | Quora press-release threads, YouTube guide, HackerNoon help page, beehiiv | no |
| B3 | Medium token-launch guides, Substack launch guides, LinkedIn TGE posts | no (Google SERP also not surfacing for B3) |
| B4 | Quora, LinkedIn (SERP), Notion sites | no |
| B5 | YouTube KOL explainer, Medium KOL guides, Binance Square, Quora KOL cost | no |
| C1 | Medium (yuuceen), Quora tech-PR threads | no |
| C2 | dev.to profile, a LinkedIn profile | yes: dev.to |
| C3 | Notion portfolio page only; no thread on AI-founder op-ed placement | no |
| C4, C5 | Substack (presskit) only | no |
| D1, D5 | Quora (generic tech PR), LinkedIn profiles/articles, Medium (cybersecurity marketing) | no |
| D2 | Substack (analyst briefings) | no |
| D3 | HN GEO meta threads; Reddit r/cybersecurity per GrackerAI (unverified) | no |
| D4 | Quora generic retainer threads | no |
| E1 | Medium Korea guides, vocal.media Korea PR guide, Quora Asian-marketing thread | no |
| E2 | Medium Japan guides | no |
| E3 | dev.to profile (the search tool named Shilika as the closest match to "who runs APAC crypto PR for Web3 and AI founders") | yes: dev.to |
| E4 | Medium Dubai guide | no |
| E5 | Medium India guide, Substack (ventureunlockedcapital in SERP), HackerNoon author profile | no |

---

## 5. Shilika's own community and UGC footprint

| Surface | Evidence (fetched 2026-10-15 unless stated) | Assessment |
|---|---|---|
| dev.to/shilika | 79 published posts, 0 comments written, 0 tags followed, joined 2025-08-20. The 60 posts shown all date 18 to 21 June (newest 21 Jun, so nothing newer in about 16 weeks). Bio: "Head of PR at Myosin DAO", "former APAC PR lead at CoinMarketCap". Posts are API cross-posts with `canonical_url` pointing at shilikajain.com (`lib/integrations/cross-post.ts`). | The profile is the only Shilika-owned URL that surfaced for A1, C2, E3. A 60-post burst in four days, 0 comments and a dormant feed is a scaled-content pattern; platform enforcement risk is unverified. Individual posts do not appear to rank. |
| HackerNoon `/u/shill` | 3 stories, "Nominated for 2022 - HackerNoon Contributor of the Year - Founder Interview". Article "The Web3 PR Explained - Myosin Edition" (2026-03-19) has no link to shilikajain.com and no mention of fractional PR; links only to HackerNoon pages. Bio: "Global PR & Comms at Myosin DAO". | Real third-party-hosted asset, wasted as a brand signal. |
| LinkedIn `/in/shilika` | about 14K followers, 500+ connections, location Dubai, current company Myosin.xyz, posts "2 weeks ago" about Web3 PR and Token2049 (relative dates shown by LinkedIn; page partly behind login). About text says "PR, partnerships, and marketing". | Active, large. Positioning does not say "fractional PR" or "AI". A name search returns her LinkedIn posts from 2021 to 2022 (activity IDs 6866..., 6916..., 6935..., 6937..., 6976...), which is old content. |
| X `@Shilika_jain` | Appears for a name search. Bio (tool snippet, unverified): "all things public relations + comms @myosin_xyz @cryptodailyuk, prev @coinmarketcap @binance". | Binance appears in the X bio but nowhere on the site; see consistency table below. |
| YouTube `@shilikajain` | 3 subscribers, 19 videos. Embedded on the homepage (VideoObject JSON-LD): `beWNvo1l1aQ` ("PR for Web3 and AI Companies", 29 views) and `HuKCqoj6IvE` ("Shilika PR Portfolio", 10 views). A third video, `V1AL0kO2IXs` "Get PR Coverage for Web3 & AI Companies", shows 27K views in the channel HTML (unverified number). | The 27K video is not used on the site and has no VideoObject. Channel is not in `sameAs`. VideoObject names ("services pitch", "Introduction") differ from the real YouTube titles. |
| Medium, Substack, Quora, Hacker News, Reddit | No Shilika profile or post found by search on Medium, Substack, Quora, HN. Reddit unverifiable. Medium and Hashnode cross-posting are hard-disabled in code with the comment "disabled until their auth issues are resolved". | Absent. |
| Site `sameAs` | Person `sameAs`: LinkedIn, X, cryptodaily.co.uk author page, Calendly, Telegram. `llms-intro.md` lists only LinkedIn and X. | dev.to, HackerNoon and YouTube are missing even though dev.to is the surface AI-style search found. |

Role and title consistency (matters for entity resolution; one tool summary already hedged with "her Myosin DAO title in particular may be out of date"):

| Where | Role wording |
|---|---|
| Site schema `jobTitle` | "Fractional PR Manager for Web3 & AI Founders" |
| Site `/about` | "Head of PR, Myosin DAO" (since 2023) |
| Site `/work/*` pages | "Fractional PR Manager, APAC PR & Partnerships at Myosin" |
| dev.to | "Head of PR at Myosin DAO"; "former APAC PR lead at CoinMarketCap" |
| HackerNoon | "Global PR & Comms at Myosin DAO" |
| LinkedIn | current company Myosin.xyz, About "PR, partnerships, and marketing"; location Dubai |
| X bio (unverified snippet) | Myosin and Crypto Daily UK, prev CoinMarketCap and Binance |
| Name collisions seen in searches | "Shilpy Jain" Medium profile, an unrelated "shilika" YouTube channel, and one tool summary that misspelled the domain as "shikajain.com" |

---

## 6. What the site and pipeline do about UGC (code facts)

- `lib/integrations/cross-post.ts`: `crossPostAll()` posts only to dev.to. Hashnode ("WAF returning HTML") and Medium ("tokens deprecated") are skipped by hard-coded entries.
- `lib/agents/topic-research.ts` lines 131 and 253 tell the blog-writer agent to look for Reddit and Stack Overflow threads for real phrasing. That is research input, which is fine, but any reply to those threads should be human.
- `/playbook/press-coverage-startup-reddit-2026` ("What Reddit Gets Right and Wrong", dated 2026-06-23) says it fact-checks "the most-upvoted PR advice on Reddit". The fetched page contains **zero** reddit.com links and cites no thread. It also states "< 3% of HARO pitches convert" with no source. This is an unverifiable claim page; it could not be checked because Reddit is blocked.
- `app/_partials/apac-body.html` line 184 and `services__apac-pr-body.html` line 229 link, dofollow, to a competitor's Medium report (`medium.com/outset-pr-team/august-to-october-crypto-media-traffic-in-asia-drops-14-5-...`) as the evidence for APAC audience claims. Outset PR is a tracked competitor for B1 to B4.

---

## 7. Rules: what authentic participation looks like, and what would break them

### 7.1 What Google actually says (fetched)

- Google's "Optimizing for generative AI features" guide (added May 2026, last updated 2026-07-10) says generative AI features can surface what people say in blogs, videos and forum discussions, and that: "seeking inauthentic 'mentions' across the web isn't as helpful as it might seem."
- Google's spam policies page (last updated 2026-08-28) lists 16 named categories (cloaking, link spam, scaled content abuse, site reputation, user-generated spam and others) and says spam includes attempting to manipulate generative AI responses in Google Search. **There is no separate named "inauthentic mentions" spam policy.** SERoundtable (2026-05-28) reports Google's Gary Illyes and a colleague at Search Central Live Sydney (2026-05-15) compared buying or manipulating mentions to paid links, and treats it as guidance, not an enforceable rule. Treat it as: mention schemes are discounted at best and can be handled as link spam or scaled content abuse at worst.
- The same Google guide says you do not need AI-specific text files such as llms.txt to appear in Google's AI features. That is Google-only guidance and not a statement about other engines, but it is relevant to how much of the "GEO pass" should be expected to move Google.

### 7.2 Other rules

- **FTC Endorsement Guides** (fetched): connections between an endorser and a marketer that consumers would not expect must be disclosed clearly and conspicuously in the post itself; employees must disclose where they work.
- **FTC Consumer Reviews and Testimonials Rule** (effective 2024-10-21, per FTC): bans fake reviews and testimonials, and covers insider reviews without clear disclosure; FTC cited civil penalties of up to $53,088 per violation in December 2025 warning letters (inflation-adjusted figure, check current). A client or friend posting "I used Shilika, great" in a Reddit or Quora recommendation thread at SJ's request, or SJ posting as a fake customer, is exactly this.
- **Reddit and Quora platform rules:** I could not re-read either policy (blocked, 403). From memory, not verified this session: Reddit's content policy prohibits spam, vote manipulation and undisclosed promotion, and each subreddit adds its own self-promotion limits; Quora prohibits spam and promotional answers without disclosure. SJ must read each subreddit's sidebar and rules before posting.
- **Market evidence this is policed or at least tempting:** several agencies in the search results openly sell Reddit, Quora and Bitcointalk "campaigns" (GuerrillaBuzz, BlockWiz, Coinbound listing per the tool's summaries). That is the behavior to avoid, not copy.

### 7.3 Authentic participation (do)

1. **Use her real name and a disclosed role.** Reddit user flair or first line: "I run fractional PR for Web3 and AI founders" whenever the answer touches services, agencies or pricing.
2. **Answer the question, not the sale.** In a "which PR agency?" thread, give the evaluation checklist (ask for named placements, who does the work, retainer ranges, disclosure of sponsored content) and let the asker ask for names. Do not post the website link in the first answer; if a link helps (a tool, a data table), say it is hers.
3. **Add verifiable, non-promotional substance** from real work: how embargoes work, how Korean outlets re-syndicate, what a TGE press calendar looks like, what an analyst briefing is. These are the "expert answers" that get quoted.
4. **Recommend alternatives honestly** when she is not the fit (e.g. large AI infrastructure companies needing 5W or Edelman style scale). Credibility compounds.
5. **Cadence, not campaigns:** a few substantive answers per week across 3 to 4 surfaces, not 50 replies in a day.
6. **Comment before you publish.** dev.to profile shows 0 comments written; Substack posts in section 4.5 have open, near-empty comment sections.
7. **Own your content once, then syndicate with canonical tags** (already done for dev.to).

### 7.4 Would break rules or the spirit of them (do not)

- Any second account, "client" persona, friend or team member posting recommendations without disclosure (Reddit/Quora rules, FTC rules).
- Asking people to upvote, follow, or "drop a comment" in a recommendation thread (vote and engagement manipulation).
- Self-ranking listicles posted under another name or on a network of throwaway Medium/Substack/LinkedIn accounts ("Top 10 crypto PR consultants" with herself at number one). This is the inauthentic-mentions pattern Google warns about, and HN already shows hostile reaction to it (item 49536375).
- Paying for placements in "best of" posts or X tier lists without a clear "sponsored" label.
- Replying to years-old threads only to insert the site link.
- Mass AI-generated replies, or posting the same answer across many threads.
- Rebroadcasting the 79-post dev.to burst pattern on other platforms.
- Posting results or client names she cannot document. The site's own claims (50+ protocols placed, six years) are self-reported; any off-site restatement needs the same proof ready.
- Token promotion with income or price claims anywhere (Reddit, X, Telegram). KOL disclosure rules apply to her own KOL service.

### 7.5 Where she is genuinely useful, thread by thread (all unverified for replyability unless stated)

- Substack comments on Vanina's two posts (section 4.5): comments are open and nearly empty; the author invites DMs for agency recommendations, so a short, disclosed expert comment on how to vet crypto PR retainers fits.
- Substack `cybersecandbiz` analyst-briefing post: only if she has real cybersecurity analyst-relations experience to add. Her site claims cybersecurity PR; she should not comment where she cannot back it with a case.
- Quora: write new answers (real name, disclosed) to the "How does a crypto PR agency help ... press releases" and "Why do you need a crypto PR agency" threads, and ask or answer Asia-specific questions (the "Asian marketing services" thread has an answer saying one agency cannot cover all of Asia, which is exactly her regional pitch).
- LinkedIn: comment under Pulse listicles with the evaluation checklist rather than a pitch; publish her own original Pulse piece (not a copy of the playbooks).
- X: reply to "who do you recommend for PR" threads with disclosed, specific help; avoid tier-list threads authored by agencies.
- YouTube: answer comments on her own videos; add chapters and a transcript to the 27K video.
- Hacker News: not a buyer channel. Only a "Show HN" for a genuinely novel free tool she built (the sitemap lists 31 free tool pages, such as the AI citability checker and press release generator) following Show HN rules, with no solicited votes. Given Google's note on llms.txt and HN's reaction to GEO pages, an llms.txt generator is the wrong tool to lead with.
- Reddit: after the section 2 discovery, answer only in subs whose rules allow expert replies, from an account with a real history.

---

## 8. Prioritized recommendations

| # | Action | Owner | Impact | Effort |
|---|---|---|---|---|
| 1 | Reddit and AI-engine ground truth: run the section 2 manual search and run the 25 prompts in ChatGPT/Perplexity, logging cited domains | SJ / measurement | high | small |
| 2 | Add dev.to, HackerNoon `/u/shill` and `youtube.com/@shilikajain` to Person `sameAs`, `llms-intro.md` and `/about`; make LinkedIn, X, dev.to, HackerNoon, site use one role string | code + SJ | high | small |
| 3 | Start 3 to 4 weekly authentic, disclosed expert contributions (Substack comments, Quora answers, LinkedIn, X) per section 7; log each in a CSV | SJ | high | medium |
| 4 | Use the 27K-view YouTube video: embed it with VideoObject, add chapters and transcript, align JSON-LD names with real titles | code + SJ | medium | small |
| 5 | Rework the dev.to pipeline: stop bursts, set a slow cadence, add genuine comments, decide whether to re-enable Hashnode and Medium (or drop the dead code) | code | medium | medium |
| 6 | Publish original, link-bearing pieces on HackerNoon and a LinkedIn Pulse article that mention fractional PR and link to the site (the Mar 2026 HackerNoon article has no link back) | SJ | medium | medium |
| 7 | Fix or retitle `/playbook/press-coverage-startup-reddit-2026` (cite real threads or drop the "fact-checked" framing and unsourced HARO figure); reconsider dofollow links to Outset PR's Medium report | code | low | small |
| 8 | Do not buy, seed or self-rank mentions; write a one-page written policy so any freelancer or VA she hires follows the section 7 rules | SJ | medium | small |

---

## 9. Evidence index (files and URLs)

- Prompts: `/Users/thunderbolt/Documents/projects/Shilika/data/ai-citation-panel/prompts.json`
- SERP panel CSVs: `/Users/thunderbolt/Documents/projects/Shilika/data/ai-citation-panel/results/serp-discoverability/{2026-08-04,2026-08-14,2026-08-31,2026-09-25}.csv`
- Cross-post code: `/Users/thunderbolt/Documents/projects/Shilika/lib/integrations/cross-post.ts` (dev.to only; Hashnode and Medium skipped)
- Schema `sameAs` and VideoObjects: `/Users/thunderbolt/Documents/projects/Shilika/app/_partials/homepage-jsonld.json`
- Reddit playbook page: https://www.shilikajain.com/playbook/press-coverage-startup-reddit-2026
- Own profiles: https://dev.to/shilika, https://hackernoon.com/u/shill, https://www.youtube.com/@shilikajain, https://www.linkedin.com/in/shilika/, https://x.com/Shilika_jain
- Google: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide, https://developers.google.com/search/docs/essentials/spam-policies, https://www.seroundtable.com/google-inauthentic-mentions-ai-41401.html
- FTC: https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking, https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers
- Reddit citation-share context: https://gracker.ai/data-and-research-reports/state-of-ai-search-visibility-cybersecurity-2026 and the search-tool roundup of Profound, Tinuiti, Semrush, Otterly and Evertune figures (primary reports not read)
- Transcribed search results and tallies: `serp_log.py`, `tally_output.txt`, `tally_output2.txt` in the scratchpad audit folder

---

## 10. Addendum: re-verification after the interrupted run (2026-10-15 late evening / 2026-10-16 IST)

The first run hit a usage limit after this report was written but before the summary was returned. Before finalizing I re-ran the cheapest checks on the load-bearing claims. Nothing in the repo was modified.

| Claim re-checked | Command | Result |
|---|---|---|
| Sitemap is live | `curl https://www.shilikajain.com/sitemap.xml` | HTTP 200, 218,137 bytes |
| Reddit still blocked | `curl -A "Mozilla/5.0" https://www.reddit.com/r/BlockchainStartups/search.json?q=pr+agency&restrict_sr=1` | HTTP 403 (1,522 bytes this time; first run saw 189,908 bytes, still a block page). Not worked around. |
| Reddit still absent from search | extended WebSearch `reddit r/CryptoMarketing OR r/BlockchainStartups "crypto PR agency" recommendations 2026` | 0 reddit.com URLs. The tool itself said it "couldn't find any actual r/CryptoMarketing or r/BlockchainStartups threads". Returned agency listicles: influencermarketinghub.com, techbullion.com, apcollective.io. Running total of Reddit probes: 8 searches, 0 reddit.com URLs, 4 domain-filtered attempts rejected with HTTP 400. |
| HN thread metadata | `curl news.ycombinator.com/item?id=49536375`, `46907123`, `2218209` | 519 pts / 251 comments (page also shows "884 comments" elsewhere in the HTML, so the comment figure is not stable; treat as 251 to 884), 5 pts / 15 comments, 23 pts / 9 comments. Titles match section 4.2. |
| YouTube channel size | `curl https://www.youtube.com/@shilikajain/videos` | "3 subscribers", "19 videos" |
| Cross-post code | `grep` in `lib/integrations/cross-post.ts` | dev.to posting function present (`postDevTo`, line 91); Hashnode function present but skipped by `crossPostAll` per first-run read. |
| Reddit prompts in blog-writer agent | `grep -n -i reddit lib/agents/topic-research.ts` | lines 131 and 253 (this file is modified but uncommitted in git status, so line numbers can shift) |
| Person `sameAs` | `python3 -I` over `app/_partials/homepage-jsonld.json` | Person sameAs = LinkedIn, X, cryptodaily.co.uk author, Calendly, Telegram; a second block lists only LinkedIn and X. No dev.to, HackerNoon or YouTube string anywhere in the file. `llms-intro.md` lines 96-97 list only LinkedIn and X. |
| Reddit playbook page | fetched live page (`m3/reddit_pb.html`) | HTTP 200, 108,470 bytes, 0 occurrences of `reddit.com`. Text says "< 3% HARO pitches that convert to a placed story" with no source. The "2 hrefs containing reddit" are the page's own slug, not outbound links. |
| Outset PR Medium link | `grep` in the two partials | present at `apac-body.html:184` and `services__apac-pr-body.html:229` |

New observations from the extra searches:

- `WebSearch "Shilika Jain fractional PR Web3 AI reviews mentions"`: the only Shilika-owned URLs returned were `dev.to/shilika`, `medialegacy1.dev.to/shilika_b760a675f394e9bd3` and an Icebreaker mirror of her LinkedIn (`app.icebreaker.xyz/profiles/linkedin-shilika`). The tool summary stated it found **no independent reviews, testimonials or third-party confirmations** of the placements or the client list (it could not locate the cited Forbes or CoinDesk pieces), and several name collisions (Shilpy Jain studio on Trustpilot, Shilpa Jain on Goodreads, Shrey Jain). That is a tool summary, so treat it as "unverified", but it matches the earlier finding that off-site corroboration is thin. An Icebreaker mirror is also a third surface repeating the LinkedIn client list (NEAR, Chainbase, Fluence, WalletConnect and others), which is one more place that needs the same role and claim wording.
- Reddit is itself an agency product category: 3 of the 9 results were "best Reddit marketing agencies for crypto" listicles, and one roundup warns that agencies selling paid upvotes violate Reddit rules. This reinforces section 7.4: buying Reddit presence is the behavior that gets projects banned.
