'use client';

import { useId, useState } from 'react';

export interface IndexGroup {
  id: string;
  label: string;
  blurb: string;
  tools: { href: string; name: string; blurb: string }[];
}

export default function ToolIndex({ groups }: { groups: IndexGroup[] }) {
  const [q, setQ] = useState('');
  const id = useId();
  const needle = q.trim().toLowerCase();
  const filtered = groups
    .map((g) => ({
      ...g,
      tools: needle
        ? g.tools.filter((t) => `${t.name} ${t.blurb} ${g.label}`.toLowerCase().includes(needle))
        : g.tools,
    }))
    .filter((g) => g.tools.length > 0);

  return (
    <>
      <div className="ft-field ft-index-search no-print">
        <label htmlFor={id}>Find a tool</label>
        <input
          id={id}
          type="search"
          placeholder="Try UTM, schema, ROAS, press release"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {filtered.map((g) => (
        <section key={g.id} className="ft-group" aria-labelledby={`grp-${g.id}`}>
          <div className="ft-group-head">
            <h2 id={`grp-${g.id}`}>{g.label}</h2>
            <p>{g.blurb}</p>
          </div>
          <ul className="ft-index-grid">
            {g.tools.map((t) => (
              <li key={t.href}>
                <a href={t.href} className="ft-index-card" data-magnet>
                  <strong>{t.name}</strong>
                  <span>{t.blurb}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {filtered.length === 0 && <p className="ft-index-empty">No tool matches “{q}”. Try a shorter word.</p>}
    </>
  );
}
