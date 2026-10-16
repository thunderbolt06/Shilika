# Entity footprint audit: Shilika Jain (off-site)

Audit date: 2026-10-15. Scope: everything about the entity "Shilika Jain" that lives outside shilikajain.com, compared with what the site claims (JSON-LD sameAs, About, Speaker, Testimonials, case studies).

Method notes and limits (read first):
- Bash on this machine cannot reach shilikajain.com (curl times out to 64.29.17.1 and 64.29.17.65 after 12-40 s while example.com returns 200). All live-site facts below were taken through a Chrome tab (own tab, closed afterwards) or WebFetch.
- Google results were read in the owner's signed-in Chrome profile with `gl=us&hl=en`. They are personalised and not a clean-room SERP. I ran about ten Google queries in one tab and stopped when another tab (not mine) hit a Google "sorry" interstitial; I did not touch or bypass it.
- WebFetch summaries come from a small model and are lower confidence than raw HTML or API output. Where a fact rests only on a Google snippet I could not re-fetch, I say "Google snippet only".
- X data came from the public fxtwitter API (api.fxtwitter.com). LinkedIn data came from the logged-out public page, which masks employer names.
- Icebreaker, Wiza and ContactOut are scrapers of LinkedIn. I treat them as a copy of LinkedIn, not as independent evidence.
- Ahrefs and Search Console were not used (not available).

## 1. Bottom line

Score: 4.5 / 10.

What works: the name resolves to one professional entity, the site ranks #1 for "Shilika Jain", LinkedIn and X exist and link back to the site, and several third parties (press-release contact blocks, a podcast, student-club event posts, HackerNoon, Muck Rack, CryptoDaily) mention her in the roles the site claims. There is no collision with another professional of the same name.

What does not work: there is no Knowledge Panel, no Wikidata or Wikipedia entity, no Crunchbase or Clutch profile, and no Tier-1 byline or quote from her personally. The headline numbers (50+ protocols, six years, 100K+ mentions/quarter, 200+ KOLs, "500+ placements, 5B+ impressions" on Chalk Labs) have no independent source. Titles, employers, dates, location and prices differ between her own surfaces. LinkedIn shows her name as "Shilika ." with no surname. JSON-LD is injected by JavaScript only. The sameAs list is thin and contains two non-identity URLs.

## 2. Platform-by-platform inventory

