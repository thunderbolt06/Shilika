# AI crawler and AI referral logging

Added on 26 Nov 2026 (SEO 30d D20). Code: `middleware.ts` and `lib/ai-traffic.ts`.

## What gets logged

One JSON line per matching request, with `event: "ai_traffic"`.

- `kind: "crawler"`: the user agent contains GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, Claude-User, Claude-SearchBot, Google-Extended, Bingbot or Googlebot. `source` holds the crawler name.
- `kind: "referral"`: the referrer host, or `utm_source`, is chatgpt.com, chat.openai.com, perplexity.ai, gemini.google.com, claude.ai or copilot.microsoft.com. `source` holds the engine name.
- Each row also has `path`, plus `ua` (crawlers) or `refHost` (referrals). No IP address, cookie or query string is stored.

Crawler names come from the user agent only. Anyone can fake a user agent, so treat counts as a trend and not as proof of a verified bot.

## Where it goes

- Always to stdout, so it shows in Vercel runtime logs.
- To Axiom too when `AXIOM_TOKEN` and `AXIOM_DATASET` are set (same dataset as the app logs).

The log runs after the response through `waitUntil`, so a slow or failed log call cannot delay or break a page.

## What the middleware skips

`/_next/*`, `/api/*` (except the `/api/admin` gate), static assets by file extension, and router prefetches. `llms.txt`, `robots.txt` and `sitemap.xml` are logged on purpose.

## Weekly counts

Axiom APL:

```
['<dataset>']
| where event == "ai_traffic"
| summarize hits = count() by bin(_time, 7d), kind, source
```

Top pages for one source:

```
['<dataset>']
| where event == "ai_traffic" and source == "GPTBot"
| summarize hits = count() by path
| order by hits desc
```

Without Axiom, search Vercel runtime logs for `ai_traffic`. Vercel keeps logs for a short time only, so Axiom is the place for the day 30 baseline.
