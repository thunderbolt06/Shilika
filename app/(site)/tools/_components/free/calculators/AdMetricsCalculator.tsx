'use client';

import { useMemo, useState } from 'react';
import { CopyButton, num, useToolResult, Verdict } from '../kit';
import { div, fmt, money, ok, pct, times, type Currency } from './money';
import { CalcHead, Interp, NumField, SelectField, Stat, Tabs } from './ui';

type Tab = 'calc' | 'solve' | 'plan';
type Triangle = 'cpm' | 'cpc' | 'ctr';
type Field = 'cost' | 'impressions' | 'clicks' | 'cpm' | 'cpc' | 'ctr';

/** Rough typical ranges, 2026. USD. ctr in %, cpc and cpm in dollars. */
const BENCH: { id: string; name: string; ctr: [number, number]; cpc: [number, number]; cpm: [number, number] }[] = [
  { id: 'google', name: 'Google Search', ctr: [3, 7], cpc: [1, 6], cpm: [50, 200] },
  { id: 'meta', name: 'Meta (FB, IG)', ctr: [0.9, 1.6], cpc: [0.6, 2], cpm: [8, 20] },
  { id: 'linkedin', name: 'LinkedIn', ctr: [0.4, 0.7], cpc: [5, 12], cpm: [30, 60] },
  { id: 'x', name: 'X (Twitter)', ctr: [0.5, 1.5], cpc: [0.5, 2.5], cpm: [5, 12] },
  { id: 'tiktok', name: 'TikTok', ctr: [0.6, 1.5], cpc: [0.5, 1.5], cpm: [5, 12] },
  { id: 'display', name: 'Display (GDN)', ctr: [0.3, 0.6], cpc: [0.4, 1.2], cpm: [2, 6] },
];

const TRIANGLES: { id: Triangle; label: string; fields: Field[] }[] = [
  { id: 'cpm', label: 'Cost, impressions, CPM', fields: ['cost', 'impressions', 'cpm'] },
  { id: 'cpc', label: 'Cost, clicks, CPC', fields: ['cost', 'clicks', 'cpc'] },
  { id: 'ctr', label: 'Clicks, impressions, CTR', fields: ['clicks', 'impressions', 'ctr'] },
];

const FIELD_LABEL: Record<Field, string> = {
  cost: 'Cost',
  impressions: 'Impressions',
  clicks: 'Clicks',
  cpm: 'CPM',
  cpc: 'CPC',
  ctr: 'CTR',
};

const CALC_DEFAULTS = { spend: '5000', impressions: '400000', clicks: '6000', conversions: '120', revenue: '18000' };
const SOLVE_DEFAULTS: Record<Field, string> = { cost: '2500', impressions: '200000', clicks: '3000', cpm: '12.5', cpc: '0.85', ctr: '1.5' };
const PLAN_DEFAULTS = { budget: '10000', cpm: '15', ctr: '1.2', cvr: '3' };

function rangeLabel(r: [number, number], kind: 'pct' | 'usd') {
  return kind === 'pct' ? `${r[0]}-${r[1]}%` : `$${r[0]}-${r[1]}`;
}

function grade(value: number, range: [number, number], higherIsBetter: boolean): 'good' | 'warn' | 'bad' {
  if (!ok(value)) return 'warn';
  const [lo, hi] = range;
  if (value >= lo && value <= hi) return 'good';
  if (higherIsBetter) return value > hi ? 'good' : 'bad';
  return value < lo ? 'good' : 'bad';
}

const GRADE_WORD = { good: 'On par or better', warn: 'n/a', bad: 'Weaker than typical' };

