'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { CopyButton, Verdict, useToolResult } from '../kit';
import { Tabs, TextArea, TextField } from './ui';
import './seo.css';

const STOPWORDS = new Set(
  (
    "a about above after again against all also am an and any are aren't as at be because been before being below between both but by " +
    "can can't cannot could couldn't did didn't do does doesn't doing don't down during each few for from further get gets got had hadn't " +
    "has hasn't have haven't having he he'd he'll he's her here here's hers herself him himself his how how's however i i'd i'll i'm i've " +
    "if in into is isn't it it's its itself just let's like make many may me might more most much must mustn't my myself no nor not now " +
    "of off on once one only or other ought our ours ourselves out over own per same shan't she she'd she'll she's should shouldn't so " +
    "some such than that that's the their theirs them themselves then there there's these they they'd they'll they're they've this " +
    "those through to too under until up upon us very via was wasn't we we'd we'll we're we've were weren't what what's when when's " +
    "where where's which while who who's whom why why's will with within without won't would wouldn't yet you you'd you'll you're " +
    "you've your yours yourself yourselves"
  ).split(' '),
);

const SAMPLE =
  'AI search visibility decides whether ChatGPT, Perplexity and Google AI Overviews mention your startup. ' +
  'Most founders still treat AI search as a side project. That is a mistake. AI search engines lean on the same sources ' +
  'journalists trust: earned coverage, clear answers and pages with real authors. If your site answers buyer questions in plain ' +
  'words, AI search tools can quote you. If it hides answers behind vague copy, they quote a competitor instead. ' +
  'Start with one page per question, add FAQ schema, and earn two or three citations from trade press each quarter.';

type N = 1 | 2 | 3;