| Surface | Exists | URL | Name / bio consistent with site | Links to shilikajain.com | In site sameAs |
|---|---|---|---|---|---|
| LinkedIn personal | Yes | https://www.linkedin.com/in/shilika/ (301 to ae.linkedin.com/in/shilika) | Name shows "Shilika ." (no surname) in logged-out view; headline per Google "Public Relations \| I support leading Web3 and AI ..."; About says "Head of PR & Partnerships at Myosin"; location Dubai; no "fractional" wording. Partial | Yes (website field shows shilikajain.com; Sept 2026 post says "check out - shilikajain.com") | Yes (Person and Organization) |
| LinkedIn company page | Not found | none in SERP or on site | n/a | n/a | n/a (Organization sameAs points to the personal /in/ URL) |
| X / Twitter | Yes | https://x.com/Shilika_jain | Name "Shilika Jain"; bio "all things public relations + comms @myosin_xyz @cryptodailyuk, prev @coinmarketcap @binance"; website shilikajain.com; joined 2019-10-20; verified. Partial (adds Binance, no "fractional") | Yes | Yes |
| CryptoDaily author | Yes | https://cryptodaily.co.uk/author/ShilikaJain | Bio says "Head of APAC at Myosin", "led marketing initiatives at CoinMarketCap", contributor to The Chainsaw. Title differs from site | No | Yes |
| Muck Rack | Yes, unclaimed | https://muckrack.com/shilika-jain | "As seen in: HackerNoon, EIN News, Crypto Daily, The Chainsaw"; location "England"; bio copied from X; 19 articles | No | No |
| HackerNoon | Yes | https://hackernoon.com/u/shill | "Global PR & Comms at Myosin DAO" (stale 2022 title); nominated 2022 Contributor of the Year, Founder Interview; links to LinkedIn and X only | No | No |
| YouTube | Yes | https://www.youtube.com/@shilikajain | "Shilika Jain \| PR Lead in Web3 and AI"; 3 subscribers, 19 videos in page metadata; description links shilikajain.com, Calendly, Gmail | Yes | No |
| YouTube (second) | Unknown owner | https://www.youtube.com/@shilikajain4585 | Titled "Shilika Jain"; could not establish whether it is hers | Unknown | No |
| dev.to | Yes | https://dev.to/shilika | "Shilika" only; joined 2025-08-20; 79 posts; bio repeats "50+ protocols placed in Forbes, CoinDesk, Cointelegraph, Decrypt & The Block"; ex-CoinMarketCap APAC PR | Yes | No |
| Calendly | Yes | https://calendly.com/shilikajain/ and /30min/ (both 200) | Host name "Shilika", generic description, no bio or price | n/a | Yes (/30min/) |
| Telegram | Yes | https://t.me/shilika3 | "Shilika Jain" | n/a | Yes |
| Icebreaker | Yes | https://app.icebreaker.xyz/profiles/linkedin-shilika | Scraped LinkedIn copy: Head of PR & Partnerships Myosin Jan 2023-present; PR Lead Cloudless Labs Jul 2024-Mar 2025; PR/Comms & Partnerships Web3Auth Apr 2023-Jun 2024; former APAC Lead CoinMarketCap (no dates) | Unclear (two fetches disagreed) | No |
| Wiza, ContactOut | Yes | wiza.co/d/coinmarketcap/df62/shilika-jain (403 to me; Google snippet "Growth & Partnerships at Coinmarketcap"), contactout.com listing "Head of PR & Partnerships at Myosin.xyz" | Scrapers, stale | No | No |
| Chalk Labs | Yes | https://www.thechalklabs.com | Person node "Shilika Jain", jobTitle "Co-founder · PR & Narrative", sameAs LinkedIn only | Yes ("Site" link and a Before/After case study) | No, and shilikajain.com never mentions Chalk Labs |
| Instagram, Facebook (personal) | Appear on Google page 1 | e.g. Instagram handle web3withsass | Personal accounts; belonging to her is unverified (bio mentions Bangalore and Jain University, consistent with LinkedIn education) | No | No |
| Cointelegraph author page | Not found | cointelegraph.com/authors/shilika-jain returns 404; Cointelegraph search found nothing | n/a | n/a | n/a |
| CoinDesk, Decrypt, The Block, Forbes author pages | Not found | coindesk.com/author/shilika-jain 404, decrypt.co/author/shilika-jain 404; theblock.co and forbes.com guesses returned 403 to scripted fetch (cannot rule out); web searches found none | n/a | n/a | n/a |
| Crunchbase | Not found | https://www.crunchbase.com/person/shilika-jain shows "Page not found" in Chrome | n/a | n/a | n/a |
| Clutch | Not found | https://clutch.co/profile/shilika-jain 404 in Chrome | n/a | n/a | n/a |
| GoodFirms, Sortlist | Not found | goodfirms.co/company/shilika-jain 403 to curl (unverified); WebSearch found nothing | n/a | n/a | n/a |
| Wikipedia / Wikidata | None | `en.wikipedia.org/wiki/Shilika_Jain` 404; Wikipedia search API 0 hits; Wikidata `wbsearchentities` for "Shilika Jain" and "Shilika" 0 hits | n/a | n/a | n/a |
| Google Knowledge Panel | None | Screenshots of `"Shilika Jain"` and `shilika jain` SERPs show only organic results, no right-hand panel | n/a | n/a | n/a |
| GitHub | None for her | github.com/shilika exists but has 0 repos, no name, no bio (not evidenced as hers); github.com/shilikajain 404. The site source is a public repo under thunderbolt06 (see risks) | n/a | n/a | n/a |
| Medium, Substack | Not found | medium.com/@shilika and /@shilikajain 403 to curl (unverified); shilika.substack.com and shilikajain.substack.com 404 | n/a | n/a | n/a |
| Podcasts, speaker listings | Partial | Digital Duniya "WEB3 Leaders" interview (see section 4); no Sessionize, Luma or conference speaker pages found | n/a | n/a | n/a |

