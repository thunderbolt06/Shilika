'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { DownloadButton, useToolResult } from '../kit';
import { AreaField, TextField, countWords, escapeHtml, fileSlug, printTarget, safeUrl } from './shared';
import './pr.css';

type Metric = { label: string; value: string };
type Person = { name: string; title: string; bio: string; photo: string; link: string };
type Coverage = { outlet: string; headline: string; url: string; date: string };
type Fact = { date: string; text: string };
type Color = { name: string; hex: string };

type Kit = {
  company: string;
  tagline: string;
  logo: string;
  oneLine: string;
  shortBp: string;
  longBp: string;
  founded: string;
  hq: string;
  team: string;
  metrics: Metric[];
  people: Person[];
  coverage: Coverage[];
  facts: Fact[];
  colors: Color[];
  logoPack: string;
  photos: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};

const EXAMPLE: Kit = {
  company: 'Northwind AI',
  tagline: 'AI agents that clear the IT queue.',
  logo: '',
  oneLine: 'Northwind AI builds AI agents that resolve routine IT tickets inside Slack and Microsoft Teams.',
  shortBp:
    'Northwind AI builds AI agents that take repetitive work off IT teams. Its first product, Relay, resolves password resets, access requests and software installs inside Slack and Teams, and logs every action for audit. More than 120 companies use it today. Northwind AI is based in San Francisco.',
  longBp:
    'Northwind AI builds AI agents that take repetitive work off IT teams. Its first product, Relay, resolves tier-one tickets such as password resets, access requests and software installs inside Slack and Microsoft Teams, with every action logged for audit.\n\nThe company was founded in 2023 by Dana Okafor and Sam Whitlock, who previously built service desk products at Fabrikam. Northwind AI is based in San Francisco, has 48 employees and is backed by Halcyon Ventures and Bluefin Capital.',
  founded: '2023',
  hq: 'San Francisco',
  team: '48',
  metrics: [
    { label: 'Customers', value: '120+' },
    { label: 'Tickets resolved', value: '1M+' },
    { label: 'Raised', value: '$24M' },
  ],
  people: [
    {
      name: 'Dana Okafor',
      title: 'CEO and co-founder',
      bio: 'Previously scaled the service desk product at Fabrikam to $40M in annual revenue.',
      photo: '',
      link: '',
    },
    {
      name: 'Sam Whitlock',
      title: 'CTO and co-founder',
      bio: 'Led platform engineering at Fabrikam. Holds two patents in automated ticket routing.',
      photo: '',
      link: '',
    },
  ],
  coverage: [
    { outlet: 'TechPulse', headline: 'The AI agent that wants to empty your IT queue', url: '', date: 'Sep 2026' },
    { outlet: 'The Ledger Weekly', headline: 'Northwind AI raises $18M Series A', url: '', date: 'Jun 2026' },
  ],
  facts: [
    { date: '2023', text: 'Founded in San Francisco' },
    { date: '2025', text: 'Relay launches in public beta' },
    { date: '2026', text: '$18M Series A led by Halcyon Ventures' },
  ],
  colors: [
    { name: 'Ink', hex: '#14161f' },
    { name: 'Signal', hex: '#c8f560' },
    { name: 'Paper', hex: '#f6f4ee' },
  ],
  logoPack: 'https://northwind.example/press/logos.zip',
  photos: 'https://northwind.example/press/photos.zip',
  contactName: 'Priya Raman',
  contactEmail: 'press@northwind.example',
  contactPhone: '',
};

const EMPTY: Kit = {
  company: '',
  tagline: '',
  logo: '',
  oneLine: '',
  shortBp: '',
  longBp: '',
  founded: '',
  hq: '',
  team: '',
  metrics: [{ label: '', value: '' }],
  people: [{ name: '', title: '', bio: '', photo: '', link: '' }],
  coverage: [{ outlet: '', headline: '', url: '', date: '' }],
  facts: [{ date: '', text: '' }],
  colors: [{ name: '', hex: '#000000' }],
  logoPack: '',
  photos: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
};

const STORE_KEY = 'shilika-media-kit-v1';

type ListKey = 'metrics' | 'people' | 'coverage' | 'facts' | 'colors';

