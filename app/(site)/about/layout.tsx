import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EditorialShell active="about">{children}</EditorialShell>
      <EditorialScripts />
    </>
  );
}
