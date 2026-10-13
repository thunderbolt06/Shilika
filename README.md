# Shilika Jain - Web3 PR & Communications


rm /Users/thunderbolt/Documents/projects/Shilika/.git/index.lock


Editorial single-page site for Shilika Jain's fractional PR practice.

## Stack
- Static `index.html` + `styles.css` + `script.js`
- `/api/contact` - Vercel serverless function that relays the contact form to SendGrid

## Local dev
```bash
npm i -g vercel
vercel dev
```


## Deploy
```bash
vercel --prod
```

## Required environment variables (set in Vercel dashboard)
- `SENDGRID_API_KEY` - SendGrid API key
- `SENDER_EMAIL` - verified sender (default `shilika498@gmail.com`)
- `RECIPIENT_EMAIL` - inbox to receive briefs (default `shilika498@gmail.com`)

## Analytics (PostHog, EU region)
PostHog is wired in via `assets/analytics.js` and loaded from every HTML page.

To activate it:
1. Create / open a project at https://eu.posthog.com.
2. Copy the **Project API Key** (starts with `phc_`).
3. Open `assets/analytics.js` and replace `phc_REPLACE_WITH_YOUR_POSTHOG_PROJECT_KEY` with that key.
4. Commit + deploy. Events captured:
   - Automatic pageviews + pageleaves + autocapture clicks
   - `contact_form_submit` on the contact form
   - `calendly_click` on Calendly links
   - `resume_click` on the bit.ly/shilikajain link

While the placeholder is still in place the snippet short-circuits and sends nothing.

## Server logs (PostHog Logs via OpenTelemetry)
Server-side logs from `/api/contact` ship to PostHog Logs (EU) through OTel.

- `api/_posthog-logs.js` initializes the OTLP exporter once per warm Lambda.
- `api/contact.js` emits structured log records for each inquiry: validation
  failures (`warn`), inbound submissions (`info`), SendGrid success (`info`),
  and any delivery / network errors (`error`).
- Each log carries attributes (`route`, `duration_ms`, name/email/company,
  `sendgrid_status`, etc.) and is force-flushed before the response returns,
  since Vercel may freeze the process immediately after.

Override the key at deploy time by setting `POSTHOG_PROJECT_KEY` in the
Vercel dashboard; otherwise the key in `_posthog-logs.js` is used.

## Translations (`/zh`, `/ko`, `/ja`, `/es`, `/ru`)
English stays at the root. The pages listed in `I18N_PAGES`
(`lib/i18n/config.ts`) also exist under a language subfolder, with `hreflang`
alternates on every version and in `sitemap.xml`. The nav's language switcher
links to the same page in the chosen language (or that language's homepage when
the current page is English-only).

Translations are not copies of the HTML. `app/[locale]/[[...path]]/page.tsx`
renders the English partial and swaps each text segment for its translation
from `app/_partials/i18n/<locale>/<key>.json`, keyed by a hash of the English
text. Edit the English and the affected segment falls back to English until it
is retranslated; markup and styling changes need no translation work at all.

- `pnpm i18n extract` - re-cut the English sources into `i18n/_source/`.
- `pnpm i18n check` - list missing / stale / broken segments per locale.
- `pnpm i18n prune` - drop translations whose English no longer exists.

To translate another page: add it to `I18N_PAGES`, add
`languages: languageAlternates('<path>')` to its English `alternates`, run
`pnpm i18n extract`, then translate the new `_source/<key>.json` into each
locale folder. Shared nav / footer strings live in `lib/i18n/ui.en.json`.
