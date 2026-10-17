import type { CSSProperties, ReactNode } from 'react';
import catalogJson from '@/lib/media/catalog.json';
import graphicsJson from '@/lib/media/graphics.json';
import manifestJson from '@/lib/media/manifest.json';
import { ogImage } from '@/lib/i18n/og';
import { hashPick, placeAllowed, regionOf, type Place, type Region } from './media-region';

/**
 * Portrait media for the React (non-partial) routes.
 *
 * These components mirror the `.sjm-*` markup that scripts/media/markup.mjs injects into the
 * HTML partials, so app/media.css styles both. They are plain server-safe components: no
 * state, no effects, no JavaScript hooks (nothing here carries data-count, data-reveal or
 * data-magnet). Do not import this file from a "use client" module: it pulls in the whole
 * photo manifest. Client components receive the finished element as a prop instead.
 *
 * Library: lib/media/catalog.json (alt text, place), lib/media/manifest.json (responsive WebP
 * crops), lib/media/graphics.json (baked posters). Share cards for og:image come from
 * lib/i18n/og.ts (ogImage), which reads the single route-to-card mapping in scripts/media/og-map.mjs.
 */

export { hashPick, placeAllowed, regionOf };
export type { Place, Region };
export type Crop = 'wide' | 'land' | 'sq' | 'port';

type CropEntry = { files: { url: string; width: number; height: number }[] };
type PhotoMeta = { id: string; place: Place; alt: string; tags: string[] };
type Graphic = { out: string; width: number; height: number; alt: string; webp?: boolean };

const PHOTOS = (catalogJson as unknown as { photos: PhotoMeta[] }).photos;
const PHOTO_BY_ID: Record<string, PhotoMeta> = Object.fromEntries(PHOTOS.map((p) => [p.id, p]));
const MANIFEST = manifestJson as unknown as Record<string, Partial<Record<Crop, CropEntry>>>;
const GRAPHICS = graphicsJson as unknown as Record<string, Graphic>;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';
export const CALENDLY = 'https://calendly.com/shilikajain/30min/';
export const TELEGRAM = 'https://t.me/shilika3';

export type Cta = { label: string; href: string; external?: boolean };
export const CTA_CALL: Cta = { label: 'Book a call', href: CALENDLY };
export const CTA_TELEGRAM: Cta = { label: 'Chat on Telegram', href: TELEGRAM };

/* ------------------------------------------------------------------ photo lookup */

export function photoMeta(id: string): PhotoMeta {
  const p = PHOTO_BY_ID[id];
  if (!p) throw new Error(`Unknown photo id "${id}"`);
  return p;
}

export function hasCrop(id: string, crop: Crop): boolean {
  return Boolean(MANIFEST[id]?.[crop]);
}

function cropEntry(id: string, crop: Crop): CropEntry {
  const entry = MANIFEST[id]?.[crop];
  if (!entry) throw new Error(`Photo "${id}" has no "${crop}" crop`);
  return entry;
}

function srcSetOf(id: string, crop: Crop): string {
  return cropEntry(id, crop)
    .files.map((f) => `${f.url} ${f.width}w`)
    .join(', ');
}

/**
 * Deterministic photo choice. `seed` (usually the page slug) makes neighbouring pages differ
 * but keeps one page stable between renders. `region` limits the pool to photos that cannot
 * contradict the page (see placeAllowed); Singapore and Hong Kong pages prefer their own
 * place's photos. `exclude` keeps a photo from appearing twice on one page. `from` narrows to
 * a curated list.
 */
export function pickPhoto({
  seed,
  crop,
  region = null,
  exclude = [],
  from,
}: {
  seed: string;
  crop: Crop;
  region?: Region | null;
  exclude?: Iterable<string>;
  from?: readonly string[];
}): string {
  const skip = new Set(exclude);
  const base = (from ?? PHOTOS.map((p) => p.id)).filter(
    (id) => hasCrop(id, crop) && placeAllowed(region, photoMeta(id).place),
  );
  let pool = base.filter((id) => !skip.has(id));
  if (region && region !== 'other') {
    const local = pool.filter((id) => photoMeta(id).place === region);
    if (local.length) pool = local;
  }
  if (!pool.length) pool = base; // every candidate already used: allow a repeat rather than fail
  if (!pool.length) throw new Error(`No photo has a "${crop}" crop for region ${region}`);
  return pool[hashPick(seed, pool.length)];
}

/** Square crops where the face fills the frame: they stay readable as a 44 to 160px round avatar. */
export const AVATAR_IDS = [
  'lounge',
  'stage-b',
  'stablecoin-summit',
  'sg-bridge-a',
  'sg-marina-b',
  'sg-marina-c',
  'depin-day-hk',
] as const;

