# Run 100 - 2026-10-27 - Blog em-dash sweep (48 posts) + writer root-cause fix

Type: post-plan cadence. Content quality / humanization. No new URLs. LOCAL / UNPUSHED.

## Why
- Run 99 note 2: sweep blog descriptions for em-dashes.
- Live Supabase read (299 published posts): 6 descriptions and 45 bodies carry 380+ em-dashes.
- docs/humanization-guide.md calls the em-dash the strongest AI-writing tell. Google's gen-AI content guide
  (updated 1 Oct 2026 with Search Quality Rater language) rewards content made for people, not templated output.
- Descriptions feed meta description, og:description, Article JSON-LD and the .md copies AI crawlers read.
- Root cause: lib/agents/writer.ts only logged humanization violations (non-fatal). Title and description were never checked.

## What shipped
1. supabase/patches/2026-10-27-blog-em-dash-sweep.sql (new): 51 guarded updates (45 bodies, 6 descriptions) across 48 posts.
   md5 guard per row, trigger off so updated_at / dateModified do not move.
2. lib/agents/punctuation.ts (new): stripEmDashes(), same rules as the backfill.
3. lib/agents/writer.ts: title, description and body pass through stripEmDashes() at parse time.

## Rules
- List item with link or bold label: colon. Bold label: colon. Heading: colon.
- Paired dashes: commas, or parentheses when the aside holds commas.
- Single dash: colon, or comma before a conjunction (but, and, which, plus...).
- Table cells and code spans: hyphen. Greeting "Hi X -": comma.
- Blockquotes and quotes of Shilika's real X posts kept verbatim (3 left on purpose).
- RU and ZH i18n partials not touched: the dash is correct punctuation in those languages.

## Gates
- tsc --noEmit pass.
- TS port vs Python backfill: identical on 45 of 48 bodies (3 differ only inside quoted examples).
- Markdown link count unchanged on all 48 posts. 0 em-dashes left in descriptions.

## Needs Rahil / Shilika
- Run the Run 98 and Run 99 patches, then this one, in the Supabase SQL editor. Check query at the end.
- Local main still holds Runs 95 to 100 uncommitted. Pull or rebase before pushing.

## Next run
1. Monthly SERP discoverability panel due by 31 Oct (25 prompts).
2. After 6 Nov: flip IBW and Devcon 8 to past tense on /apac, /india, /services/apac-pr.
3. Price ladder on article-4 still needs Shilika's one number (Run 96).
