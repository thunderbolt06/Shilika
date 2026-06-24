'use client';

import { useMemo, useState } from 'react';
import pagesData from '@/data/landing-pages.json';

type LP = {
  n: number;
  slug: string;
  h1: string;
  title: string;
  deck: string;
  service: string;
  cat: string;
  region: string;
  vertical: string;
  intent: string;
};

const PAGES = pagesData as LP[];

const SERVICES = Array.from(new Set(PAGES.map((p) => p.service)));
const REGIONS = Array.from(new Set(PAGES.map((p) => p.region)));
const VERTICALS = Array.from(new Set(PAGES.map((p) => p.vertical))).sort();

const CSS = `
.lpx { background: var(--paper,#f4f3ee); color: var(--ink,#26241f); min-height: 100vh; }
.lpx-hero { padding: 130px 6vw 40px; max-width: 1280px; margin: 0 auto; position: relative; }
.lpx-hero::before { content:''; position:absolute; top:40px; right:4vw; width:380px; height:380px; background:radial-gradient(circle, rgba(190,240,40,.22), transparent 62%); pointer-events:none; }
.lpx-kicker { font-family: var(--font-mono,monospace); font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:#7aa800; display:flex; align-items:center; gap:8px; }
.lpx-kicker .dot { width:7px;height:7px;border-radius:50%;background:#9ed000; }
.lpx-h1 { font-family: var(--font-display,Georgia,serif); font-size:clamp(44px,7vw,96px); line-height:.95; letter-spacing:-.02em; font-weight:400; margin:18px 0 0; }
.lpx-h1 em { font-style:italic; position:relative; }
.lpx-h1 em::after { content:''; position:absolute; left:0; right:0; bottom:.1em; height:.38em; background:#cdf23a; z-index:-1; }
.lpx-sub { max-width:60ch; margin-top:22px; font-size:clamp(16px,1.5vw,20px); line-height:1.55; color:#4a4842; }
.lpx-controls { max-width:1280px; margin:0 auto; padding:8px 6vw 16px; position:sticky; top:64px; z-index:20; background:var(--paper,#f4f3ee); }
.lpx-search { width:100%; max-width:420px; font-size:15px; padding:13px 16px; border:1px solid #d8d6cf; border-radius:100px; background:#fff; color:#26241f; margin-bottom:18px; }
.lpx-search:focus { outline:none; border-color:#7aa800; }
.lpx-filters { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:6px; }
.lpx-flabel { font-family:var(--font-mono,monospace); font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:#9a978f; align-self:center; margin-right:4px; }
.lpx-chip { font-family:var(--font-mono,monospace); font-size:11px; letter-spacing:.04em; text-transform:uppercase; padding:8px 14px; border-radius:100px; border:1px solid #d8d6cf; background:#fff; color:#5a574f; cursor:pointer; transition:all .2s; }
.lpx-chip:hover { border-color:#26241f; }
.lpx-chip.on { background:#26241f; color:#f4f3ee; border-color:#26241f; }
.lpx-chip.svc.on { background:#cdf23a; color:#26241f; border-color:#cdf23a; }
.lpx-count { font-family:var(--font-mono,monospace); font-size:12px; color:#9a978f; padding:14px 6vw 0; max-width:1280px; margin:0 auto; }
.lpx-grid { max-width:1280px; margin:0 auto; padding:20px 6vw 100px; display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
@media (max-width:960px){ .lpx-grid{ grid-template-columns:1fr 1fr; } }
@media (max-width:640px){ .lpx-grid{ grid-template-columns:1fr; } .lpx-controls{ position:static; } }
.lpx-card { display:flex; flex-direction:column; background:#fff; border:1px solid #e3e1da; border-radius:16px; padding:24px; text-decoration:none; color:#26241f; transition:transform .35s cubic-bezier(.25,1,.5,1), border-color .3s, box-shadow .35s; animation:lpx-in .5s both; }
.lpx-card:hover { transform:translateY(-5px); border-color:#26241f; box-shadow:0 18px 40px -24px rgba(0,0,0,.4); }
@keyframes lpx-in { from{ opacity:0; transform:translateY(14px);} to{ opacity:1; transform:none;} }
.lpx-badges { display:flex; gap:7px; flex-wrap:wrap; margin-bottom:14px; }
.lpx-badge { font-family:var(--font-mono,monospace); font-size:9.5px; letter-spacing:.1em; text-transform:uppercase; padding:4px 9px; border-radius:4px; }
.lpx-badge.cat { background:#26241f; color:#f4f3ee; }
.lpx-badge.reg { background:#eef0e6; color:#5a574f; }
.lpx-card h2 { font-family:var(--font-display,Georgia,serif); font-size:24px; font-weight:400; line-height:1.1; margin:0 0 10px; }
.lpx-card p { font-size:14px; line-height:1.55; color:#6b6860; flex:1; }
.lpx-go { font-family:var(--font-mono,monospace); font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:#26241f; margin-top:16px; display:inline-flex; gap:6px; }
.lpx-card:hover .lpx-go { color:#7aa800; }
.lpx-empty { text-align:center; padding:60px; color:#9a978f; grid-column:1/-1; }
`;

