'use client';

import { useMemo, useState } from 'react';
import { CHANNELS, CHANNEL_BY_ID, type ChannelId, type Goal } from '../_data/channels';
import { formatNum, formatUsd } from './format';

type StageId = 'pre-seed' | 'seed' | 'series-a' | 'series-b';

const STAGE_DEFAULTS: Record<StageId, { label: string; pct: number; people: number; tools: number }> = {
  'pre-seed': { label: 'Pre-seed', pct: 10, people: 30, tools: 10 },
  seed: { label: 'Seed', pct: 15, people: 40, tools: 10 },
  'series-a': { label: 'Series A', pct: 20, people: 45, tools: 10 },
  'series-b': { label: 'Series B', pct: 25, people: 50, tools: 8 },
};

const GOALS: { id: Goal; label: string; unit: string }[] = [
  { id: 'awareness', label: 'Awareness', unit: 'customers' },
  { id: 'pipeline', label: 'Pipeline', unit: 'customers' },
  { id: 'signups', label: 'Signups', unit: 'paying users' },
  { id: 'token', label: 'Token launch', unit: 'retained holders' },
];

const DEFAULT_CHANNELS: Record<Goal, ChannelId[]> = {
  awareness: ['pr', 'x-organic', 'linkedin-organic', 'podcasts', 'geo', 'youtube'],
  pipeline: ['seo', 'geo', 'linkedin-ads', 'linkedin-organic', 'email', 'partnerships', 'pr'],
  signups: ['seo', 'google-ads', 'meta-ads', 'product-hunt', 'referral', 'email'],
  token: ['x-organic', 'communities', 'influencers', 'pr', 'events', 'partnerships'],
};

type CplMap = Partial<Record<ChannelId, { low: string; high: string }>>;

function num(v: string, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) && v.trim() !== '' ? n : fallback;
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

function cplFor(id: ChannelId, map: CplMap) {
  const ch = CHANNEL_BY_ID[id];
  const o = map[id];
  const low = Math.max(1, num(o?.low ?? '', ch.cplLow));
  const high = Math.max(low, num(o?.high ?? '', ch.cplHigh));
  return { low, high };
}

