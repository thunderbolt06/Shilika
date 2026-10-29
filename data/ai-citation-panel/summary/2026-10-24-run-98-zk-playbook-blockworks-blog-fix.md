# Run 98 - 2026-10-24 - ZK playbook Blockworks accuracy + pitch-guide blog title fix

Why: Run 97 note 1. /playbook/zk-proof-pr-2026 (article-121) still told founders to pitch Blockworks reporters.
Blockworks closed its news division on 29 Oct 2025.

Shipped (LOCAL / UNPUSHED):
- article-121: lede and scaling example no longer name Blockworks reporters (now The Block / CoinDesk).
- Outlet table: Blockworks row rebuilt as "Blockworks podcasts and newsletters".
- New "October 2026 update" callout with 3 sources + link to the Run 97 Block/Blockworks playbook.
- FAQ 3 rewritten in body and JSON-LD (parity 5/5). JSON-LD description + keyword updated.
- Freshness: dateModified 2026-10-24, OG publishedTime/modifiedTime, visible "Updated Oct 24, 2026", sitemap lastModified.
- Blog post how-to-pitch-coindesk-the-block-blockworks-decrypt-2026: body was already accurate.
  SQL patch fixes the truncated title ("...in 2026: A"), the description, adds the Messari line, a link to the playbook and a dated update note.
  File: supabase/patches/2026-10-24-pitch-coindesk-block-blockworks-decrypt-refresh.sql (run once in the Supabase SQL editor).

Sources:
- https://www.blockhead.co/2025/10/30/blockworks-shuts-down-news-division-lays-off-journalists-in-pivot-to-data-business/
- https://talkingbiznews.com/media-news/blockworks-is-shutting-its-news-operation/
- https://thedefiant.io/news/infrastructure/blockworks-acquires-messari-crypto-data-consolidation

Gates: JSON valid, FAQ parity 5/5, 0 em/en dashes, tsc --noEmit pass, SQL targets verified against the live post body.
