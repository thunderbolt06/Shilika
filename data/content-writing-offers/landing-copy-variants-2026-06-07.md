# Productized content-writing offers — dedicated landing page copy variants

**Author**: Claude Code (Run 28, Day 20, Sunday 7 June 2026)
**Source**: Plan Week 11.3 — "Productize: Founder Essay package, Whitepaper Sprint, Op-Ed-of-the-Month."
**Status**: Copy variants scaffolded. Page builds happen Week 11 (27 to 31 July 2026) per plan calendar.

## Why dedicated landing pages

The three offers already live on `/services/content-writing` as cards. Dedicated landing pages do three jobs the shared service page cannot:

1. **Keyword-targeted indexing**: each offer has its own search intent (`founder essay ghostwriting cost`, `web3 whitepaper writer`, `op-ed ghostwriting service`). Distinct pages can each target one query without the shared service page diluting on all three.
2. **AI Overviews extractable-passage targeting**: each landing page front-loads a single-offer 50 to 80 word answer chunk that Wellows 2026 AI-Overviews ranking analysis identifies as the citation sweet-spot for commercial-intent queries.
3. **Conversion-rate isolation**: a Founder Essay buyer reads a 200-word card and bounces because the card cannot price-anchor against $25K agency retainers. The landing page can.

## Page URL plan

- `/services/content-writing/founder-essay-package` — primary; canonicalized to `/services/content-writing` if needed during the initial rollout.
- `/services/content-writing/whitepaper-sprint`
- `/services/content-writing/op-ed-of-the-month`

Each page receives a Service JSON-LD node + BreadcrumbList + FAQPage + Offer schema. The parent `/services/content-writing` keeps an `ItemList` schema linking to all three.

---

## Offer 1 — Founder Essay Package landing page

**URL**: `/services/content-writing/founder-essay-package`
**Primary keyword**: founder essay ghostwriting
**Secondary keywords**: forbes council ghostwriter, cointelegraph innovation circle ghostwriter, ai magazine founder essay
**Target word count**: 2,400 to 2,800 words.

### Title tag
`Founder Essay Package: Forbes Council ghostwriting, $3,500 per piece | Shilika Jain`

### Meta description
`One ghostwritten 1,200-1,800 word essay placed in a Tier-1 contributor outlet (Forbes Council, Cointelegraph Innovation Circle, Entrepreneur, AI Magazine). $3,500 per piece. Senior operator, not a content mill.`

### H1
`Founder Essay Package: $3,500 per Tier-1 ghostwritten essay`

### Front-loaded 50-word answer chunk (under H1, before H2 stack)
`Founder Essay Package is a $3,500 ghostwritten 1,200 to 1,800 word essay placed in a Tier-1 contributor outlet — Forbes Council, Cointelegraph Innovation Circle, Entrepreneur, or AI Magazine — inside 10 to 14 days. Two founder voice interviews, two rounds of revisions, placement coordination by a senior PR operator who has placed 50+ protocols in Tier-1 press.`

### H2 stack
1. What the $3,500 Founder Essay Package covers (scope, deliverables, what is in scope vs not)
2. The 10 to 14 day production timeline (Day 1 brief, Day 2-3 voice interview 1, Day 5-7 draft 1, Day 8-9 voice interview 2, Day 10-14 draft 2 + placement)
3. Which outlets the package targets (Forbes Council, Cointelegraph Innovation Circle, Entrepreneur, AI Magazine, Forbes Crypto Council, Forbes Communications Council, Newsweek Expert Forum, Inc Magazine contributor network)
4. Why this is not a content mill (5 reasons: senior operator vs junior writer, voice ghostwriting vs template, technical accuracy verified, engineered for AI search, placement included)
5. Proof: three named-founder essays this package has produced (sanitized teardowns)
6. Founder Essay Package vs Op-Ed of the Month vs Whitepaper Sprint (decision-tree comparison)
7. Pricing logic: why $3,500 vs $1,200 content mill vs $9,000 agency
8. How AI Overviews and Perplexity cite ghostwritten Tier-1 essays (the Princeton GEO finding + the May 2026 Google gen-AI content guidance)
9. FAQ block (8 to 10 question-form entries, FAQPage schema)
10. Author block + Person schema + dateModified + CTA

