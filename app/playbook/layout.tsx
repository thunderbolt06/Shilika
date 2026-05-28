import { EditorialScripts } from '@/components/site/EditorialScripts';

/**
 * The legacy article pages already include their own <nav>, <footer>, and
 * editorial markup inside the body partials. So we don't wrap them in
 * EditorialShell here — that would double the chrome. We just load the
 * shared scripts.
 */
export default function PlaybookLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <EditorialScripts />
    </>
  );
}