/** 4:5 crops where the face is still readable in a small (about 120px wide) figure. */
export const PORTRAIT_IDS = [
  'lounge',
  'depin-day-hk',
  'sg-bridge-a',
  'sg-river-a',
  'sg-river-b',
  'stage-a',
  'stage-b',
] as const;

/** 4:5 crops that fill the portrait half of a CTA band without losing her. */
export const CTA_IDS = [
  'depin-day-hk',
  'lounge',
  'sg-bridge-a',
  'sg-river-a',
  'sg-river-b',
  'sg-marina-a',
  'sg-marina-b',
  'sg-marina-c',
  'sg-marina-d',
  'press-lounge',
  'stage-a',
  'stage-b',
] as const;

/**
 * Photos for a 2.4:1 band, with the side the copy goes on. The scrim darkens that side, so it is
 * the side she is not on. Left out: the three centred Marina Bay frames (copy would sit on her) and
 * the Stablecoin Summit wall (copy would cover the sign; it is used as a square or land crop instead).
 */
export const BAND_SIDE: Record<string, 'left' | 'right'> = {
  'depin-day-hk': 'right',
  library: 'left',
  lounge: 'left',
  'sg-marina-b': 'left',
  'sg-bridge-b': 'left',
  'sg-river-a': 'left',
  'sg-river-b': 'left',
};
/** Photos with lettering behind the copy (see .sjm-band--bold in app/media.css). */
const SIGNAGE_IDS = new Set(['depin-day-hk', 'stablecoin-summit', 'press-lounge']);
export const COVER_IDS: readonly string[] = Object.keys(BAND_SIDE).filter((id) => hasCrop(id, 'wide'));

/* ------------------------------------------------------------------ share cards */

export type ShareCard = { url: string; width: number; height: number; alt: string };

/** 1200x630 share card for og:image / twitter:image: the one scripts/media/og-map.mjs picks for a route. */
export function routeShareCard(route: string): ShareCard {
  return ogImage(route, SITE_URL);
}

/**
 * Share card of a blog post that has no cover of its own. The slug decides (og-map reads it for a
 * case study, a market or a topic); the title and tags are accepted so callers can pass them, but
 * the mapping is a pure function of the route, so every language of a post shares one card.
 */
export function topicShareCard(slug: string, ..._prose: (string | null | undefined)[]): ShareCard {
  return routeShareCard(`/blog/${slug}`);
}

/* ------------------------------------------------------------------ building blocks */

type PhotoProps = {
  id: string;
  crop?: Crop;
  sizes?: string;
  /** Pass "" for a decorative image. Defaults to the catalog description of the photo. */
  alt?: string;
  loading?: 'lazy' | 'eager';
  /** The one hero image that is in the first viewport: eager, high fetch priority. */
  priority?: boolean;
  /** Switch to another crop on small screens, like the band does. */
  mobile?: { crop: Crop; sizes?: string; max?: number };
  className?: string;
  pictureClassName?: string;
  style?: CSSProperties;
};

/** Responsive WebP <picture>. Width and height describe the default <img>, so nothing shifts. */
export function Photo({
  id,
  crop = 'land',
  sizes = '100vw',
  alt,
  loading = 'lazy',
  priority = false,
  mobile,
  className,
  pictureClassName,
  style,
}: PhotoProps) {
  const main = cropEntry(id, crop);
  const dflt = main.files[Math.min(1, main.files.length - 1)];
  const text = alt ?? photoMeta(id).alt;
  const useMobile = mobile && hasCrop(id, mobile.crop);
  return (
    <picture className={pictureClassName}>
      {useMobile && (
        <source
          media={`(max-width: ${mobile.max ?? 720}px)`}
          type="image/webp"
          srcSet={srcSetOf(id, mobile.crop)}
          sizes={mobile.sizes ?? '100vw'}
        />
      )}
      <source type="image/webp" srcSet={srcSetOf(id, crop)} sizes={sizes} />
      <img
        src={dflt.url}
        width={dflt.width}
        height={dflt.height}
        alt={text}
        {...(priority ? { fetchPriority: 'high' as const } : { loading })}
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  );
}

function Buttons({ cta, cta2, className }: { cta?: Cta; cta2?: Cta; className: string }) {
  const items = [cta && { ...cta, cls: 'sjm-btn' }, cta2 && { ...cta2, cls: 'sjm-btn sjm-btn--ghost' }].filter(
    Boolean,
  ) as (Cta & { cls: string })[];
  if (!items.length) return null;
  return (
    <div className={className}>
      {items.map((b) => (
        <a
          key={b.label}
          className={b.cls}
          href={b.href}
          {...(b.external === false ? {} : { target: '_blank', rel: 'noopener' })}
        >
          {b.label}
        </a>
      ))}
    </div>
  );
}

