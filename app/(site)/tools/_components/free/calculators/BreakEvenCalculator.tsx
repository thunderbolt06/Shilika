'use client';

import { useId, useMemo, useState } from 'react';
import { CopyButton, num, useToolResult, Verdict } from '../kit';
import { div, fmt, money, moneyShort, niceCeil, ok, pct, times, type Currency } from './money';
import { CalcHead, Interp, NumField, Stat, Tabs } from './ui';

type Tab = 'business' | 'campaign';

const BIZ = { fixed: '25000', price: '99', variable: '19', profit: '10000' };
const CAMP = { cost: '10000', price: '99', unitCost: '19', margin: '80' };

function BreakEvenChart({
  fixed,
  price,
  variable,
  beUnits,
  targetUnits,
  cur,
}: {
  fixed: number;
  price: number;
  variable: number;
  beUnits: number;
  targetUnits: number;
  cur: Currency;
}) {
  const titleId = useId();
  const descId = useId();
  const W = 600;
  const H = 320;
  const L = 64;
  const R = 16;
  const T = 16;
  const B = 40;
  const pw = W - L - R;
  const ph = H - T - B;

  const hasBe = ok(beUnits) && beUnits > 0;
  const xMax = niceCeil(Math.max(hasBe ? beUnits * 2 : 0, ok(targetUnits) ? targetUnits * 1.15 : 0, 10));
  const revEnd = price * xMax;
  const costEnd = fixed + variable * xMax;
  const yMax = niceCeil(Math.max(revEnd, costEnd, fixed, 1) * 1.05);

  const x = (u: number) => L + (u / xMax) * pw;
  const y = (v: number) => T + ph - (v / yMax) * ph;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * yMax);
  const xTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * xMax);
  const beRev = hasBe ? beUnits * price : 0;

  return (
    <svg className="calc-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${titleId} ${descId}`}>
      <title id={titleId}>Break-even chart</title>
      <desc id={descId}>
        {hasBe
          ? `Revenue and total cost lines cross at ${fmt(beUnits, 1)} units, ${money(beRev, cur)} in revenue.`
          : 'Revenue never covers cost at this price and unit cost.'}
      </desc>
      {yTicks.map((v) => (
        <g key={`y${v}`}>
          <line className={v === 0 ? 'ax' : 'grid'} x1={L} x2={W - R} y1={y(v)} y2={y(v)} />
          <text x={L - 8} y={y(v) + 4} textAnchor="end">
            {moneyShort(v, cur)}
          </text>
        </g>
      ))}
      <line className="ax" x1={L} x2={L} y1={T} y2={T + ph} />
      {xTicks.map((u) => (
        <text key={`x${u}`} x={x(u)} y={H - B + 18} textAnchor={u === 0 ? 'start' : u === xMax ? 'end' : 'middle'}>
          {fmt(u)}
        </text>
      ))}
      <text x={L + pw / 2} y={H - 4} textAnchor="middle">
        Units sold
      </text>
      {hasBe ? (
        <polygon className="profit" points={`${x(beUnits)},${y(beRev)} ${x(xMax)},${y(revEnd)} ${x(xMax)},${y(costEnd)}`} />
      ) : null}
      <line className="fixed" x1={x(0)} x2={x(xMax)} y1={y(fixed)} y2={y(fixed)} />
      <line className="cost" x1={x(0)} x2={x(xMax)} y1={y(fixed)} y2={y(costEnd)} />
      <line className="rev" x1={x(0)} x2={x(xMax)} y1={y(0)} y2={y(revEnd)} />
      {hasBe ? (
        <>
          <circle className="be" cx={x(beUnits)} cy={y(beRev)} r={7} />
          <text
            className="lbl"
            x={x(beUnits) + (beUnits > xMax * 0.7 ? -12 : 12)}
            y={y(beRev) - 10}
            textAnchor={beUnits > xMax * 0.7 ? 'end' : 'start'}
          >
            Break-even: {fmt(Math.ceil(beUnits))} units
          </text>
        </>
      ) : null}
    </svg>
  );
}

