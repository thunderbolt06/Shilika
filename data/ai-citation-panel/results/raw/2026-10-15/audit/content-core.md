# Core commercial pages: GEO / answer-engine content audit

Date of audit: 2026-10-15. Site: https://www.shilikajain.com (live) and /Users/thunderbolt/Documents/projects/Shilika (working tree, which has uncommitted edits).
Area score: **4.8 / 10**.

Scope: home, services hub, the 8 service pages, /about, /authors/shilika-jain, /work (hub plus 6 case studies), /testimonials, /faq, /contact. Scored against docs/geo-guidelines.md and docs/humanization-guide.md.
Not used (as instructed): Ahrefs API, Google Search Console. No rank or traffic data appears in this report. Everything here is content, claims and markup.

Evidence method: live HTML fetched with curl (17 core URLs, all HTTP 200), local partials in app/_partials/*-body.html and *-jsonld.json read in full, third-party claims checked with WebFetch/WebSearch, and the owner's own portfolio record (data/knowledge/portfolio.json, imported 2026-10-15) used as a second source. Where a site blocked my fetch (HTTP 403) the claim is marked unverified, not false.

---

## 1. Verdict in one paragraph

The structure the GEO pass was meant to produce is mostly there: every service page opens with a "Direct answer" block, has a pricing table, a visible FAQ whose schema matches it, and a named-proof section. The weakness is the layer an answer engine (or a cautious buyer) uses to decide whether to trust it. Prices contradict each other in at least five ways across pages and schema. Several headline proof claims are stronger than the sources they link to, and in the RARI and MANTRA cases are stronger than the owner's own portfolio notes. Third-party guidance (Google, the Princeton GEO paper) is paraphrased in ways the primary sources do not support. Five of eight service pages carry wrong or expired event dates. Credentials rest on self-published profiles with five different job titles. The testimonial page describes its own contents inaccurately. The hubs (/services, /work, /contact) and the author page are the thinnest pages and do almost none of the GEO work.

---

## 2. Page-by-page table

Ratings: Strong / Partial / Weak / None. Score is my 0-10 health judgement for GEO and trust, not a ranking prediction. "Live" = what the public site serves today.

| Page | Size (live) | Answer-first | Extractable answers + headings | Tables / lists | FAQ | Proof corroborated? | Consistency | E-E-A-T | Freshness | Score | Top defect |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Home / | 3,027 words, 11 H2, 12 FAQ | Partial (H1 + 2 sentences, but price contradicts) | Partial: H2s are slogans ("No retainers without results"); FAQ H3s are real questions | 0 tables, 18 lists | Strong: 12 Q, microdata + JSON-LD | Weak: logo wall links to author index (Ripple), Aurora article (NEAR); "Led PR for CoinMarketCap, Polygon" | Weak: 4 retainer prices on one page | Partial | Weak: FAQ intro "Updated 30 June 2026" (JSON-LD dateModified 2026-07-15), "Recently on stage" includes 2022 events | 5.0 | Overlay says $3k-7k/mo, hero says $5k-10k/mo, FAQ says $5K-14K |
| /services hub | 658 words, 0 H2, 8 H3 cards | None (card grid under H1) | None | Lists only | None | n/a | Partial | None | Weak: "NEW" badge on all 8 cards, no date | 2.5 | No answer, no decision aid, no pricing, no FAQ, no schema |
| /services/web3-pr-campaigns | 3,058 words, 10 H2, 11 FAQ | Strong (Direct answer with price) | Partial: H2s are generic ("Who this is for") | 1 table, 6 lists | Strong (answers avg 112 words) | Partial: RARI date and "9-day exclusive" contradicted; MANTRA "exclusive" unlabelled | Weak: visible $3K-7K vs JSON-LD $5K-12K vs home FAQ $5K-14K; "cost is roughly half" claim does not fit $3K-7K vs $15K-30K (midpoints $5K vs $22.5K, about 22 percent) | Good byline + author box | Weak: "May 2026 Token2049 Dubai", KBW Sep 22-28, "WebX opening this week", "ten weeks out" | 6.0 | Expired / wrong event facts and RARI claims |
| /services/founder-profiling | 4,098 words, 11 H2, 13 FAQ | Strong | Partial | 1 table | Strong | Partial: Fluence op-ed exists (Trowbridge byline) but "ghostwritten by SJ" is uncorroborated; lists Forbes Council as target, then calls pay-for-byline networks not how voices are earned | Partial: sprint $18K-35K here, $12K-25K on AI page | Good | Weak: KBW Sep 22-28, WebX, "now in effect for over a month" | 6.5 | Unsourced benchmarks ($5K-$50K ghostwriting) and event dates |
| /services/kol-marketing | 4,115 words, 12 H2, 11 FAQ | Strong | Partial | 1 table | Strong | Weak: no named creator, no KOL outcome, "within 48 hours" and RARI wave detail uncheckable; KRW/JPY/INR rate floors unsourced; example creator names (Kazumasa Otsuka, Pushpendra Singh) not checked because my search budget ran out | Partial | Partial | Mixed: Dubai move correct, KBW wrong, "WebX running this week" | 5.5 | 200+ vetted KOLs claim has no named evidence |
| /services/apac-pr | 4,683 words (live), 13 H2, 13 FAQ, 2 tables | Strong | Partial | 2 tables | Strong | Partial | Partial | Good; local version cites Adnkronos, Cointelegraph, The Block | Live is stale (9x "Q2 2026", KBW wrong, Dubai "May 2026"); local fixes most but not deployed; "Plan Week 9.1" internal label leaks into FAQ | 6.0 live, 7.0 local | Local fixes are uncommitted; internal plan label public |
| /services/token-launch-pr | 4,065 words, 12 H2, 13 FAQ | Strong | Partial | 1 table | Strong | Weak: none of the three "proof" cases is a token launch (RARI mainnet, MANTRA raise, Bullieverse seed) | Partial: sprint $20K-60K vs About launch sprint $15K-40K | Good | Weak: "May 2026 Token2049 Dubai press cycle", KBW Sep 22-28 Impact at COEX, "WebX this week" | 5.0 | Page about TGEs has no TGE case |
| /services/ai-startup-pr | 2,795 words, 10 H2, 13 FAQ | Strong | Partial | 1 table | Strong | Weak: one case (Gaia); names Mission North, Highwire, Method, Bospar as charging $25K-50K/mo with no source; "every secondary outlet still cites the Stripe frame" uncheckable | Weak: $3K-7K visible, $5K-12K JSON-LD, $6K-14K home FAQ; zero links to /work or /about in body | Partial | Weak: "GITEX Global 2026 (October, DWTC)" is wrong (7-11 Dec 2026, Expo City); KBW dates wrong | 5.0 | Price conflict, single proof, wrong GITEX facts |
| /services/content-writing | 1,969 words, 9 H2, 8 FAQ | Strong (3 fixed prices) | Partial | 1 table | Partial (8 Q, shortest answers) | Weak: Fluence ghostwriting claim; AI Magazine unlinked | Weak: fixed $3,500 / $9,500 here, ranges ($3,500-7,500, $7,500-20,000) on home and /faq | Partial | Partial | 4.5 | Fabricated paraphrase of Google guidance, in body and JSON-LD |
| /services/cybersecurity-pr | 3,490 words, 12 H2, 13 FAQ | Strong | Partial | 1 table | Strong | Weak but candid (no cyber client; Web3Auth called "closest case") | Weak: $3K-7K visible, $5K-12K JSON-LD, $7.5K-15K home FAQ | Partial | Partial | 5.5 | Price conflict; "median Series B retainer $23,500" unsourced |
| /about | 2,608 words, 13 H2 (two H2s titled "Frequently asked questions"), 7 schema Q vs 14 visible | Strong ("Who is Shilika Jain" paragraph) | Partial | 0 tables | Partial: duplicated FAQ blocks | Weak: roles self-published only; career arc omits Web3Auth in-house and Cloudless Labs roles shown on her Icebreaker profile | Weak: "6 years, since 2019" (2019 to 2026 is 7; first role listed is 2020); retainer $3-7K vs home $5-10K | Partial: speaking posts linked, "Citation policy" addressed to AI engines | Partial ("Updated 23 May 2026") | 5.0 | 28 em dashes (breaks own style rule), duplicate FAQ, unverifiable roles |
| /authors/shilika-jain | 11,097 words, 1 H2, 299 H3 | Partial (one bio paragraph) | None (post list) | None | None | n/a | Weak: Person @id is /authors/shilika-jain, everywhere else it is /#person | Partial | Partial | 3.0 | 387 KB page, 299 posts, 65 em dashes, "Here's how" x20, truncated titles; no core page links to it |
| /work hub | 439 words, 0 H2, 6 cards | None | None | Cards | None | Partial: 5 outlet links per case | n/a | Weak: no dates, no roles, no outcomes | Weak | 3.0 | CoinDesk "proof" links for RARI and Web3Auth are weekly newsletter roundups |
| /work/* case studies (6) | 2,400-3,400 words each | Strong (Direct answer + stat tiles) | Partial | Tables + tiles | Strong (6 Q each) | Weak to Partial (see section 4) | Partial | Partial: all "Updated May 2026", no client quote, no outcome metric beyond placement counts | Partial | 5.0 (RARI 4.0) | Headline numbers ("11 Tier-1", "Tier-1 outlets 5") count minor outlets and her own CryptoDaily byline |
| /testimonials | 2,228 words, 19 quotes | None | None | None | None | Partial: LinkedIn recs are real and previewable | Weak: intro claims do not match the data | Partial | Weak: 16 of 19 dated April 2025, none in 2026 | 3.5 | Intro describes clients and journalists; data shows 5 clients, 0 journalists |
| /faq | 960 words, 11 H3 | Strong | Strong (answers 51-77 words, 2-5 sentences) | 0 tables | Strong (microdata) | Partial | Weak: prices disagree with service pages and schema | Partial | Weak: "Updated 12 June 2026" | 6.0 | Same 11 questions as home; missing contract, term, measurement and sponsored-vs-earned questions |
| /contact | 201 words | None | None | None | None | n/a | OK | Weak: Gmail address, no schema, no response time, no "what happens next" | Weak | 3.0 | Form plus Calendly only |

Average of the 17 rows: 4.7. Area score set at 4.8.

---

## 3. What is working (evidence)

1. **Answer-first and table structure exists on all 8 service pages.** Each has a "Direct answer" block directly under the H1 intro, one pricing table (APAC has two), a "What this is not" section and a dated byline. FAQ mean answer length by page: web3 112 words, founder 116, KOL 125, APAC 135, token 114, AI 103, content 80, cyber 114 (script output, section 8).
2. **/faq is the best-formed page for extraction.** 11 question H3s, answers of 51-77 words and 2-5 sentences, FAQPage microdata in server HTML (23 itemtype attributes in app/_partials/faq-body.html). Home has the same microdata plus JSON-LD.
3. **FAQ schema matches visible FAQ.** `node scripts/faq-parity-audit.mjs` output: "258 partial pairs scanned ... parity DEFECTS: 0".
4. **Hedged, honest-limits language** ("not guaranteed tier-1 placement", "The honest disclaimer", Bullieverse "Running sponsored and organic in lockstep") reads as credible and is the right register for answer engines.
5. **The local (uncommitted) APAC page adds sourced, dated facts that check out.** Japan Diet passed the FIEA bill on 15 July 2026 (Adnkronos page confirms), HKMA issued first stablecoin issuer licences on 10 April 2026 to HSBC and Anchorpoint (Cointelegraph, Ezra Reguerra, 10 Apr 2026). KOL and APAC pages correctly say Token2049 Dubai moved to 21-22 April 2027.
6. **Proof URLs mostly resolve.** 42 external proof links extracted from /work, 6 case studies and home: 29 return 200, 1 returns 202, 11 return 403 (bot walls, not dead), 1 returns 404 (Cointelegraph /amp URL for Web3Auth; the non-amp URL redirects to /magazine/... and returns 200).
7. **Several named placements are real and checkable:** The Block RARI article (24 Jan 2024, MK Manoylov), Cointelegraph royalty article (24 Jan 2024), CoinDesk MANTRA raise (19 Mar 2024, Danny Nelson, Shorooq Partners named as lead), CoinDesk Opinion "Not a Meme! DePIN Can Take Crypto Mainstream" (3 Apr 2025, byline Tom Trowbridge of Fluence), Web3Auth Firebase extension with Google Cloud (2 Oct 2023, Blockworks, Web3Auth blog), Bullieverse $4M (Business Today 18 Feb 2022, Inc42, Venture Intelligence reprint of the ET story).
8. **A client relationship is independently corroborated:** The Block quotes Jana Bertram as Head of Strategy at the Rari Foundation, and she is testimonial 10 ("was Shilika's client").

