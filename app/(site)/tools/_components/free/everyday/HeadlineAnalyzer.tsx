'use client';

import { useId, useMemo, useState } from 'react';
import { CopyButton, Score, useToolResult, Verdict } from '../kit';
import './everyday.css';

const POWER = new Set(
  `proven secret secrets simple easy easily instantly instant free new now exclusive ultimate essential complete guaranteed
  effortless fast quick quickly powerful surprising shocking little-known hidden insider breakthrough bold brilliant remarkable
  stunning incredible amazing massive huge epic definitive master hack hacks mistake mistakes avoid warning stop never always
  best worst truth myth myths lessons blueprint formula framework strategy strategies tactics tips tricks steps ways reasons
  ideas examples checklist template guide playbook boost grow double triple skyrocket unlock discover reveal revealed uncover
  transform win save results success profit limited today fail failure danger risk costly struggle effective practical smart
  clever genius expert pro beginner everything nothing without rare unusual forbidden banned controversial honest real
  authentic backed data research science tested measurable overnight urgent critical crucial vital must dead killer crush
  proof unexpected brutal raw undeniable fearless jaw-dropping legendary lucrative sneak staggering startling sure-fire
  wealth weird-but-true underrated overlooked`.split(/\s+/),
);

const EMOTIONAL = new Set(
  `love loved hate fear afraid angry happy happiness sad joy proud shame guilty worry worried anxious anxiety stress stressed
  lonely hope hopeful excited exciting thrilled heartbreaking heartwarming inspiring inspired beautiful ugly brave courage dream
  dreams nightmare regret embarrassing awkward jealous grateful calm confident confidence doubt frustrated frustrating
  overwhelmed burnout tired delight delightful surprise surprised shocked terrifying scary horrible terrible awful wonderful
  perfect magic magical crazy insane wild weird funny hilarious tragic painful heart soul feel feelings emotional peace freedom
  trust betrayed lost alone winning losing survive thrive hurt cry smile laugh panic relief rage furious mad excitement
  kill kills killing ruin ruined destroy destroyed broken broke heartbroken bliss gutted`.split(/\s+/),
);

const COMMON = new Set(
  `a an the and or but nor to of in on for with at by from up about into over after before under between through is are was
  were be been being am have has had do does did will would can could should may might i you your yours we our us they their
  them he she it its his her this that these those what which who whom why how when where there here all any some more most
  many much very just so than too also only not no yes if then as out get gets make makes made go goes know take see come
  think look want give use find tell ask work seem try leave call good great first last long little own other old right big
  high different small large next early young important few bad same able one two three time year years people way day thing
  things world life part place week company number group problem fact every each even still back well down off again really
  me my mine our new now like need start using without your via vs per while because`.split(/\s+/),
);

type Kind = 'blog' | 'email' | 'social' | 'landing';

const KINDS: { id: Kind; label: string; words: [number, number]; chars: [number, number]; serp: number | null }[] = [
  { id: 'blog', label: 'Blog post', words: [6, 12], chars: [50, 70], serp: 60 },
  { id: 'email', label: 'Email subject', words: [4, 9], chars: [30, 50], serp: 45 },
  { id: 'social', label: 'Social post', words: [6, 18], chars: [40, 110], serp: null },
  { id: 'landing', label: 'Landing page', words: [4, 10], chars: [30, 60], serp: 60 },
];

const WEAK_START = new Set(['a', 'an', 'the', 'it', 'there', 'this', 'that', 'so', 'and', 'but', 'or', 'of']);
const WEAK_END = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'of', 'to', 'for', 'with', 'in', 'on', 'at', 'it', 'is', 'are', 'be', 'by', 'from', 'that', 'this', 'etc']);

type Cat = 'power' | 'emotional' | 'common' | 'uncommon';

