# Shilika Jain — Web3 PR & Communications

Editorial single-page site for Shilika Jain's fractional PR practice.

## Stack
- Static `index.html` + `styles.css` + `script.js`
- `/api/contact` — Vercel serverless function that relays the contact form to SendGrid

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
- `SENDGRID_API_KEY` — SendGrid API key
- `SENDER_EMAIL` — verified sender (default `shilika498@gmail.com`)
- `RECIPIENT_EMAIL` — inbox to receive briefs (default `shilika498@gmail.com`)
