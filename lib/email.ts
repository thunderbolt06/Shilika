// Transactional email (lead notifications + free-tool results).
//
// Delivery order - each configured provider is tried until one succeeds:
//   1. Google Workspace SMTP (primary)
//   2. Brevo HTTP API        (backup, if BREVO_API_KEY is set)
//   3. Brevo SMTP relay      (backup, if BREVO_SMTP_USER/PASS are set)
//
// Env vars:
//   GOOGLE_SMTP_USER  Workspace mailbox to send from (e.g. hi@shilikajain.com)
//   GOOGLE_SMTP_PASS  16-char Google App Password for that mailbox (needs 2-Step Verification)
//   GOOGLE_SMTP_FROM  Optional From address (default: GOOGLE_SMTP_USER; must be the user or a verified alias)
//   BREVO_API_KEY     Brevo API key (Settings → API Keys, starts with xkeysib-)
//   BREVO_SMTP_HOST   Brevo SMTP host (default: smtp-relay.brevo.com)
//   BREVO_SMTP_PORT   Brevo SMTP port (default: 587)
//   BREVO_SMTP_USER   Brevo SMTP login
//   BREVO_SMTP_PASS   Brevo SMTP key (starts with xsmtpsib-)
//   BREVO_FROM        Verified sender email in Brevo (BREVO_FROM_EMAIL also accepted)
//   EMAIL_FROM_NAME   Display name for the sender (default: "Shilika Jain"; BREVO_FROM_NAME also accepted)
//   LEAD_NOTIFY_TO    Comma-separated lead recipients (default: shilika498@gmail.com)
//   LEAD_NOTIFY_CC    Optional comma-separated extra recipients

import nodemailer, { type Transporter } from 'nodemailer';

export type LeadPayload = {
  name: string;
  email: string;
  company?: string;
  service?: string;
  stage?: string;
  timeline?: string;
  budget?: string;
  region?: string;
  message: string;
  source?: string;
};

