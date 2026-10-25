'use client';

import { Fragment, useEffect, useId, useMemo, useState } from 'react';
import { CopyButton, downloadFile, num, useToolResult } from '../kit';
import { SelectField, TextField, longDate, parseISODate, printTarget, shortDate, toISODate } from './shared';
import './pr.css';

type Channel = 'LinkedIn' | 'X' | 'Instagram' | 'Blog' | 'Newsletter' | 'YouTube' | 'TikTok' | 'Podcast';

const CHANNELS: Channel[] = ['LinkedIn', 'X', 'Instagram', 'Blog', 'Newsletter', 'YouTube', 'TikTok', 'Podcast'];

const FORMATS: Record<Channel, string[]> = {
  LinkedIn: ['Text post', 'Carousel', 'Poll', 'Short video', 'Document post'],
  X: ['Thread', 'Single post', 'Image post', 'Quote post'],
  Instagram: ['Carousel', 'Reel', 'Story', 'Single image'],
  Blog: ['How-to', 'Case study', 'Opinion piece', 'List post'],
  Newsletter: ['Deep-dive issue', 'Roundup issue'],
  YouTube: ['Long-form video', 'Short'],
  TikTok: ['Short video', 'Talking head', 'Stitch or duet'],
  Podcast: ['Episode', 'Guest episode', 'Clip'],
};

const DEFAULT_COUNTS: Record<Channel, string> = {
  LinkedIn: '3',
  X: '5',
  Instagram: '3',
  Blog: '1',
  Newsletter: '1',
  YouTube: '1',
  TikTok: '3',
  Podcast: '1',
};

const IDEAS: Record<string, string[]> = {
  education: [
    'Answer the question customers ask most about {topic}',
    'Five common mistakes with {topic}, and the fix for each',
    'Explain one term from {topic} in plain words, with an example',
    'Step by step: how to get a first result with {topic} this week',
    'Before and after: one small change that fixed a common problem in {topic}',
    'A myth about {topic} and what the evidence says',
  ],
  proof: [
    'Customer result with one number and one quote',
    'Short case study: the problem, what changed, the result',
    'A metric you are proud of and what drove it',
    'Share a real customer message (with permission) and the story behind it',
    'Press mention or award, and what it means for customers',
    'Then and now: where a customer started and where they are today',
  ],
  'behind the scenes': [
    'How a recent decision got made, including what you rejected',
    'Introduce a team member and what they are working on',
    'A mistake from this month and how you fixed it',
    'Show work in progress on something new',
    'What a normal day looks like for the team',
    'The tools and rituals that keep the team moving',
  ],
  'point of view': [
    'A belief about {topic} that most people in your space disagree with',
    "React to this week's news in {topic} with a clear take",
    'Your prediction for {topic} over the next 12 months',
    'What most people get wrong about {topic}',
    'A trend in {topic} you are ignoring on purpose, and why',
    'The question about {topic} nobody is asking yet',
  ],
};

const GENERIC = [
  '{pillar}: one specific example and one takeaway',
  '{pillar}: answer a question your audience asked recently',
  '{pillar}: a short story with a clear lesson',
  '{pillar}: one number that matters and why',
];

type KeyDate = { id: number; date: string; label: string };

type Row = {
  week: number;
  date: Date;
  channel: string;
  pillar: string;
  format: string;
  idea: string;
  key?: boolean;
};

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Spread n posts over the week, Monday = 0. Weekends only when n > 5. */
function daysFor(n: number): number[] {
  const map: Record<number, number[]> = {
    1: [1],
    2: [1, 3],
    3: [0, 2, 4],
    4: [0, 1, 3, 4],
    5: [0, 1, 2, 3, 4],
    6: [0, 1, 2, 3, 4, 5],
    7: [0, 1, 2, 3, 4, 5, 6],
  };
  if (n <= 0) return [];
  if (n <= 7) return map[n];
  const out: number[] = [];
  for (let i = 0; i < n; i++) out.push(i % 7);
  return out.sort((a, b) => a - b);
}

function addDays(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

function dayDiff(a: Date, b: Date) {
  return Math.round((Date.UTC(a.getFullYear(), a.getMonth(), a.getDate()) - Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())) / 86400000);
}

function launchIdea(diff: number, label: string): string {
  if (diff <= -2) return `${label}, teaser: hint at what is coming without the full reveal`;
  if (diff === -1) return `${label}, countdown: the problem it solves, in one line`;
  if (diff === 0) return `${label}, announcement: what it is, who it is for and where to get it`;
  if (diff === 1) return `${label}, behind the scenes: one story from the build`;
  return `${label}, recap: first reactions, numbers and thank-yous`;
}

