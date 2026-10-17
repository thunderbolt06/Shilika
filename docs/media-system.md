# Portrait media system

Photos and video of Shilika at conferences (TOKEN2049 Singapore, Consensus press lounge, DePIN Day Hong Kong,
Stablecoin Summit, a stage talk), baked text graphics, and the machinery that places them across the site.
Originals (HEIC/JPG/MOV) are **not** in the repo. Everything below is rebuilt from them.

## Rebuild

```bash
export SHILIKA_PORTRAITS_DIR="/path/to/Shilika photos"      # folder with the originals (incl. IMG_9251.MOV)
pnpm media:photos      # lib/media/catalog.json -> public/assets/media/photos/*.webp + lib/media/manifest.json
pnpm media:graphics    # scripts/media/graphics.config.mjs -> og/, posters/, covers/ + lib/media/graphics.json
pnpm media:loops       # stage-talk clip -> public/assets/media/video/speaker-reel.mp4 + poster (needs ffmpeg)
pnpm media:inject      # place blocks into app/_partials (idempotent)
pnpm media:revert      # strip every injected block
pnpm media:info        # print the library: photos, crops, graphics, band-capable photos
```

HEIC is converted with macOS `sips`; two stage stills are pulled from the video with ffmpeg (`frame` in the
catalog). All outputs are stripped of EXIF/GPS. `redact` in the catalog blurs anything that must not be readable.

## What is in the library

| Kind | Where | Notes |
| --- | --- | --- |
| Photos | `public/assets/media/photos/<id>-<crop>-<width>.webp` | 16 photos. Crops: `wide` 2.4:1, `land` 16:10, `sq` 1:1, `port` 4:5. Not every photo has every crop (`pnpm media:info`). Eleven photos can drive a full-width band. |
| Share cards | `public/assets/media/og/<name>.jpg` | 1200x630, one per topic cluster and case study. Use for `og:image` / `twitter:image`. |
| Posters | `public/assets/media/posters/<name>.{jpg,webp}` | 1080x1350 (4:5): five stat posters, topic and region posters. `story-*` are 1080x1920. |
| Covers | `public/assets/media/covers/*.jpg` | LinkedIn 1584x396, X 1500x500, YouTube 2560x1440, newsletter 1200x400. Press-kit downloads. |
| Video | `public/assets/media/video/speaker-reel.mp4` + `-poster.webp` | 7-second stage talk, 720x1280 with sound. Playable (controls), never autoplays. |

Photo places: `singapore` (TOKEN2049 hall, Marina Bay, Singapore River), `hong-kong` (DePIN Day), `event`
(Press Lounge, Stablecoin Summit, stage talk), `neutral` (library, lounge).

The look of every graphic comes from `scripts/media/templates/*.html` (the site's own fonts and
palette). Copy lives in `scripts/media/graphics.config.mjs`.

## Placement blocks (`.sjm-*`, styled in `app/media.css`)

Builders are in `scripts/media/markup.mjs`:

| Builder | Use it for |
| --- | --- |
| `band({ id, eyebrow, title, sub, cta })` | Full-bleed photo band with live text. The photo must have a `wide` crop. Phones switch to the `port` crop. |
| `figure({ id, label, caption })` | Captioned in-content photo (16:10). |
| `wall({ eyebrow, title, items })` | Row of 2 to 4 baked posters. |
| `strip({ eyebrow, title, items })` | Scrolling row of portrait snapshots. |
| `ctaBand({ id, ... })` | Dark CTA banner with a portrait (Calendly and Telegram buttons by default). |
| `avatar({ id, size })` | Round portrait for bylines. |
| `video({ id, caption })` | The playable speaker reel (controls, loads on press). |

Wrap each with `block(key, html)` and insert with `place(html, key, markup, { after | before })`.

## Rules that keep the pages safe

1. **Additive only.** Injection never edits existing markup or text. `inject.mjs` refuses any
   change where removing the media blocks does not give back the original file byte for byte.
   That keeps the translation hashes (`lib/i18n/segment.ts`) of existing text intact.
2. **Block-level placement only.** Put blocks between sections, never inside a paragraph or list.
3. **Idempotent and reversible.** Each block is wrapped in `<!--sjm:key-->...<!--/sjm:key-->`.
   Re-running replaces blocks with the same key. `--revert` removes them all.
4. **Photo matches the page.** Singapore pages use `singapore` photos. Hong Kong pages may use `hong-kong`.
   Pages about any other place (Korea, India, Japan, Dubai/MENA, USA, UK, Vietnam...) use only `event` and
   `neutral` photos, and their copy must never imply the photo was taken there. Global pages may use any photo.
5. **No new hooks for site scripts.** Do not use `data-count`, `data-reveal`, `data-magnet` or
   class names the legacy scripts query (`site.js`, `pages.js`). Blocks must not depend on JS.
6. **Copy follows `docs/humanization-guide.md`**: no em dashes, no arrows, no AI filler. Use facts
   already on the site.
7. **Performance.** Images carry `width`/`height`, `loading="lazy"` (one eager, high-priority hero
   image at most, and only when it is in the first viewport), `decoding="async"` and a WebP `srcset`.
8. **Alt text** describes what is visible. Decorative images get `alt=""`.

## Adding a page

New partials get media the next time `pnpm media:inject` runs. Add the partial to the matching
family in `scripts/media/families/`, or write a new family module (`name`, `files()`, `apply()`).

## Checks

```bash
node scripts/media/audit.mjs --usage            # additive-only, missing assets, img attributes, banned punctuation, region match, repeats
node scripts/media/sweep.mjs --width 390 /about /korea     # phone and desktop sweep: overflow, broken images, HTTP and console errors
node scripts/media/shot-cdp.mjs http://localhost:3000/speaker /tmp/speaker.png 1440 --blocks   # one PNG per media block
scripts/media/shot.sh http://localhost:3000/about out.png 1440 9000                            # plain full-page screenshot
```

`sweep.mjs` hides the media blocks and measures again, so page overflow that exists without them is reported as a
note, not a failure. The homepage intro deck covers the page in screenshots: pass
`--js "document.getElementById('icards')?.remove()"` to `shot-cdp.mjs`.

## Translations

New visible text and alt text in the injected blocks becomes new segments on the translated pages (home, about,
services, contact, the six region pages, eight playbooks). After changing copy or re-running the injector:

```bash
pnpm i18n extract
node --experimental-strip-types scripts/media/i18n-missing.mjs --out missing.json   # unique English strings still untranslated
# translate them into zh, ko, ja, es, ru -> table.json: { "<segmentId>": { "zh": "...", "ko": "...", ... } }
node --experimental-strip-types scripts/media/i18n-apply.mjs table.json            # rejects rows whose <n> placeholders do not match
pnpm i18n check
```

## Caching

`/assets/media/**` is served with `max-age=86400, stale-while-revalidate=604800` (next.config.ts). The generic
image rule pins other `/assets` images as `immutable` for a year; the media files are rebuilt under the same names,
so they must not be pinned that long. If you want long caching later, add a content hash to the file names first.
