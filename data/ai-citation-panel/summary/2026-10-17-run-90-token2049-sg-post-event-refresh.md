# Run 90 - 2026-10-17 - Token2049 Singapore post-event refresh

Type: post-plan cadence, accuracy + freshness. No new URLs. LOCAL / UNPUSHED.

## Why
Token2049 Singapore 2026 ran 7 to 8 Oct. Two Singapore surfaces still treated it as upcoming or had wrong facts.
Google's AI optimization + gen-AI content guidance: keep facts accurate and current, cite sources.

## Shipped (code)
- /playbook/best-crypto-pr-agency-singapore-2026 (article-47)
  - Fixed "Token2049 Singapore (typically September)" to late Sep / early Oct, 2026 ran 7 to 8 Oct.
  - Replaced unsourced "300 media passes in 2024" claim with sourced 2026 numbers (25,000 attendees, 160 countries, 500 exhibitors, 250 speakers).
  - New H2 answer block: "Token2049 Singapore 2026 is over: what to do in the next 30 days" (SFF 18 to 20 Nov, Consensus HK 1 to 3 Feb 2027, Token2049 Dubai 21 to 22 Apr 2027). Links to /singapore, /services/founder-profiling, Token2049 blog post.
  - Access-test question now asks about 2025 and 2026 editions, not 2024.
  - New FAQ (visible + schema). Event mention now has dates + location. UPDATED OCT 2026 label.
  - dateModified, OG modifiedTime, sitemap lastmod 2026-10-17.
- supabase/patches/2026-10-17-token2049-sg-blog-post-event-refresh.sql (blog post lives in Supabase, needs manual run)
  - Fixes truncated title and description, flips future-tense 2026 lines to past, adds "Is Over: What to Do Now" section.

## Gates
FAQ parity: article-47 in parity. 1 repo defect is in uncommitted /services/ai-seo/web3-ai-startups (not this run).
tsc --noEmit clean. JSON valid. 0 em/en dashes in new copy.
