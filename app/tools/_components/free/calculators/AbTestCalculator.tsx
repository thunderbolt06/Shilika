'use client';

import { useMemo, useState } from 'react';
import { CopyButton, num, useToolResult, Verdict } from '../kit';
import { div, fmt, ok, pct } from './money';
import { propCi, sampleSize, twoPropTest } from './stats';
import { CalcHead, Interp, NumField, SelectField, Stat, Tabs } from './ui';

type Tab = 'sig' | 'size' | 'cvr';

const SIG = { nA: '10000', cA: '320', nB: '10000', cB: '375', conf: '95' };
const SIZE = { base: '3', mde: '15', conf: '95', power: '80', daily: '2000' };
const CVR = { visitors: '12000', conversions: '300', target: '3.5' };

const CONF_OPTS = [
  { id: '90', label: '90%' },
  { id: '95', label: '95%' },
  { id: '99', label: '99%' },
];
const POWER_OPTS = [
  { id: '80', label: '80%' },
  { id: '90', label: '90%' },
];

function signedPct(n: number, digits = 2) {
  if (!ok(n)) return 'n/a';
  return `${n > 0 ? '+' : ''}${pct(n, digits)}`;
}

export default function AbTestCalculator() {
  const [tab, setTab] = useState<Tab>('sig');

  const [nA, setNA] = useState(SIG.nA);
  const [cA, setCA] = useState(SIG.cA);
  const [nB, setNB] = useState(SIG.nB);
  const [cB, setCB] = useState(SIG.cB);
  const [conf, setConf] = useState(SIG.conf);

  const [base, setBase] = useState(SIZE.base);
  const [mde, setMde] = useState(SIZE.mde);
  const [sConf, setSConf] = useState(SIZE.conf);
  const [power, setPower] = useState(SIZE.power);
  const [daily, setDaily] = useState(SIZE.daily);

  const [visitors, setVisitors] = useState(CVR.visitors);
  const [conversions, setConversions] = useState(CVR.conversions);
  const [target, setTarget] = useState(CVR.target);

  function reset() {
    if (tab === 'sig') {
      setNA(SIG.nA);
      setCA(SIG.cA);
      setNB(SIG.nB);
      setCB(SIG.cB);
      setConf(SIG.conf);
    } else if (tab === 'size') {
      setBase(SIZE.base);
      setMde(SIZE.mde);
      setSConf(SIZE.conf);
      setPower(SIZE.power);
      setDaily(SIZE.daily);
    } else {
      setVisitors(CVR.visitors);
      setConversions(CVR.conversions);
      setTarget(CVR.target);
    }
  }

  // ---- Significance ----
  const confN = Number(conf);
  const t = useMemo(
    () => twoPropTest(Math.max(0, num(nA)), Math.max(0, num(cA)), Math.max(0, num(nB)), Math.max(0, num(cB)), confN),
    [nA, cA, nB, cB, confN],
  );
  const alpha = 1 - confN / 100;
  const significant = t ? t.p < alpha : false;
  const sigLevel: 'good' | 'warn' | 'bad' = !t ? 'warn' : significant ? (t.diff > 0 ? 'good' : 'bad') : 'warn';
  const sigLabel = !t
    ? 'Check inputs'
    : significant
      ? t.diff > 0
        ? 'B wins'
        : 'B loses'
      : 'Not significant yet';

  const bars = useMemo(() => {
    if (!t) return null;
    const ciA = propCi(t.pA, Math.max(0, num(nA)), confN);
    const ciB = propCi(t.pB, Math.max(0, num(nB)), confN);
    const max = Math.max(ciA[1], ciB[1]) * 1.15 || 1;
    return { ciA, ciB, max };
  }, [t, nA, nB, confN]);

  // ---- Sample size ----
  const size = useMemo(() => {
    const perVariant = sampleSize(Math.max(0, num(base)) / 100, num(mde) / 100, Number(sConf), Number(power));
    const total = perVariant * 2;
    const d = Math.max(0, num(daily));
    const days = div(total, d);
    return { perVariant, total, days: ok(days) ? Math.ceil(days) : NaN };
  }, [base, mde, sConf, power, daily]);

  // ---- Conversion rate ----
  const cv = useMemo(() => {
    const v = Math.max(0, num(visitors));
    const c = Math.max(0, num(conversions));
    const rate = div(c, v);
    const tgt = Math.max(0, num(target)) / 100;
    const needed = Math.ceil(v * tgt);
    return { v, c, rate, tgt, needed, extra: needed - c };
  }, [visitors, conversions, target]);

  // ---- Text ----
  let interp = '';
  let text = '';
  if (tab === 'sig') {
    if (t) {
      interp = significant
        ? `B converts ${signedPct(t.uplift, 1)} relative to A, and the result is significant at ${conf}% confidence (p = ${t.p.toFixed(4)}).`
        : `B is ${signedPct(t.uplift, 1)} relative to A, but that could still be noise at ${conf}% confidence (p = ${t.p.toFixed(4)}). Keep the test running.`;
      text = [
        'A/B test significance',
        `A: ${fmt(num(cA))} / ${fmt(num(nA))} = ${pct(t.pA, 2)}`,
        `B: ${fmt(num(cB))} / ${fmt(num(nB))} = ${pct(t.pB, 2)}`,
        `Relative uplift: ${signedPct(t.uplift, 1)}`,
        `Absolute difference: ${signedPct(t.diff, 2)} points`,
        `z-score: ${t.z.toFixed(3)}`,
        `p-value (two-sided): ${t.p.toFixed(4)}`,
        `Confidence: ${pct(1 - t.p, 2)}`,
        `${conf}% CI for the difference: ${signedPct(t.ciLow, 2)} to ${signedPct(t.ciHigh, 2)}`,
        `Verdict at ${conf}%: ${sigLabel}`,
        '',
        interp,
      ].join('\n');
    } else {
      interp = 'Conversions cannot exceed visitors, and each variant needs visitors.';
    }
  } else if (tab === 'size') {
    interp = ok(size.perVariant)
      ? `You need ${fmt(size.perVariant)} visitors in each variant to detect a ${mde}% relative lift from a ${base}% baseline${
          ok(size.days) ? `. At ${fmt(num(daily))} visitors a day that takes about ${fmt(size.days)} days` : ''
        }.`
      : 'Baseline must be between 0 and 100% and the lift cannot be zero.';
    text = ok(size.perVariant)
      ? [
          'A/B test sample size',
          `Baseline CVR: ${base}% | Minimum detectable effect: ${mde}% relative`,
          `Confidence: ${sConf}% | Power: ${power}%`,
          `Visitors per variant: ${fmt(size.perVariant)}`,
          `Total visitors (2 variants): ${fmt(size.total)}`,
          ok(size.days) ? `Estimated duration: ${fmt(size.days)} days at ${fmt(num(daily))} visitors a day` : '',
          '',
          interp,
        ].join('\n')
      : '';
  } else {
    interp = ok(cv.rate)
      ? cv.extra > 0
        ? `You convert ${pct(cv.rate, 2)} of visitors. To hit ${target}% you need ${fmt(cv.needed)} conversions, ${fmt(cv.extra)} more than today.`
        : `You convert ${pct(cv.rate, 2)} of visitors, already at or above your ${target}% target.`
      : 'Add visitors to see the conversion rate.';
    text = ok(cv.rate)
      ? [
          'Conversion rate',
          `Visitors: ${fmt(cv.v)} | Conversions: ${fmt(cv.c)}`,
          `Conversion rate: ${pct(cv.rate, 2)}`,
          `Target: ${target}% needs ${fmt(cv.needed)} conversions (${cv.extra > 0 ? `${fmt(cv.extra)} more` : 'already there'})`,
        ].join('\n')
      : '';
  }
  useToolResult(text);

  return (
    <div>
      <Tabs
        label="Calculator mode"
        value={tab}
        onChange={setTab}
        options={[
          { id: 'sig', label: 'Significance' },
          { id: 'size', label: 'Sample size' },
          { id: 'cvr', label: 'Conversion rate' },
        ]}
      />
      <div className="ft-grid ft-grid-wide">
        <div className="ft-card">
          <CalcHead onReset={reset} />
          {tab === 'sig' ? (
            <>
              <p className="ft-label">Variant A (control)</p>
              <div className="ft-row">
                <NumField label="Visitors A" value={nA} onChange={setNA} />
                <NumField label="Conversions A" value={cA} onChange={setCA} />
              </div>
              <p className="ft-label">Variant B</p>
              <div className="ft-row">
                <NumField label="Visitors B" value={nB} onChange={setNB} />
                <NumField label="Conversions B" value={cB} onChange={setCB} />
              </div>
              <SelectField label="Confidence level" value={conf} onChange={setConf} options={CONF_OPTS} />
            </>
          ) : null}
          {tab === 'size' ? (
            <>
              <NumField label="Baseline conversion rate" value={base} onChange={setBase} suffix="%" />
              <NumField label="Minimum detectable effect" value={mde} onChange={setMde} suffix="%" hint="Relative lift. 15% on a 3% baseline means 3.45%." />
              <div className="ft-row">
                <SelectField label="Confidence" value={sConf} onChange={setSConf} options={CONF_OPTS} />
                <SelectField label="Power" value={power} onChange={setPower} options={POWER_OPTS} />
              </div>
              <NumField label="Daily visitors (all variants)" value={daily} onChange={setDaily} />
            </>
          ) : null}
          {tab === 'cvr' ? (
            <>
              <NumField label="Visitors" value={visitors} onChange={setVisitors} />
              <NumField label="Conversions" value={conversions} onChange={setConversions} />
              <NumField label="Target conversion rate" value={target} onChange={setTarget} suffix="%" />
            </>
          ) : null}
        </div>

        <div className="ft-stack" aria-live="polite">
          <div className="ft-card">
            {tab === 'sig' ? (
              <>
                <div className="calc-result-top">
                  <p className="calc-big-label">Confidence</p>
                  <Verdict level={sigLevel}>{sigLabel}</Verdict>
                </div>
                <p className="ft-big">{t ? pct(1 - t.p, 1) : 'n/a'}</p>
                <Interp>{interp}</Interp>
                {t ? (
                  <dl className="ft-stats">
                    <Stat label="Relative uplift" value={signedPct(t.uplift, 1)} isKey />
                    <Stat label="CVR A" value={pct(t.pA, 2)} />
                    <Stat label="CVR B" value={pct(t.pB, 2)} />
                    <Stat label="Absolute diff" value={signedPct(t.diff, 2)} note="Percentage points" />
                    <Stat label="p-value" value={t.p.toFixed(4)} note={`z = ${t.z.toFixed(2)}, two-sided`} />
                    <Stat label={`${conf}% CI of diff`} value={`${signedPct(t.ciLow, 2)} to ${signedPct(t.ciHigh, 2)}`} />
                  </dl>
                ) : null}
              </>
            ) : null}
            {tab === 'size' ? (
              <>
                <p className="calc-big-label">Visitors per variant</p>
                <p className="ft-big">{fmt(size.perVariant)}</p>
                <Interp>{interp}</Interp>
                <dl className="ft-stats">
                  <Stat label="Total visitors" value={fmt(size.total)} note="Two variants" isKey />
                  <Stat label="Duration" value={ok(size.days) ? `${fmt(size.days)} days` : 'n/a'} note={ok(size.days) && size.days < 7 ? 'Run at least 7 days to cover weekly cycles' : undefined} />
                  <Stat label="Target CVR in B" value={ok(size.perVariant) ? pct((num(base) / 100) * (1 + num(mde) / 100), 2) : 'n/a'} />
                </dl>
              </>
            ) : null}
            {tab === 'cvr' ? (
              <>
                <p className="calc-big-label">Conversion rate</p>
                <p className="ft-big">{pct(cv.rate, 2)}</p>
                <Interp>{interp}</Interp>
                <dl className="ft-stats">
                  <Stat label="Conversions needed" value={fmt(cv.needed)} note={`At ${target}%`} isKey />
                  <Stat label="Gap" value={cv.extra > 0 ? `+${fmt(cv.extra)}` : '0'} />
                  <Stat label="Visitors per conversion" value={fmt(div(cv.v, cv.c), 1)} />
                </dl>
              </>
            ) : null}
            <div className="ft-actions">
              <CopyButton text={text} label="Copy results" />
            </div>
          </div>

          {tab === 'sig' && t && bars ? (
            <div className="ft-card">
              <p className="ft-label">Conversion rate with {conf}% interval</p>
              <div className="calc-bars">
                {[
                  { k: 'A', p: t.pA, ci: bars.ciA },
                  { k: 'B', p: t.pB, ci: bars.ciB },
                ].map((row) => (
                  <div key={row.k}>
                    <div className={`calc-bar-row${row.k === 'B' ? ' is-b' : ''}`}>
                      <b>{row.k}</b>
                      <div
                        className="calc-bar-track"
                        role="img"
                        aria-label={`Variant ${row.k}: ${pct(row.p, 2)}, interval ${pct(row.ci[0], 2)} to ${pct(row.ci[1], 2)}`}
                      >
                        <span className="calc-bar-fill" style={{ width: `${(row.p / bars.max) * 100}%` }} />
                        <span
                          className="calc-bar-ci"
                          style={{ left: `${(row.ci[0] / bars.max) * 100}%`, width: `${((row.ci[1] - row.ci[0]) / bars.max) * 100}%` }}
                        />
                        <span className="calc-bar-dot" style={{ left: `${(row.p / bars.max) * 100}%` }} />
                      </div>
                    </div>
                    <p className="calc-bar-val" style={{ marginLeft: 38 }}>
                      {pct(row.p, 2)} ({pct(row.ci[0], 2)} to {pct(row.ci[1], 2)})
                    </p>
                  </div>
                ))}
              </div>
              <p className="calc-note">Overlapping intervals do not always mean no difference. Trust the p-value, and decide your sample size before you start.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
