'use client';

import { useId, useMemo, useState } from 'react';
import { CopyButton, useToolResult, Verdict } from '../kit';
import './everyday.css';

type Tab = 'ig-bio' | 'li-headline' | 'li-about' | 'caption';
type Tone = 'professional' | 'friendly' | 'bold' | 'playful';
type Format = 'tip' | 'story' | 'announcement' | 'question';
type CapPlatform = 'instagram' | 'linkedin';

const TABS: { id: Tab; label: string }[] = [
  { id: 'ig-bio', label: 'Instagram bio' },
  { id: 'li-headline', label: 'LinkedIn headline' },
  { id: 'li-about', label: 'LinkedIn About' },
  { id: 'caption', label: 'Caption' },
];

const TONES: Record<Tone, { label: string; emoji: [string, string, string]; close: string }> = {
  professional: { label: 'Professional', emoji: ['📈', '🤝', '👇'], close: 'Open to new projects.' },
  friendly: { label: 'Friendly', emoji: ['👋', '✨', '👇'], close: 'Always happy to chat.' },
  bold: { label: 'Bold', emoji: ['⚡', '🔥', '👉'], close: 'No fluff. Just results.' },
  playful: { label: 'Playful', emoji: ['🎈', '☕', '👇'], close: 'Powered by coffee and good questions.' },
};

const SHOW = 5;

type In = {
  name: string;
  first: string;
  role: string;
  roleLc: string;
  aRole: string;
  who: string;
  Who: string;
  outcome: string;
  Outcome: string;
  proof: string;
  Proof: string;
  cta: string;
  ctaLine: string;
  e: (i: 0 | 1 | 2) => string;
  tone: Tone;
};

const clean = (s: string) => s.trim().replace(/\s+/g, ' ').replace(/[.\s]+$/, '');
const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const lowerFirst = (s: string) => (s.length > 1 && /[a-z]/.test(s.charAt(1)) ? s.charAt(0).toLowerCase() + s.slice(1) : s);
const sentence = (s: string) => (s ? (/[.!?]$/.test(s) ? s : `${s}.`) : s);

// ---------- templates ----------

const IG_BIO: ((x: In) => string)[] = [
  (x) => [`${x.e(0)}${x.role} for ${x.who}`, `${x.e(1)}${x.Outcome}`, `${x.e(2)}${x.cta}`].join('\n'),
  (x) => [`Helping ${x.who} ${x.outcome}`, `${x.Proof} and counting`, `${x.e(2)}${x.cta}`].join('\n'),
  (x) => [`${x.e(0)}${x.Outcome}. That's the job.`, `${x.role} | ${x.Proof}`, `${x.e(2)}${x.cta}`].join('\n'),
  (x) => [`${x.name} | ${x.role}`, `For ${x.who} who want to ${x.outcome}`, `${x.e(2)}${x.cta}`].join('\n'),
  (x) => [`${x.e(1)}${x.Proof} for ${x.who}`, 'Yours could be next', `${x.e(2)}${x.cta}`].join('\n'),
  (x) => [`${x.role}. ${x.Who}.`, `${x.Outcome}, minus the guesswork`, `${x.e(2)}${x.cta}`].join('\n'),
  (x) => [`Part ${x.roleLc}, part hype person for ${x.who} ${x.e(1).trim()}`.trim(), x.Proof, `${x.e(2)}${x.cta}`].join('\n'),
];

const LI_HEADLINE: ((x: In) => string)[] = [
  (x) => `${x.role} for ${x.who} | ${x.Outcome} | ${x.Proof}`,
  (x) => `I help ${x.who} ${x.outcome} | ${x.role} | ${x.Proof}`,
  (x) => `${x.role} | Helping ${x.who} ${x.outcome} (${x.proof})`,
  (x) => `${x.Who} hire me to ${x.outcome}. ${x.Proof}.`,
  (x) => `${x.Outcome} for ${x.who} | ${x.role} | ${x.cta}`,
  (x) => `Part ${x.roleLc}, part hype person for ${x.who} | ${x.Proof}`,
  (x) => `${x.role} · ${x.Proof} · I help ${x.who} ${x.outcome}`,
];