---

## 4. What is not working (evidence)

### 4.1 Pricing contradicts itself in at least five ways (high)

Verified on the live site (home, /about, /faq, service pages) and in JSON-LD fetched from the live HTML.

| Surface | Fractional retainer | Other prices |
|---|---|---|
| Home overlay (first screen) | "$3k-7k USD / month" | |
| Home hero intro and meta/OG description | "Retainers run $5k-10k/month" | |
| Home FAQ and /faq | Web3 $5K-14K; AI $6K-14K; cybersecurity $7.5K-15K | token sprints $20K-60K; Op-Ed $2,500/mo; Essay $3,500-7,500 per piece; Whitepaper $7,500-20,000 |
| Home JSON-LD (service offers) | Founder Voice $4K-10K; KOL $3K-7K; APAC $6K-14K | Founder sprint $18K-35K; KOL TGE $15K-45K |
| /about (body and FAQ schema) | $3,000-7,000 | launch sprint $15,000-40,000; Essay $3,500; Whitepaper $9,500; Op-Ed $2,500/mo |
| Web3 PR page, visible | $3K-7K | sprint $15K-40K |
| Web3 PR page, JSON-LD | $5,000-12,000 per month | sprint $15,000-40,000 |
| AI Startup page, visible / JSON-LD | $3K-7K / $5,000-12,000 | founder sprint $12K-25K (Founder Profiling page says $18K-35K) |
| Cybersecurity page, visible / JSON-LD | $3K-7K / $5,000-12,000 | home FAQ says $7.5K-15K |
| Content Writing page | fixed $3,500 / $9,500 / $2,500 | home FAQ says ranges for the same offers |

