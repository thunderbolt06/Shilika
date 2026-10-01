'use client';

import { useId, useMemo, useState, type ReactNode } from 'react';
import { CopyButton, Score, useToolResult, Verdict } from '../kit';
import './everyday.css';

type Cat = 'Urgency' | 'Money' | 'Too good' | 'Shady' | 'Overpromise';

const SPAM: Record<Cat, string> = {
  Urgency: `act now|act immediately|action required|apply now|call now|click below|click here|do it today|don't delete|don't hesitate|
    expires today|final notice|for instant access|get it now|hurry|immediately|last chance|limited time|now only|offer expires|
    once in a lifetime|only a few left|order now|please read|respond now|sign up now|supplies are limited|take action now|
    this won't last|time limited|today only|urgent|what are you waiting for|while supplies last|ends tonight|don't miss out|
    last day|final call|open immediately|important information|instant access|before it's too late|limited spots|expires soon|
    only today|offer ends`,
  Money: `$$$|100% free|bargain|best price|big bucks|cash bonus|cheap|credit card offers|double your income|earn extra cash|
    earn money|extra income|fast cash|free gift|free money|full refund|get paid|giveaway|lowest price|make money|million dollars|
    money back|no cost|no fees|cash prize|save big|save up to|serious cash|unsecured credit|unsecured debt|why pay more|
    financial freedom|pure profit|consolidate debt|rebate|earn per week|extra cash|half price|huge discount|price slashed|
    claim your prize|free cash|refinance|low rates|insurance quote|easy money`,
  'Too good': `amazing offer|as seen on|be your own boss|best deal|congratulations|dear friend|fantastic deal|for free|free access|
    free consultation|free info|free trial|incredible deal|miracle|no catch|no obligation|no strings attached|risk-free|risk free|
    satisfaction guaranteed|special promotion|this is not spam|unlimited|while you sleep|winner|you are a winner|you have won|
    you've been chosen|you have been selected|100% satisfied|best offer|absolutely free|exclusive deal|free bonus|free sample|
    info you requested|no hidden costs|one time offer|outstanding values|promise you|special offer|dream come true|
    once-in-a-lifetime|all natural|zero risk`,
  Shady: `account suspended|verify your account|confirm your account|billing problem|casino|click to remove|dear beneficiary|
    beneficiary|direct email|increase sales|increase traffic|lose weight|meet singles|no credit check|online pharmacy|
    removal instructions|reverses aging|social security number|undisclosed|viagra|weight loss|wire transfer|xxx|not junk|
    stop snoring|valium|debt relief|work from home|multi-level marketing|mlm|gift card|crypto giveaway|double your bitcoin|
    claim your airdrop|seed phrase|private key|password reset|unusual activity|update your payment|bank details|
    hidden charges|nigerian prince|inheritance|lottery|pre-approved|we hate spam`,
  Overpromise: `100% guaranteed|best ever|cure|eliminate debt|get rich|guaranteed|instant results|lose weight fast|
    no experience needed|no questions asked|results guaranteed|revolutionary|secret|the best rates|double your|triple your|
    10x your|overnight|earn up to|you won't believe|shocking|too good to be true|unbelievable|explode your|skyrocket|
    life-changing|get results fast|works every time|never fails|money-making|magic formula`,
};

const SPAM_LIST: { phrase: string; cat: Cat; re: RegExp }[] = (Object.keys(SPAM) as Cat[]).flatMap((cat) =>
  SPAM[cat]
    .split('|')
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean)
    .map((phrase) => ({
      phrase,
      cat,
      re: new RegExp(`(?<![\\p{L}\\p{N}])${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/'/g, "['’]")}(?![\\p{L}\\p{N}])`, 'giu'),
    })),
);

type Hit = { start: number; end: number; phrase: string; cat: Cat };

function findSpam(text: string): Hit[] {
  if (!text) return [];
  const hits: Hit[] = [];
  for (const s of SPAM_LIST) {
    s.re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = s.re.exec(text)) !== null) {
      hits.push({ start: m.index, end: m.index + m[0].length, phrase: s.phrase, cat: s.cat });
    }
  }
  hits.sort((a, b) => a.start - b.start || b.end - a.end);
  const out: Hit[] = [];
  for (const h of hits) {
    const last = out[out.length - 1];
    if (last && h.start < last.end) continue;
    out.push(h);
  }
  return out;
}