Google page-1 composition for `"Shilika Jain"` (2026-10-15): shilikajain.com (with About and Speaker sitelinks), X, Instagram (personal), CryptoDaily, HackerNoon, Facebook (personal), YouTube videos (own channel and Digital Duniya), a LinkedIn post. For unquoted `shilika jain`: shilikajain.com, LinkedIn (13.5K+ followers), About page, X (11.1K+ followers), CryptoDaily. Pages 2-5 add Chalk Labs, DePIN Hub, Fluence blog, Yahoo Finance MANTRA release, GlobeNewswire Gaia release, Binance Square, Telegram, Threads/Facebook posts, many student-club Instagram posts and ContactOut. The Muck Rack profile exists but did not appear on Google pages 1-5 for this query.

## 3. sameAs in the site's JSON-LD vs reality

Live JSON-LD (read from the DOM on /, /about, /authors/shilika-jain) matches the repo (app/_partials/homepage-jsonld.json lines 44-50 and 80-83; supabase/migrations/0003_seed_author.sql):

| Node | sameAs on the live site | Reality |
|---|---|---|
| Person (`#person`) | LinkedIn, X, CryptoDaily author, Calendly /30min/, Telegram t.me/shilika3 (the /about copy also adds `https://www.shilikajain.com/` itself) | All five resolve. Calendly and Telegram are a booking link and a chat handle, not identity profiles. LinkedIn shows "Shilika ." so name matching is weak. |
| Organization (`#organization`) | LinkedIn personal URL, X personal URL | These are the person's profiles, not an organisation's. No LinkedIn company page found. |
| Author page (`/authors/shilika-jain`) | Same five as Person | Same. |

Missing real profiles that exist and index in Google: HackerNoon (hackernoon.com/u/shill), Muck Rack (muckrack.com/shilika-jain), YouTube (@shilikajain), dev.to/shilika. Do not add the personal Instagram or Facebook accounts.

Other structured-data problems seen on the live site:
- The same `@id` (`https://www.shilikajain.com/#person`) carries different `worksFor` and `jobTitle` on different pages. Homepage: worksFor = the "Shilika Jain - Fractional PR" Organization, jobTitle "Fractional PR Manager for Web3 & AI Founders". /about: worksFor = Myosin ("Growth-marketing DAO"), jobTitle "Fractional PR Manager for Web3, AI & Cybersecurity Founders", alumniOf CoinMarketCap and Momentum6. Homepage alumniOf lists CoinMarketCap only.
- Organization `foundingDate` is "2019" and the About page says "Years 6, since 2019". 2019 to 2026 is seven years. The same About page's own career arc starts in 2020 (Momentum6/Bloom360), and LinkedIn education ends in 2019.
- JSON-LD is JavaScript-injected. A browser `fetch()` of the raw HTML (no JS) for /, /about, /authors/shilika-jain, /services/web3-pr-campaigns and a playbook page returned 0 static `<script type="application/ld+json">` tags. The JSON appears only inside Next.js flight data (`self.__next_s.push(...)` or `self.__next_f`), and the `<script>` element appears in the DOM only after hydration (author page: absent at load, present after a 2.5 s wait with id `author-jsonld-shilika-jain`). Googlebot renders JS; crawlers that do not execute JS will not see the Person/sameAs graph as structured data.

## 4. Credential corroboration

Legend: INDEPENDENT = a source not controlled by her or her affiliated companies names her in that role. SELF = only her own surfaces (site, LinkedIn, X, dev.to, HackerNoon, her own bylines, Chalk Labs). PARTIAL = something real but weaker than the claim.

