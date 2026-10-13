# Run 84 - 2026-10-03 - Tool-specific service CTAs on 28 free tool pages

Verified live: Runs 80 to 82 are in production (pushed 2026-10-01). token-launch-pr and cybersecurity-pr read UPDATED SEPTEMBER 2026, /japan reads UPDATED SEP 2026. 28 /tools/<slug> pages live and in sitemap.

Change: every free tool page had the same generic CTA. Each tool now routes to the service that matches its job (press release + pitch tools to PR campaigns, bio/media kit to founder profiling, SEO tools to the AEO sections of AI/Web3/cyber PR, writing tools to content writing, social tools to KOL marketing, budget tools to token launch PR). Teardown link kept on every page.

Files:
- app/tools/_data/free/cta.ts (new)
- app/tools/[slug]/page.tsx (CTA render)

Gates: tsc --noEmit exit 0. 28/28 tools mapped. 0 em/en dashes in new copy. No FAQ, schema or metadata change.