const splitList = (s?: string) =>
  (s || '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);

const LEAD_TO = splitList(process.env.LEAD_NOTIFY_TO || 'shilika498@gmail.com');
const LEAD_CC = splitList(process.env.LEAD_NOTIFY_CC);
const FROM_NAME = process.env.EMAIL_FROM_NAME || process.env.BREVO_FROM_NAME || 'Shilika Jain Website';

const GOOGLE_USER = process.env.GOOGLE_SMTP_USER || '';
const GOOGLE_PASS = (process.env.GOOGLE_SMTP_PASS || '').replace(/\s+/g, '');
const GOOGLE_FROM = process.env.GOOGLE_SMTP_FROM || GOOGLE_USER;

const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const BREVO_SMTP_HOST = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
const BREVO_SMTP_PORT = Number(process.env.BREVO_SMTP_PORT || 587);
const BREVO_SMTP_USER = process.env.BREVO_SMTP_USER || '';
const BREVO_SMTP_PASS = process.env.BREVO_SMTP_PASS || '';
const BREVO_FROM = process.env.BREVO_FROM || process.env.BREVO_FROM_EMAIL || LEAD_TO[0];

type Mail = {
  to: string[];
  cc?: string[];
  replyTo: { name: string; email: string };
  subject: string;
  html: string;
  text: string;
};

type Provider = { name: string; send: (m: Mail) => Promise<void> };

let googleTransport: Transporter | undefined;
let brevoTransport: Transporter | undefined;

function sendViaSmtp(transport: Transporter, fromEmail: string, m: Mail) {
  return transport.sendMail({
    from: { name: FROM_NAME, address: fromEmail },
    to: m.to,
    cc: m.cc?.length ? m.cc : undefined,
    replyTo: { name: m.replyTo.name, address: m.replyTo.email },
    subject: m.subject,
    html: m.html,
    text: m.text,
  });
}

async function sendViaBrevoApi(m: Mail) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: { name: FROM_NAME, email: BREVO_FROM },
      to: m.to.map((email) => ({ email })),
      ...(m.cc?.length ? { cc: m.cc.map((email) => ({ email })) } : {}),
      replyTo: m.replyTo,
      subject: m.subject,
      htmlContent: m.html,
      textContent: m.text,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Brevo API error ${res.status}: ${detail}`);
  }
}

function providers(): Provider[] {
  const list: Provider[] = [];
  if (GOOGLE_USER && GOOGLE_PASS) {
    list.push({
      name: 'google-smtp',
      send: async (m) => {
        googleTransport ??= nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: { user: GOOGLE_USER, pass: GOOGLE_PASS },
        });
        await sendViaSmtp(googleTransport, GOOGLE_FROM, m);
      },
    });
  }
  if (BREVO_API_KEY && BREVO_FROM) {
    list.push({ name: 'brevo-api', send: sendViaBrevoApi });
  }
  if (BREVO_SMTP_USER && BREVO_SMTP_PASS && BREVO_FROM) {
    list.push({
      name: 'brevo-smtp',
      send: async (m) => {
        brevoTransport ??= nodemailer.createTransport({
          host: BREVO_SMTP_HOST,
          port: BREVO_SMTP_PORT,
          secure: BREVO_SMTP_PORT === 465,
          auth: { user: BREVO_SMTP_USER, pass: BREVO_SMTP_PASS },
        });
        await sendViaSmtp(brevoTransport, BREVO_FROM, m);
      },
    });
  }
  return list;
}

export function isEmailConfigured(): boolean {
  return providers().length > 0;
}

// Tries each configured provider in order; throws only if all of them fail.
async function deliver(m: Mail): Promise<void> {
  const list = providers();
  if (!list.length) {
    throw new Error('Email not configured: set GOOGLE_SMTP_USER/GOOGLE_SMTP_PASS or Brevo credentials.');
  }
  const errors: string[] = [];
  for (const p of list) {
    try {
      await p.send(m);
      if (errors.length) console.warn(`[email] sent via fallback ${p.name} after: ${errors.join(' | ')}`);
      return;
    } catch (err) {
      errors.push(`${p.name}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  throw new Error(`All email providers failed - ${errors.join(' | ')}`);
}

