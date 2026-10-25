'use client';

import { useState } from 'react';
import { ROW_GROUPS, SHILIKA_ROWS } from '../_data/shilika';
import type { RowKey } from '../_data/types';

export default function ComparisonTable({
  agencyName,
  agencyRows,
}: {
  agencyName: string;
  agencyRows: Record<RowKey, string>;
}) {
  const [active, setActive] = useState<string>('all');
  const groups = active === 'all' ? ROW_GROUPS : ROW_GROUPS.filter((g) => g.id === active);

  return (
    <div className="cmp-table-wrap">
      <div className="cmp-tabs" role="tablist" aria-label="Filter the comparison">
        {[{ id: 'all', label: 'Everything' }, ...ROW_GROUPS].map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={active === g.id}
            className={active === g.id ? 'is-active' : undefined}
            onClick={() => setActive(g.id)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="cmp-table" role="table" aria-label={`Shilika Jain vs ${agencyName}`}>
        <div className="cmp-row cmp-row-head" role="row">
          <span role="columnheader" className="cmp-cell-label" />
          <span role="columnheader" className="cmp-cell cmp-cell-agency">
            {agencyName}
          </span>
          <span role="columnheader" className="cmp-cell cmp-cell-us">
            Shilika Jain
          </span>
        </div>
        {groups.map((g) => (
          <div key={g.id} className="cmp-group" role="rowgroup">
            {active === 'all' && (
              <p className="cmp-group-label" role="presentation">
                {g.label}
              </p>
            )}
            {g.rows.map((r) => (
              <div key={r.key} className="cmp-row" role="row">
                <span role="rowheader" className="cmp-cell-label">
                  {r.label}
                </span>
                <span role="cell" className="cmp-cell cmp-cell-agency" data-label={agencyName}>
                  {agencyRows[r.key]}
                </span>
                <span role="cell" className="cmp-cell cmp-cell-us" data-label="Shilika Jain">
                  {SHILIKA_ROWS[r.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
