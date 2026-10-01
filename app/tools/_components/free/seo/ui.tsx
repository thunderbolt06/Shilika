'use client';

import { useId, type ReactNode } from 'react';

/** Small labelled inputs shared by the SEO tools. Each one wires label htmlFor to a useId. */

export function TextField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  hint,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: 'text' | 'url' | 'email' | 'tel' | 'date' | 'number';
  placeholder?: string;
  hint?: ReactNode;
  inputMode?: 'text' | 'url' | 'email' | 'tel' | 'numeric' | 'decimal';
}) {
  const id = useId();
  return (
    <div className="ft-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={type === 'text' ? undefined : false}
        autoComplete="off"
      />
      {hint ? <p className="ft-hint">{hint}</p> : null}
    </div>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  hint,
  rows,
  tall,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: ReactNode;
  rows?: number;
  tall?: boolean;
}) {
  const id = useId();
  return (
    <div className="ft-field">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        rows={rows}
        placeholder={placeholder}
        className={tall ? 'ft-tall' : undefined}
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
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  hint?: ReactNode;
}) {
  const id = useId();
  return (
    <div className="ft-field">
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

export function Tabs<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
  label: string;
}) {
  return (
    <div className="ft-tabs" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Normalise a user-typed URL: add https:// when the scheme is missing. */
export function normaliseUrl(raw: string): string {
  const v = raw.trim();
  if (!v) return '';
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(v) ? v : `https://${v}`;
}

export function hostOf(raw: string): string {
  try {
    return new URL(normaliseUrl(raw)).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}