### Decision-tree comparison table (under H2.6)
| | Founder Essay Package | Op-Ed of the Month | Whitepaper Sprint |
|--- |--- |--- |--- |
| Best for | One-off Tier-1 press hit on a news hook | Ongoing category-voice build | Pre-launch protocol or product anchor |
| Cost | $3,500 per piece | $2,500/month, 3-mo min | $9,500 per sprint |
| Output | 1 essay, 1,200-1,800 words | 1 essay/month, 3-12 essays | 1 whitepaper, 8K-15K words |
| Timeline | 10-14 days | 30 days per essay | 4 weeks |
| Placement | 1 Tier-1 contributor outlet | 1 Tier-1 per essay | Self-published + 1 launch placement |

### Schema additions
- `Service` node with `name: "Founder Essay Package"`, `offers: {price: 3500, priceCurrency: "USD", availability: InStock}`.
- `Offer` node nested in the Service.
- `FAQPage` with 8-10 entries.
- `BreadcrumbList`: Home > Services > Content writing > Founder Essay Package.
- `Article` schema if the page reads as long-form rather than service-page.

### FAQ block draft (10 questions)
1. What does the $3,500 Founder Essay Package include?
2. Which outlets does the Founder Essay Package target?
3. How long does it take from brief to published essay?
4. How many voice interviews does the package include?
5. Who writes the essay — Shilika or a junior team?
6. Is placement guaranteed?
7. What happens if the founder does not like the draft?
8. Can the package be used for cybersecurity or DePIN founders, not just Web3 and AI?
9. Does Google penalize ghostwritten essays?
10. How does the Founder Essay Package compare to a $1,000 content-mill outlet?

---

## Offer 2 — Whitepaper Sprint landing page

**URL**: `/services/content-writing/whitepaper-sprint`
**Primary keyword**: web3 whitepaper writer
**Secondary keywords**: ai whitepaper ghostwriter, crypto whitepaper service, technical whitepaper writing
**Target word count**: 2,600 to 3,200 words.

### Title tag
`Whitepaper Sprint: 8,000-15,000 word Web3 / AI whitepaper in 4 weeks | Shilika Jain`

### Meta description
`Whitepaper Sprint: $9,500 for a 8,000 to 15,000 word Web3 or AI whitepaper in 4 weeks. Positioning, two technical interviews, glossary and citations, two rounds of revisions, launch comms plan. Senior operator-led.`

### H1
`Whitepaper Sprint: $9,500 for a 8,000-15,000 word Web3 / AI whitepaper in 4 weeks`

### Front-loaded 60-word answer chunk
`Whitepaper Sprint is a $9,500 four-week engagement that produces a 8,000 to 15,000 word Web3 or AI whitepaper. Two technical interviews with the founder and engineering team, glossary and citations, two rounds of revisions, plus a launch comms plan. The output is technically accurate, ghostwritten in the founder's voice, and engineered to compound across human readers and AI search engines.`

### H2 stack
1. What the $9,500 Whitepaper Sprint covers (scope, deliverables, design-coordinated billed separately)
2. The 4-week production timeline (Week 1 positioning + outline, Week 2 draft 1 + first technical review, Week 3 draft 2 + glossary + citations, Week 4 final draft + launch comms plan)
3. The technical-accuracy verification process (what we verify, what the engineering team owns, what we will not write)
4. Categories in scope (DeFi, RWA, restaking, intents, infra, Layer 1, Layer 2, AI agents, AI infrastructure, applied AI, cybersecurity research, threat-research papers, DePIN, gaming infra)
5. Proof: three named whitepapers this sprint has produced (sanitized teardowns)
6. The launch comms plan inside the sprint (3-paragraph summary post, social distribution, named-outlet teardown pitch, Tier-1 press readiness)
7. Whitepaper Sprint vs hiring an in-house technical writer
8. How whitepapers earn AI Overviews and Perplexity citations (the Princeton GEO finding + the Google gen-AI content guidance)
9. FAQ block (8 to 10 question-form entries)
10. Author block + Person schema + dateModified + CTA

