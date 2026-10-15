import type { Coverage } from '../_data/types';

const LABELS: Record<Coverage, string> = { 2: 'Native', 1: 'Partial', 0: 'Gap' };
const TITLES: Record<Coverage, string> = {
  2: 'In-house, in-language media relationships',
  1: 'Through partners, wires or English-language outlets only',
  0: 'No evident in-house coverage',
};

export function CoverageBadge({ level }: { level: Coverage }) {
  return (
    <span className={`cmp-badge cmp-badge-${level}`} title={TITLES[level]}>
      {LABELS[level]}
    </span>
  );
}

export function money(n: number) {
  if (n >= 1000) {
    const k = n / 1000;
    return `$${Number.isInteger(k) ? k : k.toFixed(1)}K`;
  }
  return `$${n}`;
}