| Claim (where) | Status | Evidence |
|---|---|---|
| Currently leads PR at Myosin (About, Speaker, JSON-LD) | INDEPENDENT (as a press contact and speaker bio), but myosin.xyz itself names no one | Yahoo/Newsfile and other releases: PR Newswire RARI release contact "Head of PR at Myosin.xyz (on behalf of Rari Foundation)" (Google snippet only); Decrypt-hosted Reboot World seed-round release lists "Head of PR, Shilika Jain, Myosin" (WebSearch result, about 987 days old); ACCESS Newswire/FinancialContent Ostium release 2026-06-01 lists her with a myosin.xyz address (Google snippet only); IBW2024 organiser text "Shilika Jain, Head of PR at Myosin.xyz" (Google snippet of her LinkedIn reshare); Myosin's LinkedIn post "Founders: Narrative Over PR" names her (Google snippet). WebFetch of https://myosin.xyz: no team members named, "Shilika" absent; Myosin now describes itself as a contributor-owned global marketing network run "as a DAO", not literally "growth-marketing DAO" (job boards do use that phrase). |
| Title consistency | INCONSISTENT | Head of PR (About, Speaker header, Google snippet of a release); APAC PR & Partnerships (author page, About footer, JSON-LD); Head of PR & Partnerships (LinkedIn, Icebreaker); Head of APAC (CryptoDaily bio); Global PR & Comms (HackerNoon, 2022); Head of PR (MANTRA release 2024). |
| Previously CoinMarketCap, "built CMC's APAC PR function from scratch, 100+ journalists, 150+ KOL relationships" (About, homepage meta) | PARTIAL for employment, SELF for the scope | Employment hints all trace back to her own profiles: X bio "prev @coinmarketcap", CryptoDaily bio "led marketing initiatives at CoinMarketCap", Icebreaker/LinkedIn "former APAC Lead", Wiza "Growth & Partnerships", Binance Square 2023-01 byline "Business Development at CoinMarketCap and Binance" (Google snippet only), Chalk Labs "Partnerships & PR lead". The Digital Duniya podcast (third-party channel) has a chapter titled "CoinMarketCap" in a 49-minute interview. No CoinMarketCap-owned page naming her was found. Dates: About says 2021-2023, but HackerNoon Feb 2022 byline already says "Global PR & Comms at Myosin DAO", LinkedIn shows Myosin from Jan 2023. A role overlap is possible, not proven. |
| Binance | Not claimed on the site, claimed on X bio and Binance Square | Missing from About and JSON-LD. |
| "Six years", "since 2019" | INCONSISTENT | LinkedIn education ends 2019; About career arc starts 2020; X account created Oct 2019. |
| 50+ protocols shaped | SELF | dev.to, About, JSON-LD, llms.txt. A Jan 2023 Binance Square bio already says "over 50+", so the number has not moved in almost four years (Google snippet only). |
| 100K+ mentions/quarter, 200+ vetted KOLs (About) vs 150+ influencers (Icebreaker, CMC) vs "500+ placements, 5B+ impressions, 50+ launches" (Chalk Labs) | SELF, three different metric sets | No methodology or third-party source. |
| Placed founders in Forbes, CoinDesk, Cointelegraph, Decrypt, The Block, Blockworks, AI Magazine | PARTIAL: the articles exist, none names her | Fetched with curl (HTTP 200) and the client name present: CoinDesk MANTRA raise (2024-03-19), Cointelegraph MANTRA CEO profile, Decrypt Gaia, CoinDesk Opinion (2025-04-03), Cointelegraph "Hashing It Out" and Decrypt DePIN pieces mentioning Fluence, Cointelegraph NFT royalties (RARI), Yahoo Finance Trust Wallet x Web3Auth, Inc42 Bullieverse. 0 mentions of "Shilika" in any of these pages. Forbes, The Block, Blockworks, Benzinga, e27, CryptoNews, The Defiant returned 403 to curl, so I did not verify them. No byline, quote or mention of Shilika herself in Forbes, CoinDesk, Cointelegraph, Decrypt or The Block turned up in web or Google searches. "AI Magazine": no evidence found anywhere off-site. |
| Named campaign involvement | PARTIAL, via press-release contact blocks | MANTRA: Yahoo Finance / Newsfile 2024-06-20, "Contact Person: Shilika Jain, Head of PR" (fetched). Fluence: fluence.ai blog 2024-12-19 "Media Contact. Shilika Jain, PR Lead" (Google snippet) and DePIN Hub 2025-02-13 "PR Lead, Cloudless Labs (Fluence)" (fetched). Gaia: GlobeNewswire 2025-09-02 contact "Shilika Jain" with a gaianet address (Google snippet). RARI: PR Newswire contact as above. Bullieverse: her own HackerNoon founder interview 2022-02-01 (fetched). |
| Case studies framed as fractional client campaigns with prices (Fluence $8K-$15K/mo, 12-month minimum; Web3Auth $6K-$12K/mo; MANTRA $15K-$30K window) | FRAMING RISK | LinkedIn (via Icebreaker) shows she was in-house at Cloudless Labs (Fluence) Jul 2024-Mar 2025 and Web3Auth Apr 2023-Jun 2024; MANTRA release lists her as "Head of PR". The About career arc omits Cloudless Labs and Web3Auth entirely, and the case studies do not say the work was done as an employee. |
| CryptoDaily "freelance contributor 2020-now" | PARTIAL | Author archive page 1 lists 10 of her pieces from 2024-08 to 2026-07 (page 2 is 404); nothing visible from 2020-2023 on that page. Most pieces are interviews with companies she also works with (Gaia, Fluence, Reown, zkPass, NodeOps, The Binary Holdings, RabbitX, Tangem, Aragon/Interfold), so "CryptoDaily UK placements" for clients are self-authored. |
| Speaker history (Speaker page) | MIXED | IBW 2023: her own X post 2023-12-05 (fetched via API). IBW 2024: organiser text in her LinkedIn reshare (Google snippet). XRPL Labs/Tenity workshop 2025-07: her own X post 2025-07-10 only; Tenity pages found do not mention it. SJCC Bengaluru / "Web3 Decoded" (InvestED 3): many third-party student-club Instagram posts (SJCC Finance Club, BITS Goa Wall Street Club, IISc lab and others) via Google. NEAR workshop 2024-03: her X post is ambiguous. Poloniex India 2022, Korea Blockchain Week 2025 panel, ETHIndia 2025 speaker, Stellar cohort judge: no independent evidence found. The Digital Duniya interview (2024-09, 1.4K views) is independent and not listed on the Speaker page. |
| 19 testimonials | SELF-HOSTED MIRROR | LinkedIn public page says "19 people have recommended Shilika"; WebFetch of /testimonials lists 19 named people (several are Myosin colleagues, e.g. a Myosin co-founder; many "same team"; no per-person verification links). |

