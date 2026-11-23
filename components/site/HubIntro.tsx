import { HUB_INTROS, type HubKey } from '@/lib/hub-intros';

/** Intro block for the hub pages that render JSX. Copy lives in lib/hub-intros.ts. */
export function HubIntro({ hub }: { hub: HubKey }) {
  const intro = HUB_INTROS[hub];
  return (
    <section className="hub-intro" aria-label={intro.label}>
      {intro.paragraphs.map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
    </section>
  );
}
