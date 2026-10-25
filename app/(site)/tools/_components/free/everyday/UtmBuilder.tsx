'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { CopyButton, useToolResult, Verdict } from '../kit';
import './everyday.css';

const PRESETS: { label: string; source: string; medium: string }[] = [
  { label: 'Newsletter', source: 'newsletter', medium: 'email' },
  { label: 'LinkedIn', source: 'linkedin', medium: 'social' },
  { label: 'X', source: 'x', medium: 'social' },
  { label: 'Instagram', source: 'instagram', medium: 'social' },
  { label: 'Google Ads', source: 'google', medium: 'cpc' },
  { label: 'Meta Ads', source: 'facebook', medium: 'paid_social' },
  { label: 'Podcast', source: 'podcast', medium: 'audio' },
  { label: 'QR / print', source: 'qr', medium: 'offline' },
];

const STORE_KEY = 'shilika-utm-history';

type Saved = { link: string; campaign: string };

type Sep = '-' | '_';

function clean(v: string, lower: boolean, sep: Sep) {
  let s = v.trim().replace(/\s+/g, sep);
  if (lower) s = s.toLowerCase();
  return s;
}

function build(
  url: string,
  params: [string, string][],
): { link: string; error: string } {
  const raw = url.trim();
  if (!raw) return { link: '', error: 'Add a website URL.' };
  const withProto = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  let u: URL;
  try {
    u = new URL(withProto);
  } catch {
    return { link: '', error: 'That URL does not look valid.' };
  }
  if (!u.hostname.includes('.') && u.hostname !== 'localhost') {
    return { link: '', error: 'That URL does not look valid.' };
  }
  for (const [k, v] of params) {
    if (v) u.searchParams.set(k, v);
    else u.searchParams.delete(k);
  }
  return { link: u.toString(), error: '' };
}

