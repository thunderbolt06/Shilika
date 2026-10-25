import type { ReactNode } from 'react';
import type { Faq } from '../_lib/seo';
import { Photo, PORTRAIT_IDS, pickPhoto } from '@/components/site/Media';

export function ToolHero({
  kicker,
  title,
  children,
  seed,
}: {
  kicker: string;
  title: ReactNode;
  children: ReactNode;
  /** Picks the portrait beside the intro; the tool slug keeps neighbouring tools different. */
  seed?: string;
}) {
  const portrait = pickPhoto({ seed: seed ?? kicker, crop: 'port', from: PORTRAIT_IDS });
  return (
    <section className="blog-index-hero tool-hero">
      <div>
        <p className="blog-index-kicker">
          <a href="/tools" className="tool-crumb">
            Tools
          </a>{' '}
          <span className="dot" /> {kicker}
        </p>
        <h1 className="blog-index-title tool-title">{title}</h1>
      </div>
      <div className="blog-index-blurb tool-hero-blurb">
        <figure className="tool-hero-photo no-print">
          <Photo id={portrait} crop="port" sizes="120px" />
        </figure>
        <div className="tool-hero-copy">{children}</div>
      </div>
    </section>
  );
}

export function ToolHowTo({ steps }: { steps: string[] }) {
  return (
    <section className="tool-howto no-print" aria-labelledby="howto-heading">
      <h2 id="howto-heading" className="tool-section-label">
        How to use it
      </h2>
      <ol>
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </section>
  );
}

export function ToolFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="tool-faq no-print" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="tool-h2">
        Questions founders <em>ask</em>
      </h2>
      <div className="tool-faq-list">
        {faqs.map((f) => (
          <details key={f.q} className="tool-faq-item">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ToolCta() {
  return (
    <section className="post-cta tool-cta no-print" aria-label="Work with Shilika">
      <h3>
        Want a second pair of <em>eyes</em>?
      </h3>
      <p>
        Bring your plan to a 30-minute teardown. I will look at your positioning, channel mix and launch
        timing, and tell you what I would cut first. Fractional PR retainers run $3K to $7K a month, and
        launch sprints run $15K to $40K.
      </p>
      <div className="tool-cta-links">
        <a href="/contact" data-magnet>
          Book a 30-minute teardown
        </a>
        <a href="/resources" className="tool-cta-secondary" data-magnet>
          Browse free resources
        </a>
      </div>
    </section>
  );
}

export function JsonLd({ id, data }: { id: string; data: unknown }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
