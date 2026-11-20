# Locale noindex proposal (D16, 19 Nov 2026)

Status: PROPOSAL ONLY. Nothing here is applied. It needs a yes from Shilika or Rahil (90-day plan, week 6).

## How this list was made

- 105 locale URLs (21 pages in each of ja, zh, ko, es, ru) from the 3 Nov crawl.
- Index status: GSC URL Inspection, run 19 Nov. Impressions and clicks: GSC, 2026-08-19 to 2026-11-16.
- Words: crawl word count. It undercounts Japanese and Chinese, so treat it as a rough signal there.
- Full data: data/seo-30d/locale-index.csv. Rebuild with `python3 scripts/gsc-locale-index.py`.

## Totals by locale

| Locale | Pages | Indexed | Not indexed | Blocked (4xx) | Impressions (90d) | Clicks |
| --- | --- | --- | --- | --- | --- | --- |
| ja | 21 | 14 | 5 | 2 | 63 | 1 |
| zh | 21 | 16 | 4 | 1 | 38 | 0 |
| ko | 21 | 12 | 8 | 1 | 50 | 1 |
| es | 21 | 16 | 4 | 1 | 199 | 0 |
| ru | 21 | 14 | 5 | 2 | 76 | 4 |

All 105 pages together: 426 impressions and 6 clicks in 90 days.

## A. Propose noindex and sitemap removal (24 pages)

Google has not indexed these and they have 0 impressions. Noindex until a native speaker has reviewed them.

| URL | Words | GSC status | Impressions (90d) | Clicks |
| --- | --- | --- | --- | --- |
| /es/blog/analyst-relations-101-startups | 2611 | Discovered - currently not indexed | 0 | 0 |
| /es/blog/how-to-pitch-coindesk-the-block-blockworks-decrypt-2026 | 2747 | Discovered - currently not indexed | 0 | 0 |
| /es/blog/token2049-singapore-pr-playbook-earned-media | 2422 | URL is unknown to Google | 0 | 0 |
| /es/playbook/best-b2b-saas-pr-agencies-2026 | 3564 | Discovered - currently not indexed | 0 | 0 |
| /ja/blog/analyst-relations-101-startups | 620 | URL is unknown to Google | 0 | 0 |
| /ja/blog/how-to-pitch-coindesk-the-block-blockworks-decrypt-2026 | 668 | Discovered - currently not indexed | 0 | 0 |
| /ja/playbook/ai-startup-pr-agency-india-2026 | 664 | URL is unknown to Google | 0 | 0 |
| /ja/playbook/best-b2b-saas-pr-agencies-2026 | 653 | Discovered - currently not indexed | 0 | 0 |
| /ja/playbook/best-token-launch-marketing-agencies-2026 | 671 | Discovered - currently not indexed | 0 | 0 |
| /ko/about | 1973 | Discovered - currently not indexed | 0 | 0 |
| /ko/apac | 2412 | Discovered - currently not indexed | 0 | 0 |
| /ko/blog/analyst-relations-101-startups | 1792 | URL is unknown to Google | 0 | 0 |
| /ko/blog/how-to-pitch-coindesk-the-block-blockworks-decrypt-2026 | 1886 | Discovered - currently not indexed | 0 | 0 |
| /ko/playbook/ai-startup-pr-agency-india-2026 | 2405 | URL is unknown to Google | 0 | 0 |
| /ko/playbook/best-token-launch-marketing-agencies-2026 | 2259 | Discovered - currently not indexed | 0 | 0 |
| /ko/playbook/how-to-submit-op-ed-techcrunch-2026 | 2313 | Discovered - currently not indexed | 0 | 0 |
| /ru/blog/analyst-relations-101-startups | 2117 | Discovered - currently not indexed | 0 | 0 |
| /ru/blog/how-to-pitch-coindesk-the-block-blockworks-decrypt-2026 | 2170 | URL is unknown to Google | 0 | 0 |
| /ru/playbook/best-b2b-saas-pr-agencies-2026 | 2733 | Discovered - currently not indexed | 0 | 0 |
| /ru/playbook/best-token-launch-marketing-agencies-2026 | 2775 | Discovered - currently not indexed | 0 | 0 |
| /zh/blog/how-to-pitch-coindesk-the-block-blockworks-decrypt-2026 | 764 | Discovered - currently not indexed | 0 | 0 |
| /zh/playbook/ai-startup-pr-agency-india-2026 | 905 | Discovered - currently not indexed | 0 | 0 |
| /zh/playbook/best-b2b-saas-pr-agencies-2026 | 876 | Discovered - currently not indexed | 0 | 0 |
| /zh/playbook/how-to-submit-op-ed-techcrunch-2026 | 869 | Discovered - currently not indexed | 0 | 0 |

## C. Under 150 words (10 pages): keep, do not noindex

These are /services and /contact in every locale. They are linked from the nav on every locale page, so noindex would not help. The services page looks thin because most of its body is not translated yet. Better fix: finish the translation. /ko/services and /ru/contact are also not indexed with 0 impressions, but they stay out of section A for the same nav reason.

| URL | Words | GSC status | Impressions (90d) | Clicks |
| --- | --- | --- | --- | --- |
| /es/contact | 108 | Submitted and indexed | 16 | 0 |
| /es/services | 98 | Submitted and indexed | 13 | 0 |
| /ja/contact | 53 | Submitted and indexed | 0 | 0 |
| /ja/services | 47 | Submitted and indexed | 2 | 0 |
| /ko/contact | 93 | Submitted and indexed | 2 | 0 |
| /ko/services | 88 | Discovered - currently not indexed | 0 | 0 |
| /ru/contact | 97 | Discovered - currently not indexed | 0 | 0 |
| /ru/services | 87 | Submitted and indexed | 1 | 0 |
| /zh/contact | 52 | Submitted and indexed | 2 | 0 |
| /zh/services | 44 | Submitted and indexed | 1 | 0 |

## D. Blocked with a 4xx at inspection (7 pages): no decision yet

Google last saw a 4xx on these. The site returned 402 (Vercel deployment disabled) on 15 Nov and again on 19 Nov, which is the likely cause. Recheck after production is back.

| URL | Words | GSC status | Impressions (90d) | Clicks |
| --- | --- | --- | --- | --- |
| /es/singapore | 3860 | Blocked due to other 4xx issue | 7 | 0 |
| /ja | 966 | Blocked due to other 4xx issue | 6 | 0 |
| /ja/korea | 2000 | Blocked due to other 4xx issue | 8 | 0 |
| /ko/singapore | 2484 | Blocked due to other 4xx issue | 0 | 0 |
| /ru/apac | 2981 | Blocked due to other 4xx issue | 7 | 0 |
| /ru/playbook/ai-startup-pr-agency-india-2026 | 2895 | Blocked due to other 4xx issue | 0 | 0 |
| /zh/blog/token2049-singapore-pr-playbook-earned-media | 887 | Blocked due to other 4xx issue | 0 | 0 |

## What applying section A would change

- Add `robots: noindex, follow` to those locale routes and drop them from the sitemap and hreflang sets.
- No URL is deleted or redirected. Easy to undo.
- Every page in section A has 0 impressions, so the rule about pages with 20 or more impressions is not touched.

## Questions for Shilika or Rahil

1. Approve section A as listed, or strike any rows?
2. Has anyone reviewed the ja, ko or zh pages by hand? The plan keeps only reviewed pages. If none are reviewed, the plan says noindex all of them until they are.
3. es and ru are not in the plan's keep list. Keep the indexed ones, or noindex both locales fully?