type BandProps = {
  id: string;
  /** Up to three words. */
  eyebrow?: string;
  /** May carry an <em>. Up to nine words. */
  title?: ReactNode;
  /** Up to fourteen words. */
  sub?: string;
  cta?: Cta;
  cta2?: Cta;
  /** Defaults to the side recorded in BAND_SIDE for this photo. */
  align?: 'left' | 'right' | 'center' | 'clear';
  alt?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
};

/** Photo band with live text. Desktop uses the 2.4:1 `wide` crop, phones the 4:5 `port` crop. */
export function PhotoBand({
  id,
  eyebrow,
  title,
  sub,
  cta,
  cta2,
  align,
  alt,
  sizes = '100vw',
  loading,
  priority,
}: BandProps) {
  const hasCopy = Boolean(eyebrow || title || sub || cta);
  const side = align ?? BAND_SIDE[id] ?? 'left';
  const mod = !hasCopy || side === 'clear' ? 'clear' : side;
  // Photos with sponsor or event lettering behind the copy get a heavier scrim.
  const bold = hasCopy && SIGNAGE_IDS.has(id) ? ' sjm-band--bold' : '';
  return (
    <div className={`sjm-band sjm-band--${mod}${bold}`} data-sjm="band">
      <Photo
        id={id}
        crop="wide"
        sizes={sizes}
        alt={alt}
        loading={loading}
        priority={priority}
        mobile={hasCrop(id, 'port') ? { crop: 'port', sizes: '100vw', max: 720 } : undefined}
        pictureClassName="sjm-band__pic"
      />
      {hasCopy && (
        <div className="sjm-band__copy">
          {eyebrow && <p className="sjm-eyebrow">{eyebrow}</p>}
          {title && <p className="sjm-band__title">{title}</p>}
          {sub && <p className="sjm-band__sub">{sub}</p>}
          <Buttons cta={cta} cta2={cta2} className="sjm-band__row" />
        </div>
      )}
    </div>
  );
}

type CtaBandProps = {
  id: string;
  eyebrow?: string;
  title?: ReactNode;
  sub?: string;
  primary?: Cta | null;
  secondary?: Cta | null;
  alt?: string;
};

/** Dark CTA banner with a portrait; the defaults mirror the contact page. */
export function CtaBand({
  id,
  eyebrow = 'Work with Shilika',
  title = (
    <>
      Book a 30-min <em>intro call</em>.
    </>
  ),
  sub = 'I come prepped with a teardown of your current press footprint.',
  primary = CTA_CALL,
  secondary = CTA_TELEGRAM,
  alt,
}: CtaBandProps) {
  return (
    <div className="sjm-cta" data-sjm="cta">
      <div className="sjm-cta__inner">
        <div className="sjm-cta__pic">
          <Photo id={id} crop="port" sizes="(min-width: 760px) 40vw, 92vw" alt={alt} />
        </div>
        <div className="sjm-cta__copy">
          <p className="sjm-eyebrow">{eyebrow}</p>
          <p className="sjm-cta__title">{title}</p>
          <p className="sjm-cta__sub">{sub}</p>
          <Buttons cta={primary ?? undefined} cta2={secondary ?? undefined} className="sjm-cta__row" />
        </div>
      </div>
    </div>
  );
}

type WallItem = { id: string; caption?: string; href?: string; alt?: string };

/** Row of two to four baked posters (1080x1350). */
export function PosterWall({ eyebrow, title, items }: { eyebrow?: string; title?: ReactNode; items: WallItem[] }) {
  const n = items.length;
  const cols = Math.min(n, 4);
  return (
    <div className="sjm-wall" data-sjm="wall" style={{ '--sjm-cols': cols } as CSSProperties}>
      {(eyebrow || title) && (
        <div className="sjm-wall__head">
          <div>
            {eyebrow && <p className="sjm-eyebrow">{eyebrow}</p>}
            {title && <p className="sjm-wall__title">{title}</p>}
          </div>
        </div>
      )}
      <div className="sjm-wall__grid" data-n={n}>
        {items.map((it) => (
          <figure key={it.id} className="sjm-wall__item">
            {it.href ? (
              <a href={it.href}>
                <PosterPicture id={it.id} alt={it.alt} />
              </a>
            ) : (
              <PosterPicture id={it.id} alt={it.alt} />
            )}
            {it.caption && <figcaption>{it.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}

/** Baked poster as <picture>: WebP with a JPG fallback. */
export function PosterPicture({ id, alt, sizes = '(min-width: 900px) 25vw, 46vw' }: { id: string; alt?: string; sizes?: string }) {
  const g = GRAPHICS[id];
  if (!g) throw new Error(`Unknown graphic "${id}"`);
  const base = `/assets/media/${g.out}`;
  return (
    <picture>
      {g.webp && <source type="image/webp" srcSet={`${base}.webp`} sizes={sizes} />}
      <img src={`${base}.jpg`} width={g.width} height={g.height} alt={alt ?? g.alt} loading="lazy" decoding="async" />
    </picture>
  );
}
