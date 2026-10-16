# Google guidance and 2026 update history: what applies to shilikajain.com

Audit date: 2026-10-15. Area: Google Search guidance, spam policy, 2026 update history, Search Console AI reporting, and how they map to the site. Ahrefs and Google Search Console were not available, so nothing here measures the site's actual rankings or traffic.

Health score for this area: **6 / 10** (guidance alignment, not performance). Reasoning in section 8.

## 1. Bottom line

1. Google's own position (AI optimization guide, last updated 2026-07-10) is that optimizing for AI Overviews and AI Mode is ordinary SEO. llms.txt, special markup, Markdown copies, "AI versions" of pages and content chunking are not used and not needed. The site has invested in exactly those things. They are harmless but earn nothing in Google.
2. The real exposure is not the AI/GEO plumbing. It is the 106 programmatic landing pages that target query variations (for example three or four near-identical-intent pages each for Japan, Korea and India) and the unreviewed machine translation. Google's guide names "many pages targeting query variations" as a scaled content abuse pattern.
3. The 2026 update calendar has been spam-heavy (four spam updates, the last one 24 Sep to 8 Oct 2026, the longest of the year). No Google-confirmed update has started in October 2026 as of the fetches below.
4. The Search Console Generative AI performance report is live for all sites worldwide since 2026-08-31. There is nothing to "enable". It is impressions-only and only appears if the site has enough AI impressions and has not been excluded.
5. Site freshness practice is clean: sitemap `lastModified` is only set where a real edit date is tracked, and 104 JSON-LD files carry a fixed `dateModified` of 2026-06-23 rather than a bumped date. No evidence of manipulated freshness. Keep it that way.

## 2. Method and evidence log

Tool budget: 33 calls in the first run, plus a 12-call re-verification pass after the usage-limit reset (section 10). Primary Google pages were fetched with WebFetch (a small model summarises the page, so wording below is paraphrase, not verbatim). Press claims come from WebSearch and are labelled as secondary. Repo checks were read-only (grep, sed, git log, one Python script).

| # | Source | What it gave |
|---|---|---|
| 1 | https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | Page title "Google's Guide to Optimizing for Generative AI Features on Google Search", last updated 2026-07-10 UTC |
| 2 | https://developers.google.com/search/docs/essentials/spam-policies | Last updated 2026-08-28 UTC. Headings listed in section 3.3 |
| 3 | https://developers.google.com/search/docs/fundamentals/using-gen-ai-content | Last updated 2026-10-01 UTC |
| 4 | https://developers.google.com/search/docs/fundamentals/creating-helpful-content | Last updated 2026-10-05 UTC |
| 5 | https://developers.google.com/search/docs/appearance/ai-features | Last updated 2025-12-10 UTC |
| 6 | https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites | Last updated 2025-12-10 UTC |
| 7 | https://developers.google.com/search/docs/specialty/international/localized-versions | Last updated 2026-09-21 UTC |
| 8 | https://developers.google.com/search/docs/crawling-indexing/links-crawlable | Last updated 2025-12-10 UTC |
| 9 | https://developers.google.com/search/updates (documentation changelog, first 100,000 of 178,743 characters read; covers Jan to Oct 2026) | Dated doc changes in section 4.2 |
| 10 | https://status.search.google.com/summary | Ranking incident table in section 4.1 |
| 11 | https://support.google.com/webmasters/answer/16984139 and https://support.google.com/webmasters/answer/16908024 | Generative AI performance report and Search generative AI control |
| 12 | https://www.seroundtable.com/tag/google-update | Latest post is 2026-10-09; nothing about a new update after the spam update ended |
| 13 | https://www.gsqi.com/marketing-blog/auto-translating-content-google-scaled-content-abuse/ (published 2025-05-05, updated 2025-06-11) | Evidence and Google statement on AI translation |
| 14 | WebSearch: SE Ranking llms.txt study (about 300,000 domains) as reported by Search Engine Journal | Independent llms.txt evidence |