function generate(
  startISO: string,
  weeks: number,
  selected: Channel[],
  counts: Record<Channel, string>,
  pillars: string[],
  topic: string,
  keyDates: KeyDate[],
): Row[] {
  const start = parseISODate(startISO);
  if (!start || !selected.length) return [];
  const ps = pillars.map((p) => p.trim()).filter(Boolean);
  if (!ps.length) ps.push('General');
  const end = addDays(start, weeks * 7 - 1);
  const keys = keyDates
    .map((k) => ({ d: parseISODate(k.date), label: k.label.trim() || 'Key date' }))
    .filter((k): k is { d: Date; label: string } => !!k.d);
  const T = topic.trim() || 'your topic';

  const raw: { week: number; date: Date; channel: Channel; c: number }[] = [];
  for (let w = 0; w < weeks; w++) {
    for (const ch of selected) {
      const n = Math.min(14, Math.max(0, Math.round(num(counts[ch], 0))));
      daysFor(n).forEach((d) => raw.push({ week: w + 1, date: addDays(start, w * 7 + d), channel: ch, c: 0 }));
    }
  }
  raw.sort((a, b) => a.date.getTime() - b.date.getTime() || selected.indexOf(a.channel) - selected.indexOf(b.channel));

  const chCount: Partial<Record<Channel, number>> = {};
  const pillarUse: Record<string, number> = {};
  let g = 0;
  const rows: Row[] = raw.map((r) => {
    const c = chCount[r.channel] ?? 0;
    chCount[r.channel] = c + 1;
    const formats = FORMATS[r.channel];
    const format = formats[c % formats.length];
    const near = keys
      .map((k) => ({ ...k, diff: dayDiff(r.date, k.d) }))
      .filter((k) => k.diff >= -3 && k.diff <= 2)
      .sort((a, b) => Math.abs(a.diff) - Math.abs(b.diff))[0];
    if (near) {
      // Lead with the channel's main format on the day itself.
      const f = near.diff === 0 ? formats[0] : format;
      return { week: r.week, date: r.date, channel: r.channel, pillar: 'Launch', format: f, idea: launchIdea(near.diff, near.label) };
    }
    const pillar = ps[g % ps.length];
    g += 1;
    const used = pillarUse[pillar] ?? 0;
    pillarUse[pillar] = used + 1;
    const bank = IDEAS[pillar.toLowerCase()] ?? GENERIC;
    const idea = bank[used % bank.length].replace(/\{topic\}/g, T).replace(/\{pillar\}/g, pillar);
    return { week: r.week, date: r.date, channel: r.channel, pillar, format, idea };
  });

  for (const k of keys) {
    if (k.d < start || k.d > end) continue;
    rows.push({
      week: Math.floor(dayDiff(k.d, start) / 7) + 1,
      date: k.d,
      channel: 'All channels',
      pillar: 'Key date',
      format: 'Milestone',
      idea: k.label,
      key: true,
    });
  }
  rows.sort((a, b) => a.date.getTime() - b.date.getTime() || Number(!!b.key) - Number(!!a.key));
  return rows;
}

function lineFor(r: Row) {
  return `${DAY_NAMES[(r.date.getDay() + 6) % 7]} ${shortDate(r.date)} | ${r.channel} | ${r.pillar} | ${r.format} | ${r.idea}`;
}

