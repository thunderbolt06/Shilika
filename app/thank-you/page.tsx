import type { Metadata } from 'next';
import { EditorialShell } from '@/components/site/EditorialChrome';
import { EditorialScripts } from '@/components/site/EditorialScripts';

// Landing spot for every contact action (see public/assets/conversions.js).
// Google Ads counts a visit here as the conversion, so it stays out of the
// index and the sitemap.
export const metadata: Metadata = {
  title: 'Thank you',
  description: 'What happens next after you reach out to Shilika Jain.',
  robots: { index: false, follow: false },
};

const CALENDLY = 'https://calendly.com/shilikajain/30min/';
const EMAIL = 'shilika498@gmail.com';
const TELEGRAM = 'https://t.me/shilika3';

type Via = 'form' | 'calendly' | 'booked' | 'telegram' | 'twitter' | 'linkedin' | 'email' | 'default';

type Step = { title: string; body: string };

type Variant = {
  kicker: string;
  title: React.ReactNode;
  lede: string;
  fallback?: { label: string; href: string };
  steps: Step[];
  prepTitle: string;
  prep: string[];
};

const PREP_BRIEF = [
  'What you are building, in one line, plus your website or deck.',
  'The moment you are working towards: TGE, raise, product launch, partnership or listing, and the date.',
  'Two or three outlets you would love to see your name in.',
  'Rough budget range and whether you need a one-off push or a monthly retainer.',
];

