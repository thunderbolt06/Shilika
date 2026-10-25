'use client';

import { useEffect, useId, useState } from 'react';
import { CopyButton, Meter, useToolResult, Verdict } from '../kit';
import './everyday.css';

const TITLE_FONT = '20px Arial';
const DESC_FONT = '14px Arial';
const TITLE_PX = 600;
const DESC_PX_DESKTOP = 920;
const DESC_PX_MOBILE = 680;

type Measure = (text: string, font: string) => number;

// Rough Arial averages, used only until the canvas is ready after mount.
const estimate: Measure = (text, font) => text.length * (font.startsWith('20') ? 9.4 : 6.2);

function truncate(text: string, font: string, limit: number, measure: Measure): { text: string; cut: boolean } {
  if (measure(text, font) <= limit) return { text, cut: false };
  let lo = 0;
  let hi = text.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (measure(text.slice(0, mid).trimEnd() + ' ...', font) <= limit) lo = mid;
    else hi = mid - 1;
  }
  let cut = text.slice(0, lo);
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > lo * 0.6) cut = cut.slice(0, lastSpace);
  return { text: cut.replace(/[\s,;:.\-|]+$/, '') + ' ...', cut: true };
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function breadcrumb(raw: string): { site: string; host: string; path: string[] } {
  try {
    const u = new URL(/^https?:\/\//i.test(raw.trim()) ? raw.trim() : `https://${raw.trim()}`);
    const host = u.hostname.replace(/^www\./, '');
    const base = host.split('.')[0] ?? host;
    const site = base.charAt(0).toUpperCase() + base.slice(1);
    const path = u.pathname
      .split('/')
      .filter(Boolean)
      .map((p) => decodeURIComponent(p));
    return { site, host: `${u.protocol}//${u.hostname}`, path };
  } catch {
    return { site: 'Your site', host: 'https://example.com', path: [] };
  }
}

function Highlight({ text, kw }: { text: string; kw: string }) {
  const k = kw.trim();
  if (!k) return <>{text}</>;
  const re = new RegExp(`(${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) => (i % 2 === 1 ? <b key={i}>{p}</b> : <span key={i}>{p}</span>))}
    </>
  );
}

export default function SerpChecker() {
  const id = useId();
  const [title, setTitle] = useState('AI Startup PR: Get Press, Citations and Trust | Shilika');
  const [desc, setDesc] = useState(
    'AI startup PR from a fractional team. Earn coverage in TechCrunch and trade press, get cited by ChatGPT, and turn launches into pipeline.',
  );
  const [url, setUrl] = useState('https://example.com/services/ai-startup-pr');
  const [kw, setKw] = useState('AI startup PR');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [measure, setMeasure] = useState<Measure | null>(null);

  useEffect(() => {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return;
    const cache = new Map<string, number>();
    const fn: Measure = (text, font) => {
      const key = font + '|' + text;
      const hit = cache.get(key);
      if (hit !== undefined) return hit;
      ctx.font = font;
      const w = ctx.measureText(text).width;
      if (cache.size > 4000) cache.clear();
      cache.set(key, w);
      return w;
    };
    setMeasure(() => fn);
  }, []);

  const m = measure ?? estimate;
  const t = title.trim();
  const d = desc.trim();
  const titlePx = Math.round(m(t, TITLE_FONT));
  const descPx = Math.round(m(d, DESC_FONT));
  const descLimit = device === 'desktop' ? DESC_PX_DESKTOP : DESC_PX_MOBILE;
  const tTrunc = truncate(t, TITLE_FONT, TITLE_PX, m);
  const dTrunc = truncate(d, DESC_FONT, descLimit, m);
  const crumb = breadcrumb(url);

  const k = kw.trim().toLowerCase();
  const tIdx = k ? t.toLowerCase().indexOf(k) : -1;
  const dHas = k ? d.toLowerCase().includes(k) : false;

  type Check = { level: 'good' | 'warn' | 'bad'; tag: string; text: string; detail?: string };
  const checks: Check[] = [];

  if (!t) checks.push({ level: 'bad', tag: 'Missing', text: 'Title is empty.' });
  else if (t.length < 30) checks.push({ level: 'warn', tag: 'Short', text: `Title is ${t.length} characters.`, detail: 'Use 30 to 60 characters to describe the page fully.' });
  else if (titlePx > TITLE_PX) checks.push({ level: 'bad', tag: 'Truncated', text: `Title is ${titlePx}px wide, over the ~${TITLE_PX}px limit.`, detail: 'Google will cut it. Move the keyword forward and trim the end.' });
  else checks.push({ level: 'good', tag: 'Ideal', text: `Title fits at ${titlePx}px (${t.length} characters).` });

  if (!d) checks.push({ level: 'bad', tag: 'Missing', text: 'Description is empty.', detail: 'Google will pull text from the page instead.' });
  else if (d.length < 70) checks.push({ level: 'warn', tag: 'Short', text: `Description is ${d.length} characters.`, detail: 'Aim for 120 to 155 characters so it fills the snippet.' });
  else if (descPx > DESC_PX_DESKTOP) checks.push({ level: 'bad', tag: 'Truncated', text: `Description is ${descPx}px, over the desktop limit of ~${DESC_PX_DESKTOP}px.`, detail: 'Put the main point and call to action in the first 120 characters.' });
  else if (descPx > DESC_PX_MOBILE) checks.push({ level: 'warn', tag: 'Mobile cut', text: `Description fits desktop but is cut on mobile (~${DESC_PX_MOBILE}px).`, detail: 'Fine if the first sentence stands on its own.' });
  else checks.push({ level: 'good', tag: 'Ideal', text: `Description fits on desktop and mobile (${d.length} characters).` });

  if (k) {
    if (tIdx < 0) checks.push({ level: 'bad', tag: 'Keyword', text: 'Keyword not found in the title.' });
    else if (tIdx <= Math.max(10, t.length * 0.3)) checks.push({ level: 'good', tag: 'Keyword', text: 'Keyword appears near the start of the title.' });
    else checks.push({ level: 'warn', tag: 'Keyword', text: 'Keyword is in the title, but late.', detail: 'Words near the start carry more weight and survive truncation.' });
    checks.push(
      dHas
        ? { level: 'good', tag: 'Keyword', text: 'Keyword appears in the description.', detail: 'Google bolds matching words in the snippet.' }
        : { level: 'warn', tag: 'Keyword', text: 'Keyword is missing from the description.' },
    );
  }

  const tags = `<title>${escapeHtml(t)}</title>\n<meta name="description" content="${escapeHtml(d)}">`;

  const result =
    t || d
      ? [
          `Title (${t.length} chars, ${titlePx}px of ~${TITLE_PX}px): ${t}`,
          `Description (${d.length} chars, ${descPx}px of ~${DESC_PX_DESKTOP}px desktop): ${d}`,
          '',
          ...checks.map((c) => `[${c.tag}] ${c.text}${c.detail ? ' ' + c.detail : ''}`),
          '',
          tags,
        ].join('\n')
      : '';
  useToolResult(result);

  return (
    <div className="ft-grid">
      <div className="ft-card">
        <div className="ft-field">
          <label htmlFor={`${id}-t`}>Title</label>
          <input id={`${id}-t`} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="ft-field">
          <label htmlFor={`${id}-d`}>Meta description</label>
          <textarea id={`${id}-d`} value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} />
        </div>
        <div className="ft-field">
          <label htmlFor={`${id}-u`}>Page URL</label>
          <input id={`${id}-u`} type="url" inputMode="url" value={url} onChange={(e) => setUrl(e.target.value)} spellCheck={false} />
        </div>
        <div className="ft-field">
          <label htmlFor={`${id}-k`}>Target keyword (optional)</label>
          <input id={`${id}-k`} value={kw} onChange={(e) => setKw(e.target.value)} />
        </div>
        <div className="ft-meters">
          <Meter label="Title characters" value={t.length} max={60} />
          <Meter label="Title pixels" value={titlePx} max={TITLE_PX} />
          <Meter label="Description characters" value={d.length} max={158} />
          <Meter label={`Description pixels (${device})`} value={descPx} max={descLimit} />
        </div>
      </div>

      <div className="ft-stack">
        <div className="ft-card">
          <div className="ft-tabs" role="group" aria-label="Preview device">
            <button type="button" aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')}>
              Desktop
            </button>
            <button type="button" aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')}>
              Mobile
            </button>
          </div>
          <div className={`ev-serp${device === 'mobile' ? ' is-mobile' : ''}`} aria-live="polite">
            <div className="ev-serp-site">
              <span className="ev-serp-fav" aria-hidden="true">
                {crumb.site.charAt(0)}
              </span>
              <span className="ev-serp-meta">
                <span className="ev-serp-name">{crumb.site}</span>
                <span className="ev-serp-url">
                  {crumb.host}
                  {crumb.path.map((p) => ` › ${p}`).join('')}
                </span>
              </span>
            </div>
            <p className="ev-serp-title">{tTrunc.text || 'Your page title'}</p>
            <p className="ev-serp-desc">{d ? <Highlight text={dTrunc.text} kw={kw} /> : 'Your meta description will show here.'}</p>
          </div>
          {!measure ? <p className="ft-hint ev-mt">Measuring with an estimate until fonts load.</p> : null}
        </div>

        <div className="ft-card">
          <ul className="ft-checks">
            {checks.map((c, i) => (
              <li key={i}>
                <Verdict level={c.level}>{c.tag}</Verdict>
                <span>{c.text}</span>
                {c.detail ? <p>{c.detail}</p> : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="ft-card">
          <p className="ft-label">HTML tags</p>
          <pre className="ft-output">{tags}</pre>
          <div className="ft-actions">
            <CopyButton text={tags} label="Copy tags" />
          </div>
        </div>
      </div>
    </div>
  );
}
