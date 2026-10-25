'use client';

import { useState } from 'react';
import { REGIONS, SHILIKA_COVERAGE } from '../_data/shilika';
import type { Coverage, RegionKey } from '../_data/types';
import { CoverageBadge } from './shared';

interface Row {
  slug: string;
  name: string;
  category: 'web3' | 'ai';
  coverage: Record<RegionKey, Coverage>;
}

export default function MarketFinder({ agencies }: { agencies: Row[] }) {
  const [markets, setMarkets] = useState<RegionKey[]>(['us', 'cn', 'kr', 'jp', 'me']);
  const [cat, setCat] = useState<'all' | 'web3' | 'ai'>('all');

  const toggle = (k: RegionKey) =>
    setMarkets((m) => (m.includes(k) ? m.filter((x) => x !== k) : [...m, k]));
  const picked = REGIONS.filter((r) => markets.includes(r.key));
  const vendorsNeeded = (cov: Record<RegionKey, Coverage>) =>
    1 + new Set(picked.filter((r) => cov[r.key] === 0).map((r) => r.cluster)).size;

  const rows = agencies.filter((a) => cat === 'all' || a.category === cat);

  return (
    <div className="cmp-tool">
      <div className="cmp-tool-step">
        <p className="cmp-step-label">
          <span>01</span> Where does your story need to land?
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
        <div className="cmp-finder-head">
          <p className="cmp-step-label">
            <span>02</span> How many firms you would have to hire
          </p>
          <div className="cmp-tabs cmp-tabs-sm" role="tablist" aria-label="Agency type">
            {(
              [
                ['all', 'All'],
                ['web3', 'Crypto & Web3'],
                ['ai', 'AI & tech'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={cat === id}
                className={cat === id ? 'is-active' : undefined}
                onClick={() => setCat(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="cmp-finder" style={{ ['--cols' as string]: picked.length }}>
          <div className="cmp-finder-row cmp-finder-headrow">
            <span>Option</span>
            {picked.map((r) => (
              <span key={r.key} className="cmp-finder-region">
                {r.label}
              </span>
            ))}
            <span>Firms needed</span>
          </div>
          <div className="cmp-finder-row is-us">
            <span className="cmp-finder-name">Shilika Jain</span>
            {picked.map((r) => (
              <span key={r.key} data-label={r.label}>
                <CoverageBadge level={SHILIKA_COVERAGE[r.key]} />
              </span>
            ))}
            <span className="cmp-finder-count">1</span>
          </div>
          {rows.map((a) => {
            const n = vendorsNeeded(a.coverage);
            return (
              <div key={a.slug} className="cmp-finder-row">
                <a className="cmp-finder-name" href={`/compare/shilika-jain-vs-${a.slug}`}>
                  {a.name}
                </a>
                {picked.map((r) => (
                  <span key={r.key} data-label={r.label}>
                    <CoverageBadge level={a.coverage[r.key]} />
                  </span>
                ))}
                <span className={`cmp-finder-count${n > 1 ? ' is-more' : ''}`}>{n}</span>
              </div>
            );
          })}
        </div>
        <p className="cmp-fine">
          Native means in-house, in-language media relationships. Partial means partners, wires or English-language
          outlets only. Coverage is based on each firm’s published offices, case studies and services as of the
          last-verified date.
        </p>
      </div>
    </div>
  );
}