/* ---------- exports ---------- */

function kitFacts(k: Kit): Metric[] {
  return [
    { label: 'Founded', value: k.founded },
    { label: 'HQ', value: k.hq },
    { label: 'Team', value: k.team },
    ...k.metrics,
  ].filter((m) => m.label.trim() && m.value.trim());
}

function toMarkdown(k: Kit): string {
  const out: string[] = [];
  out.push(`# ${k.company || 'Media kit'}`);
  if (k.tagline) out.push(`*${k.tagline}*`);
  if (k.oneLine) out.push(k.oneLine);
  const facts = kitFacts(k);
  if (facts.length) out.push(`## Fast facts\n\n${facts.map((f) => `- **${f.label}:** ${f.value}`).join('\n')}`);
  if (k.shortBp) out.push(`## Boilerplate (short)\n\n${k.shortBp}`);
  if (k.longBp) out.push(`## Boilerplate (long)\n\n${k.longBp}`);
  const people = k.people.filter((p) => p.name.trim());
  if (people.length)
    out.push(
      `## Leadership\n\n${people
        .map((p) => {
          const link = safeUrl(p.link);
          return `**${p.name}**${p.title ? `, ${p.title}` : ''}${p.bio ? `  \n${p.bio}` : ''}${link ? `  \n${link}` : ''}`;
        })
        .join('\n\n')}`,
    );
  const facts2 = k.facts.filter((f) => f.text.trim());
  if (facts2.length) out.push(`## Milestones\n\n${facts2.map((f) => `- ${f.date ? `**${f.date}:** ` : ''}${f.text}`).join('\n')}`);
  const cov = k.coverage.filter((c) => c.headline.trim());
  if (cov.length)
    out.push(
      `## Recent coverage\n\n${cov
        .map((c) => {
          const u = safeUrl(c.url);
          const h = u ? `[${c.headline}](${u})` : c.headline;
          return `- ${c.outlet ? `**${c.outlet}**: ` : ''}${h}${c.date ? ` (${c.date})` : ''}`;
        })
        .join('\n')}`,
    );
  const colors = k.colors.filter((c) => c.hex);
  if (colors.length) out.push(`## Brand colors\n\n${colors.map((c) => `- ${c.name || 'Color'}: \`${c.hex}\``).join('\n')}`);
  const dl = [
    safeUrl(k.logoPack) ? `- [Logo pack](${safeUrl(k.logoPack)})` : '',
    safeUrl(k.photos) ? `- [Photos](${safeUrl(k.photos)})` : '',
  ].filter(Boolean);
  if (dl.length) out.push(`## Downloads\n\n${dl.join('\n')}`);
  const contact = [k.contactName, k.contactEmail, k.contactPhone].filter((x) => x.trim());
  if (contact.length) out.push(`## Press contact\n\n${contact.join('  \n')}`);
  return out.join('\n\n') + '\n';
}

