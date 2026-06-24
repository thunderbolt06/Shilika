// Lead-notification email via Brevo Transactional Email HTTP API.
// Uses the REST API instead of SMTP — no IP whitelisting needed (works on Vercel).
//
// Env vars:
//   BREVO_API_KEY     Your Brevo API key (Settings → API Keys)
//   BREVO_FROM_EMAIL  Verified sender email in Brevo (default: LEAD_NOTIFY_TO)
//   BREVO_FROM_NAME   Display name for the sender (default: "Shilika Jain Website")
//   LEAD_NOTIFY_TO    Where leads are delivered (default: shilika498@gmail.com)
//   LEAD_NOTIFY_CC    Optional comma-separated extra recipients

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

const API_KEY = process.env.BREVO_API_KEY || '';
const LEAD_TO = process.env.LEAD_NOTIFY_TO || 'shilika498@gmail.com';
const FROM_EMAIL = process.env.BREVO_FROM_EMAIL || LEAD_TO;
const FROM_NAME = process.env.BREVO_FROM_NAME || 'Shilika Jain Website';

export function isEmailConfigured(): boolean {
  return Boolean(API_KEY && FROM_EMAIL);
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
  if (!isEmailConfigured()) {
    throw new Error('Email not configured: set BREVO_API_KEY and BREVO_FROM_EMAIL.');
  }

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
    <p style="font:400 15px/1.6 system-ui;color:#1a1a1a;margin:0;white-space:pre-wrap;">${esc(p.message)}</p>
  </div>
  <p style="font:400 12px/1.5 system-ui;color:#9a9a9a;margin:18px 0 0;">Reply directly to this email to reach ${esc(p.name)}.</p>
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

  const cc = (process.env.LEAD_NOTIFY_CC || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((email) => ({ email }));

  const body = {
    sender: { name: FROM_NAME, email: FROM_EMAIL },
    to: [{ email: LEAD_TO }],
    ...(cc.length ? { cc } : {}),
    replyTo: { name: p.name, email: p.email },
    subject,
    htmlContent: html,
    textContent: text,
  };

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Brevo API error ${res.status}: ${detail}`);
  }
}
