'use client';

import { useId, useMemo, useState } from 'react';
import { CopyButton, downloadFile, num, useToolResult, Verdict } from '../kit';
import { csvCell, div, fmt, money, ok, pct, times, type Currency } from './money';
import { CalcHead, Interp, NumField, Stat, Tabs } from './ui';

type Goal = 'leads' | 'sales' | 'revenue';
type ChannelId = 'google' | 'meta' | 'linkedin' | 'x' | 'tiktok' | 'other';
type Split = Record<ChannelId, string>;

const CHANNELS: { id: ChannelId; name: string }[] = [
  { id: 'google', name: 'Google Search' },
  { id: 'meta', name: 'Meta' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'x', name: 'X' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'other', name: 'Other' },
];

const PRESETS: { id: string; label: string; split: Split }[] = [
  { id: 'b2b', label: 'B2B', split: { google: '40', meta: '20', linkedin: '40', x: '0', tiktok: '0', other: '0' } },
  { id: 'b2c', label: 'B2C', split: { google: '35', meta: '45', linkedin: '0', x: '0', tiktok: '20', other: '0' } },
  { id: 'web3', label: 'Web3 launch', split: { google: '15', meta: '20', linkedin: '0', x: '40', tiktok: '0', other: '25' } },
];

const DEFAULTS = {
  goal: 'leads' as Goal,
  target: '200',
  revenueTarget: '150000',
  days: '30',
  cpc: '4',
  cvr: '5',
  close: '20',
  aov: '3000',
};

const GOAL_OPTS: { id: Goal; label: string }[] = [
  { id: 'leads', label: 'Leads' },
  { id: 'sales', label: 'Sales' },
  { id: 'revenue', label: 'Revenue' },
];

function SplitRow({
  name,
  value,
  onChange,
  amount,
  daily,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  amount: string;
  daily: string;
}) {
  const id = useId();
  const v = Math.min(100, Math.max(0, num(value)));
  return (
    <div className="calc-split-row">
      <label htmlFor={id}>{name}</label>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={v}
        aria-label={`${name} share, percent`}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="calc-affix">
        <input id={id} type="text" inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
        <span aria-hidden="true">%</span>
      </div>
      <span className="calc-split-money">
        {amount} total, {daily} a day
      </span>
    </div>
  );
}

