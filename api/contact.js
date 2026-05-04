const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const SENDER_EMAIL = process.env.SENDER_EMAIL || 'shilika498@gmail.com';
  const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'shilika498@gmail.com';

  if (!SENDGRID_API_KEY) {
    res.status(500).json({ error: 'Email service not configured' });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { name = '', email = '', company = '', budget = '', message = '' } = body || {};

  if (!name.trim() || !email.trim() || !message.trim()) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Invalid email' });
    return;
  }

  const subject = `New brief from ${name}${company ? ' - ' + company : ''}`;
  const html = `
    <h2 style="font-family: Georgia, serif;">New inquiry via shilika.site</h2>
    <table style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
      <tr><td><b>Name:</b></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><b>Email:</b></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><b>Company:</b></td><td>${escapeHtml(company || '-')}</td></tr>
      <tr><td><b>Engagement:</b></td><td>${escapeHtml(budget)}</td></tr>
    </table>
    <h3 style="font-family: Georgia, serif; margin-top:20px;">Message</h3>
    <p style="font-family: Arial, sans-serif; font-size:14px; line-height:1.6; white-space:pre-wrap;">${escapeHtml(message)}</p>
  `;
  const text = `New inquiry via shilika.site\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || '-'}\nEngagement: ${budget}\n\nMessage:\n${message}`;

  const payload = {
    personalizations: [{ to: [{ email: RECIPIENT_EMAIL }], subject }],
    from: { email: SENDER_EMAIL, name: 'Shilika Site' },
    reply_to: { email, name },
    content: [
      { type: 'text/plain', value: text },
      { type: 'text/html', value: html }
    ]
  };

  try {
    const sg = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + SENDGRID_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (sg.status === 202 || sg.ok) {
      res.status(200).json({ ok: true });
    } else {
      const errText = await sg.text();
      console.error('SendGrid error:', sg.status, errText);
      res.status(502).json({ error: 'Email delivery failed' });
    }
  } catch (err) {
    console.error('SendGrid fetch error', err);
    res.status(500).json({ error: 'Server error' });
  }
}