function Marked({ text, hits }: { text: string; hits: Hit[] }) {
  const parts: ReactNode[] = [];
  let i = 0;
  hits.forEach((h, k) => {
    if (h.start > i) parts.push(<span key={`t${k}`}>{text.slice(i, h.start)}</span>);
    parts.push(
      <mark key={`m${k}`} className="ft-mark-bad" title={h.cat}>
        {text.slice(h.start, h.end)}
      </mark>,
    );
    i = h.end;
  });
  if (i < text.length) parts.push(<span key="end">{text.slice(i)}</span>);
  return <>{parts}</>;
}

const ACRONYMS = new Set(['AI', 'PR', 'CEO', 'CMO', 'CTO', 'SEO', 'API', 'NFT', 'DAO', 'B2B', 'SaaS', 'USA', 'UK', 'EU', 'Q1', 'Q2', 'Q3', 'Q4', 'FAQ', 'ROI', 'GTM', 'SDK', 'LLM', 'RSVP', 'TGE', 'APAC']);
const TOKEN_RE = /\{\{\s*[\w.]+\s*\}\}|\{\s*\w+\s*\}|\*\|\w+\|\*|%\w+%|\[\w+\]/;
const EMOJI_RE = /\p{Extended_Pictographic}/gu;

function cut(s: string, n: number) {
  const chars = Array.from(s);
  return chars.length > n ? chars.slice(0, n).join('').trimEnd() + '...' : s;
}

type Check = { level: 'good' | 'warn' | 'bad'; label: string; text: string; tip?: string };

const TOKEN_ALL = new RegExp(TOKEN_RE.source, 'g');

/** Swap merge tags for a typical first name so lengths match what readers see. */
function render(s: string) {
  return s.replace(TOKEN_ALL, 'Alex');
}

