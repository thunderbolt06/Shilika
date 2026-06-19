import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EditorialShell active="testimonials">{children}</EditorialShell>
      <EditorialScripts />
    </>
  );
}
