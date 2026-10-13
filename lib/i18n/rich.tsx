import type { ReactNode } from 'react';

/** Render a UI string's `<1>…</1>` span as <em>, wherever the translator put it. */
export function withEm(text: string): ReactNode {
  const match = /^([\s\S]*?)<1>([\s\S]*?)<\/1>([\s\S]*)$/.exec(text);
  if (!match) return text;
  return (
    <>
      {match[1]}
      <em>{match[2]}</em>
      {match[3]}
    </>
  );
}
