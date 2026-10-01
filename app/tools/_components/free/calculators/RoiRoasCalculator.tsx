'use client';

import { useMemo, useState } from 'react';
import { CopyButton, num, useToolResult, Verdict } from '../kit';
import { div, money, ok, pct, times, type Currency } from './money';
import { CalcHead, Interp, NumField, Stat } from './ui';

const DEFAULTS = { revenue: '48000', adSpend: '12000', other: '4000', margin: '60' };
const TARGETS = [0, 0.5, 1, 2];

export default function RoiRoasCalculator() {
  const [cur, setCur] = useState<Currency>('USD');
  const [revenue, setRevenue] = useState(DEFAULTS.revenue);
  const [adSpend, setAdSpend] = useState(DEFAULTS.adSpend);
  const [other, setOther] = useState(DEFAULTS.other);
  const [margin, setMargin] = useState(DEFAULTS.margin);

  function reset() {
    setRevenue(DEFAULTS.revenue);
    setAdSpend(DEFAULTS.adSpend);
    setOther(DEFAULTS.other);
    setMargin(DEFAULTS.margin);
  }

  const r = useMemo(() => {
    const rev = Math.max(0, num(revenue));
    const ad = Math.max(0, num(adSpend));
    const oth = Math.max(0, num(other));
    const m = Math.min(100, Math.max(0, num(margin))) / 100;
    const total = ad + oth;
    const gross = rev * m;
    const net = gross - total;
    const roas = div(rev, ad);
    const roi = div(net, total);
    const beRoas = div(1, m);
    const beRoasAll = div(total, ad * m);
    const costPerRev = div(total, rev);
    const targets = TARGETS.map((t) => ({
      t,
      roas: div(total * (1 + t), m * ad),
      revenue: div(total * (1 + t), m),
    }));
    return { rev, ad, oth, m, total, gross, net, roas, roi, beRoas, beRoasAll, costPerRev, targets };
  }, [revenue, adSpend, other, margin]);

  let level: 'good' | 'warn' | 'bad' = 'bad';
  let verdict = 'Check inputs';
  if (ok(r.roas) && ok(r.beRoas)) {
    if (r.roas < r.beRoas) {
      level = 'bad';
      verdict = 'Below break-even';
    } else if (ok(r.beRoasAll) && r.roas < r.beRoasAll) {
      level = 'warn';
      verdict = 'Covers ads, not all costs';
    } else if (ok(r.roi) && r.roi < 0.5) {
      level = 'warn';
      verdict = 'Profitable, thin';
    } else {
      level = 'good';
      verdict = 'Profitable';
    }
  }

  const interp = ok(r.roas)
    ? `Every ${money(1, cur, 0)} of ad spend returns ${money(r.roas, cur, 2)} in revenue. After margin and all campaign costs, the campaign ${
        r.net >= 0 ? `makes ${money(r.net, cur)} profit` : `loses ${money(-r.net, cur)}`
      }.`
    : 'Add ad spend to see your return.';

  const text = ok(r.roas)
    ? [
        'Marketing ROI and ROAS',
        `Revenue: ${money(r.rev, cur)}`,
        `Ad spend: ${money(r.ad, cur)}`,
        `Other campaign costs: ${money(r.oth, cur)}`,
        `Gross margin: ${pct(r.m, 1)}`,
        '',
        `ROAS: ${times(r.roas)} (${pct(r.roas, 0)})`,
        `Marketing ROI: ${pct(r.roi)}`,
        `Gross profit: ${money(r.gross, cur)}`,
        `Net profit after campaign costs: ${money(r.net, cur)}`,
        `Break-even ROAS (ad spend only): ${times(r.beRoas)}`,
        `Break-even ROAS (all costs): ${times(r.beRoasAll)}`,
        `Cost per ${money(1, cur, 0)} of revenue: ${money(r.costPerRev, cur, 2)}`,
        `Verdict: ${verdict}`,
        '',
        'ROAS needed for target ROI:',
        ...r.targets.map((t) => `  ${pct(t.t, 0)} ROI: ${times(t.roas)} (revenue ${money(t.revenue, cur)})`),
        '',
        interp,
      ].join('\n')
    : '';
  useToolResult(text);

  return (
    <div className="ft-grid ft-grid-wide">
      <div className="ft-card">
        <CalcHead currency={cur} onCurrency={setCur} onReset={reset} />
        <NumField label="Revenue from campaign" value={revenue} onChange={setRevenue} />
        <NumField label="Ad spend" value={adSpend} onChange={setAdSpend} />
        <NumField label="Other campaign costs" value={other} onChange={setOther} hint="Agency, creative, tools." />
        <NumField label="Gross margin" value={margin} onChange={setMargin} suffix="%" />
      </div>

      <div className="ft-stack" aria-live="polite">
        <div className="ft-card">
          <div className="calc-result-top">
            <p className="calc-big-label">ROAS</p>
            <Verdict level={level}>{verdict}</Verdict>
          </div>
          <p className="ft-big">{times(r.roas)}</p>
          <Interp>{interp}</Interp>
          <dl className="ft-stats">
            <Stat label="Marketing ROI" value={pct(r.roi)} note="(Gross profit minus costs) / costs" isKey />
            <Stat label="ROAS %" value={pct(r.roas, 0)} />
            <Stat label="Gross profit" value={money(r.gross, cur)} />
            <Stat label="Net profit" value={money(r.net, cur)} note="After ad spend and other costs" />
            <Stat label="Break-even ROAS" value={times(r.beRoas)} note={`${times(r.beRoasAll)} including other costs`} />
            <Stat label={`Cost per ${money(1, cur, 0)} revenue`} value={money(r.costPerRev, cur, 2)} />
          </dl>
        </div>

        <div className="ft-card">
          <p className="ft-label">ROAS needed for target ROI</p>
          <div className="ft-table-wrap">
            <table className="ft-table">
              <thead>
                <tr>
                  <th>Target ROI</th>
                  <th className="num">ROAS needed</th>
                  <th className="num">Revenue needed</th>
                </tr>
              </thead>
              <tbody>
                {r.targets.map((t) => (
                  <tr key={t.t}>
                    <td>{t.t === 0 ? '0% (break even)' : pct(t.t, 0)}</td>
                    <td className="num">{times(t.roas)}</td>
                    <td className="num">{money(t.revenue, cur)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="calc-note">Uses your total campaign cost and gross margin. Most ecommerce brands aim for 3x to 4x ROAS; high-margin SaaS can grow well at 2x.</p>
          <div className="ft-actions">
            <CopyButton text={text} label="Copy results" />
          </div>
        </div>
      </div>
    </div>
  );
}