function words(text: string): string[] {
  return (text.toLowerCase().match(/[a-z0-9][a-z0-9'’-]*/g) ?? []).map((w) => w.replace(/[’']s$/, '').replace(/[’']/g, ''));
}

function categorise(w: string): Cat {
  if (POWER.has(w)) return 'power';
  if (EMOTIONAL.has(w)) return 'emotional';
  if (COMMON.has(w) || /^\d+$/.test(w)) return 'common';
  return 'uncommon';
}

type Check = { level: 'good' | 'warn' | 'bad'; label: string; text: string; tip?: string };

function analyse(headline: string, kind: Kind) {
  const cfg = KINDS.find((k) => k.id === kind)!;
  const h = headline.trim();
  const ws = words(h);
  const raw = h.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
  const n = ws.length;
  const len = h.length;
  const cats = ws.map(categorise);
  const count = (c: Cat) => cats.filter((x) => x === c).length;
  const pct = (c: Cat) => (n ? Math.round((count(c) / n) * 100) : 0);
  const power = ws.filter((w) => POWER.has(w));
  const emotional = ws.filter((w) => !POWER.has(w) && EMOTIONAL.has(w));
  const balance = { common: pct('common'), uncommon: pct('uncommon'), emotional: pct('emotional'), power: pct('power') };

  const checks: Check[] = [];
  let score = 0;

  // Word count (15)
  const [wLo, wHi] = cfg.words;
  if (n >= wLo && n <= wHi) {
    score += 15;
    checks.push({ level: 'good', label: 'Words', text: `${n} words is in the ideal range (${wLo} to ${wHi}).` });
  } else {
    const off = n < wLo ? wLo - n : n - wHi;
    score += Math.max(0, 15 - off * 4);
    checks.push({
      level: off > 3 ? 'bad' : 'warn',
      label: 'Words',
      text: `${n} words. Aim for ${wLo} to ${wHi}.`,
      tip: n < wLo ? 'Add the benefit or who it is for.' : 'Cut filler words and anything the reader can infer.',
    });
  }

  // Characters (15)
  const [cLo, cHi] = cfg.chars;
  if (len >= cLo && len <= cHi) {
    score += 15;
    checks.push({ level: 'good', label: 'Length', text: `${len} characters is in the ideal range (${cLo} to ${cHi}).` });
  } else {
    const off = len < cLo ? cLo - len : len - cHi;
    score += Math.max(0, 15 - Math.round(off / 2));
    checks.push({
      level: off > 20 ? 'bad' : 'warn',
      label: 'Length',
      text: `${len} characters. Aim for ${cLo} to ${cHi}.`,
      tip: len < cLo ? 'Be more specific. Add a number, a result or a timeframe.' : 'Shorter headlines are easier to scan.',
    });
  }

  // Power words (10)
  if (power.length >= 1 && power.length <= 3) {
    score += 10;
    checks.push({ level: 'good', label: 'Power', text: `Power words: ${power.join(', ')}.` });
  } else if (power.length > 3) {
    score += 5;
    checks.push({ level: 'warn', label: 'Power', text: `${power.length} power words. It may read as clickbait.`, tip: 'Keep the one or two that matter most.' });
  } else {
    checks.push({ level: 'warn', label: 'Power', text: 'No power words.', tip: 'Try one word like proven, simple, mistake or playbook.' });
  }

  // Emotional (10)
  if (balance.emotional >= 10 && balance.emotional <= 30) {
    score += 10;
    checks.push({ level: 'good', label: 'Emotion', text: `Emotional words: ${emotional.join(', ')}.` });
  } else if (balance.emotional > 30) {
    score += 6;
    checks.push({ level: 'warn', label: 'Emotion', text: 'Very emotional. Make sure it still says something concrete.' });
  } else {
    score += emotional.length ? 6 : 0;
    checks.push({ level: 'warn', label: 'Emotion', text: emotional.length ? 'A little emotion. One more feeling word could help.' : 'No emotional words.', tip: 'Readers click on feelings: fear, relief, pride, surprise.' });
  }

  // Common (10)
  if (balance.common >= 20 && balance.common <= 35) {
    score += 10;
    checks.push({ level: 'good', label: 'Flow', text: `Common words make up ${balance.common}%, so it reads naturally.` });
  } else if (balance.common < 20) {
    score += balance.common >= 10 ? 6 : 3;
    checks.push({ level: 'warn', label: 'Flow', text: `Only ${balance.common}% common words. It may read like a list of keywords.`, tip: 'Add small connecting words such as how, you, your, for.' });
  } else {
    score += balance.common <= 50 ? 5 : 1;
    checks.push({ level: 'warn', label: 'Flow', text: `${balance.common}% common words. It may feel generic.`, tip: 'Swap a plain word for a specific noun or verb.' });
  }

  // Uncommon (10)
  if (balance.uncommon >= 10 && balance.uncommon <= 65) {
    score += 10;
    checks.push({ level: 'good', label: 'Substance', text: `${balance.uncommon}% specific, uncommon words give it substance.` });
  } else {
    score += 4;
    checks.push({
      level: 'warn',
      label: 'Substance',
      text: balance.uncommon < 10 ? 'Few specific words.' : `${balance.uncommon}% uncommon words. It may be hard to read.`,
      tip: balance.uncommon < 10 ? 'Name the topic, tool or audience.' : 'Swap jargon for plain words.',
    });
  }

  // Number (8)
  const hasNumber = /\d/.test(h);
  if (hasNumber) {
    score += 8;
    checks.push({ level: 'good', label: 'Number', text: 'Uses a number, which sets a clear expectation.' });
  } else {
    checks.push({ level: 'warn', label: 'Number', text: 'No number.', tip: 'Numbers like 7, 2026 or 40% tend to lift clicks.' });
  }

  // Format (7)
  const isHowTo = /\bhow to\b/i.test(h);
  const isQuestion = /\?\s*$/.test(h) || /^(who|what|why|how|when|where|is|are|can|do|does|should|will)\b/i.test(h);
  const isList = /^\d+\s/.test(h) || /\b\d+\s+(ways|tips|steps|reasons|ideas|mistakes|lessons|things|tools|examples|questions|rules|signs)\b/i.test(h);
  const format = isList ? 'List' : isHowTo ? 'How-to' : isQuestion ? 'Question' : 'Statement';
  if (format !== 'Statement') {
    score += 7;
    checks.push({ level: 'good', label: 'Format', text: `${format} format. These tend to perform well.` });
  } else {
    score += 3;
    checks.push({ level: 'warn', label: 'Format', text: 'Plain statement.', tip: 'Test a list ("7 ways"), how-to or question version.' });
  }

  // Start / end (5)
  const first = ws[0] ?? '';
  const last = ws[n - 1] ?? '';
  const weakStart = WEAK_START.has(first);
  const weakEnd = WEAK_END.has(last);
  if (n && !weakStart && !weakEnd) {
    score += 5;
    checks.push({ level: 'good', label: 'Ends', text: 'Starts and ends on strong words.' });
  } else if (n) {
    score += weakStart && weakEnd ? 0 : 2;
    checks.push({
      level: 'warn',
      label: 'Ends',
      text: weakStart ? `Starts with a weak word ("${first}").` : `Ends on a weak word ("${last}").`,
      tip: 'Readers skim the first and last 3 words. Put the payoff there.',
    });
  }

  // Readability (5)
  const avg = n ? ws.reduce((s, w) => s + w.length, 0) / n : 0;
  if (avg && avg <= 6.5) {
    score += 5;
    checks.push({ level: 'good', label: 'Readability', text: `Average word length ${avg.toFixed(1)} letters. Easy to read.` });
  } else if (avg) {
    score += 2;
    checks.push({ level: 'warn', label: 'Readability', text: `Average word length ${avg.toFixed(1)} letters.`, tip: 'Use shorter, plainer words.' });
  }

  // Truncation (5)
  if (cfg.serp === null || len <= cfg.serp) {
    score += 5;
    if (cfg.serp !== null) checks.push({ level: 'good', label: 'Cut-off', text: `Fits in ${cfg.serp} characters, so it will not be cut ${kind === 'email' ? 'in most inboxes' : 'in Google'}.` });
  } else {
    checks.push({
      level: 'warn',
      label: 'Cut-off',
      text: `Over ${cfg.serp} characters, so it may be cut ${kind === 'email' ? 'in the inbox' : 'in Google results'}.`,
      tip: 'Keep the key words in the first part.',
    });
  }

  if (!n) score = 0;

  return {
    score: Math.round(score),
    checks,
    balance,
    n,
    len,
    format,
    first3: raw.slice(0, 3).join(' '),
    last3: raw.slice(-3).join(' '),
  };
}

export default function HeadlineAnalyzer() {
  const id = useId();
  const [headline, setHeadline] = useState('7 PR Mistakes That Quietly Kill Your AI Startup Launch');
  const [kind, setKind] = useState<Kind>('blog');
  const [history, setHistory] = useState<{ headline: string; score: number; kind: Kind }[]>([]);

  const a = useMemo(() => analyse(headline, kind), [headline, kind]);

  const result = headline.trim()
    ? [
        `Headline: ${headline.trim()}`,
        `Type: ${KINDS.find((k) => k.id === kind)!.label}`,
        `Score: ${a.score}/100`,
        `Words: ${a.n}, characters: ${a.len}, format: ${a.format}`,
        `Word balance: common ${a.balance.common}%, uncommon ${a.balance.uncommon}%, emotional ${a.balance.emotional}%, power ${a.balance.power}%`,
        '',
        ...a.checks.map((c) => `[${c.level === 'good' ? 'OK' : 'Fix'}] ${c.text}${c.tip ? ' ' + c.tip : ''}`),
        ...(history.length ? ['', 'Compared:', ...history.map((x) => `${x.score} | ${x.headline}`)] : []),
      ].join('\n')
    : '';
  useToolResult(result);

  function addToCompare() {
    const h = headline.trim();
    if (!h) return;
    setHistory((prev) => [{ headline: h, score: a.score, kind }, ...prev.filter((x) => x.headline !== h || x.kind !== kind)].slice(0, 5));
  }

  const bars: { key: keyof typeof a.balance; label: string; target: string }[] = [
    { key: 'common', label: 'Common', target: '20 to 35%' },
    { key: 'uncommon', label: 'Uncommon', target: '10 to 65%' },
    { key: 'emotional', label: 'Emotional', target: '10 to 30%' },
    { key: 'power', label: 'Power', target: '1 to 3 words' },
  ];

  return (
    <div className="ft-grid">
      <div className="ft-stack">
        <div className="ft-card">
          <div className="ft-field">
            <label htmlFor={`${id}-h`}>Headline</label>
            <textarea id={`${id}-h`} className="ev-headline-input" value={headline} onChange={(e) => setHeadline(e.target.value)} rows={2} />
          </div>
          <div className="ft-field">
            <label htmlFor={`${id}-k`}>Type</label>
            <select id={`${id}-k`} value={kind} onChange={(e) => setKind(e.target.value as Kind)}>
              {KINDS.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.label}
                </option>
              ))}
            </select>
          </div>
          <div className="ft-actions">
            <button type="button" className="tool-btn tool-btn-primary" onClick={addToCompare} disabled={!headline.trim()}>
              Add to compare
            </button>
            <CopyButton text={headline.trim()} label="Copy headline" />
          </div>
        </div>

        <div className="ft-card">
          <p className="ft-label">Word balance</p>
          <div className="ev-bars">
            {bars.map((b) => (
              <div key={b.key} className="ev-bar">
                <div className="ft-meter-top">
                  <span>{b.label}</span>
                  <span className="mono">
                    {a.balance[b.key]}% <small>target {b.target}</small>
                  </span>
                </div>
                <div className="ft-meter-bar" aria-hidden="true">
                  <span style={{ width: `${a.balance[b.key]}%` }} />
                </div>
              </div>
            ))}
          </div>
          <dl className="ft-stats ev-mt">
            <div>
              <dt>First 3 words</dt>
              <dd className="ev-dd-small">{a.first3 || '-'}</dd>
            </div>
            <div>
              <dt>Last 3 words</dt>
              <dd className="ev-dd-small">{a.last3 || '-'}</dd>
            </div>
          </dl>
          <p className="ft-hint ev-mt">Skimmers often read only these. Make them count.</p>
        </div>

        {history.length > 0 ? (
          <div className="ft-card">
            <p className="ft-label">Compare</p>
            <div className="ft-table-wrap">
              <table className="ft-table">
                <thead>
                  <tr>
                    <th className="num">Score</th>
                    <th>Headline</th>
                    <th>
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...history]
                    .sort((x, y) => y.score - x.score)
                    .map((x) => (
                      <tr key={x.kind + x.headline}>
                        <td className="num">
                          <strong>{x.score}</strong>
                        </td>
                        <td>{x.headline}</td>
                        <td>
                          <button
                            type="button"
                            className="tool-btn tool-btn-small"
                            onClick={() => {
                              setHeadline(x.headline);
                              setKind(x.kind);
                            }}
                          >
                            Load
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>

      <div className="ft-card" aria-live="polite">
        {a.n ? (
          <>
            <Score value={a.score} label={`${a.format} headline score`} />
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
          <p className="ft-empty">Type a headline to see its score.</p>
        )}
      </div>
    </div>
  );
}
