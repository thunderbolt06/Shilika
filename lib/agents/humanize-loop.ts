import 'server-only';
import { findViolations } from '@/scripts/check-humanization.mjs';

export type Violation = {
  rule: string;
  message: string;
  line: number;
  column: number;
  match: string;
  snippet: string;
};

export function checkHumanization(markdown: string): Violation[] {
  return findViolations(markdown) as Violation[];
}

export function formatViolations(violations: Violation[]): string {
  if (!violations.length) return 'No violations.';
  return violations
    .map((v) => `- line ${v.line} col ${v.column} [${v.rule}]: ${v.message}\n  …${v.snippet}…`)
    .join('\n');
}
