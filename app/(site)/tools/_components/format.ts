const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export function formatUsd(n: number): string {
  if (!Number.isFinite(n)) return '$0';
  return usd.format(Math.round(n));
}

export function formatNum(n: number, digits = 0): string {
  if (!Number.isFinite(n)) return '0';
  return n.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}
