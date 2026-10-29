# Run 96 - 2026-10-23 - Wire the 3 winning playbooks to the money pages (audit action 7)

LOCAL / UNPUSHED. No new URLs. No dates bumped (link additions are not a content refresh).

## Why
2026-10-15 AI-SEO audit, action 7: the pages engines cite most do not route readers to services.
crypto-pr-cost-2026 had 0 service, desk or playbook links. how-to-pitch-cointelegraph-2026 had 0 service links.
best-web3-pr-agencies-2026 linked no regional desk. Serves all 3 objectives (Web3/AI/cyber PR, content writing, regional).

## Changes
- app/_partials/article-4-body.html (crypto-pr-cost-2026): 10 contextual links added. Web3 PR campaigns, founder profiling,
  KOL marketing, token launch PR + pre-TGE checklist, APAC PR, 6 desk links in the APAC price table, AI startup PR +
  AI Series A playbook, cybersecurity PR, content writing, AI search visibility. 20 en-dash ranges changed to "to".
  Blockworks removed from the "where placements land at steady state" list (news division closed 29 Oct 2025).
  Historical "placed in Blockworks" lines kept.
- app/_partials/article-4-jsonld.json: same Blockworks removal in the retainer FAQ answer. JSON valid.
- app/_partials/article-13-body.html (how-to-pitch-cointelegraph-2026): APAC PR + Korea/Japan desks, 3 case links
  (MANTRA, Web3Auth, Fluence), Web3 PR campaigns, token launch PR, AI startup PR.
- app/_partials/article-7-body.html (best-web3-pr-agencies-2026): APAC PR in the decision tree. Stale "What comes next"
  section (promised teardowns that already shipped + a Q3 pricing promise) rewritten as "Where to go next" with links to the
  Gaia and RARI teardowns, APAC playbook, 5 desks and the cost playbook. 6 en-dash ranges changed to "to".

## Sources
- Blockworks news shutdown: blockhead.co (30 Oct 2025), talkingbiznews.com, amediaoperator.com.

## Gates (run locally before push)
- No FAQ text changed, so parity unchanged. Tag balance checked. All link targets exist in app/.
- 0 en/em dashes in the 3 bodies.

## Open
- Price ladder still inconsistent on article-4: answer box says fractional $3K to $7K, "What I price at" says $5K to $14K,
  poster says $5k to $10k. Needs Shilika's one number.
- /playbook/how-to-get-covered-the-block-blockworks-2026 still treats Blockworks as a live newsroom. Next run.