function toHtml(k: Kit): string {
  const e = escapeHtml;
  const sec = (title: string, body: string) => (body ? `<h3>${e(title)}</h3>${body}` : '');
  const facts = kitFacts(k);
  const logo = safeUrl(k.logo);
  const people = k.people.filter((p) => p.name.trim());
  const cov = k.coverage.filter((c) => c.headline.trim());
  const ms = k.facts.filter((f) => f.text.trim());
  const colors = k.colors.filter((c) => c.hex);
  const dl = [
    safeUrl(k.logoPack) ? `<li><a href="${e(safeUrl(k.logoPack))}">Logo pack</a></li>` : '',
    safeUrl(k.photos) ? `<li><a href="${e(safeUrl(k.photos))}">Photos</a></li>` : '',
  ].join('');
  const contact = [k.contactName, k.contactEmail, k.contactPhone].filter((x) => x.trim()).map(e).join('<br>');
  const para = (s: string) => s.split(/\n{2,}/).map((p) => `<p>${e(p.trim())}</p>`).join('');

  const body = [
    `<header>${logo ? `<img class="logo" src="${e(logo)}" alt="">` : ''}<div><h1>${e(k.company || 'Media kit')}</h1>${k.tagline ? `<p class="tag">${e(k.tagline)}</p>` : ''}</div></header>`,
    k.oneLine ? `<p class="lead">${e(k.oneLine)}</p>` : '',
    facts.length ? `<dl class="facts">${facts.map((f) => `<div><dt>${e(f.label)}</dt><dd>${e(f.value)}</dd></div>`).join('')}</dl>` : '',
    sec('About', k.longBp ? para(k.longBp) : k.shortBp ? para(k.shortBp) : ''),
    k.longBp && k.shortBp ? sec('Short boilerplate', para(k.shortBp)) : '',
    sec(
      'Leadership',
      people.length
        ? `<div class="people">${people
            .map((p) => {
              const ph = safeUrl(p.photo);
              const ln = safeUrl(p.link);
              return `<div class="person">${ph ? `<img src="${e(ph)}" alt="">` : ''}<div><strong>${e(p.name)}</strong><small>${e(p.title)}</small>${p.bio ? `<p>${e(p.bio)}</p>` : ''}${ln ? `<a href="${e(ln)}">Profile</a>` : ''}</div></div>`;
            })
            .join('')}</div>`
        : '',
    ),
    sec('Milestones', ms.length ? `<ul>${ms.map((f) => `<li>${f.date ? `<strong>${e(f.date)}</strong> ` : ''}${e(f.text)}</li>`).join('')}</ul>` : ''),
    sec(
      'Recent coverage',
      cov.length
        ? `<ul>${cov
            .map((c) => {
              const u = safeUrl(c.url);
              const h = u ? `<a href="${e(u)}">${e(c.headline)}</a>` : e(c.headline);
              return `<li>${c.outlet ? `<strong>${e(c.outlet)}</strong>: ` : ''}${h}${c.date ? ` (${e(c.date)})` : ''}</li>`;
            })
            .join('')}</ul>`
        : '',
    ),
    sec(
      'Brand colors',
      colors.length
        ? `<div class="swatches">${colors.map((c) => `<div class="swatch"><span style="background:${e(c.hex)}"></span>${e(c.name || '')} ${e(c.hex)}</div>`).join('')}</div>`
        : '',
    ),
    sec('Downloads', dl ? `<ul>${dl}</ul>` : ''),
    sec('Press contact', contact ? `<p>${contact}</p>` : ''),
  ].join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(k.company || 'Media kit')} media kit</title>
