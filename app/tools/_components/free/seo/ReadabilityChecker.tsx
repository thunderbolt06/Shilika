'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { CopyButton, Score, useToolResult } from '../kit';
import { TextArea } from './ui';
import './seo.css';

const SAMPLE =
  'Most startups wait too long to start PR. They think coverage comes after traction. In practice it works the other way round. ' +
  'A clear story, told early and often, makes every sales call and investor meeting easier. ' +
  'The launch announcement was written by the founders and was reviewed by three advisers before it was finally sent to a short list of reporters who had covered the category in the last six months, which meant that nearly every pitch landed with someone who already understood the problem. ' +
  'Keep sentences short. Use plain words. Lead with the number that matters, then explain why it matters to the reader.';

const ADVERB_SKIP = new Set([
  'only', 'family', 'reply', 'apply', 'supply', 'early', 'belly', 'holy', 'italy', 'july', 'rely', 'ally', 'fly', 'imply',
  'multiply', 'ugly', 'silly', 'friendly', 'lovely', 'lonely', 'likely', 'daily', 'weekly', 'monthly', 'yearly', 'jelly',
  'bully', 'rally', 'tally', 'comply', 'assembly', 'anomaly', 'butterfly', 'reply', 'costly', 'elderly', 'curly', 'hourly',
]);
const PARTICIPLE_SKIP = new Set([
  'been', 'often', 'even', 'open', 'ten', 'when', 'then', 'seven', 'eleven', 'heaven', 'golden', 'sudden', 'token', 'women', 'men',
  'citizen', 'screen', 'green', 'between', 'teen', 'queen', 'listen', 'garden', 'children', 'kitchen', 'oxygen', 'chicken',
  'need', 'seed', 'feed', 'speed', 'indeed', 'bed', 'red', 'shed', 'hundred', 'sacred', 'naked', 'wicked', 'kindred',
]);
const PASSIVE_RE = /\b(am|is|are|was|were|be|been|being)\s+(?:(?:not|also|often|still|just|already|never|being)\s+)?([a-z]+(?:ed|en))\b/gi;

/** Heuristic English syllable counter. */
function syllables(word: string): number {
  let w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|[^laeiouytd]ed|[^laeiouy]e)$/, '');
  w = w.replace(/^y/, '');
  const groups = w.match(/[aeiouy]{1,2}/g);
  let n = groups ? groups.length : 1;
  // "ia", "io", "eo" usually split into two syllables (media, radio, video), except after t, s, c, g, x (nation, social).
  n += (w.match(/(?<![tscgx])(?:ia|io)(?!u)|eo$/g) ?? []).length;
  return Math.max(1, n);
}

type Seg = { text: string; sentence: boolean; words: number };

