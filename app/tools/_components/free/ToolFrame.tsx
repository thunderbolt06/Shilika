'use client';

import type { ReactNode } from 'react';
import EmailResult from './EmailResult';
import { ResultProvider } from './kit';

export default function ToolFrame({ slug, name, children }: { slug: string; name: string; children: ReactNode }) {
  return (
    <ResultProvider>
      <div className="ft-tool">{children}</div>
      <EmailResult slug={slug} toolName={name} />
    </ResultProvider>
  );
}