const LI_ABOUT: ((x: In) => string)[] = [
  (x) =>
    [
      `I'm ${x.name}, ${x.aRole} for ${x.who}.`,
      `My job is simple: help you ${x.outcome}.`,
      `So far that has meant ${x.proof}. The work usually looks like this:`,
      '• Getting clear on what matters most right now\n• Turning it into a plan with owners and dates\n• Measuring what works and dropping what does not',
      x.ctaLine,
    ].join('\n\n'),
  (x) =>
    [
      `${x.Who} come to me when they need to ${x.outcome}.`,
      `I'm ${x.first}, and I've spent my career as ${x.aRole}. Proof so far: ${x.proof}.`,
      'What you can expect when we work together:\n• Straight answers, even the uncomfortable ones\n• A plan you can run without me in the room\n• Progress you can see within weeks, not quarters',
      x.ctaLine,
    ].join('\n\n'),
  (x) =>
    [
      `${x.Outcome}. That's what I do for ${x.who}.`,
      `${x.Proof}. No decks for the sake of decks, no vague strategy. Clear priorities, quick execution, honest numbers.`,
      `If that sounds like what you need, ${lowerFirst(x.ctaLine)}`,
    ].join('\n\n'),
  (x) =>
    [
      `Hi, I'm ${x.first}${x.e(0) ? ' ' + x.e(0).trim() : ''}`,
      `I work with ${x.who} as ${x.aRole}. Most of my week goes into helping teams ${x.outcome}.`,
      `A few things about me:\n• ${x.Proof}\n• I reply to every message\n• I'd rather show you than tell you`,
      x.ctaLine,
    ].join('\n\n'),
  (x) =>
    [
      `Short version: I'm ${x.name}, ${x.roleLc} for ${x.who}, with ${x.proof} behind me.`,
      `Longer version: I love the messy early stage, when nothing is set in stone and every week counts. That's where I help teams ${x.outcome}.`,
      `${TONES[x.tone].close}`,
      x.ctaLine,
    ].join('\n\n'),
  (x) =>
    [
      `What I do: help ${x.who} ${x.outcome}.`,
      `How I do it: as a hands-on ${x.roleLc}, in the work with you, not watching from the side.`,
      `Why it works: ${x.proof}, and the lessons that came with them.`,
      x.ctaLine,
    ].join('\n\n'),
];

const HOOKS: Record<Format, ((t: string) => string)[]> = {
  tip: [
    (t) => `One tip on ${t} I wish I'd known sooner:`,
    (t) => `Stop overthinking ${t}.`,
    (t) => `The simplest fix I know for ${t}:`,
    (t) => `If you find ${t} hard right now, try this.`,
    (t) => `${cap(t)}: simpler than you think.`,
  ],
  story: [
    (t) => `Last year I got ${t} completely wrong.`,
    (t) => `A quick story about ${t}.`,
    (t) => `I almost gave up on ${t}. Then this happened.`,
    (t) => `Nobody told me this about ${t}.`,
    (t) => `The lesson on ${t} that cost me the most:`,
  ],
  announcement: [
    (t) => `Some news: ${t}.`,
    (t) => `It's finally here. ${cap(t)}.`,
    (t) => `We've been quietly working on ${t}. Today it's live.`,
    () => `Something I've been waiting months to share.`,
    (t) => `New chapter: ${t}.`,
  ],
  question: [
    (t) => `Honest question about ${t}:`,
    (t) => `What's your take on ${t}?`,
    (t) => `Am I the only one who sees ${t} this way?`,
    (t) => `Quick one for anyone working on ${t}:`,
    (t) => `Unpopular opinion on ${t}?`,
  ],
};

const BODIES: Record<Format, ((k: string) => string)[]> = {
  tip: [
    (k) => `${cap(k)}.\n\nIt sounds small, but it is the step most people skip.`,
    (k) => `Do this first: ${lowerFirst(k)}.\n\nEverything else gets easier after that.`,
  ],
  story: [
    (k) => `What I learned the hard way: ${lowerFirst(k)}.\n\nIt took me longer than it should have. Hopefully this saves you the time.`,
    (k) => `The short version? ${cap(k)}.\n\nI still think about it every week.`,
  ],
  announcement: [
    (k) => `${cap(k)}.\n\nThank you to everyone who helped us get here.`,
    (k) => `In short: ${lowerFirst(k)}.\n\nThis is only the start.`,
  ],
  question: [
    (k) => `My view: ${lowerFirst(k)}.\n\nBut I could be wrong, and I'd like to hear yours.`,
    (k) => `I keep coming back to this: ${lowerFirst(k)}.\n\nAgree or disagree?`,
  ],
};