function segment(text: string): Seg[] {
  const out: Seg[] = [];
  const re = /[^.!?\n]*[.!?]+["'”’)\]]*|[^.!?\n]+/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ text: text.slice(last, i), sentence: false, words: 0 });
    const words = (m[0].match(/[A-Za-z0-9À-ɏ'’-]+/g) ?? []).length;
    out.push({ text: m[0], sentence: words > 0, words });
    last = i + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last), sentence: false, words: 0 });
  return out;
}

function passiveMatches(s: string): RegExpMatchArray[] {
  return [...s.matchAll(PASSIVE_RE)].filter((m) => !PARTICIPLE_SKIP.has(m[2].toLowerCase()));
}

function verdictFor(grade: number): string {
  if (grade <= 6) return 'Very easy to read.';
  if (grade <= 8) return 'Plain English.';
  if (grade <= 10) return 'Fairly easy to read.';
  if (grade <= 12) return 'Fairly hard to read.';
  if (grade <= 16) return 'Hard. College level.';
  return 'Very hard. Academic level.';
}

function fleschLabel(f: number): string {
  if (f >= 80) return 'Easy';
  if (f >= 60) return 'Plain English';
  if (f >= 50) return 'Fairly hard';
  if (f >= 30) return 'Hard';
  return 'Very hard';
}

const r1 = (n: number) => (Number.isFinite(n) ? Math.round(n * 10) / 10 : 0);

export default function ReadabilityChecker() {
  const [text, setText] = useState(SAMPLE);

  const segs = useMemo(() => segment(text), [text]);

  const stats = useMemo(() => {
    const words = (text.match(/[A-Za-z0-9À-ɏ]+(?:['’-][A-Za-z0-9À-ɏ]+)*/g) ?? []) as string[];
    const W = words.length;
    const sentences = segs.filter((s) => s.sentence);
    const S = Math.max(1, sentences.length);
    if (!W) return null;
    let syl = 0;
    let complex = 0;
    let letters = 0;
    let adverbs = 0;
    for (const w of words) {
      const n = syllables(w);
      syl += n;
      if (n >= 3 && !/(?:ing|ed|es)$/i.test(w) && !/-/.test(w)) complex++;
      letters += w.replace(/[^A-Za-z0-9À-ɏ]/g, '').length;
      const lw = w.toLowerCase();
      if (lw.length > 4 && lw.endsWith('ly') && !ADVERB_SKIP.has(lw)) adverbs++;
    }
    const poly = words.filter((w) => syllables(w) >= 3).length;
    const wps = W / S;
    const spw = syl / W;
    const fre = 206.835 - 1.015 * wps - 84.6 * spw;
    const fk = 0.39 * wps + 11.8 * spw - 15.59;
    const fog = 0.4 * (wps + 100 * (complex / W));
    const smog = 1.043 * Math.sqrt(poly * (30 / S)) + 3.1291;
    const cli = 0.0588 * ((letters / W) * 100) - 0.296 * ((S / W) * 100) - 15.8;
    const ari = 4.71 * (letters / W) + 0.5 * wps - 21.43;
    const grades = [fk, fog, smog, cli, ari];
    const avg = grades.reduce((a, b) => a + b, 0) / grades.length;
    const long = sentences.filter((s) => s.words > 25).length;
    const veryLong = sentences.filter((s) => s.words > 35).length;
    const passive = sentences.reduce((a, s) => a + passiveMatches(s.text).length, 0);
    return {
      W,
      S: sentences.length,
      fre: Math.max(0, Math.min(100, fre)),
      freRaw: fre,
      fk,
      fog,
      smog,
      cli,
      ari,
      avg: Math.max(0, avg),
      wps,
      spw,
      complexPct: (complex / W) * 100,
      long,
      veryLong,
      passive,
      adverbs,
    };
  }, [text, segs]);

  const grade = stats ? Math.max(1, Math.round(stats.avg)) : 0;
  const headline = stats ? `Grade ${grade}. ${verdictFor(stats.avg)}` : '';

  const summary = stats
    ? [
        headline,
        `Flesch Reading Ease: ${r1(stats.freRaw)} (${fleschLabel(stats.freRaw)})`,
        `Flesch-Kincaid Grade: ${r1(stats.fk)}`,
        `Gunning Fog: ${r1(stats.fog)}`,
        `SMOG: ${r1(stats.smog)}`,
        `Coleman-Liau: ${r1(stats.cli)}`,
        `ARI: ${r1(stats.ari)}`,
        `Average grade: ${r1(stats.avg)}`,
        '',
        `Words: ${stats.W}. Sentences: ${stats.S}. Avg sentence: ${r1(stats.wps)} words. Avg syllables per word: ${stats.spw.toFixed(2)}.`,
        `Complex words: ${r1(stats.complexPct)}%. Long sentences (over 25 words): ${stats.long}. Very long (over 35): ${stats.veryLong}.`,
        `Passive voice: ${stats.passive}. Adverbs: ${stats.adverbs}.`,
      ].join('\n')
    : '';
  useToolResult(summary);

  const preview = useMemo(
    () =>
      segs.map((s, i) => {
        if (!s.sentence) return s.text;
        const inner: ReactNode[] = [];
        let last = 0;
        for (const m of passiveMatches(s.text)) {
          const at = m.index ?? 0;
          if (at > last) inner.push(s.text.slice(last, at));
          inner.push(
            <span key={at} className="seo-passive" title="Passive voice">
              {m[0]}
            </span>,
          );
          last = at + m[0].length;
        }
        inner.push(s.text.slice(last));
        if (s.words > 35)
          return (
            <mark key={i} className="ft-mark-bad" title={`${s.words} words`}>
              {inner}
            </mark>
          );
        if (s.words > 25)
          return (
            <mark key={i} className="ft-mark" title={`${s.words} words`}>
              {inner}
            </mark>
          );
        return <span key={i}>{inner}</span>;
      }),
    [segs],
  );

  return (
    <div className="ft-grid">
      <div className="ft-card">
        <TextArea label="Text" value={text} tall onChange={setText} />
        <div className="ft-actions">
          <button type="button" className="tool-btn tool-btn-small" onClick={() => setText('')} disabled={!text}>
            Clear
          </button>
          <CopyButton text={summary} label="Copy report" />
        </div>
      </div>

      <div className="ft-stack" aria-live="polite">
        {!stats ? (
          <div className="ft-card">
            <p className="ft-empty">Paste some text to score it.</p>
          </div>
        ) : (
          <>
            <div className="ft-card">
              <p className="seo-headline">{headline}</p>
              <Score value={stats.fre} label={`Flesch reading ease. ${fleschLabel(stats.freRaw)}`} />
              <dl className="ft-stats">
                <div className="is-key">
                  <dt>Average grade</dt>
                  <dd>{r1(stats.avg)}</dd>
                  <small>Aim for 8 or lower on web copy.</small>
                </div>
                <div>
                  <dt>Flesch-Kincaid</dt>
                  <dd>{r1(stats.fk)}</dd>
                </div>
                <div>
                  <dt>Gunning Fog</dt>
                  <dd>{r1(stats.fog)}</dd>
                </div>
                <div>
                  <dt>SMOG</dt>
                  <dd>{r1(stats.smog)}</dd>
                </div>
                <div>
                  <dt>Coleman-Liau</dt>
                  <dd>{r1(stats.cli)}</dd>
                </div>
                <div>
                  <dt>ARI</dt>
                  <dd>{r1(stats.ari)}</dd>
                </div>
              </dl>
            </div>
            <div className="ft-card">
              <dl className="ft-stats">
                <div>
                  <dt>Words</dt>
                  <dd>{stats.W.toLocaleString('en-US')}</dd>
                </div>
                <div>
                  <dt>Sentences</dt>
                  <dd>{stats.S}</dd>
                  <small>{r1(stats.wps)} words each on average</small>
                </div>
                <div>
                  <dt>Syllables / word</dt>
                  <dd>{stats.spw.toFixed(2)}</dd>
                </div>
                <div>
                  <dt>Complex words</dt>
                  <dd>{r1(stats.complexPct)}%</dd>
                  <small>3+ syllables</small>
                </div>
                <div>
                  <dt>Long sentences</dt>
                  <dd>{stats.long}</dd>
                  <small>Over 25 words. {stats.veryLong} over 35.</small>
                </div>
                <div>
                  <dt>Passive voice</dt>
                  <dd>{stats.passive}</dd>
                </div>
                <div>
                  <dt>Adverbs</dt>
                  <dd>{stats.adverbs}</dd>
                  <small>Words ending in -ly</small>
                </div>
              </dl>
            </div>
            <div className="ft-card">
              <p className="ft-label">Preview</p>
              <p className="ft-hint seo-legend">
                <mark className="ft-mark">Long sentence</mark> <mark className="ft-mark-bad">Very long</mark>{' '}
                <span className="seo-passive">Passive voice</span>
              </p>
              <div className="ft-prose">{preview}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