JSON-LD prices were confirmed in the live HTML for web3-pr-campaigns, ai-startup-pr and cybersecurity-pr (minPrice 5000, maxPrice 12000 on all three).
There is no central pricing source: grep of lib/ and app/ found none, and no /pricing route exists.

### 4.2 Headline proof claims go further than the sources (critical)

Checked against the live source pages and against data/knowledge/portfolio.json (the owner's own "only these facts are on record" note).

| Claim on site | What I found | Status |
|---|---|---|
| RARI: "CoinDesk got the 9-day exclusive on the royalty mechanism with named exchange partners"; launch day "18 January 2024" | The CoinDesk link (.../2024/01/18/protocol-latest-tech-news-crypto-blockchain/) is a "Protocol Village" weekly roundup published 25 Jan 2024 covering 18-24 Jan, with a short RARI paragraph and no exclusive label. The Block (9:01 AM EST) and Cointelegraph both published 24 Jan 2024, and Cointelegraph says mainnet was released 24 Jan. Owner's record lists "CoinDesk Protocol newsletter (Jan 18 2024)" and no exclusive or embargo. | Contradicted (date) and uncorroborated (exclusive, embargo, exchange partners) |
| RARI: "11 simultaneous Tier-1 placements" | Owner's record lists 11 coverage items, but they include NFTgators, CryptoPanic, CoinMarketCap community, ICOholder and Metaverse Post. It does not list Decrypt or NFTNow, which the case study names. | Overstated |
| MANTRA: "CoinDesk exclusive" | Article exists (19 Mar 2024), Shorooq Partners led the round, but the page has no exclusive label and cites a press release for the investor list. Same story ran at CryptoPotato and CryptoDaily. | Exclusivity unverified |
| MANTRA: "standalone Cointelegraph CEO profile" | The Cointelegraph page (4 Apr 2024, 16 days after the raise) is a recap of episode 53 of the "Hashing It Out" podcast, not a profile. Owner's record calls it an interview. | Overstated |
| Gaia: "Forbes picked it up under 'the Stripe for AI agents'"; Forbes "anchored the rest of the stack" | Forbes URL is a contributor post (/sites/clorischen/), dated 23 Dec 2024, title "AI Agents 101: The Future Of Agentic Web And Onchain AI". WebFetch returned 403 and I could not read the body. Search could not confirm a Gaia mention. The phrase appears in the CryptoDaily interview title (her own byline) and on IQ.wiki attributed to the co-founder. Owner's record does not say Forbes used the phrase. | Unverified, likely overstated |
| Gaia stat tile "Tier-1 outlets: 5" | Counts Forbes, Decrypt, Benzinga, CryptoDaily UK and Binance Square. CryptoDaily is her own contributor byline; Binance Square is a self-publishing platform. | Overstated |
| Bullieverse: "Economic Times exclusive" | ET page blocked my fetch. The same story ran 17-18 Feb 2022 on Inc42, Business Today, Entrackr and as a Venture Intelligence reprint. Owner's record does not call it exclusive and says the CoinDesk placement "was sponsored content, not earned", yet /work lists CoinDesk beside the earned outlets. | Exclusivity unverified; sponsored item not labelled on hub |
| Fluence: Trowbridge op-ed "ghostwritten and placed" and "two founder voice interviews, a draft written in the founder's voice" | CoinDesk piece exists with Trowbridge's byline and no PR mention. Owner's record says "positioned ... through op-eds, newsjacking and interviews", not ghostwritten. Content page calls him "Fluence CEO"; case study pages call him "co-founder". | Ghostwriting unverified; Trowbridge is confirmed as Fluence co-founder and CEO (section 10), so the title wording is only inconsistent |
| Web3Auth case study | Real launch (2 Oct 2023). Her Icebreaker profile lists "PR/Comms & Partnerships, Web3Auth (Apr 2023 - Jun 2024)", i.e. an in-house role; the case study does not say so. Consensys announced it acquired Web3Auth on 2 Jun 2025 and MetaMask docs now say "MetaMask Embedded Wallets (formerly Web3Auth)"; the site never mentions this. CoinDesk "proof" is a weekly roundup paragraph (Protocol Village, 6 Oct 2023, about three sentences). | Role undisclosed; entity stale |
| Home hero: "Led PR for Gaia AI, CoinMarketCap, Polygon" | CoinMarketCap was an employer (owner's record: APAC Lead, "1.5 years"), not a client. Polygon appears only as a logo-wall name with no proof link. | Misleading as worded |
| Home stats: 500+ placements, 150+ Tier-1 publications, 5B+ impressions, 50+ launches, 25+ countries; About: 100K+ mentions per quarter | No methodology or list anywhere. "150+ Tier-1 publications" is not plausible under the site's own Tier-1 definition. | Unverified |
| "50+ protocols" | Site names 26 in the About portfolio list; owner's record names 32 clients and includes in-house or Myosin-era work; Icebreaker lists about 14. No count is shown. 8 of the 26 site names (Stellar Foundation, Gnosis Guild, Liquity, Aragon, Zilliqa, Legion, Reown, RabbitX) are absent from the owner's "Clients worked with" list (Reown is WalletConnect's rebrand and testimonial 7 covers it; Stellar shows as a Myosin client on myosin.xyz). | Unverified |
| AI Magazine as a placement (20+ mentions across home, About, service pages, schema) | No AI Magazine URL appears in any core partial, and "AI Magazine" does not appear in data/knowledge/portfolio.json. Same for Business Insider, Fast Company and The Information on the home coverage strip. | Unverified |
| FAQ: "zero AI citations to 8 to 15 inside one quarter"; "Forbes placement continues to surface in AI-search answers" | No data in the repo. data/ai-citation-panel rollup (2026-09-25) covers google_serp only, no ChatGPT/Perplexity/Claude/Gemini rows. | Unverified |

Logo-wall links on home are weak proof: "Ripple" links to her CryptoDaily author index, "NEAR Foundation" links to a Bitcoin.com article about Aurora Labs, and 16 of the 25 names on the wall (Stellar Foundation, Gnosis Guild, Liquity, Aragon, Zilliqa, Legion, Reown, RabbitX, WalletConnect, Polygon, OKX, Animoca Brands, Solana Saga, ParaSwap, Rootstock, Stader Labs) have no link at all.

### 4.3 Third-party guidance is misstated (high)

| On-site claim | Primary source check | Where it appears |
|---|---|---|
| "Google's May 2026 AI optimization guide: the four things that move the needle are non-commodity content with a unique point of view, crawlable indexable pages, multimodal assets, and strong E-E-A-T signals" | The page exists ("Optimizing your website for generative AI features on Google Search", last updated 2026-07-10, no "May 2026"). Raw HTML contains non-commodity content and unique point of view, but zero occurrences of "multimodal" and zero of "E-E-A-T". It also tells site owners that for Google Search they can ignore chunking content, creating AI text files such as llms.txt, and seeking inauthentic mentions. | 32 partial files (service pages web3, founder, KOL, APAC, token; regional desks; many articles) |
| "Google's May 2026 generative AI content guidance is explicit: the byline is what matters, not the keystrokes" and "Will Google penalize ghostwriter content? No." | The page (last updated 2026-10-01) has no mention of ghostwriters, authorship or bylines (the only "byline" hit is a nav item, "Byline dates"). It talks about scaled content abuse and fact-checking. | /services/content-writing body, FAQ answer, and the FAQ in its JSON-LD |
| Princeton GEO: "this combination (direct answer, question H2s, named entities, statistics, modified date, FAQ block) produces 30 to 40 percent more AI citations" | The arXiv abstract (2311.09735) says GEO "can boost visibility by up to 40%"; it does not mention FAQ blocks, modified dates or question headings. | /services/content-writing; 44 partials cite the paper in looser form ("pages combining citations, statistics and named quotations get cited 30 to 40 percent more") |
| "AI Overviews appear on roughly half of all queries; position-one CTR fell from around 27 percent to as low as 11 percent" | Not matched. Closest: Ahrefs (4 Feb 2026) reports 58 percent lower CTR for top result with an AI Overview; Seer/Authoritas about 31.7 to 23.4 percent. | web3, token, cyber pages (3 files carry the 27 to 11 line, 8 carry "roughly half") |
| "Google AI Mode has passed one billion monthly users" | Corroborated by multiple secondary reports citing Google I/O 2026 (primary post not seen). | 5 files |
| "Earned coverage accounts for the large majority of AI-cited links; press releases about one percent" (no source named) | Consistent with Muck Rack Generative Pulse (July 2025: press releases 1.2 percent; May 2026 edition says earned media about 84 percent and press releases near the July level, after a 6 percent reading in Dec 2025). The Gaia case study instead says "48 percent" from AuthorityTech/Profound, so two figures for one idea. | 3 service pages, Gaia case study |

The site's GEO tactics (llms.txt, answer chunking) are therefore justified in copy by a Google page that says the opposite for Google Search. That is not a reason to stop (other engines are not Google Search), but the citation should be removed or restated honestly.

### 4.4 Stale and wrong time-sensitive facts (high)

Verified externally: Token2049 Dubai 2026 was postponed (announced March 2026) to 21-22 April 2027 (original dates 29-30 April 2026). KBW 2026 is 29 September to 1 October at Walkerhill, Seoul (organiser press release). WebX 2026 was 13-14 July at The Prince Park Tower Tokyo. Token2049 Singapore was 7-8 October 2026. GITEX Global 2026 is 7-11 December 2026, main show at Expo City Dubai.

Counts on the live site (grep of rendered text):

| Phrase | Live pages carrying it |
|---|---|
| "Korea Blockchain Week 2026 (September 22 to 28 ...)" (wrong) | 6: web3, founder, KOL, APAC, token, AI startup |
| "Impact at COEX" (wrong venue) | 3: web3, token, APAC |
| "the May 2026 Token2049 Dubai press cycle" (event was postponed) | 3: web3, token, APAC |
| "this week" about WebX (13-14 July) | 4: web3, KOL, token, APAC; web3 also says KBW is "roughly ten weeks out" |
| "Q2 2026" regulatory window | APAC 9 times (H2 reads "The Q2 2026 regulatory window ..."), KOL 1, home 2 |
| "GITEX Global 2026 (October, Dubai World Trade Centre)" | AI startup page; true dates are 7-11 Dec at Expo City |
| "Plan Week 9.1" (internal plan label) | APAC FAQ, last answer; local copy still has it |

"Updated" labels: home FAQ intro "30 June 2026" and /faq "12 June 2026" (same live and local; three different dates for the same 11 to 12 questions once the home JSON-LD dateModified of 2026-07-15 is counted); About 23 May 2026; case studies May 2026; Web3 PR page July 2026 while git shows the file edited 2026-10-13; service pages have no dateModified in schema at all. Today is 15 October 2026, so the freshest label on a service page is under a month old and the oldest core label is almost five months old. Homepage "Recently on stage" lists Web3 Conf Goa (tweet dated 2022-08-23) and EpicWeb3 (2022-11-21).

The local working tree already fixes the APAC page (KBW 29 Sep, Dubai moved, no "Q2 2026") but is uncommitted, and the same fixes were not applied to the five other pages.

### 4.5 Credentials and entity naming (high)

- Role title for the same job appears in five forms: "Head of PR" (About body), "Head of APAC at Myosin" (CryptoDaily bio), "Global PR & Comms at Myosin DAO" (HackerNoon bio, March 2026), "Head of PR & Partnerships" (Icebreaker), "APAC PR & Partnerships at Myosin" (service-page author boxes and home JSON-LD "leading APAC PR & partnerships"). myosin.xyz does not name her.
- CoinMarketCap: site says "APAC PR & Partnerships, 2021 - 2023, built the regional comms function from scratch, 100+ journalists, 150+ KOLs". CryptoDaily bio says "led marketing initiatives at CoinMarketCap". Icebreaker says "former APAC Lead" with no dates. Owner's record says "leading Partnerships & PR there for 1.5 years". Web search found no independent source (no CoinMarketCap page, press release or news item).
- Career arc on /about omits roles on her Icebreaker profile: Web3Auth PR/Comms & Partnerships (Apr 2023 - Jun 2024) and PR Lead at Cloudless Labs (Jul 2024 - Mar 2025). These overlap the "2023 - Now Head of PR, Myosin" entry.
- "Years: 6, since 2019": 2019 to 2026 is seven years and the first role in the arc is 2020. Organization schema says foundingDate 2019 and footer says 2019-2026.
- Category noun varies: consultant (home title), manager (schema jobTitle), operator (About), strategist (testimonials schema "Senior PR Strategist"), publicist (landing pages).
- Person entity: home, About, services and case studies use @id https://www.shilikajain.com/#person. The author page uses @id https://www.shilikajain.com/authors/shilika-jain, a second Person node. The home JSON-LD and the author JSON-LD both exist on different URLs with different @ids.
- No core page links to /authors/shilika-jain (checked live: home, about, faq, services, work, testimonials, contact, three service pages: 0 hrefs). geo-guidelines.md calls this page the E-E-A-T hub.
- About page has a section titled "Citation policy" addressed to "an AI search engine, a journalist, a researcher or a competitor". It is harmless today but is the kind of text some pipelines treat as instruction-like or manipulative.
- About JSON-LD uses `award` for four speaking slots ("Featured speaker at ..."), which is not what the property means, and contains HTML-escaped ampersands (4 occurrences of `&amp;` inside JSON strings, e.g. jobTitle).
- Speaking claims: Binary Summit Bangkok, EpicWeb3 Summit and the July 2025 XRPL/Tenity workshop returned no search hits; the X posts linked from /about could not be fetched (HTTP 402). Treat as unverified, not false.

### 4.6 Testimonials page misdescribes its own content (high)

Intro says the quotes come from "clients, founders, marketers and journalists", "journalists at outlets like CoinDesk, Cointelegraph, Decrypt, The Block and Forbes", and "Most have worked with Shilika on a sustained 3 to 12 month engagement". data/testimonials.json shows:

- Relationship: 5 clients, 6 same-team colleagues, 4 people who managed her, 3 "different teams / different companies", 1 teacher (2019).
- Dates: 16 of 19 between 5 and 16 April 2025, 2 in 2022, 1 in 2019. None in 2026, despite "from 2021 to 2026" and "UPDATED MAY 2026".
- No journalist from the named outlets; the closest is "Ex-Journalist, Aspiring Film Writer" (2022).
- JSON-LD attaches `aggregateRating` (5.0, 19 reviews) and four `Review` objects to the Person that the site itself publishes. That is self-serving review markup (and Person is not a rich-result type).

### 4.7 Thin hubs and the author page (medium)

- /services: H1 plus 8 cards. No answer paragraph, no "which service for which situation" table, no pricing, no FAQ, no JSON-LD (live HTML has none). All cards still show a "NEW" badge although commit cb75d81 says NEW tags were removed (only the homepage ones went).
- /work: 439 words, no H2, no intro, no dates, no roles, no outcomes, no schema.
- /contact: 201 words, no H2, no schema, Gmail address, no response-time or availability statement.
- /authors/shilika-jain: 387,696 bytes, 299 post summaries on one page, no pagination, truncated titles and descriptions (for example a title ending mid-phrase "How to Get Cited in ChatGPT,"), 65 em dashes and 21 "Here's how/why" openers in the summaries.
- Breadcrumbs on service pages link to "/#services" and case studies to "/#work" (homepage anchors) rather than /services and /work. Testimonials CTA goes to "/#contact".

### 4.8 Structured data delivery and quality (medium)

- On all 17 live core pages and one blog post I fetched with curl, there is no static `<script type="application/ld+json">` in the HTML. JSON-LD is injected through next/script: service/about/author pages ship it as a `self.__next_s.push(...)` call (beforeInteractive), home and blog posts only as RSC flight data (afterInteractive). Googlebot renders JavaScript and should see it. Crawlers that fetch raw HTML without running scripts (commonly reported for LLM retrieval bots; not verified here) will not see any JSON-LD. Home and /faq are the exception because they also carry FAQPage microdata in server HTML.
- Service pages have FAQPage, Service, Offer, BreadcrumbList but no Article/WebPage with dateModified, so the "Updated September 2026" label is visible text only.
- Home has FAQPage twice (microdata and JSON-LD).
- Price mismatches in schema vs visible copy (section 4.1).
- FAQ rich results are not available to commercial sites (the repo's own script notes deprecation on 7 May 2026), so FAQPage markup is for machine readability only; visible text is what matters.

### 4.9 AI-writing tells and style-guide violations (medium)

Counts from the rendered text of local partials (python regex, section 8).

- /about contains 28 em dashes (H1 "Shilika Jain" plus em dash, "Named campaigns", "Outlets placed in", bullets); /authors/shilika-jain contains 65. Everything else is clean. The hard rule in docs/humanization-guide.md bans em dashes.
- The 1 Oct 2026 mechanical swap (commit cb75d81) replaced em dashes with " - " used as a clause break, which keeps the tell: 195 occurrences across the 8 service pages (APAC 47, KOL 35, token 31, cyber 30, founder 27, web3 20, AI 5, content 0), 28 on home, 16 to 43 per case study (Gaia 16, RARI 25, MANTRA 43, Fluence 42, Web3Auth 30, Bullieverse 42).
- The validator is broken. scripts/check-humanization.mjs line 16 is `{ id: 'em-dash', pattern: /-/g ...}` with an ASCII hyphen (hex 2f2d2f67). Test: input "a - b" followed by a real em dash flagged only the hyphen and let the em dash through. lib/agents/humanize-loop.ts imports this function, so the blog-writer gate flags every hyphen and passes real em dashes.
- Templated phrasing across service pages: "senior operator" 35 times, "honest/honestly" 12, "It is not ..." bullets 32, "Not a five-person / junior / content mill" triad 16, "the operational lesson" 14, "compound(s/ing)" 24, "leverage" 25, "unlock" 9. Every service page repeats an "AI search layer" section with the same statistics and the same three citations. The per-country FAQ blocks on five pages (answers 130-190 words) restate one template per market.
- Generic H2s repeated on every service page ("Who this is for", "How the engagement runs", "What is in scope", "What this is not", "How to start") carry no entity or topic; a retrieved chunk under that heading has no context. geo-guidelines.md asks for H2s a reader could type into a search box.
- FAQ answers on service pages average 103-135 words (80 on content), longer than the 2-4 sentence target; /faq at 62 words is on target.
- Hub and case-study pages use arrows as CTA decoration (33 on home, 16 on /services); not a prose defect.

### 4.10 Other content defects

- /about shows two H2 "Frequently asked questions" blocks, 7 questions each, different sets; FAQ schema covers only the second. One H2 reads "Have a story that needs to land ?" with a stray space.
- Home H1 ends in "that lands Tier-1 headlines" while the same page lists CoinDesk "Protocol" newsletter paragraphs as placements.
- Competitor price claims name real agencies (Mission North, Highwire, Method, Bospar "$25K to $50K per month") with no source.
- Service-page proof is thin where the service is newest: AI startup has one case, cybersecurity has none (admitted), token launch has no TGE, KOL has no named creators or campaign results.
- Content page links outbound to Forbes Council and Cointelegraph Innovation Circle as "Tier-1 contributor outlets"; the Founder Profiling page says pay-for-byline networks are not how a voice is earned. Pick one position.
- Core pages carry no outbound links to primary sources for the market statistics they quote; the Gaia case study cites WordStream/Heroic Rankings, AuthorityTech/Profound and ALM Corp, which are vendor blogs.

---

## 5. Internal links and CTAs

| Page | Internal links to /work | /about | /contact | Calendly CTA | Note |
|---|---|---|---|---|---|
| Home | 10 | 3 | 3 | 7 | Strong |
| /services hub | 0 | 0 | 0 | 0 | Only nav "Book a call" |
| /work hub | 6 | 0 | 0 | 0 | No CTA besides nav |
| Web3 PR, Founder, KOL, APAC, Token | 5 to 8 | 1 | 0 | 1 | One end-of-page CTA |
| AI startup, Content | 0 | 0 | 0 | 1 | No link to proof or bio in body |
| Cybersecurity | 2 | 1 | 0 | 1 | |
| /testimonials | 0 | 0 | 0 | 0 | CTA to "/#contact" |
| /faq | 1 | 0 | 0 | 2 | |

No core page links to /authors/shilika-jain. No CTA on service pages offers a pricing path other than "Book a 30-minute teardown".

---

## 6. Prioritised fixes

| # | Action | Owner | Impact | Effort |
|---|---|---|---|---|
| 1 | Create one pricing source (data/pricing.json), render it into home overlay, hero, meta, FAQ, /faq, /about, every service page and all JSON-LD; add a /pricing page. SJ chooses the numbers. | code (SJ decides) | high | medium |
| 2 | Claims audit with SJ against her records: restate or remove "9-day CoinDesk exclusive", RARI date and "11 Tier-1", MANTRA "exclusive" and "CEO profile", Gaia "Forbes used the Stripe frame", "Led PR for CoinMarketCap/Polygon", "150+ Tier-1", "100K+ mentions", "8 to 15 citations", AI Magazine/The Information/Business Insider/Fast Company (add links or drop). Label sponsored items (Bullieverse CoinDesk). Disclose in-house vs client role per case study. | SJ | high | medium |
| 3 | Bulk-correct third-party citations: drop the "May 2026 guide four things" and "byline is what matters" text (32 and 1 files, plus content-writing JSON-LD), describe the Princeton paper as "up to 40 percent visibility gain from individual tactics", name the Muck Rack source for the earned-media and press-release figures, and note that Google Search says llms.txt is not needed. | code + SJ review | high | small |
| 4 | Fix and guard time-sensitive copy: KBW 29 Sep-1 Oct (Walkerhill), Token2049 Dubai 21-22 Apr 2027, GITEX 7-11 Dec at Expo City, WebX and Token2049 Singapore in past tense, remove "this week" and "ten weeks out", remove "Plan Week 9.1", commit and deploy the pending APAC edits, bump "Updated" only on real edits and add dateModified to service schema. Add a build check for relative-time phrases and month names older than 90 days. | code | high | small |
| 5 | E-E-A-T pack: one canonical bio line and title, disclose Web3Auth and Cloudless roles, correct "since 2019", link every byline and author box to /authors/shilika-jain and unify the Person @id to #person, trim the author page to the newest 20 with pagination. Off-site: get Myosin, CoinMarketCap-alumni, Muck Rack, Crunchbase and Wikidata entries that name her with the same title. | SJ + code + off-site | high | medium |
| 6 | Testimonials: rewrite the intro to match the data (counts by relationship and date), collect 5 or more dated 2026 client quotes with company, role and outcome, and move review ratings to a third-party platform; delete aggregateRating/Review from the self-published Person. | SJ + code | medium | medium |
| 7 | Rebuild the thin pages: /services (80-word answer, "which service when" table, price table, FAQ, CollectionPage/ItemList schema), /work (answer-first intro, outcome table, dates, role type, ItemList), /contact (what happens next, response time, hours and time zone, ContactPage schema, business address), About (merge the two FAQs, add a pricing table). | code + SJ | medium | medium |
| 8 | Style and markup: fix the em-dash regex in scripts/check-humanization.mjs, rerun on all core partials, replace the 195 + 28 + case-study " - " clause breaks and the 28 About em dashes, make H2s entity-bearing questions, output JSON-LD as static server-rendered script tags. | code | medium | medium |

Measurement note (owner: measurement): the citation panel in data/ai-citation-panel only has google_serp rows, and several service-page FAQ headings are the panel prompts nearly verbatim (for example "Who runs PR for AI agent startups and AI infrastructure companies in 2026?"). Gains on those prompts are not independent evidence of AI-engine citation. Add ChatGPT/Perplexity/Claude/Gemini runs on prompts the site does not echo.

---

## 7. Claim spot-check ledger (24 checks)

| # | Claim | Check | Result |
|---|---|---|---|
| 1 | Gaia Forbes piece by Cloris Chen, 23 Dec 2024 | WebFetch 403; WebSearch found the Forbes contributor URL and title | Exists; Gaia mention and "Stripe" wording unverified |
| 2 | Decrypt Gaia piece | WebFetch 403; owner's record dates it 29 Jan 2025 | Unverified |
| 3 | MANTRA CoinDesk, 19 Mar 2024 | WebFetch | Exists; Danny Nelson; Shorooq led; no exclusive label |
| 4 | MANTRA Cointelegraph "profile" | WebFetch | Podcast recap, 4 Apr 2024, Elisha Owusu Akyaw |
| 5 | Fluence CoinDesk Opinion, 3 Apr 2025 | WebFetch | Exists; Tom Trowbridge byline; no PR mention |
| 6 | RARI The Block article | WebFetch | Exists; 24 Jan 2024 9:01 AM EST; quotes Jana Bertram |
| 7 | RARI Cointelegraph | WebFetch | Exists; 24 Jan 2024; mainnet released 24 Jan |
| 8 | RARI CoinDesk "exclusive" | WebFetch | Protocol Village roundup, published 25 Jan 2024 |
| 9 | RARI The Defiant, CryptoNews | WebFetch | Defiant exists (body not shown); CryptoNews 403 |
| 10 | Web3Auth CoinDesk | WebFetch | Weekly Protocol Village (6 Oct 2023), one short paragraph |
| 11 | Web3Auth x Google Cloud (2 Oct 2023) | WebSearch | Corroborated (Blockworks, Web3Auth blog, Cryptonews) |
| 12 | Web3Auth current status | WebSearch | Acquired by Consensys (2 Jun 2025); now MetaMask Embedded Wallets |
| 13 | Bullieverse $4M, Feb 2022 | WebSearch | Corroborated (Business Today 18 Feb 2022, Inc42, Venture Intelligence); ET page blocked |
| 14 | CoinMarketCap role | WebSearch, CryptoDaily page, Icebreaker | Self-published only; titles differ; no independent source |
| 15 | Myosin "Head of PR" | WebSearch, myosin.xyz, HackerNoon | Self-published; myosin.xyz does not name her; titles differ |
| 16 | CryptoDaily contributor since 2020 | WebFetch author page | Page exists; first article visible on page 1 is Aug 2024; latest July 2026 |
| 17 | 50+ protocols | portfolio.json, site lists | Not countable from public evidence |
| 18 | Google AI optimization guide | WebFetch + raw curl | See 4.3: misrepresented |
| 19 | Google gen-AI content guidance | WebFetch + raw curl | No byline/ghostwriter text |
| 20 | Princeton GEO claim | WebFetch arXiv abstract | "Up to 40%" visibility; no FAQ/date/heading claim |
| 21 | Token2049 Dubai, KBW, WebX, GITEX, Token2049 SG dates | WebSearch | KBW and Dubai wrong on several pages; GITEX wrong; WebX correct |
| 22 | Japan Diet 15 Jul 2026; HKMA licences 10 Apr 2026 | WebFetch | Both corroborated |
| 23 | AI Mode 1B users; earned media/press-release share; AIO half of queries and 27 to 11 CTR | WebSearch | First two corroborated (secondary); last unmatched |
| 24 | Speaking: Binary Summit Bangkok, EpicWeb3, XRPL/Tenity workshop | WebSearch, WebFetch of X post | No independent trace; X blocked |

---

## 8. Commands run and key output (abridged)

```
# Live fetch, 17 core URLs, UA "Mozilla/5.0 (compatible; AuditBot)"
/ 200 218901 | /about 200 122973 | /authors/shilika-jain 200 387696 | /work 200 50716
/testimonials 200 125084 | /faq 200 38993 | /contact 200 30574 | /services 200 37889
8 service pages 200 (94,747 to 160,451 bytes) | /llms.txt 200 162869

# Static JSON-LD in raw HTML
for f in live/*.html: grep -o '<script[^>]*application/ld+json' | wc -l  ->  0 on every page
service pages: 'ld+json' appears only inside (self.__next_s=self.__next_s||[]).push([0,{"type":"application/ld+json",...
home/blog: only inside RSC flight data (afterInteractive next/script)

# Live JSON-LD prices (extracted from __next_s push)
web3-pr-campaigns  [('5000','12000'),('15000','40000')]  unitText MONTH
ai-startup-pr      [('5000','12000'),('12000','25000'),('15000','40000')]
cybersecurity-pr   [('5000','12000'),('12000','28000')]

# Em dash / hyphen counts (python on local partials, rendered text)
about em=28; every other core page em=0
' - ' clause breaks: service pages web3 20, founder 27, kol 35, apac 47, token 31, ai 5, content 0, cyber 30 (total 195); homepage 28

# Google pages (curl, raw)
ai-optimization-guide: 'Last updated 2026-07-10 UTC'; multimodal 0; E-E-A-T 0; contains the sentence telling Search users they can ignore chunking and llms.txt
using-gen-ai-content: 'Last updated 2026-10-01 UTC'; ghost 0; keystroke 0; author 0; 'byline' 1 (nav item 'Byline dates')

# Repo-wide counts of citation boilerplate (grep -l over app/_partials)
ai-optimization-guide 32 files | using-gen-ai-content 10 | 'byline is what matters' 2 (content-writing body + jsonld)
2311.09735 44 files | 'one billion monthly users' 5 | 'roughly half of all' 8 | 'as low as 11' 3 | 'roughly one percent' 3

# Testimonials (data/testimonials.json)
19 entries; relationship: client 5, same team 6, managed her 4, different teams/companies 3, teacher 1; dates: 2025 x16, 2022 x2, 2019 x1

# Proof link health (curl, 42 external URLs from /work, 6 case studies, home)
200 x29 | 202 x1 | 403 x11 | 404 x1 (cointelegraph.com/news/new-tech-could-make-crypto-and-web3-wallets-more-convenient/amp)

# Schema/visible parity
node scripts/faq-parity-audit.mjs -> 258 partial pairs scanned; parity DEFECTS: 0

# Validator test
printf 'a - b <em dash> c' | findViolations -> [ 'em-dash:"-"' ]   (hyphen flagged, real em dash not)

# Rate limiting
~45 rapid curl requests to shilikajain.com from one IP ended with HTTP 403, x-vercel-mitigated: challenge ("Vercel Security Checkpoint") on /api/markdown/blog/...
```

Other facts from the working tree: markdown routes exist only for blog posts (app/api/markdown/blog/[slug]/route.ts). /api/markdown/{about,faq,contact,services,work,testimonials,authors} returned 404. llms.txt lists core pages by HTML URL.
Git: HEAD is 30dd8aa on branch compare-pages. Uncommitted changes at session start include homepage-body.html, homepage-jsonld.json, services-body.html, services__apac-pr-body.html, services__apac-pr-jsonld.json, services__kol-marketing-body.html, the apac and singapore partials, i18n files, llms-intro.md and sitemap.ts. The four core body files that differ from HEAD show small edits (git diff --stat: homepage 4 lines, services hub 4, APAC 50, KOL 2); the live homepage differs from local only in the APAC card wording.

Files written for this audit (scratch only): /private/tmp/claude-504/-Users-thunderbolt-Documents-projects-Shilika/c0dc2b3b-3b31-46db-9535-df2409eb89af/scratchpad/audit/ (live HTML snapshots, text conversions, analyze.py, proof_status.txt). Nothing inside the project was modified.

## 9. Limits and unverified items

- Forbes, Decrypt, Benzinga, Blockworks, CryptoNews, e27, The Defiant (body), Economic Times, YourStory and X returned 403, 402 or blocked fetches. Their claims are marked unverified, not false.
- I did not audit the five machine-translated locales; they are built from the same source JSON (app/_partials/i18n/_source) and will inherit the pricing and claim errors.
- I did not check Google rendering of the injected JSON-LD (no Search Console access).
- The Vercel challenge was triggered by my own burst of requests; whether it also challenges AI crawler user agents is unknown and worth a WAF review.
- Third-party search summaries were used for several event and statistic checks; where only secondary sources were found it is stated.
- The first pass ran out of WebSearch budget before three spot checks; they were completed on 2026-10-16 and are in section 10.

---

## 10. Addendum (2026-10-16): resumed run, re-verification and the three skipped checks

Re-verification of the live site and working tree (nothing was deployed between the two runs; the project tree was not modified):

```
curl live (UA AuditBot) / 200 218924 | /services/web3-pr-campaigns 200 120342 | /services/ai-startup-pr 200 116344 | /services/apac-pr 200 160518
live home: "Retainers run $5k-10k/month." present; "Q2 2026" occurs 5 times in raw HTML
live web3 page: "Korea Blockchain Week 2026 (September 22 to 28, Impact at COEX, roughly ten weeks out)" still present
live APAC page: "Korea Blockchain Week 2026 press cycle in Seoul (September 22 to 28 ..." still present, "Q2 2026" 28 times in raw HTML (includes JSON-LD and repeated headings)
live AI startup page: "KBW 2026 (September 22 to 28, COEX)" and "GITEX Global 2026 (October, Dubai World Trade Centre)" still present
local grep -c 'September 22' app/_partials/services__*-body.html: ai-startup 1, founder 1, kol 1, token 1, web3 1, apac 0 (local APAC fix still uncommitted), content 0, cyber 0
local APAC body still contains the internal label "Plan Week 9.1"
local home FAQ still says "$5K to $14K per month" (Web3) and "$7.5K to $15K per month" (cyber)
git: current branch is main at HEAD 30dd8aa (the first pass recorded compare-pages; the HEAD commit is the same)
```

The report counted six pages with the wrong KBW dates (web3, founder, KOL, APAC live, token, AI startup). That is confirmed: five carry it in the local tree and the live APAC page carries it too, because the local APAC fix is not deployed. The AI startup page abbreviates it as "KBW 2026", which a search for the full name misses.

The three checks that were skipped:

| # | Claim | Check | Result |
|---|---|---|---|
| 25 | Tom Trowbridge is "Fluence CEO" (content page) and "co-founder" (case study pages) | WebSearch | CoinDesk author profile and CoinMarketCap Academy author profile describe him as co-founder and CEO of Fluence, formerly Hedera Hashgraph president. Both titles are correct, so the inconsistency is wording only, not a factual error. The earlier line "Role unverified" for this item should read "Role confirmed; the ghostwriting claim is still uncorroborated". |
| 26 | Token2049 Singapore "20,000+" attendance (home and landing copy) vs organiser | WebSearch | Chainwire releases dated 6 Aug and 6 Oct 2026 say 25,000 attendees from 160 countries, sold out, 7-8 Oct at Marina Bay Sands (organiser claims, republished by Decrypt and The Block). The site's "20,000+" is conservative and not wrong, but 25,000 is the current organiser figure and the event is now past tense. |
| 27 | KOL page example creators "Kazumasa Otsuka" (Japan) and "Pushpendra Singh" (India) | WebSearch | Pushpendra Singh is a real Hindi crypto educator ("Pushpendra Singh Digital", about 378K subscribers per creator-data sites, CoinDCX 2020 profile). No result at all for Kazumasa Otsuka in English search (a Japanese-script search was not run). The page frames both as "-class accounts", not as clients, so this is an unverifiable example, not a false claim. A named creator that cannot be found weakens the page's "200+ vetted KOLs" proof. |

Net effect on scores: none. Sections 4.2 and 4.4 stand as written. The only wording change is that the Fluence CEO/co-founder item is a consistency nit rather than an unverified role.