function esc(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function row(label: string, value?: string): string {
  if (!value) return '';
  return `<tr><td style="padding:6px 14px 6px 0;color:#6b6b6b;font:500 13px/1.4 system-ui;vertical-align:top;white-space:nowrap;">${esc(
    label,
  )}</td><td style="padding:6px 0;color:#1a1a1a;font:400 14px/1.5 system-ui;">${esc(value)}</td></tr>`;
}

export async function sendLeadEmail(p: LeadPayload): Promise<void> {
  const subject = ['New lead', p.service ? `· ${p.service}` : '', p.name ? `· ${p.name}` : '']
    .filter(Boolean)
    .join(' ');

  const html = `<div style="max-width:560px;margin:0 auto;font-family:system-ui,sans-serif;">
  <p style="font:600 12px/1 system-ui;letter-spacing:.12em;text-transform:uppercase;color:#7aa800;margin:0 0 6px;">Shilika Jain · new enquiry</p>
  <h2 style="font:400 26px/1.1 Georgia,serif;color:#1a1a1a;margin:0 0 4px;">${esc(p.name)}${
    p.company ? ` <span style="color:#9a9a9a;">- ${esc(p.company)}</span>` : ''
  }</h2>
  <table style="border-collapse:collapse;margin:14px 0 18px;">
    ${row('Email', p.email)}
    ${row('Company', p.company)}
    ${row('Service', p.service)}
    ${row('Project stage', p.stage)}
    ${row('Timeline', p.timeline)}
    ${row('Budget', p.budget)}
    ${row('Region / markets', p.region)}
    ${row('Came from', p.source)}
  </table>
  <div style="border-left:3px solid #d4ff32;padding:10px 16px;background:#f6f6f1;border-radius:4px;">
    <p style="font:600 11px/1 system-ui;letter-spacing:.1em;text-transform:uppercase;color:#9a9a9a;margin:0 0 8px;">Message</p>
    <p style="font:400 15px/1.6 system-ui;color:#1a1a1a;margin:0;white-space:pre-wrap;">${esc(p.message)}</p>
  </div>
  <p style="font:400 12px/1.5 system-ui;color:#9a9a9a;margin:18px 0 0;">Reply directly to this email to reach ${esc(p.name)}.</p>
</div>`;

  const text = [
    `New lead${p.service ? ` - ${p.service}` : ''}`,
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    p.company ? `Company: ${p.company}` : '',
    p.stage ? `Stage: ${p.stage}` : '',
    p.timeline ? `Timeline: ${p.timeline}` : '',
    p.budget ? `Budget: ${p.budget}` : '',
    p.region ? `Region: ${p.region}` : '',
    p.source ? `Came from: ${p.source}` : '',
    '',
    'Message:',
    p.message,
  ]
    .filter(Boolean)
    .join('\n');

  await deliver({
    to: LEAD_TO,
    cc: LEAD_CC,
    replyTo: { name: p.name, email: p.email },
    subject,
    html,
    text,
  });
}

// Sends a free-tool result to the visitor who asked for it on /tools/[slug].
export async function sendToolResultEmail(p: {
  to: string;
  toolName: string;
  toolUrl: string;
  result: string;
}): Promise<void> {
  const calendly = 'https://calendly.com/shilikajain/30min/';
  const hasResult = p.result.trim().length > 0;
  const subject = hasResult ? `Your ${p.toolName} result` : `You're on the list for new free tools`;

  const html = `<div style="max-width:600px;margin:0 auto;font-family:system-ui,sans-serif;color:#1a1a1a;">
  <p style="font:600 12px/1 system-ui;letter-spacing:.12em;text-transform:uppercase;color:#7aa800;margin:0 0 8px;">Shilika Jain · free tools</p>
  <h2 style="font:400 26px/1.15 Georgia,serif;margin:0 0 14px;">${esc(hasResult ? `Your ${p.toolName} result` : 'Thanks for signing up')}</h2>
  ${
    hasResult
      ? `<pre style="font:13px/1.6 ui-monospace,Menlo,monospace;background:#f6f6f1;border-radius:8px;padding:16px;white-space:pre-wrap;word-break:break-word;margin:0 0 18px;">${esc(p.result)}</pre>`
      : `<p style="font:400 15px/1.6 system-ui;margin:0 0 18px;">I'll email you when new free tools go live. Roughly once a month, never more.</p>`
  }
  <p style="font:400 15px/1.6 system-ui;margin:0 0 6px;">Run it again any time: <a href="${esc(p.toolUrl)}" style="color:#1a1a1a;">${esc(p.toolUrl)}</a></p>
  <p style="font:400 15px/1.6 system-ui;margin:0 0 18px;">Want a second pair of eyes on your launch or PR plan? <a href="${calendly}" style="color:#1a1a1a;">Book a free 30-minute teardown</a>.</p>
  <p style="font:400 12px/1.5 system-ui;color:#9a9a9a;margin:0;">You got this because you asked for it on shilikajain.com. Reply "unsubscribe" and you won't hear from me again.</p>
</div>`;

  const text = [
    hasResult ? `Your ${p.toolName} result` : 'Thanks for signing up for new free tools.',
    '',
    hasResult ? p.result : '',
    '',
    `Run it again: ${p.toolUrl}`,
    `Book a free 30-minute teardown: ${calendly}`,
    '',
    'Reply "unsubscribe" to stop hearing from me.',
  ].join('\n');

  await deliver({
    to: [p.to],
    replyTo: { name: 'Shilika Jain', email: GOOGLE_FROM || LEAD_TO[0] },
    subject,
    html,
    text,
  });
}