## 5. Disambiguation

- Exact-match and exclusion queries (`"Shilika Jain" -crypto -web3 -PR -myosin`, and with doctor/professor/CEO terms) returned only the same professional plus personal social accounts (Facebook, Instagram, Threads) and a Facebook reaction list. No second professional "Shilika Jain" found on Google pages 1-5, in Wikidata, Wikipedia, Muck Rack, or WebSearch.
- Near-name entities that engines could blur: Shilpi Jain (independent director on MarketScreener), Shilki Jain and Silky Jain (Indian company directors on Tofler/Qorpiq), Shilpa Jain (Wikidata Q102318433, physicist), Archana Jain (Havas Red PR, India, a plausible "Jain PR" confusion), Rahil Jain (Chalk Labs co-founder).
- The larger confusion risk is internal: shilikajain.com and Chalk Labs describe her differently (Fractional PR Manager vs Co-founder PR & Narrative), quote different numbers (50+ protocols vs 500+ placements and 5B+ impressions) and different prices (see below), and do not reference each other in structured data.
- LinkedIn's "Shilika ." display name is the single biggest name-match weakness: a crawler comparing the page name to "Shilika Jain" will not get an exact match.

## 6. Consistency of name, bio, URL, pricing

- Name: "Shilika Jain" on site, X, CryptoDaily, HackerNoon, Muck Rack, Telegram, YouTube. "Shilika ." on LinkedIn (and Icebreaker). "Shilika" on dev.to and Calendly.
- Location: LinkedIn Dubai; About "India, APAC, Global"; Muck Rack "England"; X emoji globe.
- Contact: site uses a personal Gmail address in about 15 places, shilika@shilikajain.com on the Speaker page, and the YouTube description uses the Gmail address plus calendly.com/shilikajain.
- Web3 retainer prices on the same domain: meta description "$5k-10k/month"; homepage and FAQ body "$5K to $14K"; most service and landing pages "$3K-$7K/mo" (624 occurrences in app/_partials); author page summary "$5K to $12K"; Chalk Labs "from around $3,000/mo". AI startup retainer "$6K to $14K" (homepage) vs "$20K-$50K" (service JSON-LD). Cybersecurity "$7.5K-$15K" (homepage/FAQ) vs "$3K-$7K" (llms.txt). Command used: a regex survey of `app/_partials/*.html|*.json` for `$X-$Y/mo` patterns.
- Social proof counts: LinkedIn about 14K followers (Google snippet 13.5K+); X 9,204 followers (fxtwitter, 2026-10-15) vs "11.1K+" in the Google snippet (not reconciled). LinkedIn posts in 2026 get 2-10 reactions; X posts in the last month got 3-25 likes and about 280-1,000 views. YouTube has 3 subscribers.