<style>
body{font:15px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:#111;background:#fff;margin:0;padding:40px 20px}
main{max-width:820px;margin:0 auto}
header{display:flex;gap:16px;align-items:center}
.logo{width:64px;height:64px;object-fit:contain;border:1px solid #eee;border-radius:10px}
h1{font-size:36px;line-height:1.1;margin:0}
.tag{color:#555;margin:4px 0 0;font-size:17px}
.lead{font-size:17px;margin:18px 0}
h3{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#666;font-weight:500;border-bottom:1px solid #e5e5e5;padding-bottom:6px;margin:28px 0 10px}
.facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin:0}
.facts div{border:1px solid #e5e5e5;border-radius:10px;padding:10px}
dt{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#777}
dd{margin:4px 0 0;font-size:19px;font-weight:600}
.people{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}
.person{display:flex;gap:12px}.person img{width:56px;height:56px;border-radius:50%;object-fit:cover}
.person small{display:block;color:#666}.person p{margin:4px 0}
.swatches{display:flex;flex-wrap:wrap;gap:12px}.swatch{display:flex;align-items:center;gap:8px;font-family:ui-monospace,Menlo,monospace;font-size:12px}
.swatch span{width:28px;height:28px;border-radius:6px;border:1px solid #ddd;-webkit-print-color-adjust:exact;print-color-adjust:exact}
a{color:#111}ul{padding-left:18px}
</style>
</head>
<body>
<main>
${body}
</main>
</body>
</html>
`;
}

/* ---------- preview ---------- */

function KitPreview({ k }: { k: Kit }) {
  const facts = kitFacts(k);
  const logo = safeUrl(k.logo);
  const people = k.people.filter((p) => p.name.trim());
  const cov = k.coverage.filter((c) => c.headline.trim());
  const ms = k.facts.filter((f) => f.text.trim());
  const colors = k.colors.filter((c) => c.hex);
  const contact = [k.contactName, k.contactEmail, k.contactPhone].filter((x) => x.trim());
  const about = k.longBp || k.shortBp;
  return (
    <article className="pr-kit">
      <div className="pr-kit-top">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={`${k.company} logo`} />
        ) : null}
        <div>
          <h2>{k.company || 'Your company'}</h2>
          {k.tagline ? <p className="pr-kit-tag">{k.tagline}</p> : null}
        </div>
      </div>
      {k.oneLine ? <p style={{ fontSize: 16, marginTop: 14 }}>{k.oneLine}</p> : null}
      {facts.length ? (
        <dl className="pr-kit-facts">
          {facts.map((f, i) => (
            <div key={i}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {about ? (
        <>
          <h3>About</h3>
          {about.split(/\n{2,}/).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </>
      ) : null}
      {k.longBp && k.shortBp ? (
        <>
          <h3>Short boilerplate</h3>
          <p>{k.shortBp}</p>
        </>
      ) : null}
      {people.length ? (
        <>
          <h3>Leadership</h3>
          <div className="pr-kit-people">
            {people.map((p, i) => {
              const ph = safeUrl(p.photo);
              const ln = safeUrl(p.link);
              return (
                <div className="pr-kit-person" key={i}>
                  {ph ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ph} alt={p.name} />
                  ) : null}
                  <div>
                    <strong>{p.name}</strong>
                    <small>{p.title}</small>
                    {p.bio ? <p>{p.bio}</p> : null}
                    {ln ? (
                      <a href={ln} target="_blank" rel="noopener noreferrer">
                        Profile
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
      {ms.length ? (
        <>
          <h3>Milestones</h3>
          <ul>
            {ms.map((f, i) => (
              <li key={i}>
                {f.date ? <strong>{f.date} </strong> : null}
                {f.text}
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {cov.length ? (
        <>
          <h3>Recent coverage</h3>
          <ul>
            {cov.map((c, i) => {
              const u = safeUrl(c.url);
              return (
                <li key={i}>
                  {c.outlet ? <strong>{c.outlet}: </strong> : null}
                  {u ? (
                    <a href={u} target="_blank" rel="noopener noreferrer">
                      {c.headline}
                    </a>
                  ) : (
                    c.headline
                  )}
                  {c.date ? ` (${c.date})` : ''}
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
      {colors.length ? (
        <>
          <h3>Brand colors</h3>
          <div className="pr-kit-swatches">
            {colors.map((c, i) => (
              <div className="pr-kit-swatch" key={i}>
                <span style={{ background: c.hex }} />
                {c.name} {c.hex}
              </div>
            ))}
          </div>
        </>
      ) : null}
      {safeUrl(k.logoPack) || safeUrl(k.photos) ? (
        <>
          <h3>Downloads</h3>
          <ul>
            {safeUrl(k.logoPack) ? (
              <li>
                <a href={safeUrl(k.logoPack)}>Logo pack</a>
              </li>
            ) : null}
            {safeUrl(k.photos) ? (
              <li>
                <a href={safeUrl(k.photos)}>Photos</a>
              </li>
            ) : null}
          </ul>
        </>
      ) : null}
      {contact.length ? (
        <>
          <h3>Press contact</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{contact.join('\n')}</p>
        </>
      ) : null}
    </article>
  );
}

function ColorField({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  const id = useId();
  return (
    <div className="ft-field">
      <label htmlFor={id}>{label}</label>
      <div className="pr-color">
        <input id={id} type="color" value={/^#[0-9a-f]{6}$/i.test(value) ? value : '#000000'} onChange={(e) => onChange(e.target.value)} />
        <span className="mono">{value.toUpperCase()}</span>
      </div>
    </div>
  );
}

export default function MediaKitBuilder() {
  const [kit, setKit] = useState<Kit>(EXAMPLE);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  // Restore a saved draft after mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Kit>;
        setKit({ ...EMPTY, ...parsed });
      }
    } catch {
      /* storage unavailable */
    }
    setLoaded(true);
  }, []);

  // Autosave.
  useEffect(() => {
    if (!loaded) return;
    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORE_KEY, JSON.stringify(kit));
        setSaved(true);
      } catch {
        setSaved(false);
      }
    }, 400);
    return () => window.clearTimeout(t);
  }, [kit, loaded]);

  const set = (key: keyof Kit) => (v: string) => setKit((k) => ({ ...k, [key]: v }));

  function setRow<K extends ListKey>(key: K, i: number, patch: Partial<Kit[K][number]>) {
    setKit((k) => ({ ...k, [key]: (k[key] as Kit[K][number][]).map((row, j) => (j === i ? { ...row, ...patch } : row)) }));
  }
  function addRow<K extends ListKey>(key: K, row: Kit[K][number]) {
    setKit((k) => ({ ...k, [key]: [...(k[key] as Kit[K][number][]), row] }));
  }
  function removeRow(key: ListKey, i: number) {
    setKit((k) => ({ ...k, [key]: (k[key] as unknown[]).filter((_, j) => j !== i) }));
  }

  function clearAll() {
    setKit(EMPTY);
    try {
      window.localStorage.removeItem(STORE_KEY);
    } catch {
      /* ignore */
    }
  }

  const markdown = useMemo(() => toMarkdown(kit), [kit]);
  const file = fileSlug(`${kit.company || 'company'}-media-kit`, 'media-kit');
  useToolResult(kit.company.trim() || kit.oneLine.trim() ? markdown : '');

  const removeBtn = (k: ListKey, i: number, what: string) => (
    <button type="button" className="tool-btn tool-btn-small" onClick={() => removeRow(k, i)} aria-label={`Remove ${what} ${i + 1}`}>
      Remove
    </button>
  );

  return (
    <div className="ft-grid ft-grid-wide">
      <div className="ft-card no-print">
        <div className="pr-head">
          <p className="ft-label">Company</p>
          <span className="ft-hint" role="status">
            {saved ? 'Draft saved in this browser' : ''}
          </span>
        </div>
        <TextField label="Company name" value={kit.company} onChange={set('company')} />
        <TextField label="Tagline" value={kit.tagline} onChange={set('tagline')} />
        <TextField label="Logo URL" type="url" value={kit.logo} onChange={set('logo')} placeholder="Optional, https://" />
        <AreaField label="One-line description" value={kit.oneLine} onChange={set('oneLine')} rows={2} />
        <AreaField
          label="Short boilerplate"
          value={kit.shortBp}
          onChange={set('shortBp')}
          rows={4}
          hint={`${countWords(kit.shortBp)} words. Aim for about 50.`}
        />
        <AreaField label="Long boilerplate" value={kit.longBp} onChange={set('longBp')} rows={6} />
        <div className="ft-row-3">
          <TextField label="Founded" value={kit.founded} onChange={set('founded')} />
          <TextField label="HQ" value={kit.hq} onChange={set('hq')} />
          <TextField label="Team size" value={kit.team} onChange={set('team')} />
        </div>

        <p className="ft-label pr-section-gap">Key metrics</p>
        <div className="pr-rows">
          {kit.metrics.map((m, i) => (
            <div className="pr-inline" key={i}>
              <TextField label="Label" value={m.label} onChange={(v) => setRow('metrics', i, { label: v })} />
              <TextField label="Value" value={m.value} onChange={(v) => setRow('metrics', i, { value: v })} />
              {removeBtn('metrics', i, 'metric')}
            </div>
          ))}
        </div>
        <button type="button" className="tool-btn tool-btn-small" onClick={() => addRow('metrics', { label: '', value: '' })}>
          Add metric
        </button>

        <p className="ft-label pr-section-gap">Founders and leadership</p>
        <div className="pr-rows">
          {kit.people.map((p, i) => (
            <div className="pr-rowitem" key={i}>
              <div className="ft-row">
                <TextField label="Name" value={p.name} onChange={(v) => setRow('people', i, { name: v })} />
                <TextField label="Title" value={p.title} onChange={(v) => setRow('people', i, { title: v })} />
              </div>
              <AreaField label="Short bio" value={p.bio} onChange={(v) => setRow('people', i, { bio: v })} rows={2} />
              <div className="ft-row">
                <TextField label="Photo URL" type="url" value={p.photo} onChange={(v) => setRow('people', i, { photo: v })} />
                <TextField label="LinkedIn or X" type="url" value={p.link} onChange={(v) => setRow('people', i, { link: v })} />
              </div>
              <div className="pr-rowitem-foot">
                {removeBtn('people', i, 'person')}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="tool-btn tool-btn-small"
          onClick={() => addRow('people', { name: '', title: '', bio: '', photo: '', link: '' })}
        >
          Add person
        </button>

        <p className="ft-label pr-section-gap">Recent coverage</p>
        <div className="pr-rows">
          {kit.coverage.map((c, i) => (
            <div className="pr-rowitem" key={i}>
              <div className="ft-row">
                <TextField label="Outlet" value={c.outlet} onChange={(v) => setRow('coverage', i, { outlet: v })} />
                <TextField label="Date" value={c.date} onChange={(v) => setRow('coverage', i, { date: v })} />
              </div>
              <TextField label="Headline" value={c.headline} onChange={(v) => setRow('coverage', i, { headline: v })} />
              <TextField label="URL" type="url" value={c.url} onChange={(v) => setRow('coverage', i, { url: v })} />
              <div className="pr-rowitem-foot">
                {removeBtn('coverage', i, 'article')}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="tool-btn tool-btn-small"
          onClick={() => addRow('coverage', { outlet: '', headline: '', url: '', date: '' })}
        >
          Add article
        </button>

        <p className="ft-label pr-section-gap">Milestones</p>
        <div className="pr-rows">
          {kit.facts.map((f, i) => (
            <div className="pr-inline" key={i}>
              <TextField label="When" value={f.date} onChange={(v) => setRow('facts', i, { date: v })} />
              <TextField label="What happened" value={f.text} onChange={(v) => setRow('facts', i, { text: v })} />
              {removeBtn('facts', i, 'milestone')}
            </div>
          ))}
        </div>
        <button type="button" className="tool-btn tool-btn-small" onClick={() => addRow('facts', { date: '', text: '' })}>
          Add milestone
        </button>

        <p className="ft-label pr-section-gap">Brand colors</p>
        <div className="pr-rows">
          {kit.colors.map((c, i) => (
            <div className="pr-inline" key={i}>
              <TextField label="Name" value={c.name} onChange={(v) => setRow('colors', i, { name: v })} />
              <ColorField label="Color" value={c.hex} onChange={(v) => setRow('colors', i, { hex: v })} />
              {removeBtn('colors', i, 'color')}
            </div>
          ))}
        </div>
        <button type="button" className="tool-btn tool-btn-small" onClick={() => addRow('colors', { name: '', hex: '#000000' })}>
          Add color
        </button>

        <p className="ft-label pr-section-gap">Downloads and contact</p>
        <TextField label="Logo pack URL" type="url" value={kit.logoPack} onChange={set('logoPack')} />
        <TextField label="Photos URL" type="url" value={kit.photos} onChange={set('photos')} />
        <div className="ft-row">
          <TextField label="Press contact" value={kit.contactName} onChange={set('contactName')} />
          <TextField label="Email" type="email" value={kit.contactEmail} onChange={set('contactEmail')} />
        </div>
        <TextField label="Phone" type="tel" value={kit.contactPhone} onChange={set('contactPhone')} placeholder="Optional" />

        <div className="ft-actions">
          <button type="button" className="tool-btn tool-btn-small" onClick={clearAll}>
            Clear
          </button>
          <button type="button" className="tool-btn tool-btn-small" onClick={() => setKit(EXAMPLE)}>
            Load example
          </button>
        </div>
      </div>

      <div className="ft-card">
        <div className="pr-head no-print">
          <p className="ft-label">Preview</p>
        </div>
        <div className="pr-print-target" aria-live="polite">
          <KitPreview k={kit} />
        </div>
        <div className="ft-actions no-print">
          <button type="button" className="tool-btn tool-btn-primary" onClick={printTarget}>
            Print / Save as PDF
          </button>
          <DownloadButton filename={`${file}.md`} content={markdown} mime="text/markdown;charset=utf-8" label="Download .md" />
          <DownloadButton filename={`${file}.html`} content={toHtml(kit)} mime="text/html;charset=utf-8" label="Download .html" />
        </div>
      </div>
    </div>
  );
}