function tokenize(text: string): string[] {
  return (text.toLowerCase().replace(/[‘’]/g, "'").match(/[\p{L}\p{N}]+(?:['-][\p{L}\p{N}]+)*/gu) ?? []) as string[];
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function KeywordDensity() {
  const [text, setText] = useState(SAMPLE);
  const [target, setTarget] = useState('AI search');
  const [filter, setFilter] = useState(true);
  const [n, setN] = useState<N>(1);

  const words = useMemo(() => tokenize(text), [text]);
  const total = words.length;

  const grams = useMemo(() => {
    const out: Record<N, { phrase: string; count: number }[]> = { 1: [], 2: [], 3: [] };
    for (const size of [1, 2, 3] as N[]) {
      const counts = new Map<string, number>();
      for (let i = 0; i + size <= words.length; i++) {
        const g = words.slice(i, i + size);
        if (filter && (STOPWORDS.has(g[0]) || STOPWORDS.has(g[g.length - 1]))) continue;
        if (g.every((w) => /^\d+$/.test(w))) continue;
        const key = g.join(' ');
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
      out[size] = [...counts.entries()]
        .filter(([, c]) => size === 1 || c >= 2)
        .map(([phrase, count]) => ({ phrase, count }))
        .sort((a, b) => b.count - a.count || a.phrase.localeCompare(b.phrase))
        .slice(0, 20);
    }
    return out;
  }, [words, filter]);

  const unique = useMemo(() => new Set(words).size, [words]);

  const kw = useMemo(() => {
    const t = tokenize(target);
    if (!t.length) return null;
    const re = new RegExp(`(?<![\\p{L}\\p{N}])${t.map(escapeRe).join("[\\s'\\u2019-]+")}(?![\\p{L}\\p{N}])`, 'giu');
    const count = (text.match(re) ?? []).length;
    const first100 = words.slice(0, 100).join(' ');
    const inFirst = new RegExp(`(?<![\\p{L}\\p{N}])${t.map(escapeRe).join(' ')}(?![\\p{L}\\p{N}])`, 'u').test(first100);
    const density = total ? (count / total) * 100 : 0;
    return { re, count, density, inFirst, phrase: t.join(' ') };
  }, [target, text, words, total]);

  const verdict: { level: 'good' | 'warn' | 'bad'; text: string } | null = kw
    ? kw.count === 0
      ? { level: 'bad', text: 'Not found. Use the keyword at least once, ideally in the first paragraph.' }
      : kw.density > 3
        ? { level: 'bad', text: 'Over 3%. This reads as keyword stuffing. Swap some uses for synonyms.' }
        : kw.density > 2.5
          ? { level: 'warn', text: 'Slightly high. 0.5% to 2.5% is a healthy range.' }
          : kw.density < 0.5
            ? { level: 'warn', text: 'Light. 0.5% to 2.5% is a healthy range for most pages.' }
            : { level: 'good', text: 'Healthy. Inside the 0.5% to 2.5% range.' }
    : null;

  const preview = useMemo(() => {
    if (!kw || !kw.count) return text;
    const parts: ReactNode[] = [];
    let last = 0;
    for (const m of text.matchAll(kw.re)) {
      const i = m.index ?? 0;
      if (i > last) parts.push(text.slice(last, i));
      parts.push(
        <mark key={i} className="ft-mark">
          {m[0]}
        </mark>,
      );
      last = i + m[0].length;
    }
    parts.push(text.slice(last));
    return parts;
  }, [text, kw]);

  const pct = (c: number) => (total ? ((c / total) * 100).toFixed(2) : '0.00');

  const summary = (() => {
    if (!total) return '';
    const lines = [`Words: ${total}. Unique: ${unique}.`];
    if (kw) lines.push(`Target "${kw.phrase}": ${kw.count} uses, ${kw.density.toFixed(2)}% density, ${kw.inFirst ? 'in' : 'not in'} the first 100 words.`);
    if (verdict) lines.push(verdict.text);
    for (const size of [1, 2, 3] as N[]) {
      const rows = grams[size].slice(0, 10);
      if (!rows.length) continue;
      lines.push('', `Top ${size}-word phrases:`, ...rows.map((r) => `${r.phrase}: ${r.count} (${pct(r.count)}%)`));
    }
    return lines.join('\n');
  })();

  useToolResult(summary);

  return (
    <div className="ft-grid">
      <div className="ft-card">
        <TextArea label="Text" value={text} tall onChange={setText} />
        <TextField label="Target keyword (optional)" value={target} onChange={setTarget} />
        <label className="ft-check">
          <input type="checkbox" checked={filter} onChange={(e) => setFilter(e.target.checked)} />
          Ignore stopwords (the, and, of)
        </label>
      </div>

      <div className="ft-stack" aria-live="polite">
        <div className="ft-card">
          <dl className="ft-stats">
            <div>
              <dt>Words</dt>
              <dd>{total.toLocaleString('en-US')}</dd>
            </div>
            <div>
              <dt>Unique</dt>
              <dd>{unique.toLocaleString('en-US')}</dd>
            </div>
            {kw && (
              <div className="is-key">
                <dt>Keyword density</dt>
                <dd>{kw.density.toFixed(2)}%</dd>
                <small>
                  {kw.count} use{kw.count === 1 ? '' : 's'}. {kw.inFirst ? 'In' : 'Not in'} first 100 words.
                </small>
              </div>
            )}
          </dl>
          {verdict && (
            <ul className="ft-checks seo-gap">
              <li>
                <Verdict level={verdict.level}>{verdict.level === 'good' ? 'Healthy' : verdict.level === 'warn' ? 'Check' : 'Fix'}</Verdict>
                <span>{verdict.text}</span>
              </li>
              {kw && kw.count > 0 && !kw.inFirst && (
                <li>
                  <Verdict level="warn">Check</Verdict>
                  <span>Move one use into the first 100 words.</span>
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="ft-card">
          <Tabs
            label="Phrase length"
            value={String(n) as '1' | '2' | '3'}
            onChange={(v) => setN(Number(v) as N)}
            options={[
              { value: '1', label: '1 word' },
              { value: '2', label: '2 words' },
              { value: '3', label: '3 words' },
            ]}
          />
          {grams[n].length ? (
            <div className="ft-table-wrap">
              <table className="ft-table">
                <thead>
                  <tr>
                    <th scope="col">Phrase</th>
                    <th scope="col" className="num">
                      Count
                    </th>
                    <th scope="col" className="num">
                      Density
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {grams[n].map((r) => (
                    <tr key={r.phrase}>
                      <td>{r.phrase}</td>
                      <td className="num">{r.count}</td>
                      <td className="num">{pct(r.count)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="ft-empty">No repeated {n}-word phrases yet.</p>
          )}
          <div className="ft-actions">
            <CopyButton text={summary} label="Copy report" />
          </div>
        </div>

        {kw && (
          <div className="ft-card">
            <p className="ft-label">Preview</p>
            <div className="ft-prose">{preview}</div>
          </div>
        )}
      </div>
    </div>
  );
}
