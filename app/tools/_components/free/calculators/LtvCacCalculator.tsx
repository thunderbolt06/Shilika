'use client';

import { useMemo, useState } from 'react';
import { CopyButton, num, useToolResult, Verdict } from '../kit';
import { div, fmt, money, ok, pct, type Currency } from './money';
import { CalcHead, Interp, NumField, Stat, Tabs } from './ui';

const DEFAULTS = {
  arpa: '400',
  margin: '75',
  churn: '3',
  lifetime: '33',
  spend: '100000',
  customers: '40',
  expansion: '',
};

type Ltv = { ltv: number; usedExpansion: boolean };

/** LTV = monthly gross profit / net monthly revenue churn. Expansion is left out if it would make churn zero or negative. */
function ltvFor(gpMonth: number, churn: number, expansion: number): Ltv {
  const net = churn - expansion;
  if (expansion > 0 && net > 0) return { ltv: div(gpMonth, net), usedExpansion: true };
  return { ltv: div(gpMonth, churn), usedExpansion: false };
}

function ratioVerdict(r: number): { level: 'good' | 'warn' | 'bad'; label: string; note: string } {
  if (!ok(r)) return { level: 'warn', label: 'Check inputs', note: 'Add churn, spend and customers.' };
  if (r < 1) return { level: 'bad', label: 'Burning cash', note: 'Each customer is worth less than it costs to win.' };
  if (r < 3) return { level: 'warn', label: 'Weak', note: 'Under 3:1 leaves little room for overheads. Cut CAC or churn.' };
  if (r <= 5) return { level: 'good', label: 'Healthy', note: 'The 3:1 to 5:1 range most SaaS investors look for.' };
  return { level: 'warn', label: 'Underinvesting', note: 'Above 5:1 often means you could spend more to grow faster.' };
}

