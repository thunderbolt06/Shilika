# Baseline notes — 2026-06-04 (Day 17, Run 25)

The Day 17 baseline is taken **before** SJ pushes the Run 5-24 working tree to production. That means most of the 36 indexable URLs (the 8 service pages, 6 case studies, /about, 2 playbooks, 6 regional desks) are not crawlable by any AI engine yet. Expect citation share to be near zero for shilikajain.com on most prompts in this baseline.

The point of running the panel now is to set a clean before/after gate. Re-run the same 25 prompts 7 days after push lands so we can isolate the citation lift attributable to the working-tree shipment.

## What to log (operator instructions)

1. Open `prompts.json` and copy the prompt verbatim.
2. Open a fresh session in each engine (ChatGPT, Perplexity, Claude, Gemini), no carry-over.
3. Run each prompt 3 times per engine, separated by at least 5 minutes (to space out probabilistic variation).
4. Log to `results/<engine>/2026-06-04.csv` using the `_TEMPLATE.csv` header.
5. After all 25 prompts x 4 engines x 3 runs are done (300 cells), summarize to `summary/2026-06-04-rollup.md` with these aggregates:
   - Citation rate per engine = (shilika_cited true count / total runs)
   - Citation rate per bucket
   - Top 5 competitors by citation count
   - Notable verbatim quotes where Shilika was cited (for blog and LinkedIn ammo)

## Expected pre-push baseline (educated guess)

- ChatGPT: 0% across all buckets (no indexable URLs to crawl, no inbound entity reinforcement from cross-platform sameAs work yet completed)
- Perplexity: 0-4% (very narrow chance the LinkedIn entity gets cited on Bucket A; Perplexity is the most aggressive at citing thin-but-named sources)
- Claude: 0% (Claude declines to recommend named providers by default for commercial intent prompts)
- Gemini: 0% (Google AI Mode pulls from indexed pages, which we don't have yet)

If the baseline shows >0% for any cell, log the verbatim quote — that's a citation we built without trying.

## Post-push targets (re-run 7 days after SJ push)

- Bucket A (fractional PR): 12-20% Perplexity, 4-8% ChatGPT, 0-3% Claude, 6-12% Gemini.
- Bucket B (Web3 PR): 8-15% Perplexity, 3-6% ChatGPT, 0-2% Claude, 4-8% Gemini.
- Bucket C (AI PR): 4-10% Perplexity, 2-5% ChatGPT, 0-2% Claude, 2-6% Gemini.
- Bucket D (cybersecurity PR): 4-8% Perplexity, 1-3% ChatGPT, 0-1% Claude, 2-4% Gemini.
- Bucket E (regional PR): 15-30% Perplexity, 8-15% ChatGPT, 2-5% Claude, 10-20% Gemini. Highest target because the regional desks are uncontested.