export default function BreakEvenCalculator() {
  const [tab, setTab] = useState<Tab>('business');
  const [cur, setCur] = useState<Currency>('USD');

  const [fixed, setFixed] = useState(BIZ.fixed);
  const [price, setPrice] = useState(BIZ.price);
  const [variable, setVariable] = useState(BIZ.variable);
  const [profit, setProfit] = useState(BIZ.profit);

  const [cost, setCost] = useState(CAMP.cost);
  const [cPrice, setCPrice] = useState(CAMP.price);
  const [costMode, setCostMode] = useState<'unit' | 'margin'>('unit');
  const [unitCost, setUnitCost] = useState(CAMP.unitCost);
  const [marginPct, setMarginPct] = useState(CAMP.margin);

  function reset() {
    if (tab === 'business') {
      setFixed(BIZ.fixed);
      setPrice(BIZ.price);
      setVariable(BIZ.variable);
      setProfit(BIZ.profit);
    } else {
      setCost(CAMP.cost);
      setCPrice(CAMP.price);
      setCostMode('unit');
      setUnitCost(CAMP.unitCost);
      setMarginPct(CAMP.margin);
    }
  }

  const b = useMemo(() => {
    const f = Math.max(0, num(fixed));
    const p = Math.max(0, num(price));
    const v = Math.max(0, num(variable));
    const tp = Math.max(0, num(profit));
    const cm = p - v;
    const valid = cm > 0;
    const cmRatio = valid ? div(cm, p) : NaN;
    const beExact = valid ? div(f, cm) : NaN;
    return {
      f,
      p,
      v,
      tp,
      cm,
      cmRatio,
      beExact,
      beUnits: ok(beExact) ? Math.ceil(beExact) : NaN,
      beRevenue: valid ? div(f, cmRatio) : NaN,
      targetUnits: valid ? Math.ceil(div(f + tp, cm)) : NaN,
      targetRevenue: valid ? Math.ceil(div(f + tp, cm)) * p : NaN,
    };
  }, [fixed, price, variable, profit]);

  const c = useMemo(() => {
    const k = Math.max(0, num(cost));
    const p = Math.max(0, num(cPrice));
    const perSale = costMode === 'unit' ? p - Math.max(0, num(unitCost)) : p * (Math.min(100, Math.max(0, num(marginPct))) / 100);
    const ratio = div(perSale, p);
    const valid = perSale > 0;
    const exact = valid ? div(k, perSale) : NaN;
    return {
      k,
      p,
      perSale,
      ratio,
      sales: ok(exact) ? Math.ceil(exact) : NaN,
      revenue: valid ? div(k, ratio) : NaN,
      beRoas: valid ? div(1, ratio) : NaN,
    };
  }, [cost, cPrice, costMode, unitCost, marginPct]);

  let interp = '';
  let text = '';
  let level: 'good' | 'warn' | 'bad' = 'good';
  let verdict = '';
  if (tab === 'business') {
    if (ok(b.beUnits)) {
      interp = `Each unit leaves ${money(b.cm, cur, 2)} after variable costs, so you need ${fmt(b.beUnits)} units (${money(b.beRevenue, cur)}) a month to cover ${money(b.f, cur)} of fixed costs.`;
      level = b.cmRatio >= 0.6 ? 'good' : b.cmRatio >= 0.3 ? 'warn' : 'bad';
      verdict = b.cmRatio >= 0.6 ? 'Strong margin' : b.cmRatio >= 0.3 ? 'Moderate margin' : 'Thin margin';
      text = [
        'Break-even (business)',
        `Fixed costs per month: ${money(b.f, cur)}`,
        `Price per unit: ${money(b.p, cur, 2)} | Variable cost per unit: ${money(b.v, cur, 2)}`,
        '',
        `Contribution margin: ${money(b.cm, cur, 2)} per unit`,
        `Contribution margin ratio: ${pct(b.cmRatio)}`,
        `Break-even units: ${fmt(b.beUnits)} (exact ${fmt(b.beExact, 2)})`,
        `Break-even revenue: ${money(b.beRevenue, cur)}`,
        `Units for ${money(b.tp, cur)} profit: ${fmt(b.targetUnits)} (${money(b.targetRevenue, cur)} revenue)`,
        '',
        interp,
      ].join('\n');
    } else {
      interp = 'Price must be higher than variable cost per unit, or you lose money on every sale.';
      level = 'bad';
      verdict = 'No break-even';
    }
  } else if (ok(c.sales)) {
    interp = `You keep ${money(c.perSale, cur, 2)} per sale, so the campaign pays for itself after ${fmt(c.sales)} sales. That is ${money(c.revenue, cur)} in revenue, or a ${times(c.beRoas)} ROAS.`;
    level = c.beRoas <= 2 ? 'good' : c.beRoas <= 4 ? 'warn' : 'bad';
    verdict = c.beRoas <= 2 ? 'Easy to clear' : c.beRoas <= 4 ? 'Achievable' : 'Hard to clear';
    text = [
      'Break-even (campaign)',
      `Campaign cost: ${money(c.k, cur)}`,
      `Price: ${money(c.p, cur, 2)} | Profit per sale: ${money(c.perSale, cur, 2)} (${pct(c.ratio)} margin)`,
      '',
      `Sales needed to break even: ${fmt(c.sales)}`,
      `Revenue needed: ${money(c.revenue, cur)}`,
      `Break-even ROAS: ${times(c.beRoas)}`,
      '',
      interp,
    ].join('\n');
  } else {
    interp = 'Add a price above unit cost, or a margin above 0%.';
    level = 'bad';
    verdict = 'No break-even';
  }
  useToolResult(text);

  return (
    <div>
      <Tabs
        label="Break-even mode"
        value={tab}
        onChange={setTab}
        options={[
          { id: 'business', label: 'Business' },
          { id: 'campaign', label: 'Campaign' },
        ]}
      />
      <div className="ft-grid ft-grid-wide">
        <div className="ft-card">
          <CalcHead currency={cur} onCurrency={setCur} onReset={reset} />
          {tab === 'business' ? (
            <>
              <NumField label="Fixed costs per month" value={fixed} onChange={setFixed} hint="Salaries, rent, software." />
              <div className="ft-row">
                <NumField label="Price per unit" value={price} onChange={setPrice} />
                <NumField label="Variable cost per unit" value={variable} onChange={setVariable} />
              </div>
              <NumField label="Target monthly profit" value={profit} onChange={setProfit} />
            </>
          ) : (
            <>
              <NumField label="Campaign cost" value={cost} onChange={setCost} hint="Ad spend plus agency, creative and tools." />
              <NumField label="Price per sale" value={cPrice} onChange={setCPrice} />
              <Tabs
                label="Cost input"
                value={costMode}
                onChange={setCostMode}
                options={[
                  { id: 'unit', label: 'Unit cost' },
                  { id: 'margin', label: 'Margin %' },
                ]}
              />
              {costMode === 'unit' ? (
                <NumField label="Cost per unit" value={unitCost} onChange={setUnitCost} />
              ) : (
                <NumField label="Gross margin" value={marginPct} onChange={setMarginPct} suffix="%" />
              )}
            </>
          )}
        </div>

        <div className="ft-stack" aria-live="polite">
          <div className="ft-card">
            <div className="calc-result-top">
              <p className="calc-big-label">{tab === 'business' ? 'Break-even units' : 'Sales to break even'}</p>
              <Verdict level={level}>{verdict}</Verdict>
            </div>
            <p className="ft-big">{tab === 'business' ? fmt(b.beUnits) : fmt(c.sales)}</p>
            <Interp>{interp}</Interp>
            {tab === 'business' ? (
              <dl className="ft-stats">
                <Stat label="Break-even revenue" value={money(b.beRevenue, cur)} note="Per month" isKey />
                <Stat label="Contribution margin" value={money(b.cm, cur, 2)} note="Per unit" />
                <Stat label="CM ratio" value={pct(b.cmRatio)} />
                <Stat label="Units for target profit" value={fmt(b.targetUnits)} note={ok(b.targetRevenue) ? `${money(b.targetRevenue, cur)} revenue` : undefined} />
              </dl>
            ) : (
              <dl className="ft-stats">
                <Stat label="Break-even ROAS" value={times(c.beRoas)} note="Revenue / campaign cost" isKey />
                <Stat label="Revenue needed" value={money(c.revenue, cur)} />
                <Stat label="Profit per sale" value={money(c.perSale, cur, 2)} note={ok(c.ratio) ? `${pct(c.ratio)} margin` : undefined} />
              </dl>
            )}
            <div className="ft-actions">
              <CopyButton text={text} label="Copy results" />
            </div>
          </div>

          {tab === 'business' ? (
            <div className="ft-card">
              <p className="ft-label">Revenue vs total cost</p>
              <BreakEvenChart fixed={b.f} price={b.p} variable={b.v} beUnits={b.beExact} targetUnits={b.targetUnits} cur={cur} />
              <div className="calc-legend" aria-hidden="true">
                <span className="l-rev">Revenue</span>
                <span className="l-cost">Total cost</span>
                <span className="l-fixed">Fixed cost</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