export default function PagesIndex() {
  const [service, setService] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [vertical, setVertical] = useState<string>('');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return PAGES.filter((p) => {
      if (service && p.service !== service) return false;
      if (region && p.region !== region) return false;
      if (vertical && p.vertical !== vertical) return false;
      if (query) {
        const hay = `${p.h1} ${p.title} ${p.deck} ${p.service} ${p.vertical} ${p.region}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [service, region, vertical, q]);

  return (
    <main className="lpx">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="lpx-hero">
        <p className="lpx-kicker"><span className="dot" /> Pages · {PAGES.length} service pages</p>
        <h1 className="lpx-h1">Every answer, <em>one place</em>.</h1>
        <p className="lpx-sub">
          When a founder, investor or BD lead asks an AI engine who runs Web3, AI or cybersecurity PR,
          these are the pages built to be the answer. Filter by service, region or vertical to find the
          one that matches what you are launching, then send a brief or book a call.
        </p>
      </section>

      <div className="lpx-controls">
        <input
          className="lpx-search"
          placeholder="Search service pages…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search service pages"
        />
        <div className="lpx-filters">
          <span className="lpx-flabel">Service</span>
          <button className={`lpx-chip svc ${service === '' ? 'on' : ''}`} onClick={() => setService('')}>All</button>
          {SERVICES.map((s) => (
            <button key={s} className={`lpx-chip svc ${service === s ? 'on' : ''}`} onClick={() => setService(service === s ? '' : s)}>{s}</button>
          ))}
        </div>
        <div className="lpx-filters">
          <span className="lpx-flabel">Region</span>
          <button className={`lpx-chip ${region === '' ? 'on' : ''}`} onClick={() => setRegion('')}>All</button>
          {REGIONS.map((r) => (
            <button key={r} className={`lpx-chip ${region === r ? 'on' : ''}`} onClick={() => setRegion(region === r ? '' : r)}>{r}</button>
          ))}
        </div>
        <div className="lpx-filters">
          <span className="lpx-flabel">Vertical</span>
          <button className={`lpx-chip ${vertical === '' ? 'on' : ''}`} onClick={() => setVertical('')}>All</button>
          {VERTICALS.map((v) => (
            <button key={v} className={`lpx-chip ${vertical === v ? 'on' : ''}`} onClick={() => setVertical(vertical === v ? '' : v)}>{v}</button>
          ))}
        </div>
      </div>

      <p className="lpx-count">{filtered.length} {filtered.length === 1 ? 'page' : 'pages'}</p>

      <div className="lpx-grid">
        {filtered.length === 0 ? (
          <p className="lpx-empty">No pages match those filters. Try clearing one.</p>
        ) : (
          filtered.map((p) => (
            <a key={p.slug} href={`/pages/${p.slug}`} className="lpx-card">
              <div className="lpx-badges">
                <span className="lpx-badge cat">{p.cat}</span>
                {p.region !== 'Global' && <span className="lpx-badge reg">{p.region}</span>}
              </div>
              <h2>{p.h1}</h2>
              <p>{p.deck}</p>
              <span className="lpx-go">View page →</span>
            </a>
          ))
        )}
      </div>
    </main>
  );
}
