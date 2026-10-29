'use client';

import { useId, useMemo, useState } from 'react';
import { CopyButton, Meter, useToolResult } from '../kit';
import './everyday.css';

const SAMPLE = `We shipped our AI agent to 40 design partners last month.

Three things surprised us:
1. Nobody read the docs. Everyone watched the 90-second demo.
2. The feature we almost cut became the one people paid for.
3. A single honest founder post brought in more demos than our launch PR.

If you are launching in Q4, start telling the story now. https://example.com/launch`;

type Counted = 'plain' | 'x';

const PLATFORMS: { group: string; items: { label: string; max: number; count?: Counted; note?: string }[] }[] = [
  {
    group: 'Social posts',
    items: [
      { label: 'X post', max: 280, count: 'x', note: 'Links count as 23, emoji and CJK as 2.' },
      { label: 'LinkedIn post', max: 3000 },
      { label: 'Instagram caption', max: 2200 },
      { label: 'TikTok caption', max: 4000 },
      { label: 'Threads post', max: 500 },
      { label: 'Bluesky post', max: 300 },
      { label: 'Facebook post', max: 63206, note: 'Truncates around 477 characters in the feed.' },
    ],
  },
  {
    group: 'Profiles',
    items: [
      { label: 'LinkedIn headline', max: 220 },
      { label: 'LinkedIn About', max: 2600 },
      { label: 'Instagram bio', max: 150 },
    ],
  },
  {
    group: 'Search and video',
    items: [
      { label: 'Meta title', max: 60 },
      { label: 'Meta description', max: 160 },
      { label: 'YouTube title', max: 100 },
      { label: 'YouTube description', max: 5000 },
    ],
  },
  {
    group: 'Messaging',
    items: [{ label: 'SMS (single message)', max: 160 }],
  },
];

const FOLDS = [
  { label: 'LinkedIn', at: 210 },
  { label: 'Instagram', at: 125 },
];

function graphemes(text: string): string[] {
  const Seg = (Intl as unknown as { Segmenter?: typeof Intl.Segmenter }).Segmenter;
  if (Seg) {
    const seg = new Seg('en', { granularity: 'grapheme' });
    return Array.from(seg.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

const URL_RE = /\bhttps?:\/\/[^\s]+|\b(?:[a-z0-9-]+\.)+(?:com|io|ai|xyz|co|org|net|app|dev|me)(?:\/[^\s]*)?/gi;
const EMOJI_RE = /\p{Extended_Pictographic}/u;

function xWeight(cp: number) {
  return (cp >= 0 && cp <= 4351) || (cp >= 8192 && cp <= 8205) || (cp >= 8208 && cp <= 8223) || (cp >= 8242 && cp <= 8247) ? 1 : 2;
}

function xCount(text: string): number {
  let total = 0;
  const stripped = text.normalize('NFC').replace(URL_RE, () => {
    total += 23;
    return '';
  });
  for (const g of graphemes(stripped)) {
    if (EMOJI_RE.test(g)) {
      total += 2;
      continue;
    }
    for (const ch of g) total += xWeight(ch.codePointAt(0) ?? 0);
  }
  return total;
}

function duration(words: number, wpm: number) {
  if (!words) return '0 sec';
  const secs = Math.round((words / wpm) * 60);
  if (secs < 60) return `${secs} sec`;
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return s ? `${m} min ${s} sec` : `${m} min`;
}

function foldAt(chars: string[], at: number) {
  if (chars.length <= at) return null;
  let head = chars.slice(0, at).join('');
  const sp = head.lastIndexOf(' ');
  if (sp > at * 0.7) head = head.slice(0, sp);
  return head.trimEnd();
}

export default function CharacterCounter() {
  const id = useId();
  const [text, setText] = useState(SAMPLE);

  const s = useMemo(() => {
    const g = graphemes(text);
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length : 0;
    const sentences = trimmed ? (trimmed.match(/[^.!?\n]+(?:[.!?]+|$)/gm) ?? []).filter((x) => /[\p{L}\p{N}]/u.test(x)).length : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim()).length : 0;
    return {
      g,
      chars: g.length,
      noSpaces: g.filter((c) => !/^\s+$/.test(c)).length,
      words,
      sentences,
      paragraphs,
      read: duration(words, 238),
      speak: duration(words, 150),
      x: xCount(text),
    };
  }, [text]);

  const rows = PLATFORMS.flatMap((p) => p.items.map((i) => ({ ...i, value: i.count === 'x' ? s.x : s.chars })));
  const over = rows.filter((r) => r.value > r.max).map((r) => r.label);

  const result = text.trim()
    ? [
        `Characters: ${s.chars} (${s.noSpaces} without spaces)`,
        `Words: ${s.words}, sentences: ${s.sentences}, paragraphs: ${s.paragraphs}`,
        `Reading time: ${s.read}, speaking time: ${s.speak}`,
        `X weighted count: ${s.x} / 280`,
        over.length ? `Over the limit for: ${over.join(', ')}` : 'Fits every platform limit checked.',
      ].join('\n')
    : '';
  useToolResult(result);

  return (
    <div className="ft-grid">
      <div className="ft-stack">
        <div className="ft-card">
          <div className="ft-field">
            <label htmlFor={`${id}-t`}>Your text</label>
            <textarea id={`${id}-t`} className="ft-tall" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div className="ft-actions">
            <CopyButton text={text} label="Copy text" />
            <button type="button" className="tool-btn tool-btn-small" onClick={() => setText('')} disabled={!text}>
              Clear
            </button>
          </div>
        </div>

        <dl className="ft-stats" aria-live="polite">
          <div className="is-key">
            <dt>Characters</dt>
            <dd>{s.chars.toLocaleString('en-US')}</dd>
            <small>{s.noSpaces.toLocaleString('en-US')} without spaces</small>
          </div>
          <div>
            <dt>Words</dt>
            <dd>{s.words.toLocaleString('en-US')}</dd>
          </div>
          <div>
            <dt>Sentences</dt>
            <dd>{s.sentences}</dd>
            <small>{s.paragraphs} paragraphs</small>
          </div>
          <div>
            <dt>Reading time</dt>
            <dd className="ev-dd-small">{s.read}</dd>
            <small>at 238 wpm</small>
          </div>
          <div>
            <dt>Speaking time</dt>
            <dd className="ev-dd-small">{s.speak}</dd>
            <small>at 150 wpm</small>
          </div>
        </dl>

        {text.trim() ? (
          <div className="ft-card">
            <p className="ft-label">Before &quot;see more&quot;</p>
            {FOLDS.map((f) => {
              const head = foldAt(s.g, f.at);
              return (
                <div key={f.label} className="ev-fold">
                  <p className="ev-fold-name">
                    {f.label} <span className="mono">~{f.at} chars</span>
                  </p>
                  {head === null ? (
                    <p className="ft-hint">The whole text shows without a fold.</p>
                  ) : (
                    <p className="ev-fold-text">
                      {head}
                      <span className="ev-fold-more"> ...see more</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="ft-card">
        {PLATFORMS.map((p) => (
          <div key={p.group} className="ev-meter-group">
            <p className="ft-label">{p.group}</p>
            <div className="ft-meters">
              {p.items.map((i) => (
                <div key={i.label}>
                  <Meter label={i.label} value={i.count === 'x' ? s.x : s.chars} max={i.max} />
                  {i.note ? <p className="ft-hint ev-meter-note">{i.note}</p> : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
