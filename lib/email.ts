// Lead-notification email via the SendGrid v3 REST API.
//
// Uses fetch (no SDK dependency) so it runs on Vercel's Node runtime without an
// extra package. Requires two env vars:
//   SENDGRID_API_KEY  — a SendGrid API key with "Mail Send" permission
//   SENDGRID_FROM     — a sender address VERIFIED in SendGrid (Single Sender or
//                       a domain-authenticated address, e.g. no-reply@shilikajain.com)
// Optional:
//   LEAD_NOTIFY_TO    — where leads are delivered (defaults to shilika498@gmail.com)
//   LEAD_NOTIFY_CC    — comma-separated extra recipients (optional)

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

const LEAD_TO = process.env.LEAD_NOTIFY_TO || 'shilika498@gmail.com';
const FROM = process.env.SENDGRID_FROM || '';
const API_KEY = process.env.SENDGRID_API_KEY || '';

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
  return Boolean(API_KEY && FROM);
}

/** Send the lead notification. Throws on misconfiguration or a SendGrid error. */
export async function sendLeadEmail(p: LeadPayload): Promise<void> {
  if (!API_KEY || !FROM) {
    throw new Error(
      'Email not configured: set SENDGRID_API_KEY and SENDGRID_FROM (a verified sender).',
    );
  }

  const cc = (process.env.LEAD_NOTIFY_CC || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((email) => ({ email }));

  const subjectBits = ['New lead', p.service ? `· ${p.service}` : '', p.name ? `· ${p.name}` : ''];
  const subject = subjectBits.filter(Boolean).join(' ');

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

  const body = {
    personalizations: [
      {
        to: [{ email: LEAD_TO }],
        ...(cc.length ? { cc } : {}),
        subject,
      },
    ],
    from: { email: FROM, name: 'Shilika Jain Website' },
    reply_to: { email: p.email, name: p.name },
    content: [
      { type: 'text/plain', value: text },
      { type: 'text/html', value: html },
    ],
  };

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`SendGrid ${res.status}: ${detail.slice(0, 500)}`);
  }
}
