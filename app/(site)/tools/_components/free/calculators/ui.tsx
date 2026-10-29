'use client';

import { useId, type ReactNode } from 'react';
import { CURRENCIES, type Currency } from './money';
import './calculators.css';

export function NumField({
  label,
  value,
  onChange,
  suffix,
  hint,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  hint?: string;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div className="ft-field">
      <label htmlFor={id}>{label}</label>
      <div className={suffix ? 'calc-affix' : undefined}>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {suffix ? <span aria-hidden="true">{suffix}</span> : null}
      </div>
      {hint ? <p className="ft-hint">{hint}</p> : null}
    </div>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
}) {
  const id = useId();
  return (
    <div className="ft-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Currency picker plus Reset, shown at the top of each calculator's input card. */
export function CalcHead({
  currency,
  onCurrency,
  onReset,
  title = 'Inputs',
}: {
  currency?: Currency;
  onCurrency?: (c: Currency) => void;
  onReset: () => void;
  title?: string;
}) {
  const id = useId();
  return (
    <div className="calc-head">
      <p className="ft-label">{title}</p>
      <div className="calc-head-actions">
        {currency && onCurrency ? (
          <>
            <label htmlFor={id} className="sr-only">
              Currency
            </label>
            <select id={id} className="calc-cur" value={currency} onChange={(e) => onCurrency(e.target.value as Currency)}>
              {CURRENCIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </>
        ) : null}
        <button type="button" className="tool-btn tool-btn-small" onClick={onReset}>
          Reset
        </button>
      </div>
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
  options: { id: T; label: string }[];
  label: string;
}) {
  return (
    <div className="ft-tabs" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Plain-English reading of the result. */
export function Interp({ children }: { children: ReactNode }) {
  return <p className="calc-interp">{children}</p>;
}

export function Stat({
  label,
  value,
  note,
  isKey,
}: {
  label: string;
  value: ReactNode;
  note?: ReactNode;
  isKey?: boolean;
}) {
  return (
    <div className={isKey ? 'is-key' : undefined}>
      <dt>{label}</dt>
      <dd>{value}</dd>
      {note ? <small>{note}</small> : null}
    </div>
  );
}
