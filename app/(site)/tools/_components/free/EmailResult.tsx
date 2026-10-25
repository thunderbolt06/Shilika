'use client';

import { useState, type FormEvent } from 'react';
import { useCurrentResult } from './kit';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Optional lead capture under every free tool. If the tool has published a
 * result, the visitor can email it to themselves. Otherwise it offers to send
 * new tools as they ship. Never blocks using the tool.
 */
export default function EmailResult({ slug, toolName }: { slug: string; toolName: string }) {
  const result = useCurrentResult();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const hasResult = result.trim().length > 0;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/tools/email-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          slug,
          tool: toolName,
          result: hasResult ? result : '',
          website: (form.elements.namedItem('website') as HTMLInputElement | null)?.value ?? '',
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setStatus('sent');
      try {
        (window as unknown as { posthog?: { capture: (e: string, p: object) => void } }).posthog?.capture(
          'tool_email_result',
          { tool: slug },
        );
      } catch {
        // analytics is optional
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <section className="ft-lead no-print" aria-label="Email this result">
      <div className="ft-lead-copy">
        <h2>{hasResult ? <>Email me this <em>result</em></> : <>Get new <em>tools</em> first</>}</h2>
        <p>
          {hasResult
            ? 'Optional. One email with your result, plus the occasional growth note. Unsubscribe any time.'
            : 'Optional. New free tools and growth notes, roughly once a month.'}
        </p>
      </div>
      {status === 'sent' ? (
        <p className="ft-lead-done" role="status">
          Sent. Check your inbox{hasResult ? ' for your result' : ''}.
        </p>
      ) : (
        <form className="ft-lead-form" onSubmit={submit}>
          <label className="sr-only" htmlFor={`lead-${slug}`}>
            Email address
          </label>
          <input
            id={`lead-${slug}`}
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="ft-hp" aria-hidden="true" />
          <button type="submit" className="tool-btn tool-btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending' : hasResult ? 'Email it to me' : 'Keep me posted'}
          </button>
          {status === 'error' && (
            <p className="ft-lead-error" role="alert">
              {error}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