## 7. Risks

1. Un-corroborated numbers and the in-house/fractional framing are exactly what AI engines will repeat as "her own published figures".
2. Chalk Labs publishes "Best Crypto PR Firms in 2026 (Honest Rankings)" that ranks Chalk Labs first, citing Shilika's 500+/5B+/50+ figures. An engine or journalist may read this as a disguised self-ranking.
3. LinkedIn identity weakness ("Shilika ."), no entity record anywhere (Wikidata, Crunchbase), and an unclaimed Muck Rack profile saying England.
4. Public source repo: https://github.com/thunderbolt06/Shilika is public (created 2026-05-04, pushed 2026-10-15) and includes `data/`, `agents/`, `skills/`, `.claude/` and the client-brief and pitch-deck PDFs. A regex scan of tracked files for common key patterns found nothing, but the whole content system and prompts are exposed to competitors.
5. Third-party press-release contact blocks list personal and project email addresses that are indexed by Google.

## 8. Commands run (evidence trail)

```
# sameAs source and live check
grep -rn "sameAs" app/_partials/homepage-jsonld.json                # lines 44 and 80
python3 (walk @graph) on homepage-jsonld.json                       # Person 5 URLs, Org 2 URLs
# live DOM via Chrome tab: document.querySelectorAll('script[type="application/ld+json"]')
# raw HTML via Chrome tab fetch(): 0 static ld+json tags on /, /about, /authors/shilika-jain, /services/web3-pr-campaigns, /playbook/how-to-pitch-cointelegraph-2026

# Wikipedia / Wikidata
curl "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=%22Shilika+Jain%22&format=json"   # totalhits 0
curl "https://www.wikidata.org/w/api.php?action=wbsearchentities&search=Shilika%20Jain&language=en&format=json"  # []
curl -o /dev/null -w "%{http_code}" https://en.wikipedia.org/wiki/Shilika_Jain                              # 404

# X profile and cited posts
curl https://api.fxtwitter.com/Shilika_jain    # followers 9204, bio, website shilikajain.com, joined 2019-10-20
curl https://api.fxtwitter.com/Shilika_jain/status/<id> for the 7 status IDs on /about   # all 7 exist, author Shilika_jain

# LinkedIn public page
curl -L https://www.linkedin.com/in/shilika/   # <title> "Shilika . - Myosin.xyz | LinkedIn", Dubai, 14K followers, 19 recommendations, posts 2026-09-30 back to 2026-05

# Placements
curl each of 19 claimed article URLs; grep -ci shilika    # 0 mentions except HackerNoon Bullieverse (her own byline, 2022-02-01)

# Muck Rack, Crunchbase, Clutch via Chrome tab
muckrack.com/shilika-jain -> profile exists, unclaimed, "England"; crunchbase.com/person/shilika-jain -> "Page not found"; clutch.co/profile/shilika-jain -> 404

# Google (Chrome tab, gl=us, hl=en): "Shilika Jain" pages 1-5, tbm=nws, exclusion queries, "media contact" query, unquoted "shilika jain"
# YouTube results page for "Shilika Jain" Myosin Digital Duniya: 3 videos, chapters include CoinMarketCap and Myosin

# GitHub
curl https://api.github.com/users/shilika       # 0 repos, no profile
curl https://api.github.com/repos/thunderbolt06/Shilika   # private false, pushed 2026-10-15
```