const VARIANTS: Record<Via, Variant> = {
  form: {
    kicker: 'BRIEF RECEIVED',
    title: (
      <>
        Your brief is <em>in.</em>
      </>
    ),
    lede: `Shilika reads every brief herself. Expect a personal reply from ${EMAIL} within 24 hours.`,
    steps: [
      { title: 'Within 24h', body: `A reply from ${EMAIL}. If it is not in your inbox, check Promotions or Spam and mark it as safe.` },
      { title: 'The reply', body: 'Either a few sharp questions about your launch, or a call link if there is enough to go on already.' },
      { title: 'On the call', body: 'A 30-minute teardown of your current press footprint, the story angles that can land, and a realistic outlet list.' },
      { title: 'After', body: 'A short written scope with timeline and pricing. One-off launches and monthly retainers are both on the table.' },
    ],
    prepTitle: 'Want to skip the back-and-forth?',
    prep: [
      'Grab a 30-minute slot now and the reply will confirm it.',
      'Reply to Shilika’s email with your deck or launch doc attached.',
      'Mention any hard dates, like an embargo, listing or announcement.',
    ],
  },
  calendly: {
    kicker: 'CALENDAR OPENED',
    title: (
      <>
        Pick a time that <em>works.</em>
      </>
    ),
    lede: 'Shilika’s calendar opened in a new tab. Choose a 30-minute slot and the invite lands in your inbox straight away.',
    fallback: { label: 'Calendar didn’t open? Book here', href: CALENDLY },
    steps: [
      { title: 'Pick a slot', body: 'Calendly shows every slot in your own timezone. Shilika is based in India (IST).' },
      { title: 'Instant invite', body: 'A calendar invite lands in your inbox as soon as you confirm.' },
      { title: 'On the call', body: 'A teardown of your current press footprint, the angles journalists will actually pick up, and which outlets are realistic.' },
      { title: 'After', body: 'A short written scope with timeline and pricing.' },
    ],
    prepTitle: 'To get the most out of 30 minutes',
    prep: PREP_BRIEF,
  },
  booked: {
    kicker: 'CALL BOOKED',
    title: (
      <>
        You’re <em>booked.</em>
      </>
    ),
    lede: 'The calendar invite is on its way to your inbox. Shilika will come prepped with a teardown of your current press footprint.',
    steps: [
      { title: 'Now', body: 'Check your inbox for the Calendly confirmation and add it to your calendar. Need to move it? Use the link in that email.' },
      { title: 'Before the call', body: 'Shilika reviews your site, socials and existing coverage so the 30 minutes goes on strategy, not introductions.' },
      { title: 'On the call', body: 'Story angles that can land, a realistic outlet list, and how a launch or retainer would run for your stage.' },
      { title: 'After', body: 'A short written scope with timeline and pricing.' },
    ],
    prepTitle: 'Send ahead if you can',
    prep: PREP_BRIEF,
  },
  telegram: {
    kicker: 'TELEGRAM',
    title: (
      <>
        Say hi on <em>Telegram.</em>
      </>
    ),
    lede: 'Telegram should be open with Shilika’s chat. She replies personally, usually within 24 hours.',
    fallback: { label: 'Telegram didn’t open? Message @shilika3', href: TELEGRAM },
    steps: [
      { title: 'Open with context', body: 'Your name, project, a link, and what you want to announce. One message beats “hi, are you there?”.' },
      { title: 'Reply', body: 'A personal reply from Shilika, usually within 24 hours. She works on India time (IST).' },
      { title: 'Next', body: 'If there is a fit, you will get a Calendly link for a 30-minute teardown call.' },
    ],
    prepTitle: 'Stay safe from impersonators',
    prep: [
      'Shilika’s only Telegram handle is @shilika3. Check the username, not the display name.',
      'She will never ask you to send funds, tokens or wallet access, or to “verify” anything.',
      'If someone else messages you claiming to be her, please report and block.',
    ],
  },
  twitter: {
    kicker: 'TWITTER / X',
    title: (
      <>
        Let’s talk on <em>X.</em>
      </>
    ),
    lede: 'Shilika’s profile opened in a new tab. Follow along, or send a DM with what you are building.',
    fallback: { label: 'Profile didn’t open? @Shilika_jain', href: 'https://x.com/Shilika_jain' },
    steps: [
      { title: 'DM with context', body: 'Your project, a link, and what you are launching.' },
      { title: 'Faster route', body: 'For anything time-sensitive, Telegram (@shilika3) or email is the quicker route.' },
      { title: 'Next', body: 'If there is a fit, you will get a link to a 30-minute teardown call.' },
    ],
    prepTitle: 'Watch out for fake accounts',
    prep: [
      'The only account is @Shilika_jain.',
      'Shilika will never ask for funds, tokens or wallet access in DMs.',
    ],
  },
  linkedin: {
    kicker: 'LINKEDIN',
    title: (
      <>
        Let’s <em>connect.</em>
      </>
    ),
    lede: 'Shilika’s LinkedIn opened in a new tab. Connect with a short note so she knows where you found her.',
    fallback: { label: 'Profile didn’t open? /in/shilika', href: 'https://www.linkedin.com/in/shilika/' },
    steps: [
      { title: 'Add a note', body: 'Your name, company and what you want to announce. Notes get accepted faster than blank requests.' },
      { title: 'Look around', body: 'Recommendations from founders and teams she has worked with are on the profile.' },
      { title: 'Next', body: 'For a faster reply, book a 30-minute call directly or message on Telegram.' },
    ],
    prepTitle: 'Useful to mention',
    prep: PREP_BRIEF,
  },
  email: {
    kicker: 'EMAIL',
    title: (
      <>
        Drop a <em>line.</em>
      </>
    ),
    lede: `Your mail app should be open. Send it to ${EMAIL} and expect a personal reply within 24 hours.`,
    fallback: { label: `Mail app didn’t open? Write to ${EMAIL}`, href: `mailto:${EMAIL}` },
    steps: [
      { title: 'Send', body: `Write to ${EMAIL}. A deck or launch doc attached saves a round of questions.` },
      { title: 'Within 24h', body: 'A personal reply, either with questions or with a call link.' },
      { title: 'Next', body: 'A 30-minute teardown call, then a short written scope with timeline and pricing.' },
    ],
    prepTitle: 'What to include',
    prep: PREP_BRIEF,
  },
  default: {
    kicker: 'THANK YOU',
    title: (
      <>
        Thanks for <em>reaching out.</em>
      </>
    ),
    lede: 'Shilika replies personally to every founder, usually within 24 hours.',
    steps: [
      { title: 'Reply', body: 'A personal reply within 24 hours, with questions or a call link.' },
      { title: 'Call', body: 'A 30-minute teardown of your current press footprint and the angles that can land.' },
      { title: 'Scope', body: 'A short written plan with timeline and pricing.' },
    ],
    prepTitle: 'Have these handy',
    prep: PREP_BRIEF,
  },
};