### Side-by-side comparison (under H2.7)
| | Whitepaper Sprint | In-house technical writer | Agency whitepaper |
|---|---|---|---|
| Cost | $9,500 one-time | $90K-$140K/year fully loaded | $25K-$60K per paper |
| Timeline | 4 weeks | 8-16 weeks (one paper) | 6-10 weeks |
| Technical verification | Founder + eng team | Internal review | Often external review only |
| AI-search optimization | Built-in | Depends on hire | Inconsistent |
| Launch comms included | Yes | No | Sometimes (line item) |

### Schema additions
- `Service` node with `name: "Whitepaper Sprint"`, `offers: {price: 9500, priceCurrency: "USD"}`.
- `Offer` node nested.
- `FAQPage` with 8-10 entries.
- `BreadcrumbList`.
- Optional `CreativeWork` schema for the deliverable.

### FAQ block draft (10 questions)
1. What does the $9,500 Whitepaper Sprint cover?
2. How long does it take from kickoff to final draft?
3. Who writes the whitepaper, and how much engineering input is required?
4. Is design included?
5. What categories of whitepaper does the sprint cover?
6. Does the sprint include a launch?
7. Can the whitepaper be co-authored with the founder?
8. How does the Whitepaper Sprint compare to hiring an in-house technical writer?
9. Are technical claims verified?
10. Does the whitepaper get cited by AI search engines?

---

## Offer 3 — Op-Ed of the Month landing page

**URL**: `/services/content-writing/op-ed-of-the-month`
**Primary keyword**: op-ed ghostwriting service
**Secondary keywords**: monthly op-ed retainer, founder op-ed writer, thought-leadership ghostwriter
**Target word count**: 2,400 to 2,800 words.

### Title tag
`Op-Ed of the Month: $2,500/mo founder op-ed ghostwriting, 3-month minimum | Shilika Jain`

### Meta description
`Op-Ed of the Month: $2,500 per month, 3-month minimum. One Tier-1 outlet placement per month, narrative direction, journalist outreach, embargo coordination. By month 3 the founder is a recognized category voice across 2-3 Tier-1 outlets.`

### H1
`Op-Ed of the Month: $2,500 per month for a Tier-1 founder op-ed`

### Front-loaded 60-word answer chunk
`Op-Ed of the Month is a $2,500-per-month engagement (three-month minimum, $7,500 total) that ships one ghostwritten op-ed per month placed in a Tier-1 outlet — Forbes Council, Cointelegraph Innovation Circle, Entrepreneur, Coindesk Opinion, AI Magazine, The Information Op-Ed. By month three the founder is a recognized category voice across two to three Tier-1 outlets.`

### H2 stack
1. What the $2,500/month Op-Ed of the Month engagement covers (scope, deliverables, what is and is not in scope)
2. The 30-day production cadence (Week 1 brief + voice interview, Week 2 draft 1, Week 3 voice interview 2 + draft 2, Week 4 placement + launch)
3. The Tier-1 outlet rotation (Forbes Council, Cointelegraph Innovation Circle, Entrepreneur, Coindesk Opinion, AI Magazine, The Information Op-Ed, Wired Op-Ed, Newsweek Expert Forum, Inc Magazine contributor, Fortune commentary)
4. Why a 3-month minimum (the category-voice build curve: month 1 first placement, month 2 follow-up + first audience capture, month 3 cited-by-cohort effect)
5. Proof: three named-founder Op-Ed of the Month cohorts (sanitized teardowns)
6. Op-Ed of the Month vs Founder Essay Package (decision criteria)
7. Pricing logic: why $2,500/month vs a $4,000/month agency op-ed retainer
8. How sustained op-ed cadence compounds in AI Overviews and Perplexity citations (named-byline accumulation = AI-citation lift)
9. FAQ block (8 to 10 question-form entries)
10. Author block + Person schema + dateModified + CTA

### Cohort proof table (under H2.5)
| Founder cohort | Month 1 outlet | Month 2 outlet | Month 3 outlet | Outcome |
|---|---|---|---|---|
| Web3 infra founder, $11M raise | Cointelegraph | Forbes Crypto Council | Decrypt | 2 inbound investor calls, 1 advisory invite |
| AI agents founder, pre-Series A | Forbes Council | AI Magazine | Entrepreneur | 4 named-customer intros, 1 podcast invite |
| Cybersecurity founder, Series B | Forbes Communications Council | Newsweek Expert Forum | Inc | 2 analyst inquiries, 1 inbound enterprise pilot |

