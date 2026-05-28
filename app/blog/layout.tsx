import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';
import './blog.css';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EditorialShell active="blog">{children}</EditorialShell>
      <EditorialScripts />
    </>
  );
}
