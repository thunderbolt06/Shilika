import { EditorialScripts } from '@/components/site/EditorialScripts';
import { EditorialShell } from '@/components/site/EditorialChrome';

/**
 * The /services pages render body partials ported from standalone HTML. They
 * used to inline their own <nav>/<footer> + a duplicate copy of the design
 * tokens, which collided with the site-wide globals.css chrome (e.g.
 * `.nav { mix-blend-mode: difference }` inverted the nav, and
 * `body { cursor: none }` left no visible cursor because nothing rendered the
 * custom cursor element). We now wrap them in the same EditorialShell the blog
 * and homepage use, so the header, cursor, grain, and footer match the rest of
 * the site. EditorialScripts loads the shared interaction script.
 */
export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EditorialShell>{children}</EditorialShell>
      <EditorialScripts />
    </>
  );
}