function analyse(subject: string, preview: string) {
  const raw = subject.trim();
  const s = render(raw);
  const len = Array.from(s).length;
  const words = s ? s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length : 0;
  const checks: Check[] = [];
  let score = 0;

  if (!s) return { score: 0, checks, hits: [] as Hit[], len, words };

  // Length (20)
  if (len >= 30 && len <= 50) {
    score += 20;
    checks.push({ level: 'good', label: 'Length', text: `${len} characters is in the sweet spot (30 to 50).` });
  } else if ((len >= 20 && len < 30) || (len > 50 && len <= 60)) {
    score += 12;
    checks.push({ level: 'warn', label: 'Length', text: `${len} characters. Aim for 30 to 50.`, tip: len < 30 ? 'Add a specific detail so it is clear what is inside.' : 'Trim filler so the point lands before the cut.' });
  } else {
    score += 4;
    checks.push({ level: 'bad', label: 'Length', text: `${len} characters is ${len < 20 ? 'very short' : 'long'}. Aim for 30 to 50.` });
  }

  // Words (10)
  if (words >= 4 && words <= 9) {
    score += 10;
    checks.push({ level: 'good', label: 'Words', text: `${words} words. Easy to scan.` });
  } else {
    score += 4;
    checks.push({ level: 'warn', label: 'Words', text: `${words} words. Aim for 4 to 9.` });
  }

  // Truncation (10)
  if (len <= 40) {
    score += 10;
    checks.push({ level: 'good', label: 'Mobile', text: 'Fits on mobile without being cut (about 40 characters).' });
  } else if (len <= 60) {
    score += 5;
    checks.push({ level: 'warn', label: 'Mobile', text: `Cut after about 40 characters on mobile: "${cut(s, 40)}"`, tip: 'Make sure the first 40 characters carry the message.' });
  } else {
    checks.push({ level: 'bad', label: 'Cut-off', text: 'Cut on both desktop (about 60) and mobile (about 40).' });
  }

  // Spam words (20)
  const hits = findSpam(raw);
  if (hits.length === 0) {
    score += 20;
    checks.push({ level: 'good', label: 'Spam words', text: 'No common spam trigger words.' });
  } else {
    score += hits.length === 1 ? 8 : 0;
    checks.push({
      level: hits.length === 1 ? 'warn' : 'bad',
      label: 'Spam words',
      text: `Found: ${hits.map((h) => `"${h.phrase}"`).join(', ')}.`,
      tip: 'Rephrase in plain words. Say what the reader gets, not how urgent it is.',
    });
  }

  // Caps (10)
  const caps = (s.match(/\b[A-Z]{3,}\b/g) ?? []).filter((w) => !ACRONYMS.has(w));
  if (caps.length === 0) {
    score += 10;
  } else {
    score += caps.length === 1 ? 4 : 0;
    checks.push({ level: caps.length === 1 ? 'warn' : 'bad', label: 'Caps', text: `ALL CAPS words: ${caps.join(', ')}.`, tip: 'Caps read as shouting and trip spam filters.' });
  }

  // Punctuation (10)
  const bangs = (s.match(/!/g) ?? []).length;
  const excessive = /[!?]{2,}/.test(s) || bangs > 1;
  if (excessive) {
    checks.push({ level: 'bad', label: 'Punctuation', text: 'Repeated ! or ? marks.', tip: 'Use one mark at most.' });
  } else if (bangs === 1) {
    score += 7;
    checks.push({ level: 'warn', label: 'Punctuation', text: 'One exclamation mark. Fine, but often unnecessary.' });
  } else {
    score += 10;
  }

  // Symbols (5)
  const symbols = (s.match(/[$%€£]/g) ?? []).length;
  if (symbols === 0) score += 5;
  else {
    score += symbols === 1 ? 2 : 0;
    checks.push({ level: 'warn', label: 'Symbols', text: 'Contains $, % or currency signs.', tip: 'Money symbols in subjects lean promotional. Use them only when the offer is the point.' });
  }

  // Emoji (5)
  const emoji = (s.match(EMOJI_RE) ?? []).length;
  if (emoji <= 1) {
    score += 5;
    if (emoji === 1) checks.push({ level: 'good', label: 'Emoji', text: 'One emoji. That is the right amount.' });
  } else {
    score += emoji === 2 ? 2 : 0;
    checks.push({ level: 'warn', label: 'Emoji', text: `${emoji} emoji. Keep it to one.` });
  }

  // Personalisation (5)
  if (TOKEN_RE.test(raw)) {
    score += 5;
    checks.push({ level: 'good', label: 'Personal', text: 'Uses a personalisation token.', tip: 'Lengths count it as a short first name. Set a fallback so nobody sees "Hi ,".' });
  } else {
    checks.push({ level: 'warn', label: 'Personal', text: 'No personalisation token.', tip: 'A first name or company, like {{first_name}}, can lift opens.' });
  }

  // Question or number (5)
  if (/\?/.test(s) || /\d/.test(s)) {
    score += 5;
    checks.push({ level: 'good', label: 'Hook', text: 'Uses a question or a number, which adds curiosity.' });
  } else {
    checks.push({ level: 'warn', label: 'Hook', text: 'No question or number.', tip: 'Try "3 ideas for..." or a short question.' });
  }

  // Fake reply / forward (penalty)
  if (/^\s*(re|fwd?|fw)\s*:/i.test(s)) {
    score -= 15;
    checks.push({ level: 'bad', label: 'Fake reply', text: 'Starts with RE: or FWD: but is not a reply.', tip: 'Readers feel tricked, and it hurts trust and deliverability.' });
  }

  // Preview text (no score, advice only)
  const p = preview.trim();
  if (!p) checks.push({ level: 'warn', label: 'Preview', text: 'No preview text.', tip: 'Without it, inboxes show the first line of your email.' });
  else if (render(p).toLowerCase() === s.toLowerCase()) checks.push({ level: 'warn', label: 'Preview', text: 'Preview text repeats the subject.', tip: 'Use it to add a second reason to open.' });
  else checks.push({ level: 'good', label: 'Preview', text: `Preview text set (${Array.from(p).length} characters). 40 to 90 shows well on most clients.` });

  return { score: Math.max(0, Math.min(100, score)), checks, hits, len, words };
}

const SAMPLE_BODY = `Hi {{first_name}},

I put together three PR ideas for your Q4 launch. Two of them take under an hour to set up.

The audit is 100% free and there is no obligation. Click here to grab a slot before Friday.

Maya`;

