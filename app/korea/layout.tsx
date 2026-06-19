import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';

export default function KoreaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EditorialShell>{children}</EditorialShell>
      <EditorialScripts />
    </>
  );
}
