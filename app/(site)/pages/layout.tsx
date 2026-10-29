import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* pages.js adds .is-visible to [data-reveal] elements via IntersectionObserver.
          Each landing page partial ships its own `[data-reveal] { opacity: 0 }` rule,
          so without JS that content stays permanently invisible. */}
      <noscript>
        <style>{'[data-reveal] { opacity: 1 !important; transform: none !important; }'}</style>
      </noscript>
      <EditorialShell>{children}</EditorialShell>
      <EditorialScripts />
    </>
  );
}