export default function UtmBuilder() {
  const id = useId();
  const [url, setUrl] = useState('https://example.com/launch');
  const [source, setSource] = useState('linkedin');
  const [medium, setMedium] = useState('social');
  const [campaign, setCampaign] = useState('q4-launch');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [utmId, setUtmId] = useState('');
  const [lower, setLower] = useState(true);
  const [sep, setSep] = useState<Sep>('-');
  const [saved, setSaved] = useState<Saved[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setSaved(parsed.slice(0, 10));
      }
    } catch {
      /* storage blocked */
    }
  }, []);

  function persist(next: Saved[]) {
    setSaved(next);
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* storage blocked */
    }
  }

  const values = {
    source: clean(source, lower, sep),
    medium: clean(medium, lower, sep),
    campaign: clean(campaign, lower, sep),
    term: clean(term, lower, sep),
    content: clean(content, lower, sep),
    id: clean(utmId, lower, sep),
  };

  const { link, error } = useMemo(
    () =>
      build(url, [
        ['utm_source', values.source],
        ['utm_medium', values.medium],
        ['utm_campaign', values.campaign],
        ['utm_term', values.term],
        ['utm_content', values.content],
        ['utm_id', values.id],
      ]),
    [url, values.source, values.medium, values.campaign, values.term, values.content, values.id],
  );

  const warnings: { level: 'warn' | 'bad'; text: string }[] = [];
  if (error) warnings.push({ level: 'bad', text: error });
  if (url.trim() && !/^https:\/\//i.test(url.trim()) && !error) {
    warnings.push({
      level: 'warn',
      text: /^http:\/\//i.test(url.trim()) ? 'The URL uses http. Use https if your site supports it.' : 'No protocol given, so https:// was added.',
    });
  }
  if (!values.source) warnings.push({ level: 'bad', text: 'utm_source is missing. GA4 needs it to attribute the visit.' });
  if (!values.medium) warnings.push({ level: 'warn', text: 'utm_medium is missing. Visits may land in "(not set)".' });
  if (!values.campaign) warnings.push({ level: 'warn', text: 'utm_campaign is missing. Add one so you can compare campaigns.' });
  if (!lower && /[A-Z]/.test(source + medium + campaign + term + content)) {
    warnings.push({ level: 'warn', text: 'Mixed case splits reports. "LinkedIn" and "linkedin" count as two sources.' });
  }

  const resultText = link
    ? [
        `UTM link: ${link}`,
        '',
        `utm_source: ${values.source || '(none)'}`,
        `utm_medium: ${values.medium || '(none)'}`,
        `utm_campaign: ${values.campaign || '(none)'}`,
        values.term ? `utm_term: ${values.term}` : null,
        values.content ? `utm_content: ${values.content}` : null,
        values.id ? `utm_id: ${values.id}` : null,
      ]
        .filter((l) => l !== null)
        .join('\n')
    : '';
  useToolResult(resultText);

  function save() {
    if (!link) return;
    const next = [{ link, campaign: values.campaign }, ...saved.filter((s) => s.link !== link)].slice(0, 10);
    persist(next);
  }

  const activePreset = PRESETS.find((p) => p.source === values.source && p.medium === values.medium)?.label;

  return (
    <div className="ft-grid">
      <div className="ft-card">
        <div className="ft-field">
          <label htmlFor={`${id}-url`}>Website URL</label>
          <input
            id={`${id}-url`}
            type="url"
            inputMode="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/page"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <p className="ft-label" id={`${id}-presets`}>
          Quick presets
        </p>
        <div className="ft-chips ev-mb" role="group" aria-labelledby={`${id}-presets`}>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              className="ft-chip"
              aria-pressed={activePreset === p.label}
              onClick={() => {
                setSource(p.source);
                setMedium(p.medium);
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="ft-row">
          <div className="ft-field">
            <label htmlFor={`${id}-src`}>utm_source</label>
            <input id={`${id}-src`} value={source} onChange={(e) => setSource(e.target.value)} placeholder="linkedin" spellCheck={false} />
          </div>
          <div className="ft-field">
            <label htmlFor={`${id}-med`}>utm_medium</label>
            <input id={`${id}-med`} value={medium} onChange={(e) => setMedium(e.target.value)} placeholder="social" spellCheck={false} />
          </div>
        </div>
        <div className="ft-field">
          <label htmlFor={`${id}-camp`}>utm_campaign</label>
          <input id={`${id}-camp`} value={campaign} onChange={(e) => setCampaign(e.target.value)} placeholder="q4-launch" spellCheck={false} />
        </div>

        <details className="ev-details">
          <summary>Optional: term, content, ID</summary>
          <div className="ft-row-3">
            <div className="ft-field">
              <label htmlFor={`${id}-term`}>utm_term</label>
              <input id={`${id}-term`} value={term} onChange={(e) => setTerm(e.target.value)} placeholder="ai pr" spellCheck={false} />
            </div>
            <div className="ft-field">
              <label htmlFor={`${id}-content`}>utm_content</label>
              <input id={`${id}-content`} value={content} onChange={(e) => setContent(e.target.value)} placeholder="hero-cta" spellCheck={false} />
            </div>
            <div className="ft-field">
              <label htmlFor={`${id}-id`}>utm_id</label>
              <input id={`${id}-id`} value={utmId} onChange={(e) => setUtmId(e.target.value)} placeholder="cmp-104" spellCheck={false} />
            </div>
          </div>
        </details>

        <label className="ft-check">
          <input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} />
          Force lowercase
        </label>
        <div className="ft-field ev-mt">
          <span id={`${id}-sep`}>Replace spaces with</span>
          <div className="ft-tabs" role="group" aria-labelledby={`${id}-sep`}>
            <button type="button" aria-pressed={sep === '-'} onClick={() => setSep('-')}>
              Hyphen -
            </button>
            <button type="button" aria-pressed={sep === '_'} onClick={() => setSep('_')}>
              Underscore _
            </button>
          </div>
        </div>
      </div>

      <div className="ft-stack">
        <div className="ft-card" aria-live="polite">
          <p className="ft-label">Your link</p>
          {link ? (
            <pre className="ft-output ev-link">{link}</pre>
          ) : (
            <p className="ft-empty">Add a valid URL to build your link.</p>
          )}
          <div className="ft-actions">
            <CopyButton text={link} label="Copy link" className="tool-btn tool-btn-primary" />
            <button type="button" className="tool-btn tool-btn-small" onClick={save} disabled={!link}>
              Save link
            </button>
            {link ? (
              <a className="tool-btn tool-btn-small" href={`/tools/qr-code-generator?data=${encodeURIComponent(link)}`}>
                Make a QR code
              </a>
            ) : null}
          </div>
          {warnings.length > 0 ? (
            <ul className="ft-checks ev-mt">
              {warnings.map((w) => (
                <li key={w.text}>
                  <Verdict level={w.level}>{w.level === 'bad' ? 'Fix' : 'Check'}</Verdict>
                  <span>{w.text}</span>
                </li>
              ))}
            </ul>
          ) : link ? (
            <p className="ft-hint ev-mt">
              <Verdict level="good">Ready</Verdict> Source, medium and campaign are set.
            </p>
          ) : null}
        </div>

        <div className="ft-card">
          <p className="ft-label">Saved links ({saved.length}/10)</p>
          {saved.length === 0 ? (
            <p className="ft-empty">Links you save stay in this browser.</p>
          ) : (
            <ul className="ev-saved">
              {saved.map((s) => (
                <li key={s.link}>
                  <span className="ev-saved-camp">{s.campaign || 'no campaign'}</span>
                  <code>{s.link}</code>
                  <div className="ev-saved-actions">
                    <CopyButton text={s.link} />
                    <button type="button" className="tool-btn tool-btn-small" onClick={() => persist(saved.filter((x) => x.link !== s.link))}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
