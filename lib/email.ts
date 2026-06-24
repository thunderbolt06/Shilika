// Lead-notification email via Brevo (Sendinblue) SMTP, using nodemailer.
//
// Env vars (set in .env.local and on Vercel):
//   BREVO_SMTP_HOST   default smtp-relay.brevo.com
//   BREVO_SMTP_PORT   default 587
//   BREVO_SMTP_USER   the Brevo SMTP login (e.g. afaf5f001@smtp-brevo.com)
//   BREVO_SMTP_PASS   the Brevo SMTP key/password
//   BREVO_FROM        a sender VERIFIED in Brevo (Senders & IPs). Defaults to
//                     LEAD_NOTIFY_TO so a single verified Gmail works out of the box.
//   LEAD_NOTIFY_TO    where leads are delivered (default shilika498@gmail.com)
//   LEAD_NOTIFY_CC    optional comma-separated extra recipients
//
// Runs only on the Node.js runtime (SMTP is not available on the edge).

import nodemailer from 'nodemailer';

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
  source?: string; // page path / slug the lead came from
};

const HOST = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
const PORT = Number(process.env.BREVO_SMTP_PORT || 587);
const USER = process.env.BREVO_SMTP_USER || '';
const PASS = process.env.BREVO_SMTP_PASS || '';
const LEAD_TO = process.env.LEAD_NOTIFY_TO || 'shilika498@gmail.com';
const FROM = process.env.BREVO_FROM || LEAD_TO;

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

export function isEmailConfigured(): boolean {
  return Boolean(USER && PASS && FROM);
}

let cachedTransport: nodemailer.Transporter | null = null;
function transport(): nodemailer.Transporter {
  if (!cachedTransport) {
    cachedTransport = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      secure: PORT === 465, // 587 uses STARTTLS
      auth: { user: USER, pass: PASS },
    });
  }
  return cachedTransport;
}

/** Send the lead notification. Throws on misconfiguration or an SMTP error. */
export async function sendLeadEmail(p: LeadPayload): Promise<void> {
  if (!isEmailConfigured()) {
    throw new Error('Email not configured: set BREVO_SMTP_USER, BREVO_SMTP_PASS and BREVO_FROM.');
  }

  const cc = (process.env.LEAD_NOTIFY_CC || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const subject = ['New lead', p.service ? `· ${p.service}` : '', p.name ? `· ${p.name}` : '']
    .filter(Boolean)
    .join(' ');

  const html = `<div style="max-width:560px;margin:0 auto;font-family:system-ui,sans-serif;">
  <p style="font:600 12px/1 system-ui;letter-spacing:.12em;text-transform:uppercase;color:#7aa800;margin:0 0 6px;">Shilika Jain · new enquiry</p>
  <h2 style="font:400 26px/1.1 Georgia,serif;color:#1a1a1a;margin:0 0 4px;">${esc(p.name)}${
    p.company ? ` <span style="color:#9a9a9a;">— ${esc(p.company)}</span>` : ''
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
    <p style="font:400 15px/1.6 system-ui;color:#1a1a1a;margin:0;white-space:pre-wrap;">${esc(
      p.message,
    )}</p>
  </div>
  <p style="font:400 12px/1.5 system-ui;color:#9a9a9a;margin:18px 0 0;">Reply directly to this email to reach ${esc(
    p.name,
  )}.</p>
</div>`;

  const text = [
    `New lead${p.service ? ` — ${p.service}` : ''}`,
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

  await transport().sendMail({
    from: { name: 'Shilika Jain Website', address: FROM },
    to: LEAD_TO,
    cc: cc.length ? cc : undefined,
    replyTo: { name: p.name, address: p.email },
    subject,
    text,
    html,
  });
}
