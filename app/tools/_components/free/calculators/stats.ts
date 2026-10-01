/** Small stats helpers for the A/B test calculator. */

/** erf via Abramowitz and Stegun 7.1.26 (max error about 1.5e-7). */
export function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-ax * ax);
  return sign * y;
}

/** Standard normal CDF. */
export function normCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

/** Two-sided critical z for a confidence level. */
export const Z_TWO_SIDED: Record<number, number> = { 90: 1.6448536, 95: 1.959964, 99: 2.5758293 };
/** One-sided z for statistical power. */
export const Z_POWER: Record<number, number> = { 80: 0.8416212, 90: 1.2815516 };

export type ZTest = {
  pA: number;
  pB: number;
  diff: number;
  uplift: number;
  z: number;
  p: number;
  ciLow: number;
  ciHigh: number;
};

/** Two-proportion z-test (pooled SE for the test, unpooled SE for the CI of the difference). */
export function twoPropTest(nA: number, cA: number, nB: number, cB: number, conf: number): ZTest | null {
  if (!(nA > 0 && nB > 0) || cA < 0 || cB < 0 || cA > nA || cB > nB) return null;
  const pA = cA / nA;
  const pB = cB / nB;
  const pool = (cA + cB) / (nA + nB);
  const sePool = Math.sqrt(pool * (1 - pool) * (1 / nA + 1 / nB));
  const diff = pB - pA;
  const z = sePool > 0 ? diff / sePool : 0;
  const p = sePool > 0 ? 2 * (1 - normCdf(Math.abs(z))) : 1;
  const se = Math.sqrt((pA * (1 - pA)) / nA + (pB * (1 - pB)) / nB);
  const zc = Z_TWO_SIDED[conf] ?? 1.959964;
  return {
    pA,
    pB,
    diff,
    uplift: pA > 0 ? diff / pA : NaN,
    z,
    p: Math.max(0, Math.min(1, p)),
    ciLow: diff - zc * se,
    ciHigh: diff + zc * se,
  };
}

/** Per-variant sample size for a two-sided two-proportion test. */
export function sampleSize(baseline: number, mdeRel: number, conf: number, power: number): number {
  const p1 = baseline;
  const p2 = baseline * (1 + mdeRel);
  if (!(p1 > 0 && p1 < 1 && p2 > 0 && p2 < 1) || p1 === p2) return NaN;
  const za = Z_TWO_SIDED[conf] ?? 1.959964;
  const zb = Z_POWER[power] ?? 0.8416212;
  const pbar = (p1 + p2) / 2;
  const a = za * Math.sqrt(2 * pbar * (1 - pbar));
  const b = zb * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2));
  return Math.ceil(((a + b) * (a + b)) / ((p2 - p1) * (p2 - p1)));
}

/** Margin of error for a single proportion. */
export function propCi(p: number, n: number, conf: number): [number, number] {
  const zc = Z_TWO_SIDED[conf] ?? 1.959964;
  const se = n > 0 ? Math.sqrt((p * (1 - p)) / n) : 0;
  return [Math.max(0, p - zc * se), Math.min(1, p + zc * se)];
}