const CHANNELS = [
  { via: 'calendly', key: 'Book a call', val: '30-min teardown', href: CALENDLY },
  { via: 'telegram', key: 'Telegram', val: '@shilika3', href: TELEGRAM },
  { via: 'email', key: 'Email', val: EMAIL, href: `mailto:${EMAIL}` },
  { via: 'linkedin', key: 'LinkedIn', val: '/in/shilika', href: 'https://www.linkedin.com/in/shilika/' },
  { via: 'twitter', key: 'Twitter / X', val: '@Shilika_jain', href: 'https://x.com/Shilika_jain' },
];

const READING = [
  { href: '/work', label: 'Case studies', note: 'How launches were placed in Forbes, CoinDesk, Decrypt and more.' },
  { href: '/testimonials', label: 'Testimonials', note: 'What founders say after working together.' },
  { href: '/playbook', label: 'Playbooks', note: 'Field guides from inside Web3, AI and cyber PR.' },
  { href: '/services', label: 'Services', note: 'What a one-off launch or monthly retainer covers.' },
];

function isVia(v: string | undefined): v is Via {
  return !!v && v in VARIANTS;
}

// Only echo back same-site paths so ?from= can't become an open redirect.
function safeFrom(v: string | undefined): string | null {
  if (!v || !v.startsWith('/') || v.startsWith('//') || v.startsWith('/thank-you')) return null;
  return v;
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const rawVia = typeof sp.via === 'string' ? sp.via : undefined;
  const via: Via = isVia(rawVia) ? rawVia : 'default';
  const from = safeFrom(typeof sp.from === 'string' ? sp.from : undefined);
  const v = VARIANTS[via];
  const others = CHANNELS.filter((c) => c.via !== via && !(via === 'booked' && c.via === 'calendly'));

  return (
    <>
      <EditorialShell>
        <section className="contact ty" id="thank-you">
          <div className="contact-inner">
            <span className="kicker light">
              <span className="kicker-num">✓</span> {v.kicker}
            </span>
            <h1 className="contact-title ty-title">{v.title}</h1>
            <p className="ty-lede">{v.lede}</p>
            {v.fallback && (
              <a
                className="card-cta ty-fallback"
                href={v.fallback.href}
                target={v.fallback.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener"
              >
                {v.fallback.label} →
              </a>
            )}

            <h2 className="ty-h2">What happens next</h2>
            <ol className="ty-steps">
              {v.steps.map((s, i) => (
                <li key={s.title} className="ty-step">
                  <span className="ty-step-num mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ty-step-title">{s.title}</span>
                  <p className="ty-step-body">{s.body}</p>
                </li>
              ))}
            </ol>

            <div className="ty-grid">
              <div className="ty-card">
                <span className="card-label">{v.prepTitle.toUpperCase()}</span>
                <ul className="ty-list">
                  {v.prep.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {via === 'form' && (
                  <a className="card-cta" href={CALENDLY} target="_blank" rel="noopener">
                    Book a 30-min call →
                  </a>
                )}
              </div>

              <div className="ty-card">
                <span className="card-label">OTHER WAYS TO REACH SHILIKA</span>
                <div className="contact-channels">
                  {others.map((c) => (
                    <a
                      key={c.via}
                      href={c.href}
                      target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener"
                      className="channel"
                    >
                      <span className="channel-key">{c.key}</span>
                      <span className="channel-val">{c.val}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <h2 className="ty-h2">While you wait</h2>
            <div className="ty-reading">
              {READING.map((r) => (
                <a key={r.href} href={r.href} className="ty-read">
                  <span className="ty-read-label">{r.label} →</span>
                  <span className="ty-read-note">{r.note}</span>
                </a>
              ))}
            </div>

            <p className="ty-back mono">
              <a href={from ?? '/'}>← Back to {from ? 'where you were' : 'the homepage'}</a>
            </p>
          </div>
        </section>
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
