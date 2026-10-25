'use client';

/** Small helpers shared by the PR and content tools. */

import { useId, type ReactNode } from 'react';

type BaseProps = { label: string; hint?: ReactNode; className?: string };

export function TextField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  hint,
  className,
}: BaseProps & { value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  const id = useId();
  return (
    <div className={`ft-field ${className ?? ''}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      {hint ? <p className="ft-hint">{hint}</p> : null}
    </div>
  );
}

export function AreaField({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
  hint,
  className,
}: BaseProps & { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  const id = useId();
  return (
    <div className={`ft-field ${className ?? ''}`}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        rows={rows}
        style={{ minHeight: rows * 26 + 24 }}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? <p className="ft-hint">{hint}</p> : null}
    </div>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  hint,
  className,
}: BaseProps & { value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  const id = useId();
  return (
    <div className={`ft-field ${className ?? ''}`}>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint ? <p className="ft-hint">{hint}</p> : null}
    </div>
  );
}

/* ---------- text helpers ---------- */

export function countWords(s: string): number {
  return (s.trim().match(/\S+/g) || []).length;
}

export function lines(s: string): string[] {
  return s
    .split('\n')
    .map((l) => l.replace(/^\s*[-*•]\s*/, '').trim())
    .filter(Boolean);
}

/** Capitalise the first letter and make sure the text ends with punctuation. */
export function sentence(s: string): string {
  const t = s.trim();
  if (!t) return '';
  const c = t.charAt(0).toUpperCase() + t.slice(1);
  return /[.!?"')]$/.test(c) ? c : `${c}.`;
}

/** Drop a trailing full stop. */
export function bare(s: string): string {
  return s.trim().replace(/[.\s]+$/, '');
}

/** Lowercase the first letter unless the word looks like an acronym or a name. */
export function lowerFirst(s: string): string {
  const t = s.trim();
  if (t.length > 1 && t.charAt(1) === t.charAt(1).toUpperCase() && /[A-Z]/.test(t.charAt(1))) return t;
  return t.charAt(0).toLowerCase() + t.slice(1);
}

export function upperFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** "a, b and c" */
export function joinList(items: string[]): string {
  const xs = items.map((x) => x.trim()).filter(Boolean);
  if (xs.length <= 1) return xs[0] ?? '';
  return `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;
}

export function aOrAn(word: string): string {
  return /^[aeiou]/i.test(word.trim()) && !/^(uni|use|eu|one)/i.test(word.trim()) ? 'an' : 'a';
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Parse "YYYY-MM-DD" as a local date (no timezone drift). */
export function parseISODate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function toISODate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** "October 1, 2026" */
export function longDate(iso: string): string {
  const d = parseISODate(iso);
  if (!d) return '';
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

export function shortDate(d: Date): string {
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
}

/** Title Case for headlines, keeping short words lowercase and acronyms intact. */
export function titleCase(s: string): string {
  const small = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'via', 'vs', 'with']);
  return s
    .split(' ')
    .map((w, i, arr) => {
      if (!w) return w;
      if (/[A-Z]/.test(w.slice(1)) || /\d/.test(w) || /^[$€£]/.test(w) || /^[A-Z]$/.test(w)) return w;
      const lower = w.toLowerCase();
      const prev = arr[i - 1] ?? '';
      if (i > 0 && i < arr.length - 1 && small.has(lower) && !/[:]$/.test(prev)) return lower;
      return w
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('-');
    })
    .join(' ');
}

/** Only allow http(s) links in generated output. */
export function safeUrl(u: string): string {
  const t = u.trim();
  return /^https?:\/\/[^\s"'<>]+$/i.test(t) ? t : '';
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function fileSlug(s: string, fallback = 'file'): string {
  const t = s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return t || fallback;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(n < 10240 ? 1 : 0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

/** Print only the element marked .pr-print-target. Call from a click handler. */
export function printTarget() {
  const body = document.body;
  body.classList.add('pr-printing');
  const done = () => {
    body.classList.remove('pr-printing');
    window.removeEventListener('afterprint', done);
  };
  window.addEventListener('afterprint', done);
  window.print();
}
