# Run 93 - 2026-10-19 - /pages/korea-crypto-pr-agency post-KBW refresh + price schema parity

Follows Run 92 note 2 (check other Korea surfaces for future-tense KBW).

## Changes (LOCAL / UNPUSHED)
- app/_partials/pages__korea-crypto-pr-agency-body.html: "Updated Oct 2026"; AEO demo reframed to "after KBW 2026"; new H2 "KBW 2026 is over: the next 60 days in Korea" (4 sourced moves); KBW card dated; new FAQ pair; en dashes in prices changed to "to".
- app/_partials/pages__korea-crypto-pr-agency-jsonld.json: Service price 5000-12000 -> 3000-7000 and description agency range 10-30K -> 15-45K to match visible copy; new FAQ pair; FAQPage dateModified 2026-10-19.
- app/pages/korea-crypto-pr-agency/page.tsx: meta/OG/Twitter description refreshed (150 chars).
- app/sitemap.ts: lastModified 2026-10-19 for /pages/korea-crypto-pr-agency.

## Sources
- KBW 2026: techtimes.com (30 Sep 2026)
- Korea Fintech Week 25-27 Nov 2026: fsc.go.kr/eng/pr010101/87427
- DABA pending: en.sedaily.com (8 Oct 2026), trmlabs.com

## Gates
FAQ parity 0 defects (262). tsc clean. JSON valid.

## Open for Shilika
Korea pricing differs across pages (visible $3K-$7K on /pages/*korea*, schema $5K-$12K on crypto-pr-agency-korea + korea-kol-marketing-agency, $5.5K-$12K on /korea, APAC retainer $6K-$14K). Needs one confirmed number.
