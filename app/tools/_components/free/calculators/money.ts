/**
 * Number and currency formatting for the calculator tools.
 * Anything that is not a finite number renders as "n/a".
 */

export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'SGD' | 'AED';

export const CURRENCIES: { id: Currency; label: string }[] = [
  { id: 'USD', label: 'USD $' },
  { id: 'EUR', label: 'EUR €' },
  { id: 'GBP', label: 'GBP £' },
  { id: 'INR', label: 'INR ₹' },
  { id: 'SGD', label: 'SGD S$' },
  { id: 'AED', label: 'AED' },
];

const LOCALE: Record<Currency, string> = {
  USD: 'en-US',
  EUR: 'en-IE',
  GBP: 'en-GB',
  INR: 'en-IN',
  SGD: 'en-SG',
  AED: 'en-AE',
};

export const NA = 'n/a';

const cache = new Map<string, Intl.NumberFormat>();

function formatter(cur: Currency, digits: number): Intl.NumberFormat {
  const key = `${cur}:${digits}`;
  let f = cache.get(key);
  if (!f) {
    f = new Intl.NumberFormat(LOCALE[cur], {
      style: 'currency',
      currency: cur,
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
    cache.set(key, f);
  }
  return f;
}

export function ok(n: number): boolean {
  return typeof n === 'number' && Number.isFinite(n);
}

/** Money. Uses 2 decimals below 100 and whole numbers above unless digits is given. */
export function money(n: number, cur: Currency, digits?: number): string {
  if (!ok(n)) return NA;
  const d = digits ?? (Math.abs(n) < 100 ? 2 : 0);
  return formatter(cur, d).format(n);
}

export function fmt(n: number, digits = 0): string {
  if (!ok(n)) return NA;
  return n.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}

/** n is a fraction (0.25 means 25%). */
export function pct(n: number, digits = 1): string {
  if (!ok(n)) return NA;
  return `${(n * 100).toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: 0 })}%`;
}

export function times(n: number, digits = 2): string {
  if (!ok(n)) return NA;
  return `${n.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: 0 })}x`;
}

/** Division that returns NaN instead of Infinity. */
export function div(a: number, b: number): number {
  if (!ok(a) || !ok(b) || b === 0) return NaN;
  return a / b;
}

export function csvCell(v: string | number): string {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Short money for chart axes, e.g. $12K. */
export function moneyShort(n: number, cur: Currency): string {
  if (!ok(n)) return NA;
  return new Intl.NumberFormat(LOCALE[cur], {
    style: 'currency',
    currency: cur,
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(n);
}

/** Round up to a tidy axis maximum (1, 2, 2.5, 5 x 10^n). */
export function niceCeil(n: number): number {
  if (!ok(n) || n <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(n)));
  for (const step of [1, 2, 2.5, 5, 10]) {
    if (step * mag >= n) return step * mag;
  }
  return 10 * mag;
}