const CTAS: Record<CapPlatform, ((t: string, cta: string) => string)[]> = {
  instagram: [
    () => 'Save this for later.',
    () => 'Send this to a friend who needs it.',
    (_t, cta) => sentence(cta),
    (t) => `Follow for more on ${t}.`,
    () => 'Tell me in the comments.',
  ],
  linkedin: [
    () => 'What would you add?',
    () => 'Repost if this is useful to your network.',
    (_t, cta) => sentence(cta),
    (t) => `Follow me for more on ${t}.`,
    () => 'Comments are open. I read every one.',
  ],
};

const LIMITS: Record<Tab, number> = { 'ig-bio': 150, 'li-headline': 220, 'li-about': 2600, caption: 2200 };

function rotate<T>(arr: T[], start: number, n: number): { item: T; idx: number }[] {
  const out: { item: T; idx: number }[] = [];
  for (let i = 0; i < Math.min(n, arr.length); i++) {
    const idx = (start + i) % arr.length;
    out.push({ item: arr[idx], idx });
  }
  return out;
}

export default function BioCaptionGenerator() {
  const id = useId();
  const [tab, setTab] = useState<Tab>('ig-bio');
  const [name, setName] = useState('Maya Chen');
  const [role, setRole] = useState('Fractional CMO');
  const [who, setWho] = useState('seed-stage AI startups');
  const [outcome, setOutcome] = useState('turn launches into pipeline');
  const [proof, setProof] = useState('40+ product launches');
  const [cta, setCta] = useState("DM 'launch' for my GTM checklist");
  const [tone, setTone] = useState<Tone>('friendly');
  const [emoji, setEmoji] = useState(true);
  const [capPlatform, setCapPlatform] = useState<CapPlatform>('linkedin');
  const [topic, setTopic] = useState('product launches');
  const [keyPoint, setKeyPoint] = useState('pick one audience and write every message for them');
  const [format, setFormat] = useState<Format>('tip');
  const [cycle, setCycle] = useState(0);

  const x: In = useMemo(() => {
    const n = clean(name) || 'Your Name';
    const r = clean(role) || 'Consultant';
    const w = clean(who) || 'founders';
    const o = clean(outcome) || 'grow faster';
    const p = clean(proof) || '10 years in the field';
    const c = clean(cta) || 'Message me';
    const set = TONES[tone].emoji;
    return {
      name: n,
      first: n.split(' ')[0],
      role: r,
      roleLc: lowerFirst(r),
      aRole: `${/^[aeiou]/i.test(r) ? 'an' : 'a'} ${lowerFirst(r)}`,
      who: w,
      Who: cap(w),
      outcome: o,
      Outcome: cap(o),
      proof: p,
      Proof: cap(p),
      cta: c,
      ctaLine: clean(cta) ? sentence(cap(c)) : 'Send me a message here on LinkedIn.',
      e: (i) => (emoji ? `${set[i]} ` : ''),
      tone,
    };
  }, [name, role, who, outcome, proof, cta, tone, emoji]);

  // Tone picks which template leads, so each personality gets a different first suggestion.
  const toneOffset = { professional: 0, friendly: 1, bold: 2, playful: 3 }[tone];

  const variants = useMemo(() => {
    if (tab === 'caption') {
      const t = clean(topic) || 'marketing';
      const k = clean(keyPoint) || 'start before you feel ready';
      const hooks = HOOKS[format];
      const bodies = BODIES[format];
      const ctas = CTAS[capPlatform];
      const set = TONES[tone].emoji;
      const out: string[] = [];
      for (let i = 0; i < SHOW; i++) {
        const j = i + cycle * SHOW;
        const hook = hooks[j % hooks.length](t);
        const body = bodies[(j + Math.floor(j / hooks.length)) % bodies.length](k);
        const close = ctas[(j + toneOffset) % ctas.length](t, clean(cta) || 'Follow for more');
        const lead = emoji && capPlatform === 'instagram' ? ` ${set[i % 2]}` : '';
        out.push(`${hook}${lead}\n\n${body}\n\n${close}${emoji && capPlatform === 'instagram' ? ` ${set[2]}` : ''}`);
      }
      return out;
    }
    const list = tab === 'ig-bio' ? IG_BIO : tab === 'li-headline' ? LI_HEADLINE : LI_ABOUT;
    const start = (toneOffset + cycle * SHOW) % list.length;
    return rotate(list, start, SHOW).map(({ item }) => item(x));
  }, [tab, x, cycle, toneOffset, topic, keyPoint, format, capPlatform, tone, emoji, cta]);

  const limit = tab === 'caption' && capPlatform === 'linkedin' ? 3000 : LIMITS[tab];
  const tabLabel = tab === 'caption' ? `${capPlatform === 'linkedin' ? 'LinkedIn' : 'Instagram'} caption` : TABS.find((t) => t.id === tab)!.label;

  const result = variants.length ? [`${tabLabel} options:`, ...variants.map((v, i) => `\nOption ${i + 1}\n${v}`)].join('\n') : '';
  useToolResult(result);

  const len = (s: string) => Array.from(s).length;

  return (
    <div className="ft-grid">
      <div className="ft-card">
        <div className="ft-tabs" role="group" aria-label="What to write">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={tab === t.id}
              onClick={() => {
                setTab(t.id);
                setCycle(0);
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'caption' ? (
          <>
            <div className="ft-row">
              <div className="ft-field">
                <label htmlFor={`${id}-cp`}>Platform</label>
                <select id={`${id}-cp`} value={capPlatform} onChange={(e) => setCapPlatform(e.target.value as CapPlatform)}>
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram</option>
                </select>
              </div>
              <div className="ft-field">
                <label htmlFor={`${id}-fmt`}>Format</label>
                <select id={`${id}-fmt`} value={format} onChange={(e) => setFormat(e.target.value as Format)}>
                  <option value="tip">Tip</option>
                  <option value="story">Story</option>
                  <option value="announcement">Announcement</option>
                  <option value="question">Question</option>
                </select>
              </div>
            </div>
            <div className="ft-field">
              <label htmlFor={`${id}-topic`}>Topic</label>
              <input id={`${id}-topic`} value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="product launches" />
            </div>
            <div className="ft-field">
              <label htmlFor={`${id}-kp`}>Key point</label>
              <textarea id={`${id}-kp`} value={keyPoint} onChange={(e) => setKeyPoint(e.target.value)} rows={2} />
            </div>
          </>
        ) : (
          <>
            <div className="ft-row">
              <div className="ft-field">
                <label htmlFor={`${id}-name`}>Name</label>
                <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
              </div>
              <div className="ft-field">
                <label htmlFor={`${id}-role`}>Role or what you do</label>
                <input id={`${id}-role`} value={role} onChange={(e) => setRole(e.target.value)} />
              </div>
            </div>
            <div className="ft-field">
              <label htmlFor={`${id}-who`}>Who you help</label>
              <input id={`${id}-who`} value={who} onChange={(e) => setWho(e.target.value)} placeholder="seed-stage AI startups" />
            </div>
            <div className="ft-field">
              <label htmlFor={`${id}-out`}>What you help them do</label>
              <input id={`${id}-out`} value={outcome} onChange={(e) => setOutcome(e.target.value)} placeholder="turn launches into pipeline" />
            </div>
            <div className="ft-field">
              <label htmlFor={`${id}-proof`}>Result or proof</label>
              <input id={`${id}-proof`} value={proof} onChange={(e) => setProof(e.target.value)} placeholder="50+ launches" />
            </div>
          </>
        )}

        <div className="ft-field">
          <label htmlFor={`${id}-cta`}>Call to action</label>
          <input id={`${id}-cta`} value={cta} onChange={(e) => setCta(e.target.value)} placeholder="DM 'launch' or link below" />
        </div>
        <div className="ft-field">
          <span id={`${id}-tone`}>Personality</span>
          <div className="ft-tabs" role="group" aria-labelledby={`${id}-tone`}>
            {(Object.keys(TONES) as Tone[]).map((t) => (
              <button key={t} type="button" aria-pressed={tone === t} onClick={() => setTone(t)}>
                {TONES[t].label}
              </button>
            ))}
          </div>
        </div>
        <label className="ft-check">
          <input type="checkbox" checked={emoji} onChange={(e) => setEmoji(e.target.checked)} />
          Use emoji
        </label>
      </div>

      <div className="ft-stack" aria-live="polite">
        {variants.map((v, i) => {
          const n = len(v);
          return (
            <div key={i} className="ft-card ev-variant">
              <div className="ev-variant-top">
                <span className="ft-label">Option {i + 1}</span>
                <Verdict level={n > limit ? 'bad' : n > limit * 0.9 ? 'warn' : 'good'}>
                  {n} / {limit.toLocaleString('en-US')}
                </Verdict>
              </div>
              <p className="ft-prose ev-variant-text">{v}</p>
              <div className="ft-actions">
                <CopyButton text={v} />
              </div>
            </div>
          );
        })}
        <div className="ft-actions">
          <button type="button" className="tool-btn tool-btn-primary" onClick={() => setCycle((c) => c + 1)}>
            More variants
          </button>
          <CopyButton text={variants.join('\n\n')} label="Copy all" />
        </div>
      </div>
    </div>
  );
}
