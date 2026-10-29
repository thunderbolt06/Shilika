# Run 101 - 2026-10-28 - /compare claims cleanup + conflict disclosure (audit action 4, code part)

LOCAL / UNPUSHED.

## Why
The 2026-10-15 AI-SEO audit (action 4, risk register) flagged /compare as High risk: "Shilika is regularly that subcontractor" ran on all 10 /compare/[slug] pages, on the /compare index and inside FAQPage JSON-LD, with no named agency behind it, and no page disclosed that the publisher is one of the two options compared. Comparison pages are a top AI-citation format, so an unsourced first-person claim there gets quoted. Google's AI optimization guide (updated 2026-07-10) asks for helpful, reliable, people-first content; an undisclosed self-comparison with an unsourced claim works against that.

## What shipped
1. `app/compare/_data/shilika.ts`: new `DISCLOSURE` constant. CORE_REASONS card "The person agencies call for hard markets" rewritten to "Direct access to hard markets" with the unsourced subcontractor sentence removed.
2. `app/compare/[slug]/page.tsx`: callout H2 "Agencies already hire Shilika" changed to "Need hard markets? You can skip the middle."; subcontractor sentence removed; disclosure line added to the sources footer (10 agency pages).
3. `app/compare/page.tsx`: FAQ answer "Do agencies really subcontract freelancers?" no longer claims Shilika is brought in this way (visible FAQ and FAQPage JSON-LD stay in parity, same source array); disclosure line added to the footer.

## Gates
`tsc --noEmit` pass. 0 remaining "regularly that subcontractor" / "brought in this way" strings in app, components, lib, public. No em dashes added.

## Needs Shilika
- If an agency has subcontracted her and is happy to be named, the claim can come back with that name.
- Journalist count: /compare says 400+, /about and homepage say 100+ (CoinMarketCap era). Confirm the current number so all pages match.
- Still open from audit action 4: Muck Rack claim, LinkedIn display name, one canonical bio.
