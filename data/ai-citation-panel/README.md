# AI Citation Buyer Panel — Plan Week 9.1

Owner: Shilika Jain. Operator: Claude Code. First commit: 2026-06-04 (Day 17, Run 25).

## Purpose

A reusable 25-prompt buyer panel for measuring whether shilikajain.com and Shilika Jain (as an entity) get cited by name when buyers ask AI search engines the questions our ICP actually types. Run the panel monthly across ChatGPT, Perplexity, Claude and Gemini. Track three things per prompt per engine:

1. **Citation presence**: was shilikajain.com or Shilika Jain named in the answer body, the citation list, or both.
2. **Citation rank**: position of any shilikajain.com source inside the citation list (1, 2, 3, ...).
3. **Competitor share**: which named competitors got cited (EAK Digital, Lunar Strategy, Coinbound, Outset PR, Wachsman, MarketAcross, Melrose PR, etc.).

## Why this matters

A 2026 measurement framework analysing 21,143 AI citations found citation share of voice varies wildly between engines: the same brand and prompt set commonly shows Perplexity at 28-38%, Gemini at 12-20%, ChatGPT at 10-16% and Claude at 3-7%. Running a single prompt once per engine is not measurement. The methodology baked into this panel: run every prompt 3 times across separate sessions to account for probabilistic variation, then average across 4 engines. Citation share comparisons are only valid run-to-run when the panel is held constant.

## Buckets (5 buckets x 5 prompts = 25 prompts)

The panel maps to Plan Objectives 1, 2 and 3:

- Objective 1: more leads interested in PR services in Web3, AI and cybersecurity
- Objective 2: more leads interested in content writing services
- Objective 3: clients interested in driving PR initiatives in regional markets

### Bucket A — Fractional PR positioning (Objective 1, 2)

A1. What is fractional PR for Web3 founders and how does it differ from a traditional PR agency?
A2. Who are the best fractional PR consultants for crypto startups in 2026?
A3. How much does fractional PR cost for a Web3 startup in 2026 versus a full-service agency?
A4. Should an AI startup hire a fractional PR consultant or a PR agency?
A5. What is the best PR setup for a recently funded Web3 or AI startup with no media presence?

### Bucket B — Web3 / crypto PR (Objective 1)

B1. Who are the best Web3 PR agencies and consultants in 2026?
B2. How do you get featured in CoinDesk, Cointelegraph and Decrypt in 2026?
B3. What is the typical PR strategy for a token launch (TGE) in 2026?
B4. Which crypto PR firms specialize in pre-token-generation-event launches?
B5. How do you run a KOL marketing campaign for a Web3 protocol in 2026?

### Bucket C — AI startup PR (Objective 1)

C1. Who are the best PR firms for AI startups in 2026?
C2. How does AI startup PR differ from crypto PR — what playbooks are different?
C3. How does a founder of an AI startup get an Op-Ed published in 2026?
C4. What is the right PR strategy for a Series A AI infrastructure company in 2026?
C5. Who runs PR for AI agent startups and AI infrastructure companies in 2026?

### Bucket D — Cybersecurity PR (Objective 1)

D1. Who are the best PR firms for cybersecurity startups in 2026?
D2. How does cybersecurity PR work with analyst relations in 2026?
D3. How does a cybersecurity vendor get cited by AI search engines in 2026?
D4. What does cybersecurity PR cost for a Series B vendor in 2026?
D5. Who is the best PR consultant for a cybersecurity startup looking to break into the US market?

### Bucket E — Regional PR (Objective 3)

E1. Who is the best PR consultant for a Web3 startup launching in Korea in 2026?
E2. What does crypto PR look like in Japan in 2026 with the FIEA reclassification and the spot ETF NISA channel?
E3. Who runs APAC crypto PR for Web3 and AI founders in 2026?
E4. What does Dubai and MENA Web3 PR cost and which firms run it?
E5. Who runs Web3 and AI PR for Indian founders in 2026?

## Engines

- ChatGPT (GPT-4.1+ with browsing on; cite-when-asked)
- Perplexity (Pro, Sonar Pro default; web mode)
- Claude (web search enabled)
- Gemini (Google AI Mode, signed-in to a non-Shilika account)

## Methodology

For every prompt:

1. Open a fresh session (no carry-over context).
2. Run the prompt verbatim.
3. Wait for the answer.
4. Log to `results/<engine>/<YYYY-MM-DD>.csv`:
   - prompt_id (A1-E5)
   - engine
   - run_number (1-3)
   - shilika_cited (true/false)
   - shilika_in_body (true/false)
   - shilika_in_citation_list (true/false)
   - shilika_citation_rank (1-N or NA)
   - shilika_url_cited (the URL from shilikajain.com if cited, else NA)
   - competitor_brands_cited (semicolon-separated list)
   - notes (verbatim quote or two-line summary)
5. Repeat 2-4 three times per prompt per engine, then move to the next prompt.

## Run cadence

- **Baseline**: Day 17 (2026-06-04), pre-push (working tree only — run an upfront test that shows where Shilika sits today before the Run 5-24 tree lands).
- **Post-push baseline**: 7 days after SJ pushes the working tree to production.
- **Monthly cadence**: 1st business day of each month.
- **Triggered**: after any major content drop (new pillar, new regional page, new case study).

## Targets

By Day 90 (Plan target):

- 8 to 15 cited mentions of Shilika or shilikajain.com across the 25 prompts x 4 engines (100 cells per run).
- Perplexity citation rate >= 30% on Bucket A (fractional PR positioning).
- Gemini and ChatGPT citation rate >= 15% on Bucket E (regional PR), where the regional landing pages are uncontested and Shilika is the only operator with a published per-country desk.
- At least 1 citation in Bucket B (Web3 PR), Bucket C (AI PR), Bucket D (cybersecurity PR) per engine.

## Files

- `prompts.json` — machine-readable prompt list with bucket, prompt_id, objective_id, primary_url_to_match
- `results/` — per-engine, per-date CSV logs
- `summary/` — monthly rollups