export default function AdBudgetPlanner() {
  const [cur, setCur] = useState<Currency>('USD');
  const [goal, setGoal] = useState<Goal>(DEFAULTS.goal);
  const [target, setTarget] = useState(DEFAULTS.target);
  const [revenueTarget, setRevenueTarget] = useState(DEFAULTS.revenueTarget);
  const [days, setDays] = useState(DEFAULTS.days);
  const [cpc, setCpc] = useState(DEFAULTS.cpc);
  const [cvr, setCvr] = useState(DEFAULTS.cvr);
  const [close, setClose] = useState(DEFAULTS.close);
  const [aov, setAov] = useState(DEFAULTS.aov);
  const [preset, setPreset] = useState('b2b');
  const [split, setSplit] = useState<Split>(PRESETS[0].split);

  function reset() {
    setGoal(DEFAULTS.goal);
    setTarget(DEFAULTS.target);
    setRevenueTarget(DEFAULTS.revenueTarget);
    setDays(DEFAULTS.days);
    setCpc(DEFAULTS.cpc);
    setCvr(DEFAULTS.cvr);
    setClose(DEFAULTS.close);
    setAov(DEFAULTS.aov);
    setPreset('b2b');
    setSplit(PRESETS[0].split);
  }

  function applyPreset(id: string) {
    const p = PRESETS.find((x) => x.id === id);
    if (!p) return;
    setPreset(id);
    setSplit(p.split);
  }

  function setChannel(id: ChannelId, v: string) {
    setPreset('');
    setSplit((s) => ({ ...s, [id]: v }));
  }

  function normalise() {
    const total = CHANNELS.reduce((a, c) => a + Math.max(0, num(split[c.id])), 0);
    if (total <= 0) return;
    const next = {} as Split;
    let used = 0;
    const active = CHANNELS.filter((c) => Math.max(0, num(split[c.id])) > 0);
    active.forEach((c, i) => {
      const share = i === active.length - 1 ? 100 - used : Math.round((Math.max(0, num(split[c.id])) / total) * 100);
      used += share;
      next[c.id] = String(share);
    });
    CHANNELS.forEach((c) => {
      if (!(c.id in next)) next[c.id] = '0';
    });
    setPreset('');
    setSplit(next);
  }

  const r = useMemo(() => {
    const d = Math.max(0, num(days));
    const c = Math.max(0, num(cpc));
    const conv = Math.max(0, num(cvr)) / 100;
    const closeRate = Math.max(0, Math.min(100, num(close))) / 100;
    const orderValue = Math.max(0, num(aov));
    const hasClose = closeRate > 0;
    const hasAov = orderValue > 0;

    let leads = NaN;
    let sales = NaN;
    let clicks = NaN;

    if (goal === 'leads') {
      leads = Math.ceil(Math.max(0, num(target)));
      clicks = Math.ceil(div(leads, conv));
      if (hasClose) sales = leads * closeRate;
    } else {
      sales = goal === 'sales' ? Math.ceil(Math.max(0, num(target))) : Math.ceil(div(Math.max(0, num(revenueTarget)), orderValue));
      if (hasClose) {
        leads = Math.ceil(div(sales, closeRate));
        clicks = Math.ceil(div(leads, conv));
      } else {
        clicks = Math.ceil(div(sales, conv));
      }
    }

    const budget = clicks * c;
    const daily = div(budget, d);
    const revenue = hasAov && ok(sales) ? sales * orderValue : NaN;
    return {
      d,
      c,
      conv,
      closeRate,
      orderValue,
      hasClose,
      hasAov,
      leads,
      sales,
      clicks,
      budget,
      daily,
      cpl: div(budget, leads),
      cps: div(budget, sales),
      revenue,
      roas: div(revenue, budget),
    };
  }, [goal, target, revenueTarget, days, cpc, cvr, close, aov]);

  const splitTotal = CHANNELS.reduce((a, c) => a + Math.max(0, num(split[c.id])), 0);
  const rows = CHANNELS.map((c) => {
    const share = Math.max(0, num(split[c.id])) / 100;
    const amount = r.budget * share;
    return { ...c, share, amount, daily: div(amount, r.d) };
  });

  const goalWord = goal === 'leads' ? 'leads' : 'sales';
  const goalCount = goal === 'leads' ? r.leads : r.sales;
  const interp = ok(r.budget)
    ? `To get ${fmt(goalCount)} ${goalWord}${goal === 'revenue' ? ` (${money(num(revenueTarget), cur)} revenue)` : ''} in ${fmt(r.d)} days you need about ${fmt(r.clicks)} clicks and ${money(r.budget, cur)}, or ${money(r.daily, cur)} a day.${
        ok(r.roas) ? ` Each ${money(1, cur, 0)} of spend should return ${money(r.roas, cur, 2)} in revenue.` : ''
      }`
    : goal === 'revenue' && !r.hasAov
      ? 'Revenue goals need an average order value.'
      : 'Add CPC and conversion rate to see the budget.';

  const roasLevel: 'good' | 'warn' | 'bad' = !ok(r.roas) ? 'warn' : r.roas >= 3 ? 'good' : r.roas >= 1 ? 'warn' : 'bad';

  const text = ok(r.budget)
    ? [
        'Ad budget plan',
        `Goal: ${goal === 'revenue' ? `${money(num(revenueTarget), cur)} revenue` : `${fmt(goalCount)} ${goalWord}`} in ${fmt(r.d)} days`,
        `CPC: ${money(r.c, cur, 2)} | Landing page CVR: ${pct(r.conv, 2)}${r.hasClose ? ` | Close rate: ${pct(r.closeRate, 1)}` : ''}${r.hasAov ? ` | AOV: ${money(r.orderValue, cur)}` : ''}`,
        '',
        `Clicks needed: ${fmt(r.clicks)}`,
        ok(r.leads) ? `Leads: ${fmt(r.leads)}` : '',
        ok(r.sales) ? `Sales: ${fmt(r.sales, 1)}` : '',
        `Total budget: ${money(r.budget, cur)}`,
        `Daily budget: ${money(r.daily, cur)}`,
        ok(r.cpl) ? `Cost per lead: ${money(r.cpl, cur)}` : '',
        ok(r.cps) ? `Cost per sale: ${money(r.cps, cur)}` : '',
        ok(r.revenue) ? `Projected revenue: ${money(r.revenue, cur)}` : '',
        ok(r.roas) ? `Projected ROAS: ${times(r.roas)}` : '',
        '',
        `Channel split (total ${fmt(splitTotal)}%):`,
        ...rows.filter((x) => x.share > 0).map((x) => `  ${x.name}: ${pct(x.share, 0)} = ${money(x.amount, cur)} (${money(x.daily, cur)} a day)`),
      ]
        .filter((l, i, a) => l !== '' || a[i - 1] !== '')
        .join('\n')
    : '';
  useToolResult(text);

  function downloadCsv() {
    const lines: (string | number)[][] = [
      ['Metric', 'Value'],
      ['Goal', goal === 'revenue' ? `Revenue ${num(revenueTarget)}` : `${goalCount} ${goalWord}`],
      ['Campaign days', r.d],
      ['Currency', cur],
      ['CPC', r.c],
      ['Landing page CVR %', num(cvr)],
      ['Close rate %', r.hasClose ? num(close) : ''],
      ['AOV', r.hasAov ? r.orderValue : ''],
      ['Clicks needed', r.clicks],
      ['Leads', ok(r.leads) ? r.leads : ''],
      ['Sales', ok(r.sales) ? Number(r.sales.toFixed(1)) : ''],
      ['Total budget', Math.round(r.budget)],
      ['Daily budget', Math.round(r.daily)],
      ['Cost per lead', ok(r.cpl) ? Number(r.cpl.toFixed(2)) : ''],
      ['Cost per sale', ok(r.cps) ? Number(r.cps.toFixed(2)) : ''],
      ['Projected revenue', ok(r.revenue) ? Math.round(r.revenue) : ''],
      ['Projected ROAS', ok(r.roas) ? Number(r.roas.toFixed(2)) : ''],
      [],
      ['Channel', 'Share %', 'Budget', 'Daily'],
      ...rows.map((x) => [x.name, Math.round(x.share * 100), Math.round(x.amount), ok(x.daily) ? Math.round(x.daily) : '']),
    ];
    const csv = lines.map((l) => l.map(csvCell).join(',')).join('\n');
    downloadFile('ad-budget-plan.csv', csv, 'text/csv;charset=utf-8');
  }

  return (
    <div className="ft-stack">
      <div className="ft-grid ft-grid-wide">
        <div className="ft-card">
          <CalcHead currency={cur} onCurrency={setCur} onReset={reset} />
          <Tabs label="Goal type" value={goal} onChange={setGoal} options={GOAL_OPTS} />
          {goal === 'revenue' ? (
            <NumField label="Revenue target" value={revenueTarget} onChange={setRevenueTarget} />
          ) : (
            <NumField label={goal === 'leads' ? 'Leads wanted' : 'Sales wanted'} value={target} onChange={setTarget} />
          )}
          <div className="ft-row">
            <NumField label="Campaign length" value={days} onChange={setDays} suffix="days" />
            <NumField label="Expected CPC" value={cpc} onChange={setCpc} />
          </div>
          <NumField
            label="Landing page CVR"
            value={cvr}
            onChange={setCvr}
            suffix="%"
            hint={goal === 'leads' || r.hasClose ? 'Clicks that become leads.' : 'Clicks that become sales.'}
          />
          <div className="ft-row">
            <NumField label="Close rate" value={close} onChange={setClose} suffix="%" placeholder="Optional" />
            <NumField label="Average order value" value={aov} onChange={setAov} placeholder={goal === 'revenue' ? 'Required' : 'Optional'} />
          </div>
          {goal !== 'leads' ? <p className="ft-hint">Leave close rate empty if visitors buy straight from the page.</p> : null}
        </div>

        <div className="ft-card" aria-live="polite">
          <div className="calc-result-top">
            <p className="calc-big-label">Total budget</p>
            {ok(r.roas) ? <Verdict level={roasLevel}>{`ROAS ${times(r.roas, 1)}`}</Verdict> : null}
          </div>
          <p className="ft-big">{money(r.budget, cur)}</p>
          <Interp>{interp}</Interp>
          <dl className="ft-stats">
            <Stat label="Daily budget" value={money(r.daily, cur)} isKey />
            <Stat label="Clicks needed" value={fmt(r.clicks)} />
            {ok(r.leads) ? <Stat label="Leads" value={fmt(r.leads)} note={ok(r.cpl) ? `${money(r.cpl, cur)} per lead` : undefined} /> : null}
            {ok(r.sales) ? <Stat label="Sales" value={fmt(r.sales, 1)} note={ok(r.cps) ? `${money(r.cps, cur)} per sale` : undefined} /> : null}
            {ok(r.revenue) ? <Stat label="Projected revenue" value={money(r.revenue, cur)} /> : null}
            {ok(r.roas) ? <Stat label="Projected ROAS" value={times(r.roas)} note="Under 1x loses money before margin" /> : null}
          </dl>
          <div className="ft-actions">
            <CopyButton text={text} label="Copy plan" />
            <button type="button" className="tool-btn tool-btn-small" onClick={downloadCsv} disabled={!text}>
              Download CSV
            </button>
          </div>
        </div>
      </div>

      <div className="ft-card">
        <div className="calc-head">
          <p className="ft-label">Channel split</p>
          <div className="ft-chips" role="group" aria-label="Split presets">
            {PRESETS.map((p) => (
              <button key={p.id} type="button" className="ft-chip" aria-pressed={preset === p.id} onClick={() => applyPreset(p.id)}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
        <div className="calc-split">
          {rows.map((x) => (
            <SplitRow
              key={x.id}
              name={x.name}
              value={split[x.id]}
              onChange={(v) => setChannel(x.id, v)}
              amount={money(x.amount, cur)}
              daily={money(x.daily, cur)}
            />
          ))}
        </div>
        <div className="calc-total">
          <span>
            Total: <strong>{fmt(splitTotal, 1)}%</strong>{' '}
            {Math.abs(splitTotal - 100) < 0.01 ? (
              <Verdict level="good">Adds up</Verdict>
            ) : (
              <Verdict level="bad">{splitTotal > 100 ? `${fmt(splitTotal - 100, 1)}% over` : `${fmt(100 - splitTotal, 1)}% unassigned`}</Verdict>
            )}
          </span>
          {Math.abs(splitTotal - 100) >= 0.01 && splitTotal > 0 ? (
            <button type="button" className="tool-btn tool-btn-small" onClick={normalise}>
              Scale to 100%
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