export default function AdMetricsCalculator() {
  const [tab, setTab] = useState<Tab>('calc');
  const [cur, setCur] = useState<Currency>('USD');

  const [spend, setSpend] = useState(CALC_DEFAULTS.spend);
  const [impressions, setImpressions] = useState(CALC_DEFAULTS.impressions);
  const [clicks, setClicks] = useState(CALC_DEFAULTS.clicks);
  const [conversions, setConversions] = useState(CALC_DEFAULTS.conversions);
  const [revenue, setRevenue] = useState(CALC_DEFAULTS.revenue);
  const [platform, setPlatform] = useState('meta');

  const [triangle, setTriangle] = useState<Triangle>('cpm');
  const [unknown, setUnknown] = useState<Field>('cpm');
  const [solveVals, setSolveVals] = useState<Record<Field, string>>(SOLVE_DEFAULTS);

  const [budget, setBudget] = useState(PLAN_DEFAULTS.budget);
  const [planCpm, setPlanCpm] = useState(PLAN_DEFAULTS.cpm);
  const [planCtr, setPlanCtr] = useState(PLAN_DEFAULTS.ctr);
  const [planCvr, setPlanCvr] = useState(PLAN_DEFAULTS.cvr);

  function reset() {
    if (tab === 'calc') {
      setSpend(CALC_DEFAULTS.spend);
      setImpressions(CALC_DEFAULTS.impressions);
      setClicks(CALC_DEFAULTS.clicks);
      setConversions(CALC_DEFAULTS.conversions);
      setRevenue(CALC_DEFAULTS.revenue);
      setPlatform('meta');
    } else if (tab === 'solve') {
      setTriangle('cpm');
      setUnknown('cpm');
      setSolveVals(SOLVE_DEFAULTS);
    } else {
      setBudget(PLAN_DEFAULTS.budget);
      setPlanCpm(PLAN_DEFAULTS.cpm);
      setPlanCtr(PLAN_DEFAULTS.ctr);
      setPlanCvr(PLAN_DEFAULTS.cvr);
    }
  }

  function changeTriangle(t: Triangle) {
    setTriangle(t);
    const f = TRIANGLES.find((x) => x.id === t)!.fields;
    setUnknown(f[2]);
  }

  // ---- Calculate tab ----
  const m = useMemo(() => {
    const s = Math.max(0, num(spend));
    const imp = Math.max(0, num(impressions));
    const cl = Math.max(0, num(clicks));
    const hasConv = conversions.trim() !== '';
    const hasRev = revenue.trim() !== '';
    const conv = Math.max(0, num(conversions));
    const rev = Math.max(0, num(revenue));
    return {
      s,
      imp,
      cl,
      conv,
      rev,
      hasConv,
      hasRev,
      cpm: div(s, imp) * 1000,
      cpc: div(s, cl),
      ctr: div(cl, imp),
      cvr: hasConv ? div(conv, cl) : NaN,
      cpa: hasConv ? div(s, conv) : NaN,
      roas: hasRev ? div(rev, s) : NaN,
      ecpm: hasRev ? div(rev, imp) * 1000 : NaN,
    };
  }, [spend, impressions, clicks, conversions, revenue]);

  const bench = BENCH.find((b) => b.id === platform) ?? BENCH[1];
  const gCtr = grade(m.ctr * 100, bench.ctr, true);
  const gCpc = grade(m.cpc, bench.cpc, false);
  const gCpm = grade(m.cpm, bench.cpm, false);

  // ---- Solve tab ----
  const fields = TRIANGLES.find((t) => t.id === triangle)!.fields;
  const known = fields.filter((f) => f !== unknown);
  const solved = useMemo(() => {
    const v = (f: Field) => Math.max(0, num(solveVals[f]));
    const cost = v('cost');
    const imp = v('impressions');
    const cl = v('clicks');
    const cpm = v('cpm');
    const cpc = v('cpc');
    const ctr = v('ctr') / 100;
    switch (`${triangle}:${unknown}`) {
      case 'cpm:cost': return (cpm * imp) / 1000;
      case 'cpm:impressions': return div(cost, cpm) * 1000;
      case 'cpm:cpm': return div(cost, imp) * 1000;
      case 'cpc:cost': return cpc * cl;
      case 'cpc:clicks': return div(cost, cpc);
      case 'cpc:cpc': return div(cost, cl);
      case 'ctr:clicks': return imp * ctr;
      case 'ctr:impressions': return div(cl, ctr);
      case 'ctr:ctr': return div(cl, imp);
      default: return NaN;
    }
  }, [triangle, unknown, solveVals]);

  function showField(f: Field, n: number) {
    if (f === 'cost' || f === 'cpm' || f === 'cpc') return money(n, cur, f === 'cost' ? undefined : 2);
    if (f === 'ctr') return pct(n, 2);
    return fmt(n);
  }

  // ---- Plan tab ----
  const plan = useMemo(() => {
    const b = Math.max(0, num(budget));
    const cpm = Math.max(0, num(planCpm));
    const ctr = Math.max(0, num(planCtr)) / 100;
    const cvr = Math.max(0, num(planCvr)) / 100;
    const imp = div(b, cpm) * 1000;
    const cl = imp * ctr;
    const conv = cl * cvr;
    return { b, imp, cl, conv, cpc: div(b, cl), cpa: div(b, conv) };
  }, [budget, planCpm, planCtr, planCvr]);

  // ---- Result text ----
  let text = '';
  let interp = '';
  if (tab === 'calc') {
    interp = ok(m.cpc)
      ? `You pay ${money(m.cpc, cur, 2)} per click and ${money(m.cpm, cur, 2)} per 1,000 impressions. ${fmt(m.ctr * 100, 2)} in every 100 people who see the ad click it.`
      : 'Add spend, impressions and clicks to see your metrics.';
    text = [
      'Ad metrics',
      `Spend: ${money(m.s, cur)} | Impressions: ${fmt(m.imp)} | Clicks: ${fmt(m.cl)}`,
      m.hasConv ? `Conversions: ${fmt(m.conv)}` : '',
      m.hasRev ? `Revenue: ${money(m.rev, cur)}` : '',
      '',
      `CPM: ${money(m.cpm, cur, 2)}`,
      `CPC: ${money(m.cpc, cur, 2)}`,
      `CTR: ${pct(m.ctr, 2)}`,
      m.hasConv ? `CVR: ${pct(m.cvr, 2)}` : '',
      m.hasConv ? `CPA: ${money(m.cpa, cur, 2)}` : '',
      m.hasRev ? `ROAS: ${times(m.roas)}` : '',
      m.hasRev ? `eCPM (revenue per 1,000 impressions): ${money(m.ecpm, cur, 2)}` : '',
      '',
      `Compared with ${bench.name} typical ranges: CTR ${rangeLabel(bench.ctr, 'pct')}, CPC ${rangeLabel(bench.cpc, 'usd')}, CPM ${rangeLabel(bench.cpm, 'usd')}`,
      '',
      interp,
    ]
      .filter((l, i, a) => l !== '' || (i > 0 && a[i - 1] !== ''))
      .join('\n');
  } else if (tab === 'solve') {
    interp = ok(solved)
      ? `${FIELD_LABEL[unknown]} is ${showField(unknown, solved)} given ${known
          .map((f) => `${FIELD_LABEL[f].toLowerCase()} of ${f === 'ctr' ? `${solveVals[f]}%` : showField(f, Math.max(0, num(solveVals[f])))}`)
          .join(' and ')}.`
      : 'Enter the two known values. Zero in a divisor gives n/a.';
    text = `Solve for ${FIELD_LABEL[unknown]}\n${interp}`;
  } else {
    interp = ok(plan.cpa)
      ? `A ${money(plan.b, cur)} budget buys about ${fmt(plan.imp)} impressions, ${fmt(plan.cl)} clicks and ${fmt(plan.conv, 1)} conversions at ${money(plan.cpa, cur, 2)} each.`
      : 'Add budget, CPM, CTR and CVR to plan.';
    text = [
      'Ad plan',
      `Budget: ${money(plan.b, cur)} | CPM: ${planCpm} | CTR: ${planCtr}% | CVR: ${planCvr}%`,
      `Impressions: ${fmt(plan.imp)}`,
      `Clicks: ${fmt(plan.cl)}`,
      `Conversions: ${fmt(plan.conv, 1)}`,
      `CPC: ${money(plan.cpc, cur, 2)}`,
      `CPA: ${money(plan.cpa, cur, 2)}`,
    ].join('\n');
  }
  useToolResult(text);

  return (
    <div>
      <Tabs
        label="Calculator mode"
        value={tab}
        onChange={setTab}
        options={[
          { id: 'calc', label: 'Calculate metrics' },
          { id: 'solve', label: 'Solve for missing' },
          { id: 'plan', label: 'Plan' },
        ]}
      />
      <div className="ft-grid ft-grid-wide">
        <div className="ft-card">
          <CalcHead currency={cur} onCurrency={setCur} onReset={reset} />
          {tab === 'calc' ? (
            <>
              <NumField label="Ad spend" value={spend} onChange={setSpend} />
              <NumField label="Impressions" value={impressions} onChange={setImpressions} />
              <NumField label="Clicks" value={clicks} onChange={setClicks} />
              <div className="ft-row">
                <NumField label="Conversions" value={conversions} onChange={setConversions} placeholder="Optional" />
                <NumField label="Revenue" value={revenue} onChange={setRevenue} placeholder="Optional" />
              </div>
              <SelectField label="Compare with" value={platform} onChange={setPlatform} options={BENCH.map((b) => ({ id: b.id, label: b.name }))} />
            </>
          ) : null}

          {tab === 'solve' ? (
            <>
              <SelectField label="Metric group" value={triangle} onChange={changeTriangle} options={TRIANGLES} />
              <p className="ft-label">Solve for</p>
              <div className="ft-chips calc-seg" role="group" aria-label="Solve for">
                {fields.map((f) => (
                  <button key={f} type="button" className="ft-chip" aria-pressed={unknown === f} onClick={() => setUnknown(f)}>
                    {FIELD_LABEL[f]}
                  </button>
                ))}
              </div>
              {known.map((f) => (
                <NumField
                  key={f}
                  label={FIELD_LABEL[f]}
                  value={solveVals[f]}
                  onChange={(v) => setSolveVals((s) => ({ ...s, [f]: v }))}
                  suffix={f === 'ctr' ? '%' : undefined}
                />
              ))}
            </>
          ) : null}

          {tab === 'plan' ? (
            <>
              <NumField label="Budget" value={budget} onChange={setBudget} />
              <NumField label="Expected CPM" value={planCpm} onChange={setPlanCpm} hint="Cost per 1,000 impressions." />
              <div className="ft-row">
                <NumField label="Expected CTR" value={planCtr} onChange={setPlanCtr} suffix="%" />
                <NumField label="Expected CVR" value={planCvr} onChange={setPlanCvr} suffix="%" />
              </div>
            </>
          ) : null}
        </div>

        <div className="ft-stack" aria-live="polite">
          <div className="ft-card">
            {tab === 'calc' ? (
              <>
                <dl className="ft-stats">
                  <Stat label="CPC" value={money(m.cpc, cur, 2)} note={`${bench.name}: ${rangeLabel(bench.cpc, 'usd')}`} isKey />
                  <Stat label="CPM" value={money(m.cpm, cur, 2)} note={`${bench.name}: ${rangeLabel(bench.cpm, 'usd')}`} />
                  <Stat label="CTR" value={pct(m.ctr, 2)} note={`${bench.name}: ${rangeLabel(bench.ctr, 'pct')}`} />
                  {m.hasConv ? <Stat label="CVR" value={pct(m.cvr, 2)} note="Conversions / clicks" /> : null}
                  {m.hasConv ? <Stat label="CPA" value={money(m.cpa, cur, 2)} note="Cost per conversion" /> : null}
                  {m.hasRev ? <Stat label="ROAS" value={times(m.roas)} /> : null}
                  {m.hasRev ? <Stat label="eCPM" value={money(m.ecpm, cur, 2)} note="Revenue per 1,000 impressions" /> : null}
                </dl>
                <Interp>{interp}</Interp>
                <ul className="ft-checks">
                  <li>
                    <Verdict level={gCtr}>{gCtr === 'warn' ? 'n/a' : gCtr === 'good' ? 'OK' : 'Low'}</Verdict>
                    <span>CTR {pct(m.ctr, 2)} vs {rangeLabel(bench.ctr, 'pct')}</span>
                    <p>{GRADE_WORD[gCtr]}</p>
                  </li>
                  <li>
                    <Verdict level={gCpc}>{gCpc === 'warn' ? 'n/a' : gCpc === 'good' ? 'OK' : 'High'}</Verdict>
                    <span>CPC {money(m.cpc, cur, 2)} vs {rangeLabel(bench.cpc, 'usd')}</span>
                    <p>{GRADE_WORD[gCpc]}</p>
                  </li>
                  <li>
                    <Verdict level={gCpm}>{gCpm === 'warn' ? 'n/a' : gCpm === 'good' ? 'OK' : 'High'}</Verdict>
                    <span>CPM {money(m.cpm, cur, 2)} vs {rangeLabel(bench.cpm, 'usd')}</span>
                    <p>{GRADE_WORD[gCpm]}</p>
                  </li>
                </ul>
                {cur !== 'USD' ? <p className="calc-note">Benchmarks are in USD. Convert before comparing.</p> : null}
              </>
            ) : null}

            {tab === 'solve' ? (
              <>
                <p className="calc-big-label">{FIELD_LABEL[unknown]}</p>
                <p className="ft-big">{showField(unknown, solved)}</p>
                <Interp>{interp}</Interp>
                <p className="calc-note">
                  CPM = cost / impressions x 1,000. CPC = cost / clicks. CTR = clicks / impressions.
                </p>
              </>
            ) : null}

            {tab === 'plan' ? (
              <>
                <p className="calc-big-label">Expected conversions</p>
                <p className="ft-big">{fmt(plan.conv, 1)}</p>
                <Interp>{interp}</Interp>
                <dl className="ft-stats">
                  <Stat label="CPA" value={money(plan.cpa, cur, 2)} isKey />
                  <Stat label="Impressions" value={fmt(plan.imp)} />
                  <Stat label="Clicks" value={fmt(plan.cl)} />
                  <Stat label="Implied CPC" value={money(plan.cpc, cur, 2)} />
                </dl>
              </>
            ) : null}
            <div className="ft-actions">
              <CopyButton text={text} label="Copy results" />
            </div>
          </div>

          <div className="ft-card">
            <p className="ft-label">Rough typical ranges, 2026 (USD)</p>
            <div className="ft-table-wrap">
              <table className="ft-table">
                <thead>
                  <tr>
                    <th>Platform</th>
                    <th className="num">CTR</th>
                    <th className="num">CPC</th>
                    <th className="num">CPM</th>
                  </tr>
                </thead>
                <tbody>
                  {BENCH.map((b) => (
                    <tr key={b.id}>
                      <td>{b.name}</td>
                      <td className="num">{rangeLabel(b.ctr, 'pct')}</td>
                      <td className="num">{rangeLabel(b.cpc, 'usd')}</td>
                      <td className="num">{rangeLabel(b.cpm, 'usd')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="calc-note">Typical ranges only. Industry, audience, country and season move these a lot. B2B and crypto audiences usually sit at the high end of cost.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
