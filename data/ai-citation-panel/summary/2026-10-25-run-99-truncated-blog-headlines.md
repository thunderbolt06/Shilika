# Run 99 - 2026-10-25 - Truncated blog headline sweep + writer fix

Type: post-plan cadence. Note 1 from Run 98. No new URLs. LOCAL / UNPUSHED.

## Finding
Crawled all 314 /blog URLs in the live sitemap. 17 H1s end mid-sentence
("...Investors, and", "...in ChatGPT,", "...Media: The"). The same broken text is the
og:title, twitter:title, Article JSON-LD headline, breadcrumb and the .md copy AI crawlers read.
The SEO <title> overrides (lib/blog-seo-titles.ts on origin/main) hide it in the tab only.

Root cause: lib/agents/writer.ts cut any title over 80 chars at the last space.

## Shipped
1. supabase/patches/2026-10-25-truncated-blog-headlines-fix.sql: 16 full headlines (all 80 chars or less,
   no em dashes). 17th is in Run 98's patch. Keeps updated_at (headline repair is not a content update).
   Also removes an em dash from one description. Ends with a check query (expect 0 rows).
2. lib/agents/writer.ts: new trimHeadline(). Drops dangling words and punctuation after the cut,
   and drops a short stub after a colon. Tool schema now tells the model 80 is a hard cap.

## Gates
tsc --noEmit pass. trimHeadline tested on 5 samples. Headlines checked against post bodies.

## Needs Shilika
- Run the SQL patch (after Run 98's) in the Supabase SQL editor.
- Local main is 19 commits behind origin/main and holds Runs 95 to 99 uncommitted. Pull/rebase before pushing.