export default function LtvCacCalculator() {
  const [cur, setCur] = useState<Currency>('USD');
  const [period, setPeriod] = useState<'month' | 'year'>('month');
  const [churnMode, setChurnMode] = useState<'churn' | 'lifetime'>('churn');
  const [arpa, setArpa] = useState(DEFAULTS.arpa);
  const [margin, setMargin] = useState(DEFAULTS.margin);
  const [churn, setChurn] = useState(DEFAULTS.churn);
  const [lifetime, setLifetime] = useState(DEFAULTS.lifetime);
  const [spend, setSpend] = useState(DEFAULTS.spend);
  const [customers, setCustomers] = useState(DEFAULTS.customers);
  const [expansion, setExpansion] = useState(DEFAULTS.expansion);

  function reset() {
    setPeriod('month');
    setChurnMode('churn');
    setArpa(DEFAULTS.arpa);
    setMargin(DEFAULTS.margin);
    setChurn(DEFAULTS.churn);
    setLifetime(DEFAULTS.lifetime);
    setSpend(DEFAULTS.spend);
    setCustomers(DEFAULTS.customers);
    setExpansion(DEFAULTS.expansion);
  }

  const r = useMemo(() => {
    const rawArpa = Math.max(0, num(arpa));
    const arpaM = period === 'year' ? rawArpa / 12 : rawArpa;
    const m = Math.min(100, Math.max(0, num(margin))) / 100;
    const c = churnMode === 'churn' ? Math.max(0, num(churn)) / 100 : div(1, Math.max(0, num(lifetime)));
    const exp = Math.max(0, num(expansion)) / 100;
    const gpMonth = arpaM * m;
    const { ltv, usedExpansion } = ltvFor(gpMonth, c, exp);
    const cac = div(Math.max(0, num(spend)), Math.max(0, num(customers)));
    const ratio = div(ltv, cac);
    const payback = div(cac, gpMonth);
    const life = div(1, c);

    const churnSteps = [c - 0.01, c, c + 0.01];
    const cacSteps = [cac * 0.8, cac, cac * 1.2];
    const grid = churnSteps.map((ch) => ({
      churn: ch,
      cells: cacSteps.map((k) => (ch > 0 ? div(ltvFor(gpMonth, ch, exp).ltv, k) : NaN)),
    }));
    return { arpaM, m, c, exp, gpMonth, ltv, usedExpansion, cac, ratio, payback, life, grid, cacSteps };
  }, [arpa, period, margin, churnMode, churn, lifetime, spend, customers, expansion]);

  const v = ratioVerdict(r.ratio);
  const payLevel: 'good' | 'warn' | 'bad' = !ok(r.payback) ? 'warn' : r.payback <= 12 ? 'good' : r.payback <= 24 ? 'warn' : 'bad';

  const interp = ok(r.ratio)
    ? `Every ${money(1, cur, 0)} spent to win a customer brings back ${money(r.ratio, cur, 2)} in gross profit over their lifetime. You earn back the acquisition cost in ${fmt(r.payback, 1)} months.`
    : 'Fill in churn, spend and new customers to see the ratio.';

  const text = ok(r.ltv)
    ? [
        'LTV and CAC',
        `ARPA per month: ${money(r.arpaM, cur)}`,
        `Gross margin: ${pct(r.m)}`,
        `Monthly churn: ${pct(r.c, 2)}`,
        r.exp > 0 ? `Monthly expansion: ${pct(r.exp, 2)}${r.usedExpansion ? '' : ' (left out, it is not below churn)'}` : '',
        '',
        `LTV: ${money(r.ltv, cur)}`,
        `CAC: ${money(r.cac, cur)}`,
        `LTV:CAC: ${ok(r.ratio) ? `${fmt(r.ratio, 1)}:1` : 'n/a'} (${v.label})`,
        `CAC payback: ${fmt(r.payback, 1)} months`,
        `Customer lifetime: ${fmt(r.life, 1)} months`,
        '',
        interp,
      ]
        .filter((l, i, a) => l !== '' || a[i - 1] !== '')
        .join('\n')
    : '';
  useToolResult(text);

  const ratioStr = ok(r.ratio) ? `${fmt(r.ratio, 1)}:1` : 'n/a';

  return (
    <div className="ft-grid ft-grid-wide">
      <div className="ft-card">
        <CalcHead currency={cur} onCurrency={setCur} onReset={reset} />
        <Tabs
          label="Revenue period"
          value={period}
          onChange={setPeriod}
          options={[
            { id: 'month', label: 'Per month' },
            { id: 'year', label: 'Per year' },
          ]}
        />
        <NumField label={`Revenue per customer per ${period}`} value={arpa} onChange={setArpa} />
        <NumField label="Gross margin" value={margin} onChange={setMargin} suffix="%" />
        <Tabs
          label="Retention input"
          value={churnMode}
          onChange={setChurnMode}
          options={[
            { id: 'churn', label: 'Monthly churn' },
            { id: 'lifetime', label: 'Lifetime' },
          ]}
        />
        {churnMode === 'churn' ? (
          <NumField label="Monthly churn" value={churn} onChange={setChurn} suffix="%" />
        ) : (
          <NumField label="Average lifetime" value={lifetime} onChange={setLifetime} suffix="mo" />
        )}
        <NumField label="Sales and marketing spend" value={spend} onChange={setSpend} hint="Total for the period, including salaries and tools." />
        <NumField label="New customers in period" value={customers} onChange={setCustomers} />
        <NumField label="Expansion revenue" value={expansion} onChange={setExpansion} suffix="%/mo" placeholder="Optional" hint="Monthly upsell as a % of revenue." />
      </div>

      <div className="ft-stack" aria-live="polite">
        <div className="ft-card">
          <div className="calc-result-top">
            <p className="calc-big-label">LTV:CAC</p>
            <Verdict level={v.level}>{v.label}</Verdict>
          </div>
          <p className="ft-big">{ratioStr}</p>
          <Interp>{interp}</Interp>
          <dl className="ft-stats">
            <Stat label="LTV" value={money(r.ltv, cur)} note="Gross profit per customer" isKey />
            <Stat label="CAC" value={money(r.cac, cur)} note="Spend / new customers" />
            <Stat
              label="CAC payback"
              value={ok(r.payback) ? `${fmt(r.payback, 1)} mo` : 'n/a'}
              note={<Verdict level={payLevel}>{payLevel === 'good' ? 'Under 12 mo' : payLevel === 'warn' ? '12 to 24 mo' : 'Over 24 mo'}</Verdict>}
            />
            <Stat label="Customer lifetime" value={ok(r.life) ? `${fmt(r.life, 1)} mo` : 'n/a'} />
          </dl>
          <p className="calc-note">
            {v.note}
            {r.exp > 0 && !r.usedExpansion ? ' Expansion is not below churn, so it was left out to keep LTV conservative.' : ''}
          </p>
        </div>

        <div className="ft-card">
          <p className="ft-label">LTV:CAC sensitivity</p>
          <div className="ft-table-wrap">
            <table className="ft-table">
              <thead>
                <tr>
                  <th>Monthly churn</th>
                  <th className="num">CAC -20%</th>
                  <th className="num">CAC as is</th>
                  <th className="num">CAC +20%</th>
                </tr>
              </thead>
              <tbody>
                {r.grid.map((row, i) => (
                  <tr key={i}>
                    <td>
                      {pct(row.churn, 2)}
                      {i === 1 ? ' (now)' : ''}
                    </td>
                    {row.cells.map((cell, j) => (
                      <td key={j} className="num" style={i === 1 && j === 1 ? { fontWeight: 600 } : undefined}>
                        {ok(cell) && cell > 0 ? `${fmt(cell, 1)}:1` : 'n/a'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="calc-note">One point of churn often moves LTV more than a 20% change in CAC.</p>
          <div className="ft-actions">
            <CopyButton text={text} label="Copy results" />
          </div>
        </div>
      </div>
    </div>
  );
}
