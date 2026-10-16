# Third-party lists and directories audit: where Shilika Jain is and is not listed

Date of audit: 2026-10-15. Scope: third-party "best Web3 / crypto / AI / cybersecurity PR agency or consultant" lists, roundups and directories, plus every third-party mention of "Shilika Jain" or shilikajain.com that could be found. Nothing inside the Shilika repo was modified. Scratch files only under the scratchpad.

## 0. Verdict in six lines

1. Shilika Jain is included in 0 of the 46 distinct third-party list, roundup and directory pages opened (every page checked for the string "Shilika"; none contained it). The only list that ranks her is her own: shilikajain.com/playbook/best-web3-pr-agencies-2026 (self-ranked #1 of 6, with a conflict disclosure).
2. 15 of the 46 pages are published by an agency that ranks itself first (ICODA x6, NinjaPromo, Web Tonic (#2), Coinbound x2, GuerrillaBuzz x2, LuvKaizen, High Vibe PR x2). 2 more are Everything-PR pages whose owner shares an ownership group with the #1 firm (5W). These self-promotional pages are exactly the pages that own the head terms in Google.
3. Her third-party footprint is real but thin and is mostly self-created or contributor material: a Crypto Daily author page (about 19 bylines per Muck Rack), one Crypto Coin Show republished essay (2026-03-24), an unclaimed auto-generated Muck Rack profile, a HackerNoon author page (3 stories), a DEV Community syndication profile (79 posts), LinkedIn (about 14,000 followers, 19 recommendations), an Icebreaker profile and a Wiza contact-database row. No news article, podcast, speaker page, Reddit thread, Medium list or Substack list naming her was found.
4. The strongest lever is not a cold pitch to a competitor's list. It is three relationships and one free profile she already has or can claim: Crypto Daily (she already contributes; the domain appeared in 15 of 100 prompt slots in her own SERP panel), Crypto Coin Show (editor Ashton Addison is one of her testimonial givers), Everything-PR (editorial inclusion, "firms do not pay for placement", 11 of 100 prompt slots) and Muck Rack (free "Claim your profile").
5. Entity signals are inconsistent across third-party profiles (location: Singapore, Dubai, England, United States; title: five variants; LinkedIn headline reads "Myosin.xyz" with no PR or fractional keyword). List editors and AI engines cannot reliably resolve who she is, and name collisions (Shilpi Jain, Archana Jain, Silky Jain, Shikha Jain) dominate plain-name searches.
6. Health score for this area: 2 out of 10. On-site and SERP progress is real (13 of 25 panel prompts surfaced a shilikajain.com URL on 2026-09-25, 6 of them via the self-ranked list page) but off-site third-party list presence, the thing AI engines retrieve and cite, is at zero.

## 1. Method, tools and hard limits (read this before trusting any "absent")

- WebSearch: 21 searches returned results, 3 were refused ("this turn's web search budget is used up (limit: 200 WebSearch calls per turn, shared by every agent in it)"). I did not work around it (no curl or wget to search engines, no proxies). Queries that never ran because of the budget: separate "Shilika Jain" probes for Clutch, GoodFirms, Sortlist, Contra, Upwork, MarketerHire, Clarity, Superpath, Reddit; "best fractional PR consultant crypto web3 freelance independent 2026 list"; "top AI PR agencies for AI startups 2026 ranking list ChatGPT-cited"; "best PR agencies for AI startups Asia Singapore 2026".
- WebSearch is US-only and returns a model-written summary, not a raw SERP. A name missing from a summary is not proof it is missing from the SERP. Treat every "not found" in section 6 as "not found with this tool".
- WebFetch: about 90 fetches. Each page is read by a small model that answers my prompt, so "string not present" has a small residual error risk, and two fetches were truncated by the tool (Chameleon Collective read 100,000 of 169,521 characters; llms.txt read 100,000 of 162,719). Blocked or failed: Clutch (404 on guessed category URLs), GoodFirms (403), Sortlist (403), Crunchbase (403), CryptoJobsList (403), DesignRush via WebFetch (403), Wiza (403), X profile (402), Coinband Medium (403), MEXC news (connection refused on all three URLs), Single Grain (300s timeout).
- Browser pane: used for DesignRush only (Dubai PR list and Startup PR list loaded; I read page text and ran a case-insensitive "shilika" test on the DOM text; no CAPTCHA was encountered or bypassed). First page of each list only.
- Ahrefs API and Google Search Console: not used (per instructions). So no backlink counts, no DR, no query data. Nothing here is a ranking-position claim.
- AI-engine citation data: none verified. data/ai-citation-panel/results/chatgpt/ contains only a fixture file (zz-fixture-2026-08-04.csv). The "SERP panel" in data/ai-citation-panel/results/serp-discoverability/ is Google SERP proxy data from earlier runs, used here only to rank which list-publishing domains matter most.
- Ranking of "highest-leverage" below mixes measured items (domain appearance counts in the repo panel CSVs) with judgement. Judgement items are labelled.

## 2. Where Shilika IS present

### 2a. Third-party ranked lists

None. 0 of 46 pages. (Page list in section 3.)

### 2b. Self-published list (not third-party)

| URL | Date | What it says | Notes |
|---|---|---|---|
| https://www.shilikajain.com/playbook/best-web3-pr-agencies-2026 | published 2026-05-20, reviewed 2026-08-11 | 6 entries: 1 Shilika Jain ($3K-7K/mo), 2 Lunar Strategy, 3 EAK Digital, 4 Coinbound, 5 Outset PR, 6 High Vibe PR | Discloses "I am one of the operators on this list". Ordering rationale is unclear (says "roughly ascending" yet puts the author first). No external citation or footnote for pricing. In the repo SERP panel of 2026-09-25 this single page surfaced on 6 of 25 prompts (A1, A3, A5, B1, E1, E3). |

### 2c. Third-party non-list mentions found (entity footprint)

| # | Surface | URL | What it shows | Type | Verified how |
|---|---|---|---|---|---|
| 1 | Crypto Daily author page | https://cryptodaily.co.uk/author/ShilikaJain | Bio: Head of APAC at Myosin; ex CoinMarketCap. 10 articles on page 1, page 2 exists. Interviews include Gaia (2025-03), Fluence Labs (2024-12), zkPass (2024-10), Reown (2025-05), Tangem (2026-07). No sponsored label on the page; whether the pieces are sponsored or whether client relationships are disclosed is unverified | Publisher site, contributor byline | WebFetch |
| 2 | Crypto Coin Show | https://cryptocoinshow.com/what-web3-pr-actually-means-and-why-most-founders-get-it-wrong/ | 2026-03-24. Byline Shilika Jain, "Global PR & Comms, Myosin DAO", "based in Singapore". Edited and expanded by Ashton Addison; says it was first published on HackerNoon. No link to shilikajain.com. Not a roundup, names no agencies | Editorial republish of her essay | WebFetch |
| 3 | Muck Rack | https://muckrack.com/shilika-jain | Auto-built profile titled "HackerNoon, EIN News, Crypto Daily Journalist". 19 articles. Location England. Bio handles: @myosin_xyz, @cryptodailyuk, prev @coinmarketcap and @binance. Page offers "Claim your profile" and byline-correction options including "different person with the same name" | Unclaimed third-party database | WebFetch |
| 4 | HackerNoon | https://hackernoon.com/u/shill | "Global PR & Comms at Myosin DAO". 3 stories. Nominated "2022 HackerNoon Contributor of the Year - Founder Interview". No link to shilikajain.com | Contributor profile | WebFetch |
| 5 | DEV Community | https://dev.to/shilika | Created 2025-08-20. 79 posts, 60 titles visible, dated 2026-06-18 to 2026-06-21 (about 60 posts in 4 days). Bio "Fractional PR for Web3 & AI founders. 50+ protocols placed in Forbes, CoinDesk, Cointelegraph, Decrypt & The Block". Links to shilikajain.com. One post sampled carries an "Originally published at" credit to shilikajain.com | Self-created syndication | WebFetch (profile and one post) |
| 6 | Icebreaker.xyz | https://app.icebreaker.xyz/profiles/linkedin-shilika | Self profile. Head of PR & Partnerships Myosin (Jan 2023 onward), PR Lead Cloudless Labs (Jul 2024 to Mar 2025), PR/Comms Web3Auth (Apr 2023 to Jun 2024), ex APAC Lead CoinMarketCap. Location US | Self-created | WebFetch |
| 7 | LinkedIn | https://ae.linkedin.com/in/shilika | About 14,000 followers, "more than 500" connections, location Dubai, 19 recommendations, page title "Shilika . - Myosin.xyz" | Social | WebFetch (login-walled in part) |
| 8 | LinkedIn posts (3 URLs surfaced by search) | e.g. https://www.linkedin.com/posts/shilika_web3-crypto-blockchain-activity-6954751624514875392-ATB0 | One post (about 4 years old) describes her first panel, Poloniex India Launch, speaking about CoinMarketCap initiatives. 120 reactions | Social | WebSearch + WebFetch |
| 9 | Wiza | https://wiza.co/d/coinmarketcap/df62/shilika-jain | Contact-database row: "Growth & Partnerships at CoinMarketCap", Singapore. Seen only as a search-result summary; fetch returned 403 | Contact database | WebSearch only |
| 10 | X profile | https://x.com/Shilika_jain | Fetch returned HTTP 402; unverified | Social | not verified |

Also noted on her own site (own claims, not third-party validation): 19 testimonials sourced from LinkedIn recommendations (no Clutch, G2 or Trustpilot badges); a /press page listing 36 client-coverage outlets (23 with external URLs, 13 unlinked; whether those articles name her is unverified; one TechInAsia URL slug refers to a Zoomcar roundup); llms.txt sameAs lists only LinkedIn, X, the CryptoDaily byline and Calendly (no Muck Rack, HackerNoon, DEV, Crunchbase or directory profiles).

## 3. The 46 pages opened (all checked for "Shilika": 0 contained it)

Legend. Self = publisher ranks itself. "Ed" = editorial publisher with no stated commercial tie to ranked firms. "Agency blog" = hosted on an agency or vendor site. "Spons?" = page or search listing suggests paid or press-release content.

### A. Crypto / Web3 PR (28)

| # | URL | Publisher | Date (as shown) | Self? | Type | Route to get added |
|---|---|---|---|---|---|---|
| A1 | icoda.io/blog/best-web3-pr-agencies/ | ICODA | pub 2026-03-27, upd 2026-10-15 | Self #1 (page says "ICODA publishes the guide and lists itself first") | Agency blog | Contact icoda.io/contact-us/; no listing process stated |
| A2 | icoda.io/blog/top-15-crypto-pr-agencies-in-2026-ranked-by-real-results/ | ICODA | pub 2026-06-06, upd 2026-10-15 | Self #1 | Agency blog | None stated; outbound links carry utm_source=icoda.io |
| A3 | icoda.io/blog/best-crypto-pr-agencies/ | ICODA | pub 2025-11-12, upd 2026-03-16 | Self #1 | Agency blog | "Want Crypto PR Agency Review?" box; button target is "#" (dead) |
| A4 | icoda.io/blog/top-crypto-pr-agencies-usa/ | ICODA | pub 2025-12-16, upd 2026-09-04 | Self #1 | Agency blog | None stated |
| A5 | icoda.io/blog/best-pr-agencies-in-dubai/ | ICODA | pub 2026-02-12, upd 2026-09-04 | Self #1 | Agency blog | None stated |
| A6 | icoda.io/best-crypto-marketing-agencies-in-india | ICODA | pub 2025-06-19, upd 2026-03-13 | Self #1 | Agency blog | None stated; no individual freelancers in the 10 entries |
| A7 | ninjapromo.io/top-10-crypto-pr-agencies | NinjaPromo | "Updated Oct 1, 2026" | Self #1 | Agency blog | None stated |
| A8 | webtonic.io/blog/top-crypto-pr-agencies | Web Tonic | pub 2026-03-08, upd 2026-10-09 | Self #2 (39 entries; includes paid-content outlets such as CoinDesk Studios and Cointelegraph Consulting) | Agency blog | None stated; editorial-policy page says it may be compensated by mentioned providers |
| A9 | coinbound.io/top-crypto-pr-agencies/ | Coinbound | "Last Updated: June 5, 2026" | Self #1; #2 Mintfunnel is "powered by Coinbound" per another Coinbound page | Agency blog | "Book A Call" only |
| A10 | coinbound.io/top-web3-pr-agencies/ | Coinbound | "Last Updated: December 30, 2025" | Self #1 | Agency blog | "Book A Call" only |
| A11 | guerrillabuzz.com/top-crypto-pr-agencies | GuerrillaBuzz | 2023-12-07 | Self #1 | Agency blog | None |
| A12 | guerrillabuzz.com/blog/agencies | GuerrillaBuzz | 2023-02-19 | Self #1 | Agency blog | None |
| A13 | luvkaizen.com/solutions/best-web3-pr-agencies-2026 | LuvKaizen | undated | Self #1 (4 entries) | Agency blog | /contact only |
| A14 | highvibepr.com/insights/top-web3-and-crypto-pr-agencies | High Vibe PR | "Aug 26" (year not shown) | Self #1 | Agency blog | Author footer contact only |
| A15 | istanbulblockchainweek.com/10-leading-web3-marketing-pr-agencies-worldwide/ | Istanbul Blockchain Week (conference) | undated (image path suggests Apr 2026) | Not ranked | Conference site; commercial tie to listed agencies undisclosed (site sells sponsorships) | Sponsor form /sponsor-form/, Telegram t.me/istanbulblockchainwk, speaker application |
| A16 | istanbulblockchainweek.com/best-web3-pr-agencies-for-crypto-exchanges-and-blockchain-platforms/ | Istanbul Blockchain Week | undated (May 2026 by image path) | Not ranked | Same | Same |
| A17 | influencermarketinghub.com/blockchain-pr-agencies/ | Influencer Marketing Hub | "Last Updated: June 22nd, 2026" | Not ranked; title says Top 15, 14 listed | Ed, with "Advertising Disclosure" heading and utm links | "List Your Agency" form (/submit-your-influencer-marketing-agency); fees not stated; solo eligibility not addressed (team-size options start at 1-10); "Contribute to IMH" (/contributor-guidelines/) |
| A18 | mediashower.com/blog/best-blockchain-pr-agencies | Media Shower | 2022-06-08 | Not ranked; CTA for own services | Agency blog, custom 0-5 scores | "Contact us" to request an update or a review for inclusion (blog.mediashower.com/contact/). Stale list |
| A19 | buildd.co/p/crypto-pr-agencies | buildd | undated | No | Ed/UGC platform | "Write for Us" (/write-for-us) is a writer route, not a listing route |
| A20 | cryptodaily.co.uk/2026/02/top-5-crypto-pr-agencies-for-blockchain-and-web3-projects-in-asia-2026-guide | Crypto Daily | 2026-02-14 | No (Outset PR #1 gets most space) | Search tool listed the title as "Sponsored Press Release"; the page text itself showed no label; metadata section "PR" | None on page. Shilika already has an author page on this publisher |
| A21 | techbullion.com/?p=768692 | TechBullion | 2026-06-10 | No (author not in list) | Metadata section "Press Release"; no visible label | Submission route and price not stated on the page |
| A22 | techbullion.com/?p=786062 (same article as ?p=762036) | TechBullion | 2026-07-17 | No | No label; ICODA links carry utm_medium=pr | Not stated |
| A23 | techbullion.com/top-10-top-crypto-marketing-agencies-in-2026/ | TechBullion | 2026-01-22 | No | No label | Not stated |
| A24 | techbullion.com/?p=454999 (same article as ?p=738906) | TechBullion | 2024-12-16 | No | No label | Not stated |
| A25 | smallbiztrends.com/top-web3-pr-marketing-agencies-in-2024/ | Small Business Trends | 2024-08-31 | No | No label (sidebar sponsored tags only) | Not stated |
| A26 | hackernoon.com/5-expert-recommended-crypto-pr-and-marketing-firms-that-blockchain-startups-can-trust | HackerNoon (author Ishan Pandey) | 2023-04-14 | No | No label; promotional profiles | Not stated |
| A27 | marketerhire.com/blog/best-crypto-marketing-agency | MarketerHire | pub 2026-06-09 | Not ranked, but promotes its own fractional marketplace as "a faster alternative" | Vendor blog | /apply ("Apply as a freelancer"), contact@marketerhire.com; PR roles accepted: not stated |
| A28 | marketerhire.com/blog/top-crypto-marketing-agency | MarketerHire | pub 2026-06-11 | Same | Vendor blog | Same |

### B. AI startup PR (6)

| # | URL | Publisher | Date | Self? | Type | Route |
|---|---|---|---|---|---|---|
| B1 | everything-pr.com/best-ai-pr-firm | Everything-PR | 2026-09-07 | #1 is 5WPR; page discloses common ownership of Everything-PR News and 5W AI Communications | Ed with disclosed tie | editorial@everything-pr.com to propose inclusion (stated on the directory page) |
| B2 | everything-pr.com/finding-the-best-pr-company-in-america-a-2026-guide | Everything-PR | profiled 2026-06-04, upd 2026-10-12 | Same tie | Ed with disclosed tie | Same |
| B3 | ecomposer.io/blogs/comparison/best-ai-driven-pr-agencies | EComposer | 2026-02-05 | Not ranked; promotes own product | Vendor blog | Author bio invites partnership email |
| B4 | starngage.pro/blog/top-ai-pr-firms-for-agencies-consultants-building-an-ai-practice | StarNgage Pro | 2026-04-27 | Not ranked; promotes self | Vendor blog | None |
| B5 | highvibepr.com/insights/best-pr-agency-for-ai-startups | High Vibe PR | "Jul 15" (year not shown) | Self #1 | Agency blog | None |
| B6 | designrush.com/agency/public-relations/startups (browser, page 1) | DesignRush | "Rankings updated: October 15, 2026", 600 companies | Directory | Mixed: page states "Sponsored listings pay for a placement that appears above organic positions"; 4 paid-placement labels on page 1; organic rank by "top services, reviews, portfolio, awards/press, and team expertise" | Join route not verified (guessed /agency/get-listed returned 404) |

### C. Cybersecurity PR (6)

| # | URL | Publisher | Date | Self? | Type | Route |
|---|---|---|---|---|---|---|
| C1 | analyticsinsight.net/cybersecurity/cybersecurity-pr-agencies-best-picks-2026 | Analytics Insight | 2026-06-03 | Not ranked | Publisher with Advertise and Promote links. Heading says 15, 16 listed. Many entries are names I could not recognise (e.g. "Harborline Cyber Comms", "Driftwood Security Strategy"); firm existence unverified | "Advertise" (jotform), "Promote" (/promote): paid |
| C2 | cyberdb.co/best-cybersecurity-marketing-agencies-top-picks/ | CyberDB | 2026-04-26 | Not ranked; sells marketing services | Vendor directory blog. #1 is OTreniX, the same name as #1 on C1, which suggests a common source. Other entries unverified | "Enter DB" (Knack vendor database), "Purchase" plans, info@cyberdb.co |
| C3 | marketerhire.com/blog/best-cybersecurity-marketing-agencies | MarketerHire | 2026-07-23 | Not ranked; says "not a paid placement list" | Vendor blog | /agencies ("For Agencies"), contact@marketerhire.com |
| C4 | globalcybersecuritynetwork.com/blog/top-pr-agencies-for-cyber-security-companies/ | GCS Network | dated 2023-04-27 but titled 2026 | Not ranked | Publisher, "Advertise" and "Partners" pages | /join, /contact, /advertise, /partners |
| C5 | techbullion.com/top-15-cybersecurity-pr-ai-seo-agencies-in-2026/ | TechBullion | 2026-06-08 | Not ranked | No label | Not stated |
| C6 | authoritytech.io/blog/best-ai-pr-agencies-for-cybersecurity-companies-2026 | AuthorityTech | pub 2026-04-11, upd 2026-09-08 | Not an agency list; ranks publications (Forbes, TechCrunch, Axios, Reuters, Fullintel) | Vendor blog | "Start your visibility audit" only |

### D. Regional, directory, fractional (6)

| # | URL | Publisher | Date | Self? | Type | Route |
|---|---|---|---|---|---|---|
| D1 | designrush.com/agency/public-relations/ae/dubai (browser) | DesignRush | updated 2026-10-15, 72 companies | Directory | Paid and organic mixed (see B6) | Not verified |
| D2 | feedbax.ai/public-relations/united-arab-emirates | Feedbax | n/a | Directory (mostly German firms) | Lead-gen directory | feedbax.ai/get-listed ("Join as Service Provider", LinkedIn sign-in) |
| D3 | reputationtoday.in/indias-top-10-women-in-public-relations/ | Reputation Today | 2016-03-11 | n/a | Ed, 10 years old, includes Archana Jain (name-collision risk) | None |
| D4 | theprnet.com/journals/fractional-pr-booming-brands-agencies | The PR Net | undated | n/a | Ed/community. Names 5 fractional practitioners (Lindsay Silverberg, Ina Subramanian, Melissa Welch, Meredith Klein, Amanda Coffee) | "Contact The PR Net" form, "Join" (/users/sign_up), "Partner with us", "Directory" |
| D5 | pangea.app/hire/fractional/public-relations-consulting | Pangea | n/a | n/a | Curated marketplace, first-name profile cards | "For Talent" (/work); steps not shown |
| D6 | chameleoncollective.com/skill/fractional-public-relations-manager | Chameleon Collective | n/a | n/a | Agency service page ($8K-20K/mo), names 4 operators | "Apply To Be A Chameleon" (wearechameleons.com/apply) |

Not counted but opened: coinbound.io/?p=36471 (Coinbound awards landing page listing MarketerHire, CoinGape, Influencer Marketing Hub, Cryptopolitan, CryptoDaily, Coinpedia awards; no "Shilika"), the Outset PR April 2026 digest, and the Medium feed medium.com/feed/finpr (titles only). Not reachable: cryptojobslist.com/blog/top-web3-pr-agencies (403), MEXC news pages (connection refused), Clutch, GoodFirms, Sortlist, Crunchbase.

## 4. Who owns the lists, and which domains matter most

### 4a. Agency frequency across 25 of the crypto/web3 pages (script: scratchpad/audit/tally.py)

Output of `python3 -I tally.py`:

```
crypto/web3 list pages tallied: 25
lists containing 'Shilika Jain': 0
 12  Melrose PR
 11  ICODA
 11  GuerrillaBuzz
 10  MarketAcross
 10  NinjaPromo
  9  Coinbound
  8  ReBlonde
  7  Outset PR
  7  Lunar Strategy
  6  Luna PR
  6  Crowdcreate
  6  Single Grain
  5  High Vibe PR
  5  EAK Digital
  5  Wachsman
```

Names were transcribed from the fetch outputs by hand; the tally excludes the two ICODA regional pages (A5, A6) and A12. Treat counts as approximate (plus or minus 1 from transcription), the ordering as reliable.

### 4b. Answer-engine proxy: what the WebSearch tool's summaries named

In 9 generic crypto/web3 PR queries (best web3 PR 2026, best crypto PR 2026, Korea/Japan/APAC, Dubai/MENA, India, Singapore, Clutch, GoodFirms-style, independent consultants), the tool's summaries named: Outset PR in 7 of 9, Coinbound in 7 of 9, ICODA in 6 of 9. Shilika Jain: 0 of 9. In the fractional query it named Pangea, Chameleon Collective and Lindsay Silverberg (LPR Consulting); in the AI query 5WPR, Corporate Ink, Bospar, Voxus, Another PR; in the cyber query FischTank, Prosek, Red Lorry Yellow Lorry, Walker Sands, Eskenzi. Shilika: 0 of 12 generic queries overall. When her name was in the query the tool found her own site plus LinkedIn and Crypto Coin Show, and said it found no independent press coverage. A plain `"Shilika Jain" PR` query returned only Shilpi Jain (director) and Archana Jain (PR Pundit) results, and a bare `shilikajain.com` query returned director-registry pages for similarly named people, not her site. This is one search tool, not ChatGPT or Perplexity, so it is a directional signal only.

### 4c. Which list-publishing domains dominate her own buyer-prompt SERPs (measured)

Source: data/ai-citation-panel/results/serp-discoverability/2026-08-04, 08-14, 08-31, 09-25 CSVs (4 runs x 25 prompts = 100 prompt rows; count = rows in which the domain appears in top_competitor_domains). Google SERP proxy, US locale.

| Domain | Rows (of 100) | Rows in latest run 2026-09-25 (of 25) | Type |
|---|---|---|---|
| highvibepr.com | 25 | 6 | Competitor, self-ranked lists |
| luvkaizen.com | 19 | 5 | Competitor, self-ranked list |
| eakdigital.com | 18 | 4 | Competitor |
| obapr.com | 15 | 4 | Competitor |
| cryptodaily.co.uk | 15 | 6 | Publisher where Shilika already contributes |
| otrenix.com | 15 | 3 | Appears as #1 on two cyber lists (C1, C2) |
| eakwire.com | 14 | 3 | Competitor-adjacent |
| cracklepr.com | 14 | 4 | Competitor |
| istanbulblockchainweek.com | 13 | 3 | Conference site hosting listicles |
| analyticsinsight.net | 12 | 3 | Paid-promo publisher (cyber list C1) |
| beantownmv.com | 11 | 0 | Competitor (cyber) |
| everything-pr.com | 11 | 3 | Editorial, owner tied to 5W |
| icoda.io | 9 | 1 | Self-ranked lists |
| marketerhire.com | 9 | 1 | Fractional marketplace plus lists |
| gtm8020.com | 9 | 2 | Fractional marketplace |
| businessplusai.com | 9 | 5 | Events and consulting site (no PR listicle found on its home page) |
| securitysenses.com | 9 | 0 | Not fetched |

The 2026-09-25 SERP analysis in the repo already concludes the same: the "best firms" head terms (A2, C1, B4) and the whole cybersecurity bucket (D1, D2, D3, D5) are lost to listicles and benchmark reports, and "need listicle inclusion + backlinks, which is SJ, not code."

## 5. High-value absences and the exact route to get added

"Odds" is judgement, not measured. "Cost model" says what the page or publisher states; where nothing is stated I say so.

| Target | Why it matters (evidence) | Exact route found | Cost model | Odds |
|---|---|---|---|---|
| Crypto Daily "Top 5 Crypto PR Agencies ... Asia" (2026-02-14) and its other roundups and "Top Crypto PR Agency" awards (Coinbound lists a 2025 CryptoDaily award) | Domain in 15 of 100 panel rows, 6 of 25 in the latest run; she has an author page there | No submission route on the page. Use the existing contributor relationship to ask the editor for an independent-consultants section or a signed contributor piece | Unknown. Search listing tagged the URL "Sponsored Press Release". Treat as likely paid until the editor says otherwise (unverified) | Medium. Needs a visible conflict-of-interest note because she is an author there |
| Everything-PR lists (AI PR, cyber, best PR agencies) | 11 of 100 rows (D3, E4, A3); cyber and APAC head terms | Email editorial@everything-pr.com (stated on its directory page); profiles are "commissioned by the editorial team", "firms do not pay for placement" | Free per the page | Low to medium: all listed firms are agencies; no crypto/web3 category; solo practitioners not addressed; owner is tied to 5W |
| MarketerHire (3 pages: A27, A28, C3) | 9 of 100 rows; its lists push fractional marketers as the alternative to agencies, which is her model | /apply ("Apply as a freelancer"), /top-1-percent (vetting), contact@marketerhire.com; "For Agencies" /agencies | Free to apply (hire fee is on the buyer side per the page) | Medium; PR roles accepted is not stated |
| Influencer Marketing Hub "Top 15 Blockchain PR Agencies" (A17) | Neutral publisher (does not rank itself); updated 2026-06-22 | "List Your Agency" form (3 steps, no fee shown, review methodology page exists), "Contribute to IMH" | Not stated | Medium; solo eligibility unclear |
| The PR Net fractional PR coverage (D4) | `theprnet.com` appeared in the A1 panel row on 2026-09-25 | Join (/users/sign_up), Directory, "Contact The PR Net", "Partner with us" | Not stated (Partner page unread) | Medium |
| Crypto Coin Show | Already published her essay on 2026-03-24; editor Ashton Addison is one of her 19 listed testimonial givers | Direct ask to the editor for a commissioned "independent Web3 PR consultants" piece, or a bio link to shilikajain.com (the republished essay has none) | Page shows "Work with CCS" commercial offer | High, but it is a friendly placement (disclose) |
| Clutch category pages used in competitor claims | Coinbound shows a Clutch badge; Outset PR is a Clutch Leader Awards finalist; ICODA cites 30 reviews | clutch.co/get-listed: Basic free profile, Verified $499/year, Advertiser custom price | Free to $499/yr or more | Unknown; solo-consultant eligibility and review requirement unverified. Competitors hold review counts she lacks |
| DesignRush (startup PR list, Dubai list; High Vibe PR advertises a DesignRush feature) | designrush.com appeared in the C1 panel row | No join route verified. Page states organic rank uses top services, reviews, portfolio, awards/press, team expertise; sponsored placement exists | Paid placement available | Unknown |
| ICODA (6 pages, updated through 2026-10-15) | 9 of 100 rows; lists include outsiders (LKI Consulting, High Vibe PR, Chainstory, FINPR) | contact icoda.io/contact-us/ and the "Want Crypto PR Agency Review?" box (dead button target) | Not stated | Low; competitor-owned |
| Istanbul Blockchain Week blog lists (A15, A16, 8 more titles on /blog/) | 13 of 100 rows | /sponsor-form/, Telegram t.me/istanbulblockchainwk, speaker application | Sponsorship; undisclosed link between sponsors and list entries (unverified) | Unknown |
| TechBullion crypto and cyber lists (A21 to A24, C5) | 5 list pages; "Press Release" section on A21 | Not stated on page | Paid press-release route likely (unverified) | Unknown |
| Analytics Insight and CyberDB cyber lists (C1, C2) | analyticsinsight.net in 12 of 100 rows; cyber is the weakest bucket | Advertise / Promote (Analytics Insight), Purchase plans or "Enter DB" (CyberDB) | Paid | Not recommended until the entries are shown to be real firms; both lists rank OTreniX first |
| High Vibe PR, LuvKaizen, NinjaPromo, Coinbound, GuerrillaBuzz own lists | 25, 19 and more rows | None; self-ranked, no listing process | n/a | Near zero. Do not spend effort |

## 6. Not verified (do not read as absent)

- Clutch, GoodFirms, Sortlist, Crunchbase, Contra, Upwork, MarketerHire (public profile), Clarity, Superpath: no profile for Shilika was verified either way. A guessed Contra URL (contra.com/shilika_jain) returned 404; Clutch, GoodFirms, Sortlist and Crunchbase blocked or 404ed. Search budget ran out before name-specific probes.
- Medium, Substack, Reddit, X, LinkedIn Pulse lists naming her: one combined `site:` search found none; not exhaustively checked.
- Podcast or speaker pages naming her as a guest or speaker: an extended search found none. Her site lists Binary Summit Bangkok, India Blockchain Week 2024, Web3 Conf Goa and EpicWeb3 Summit but the context (spoke, sponsored, or client work) was not established.
- Whether any of the 36 outlets on her /press page name her in the article.
- Actual ChatGPT, Perplexity, Claude and Gemini citations: no data in the repo (fixture only) and no access here.

## 7. Entity inconsistencies that make list inclusion and AI resolution harder

| Attribute | Variants seen on third-party surfaces |
|---|---|
| Location | Singapore (Crypto Coin Show, Wiza), Dubai (LinkedIn, Icebreaker association), England (Muck Rack), United States (Icebreaker roles) |
| Title at Myosin | Global PR & Comms (HackerNoon, Crypto Coin Show), Head of PR (DEV), Head of PR & Partnerships (Icebreaker), Head of APAC (Crypto Daily), APAC PR & Partnerships (own site), LinkedIn title shows "Myosin.xyz" only |
| Prior roles | CoinMarketCap "Growth & Partnerships" (Wiza), "APAC Lead" (Icebreaker, own site), Muck Rack shows "prev @binance" which no other surface claims |
| Positioning | Own site: fractional PR manager for Web3, AI, cybersecurity. LinkedIn: no fractional or consultant keyword in the visible title. Crypto Daily and Muck Rack: journalist or contributor |
| Pricing on her own pages | $3k-7k/month (hero), $5k-10k/month (intro), Web3 $5K-14K, AI $6K-14K, cybersecurity $7.5K-15K (FAQ). A list editor or an AI engine will see three ranges |
| Name | "Shilika Jain" (site, Muck Rack, Crypto Daily), "Shilika ." (LinkedIn display name), handle "shill" (HackerNoon), "Shilika" (DEV) |
| Collisions | Shilpi Jain, Archana Jain (PR Pundit, Havas Red), Silky Jain, Shikha Jain, Shilki Jain dominate plain-name results in the search tool |

## 8. Risks

- Self-ranked #1 list: it works in Google SERPs today (6 prompts), but it is a self-promotional list of the same kind as the 15 competitor pages she is trying to displace, and its rationale for order is unclear. Engines that discount self-ranked lists will discount it too (unverified).
- Crypto Daily bylines: several interviews are with companies that appear on her client wall (Gaia, Fluence, Reown, RabbitX, NodeOps). Muck Rack presents her as a "Crypto Daily Journalist". Whether these relationships are disclosed on the articles is unverified; undisclosed paid or client-linked editorial could undermine trust if a list editor or journalist checks.
- Muck Rack profile is unclaimed and may merge bylines of another person with the same name (page offers that correction). Location and @binance data may be wrong.
- DEV syndication: about 60 titles in 4 days, about 2,300 words in the one post sampled, "Originally published at" credit present. It adds a second indexable copy of her playbooks on a high-traffic domain; impact on duplication or on scaled-content classification after the 2026-09-24 spam update is unverified.
- The two cyber lists with fake-looking firm names share #1 (OTreniX). Paying to be added there could attach her to low-quality neighbours.

## 9. Ranked list of the 15 highest-leverage placements

Ranking = judgement combining measured SERP footprint (section 4c), fit with her ICP and panel prompts, cost, and whether a route exists. "Owner" is who has to act.

| Rank | Placement | Action | Why | Cost | Owner |
|---|---|---|---|---|---|
| 1 | Crypto Daily roundups | Ask the editor for a section on independent and fractional consultants in the Asia and Web3 PR roundups, with a COI note | 15 of 100 panel rows; already a contributor; Asia is her desk | Unknown, possibly paid | SJ |
| 2 | Everything-PR | Email editorial@everything-pr.com proposing a profile and a "fractional / Web3" category | 11 of 100 rows; editorial, no payment per page; owns cyber and APAC SERPs | Free | SJ |
| 3 | MarketerHire | Apply as a freelancer; then pitch the editor of the three crypto and cyber lists with a "fractional PR" angle | 9 of 100 rows; lists steer buyers to fractional talent | Free to apply | SJ |
| 4 | Muck Rack | Claim the profile, fix location and byline merges, remove or verify the @binance link, add her site | Free; indexable entity profile; fixes name-collision risk | Free | SJ |
| 5 | Crypto Coin Show | Ask Ashton Addison for a commissioned independent-consultants piece and a link to shilikajain.com on her existing essay | Existing relationship; already published her | Unknown | SJ |
| 6 | The PR Net | Join, claim directory listing, pitch a contributor piece on fractional PR for Web3 | Appeared in a panel row; fractional is her model | Unknown | SJ |
| 7 | Influencer Marketing Hub (Top 15 Blockchain PR Agencies) | Submit "List Your Agency", confirm solo eligibility first | Neutral high-profile list; has a form | Unknown | SJ |
| 8 | Clutch | Create the free profile; convert 19 LinkedIn recommendations into verified Clutch reviews; consider Verified at $499/year | Competitor claims rest on Clutch ratings | Free to $499/yr | SJ |
| 9 | DesignRush | Build an organic profile (services, portfolio, reviews); do not buy placement until organic rank is checked | Appears in AI-startup and Dubai SERPs | Free to paid | SJ |
| 10 | HackerNoon | Publish a disclosed "How to choose a fractional Web3 PR consultant" on her existing author page; fix the bio (still "Global PR & Comms at Myosin DAO") and add her site | Existing profile with a 2022 nomination | Free for editorial | SJ |
| 11 | ICODA review request | One free request via contact-us; expect low odds | 6 pages, 9 of 100 rows, updated daily | Not stated | SJ |
| 12 | Istanbul Blockchain Week blog | Price the sponsor or speaker route before deciding; ask what it costs to be included | 13 of 100 rows | Sponsorship | SJ |
| 13 | TechBullion | Get a price for a press-release placement tied to a verifiable case study | 5 list pages | Paid | SJ |
| 14 | Medium / Substack / LinkedIn Pulse | Publish a disclosed comparison on a third-party platform and link it from the site | Medium lists appear in panel rows A3 and B3; not third-party validation | Free | SJ |
| 15 | Feedbax and other free directory profiles | Free get-listed form, low relevance | Cheap entity signal | Free | SJ |

Non-placement dependency for all of the above: align the entity facts in section 7 first (one location, one title, one price range), add Muck Rack, HackerNoon and Crypto Daily to the site's sameAs and llms.txt, and re-run the panel afterwards. These on-site items are code tasks but were not performed here.

## 10. Appendix: commands and evidence log

WebSearch queries that returned results (mode standard unless noted):
1. "Shilika Jain" PR
2. shilikajain.com
3. best web3 pr agencies 2026
4. best crypto pr agencies 2026
5. best fractional PR consultants
6. best crypto PR agencies Korea Japan APAC 2026
7. best web3 PR agency Dubai UAE MENA 2026
8. best crypto PR agency India 2026
9. best blockchain PR agencies Singapore
10. top web3 PR agencies clutch
11. best crypto PR firms goodfirms OR sortlist OR designrush blockchain public relations
12. "Shilika Jain" web3 OR crypto OR blockchain public relations consultant (extended)
13. top AI startup PR firms 2026
14. best cybersecurity PR agencies 2026
15. "Shilika Jain" Myosin DAO OR CoinMarketCap OR "Gaia AI" (extended)
16. "Shilika Jain" podcast OR speaker OR interview OR panel Token2049 OR "Korea Blockchain Week" OR Consensus (extended)
17. "Shilika Jain" site:medium.com OR site:substack.com OR site:reddit.com OR site:x.com OR site:twitter.com
18. Shilika Jain fractional PR Singapore crypto
19. "shilikajain.com" -site:shilikajain.com
20. hackernoon "Shilika Jain" Web3 PR
21. best Web3 PR agencies and consultants independent consultant freelance crypto PR

Refused by the tool (budget used up, 200 per turn shared by all agents): "best fractional PR consultant crypto web3 freelance independent 2026 list", "top AI PR agencies for AI startups 2026 ranking list ChatGPT-cited", "best PR agencies for AI startups Asia Singapore 2026".

Key outputs quoted in substance:
- Query 1 returned only Shilpi Jain (MarketScreener insider pages) and Archana Jain (e4m, Reputation Today, PRmoment), and stated none of the results mention a Shilika Jain.
- Query 12 (extended) returned shilikajain.com home, /testimonials, two playbooks, her LinkedIn posts and the Crypto Coin Show article, and concluded "I found no independent press coverage of her".
- Query 20 returned DEV Community (dev.to/shilika) and Icebreaker profile pages; no HackerNoon article by her surfaced in search, though hackernoon.com/u/shill exists (fetched directly).

Repo data used (read only): data/ai-citation-panel/results/serp-discoverability/{2026-08-04,2026-08-14,2026-08-31,2026-09-25}.csv, data/ai-citation-panel/summary/2026-08-14-day90-report.md, 2026-09-25-serp-panel-analysis.md, data/ai-citation-panel/prompts.json, app/_partials (grep for third-party profile links: only dev.to, clutch.co links to competitors, and one hackernoon client link found; no Muck Rack, Crunchbase or Clutch profile for Shilika).

Panel aggregation command and result (python3 -I over the four CSVs): surfaced 9/25 (08-04), 7/25 (08-14), 7/25 (08-31), 13/25 (09-25). Domain counts in section 4c.

Direct fetches of her own pages (shilikajain.com: /, /testimonials, /press, /work, /llms.txt, /playbook/best-web3-pr-agencies-2026) confirmed the claims quoted in sections 2b, 2c and 7.

Script written to scratchpad: /private/tmp/claude-504/-Users-thunderbolt-Documents-projects-Shilika/c0dc2b3b-3b31-46db-9535-df2409eb89af/scratchpad/audit/tally.py

Suggested next measurement steps (not done): re-run the name-specific directory probes once the WebSearch budget resets; connect GSC to see which of the six playbook-list queries actually earn impressions; run the 4-engine citation panel with a browser session so that "lists AI engines cite" stops being inferred from Google SERPs.