function csvCell(v: string | number): string {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export default function BudgetCalculator() {
  const [stage, setStage] = useState<StageId>('seed');
  const [mode, setMode] = useState<'burn' | 'direct'>('burn');
  const [burn, setBurn] = useState('150000');
  const [pct, setPct] = useState(String(STAGE_DEFAULTS.seed.pct));
  const [direct, setDirect] = useState('20000');
  const [goal, setGoal] = useState<Goal>('pipeline');
  const [selected, setSelected] = useState<ChannelId[]>(DEFAULT_CHANNELS.pipeline);
  const [people, setPeople] = useState(String(STAGE_DEFAULTS.seed.people));
  const [tools, setTools] = useState(String(STAGE_DEFAULTS.seed.tools));
  const [ltv, setLtv] = useState('12000');
  const [conv, setConv] = useState('5');
  const [margin, setMargin] = useState('75');
  const [lifetime, setLifetime] = useState('24');
  const [cpl, setCpl] = useState<CplMap>({});

  function changeStage(s: StageId) {
    setStage(s);
    setPct(String(STAGE_DEFAULTS[s].pct));
    setPeople(String(STAGE_DEFAULTS[s].people));
    setTools(String(STAGE_DEFAULTS[s].tools));
  }

  function changeGoal(g: Goal) {
    setGoal(g);
    setSelected(DEFAULT_CHANNELS[g]);
  }

  function toggleChannel(id: ChannelId) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : CHANNELS.map((c) => c.id).filter((c) => c === id || prev.includes(c)),
    );
  }

  function setCplField(id: ChannelId, field: 'low' | 'high', value: string) {
    const ch = CHANNEL_BY_ID[id];
    setCpl((prev) => ({
      ...prev,
      [id]: {
        low: prev[id]?.low ?? String(ch.cplLow),
        high: prev[id]?.high ?? String(ch.cplHigh),
        [field]: value,
      },
    }));
  }

  const r = useMemo(() => {
    const monthly =
      mode === 'burn' ? Math.max(0, num(burn)) * clamp(num(pct), 0, 100) / 100 : Math.max(0, num(direct));
    const peoplePct = clamp(num(people), 0, 100);
    const toolsPct = clamp(num(tools), 0, 100 - peoplePct);
    const programsPct = Math.max(0, 100 - peoplePct - toolsPct);
    const peopleAmt = (monthly * peoplePct) / 100;
    const toolsAmt = (monthly * toolsPct) / 100;
    const programsAmt = (monthly * programsPct) / 100;

    const weights = selected.map((id) => Math.max(0.5, CHANNEL_BY_ID[id].goalWeights[goal]));
    const wSum = weights.reduce((a, b) => a + b, 0) || 1;
    const convRate = clamp(num(conv), 0, 100) / 100;

    const rows = selected.map((id, i) => {
      const ch = CHANNEL_BY_ID[id];
      const alloc = (programsAmt * weights[i]) / wSum;
      const { low, high } = cplFor(id, cpl);
      const mid = (low + high) / 2;
      const leadsLow = alloc / high;
      const leadsHigh = alloc / low;
      const leadsMid = alloc / mid;
      const customersMid = leadsMid * convRate;
      const cacLow = convRate > 0 ? low / convRate : 0;
      const cacHigh = convRate > 0 ? high / convRate : 0;
      return { id, name: ch.name, alloc, share: (weights[i] / wSum) * 100, low, high, leadsLow, leadsHigh, leadsMid, customersMid, cacLow, cacHigh };
    });

    const leadsMid = rows.reduce((a, x) => a + x.leadsMid, 0);
    const leadsLow = rows.reduce((a, x) => a + x.leadsLow, 0);
    const leadsHigh = rows.reduce((a, x) => a + x.leadsHigh, 0);
    const customers = rows.reduce((a, x) => a + x.customersMid, 0);
    const blendedCac = customers > 0 ? monthly / customers : 0;
    const programCac = customers > 0 ? programsAmt / customers : 0;
    const ltvN = Math.max(0, num(ltv));
    const ltvCac = blendedCac > 0 ? ltvN / blendedCac : 0;
    const life = Math.max(1, num(lifetime, 24));
    const monthlyGross = (ltvN / life) * (clamp(num(margin), 0, 100) / 100);
    const payback = monthlyGross > 0 && blendedCac > 0 ? blendedCac / monthlyGross : 0;

    return {
      monthly, peoplePct, toolsPct, programsPct, peopleAmt, toolsAmt, programsAmt, rows,
      leadsMid, leadsLow, leadsHigh, customers, blendedCac, programCac, ltvCac, payback,
      yearTotal: monthly * 12, yearCustomers: customers * 12,
    };
  }, [mode, burn, pct, direct, people, tools, selected, goal, conv, ltv, margin, lifetime, cpl]);

  const unit = GOALS.find((g) => g.id === goal)?.unit ?? 'customers';
  const health =
    r.ltvCac === 0 ? 'neutral' : r.ltvCac >= 3 ? 'good' : r.ltvCac >= 1 ? 'warn' : 'bad';

  function exportCsv() {
    const lines: (string | number)[][] = [
      ['Startup Marketing Budget Calculator (estimates)'],
      ['Stage', STAGE_DEFAULTS[stage].label],
      ['Goal', GOALS.find((g) => g.id === goal)?.label ?? goal],
      ['Monthly marketing budget (USD)', Math.round(r.monthly)],
      ['People (USD)', Math.round(r.peopleAmt)],
      ['Programs (USD)', Math.round(r.programsAmt)],
      ['Tools (USD)', Math.round(r.toolsAmt)],
      ['Lead to customer conversion (%)', num(conv)],
      ['LTV (USD)', num(ltv)],
      [],
      ['Channel', 'Monthly allocation (USD)', 'CPL low (est.)', 'CPL high (est.)', 'Leads low', 'Leads high', 'CAC low', 'CAC high'],
      ...r.rows.map((x) => [
        x.name, Math.round(x.alloc), x.low, x.high,
        Math.round(x.leadsLow), Math.round(x.leadsHigh), Math.round(x.cacLow), Math.round(x.cacHigh),
      ]),
      [],
      ['Estimated leads per month (mid)', Math.round(r.leadsMid)],
      ['Estimated new customers per month (mid)', formatNum(r.customers, 1)],
      ['Blended CAC, fully loaded (USD)', Math.round(r.blendedCac)],
      ['LTV:CAC', formatNum(r.ltvCac, 2)],
      ['Payback (months)', formatNum(r.payback, 1)],
      ['12-month total spend (USD)', Math.round(r.yearTotal)],
    ];
    const csv = lines.map((row) => row.map(csvCell).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marketing-budget-${stage}-${goal}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="tool-layout">
      <form className="tool-panel tool-inputs" onSubmit={(e) => e.preventDefault()} aria-label="Budget inputs">
        <p className="tool-section-label">Budget</p>
        <div className="tool-field">
          <label htmlFor="bc-stage">Stage</label>
          <select id="bc-stage" value={stage} onChange={(e) => changeStage(e.target.value as StageId)}>
            {(Object.keys(STAGE_DEFAULTS) as StageId[]).map((s) => (
              <option key={s} value={s}>
                {STAGE_DEFAULTS[s].label}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="tool-field tool-toggle">
          <legend>How do you want to set the budget?</legend>
          <label>
            <input type="radio" name="bc-mode" checked={mode === 'burn'} onChange={() => setMode('burn')} />
            From monthly burn
          </label>
          <label>
            <input type="radio" name="bc-mode" checked={mode === 'direct'} onChange={() => setMode('direct')} />
            Enter budget directly
          </label>
        </fieldset>

        {mode === 'burn' ? (
          <div className="tool-row">
            <div className="tool-field">
              <label htmlFor="bc-burn">Monthly burn (USD)</label>
              <input id="bc-burn" type="number" inputMode="numeric" min={0} step={1000} value={burn} onChange={(e) => setBurn(e.target.value)} />
            </div>
            <div className="tool-field">
              <label htmlFor="bc-pct">Marketing % of burn</label>
              <input id="bc-pct" type="number" inputMode="decimal" min={0} max={100} step={1} value={pct} onChange={(e) => setPct(e.target.value)} aria-describedby="bc-pct-hint" />
              <span id="bc-pct-hint" className="tool-hint">
                Default for {STAGE_DEFAULTS[stage].label}: {STAGE_DEFAULTS[stage].pct}%
              </span>
            </div>
          </div>
        ) : (
          <div className="tool-field">
            <label htmlFor="bc-direct">Monthly marketing budget (USD)</label>
            <input id="bc-direct" type="number" inputMode="numeric" min={0} step={500} value={direct} onChange={(e) => setDirect(e.target.value)} />
          </div>
        )}

        <div className="tool-row">
          <div className="tool-field">
            <label htmlFor="bc-people">People %</label>
            <input id="bc-people" type="number" inputMode="decimal" min={0} max={100} value={people} onChange={(e) => setPeople(e.target.value)} />
          </div>
          <div className="tool-field">
            <label htmlFor="bc-tools">Tools %</label>
            <input id="bc-tools" type="number" inputMode="decimal" min={0} max={100} value={tools} onChange={(e) => setTools(e.target.value)} />
          </div>
        </div>
        <span className="tool-hint">Programs get the remaining {formatNum(r.programsPct)}%. People covers hires, freelancers and agencies.</span>

        <p className="tool-section-label tool-gap">Goal and channels</p>
        <div className="tool-field">
          <label htmlFor="bc-goal">Primary goal</label>
          <select id="bc-goal" value={goal} onChange={(e) => changeGoal(e.target.value as Goal)}>
            {GOALS.map((g) => (
              <option key={g.id} value={g.id}>
                {g.label}
              </option>
            ))}
          </select>
          <span className="tool-hint">Changing the goal resets channels to a sensible starting set.</span>
        </div>
        <fieldset className="tool-field">
          <legend>Channels ({selected.length} of 20)</legend>
          <div className="tool-chips">
            {CHANNELS.map((c) => (
              <label key={c.id} className={`tool-chip${selected.includes(c.id) ? ' is-on' : ''}`}>
                <input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggleChannel(c.id)} />
                {c.name}
              </label>
            ))}
          </div>
        </fieldset>

        <p className="tool-section-label tool-gap">Unit economics</p>
        <div className="tool-row">
          <div className="tool-field">
            <label htmlFor="bc-ltv">Avg deal value / LTV (USD)</label>
            <input id="bc-ltv" type="number" inputMode="numeric" min={0} step={100} value={ltv} onChange={(e) => setLtv(e.target.value)} />
          </div>
          <div className="tool-field">
            <label htmlFor="bc-conv">Lead to customer %</label>
            <input id="bc-conv" type="number" inputMode="decimal" min={0} max={100} step={0.5} value={conv} onChange={(e) => setConv(e.target.value)} />
          </div>
        </div>
        <div className="tool-row">
          <div className="tool-field">
            <label htmlFor="bc-margin">Gross margin %</label>
            <input id="bc-margin" type="number" inputMode="decimal" min={0} max={100} value={margin} onChange={(e) => setMargin(e.target.value)} />
          </div>
          <div className="tool-field">
            <label htmlFor="bc-life">Customer lifetime (months)</label>
            <input id="bc-life" type="number" inputMode="numeric" min={1} value={lifetime} onChange={(e) => setLifetime(e.target.value)} />
          </div>
        </div>
        <span className="tool-hint">Margin and lifetime are only used for payback months.</span>
      </form>

      <div className="tool-output" aria-live="polite">
        <section className="tool-panel tool-block">
          <p className="tool-section-label">Monthly budget</p>
          <p className="tool-big">{formatUsd(r.monthly)}</p>
          <div className="tool-split" aria-hidden>
            <span className="s-people" style={{ width: `${r.peoplePct}%` }} />
            <span className="s-programs" style={{ width: `${r.programsPct}%` }} />
            <span className="s-tools" style={{ width: `${r.toolsPct}%` }} />
          </div>
          <dl className="tool-stats">
            <div>
              <dt><i className="k-people" /> People ({formatNum(r.peoplePct)}%)</dt>
              <dd>{formatUsd(r.peopleAmt)}</dd>
            </div>
            <div>
              <dt><i className="k-programs" /> Programs ({formatNum(r.programsPct)}%)</dt>
              <dd>{formatUsd(r.programsAmt)}</dd>
            </div>
            <div>
              <dt><i className="k-tools" /> Tools ({formatNum(r.toolsPct)}%)</dt>
              <dd>{formatUsd(r.toolsAmt)}</dd>
            </div>
            <div>
              <dt>12-month total</dt>
              <dd>{formatUsd(r.yearTotal)}</dd>
            </div>
          </dl>
        </section>

        <section className="tool-panel tool-block">
          <div className="tool-block-head">
            <p className="tool-section-label">Per-channel plan</p>
            <span className="tool-badge">Estimates, edit the cost per lead</span>
          </div>
          {r.rows.length === 0 ? (
            <p className="tool-hint">Pick at least one channel to see the allocation.</p>
          ) : (
            <div className="tool-table-wrap" role="region" aria-label="Per-channel allocation table" tabIndex={0}>
              <table className="tool-table">
                <thead>
                  <tr>
                    <th scope="col">Channel</th>
                    <th scope="col">Monthly</th>
                    <th scope="col">Est. CPL low</th>
                    <th scope="col">Est. CPL high</th>
                    <th scope="col">Est. leads</th>
                    <th scope="col">Est. CAC</th>
                  </tr>
                </thead>
                <tbody>
                  {r.rows.map((x) => (
                    <tr key={x.id}>
                      <th scope="row">{x.name}</th>
                      <td>
                        {formatUsd(x.alloc)}
                        <small>{formatNum(x.share)}%</small>
                      </td>
                      <td>
                        <input
                          type="number"
                          min={1}
                          aria-label={`${x.name} estimated cost per lead, low end (USD)`}
                          value={cpl[x.id]?.low ?? String(CHANNEL_BY_ID[x.id].cplLow)}
                          onChange={(e) => setCplField(x.id, 'low', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min={1}
                          aria-label={`${x.name} estimated cost per lead, high end (USD)`}
                          value={cpl[x.id]?.high ?? String(CHANNEL_BY_ID[x.id].cplHigh)}
                          onChange={(e) => setCplField(x.id, 'high', e.target.value)}
                        />
                      </td>
                      <td>
                        {formatNum(x.leadsLow)} to {formatNum(x.leadsHigh)}
                      </td>
                      <td>
                        {formatUsd(x.cacLow)} to {formatUsd(x.cacHigh)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="tool-hint">
            CPL means cost per lead. Default ranges are rough planning assumptions for early-stage B2B and Web3
            teams, not benchmarks. Replace them with your own numbers as soon as you have 30 days of data.
            Channel CAC here is program spend only; the blended CAC below includes people and tools.
          </p>
          <button type="button" className="tool-btn tool-btn-small" onClick={() => setCpl({})}>
            Reset assumptions
          </button>
        </section>

        <section className="tool-panel tool-block">
          <p className="tool-section-label">Unit economics (estimates)</p>
          <dl className="tool-stats tool-stats-4">
            <div>
              <dt>Leads / month</dt>
              <dd>{formatNum(r.leadsMid)}</dd>
              <small>
                range {formatNum(r.leadsLow)} to {formatNum(r.leadsHigh)}
              </small>
            </div>
            <div>
              <dt>New {unit} / month</dt>
              <dd>{formatNum(r.customers, 1)}</dd>
              <small>{formatNum(r.yearCustomers)} over 12 months</small>
            </div>
            <div>
              <dt>Blended CAC</dt>
              <dd>{formatUsd(r.blendedCac)}</dd>
              <small>programs only: {formatUsd(r.programCac)}</small>
            </div>
            <div className={`tool-health is-${health}`}>
              <dt>LTV:CAC</dt>
              <dd>{r.ltvCac ? `${formatNum(r.ltvCac, 1)} : 1` : 'n/a'}</dd>
              <small>3 : 1 or better is the usual target</small>
            </div>
            <div>
              <dt>Payback</dt>
              <dd>{r.payback ? `${formatNum(r.payback, 1)} mo` : 'n/a'}</dd>
              <small>under 12 months is healthy for SaaS</small>
            </div>
          </dl>
          {health === 'bad' && (
            <p className="tool-note">
              At these assumptions every customer costs more than they are worth. Raise conversion, raise price,
              or move budget toward lower-CPL channels before spending more.
            </p>
          )}
          {health === 'warn' && (
            <p className="tool-note">
              You are above break-even but below 3 : 1. Fine while testing, risky to scale. Cut the channel with
              the highest CAC first.
            </p>
          )}
          <div className="tool-actions">
            <button type="button" className="tool-btn tool-btn-primary" onClick={exportCsv}>
              Export CSV
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