Fetch that failed to give a body: https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports returned only an archive stub. The Search Console help pages (#11) were used instead.

## 3. What Google currently says

### 3.1 AI optimization guide (updated 2026-07-10)

- Announced 2026-05-15 (changelog). A 2026-06-15 changelog entry clarified that Google Search does not use llms.txt and that it neither helps nor hurts rankings.
- You do not need llms.txt, other AI text files, special markup or Markdown to appear in Google Search or its generative AI features. Keep them for other services if you want; they will not help or hurt Search.
- No structured data is required for generative AI search and there is no special schema. Keep structured data for rich-result eligibility.
- You do not need to chunk content, rewrite content for AI, chase long-tail variations, or hit a page length.
- Most influential long-term factor: unique, non-commodity content with a distinct point of view and first-hand experience. Avoid commodity content built on common knowledge.
- Explicit warning: do not create many pages targeting query variations mainly to manipulate rankings or AI responses. This can violate the scaled content abuse policy. If generative AI helps create content it must still meet Search Essentials and spam policies.
- Do not chase inauthentic mentions across the web. Google says core ranking and spam systems weigh quality and block spam, and the AI features depend on both. Real mentions in blogs, videos and forums can still surface normally.
- Use the Generative AI performance report in Search Console. The site must be included in Search generative AI features to be eligible for display there. Be skeptical of third-party tools claiming ranking success or access to Google's internal metrics.
- The guide does not address freshness advice, translated content, or internal linking directly (it points to separate docs).

### 3.2 AI features doc (updated 2025-12-10) and generative AI content guide (updated 2026-10-01)

- AI Overviews and AI Mode have no extra requirements beyond normal Search eligibility (indexed, snippet-eligible). Both use "query fan-out": several related searches across subtopics, so a wider set of links can appear than in classic search.
- Google-Extended governs AI training and grounding in other Google systems; Googlebot rules control Search crawling. Preview controls (nosnippet, data-nosnippet, max-snippet, noindex) limit what is shown.
- Generative AI is acceptable for research and structuring original content. Using it to produce many pages with little user value can violate the scaled content abuse policy. The 2026-10-01 change added pointers to Search Quality Rater Guidelines sections 4.6.5 and 4.6.6 (raters do not directly affect rankings).
- Review AI-generated titles, meta descriptions, structured data and alt text before publishing. Fact-check output. Tell readers how content was created when automation is involved.
- The page says nothing about translated content.

### 3.3 Spam policies (updated 2026-08-28)

Headings present: Cloaking, Doorway abuse, Expired domain abuse, Hacked content, Hidden text and link abuse, Keyword stuffing, Link spam, Machine-generated traffic, Malicious practices, Misleading functionality, Scaled content abuse, Scraping, Site reputation policy, Sneaky redirects, Thin affiliation, User-generated spam, Other practices.

- Scaled content abuse: many pages created mainly to manipulate rankings with unoriginal, low-value content. Examples include generative AI used to mass-produce pages without added value, and scraping feeds or search results then generating pages through translation, synonyms or similar transformations. Sites hosting such content should exclude it from Search.
- Site reputation policy updated 2026-08-28 with adjusted EEA enforcement. It concerns third-party content hosted to borrow the host's ranking strength. Not applicable to a solo first-party site unless it hosts sponsored or guest content.
- "Manipulated freshness" and "inauthentic mentions" are NOT headings on the spam policies page as fetched. Primary-source locations instead: inauthentic mentions in the AI optimization guide (3.1); date-changing in the helpful content guide (3.4). Changelog 2026-05-15: "Clarified that spam policies apply to generative AI responses in Search." Vendor blogs that call "deceptive freshness" an August 2026 enforcement target are unverified.

### 3.4 Helpful content guide (updated 2026-10-05)

- Changing a page's date to look fresh without substantial content change is listed as a warning sign. Adding or removing content mainly to look fresh will not help rankings.
- Who/How/Why: clear authorship (fabricated creators are deception), explain how content was made and disclose automation or AI where readers would reasonably wonder, write primarily for people.
- Warning signs include lots of content across many topics hoping something ranks, extensive automation across topics, summarising others without added value. Trust is the most important element of E-E-A-T, which is not itself a ranking factor. Nothing on translation.

### 3.5 International and links docs

- Separate URL per language is recommended. Hreflang needs self-reference and reciprocal links, an `x-default` fallback is recommended, codes are ISO 639-1 plus optional ISO 3166-1 region, URLs fully qualified. Using HTML, HTTP header and sitemap together gives no benefit. Hreflang is described as one of several locale signals.
- Language is detected from visible content, not `lang` or URL. Translating only boilerplate while main content stays in another language creates a poor experience. Localized versions count as duplicates only if the main content remains untranslated.
- The multi-regional doc (2025-12-10) contains no statement on machine translation. Per Glenn Gabe (secondary), earlier guidance about blocking auto-translated content was removed from this doc; he believes it was an oversight, not a policy change.
- Links doc: Google follows `<a href>`; every page you want indexed needs at least one internal link; use descriptive anchors; no ideal link count.

## 4. 2026 update history

### 4.1 Search Status Dashboard (fetched 2026-10-15)

| Start (US/Pacific) | Name | Duration on dashboard | Approx end |
|---|---|---|---|
| 11 Dec 2025 | December 2025 core update | 18 d 2 h | about 29 Dec 2025 |
| 5 Feb 2026 | February 2026 Discover update | 21 d 17 h | about 26 Feb |
| 24 Mar 2026 | March 2026 spam update | 19 h 30 m | 24 Mar |
| 27 Mar 2026 | March 2026 core update | 12 d 4 h | about 8 Apr |
| 21 May 2026 | May 2026 core update | 11 d 21 h | about 1 Jun |
| 24 Jun 2026 | June 2026 spam update | 2 d 1 h | about 26 Jun |
| 18 Aug 2026 | August 2026 spam update | 2 d 16 h | about 21 Aug |
| 24 Sep 2026 | September 2026 spam update | 13 d 16 h | 8 Oct 2026 (press cites 01:00 PDT) |

End dates are calculated by the fetch tool from start plus duration. The dashboard lists no October 2026 incident and marks nothing as ongoing. Secondary sources disagree on March core dates (some say 3 or 6 March); the dashboard start of 27 Mar is authoritative.

### 4.2 October 2026 status

- Sep 2026 spam update: global, all languages, "up to two weeks", finished 2026-10-08 (Search Engine Roundtable, 2026-10-08 post). Roundtable tracked volatility on Sep 25-27, Sep 30 and Oct 4-6, caveating that it cannot rule out unrelated changes. Google did not name a target. Commentary linking it to scaled content abuse or image/video is inference, not Google statement.
- No confirmed October 2026 update. Roundtable's latest ranking post is dated 2026-10-09 (a recap). Speculation that a core update is due is unverified. A search hit titled "Google Search Ranking Volatility Again Heats Up (October 15th)" carries a low post ID (38256 vs 41830 to 42239 for 2026 posts) and is probably from an earlier year; I did not open it, treat as unverified.
- Practical read: a site that dropped after 24 Sep should compare pre/post in Search Console by page template before concluding anything. Google has said recovery from spam demotions can take many months (secondary).

### 4.3 Documentation changes that matter here (changelog, 2026)

| Date | Change |
|---|---|
| Jan 6 | Removed practice problem structured data docs |
| Feb 5 | Added Discover guidance tied to the Feb Discover update |
| Mar 24 | Added Discussion Forum and QA Page properties |
| Apr 13 | Added "back button hijacking" to the malicious practices spam policy |
| Apr 14 | Spam report submissions may be used for manual action |
| May 8 | Announced FAQ rich result deprecation, effective 2026-05-07 |
| May 15 | New generative AI optimization guide with myth-busting; spam policies clarified to apply to generative AI responses |
| Jun 5 | Guidance on evaluating third-party SEO tools, services and advice |
| Jun 15 | Google Search does not use llms.txt; FAQ rich result docs removed (feature no longer appears in Search) |
| Jul 10 | Canonicalization troubleshooting re-evaluation timing clarified |
| Jul 24 | Review snippet guideline on fake and undisclosed incentivized reviews |
| Aug 28 | Site reputation policy updated (EEA enforcement) |
| Sep 24 | VideoObject `creator` and `interactionStatistic` clarified (same day as spam update) |
| Oct 1 | Generative AI content guide updated with rater guideline references |
| Oct 8 | UGC Fresh Data Program page added |

## 5. Search Console Generative AI performance report

- Announced 2026-06-03 to a subset of sites. Help pages state: as of 2026-08-31 rolled out to all websites worldwide. A separate report exists for Discover.
- Location: Performance reports, direct path `search.google.com/search-console/performance/search-analytics/ai` (from the help page). Covers AI Overviews and AI Mode; excludes Search Labs experiments.
- Metric: impressions only (links shown to a user in a generative AI feature). The help page does not mention clicks or average position. Dimensions: Pages (canonical-assigned), Countries, Dates (Pacific Time), Devices. Filter: Web text vs Web multimodal (Lens, Circle to Search). Usual 1,000-row limit applies. "~" or "-" cells export as zero. Data retention period is not stated.
- Why it may not appear: too few generative AI impressions, or the site is excluded from Search generative AI features.
- How to "enable": nothing to switch on. The control is Settings > Search generative AI in Search Console. Default is Include (impressions and traffic allowed; content can ground AI responses). Exclude hides links and content from AI Overviews, AI Mode and Discover AI features within roughly 1 to 2 days and is not a ranking signal for other Search. Child properties default to Inherit. The page does not state property-type or permission prerequisites.
- AI Overviews and AI Mode traffic is also inside the standard Performance report under the Web search type (AI features doc, 2025-12-10), so clicks are only visible there, mixed with classic results.
- Unverified: whether shilikajain.com is a verified Search Console property (the task says GSC is not connected to this audit), and whether it currently has enough AI impressions for the report to display.

## 6. Evidence on specific tactics

| Tactic | Google primary | Independent evidence | Verdict for this site |
|---|---|---|---|
| llms.txt | Not used by Google Search; neither helps nor hurts (changelog 2026-06-15; guide 2026-07-10) | SE Ranking, about 300,000 domains: no relationship between llms.txt and AI citation frequency; removing the variable improved their model (reported by Search Engine Journal; I could not retrieve the primary study). Logs show crawlers rarely fetch it | Keep only if cheap. Zero expected Google benefit. Do not spend more effort. Note the site also serves /llms-full.txt and /api/markdown routes |
| Markdown / "AI versions" | Not needed (guide) | None found that shows a gain | The /api/markdown routes send `Link: <canonical>; rel="canonical"` (app/api/markdown/blog/[slug]/route.ts line 72), which limits duplicate-indexing risk. They carry no noindex by design for non-Google bots |
| Structured data | Not required for AI features; must match visible text; FAQ rich results gone since 2026-05-07 | n/a | 251 JSON-LD files in app/_partials contain FAQPage. It is harmless if the FAQ is visible on the page, but it no longer earns a Google rich result |
| hreflang | Valid and reciprocal required; signal not ranking boost | n/a | Implementation looks correct (section 7.3) |
| Machine translation | No explicit statement; scaled content abuse lists translation as a transformation for scraped content. Google reportedly said in June 2025 that its policies do not strictly define AI translation as spam but scaled content abuse covers translation as one form of mass low-value content | Gabe documents millions of AI-translated Reddit URLs ranking with no visible action, and past clients hit by manual actions or spam updates after machine-translating at scale. Third-party reviews say scaled low-quality AI translations lost in the May 2026 core update (weak sourcing, vendor blogs) | Risk is driven by quality and scale. 105 translated URLs of original content is modest. Unreviewed text without disclosure is the weak point |
| Internal linking | Crawlable `<a href>`, at least one link to every indexable page, descriptive anchors | n/a | Site already rewrites internal links to translated versions via localizeLinks (lib/i18n/config.ts) |
| Freshness | Do not change dates to look fresh | n/a | Site is compliant (section 7.4) |
| Core/spam update patterns | Google does not publish winner/loser data | Third-party analyses claim thin templated pages, unreviewed AI content and scaled AI translation lost, first-party expertise won. Numbers conflict (30-50% to 60-90% losses) and several lack methodology, so I treat the direction as plausible and the magnitudes as unverified | Directional support for pruning variant pages |

## 7. What the repo shows (read-only checks)

### 7.1 Scale

- 122 `article-*-body.html` playbook partials (124 entries in app/playbook). 106 landing-page directories in app/pages. 21 pages per locale (10 core pages, 8 playbooks, 3 blog posts per `I18N_PAGES` in lib/i18n/config.ts) times 5 locales (zh, ko, ja, es, ru) = 105 translated URLs. Each locale folder holds 22 JSON files (21 pages plus ui.json).

### 7.2 Template similarity, measured (script: scratchpad/audit/sim.py, 6-word shingles on tag-stripped text)

```
== landing pages: 106 files; words min/median/mean/max = 1390/1616/1612/1780
   share of each page's text that also appears on >=2 other pages: median 33%, mean 33%, p90 40%, max 66%
   most templated: web3-pr-agency 66%, depin-marketing-agency 48%, best-web3-marketing-agency 46%, fractional-pr-consultant-web3 45%, crypto-pr-agency-uk 44%
   pairwise Jaccard: median 12.6%, p99 17.6%, max 28.9%; pairs >=30%: 0
== playbooks: 122 files; words min/median/mean/max = 1329/3049/3012/4627
   share of text on >=2 other pages: median 3%, p90 4%, max 8%
   pairwise Jaccard: median 0.6%, max 5.9%
```

Reading: the landing pages are long (about 1,600 words) and not near-duplicates by text overlap (no pair at 30% or more), but about a third of each page is shared template text. Playbooks are original and about 3,000 words. This metric measures text reuse only. It says nothing about whether a landing page adds value beyond its playbook or regional desk, which is the test Google applies. Intent overlap is the bigger issue.

Near-duplicate search intent in the landing-page slugs (from `ls app/pages`):
- Japan: crypto-pr-agency-japan, japan-crypto-pr-agency, crypto-kol-agency-japan, korea-japan-crypto-pr, plus the /japan regional desk.
- Korea: crypto-pr-agency-korea, korea-crypto-pr-agency, crypto-kol-agency-korea, korea-kol-marketing-agency, plus the /korea desk.
- India: ai-pr-agency-india, india-crypto-pr-agency, crypto-marketing-agency-india, token-launch-pr-agency-india, web3-pr-agency-india, plus the /india desk.
That is the "query variations" pattern the AI optimization guide singles out, and it overlaps the doorway abuse policy. Whether any of these pages rank, or whether they cannibalise each other, is unverified without Search Console.

### 7.3 hreflang and locale implementation

- `languageAlternates()` in lib/i18n/config.ts returns en, zh-Hans, ko, ja, es, ru and `x-default` (pointing to the English URL) for every translated page. Each locale page sets `canonical` to its own URL and the same alternates map (app/[locale]/[[...path]]/page.tsx lines about 54 to 71), so annotations are self-referencing and reciprocal. English keeps bare paths; only the 21 registered pages exist under locale prefixes. No robots or noindex on the locale layout. Sitemap adds localized entries (app/sitemap.ts, `localizedEntries`).
- `zh-Hans` is fine. Re-fetched 2026-10-15 (section 10): the localized-versions doc (updated 2026-09-21) explicitly documents script subtags, `zh-Hans` for Simplified and `zh-Hant` for Traditional Chinese. An earlier draft of this report flagged it as a possible issue; that was wrong and is withdrawn. Note the doc also says codes outside ISO 639-1 plus ISO 3166-1 Alpha 2 (for example `es-419`) are not supported, so keep `es` bare.
- Mixed-language risk: `pageMeta()` falls back to the English source title and description when a translated one is missing (comment at line 58). Any such page would show English meta over translated body.
- No disclosure of machine translation was found in app/[locale] (grep for machine, translat, disclos only hit code comments and the `translationOfWork` schema property). Whether a human reviewed the translations is unverified.

### 7.4 Freshness practice

- app/sitemap.ts omits `lastModified` for pages without a tracked edit, with an explicit comment that stamping `new Date()` on every page is useless. Real dates are set on edited pages (for example /singapore 2026-10-15, /apac 2026-10-12, /services/apac-pr 2026-10-14), which match the uncommitted edits in git status.
- 104 JSON-LD files carry `dateModified: 2026-06-23`. `git log` shows article-4-body.html was last edited 2026-10-13 and 2026-10-01, and commit e52310a (2026-06-23, "new blogs and landing pages") is where the 06-23 stamp originates. So `dateModified` is stale rather than inflated. That is the safe direction, but it understates real edits.
- Watch item: the `data/ai-citation-panel/summary` runs (run 87 "regulatory refresh", run 88 "post-token2049 refresh") and matching same-day page edits are fine if each carries substantive new content. Google's guidance treats date bumps without substantial change as a warning sign. I did not read those files, so I cannot say whether the edits were substantive.

### 7.5 robots.ts

- Allows `*` and lists OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, GPTBot, ClaudeBot, Google-Extended, CCBot. Consistent with Google's docs: Google-Extended does not control AI Overviews or AI Mode; the Search Console generative AI control does.

### 7.6 Other check item

- app/_partials/testimonials-jsonld.json contains Review or AggregateRating markup. Given the 2026-07-24 review snippet guideline update on fake and undisclosed incentivized reviews, confirm these are real, attributable testimonials and not self-serving ratings of the site's own organization. Not inspected in detail; unverified.

## 8. Score reasoning (6 / 10)

Plus: honest freshness and lastmod practice, correct hreflang, original long-form playbooks (3% shared text), clean robots, real author entity, no sign of cloaking or hidden text.
Minus: heavy template/intent overlap across 106 query-variant landing pages directly in the line of Google's stated scaled-content example; unreviewed, undisclosed machine translation across 105 URLs; effort sunk into llms.txt, Markdown routes and FAQ schema that Google says do nothing (FAQ rich results are gone); no Search Console baseline, so none of the above can be tied to outcomes; the September spam update (13 days, the longest of 2026) is unassessed for this site.

## 9. Do and don't for a solo consultant with about 120 playbooks, 106 landing pages and 5 new locales

Do
1. Connect and verify Search Console now, confirm Settings > Search generative AI is set to Include, and baseline the Generative AI report (impressions by page and country) and the standard Performance report by page template. Annotate 2026-05-21 (core), 2026-06-24, 2026-08-18 and 2026-09-24 to 2026-10-08 (spam) before reading any trend.
2. Audit the 106 landing pages by intent. Merge or 301 clusters that answer the same query (the Japan, Korea and India groups above). Keep a page only if it holds something the playbook or regional desk does not: a named case, real pricing, outlet-level detail, local data. Use 90-day Search Console impressions to decide; noindex or remove pages with none.
3. Put first-hand material in front: client outcomes with named outlets, original data (the AI citation panel is a legitimate original-data asset if described honestly as a sample), and the founder's point of view. Google calls this the most influential long-term factor.
4. Keep the translated set small and reviewed. Have native reviewers check ja, ko and zh (the APAC target markets) first; decide whether es and ru earn their place after seeing impressions by country. Add a visible note on each locale page that it is translated from the English original, with a link to it and the reviewer's name once reviewed. Fix the English meta fallback so a locale page never ships English title and description over a translated body.
5. Update dates only on substantive change, and keep JSON-LD `dateModified`, the visible "UPDATED" stamp and sitemap `lastModified` aligned. Add a one-line change note on updated playbooks.
6. Keep internal links as crawlable `<a href>` with descriptive anchors, make sure every indexable page has a contextual in-body link from a relevant hub (playbook index, regional desk, services), and keep localizeLinks pointing at translated targets.
7. Validate structured data against visible content. Keep Article, Person, Organization, BreadcrumbList and VideoObject accurate. Keep FAQPage only where the FAQ is visible on the page and accept it will not produce a rich result.
8. Disclose AI assistance where readers would reasonably wonder, and keep named authorship on the author page.

Don't
1. Don't expect llms.txt, llms-full.txt, /api/markdown or "AI versions" to move Google visibility. Fine to leave them running for other bots; stop adding to them.
2. Don't add more "X agency in Y" or "Y X agency" variant pages. Google's guide names this pattern.
3. Don't buy, trade or seed mentions (directory stuffing, paid or coordinated forum posts, link-for-mention swaps) to get cited by AI. Spam policies apply to AI responses since 2026-05-15, and Google says chasing inauthentic mentions is not as helpful as it seems. Earned media from real placements is the legitimate route and is the core of the service.
4. Don't extend machine translation to the 106 landing pages or the rest of the 120 playbooks, and don't translate content that was itself mass-produced.
5. Don't refresh page dates or run recurring "refresh" passes that change little. Update when facts change.
6. Don't treat third-party AI-visibility scores as Google data. Google's guide warns that no third-party tool has access to its internal ranking or AI systems. The citation panel measures sampled answers from specific engines, not AI Overviews exposure.
7. Don't react to the September spam update with sitewide rewrites before checking Search Console by template; spam demotions are slow to reverse, so change only what the data and the policies justify.
8. Don't use Google-Extended or the Exclude control expecting to tune AI Overviews and ranking at the same time. Exclude removes the site from AI features and gives no ranking benefit.

## 10. Re-verification pass (2026-10-15 to 2026-10-16, after the usage-limit reset)

This report was drafted in an earlier run that used its full call budget. After the reset I re-checked the claims most likely to change a decision. Results:

| Check | Method | Result |
|---|---|---|
| AI optimization guide still says llms.txt, special markup, chunking, rewriting for AI and inauthentic mentions are unnecessary, and warns against mass-producing pages for query or fan-out variations | WebFetch of https://developers.google.com/search/docs/fundamentals/ai-optimization-guide | Confirmed. Page still shows last updated 2026-07-10 UTC. It does not discuss E-E-A-T or freshness |
| Spam policies headings and the absence of "manipulated freshness" and "inauthentic mentions" sections | WebFetch of https://developers.google.com/search/docs/essentials/spam-policies | Confirmed. Last updated 2026-08-28 UTC. Scaled content abuse examples still include scraping then translating or synonymizing, and generative AI used to mass-produce pages with no added value. Doorway abuse still lists region or city specific pages that funnel to one page and near-duplicates that sit closer to search results than a browsable structure |
| Update table and October status | WebFetch of https://status.search.google.com/summary | Same eight incidents as section 4.1, Dec 2025 core through 24 Sep 2026 spam (13 d 16 h). No incident starts in October 2026 and none is listed as ongoing. The page gives no explicit status or end-date labels |
| New October update or volatility | WebSearch "Google search ranking update October 2026 core update volatility" | No reporting of a confirmed October 2026 update. The "October 15th" Search Engine Roundtable hit has a URL ending 38256 and the search summary describes it as an October 2024 post, so it is not current. Treat any claim of a current October 2026 core update as unverified |
| Generative AI performance report | WebFetch of https://support.google.com/webmasters/answer/16984139 | Confirmed: rolled out to all websites worldwide as of 2026-08-31, impressions only (no clicks or position), dimensions Pages, Countries, Dates, Devices, filter text vs multimodal, Search Labs excluded. Missing report usually means too few AI impressions or the site is excluded from Search generative AI features |
| hreflang code `zh-Hans` | WebFetch of https://developers.google.com/search/docs/specialty/international/localized-versions | Valid. Script subtags are documented (zh-Hans, zh-Hant). Earlier "possible issue" withdrawn. The page says nothing about machine translation |
| Repo scale | Bash: ls and grep in /Users/thunderbolt/Documents/projects/Shilika | 122 article-*-body.html partials, 106 directories in app/pages, 251 JSON files in app/_partials containing FAQPage, 104 containing dateModified 2026-06-23, hreflang zh-Hans plus x-default set in lib/i18n/config.ts (lines 20 and 140), English meta fallback comment at app/[locale]/[[...path]]/page.tsx line 58 |
| Google position on machine translation | WebSearch (secondary only) | No new 2026 statement from Google staff found. Secondary sources repeat the June 2025 line that AI translation is not defined as spam by itself but is covered by scaled content abuse when mass-produced with little value, and a 2022 John Mueller remark that a native speaker should review and fix auto-translations. The older spam wording about automated translation without human review belongs to the pre-2024 "auto-generated content" policy; I could not confirm it in the current spam policy page, which I fetched today and which does not list it as such. Status: unverified current wording, direction consistent |

Net effect on conclusions: none of the do and don't items changed. One finding was corrected (zh-Hans is valid). Score stays at 6 of 10.

## 11. Caveats and unverified items

- No Search Console or Ahrefs data. Nothing here shows what the site's traffic, indexation or AI impressions are.
- WebFetch summaries are produced by a small model; quoted policy meaning should be re-read on the live pages before acting. The changelog was read only for its first 100,000 of 178,743 characters (it is ordered newest first and covered Jan to Oct 2026).
- Google blog post on the Generative AI reports did not load; details came from the Search Console help pages.
- Dashboard end dates are calculated, not stated. Press cites Oct 8 01:00 PDT for the September spam update end.
- All winner/loser percentages for the 2026 core and spam updates come from vendor blogs and are unverified. Google has not named a target for the September spam update.
- Whether Google treats auto-translated content as scaled content abuse has no explicit current Google statement; the June 2025 position is reported secondhand via Glenn Gabe.
- The 2026-06-23 stamp analysis relies on commit e52310a and the article-4 history only; I did not diff all 104 files.
