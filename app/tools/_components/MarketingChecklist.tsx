'use client';

import { useEffect, useMemo, useState } from 'react';
import { ALL_SECTIONS, CHANNEL_SECTIONS, PHASES, type ChecklistSection } from '../_data/checklist';

const STORAGE_KEY = 'shilika-marketing-checklist-v1';

function readStore(): Record<string, boolean> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function writeStore(value: Record<string, boolean>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage blocked (private mode, site data disabled). Progress lives in memory only.
  }
}

function sectionDone(s: ChecklistSection, checked: Record<string, boolean>) {
  return s.items.filter((i) => checked[i.id]).length;
}

function Progress({ done, total, label }: { done: number; total: number; label: string }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="tool-progress">
      <div
        className="tool-progress-bar"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <span style={{ width: `${pct}%` }} />
      </div>
      <span className="tool-progress-text">
        {done}/{total} · {pct}%
      </span>
    </div>
  );
}

export default function MarketingChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState('all');
  const [hideDone, setHideDone] = useState(false);

  useEffect(() => {
    setChecked(readStore());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) writeStore(checked);
  }, [checked, loaded]);

  const visible = useMemo(() => {
    if (filter === 'all') return ALL_SECTIONS;
    if (filter === 'phases') return PHASES;
    if (filter === 'channels') return CHANNEL_SECTIONS;
    return ALL_SECTIONS.filter((s) => s.id === filter);
  }, [filter]);

  const totalItems = ALL_SECTIONS.reduce((a, s) => a + s.items.length, 0);
  const totalDone = ALL_SECTIONS.reduce((a, s) => a + sectionDone(s, checked), 0);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }

  function reset() {
    if (typeof window !== 'undefined' && !window.confirm('Clear all checked items? This cannot be undone.')) return;
    setChecked({});
  }

  function renderSection(s: ChecklistSection) {
    const done = sectionDone(s, checked);
    const items = hideDone ? s.items.filter((i) => !checked[i.id]) : s.items;
    return (
      <section key={s.id} className="tool-panel tool-block tool-check-section" aria-labelledby={`h-${s.id}`}>
        <div className="tool-check-head">
          <div>
            <h3 id={`h-${s.id}`}>{s.title}</h3>
            <p className="tool-sub">{s.summary}</p>
          </div>
          <Progress done={done} total={s.items.length} label={`${s.title} progress`} />
        </div>
        {items.length === 0 ? (
          <p className="tool-hint">All done here.</p>
        ) : (
          <ul className="tool-checks">
            {items.map((i) => (
              <li key={i.id}>
                <label className={checked[i.id] ? 'is-done' : undefined}>
                  <input type="checkbox" checked={!!checked[i.id]} onChange={() => toggle(i.id)} />
                  <span>{i.text}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }

  const phaseVisible = visible.filter((s) => s.kind === 'phase');
  const channelVisible = visible.filter((s) => s.kind === 'channel');

  return (
    <div className="tool-checklist">
      <div className="tool-panel tool-check-toolbar">
        <div className="tool-check-overall">
          <p className="tool-section-label">Overall progress</p>
          <Progress done={totalDone} total={totalItems} label="Overall checklist progress" />
        </div>
        <div className="tool-check-controls no-print">
          <div className="tool-field">
            <label htmlFor="cl-filter">Show</label>
            <select id="cl-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Everything</option>
              <option value="phases">All phases</option>
              <option value="channels">All 20 channels</option>
              <optgroup label="Phases">
                {PHASES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Channels">
                {CHANNEL_SECTIONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          <label className="tool-inline-check">
            <input type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} />
            Hide completed
          </label>
          <div className="tool-actions">
            <button type="button" className="tool-btn" onClick={() => window.print()}>
              Print
            </button>
            <button type="button" className="tool-btn tool-btn-ghost" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {phaseVisible.length > 0 && (
        <div className="tool-check-group">
          <h2 className="tool-h2">
            By <em>phase</em>
          </h2>
          {phaseVisible.map(renderSection)}
        </div>
      )}
      {channelVisible.length > 0 && (
        <div className="tool-check-group">
          <h2 className="tool-h2">
            By <em>channel</em>
          </h2>
          <div className="tool-check-grid">{channelVisible.map(renderSection)}</div>
        </div>
      )}
      <p className="tool-hint no-print">Progress is saved in this browser only. Nothing is sent to a server.</p>
    </div>
  );
}