## 8b. Re-verification pass (2026-10-16, after the session resumed)

- Report checked for em and en dashes: 0 of each.
- Working-tree `app/_partials/homepage-jsonld.json` still has the same sameAs lists (Person: LinkedIn, X, CryptoDaily, Calendly /30min/, Telegram; Organization: LinkedIn personal URL and X). The uncommitted diff on that file only edits the APAC service description text, not identity fields.
- `curl -L -A Mozilla/5.0` status codes: x.com/Shilika_jain 200, cryptodaily.co.uk/author/ShilikaJain 200, calendly.com/shilikajain/30min/ 200, t.me/shilika3 200, hackernoon.com/u/shill 200, dev.to/shilika 200. (200 on x.com and t.me is a shell page, so it proves the URL resolves, not that the profile content is hers; content was verified earlier through fxtwitter and Chrome.)
- WebFetch of https://muckrack.com/shilika-jain: profile exists, name "Shilika Jain", location "England", unclaimed ("Claim your profile"), "As seen in" HackerNoon, EIN News, Crypto Daily, The Chainsaw, 19 articles. Matches section 2.
- WebSearch for `"Shilika Jain"` restricted to theblock.co, forbes.com, coindesk.com, cointelegraph.com: no relevant result (results were other people: Laura Shin, Sowmay Jain). The search engine ignored the domain restriction, so this is weak negative evidence, consistent with the earlier author-page 404s. Forbes and The Block author pages remain "not found, cannot fully rule out" because scripted fetches got 403.
- WebSearch for Wikipedia, Knowledge Panel, Crunchbase, Muck Rack: only self-published profiles (Icebreaker, dev.to) and Muck Rack pages for other people (Vipul Jain, Saurabh Singla). No Wikipedia, Knowledge Panel or Crunchbase hit.

## 9. Prioritised actions

1. (SJ, small, high) Fix the LinkedIn public name so it reads "Shilika Jain" and set the headline to match the site ("Fractional PR Manager for Web3 & AI Founders | Myosin"), keep the shilikajain.com link, and align the location with the site.
2. (SJ plus code, medium, high) Write one canonical bio sheet (current title, exact dates, every employer including Cloudless Labs, Web3Auth, Binance if true, Myosin, Chalk Labs) and apply it to LinkedIn, X, CryptoDaily, HackerNoon, Muck Rack, dev.to, YouTube, the About page and JSON-LD. Add a line to each case study stating whether it was in-house or fractional.
3. (code, small, high) Server-render JSON-LD as plain `<script type="application/ld+json">` tags so non-JS crawlers see it; unify `jobTitle` and `worksFor` for `#person` across pages; fix `foundingDate` and the "six years since 2019" arithmetic; give the Organization its own profile set or remove its sameAs.
4. (code, small, medium) Replace Calendly and Telegram in sameAs with HackerNoon, Muck Rack, YouTube and dev.to; keep LinkedIn, X and CryptoDaily.
5. (SJ, small, medium) Claim the Muck Rack profile and correct "England"; add shilikajain.com to HackerNoon, CryptoDaily and Muck Rack bios; update the stale HackerNoon title.
6. (code plus SJ, medium, high) Pick one set of numbers and one price table (Web3 retainer currently $3K-$7K, $5K-$10K, $5K-$12K and $5K-$14K) and label the metrics as self-reported with a short methodology note.
7. (SJ, medium, high) Earn independent attribution: a named expert quote or contributed byline in a Tier-1 outlet, listing on the speaker pages of events she attends (KBW, ETHIndia, SJCC), and list the Digital Duniya interview on the Speaker page.
8. (measurement, small, medium) Decide how shilikajain.com and Chalk Labs relate (declare it on both sites, align titles and prices, disclose authorship of the "Honest Rankings" page), and re-run this name SERP and the AI-answer panel monthly to watch for a Knowledge Panel and for engines repeating the "Shilika ." and pricing inconsistencies.
