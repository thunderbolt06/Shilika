import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import testimonials from '@/data/testimonials.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

const LI_SVG =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43c-1.14 0-2.07-.93-2.07-2.07s.93-2.07 2.07-2.07 2.07.93 2.07 2.07-.93 2.07-2.07 2.07zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>';

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

/**
 * testimonials.js used to build this same markup client-side via
 * `#t-list.innerHTML =`, which meant no testimonial content existed in the
 * page without JS. Rendering it server-side here keeps the markup (and the
 * data-li-* attributes the LinkedIn modal reads) identical, so testimonials.js
 * only needs to wire up interactivity on load, not create the DOM.
 */
function renderTestimonials(): string {
  return testimonials
    .map((t, i) => {
      const n = String(i + 1).padStart(3, '0');
      const url = `https://www.linkedin.com/in/${t.vanity}`;
      return `<article class="t-item reveal">
    <div class="t-num">${n} / 019</div>
    <div class="t-body">
      <p class="t-quote">${esc(t.quote)}</p>
      <div class="t-foot">
        <div class="t-who">
          <strong>${esc(t.name)}</strong>
          <span class="t-headline">${esc(t.headline)}</span>
          <span class="t-rel">${esc(t.date)} · ${esc(t.relationship)}</span>
        </div>
        <button type="button" class="t-li" data-li-vanity="${esc(t.vanity)}" data-li-name="${esc(t.name)}" data-li-title="${esc(t.headline)}" data-li-url="${url}" aria-label="View ${esc(t.name)} on LinkedIn">
          ${LI_SVG}<span>Preview on LinkedIn</span>
        </button>
      </div>
    </div>
  </article>`;
    })
    .join('');
}

export const metadata: Metadata = {
  title: 'Testimonials - What clients say about Shilika Jain',
  description: '19 LinkedIn recommendations from Web3 founders, marketers and journalists who have worked with Shilika Jain - a senior PR strategist for Web3 and AI.',
  
  alternates: { canonical: 'https://www.shilikajain.com/testimonials' },
  openGraph: {
    title: 'Testimonials - 19 LinkedIn recommendations for Shilika Jain',
    description: 'Unedited recommendations from founders, CMOs and journalists who have worked with Shilika Jain.',
    url: 'https://www.shilikajain.com/testimonials',
    type: 'website',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Testimonials - 19 LinkedIn recommendations for Shilika Jain',
    description: 'Unedited recommendations from founders, CMOs and journalists who have worked with Shilika Jain.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  const html = fs.readFileSync(path.join(process.cwd(), 'app/_partials/testimonials-body.html'), 'utf8');
  return html.replace(
    '<main class="t-list" id="t-list"></main>',
    `<main class="t-list" id="t-list">${renderTestimonials()}</main>`,
  );
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/testimonials-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="testimonials-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/testimonials.js" strategy="afterInteractive" />
    </>
  );
}