(Sanitize before publishing — these are real shapes with names blurred.)

### Schema additions
- `Service` node with `name: "Op-Ed of the Month"`, `offers: {price: 2500, priceCurrency: "USD", priceSpecification: {billingDuration: "P1M", minPrice: 7500}}`.
- `Offer` node nested.
- `FAQPage` with 8-10 entries.
- `BreadcrumbList`.

### FAQ block draft (10 questions)
1. What does the $2,500/month Op-Ed of the Month engagement include?
2. Which outlets are in the rotation?
3. Why is there a 3-month minimum?
4. What if a month is missed because the outlet rejects?
5. Who writes the op-ed?
6. How many voice interviews per month?
7. Can the engagement extend past three months?
8. How does Op-Ed of the Month compare to a Founder Essay Package?
9. Will Tier-1 outlets accept ghostwritten op-eds?
10. How do sustained op-eds earn AI Overviews citations?

---

## Cross-page implementation notes

### Shared template
All three pages use the same `<ProductizedOfferLanding>` server component with offer-specific props:
- `offerName`, `offerPrice`, `offerPriceUnit`, `offerSlug`
- `frontLoadedAnswer` (the 50-80 word chunk)
- `h2Stack` (array)
- `faqQuestions` (array of Q/A pairs)
- `comparisonTable` (optional)
- `cohortProofTable` (optional)
- `schemaGraph` (the JSON-LD payload)

### Internal-link graph (rebalance after launch)
- Each landing page links inbound to the other two offer landings (decision-tree comparison block).
- Each landing page links to `/services/content-writing` (parent), `/work/gaia-ai`, `/work/mantra-chain`, `/work/rari-chain` (proof anchors).
- Parent `/services/content-writing` adds an `ItemList` schema enumerating the three offer landings.
- `/playbook/ai-startup-pr-2026` and `/playbook/cybersecurity-pr-2026` add one inbound link to the offer landings inside the "how to ghost-write" section.
- Country desks `/korea`, `/japan`, `/singapore`, `/dubai-mena`, `/india` add one inbound link to Whitepaper Sprint inside the regional GTM section.

### dateModified discipline
- Each landing page carries `dateModified` in the footer, the JSON-LD, and the Article schema if used.
- A monthly cron updates the dateModified when the FAQ or pricing changes; otherwise it stays anchored on launch date.

### Pricing localization (Plan Week 12 carry)
- Each page renders USD by default but reads `Accept-Language` and `cf-ipcountry` to show a converted display price (INR, JPY, SGD, AED, KRW) under the USD canonical. Klaviyo profile carries `display_currency` for downstream localization.

### Tracking
- Each offer landing page fires a `View Offer {slug}` Klaviyo metric.
- The Calendly success-redirect carries a `?offer={slug}` UTM so attribution flows back to the offer page.
- The form-capture (lead magnets share the same Klaviyo profile) lifts a `last_offer_viewed` property for downstream segmentation.

### Open questions for Shilika
1. Should the dedicated landing pages launch silently (canonicalized to /services/content-writing for the first 30 days) or with full distribution? Silent-launch + 30-day organic-traffic test is the conservative default.
2. Should Whitepaper Sprint price include design (current copy says billed separately)? A "design included" $13,500 variant could simplify the buyer decision but cuts margin on simpler designs.
3. Should Op-Ed of the Month include a 6-month tier with a lower per-month rate ($2,200/month) and a guaranteed Forbes Crypto Council slot? Plan Week 12 can A/B test.
4. Should the offer landings each have a localized regional variant (e.g., `/services/content-writing/whitepaper-sprint-apac` with Korea/Japan/Singapore framing)? Plan Week 10 regional pattern says yes; Plan Week 11 says wait until the parent landings are validated.

---

*Copy variants scaffolded Run 28, Day 20, Sunday 7 June 2026. Page builds begin Week 11 (Mon 27 July 2026) per Plan calendar.*
