# Shilika Jain - Web3 PR & Communications

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