function csvCell(v: string | number) {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function icsEscape(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/** Fold ICS lines at 75 characters. */
function icsFold(line: string) {
  const out: string[] = [];
  let rest = line;
  while (rest.length > 74) {
    out.push(rest.slice(0, 74));
    rest = ` ${rest.slice(74)}`;
  }
  out.push(rest);
  return out.join('\r\n');
}

function compact(d: Date) {
  return toISODate(d).replace(/-/g, '');
}

export default function ContentCalendar() {
  const [start, setStart] = useState('');
  const [weeks, setWeeks] = useState<'4' | '8' | '12'>('4');
  const [selected, setSelected] = useState<Channel[]>(['LinkedIn', 'X', 'Newsletter', 'Blog']);
  const [counts, setCounts] = useState<Record<Channel, string>>(DEFAULT_COUNTS);
  const [pillars, setPillars] = useState<string[]>(['Education', 'Proof', 'Behind the scenes', 'Point of view']);
  const [topic, setTopic] = useState('AI agents for IT support');
  const [keyDates, setKeyDates] = useState<KeyDate[]>([]);
  const [nextId, setNextId] = useState(2);
  const countId = useId();

  // Default start: the first Monday on or after today. Done after mount to keep SSR output stable.
  useEffect(() => {
    const today = new Date();
    const offset = (8 - today.getDay()) % 7;
    const monday = addDays(today, offset);
    setStart(toISODate(monday));
    setKeyDates([{ id: 1, date: toISODate(addDays(monday, 16)), label: 'Product launch' }]);
  }, []);

  function toggle(ch: Channel) {
    setSelected((prev) => (prev.includes(ch) ? prev.filter((c) => c !== ch) : CHANNELS.filter((c) => c === ch || prev.includes(c))));
  }

  const rows = useMemo(
    () => generate(start, Number(weeks), selected, counts, pillars, topic, keyDates),
    [start, weeks, selected, counts, pillars, topic, keyDates],
  );
  const posts = useMemo(() => rows.filter((r) => !r.key), [rows]);

  const summary = useMemo(() => {
    if (!rows.length) return '';
    const perPillar = new Map<string, number>();
    posts.forEach((r) => perPillar.set(r.pillar, (perPillar.get(r.pillar) ?? 0) + 1));
    const head = [
      `Content calendar: ${weeks} weeks from ${longDate(start)}`,
      `${posts.length} posts across ${selected.join(', ')}`,
      `Pillars: ${[...perPillar.entries()].map(([p, n]) => `${p} (${n})`).join(', ')}`,
    ];
    const firstTwo = rows.filter((r) => r.week <= 2);
    const body = [1, 2]
      .map((w) => [`Week ${w}`, ...firstTwo.filter((r) => r.week === w).map(lineFor)].join('\n'))
      .join('\n\n');
    return `${head.join('\n')}\n\n${body}`;
  }, [rows, posts, weeks, start, selected]);

  useToolResult(summary);

  function downloadCsv() {
    const header = ['Week', 'Date', 'Day', 'Channel', 'Pillar', 'Format', 'Idea', 'Status'];
    const body = rows.map((r) =>
      [r.week, toISODate(r.date), DAY_NAMES[(r.date.getDay() + 6) % 7], r.channel, r.pillar, r.format, r.idea, r.key ? '' : 'Not started']
        .map(csvCell)
        .join(','),
    );
    downloadFile(`content-calendar-${start}.csv`, `\ufeff${[header.join(','), ...body].join('\r\n')}`, 'text/csv;charset=utf-8');
  }

  function downloadIcs() {
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
    const events = rows.map((r, i) =>
      [
        'BEGIN:VEVENT',
        `UID:${compact(r.date)}-${i}@shilikajain-content-calendar`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${compact(r.date)}`,
        `DTEND;VALUE=DATE:${compact(addDays(r.date, 1))}`,
        icsFold(`SUMMARY:${icsEscape(r.key ? r.idea : `${r.channel}: ${r.format} (${r.pillar})`)}`),
        icsFold(`DESCRIPTION:${icsEscape(r.idea)}`),
        'TRANSP:TRANSPARENT',
        'END:VEVENT',
      ].join('\r\n'),
    );
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Shilika Jain//Content Calendar//EN', 'CALSCALE:GREGORIAN', ...events, 'END:VCALENDAR'].join('\r\n');
    downloadFile(`content-calendar-${start}.ics`, ics, 'text/calendar;charset=utf-8');
  }

  const weekNums = [...new Set(rows.map((r) => r.week))];
  const startDate = parseISODate(start);

  return (
    <div className="ft-stack">
      <div className="ft-card no-print">
        <div className="ft-grid">
          <div>
            <p className="ft-label">Plan</p>
            <div className="ft-row">
              <TextField label="Start date" type="date" value={start} onChange={setStart} />
              <SelectField
                label="Length"
                value={weeks}
                onChange={setWeeks}
                options={[
                  { value: '4', label: '4 weeks' },
                  { value: '8', label: '8 weeks' },
                  { value: '12', label: '12 weeks' },
                ]}
              />
            </div>
            <TextField label="Topic or product" value={topic} onChange={setTopic} hint="Used in the idea prompts." />

            <div className="ft-field" role="group" aria-label="Channels">
              <span>Channels</span>
              <div className="ft-chips">
                {CHANNELS.map((ch) => (
                  <button key={ch} type="button" className="ft-chip" aria-pressed={selected.includes(ch)} onClick={() => toggle(ch)}>
                    {ch}
                  </button>
                ))}
              </div>
            </div>
            {selected.length ? (
              <div className="ft-field" role="group" aria-label="Posts per week">
                <span>Posts per week</span>
                <div className="ft-chips">
                  {selected.map((ch) => (
                    <label key={ch} className="pr-channel" htmlFor={`${countId}-${ch}`}>
                      {ch}
                      <input
                        id={`${countId}-${ch}`}
                        type="number"
                        min={1}
                        max={14}
                        inputMode="numeric"
                        value={counts[ch]}
                        onChange={(e) => setCounts((c) => ({ ...c, [ch]: e.target.value }))}
                      />
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div>
            <p className="ft-label">Content pillars</p>
            <div className="pr-pillars">
              {pillars.map((p, i) => (
                <div className="pr-inline" key={i} style={{ gridTemplateColumns: 'minmax(0, 1fr) auto' }}>
                  <TextField
                    label={`Pillar ${i + 1}`}
                    value={p}
                    onChange={(v) => setPillars((ps) => ps.map((x, j) => (j === i ? v : x)))}
                  />
                  <button
                    type="button"
                    className="tool-btn tool-btn-small"
                    onClick={() => setPillars((ps) => ps.filter((_, j) => j !== i))}
                    disabled={pillars.length <= 1}
                    aria-label={`Remove pillar ${i + 1}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="ft-actions" style={{ marginTop: 8 }}>
              <button
                type="button"
                className="tool-btn tool-btn-small"
                onClick={() => setPillars((ps) => [...ps, ''])}
                disabled={pillars.length >= 8}
              >
                Add pillar
              </button>
            </div>

            <p className="ft-label pr-section-gap">Key dates</p>
            <div className="pr-rows">
              {keyDates.map((k, i) => (
                <div className="pr-inline" key={k.id}>
                  <TextField
                    label="Date"
                    type="date"
                    value={k.date}
                    onChange={(v) => setKeyDates((ks) => ks.map((x) => (x.id === k.id ? { ...x, date: v } : x)))}
                  />
                  <TextField
                    label="What"
                    value={k.label}
                    onChange={(v) => setKeyDates((ks) => ks.map((x) => (x.id === k.id ? { ...x, label: v } : x)))}
                  />
                  <button
                    type="button"
                    className="tool-btn tool-btn-small"
                    onClick={() => setKeyDates((ks) => ks.filter((x) => x.id !== k.id))}
                    aria-label={`Remove key date ${i + 1}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="tool-btn tool-btn-small"
              onClick={() => {
                const base = startDate ?? new Date();
                setKeyDates((ks) => [...ks, { id: nextId, date: toISODate(addDays(base, 7)), label: '' }]);
                setNextId((n) => n + 1);
              }}
            >
              Add key date
            </button>
            <p className="ft-hint" style={{ marginTop: 8 }}>
              Posts from three days before to two days after a key date switch to launch content.
            </p>
          </div>
        </div>
      </div>

      <div className="ft-card">
        <div className="pr-head no-print">
          <p className="ft-label">
            {posts.length} posts over {weeks} weeks
          </p>
          <div className="ft-actions" style={{ marginTop: 0 }}>
            <button type="button" className="tool-btn tool-btn-small tool-btn-primary" onClick={downloadCsv} disabled={!rows.length}>
              Download CSV
            </button>
            <button type="button" className="tool-btn tool-btn-small" onClick={downloadIcs} disabled={!rows.length}>
              Download .ics
            </button>
            <button type="button" className="tool-btn tool-btn-small" onClick={printTarget} disabled={!rows.length}>
              Print
            </button>
            <CopyButton text={summary} label="Copy first two weeks" />
          </div>
        </div>
        {!rows.length ? (
          <p className="ft-empty">{start ? 'Pick at least one channel.' : 'Setting up your calendar.'}</p>
        ) : (
          <div className="pr-print-target">
            <div className="ft-table-wrap">
              <table className="ft-table pr-cal">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Day</th>
                    <th scope="col">Channel</th>
                    <th scope="col">Pillar</th>
                    <th scope="col">Format</th>
                    <th scope="col">Idea</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {weekNums.map((w) => {
                    const ws = startDate ? addDays(startDate, (w - 1) * 7) : null;
                    return (
                      <Fragment key={w}>
                        <tr className="pr-week">
                          <td colSpan={7}>
                            Week {w}
                            {ws ? ` · ${shortDate(ws)} to ${shortDate(addDays(ws, 6))}` : ''}
                          </td>
                        </tr>
                        {rows
                          .filter((r) => r.week === w)
                          .map((r, i) => (
                            <tr key={i} className={r.key ? 'pr-keyrow' : undefined}>
                              <td style={{ whiteSpace: 'nowrap' }}>{shortDate(r.date)}</td>
                              <td>{DAY_NAMES[(r.date.getDay() + 6) % 7]}</td>
                              <td>{r.channel}</td>
                              <td>{r.pillar}</td>
                              <td>{r.format}</td>
                              <td>{r.idea}</td>
                              <td />
                            </tr>
                          ))}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
