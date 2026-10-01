import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';

/**
 * Shared chrome (cursor, grain, nav, footer) for the playbook index and every
 * playbook article. The legacy article partials still carry their own nav and
 * footer markup; each page strips it via stripLegacyChrome() so the chrome
 * isn't doubled.
 */
export default function PlaybookLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EditorialShell active="playbook">{children}</EditorialShell>
      <EditorialScripts />
    </>
  );
}
