'use client';

import { useMemo, useState } from 'react';
import { REGIONS, SHILIKA_COVERAGE, SHILIKA_PRICING } from '../_data/shilika';
import type { Coverage, RegionKey } from '../_data/types';
import { CoverageBadge, money } from './shared';

const DEFAULT_MARKETS: RegionKey[] = ['us', 'kr', 'jp', 'sea'];
const SECOND_AGENCY_DEFAULT = 6000;

export default function CoverageCost({
  agencyName,
  coverage,
  pricing,
}: {
  agencyName: string;
  coverage: Record<RegionKey, Coverage>;
  pricing: { low: number; high: number };
}) {
  const [markets, setMarkets] = useState<RegionKey[]>(DEFAULT_MARKETS);
  const [months, setMonths] = useState(6);
  const [agencyFee, setAgencyFee] = useState(roundTo(500, (pricing.low + pricing.high) / 2));
  const [extraFee, setExtraFee] = useState(SECOND_AGENCY_DEFAULT);
  const [shilikaFee, setShilikaFee] = useState(5000);

  const toggle = (k: RegionKey) =>
    setMarkets((m) => (m.includes(k) ? m.filter((x) => x !== k) : [...m, k]));

  const { gaps, partial, extraAgencies } = useMemo(() => {
    const picked = REGIONS.filter((r) => markets.includes(r.key));
    const gapRegions = picked.filter((r) => coverage[r.key] === 0);
    const partialRegions = picked.filter((r) => coverage[r.key] === 1);
    // One extra agency per uncovered region cluster: a Korea/Japan specialist, a Gulf specialist, and so on.
    const clusters = new Set(gapRegions.map((r) => r.cluster));
    return { gaps: gapRegions, partial: partialRegions, extraAgencies: clusters.size };
  }, [markets, coverage]);

  const agencyTotal = (agencyFee + extraAgencies * extraFee) * months;
  const shilikaTotal = shilikaFee * months;
  const saved = Math.max(0, agencyTotal - shilikaTotal);
  const pct = agencyTotal > 0 ? Math.round((saved / agencyTotal) * 100) : 0;
  const maxBar = Math.max(agencyTotal, shilikaTotal, 1);

  return (
    <div className="cmp-tool">
      <div className="cmp-tool-step">
        <p className="cmp-step-label">
          <span>01</span> Pick the markets your launch needs
        </p>
        <div className="cmp-chips" role="group" aria-label="Target markets">
          {REGIONS.map((r) => (
            <button
              key={r.key}
              type="button"
              aria-pressed={markets.includes(r.key)}
              className={markets.includes(r.key) ? 'is-on' : undefined}
              onClick={() => toggle(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="cmp-tool-step">
        <p className="cmp-step-label">
          <span>02</span> See who can actually reach them
        </p>
        {markets.length === 0 ? (
          <p className="cmp-empty">Pick at least one market above.</p>
        ) : (
          <div className="cmp-cov">
            <div className="cmp-cov-row cmp-cov-head">
              <span>Market</span>
              <span>{agencyName}</span>
              <span>Shilika</span>
            </div>
            {REGIONS.filter((r) => markets.includes(r.key)).map((r) => (
              <div key={r.key} className="cmp-cov-row">
                <span>{r.label}</span>
                <span>
                  <CoverageBadge level={coverage[r.key]} />
                </span>
                <span>
                  <CoverageBadge level={SHILIKA_COVERAGE[r.key]} />
                </span>
              </div>
            ))}
          </div>
        )}
        {markets.length > 0 && (
          <p className="cmp-cov-verdict">
            {extraAgencies === 0 ? (
              <>
                {agencyName} can cover these markets on its own
                {partial.length > 0 ? `, though ${listNames(partial)} would run through partners or wires` : ''}.
                Shilika covers {markets.length === 1 ? 'it' : 'all of them'} directly.
              </>
            ) : (
              <>
                To reach {listNames(gaps)}, you would likely add{' '}
                <strong>
                  {extraAgencies} more {extraAgencies === 1 ? 'agency' : 'agencies'}
                </strong>{' '}
                next to {agencyName}, plus the time it takes to keep their messaging in sync. With Shilika it is{' '}
                <strong>one operator and one plan</strong>.
              </>
            )}
          </p>
        )}
      </div>

      <div className="cmp-tool-step">
        <p className="cmp-step-label">
          <span>03</span> Compare what it costs
        </p>
        <div className="cmp-sliders">
          <Slider
            label={`${agencyName} retainer`}
            value={agencyFee}
            min={Math.min(5000, pricing.low)}
            max={Math.max(40000, pricing.high)}
            step={500}
            onChange={setAgencyFee}
            suffix="/mo"
          />
          {extraAgencies > 0 && (
            <Slider
              label={`Each extra regional agency (${extraAgencies})`}
              value={extraFee}
              min={3000}
              max={15000}
              step={500}
              onChange={setExtraFee}
              suffix="/mo"
            />
          )}
          <Slider
            label="Shilika retainer"
            value={shilikaFee}
            min={SHILIKA_PRICING.low}
            max={SHILIKA_PRICING.high}
            step={500}
            onChange={setShilikaFee}
            suffix="/mo"
          />
          <Slider label="Engagement length" value={months} min={3} max={12} step={1} onChange={setMonths} unit="months" />
        </div>

        <div className="cmp-bars" aria-live="polite">
          <Bar
            label={extraAgencies > 0 ? `${agencyName} + ${extraAgencies} regional` : agencyName}
            value={agencyTotal}
            width={(agencyTotal / maxBar) * 100}
          />
          <Bar label="Shilika Jain" value={shilikaTotal} width={(shilikaTotal / maxBar) * 100} highlight />
        </div>

        <div className="cmp-saved">
          <div>
            <p className="cmp-saved-num">{money(saved)}</p>
            <p className="cmp-saved-label">kept in your runway over {months} months</p>
          </div>
          <div>
            <p className="cmp-saved-num">{pct}%</p>
            <p className="cmp-saved-label">lower spend, with a senior operator on every pitch</p>
          </div>
        </div>
        <p className="cmp-fine">
          Agency figures use the public or reported range for {agencyName} ({money(pricing.low)}–{money(pricing.high)}
          /mo) and are estimates. Move the sliders to match the proposal in front of you.
        </p>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix = '',
  unit,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  suffix?: string;
  unit?: string;
}) {
  return (
    <label className="cmp-slider">
      <span className="cmp-slider-top">
        <span>{label}</span>
        <strong>{unit ? `${value} ${unit}` : `${money(value)}${suffix}`}</strong>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

function Bar({ label, value, width, highlight }: { label: string; value: number; width: number; highlight?: boolean }) {
  return (
    <div className={`cmp-bar${highlight ? ' is-us' : ''}`}>
      <span className="cmp-bar-label">{label}</span>
      <span className="cmp-bar-track">
        <span className="cmp-bar-fill" style={{ width: `${Math.max(width, 4)}%` }} />
      </span>
      <span className="cmp-bar-value">{money(value)}</span>
    </div>
  );
}

function roundTo(step: number, n: number) {
  return Math.round(n / step) * step;
}

function listNames(regions: { label: string }[]) {
  const names = regions.map((r) => r.label);
  if (names.length <= 1) return names.join('');
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}