export default function SubjectLineTester() {
  const id = useId();
  const [subject, setSubject] = useState('{{first_name}}, 3 PR ideas for your Q4 launch');
  const [preview, setPreview] = useState('Two take under an hour. The third needs a budget chat.');
  const [body, setBody] = useState(SAMPLE_BODY);

  const a = useMemo(() => analyse(subject, preview), [subject, preview]);
  const bodyHits = useMemo(() => findSpam(body), [body]);

  const bodySummary = useMemo(() => {
    const map = new Map<string, { phrase: string; cat: Cat; count: number }>();
    for (const h of bodyHits) {
      const cur = map.get(h.phrase);
      if (cur) cur.count++;
      else map.set(h.phrase, { phrase: h.phrase, cat: h.cat, count: 1 });
    }
    return [...map.values()].sort((x, y) => y.count - x.count || x.phrase.localeCompare(y.phrase));
  }, [bodyHits]);

  const s = subject.trim();
  const p = preview.trim();

  const result = s
    ? [
        `Subject: ${s}`,
        p ? `Preview text: ${p}` : null,
        `Score: ${a.score}/100 (${a.len} characters, ${a.words} words)`,
        '',
        ...a.checks.map((c) => `[${c.level === 'good' ? 'OK' : 'Fix'}] ${c.text}${c.tip ? ' ' + c.tip : ''}`),
        ...(bodySummary.length
          ? ['', 'Spam words in body:', ...bodySummary.map((b) => `${b.phrase} (${b.cat}) x${b.count}`)]
          : body.trim()
            ? ['', 'No spam words found in the body.']
            : []),
      ]
        .filter((l) => l !== null)
        .join('\n')
    : '';
  useToolResult(result);

  return (
    <div className="ft-grid">
      <div className="ft-stack">
        <div className="ft-card">
          <div className="ft-field">
            <label htmlFor={`${id}-s`}>Subject line</label>
            <input id={`${id}-s`} value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="ft-field">
            <label htmlFor={`${id}-p`}>Preview text (optional)</label>
            <input id={`${id}-p`} value={preview} onChange={(e) => setPreview(e.target.value)} />
          </div>
          <div className="ft-field">
            <label htmlFor={`${id}-b`}>Email body (optional)</label>
            <textarea id={`${id}-b`} value={body} onChange={(e) => setBody(e.target.value)} rows={8} />
          </div>
          <div className="ft-actions">
            <CopyButton text={s} label="Copy subject" />
          </div>
        </div>

        <div className="ft-card">
          <p className="ft-label">Inbox preview</p>
          <div className="ev-inbox" aria-label="Desktop inbox preview">
            <span className="ev-inbox-dev">Desktop</span>
            <div className="ev-inbox-row">
              <strong className="ev-inbox-from">You</strong>
              <span className="ev-inbox-line">
                <strong>{cut(render(s) || 'Your subject line', 60)}</strong>
                {p ? <span className="ev-inbox-pre"> - {cut(render(p), Math.max(20, 100 - Math.min(60, Array.from(render(s)).length)))}</span> : null}
              </span>
            </div>
          </div>
          <div className="ev-inbox ev-inbox-mobile" aria-label="Mobile inbox preview">
            <span className="ev-inbox-dev">Mobile</span>
            <strong className="ev-inbox-from">You</strong>
            <strong className="ev-inbox-subj">{cut(render(s) || 'Your subject line', 40)}</strong>
            {p ? <span className="ev-inbox-pre">{cut(render(p), 80)}</span> : null}
          </div>
        </div>
      </div>

      <div className="ft-stack" aria-live="polite">
        <div className="ft-card">
          {s ? (
            <>
              <Score value={a.score} label="Subject line score" />
              {a.hits.length ? (
                <p className="ev-marked">
                  <Marked text={s} hits={a.hits} />
                </p>
              ) : null}
              <ul className="ft-checks">
                {a.checks.map((c, i) => (
                  <li key={i}>
                    <Verdict level={c.level}>{c.label}</Verdict>
                    <span>{c.text}</span>
                    {c.tip ? <p>{c.tip}</p> : null}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="ft-empty">Type a subject line to see its score.</p>
          )}
        </div>

        {body.trim() ? (
          <div className="ft-card">
            <p className="ft-label">Body scan</p>
            {bodySummary.length ? (
              <>
                <div className="ft-table-wrap">
                  <table className="ft-table">
                    <thead>
                      <tr>
                        <th>Word or phrase</th>
                        <th>Type</th>
                        <th className="num">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bodySummary.map((b) => (
                        <tr key={b.phrase}>
                          <td>{b.phrase}</td>
                          <td>{b.cat}</td>
                          <td className="num">{b.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="ft-prose ev-body-marked">
                  <Marked text={body} hits={bodyHits} />
                </p>
              </>
            ) : (
              <p className="ft-hint">
                <Verdict level="good">Clean</Verdict> No common spam words found.
              </p>
            )}
            <p className="ft-hint ev-mt">Spam words are one signal. Sender reputation and SPF, DKIM and DMARC matter more.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
