'use client';

import { useEffect, useId, useRef, useState, type DragEvent } from 'react';
import { downloadFile, num, useToolResult } from '../kit';
import { drawHQ } from './canvas';
import { SelectField, formatBytes } from './shared';
import './pr.css';

type Target = 'keep' | 'image/jpeg' | 'image/webp' | 'image/png' | 'image/avif';

const EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};

type Item = { id: number; file: File };
type Result = { blob?: Blob; url?: string; w: number; h: number; ow: number; oh: number; type: string; error?: string };

function isHeic(f: File) {
  return /\.hei[cf]$/i.test(f.name) || /hei[cf]/i.test(f.type);
}

function baseName(name: string) {
  return name.replace(/\.[^.]+$/, '') || 'image';
}

async function decode(file: File): Promise<{ src: CanvasImageSource; w: number; h: number; close: () => void }> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bmp = await createImageBitmap(file);
      return { src: bmp, w: bmp.width, h: bmp.height, close: () => bmp.close() };
    } catch {
      /* fall back to <img> */
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = 'async';
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('decode'));
      img.src = url;
    });
    return { src: img, w: img.naturalWidth, h: img.naturalHeight, close: () => URL.revokeObjectURL(url) };
  } catch (e) {
    URL.revokeObjectURL(url);
    throw e;
  }
}

async function compress(file: File, target: Target, quality: number, maxW: number, maxH: number, avifOk: boolean): Promise<Result> {
  let type: string = target;
  if (target === 'keep') {
    type = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || (file.type === 'image/avif' && avifOk) ? file.type : 'image/png';
  }
  let decoded;
  try {
    decoded = await decode(file);
  } catch {
    return {
      w: 0,
      h: 0,
      ow: 0,
      oh: 0,
      type,
      error: isHeic(file)
        ? 'HEIC photos cannot be read in this browser. Export as JPG first (iPhone: Settings, Camera, Formats, Most Compatible).'
        : 'Could not read this file as an image.',
    };
  }
  const { src, w: ow, h: oh, close } = decoded;
  const scale = Math.min(1, maxW > 0 ? maxW / ow : 1, maxH > 0 ? maxH / oh : 1);
  const w = Math.max(1, Math.round(ow * scale));
  const h = Math.max(1, Math.round(oh * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    close();
    return { w, h, ow, oh, type, error: 'Canvas is not available in this browser.' };
  }
  if (type === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
  }
  drawHQ(ctx, src, 0, 0, ow, oh, 0, 0, w, h);
  close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality / 100));
  if (!blob) return { w, h, ow, oh, type, error: 'This browser could not encode that format.' };
  // Some browsers silently fall back to PNG for formats they cannot encode.
  return { blob, url: URL.createObjectURL(blob), w, h, ow, oh, type: blob.type || type };
}

export default function ImageCompressor() {
  const [items, setItems] = useState<Item[]>([]);
  const [results, setResults] = useState<Record<number, Result>>({});
  const [target, setTarget] = useState<Target>('image/webp');
  const [quality, setQuality] = useState(80);
  const [maxW, setMaxW] = useState('');
  const [maxH, setMaxH] = useState('');
  const [avifOk, setAvifOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);
  const nextId = useRef(1);
  const urls = useRef<Set<string>>(new Set());
  const thumbs = useRef<Record<number, string>>({});
  const [thumbUrls, setThumbUrls] = useState<Record<number, string>>({});
  const ids = { file: useId(), q: useId(), w: useId(), h: useId() };

  // Feature-detect AVIF encoding after mount.
  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      c.width = 1;
      c.height = 1;
      setAvifOk(c.toDataURL('image/avif').startsWith('data:image/avif'));
    } catch {
      setAvifOk(false);
    }
  }, []);

  // Clean up every object URL on unmount.
  useEffect(
    () => () => {
      urls.current.forEach((u) => URL.revokeObjectURL(u));
      Object.values(thumbs.current).forEach((u) => URL.revokeObjectURL(u));
    },
    [],
  );

  // Re-compress when files or settings change (debounced).
  useEffect(() => {
    const prune = (keep: Record<number, Result>) => {
      const live = new Set(Object.values(keep).map((r) => r.url));
      urls.current.forEach((u) => {
        if (!live.has(u)) {
          URL.revokeObjectURL(u);
          urls.current.delete(u);
        }
      });
    };
    if (!items.length) {
      prune({});
      setResults({});
      setBusy(false);
      return;
    }
    let cancelled = false;
    const t = window.setTimeout(async () => {
      setBusy(true);
      const next: Record<number, Result> = {};
      for (const it of items) {
        const r = await compress(it.file, target, quality, num(maxW, 0), num(maxH, 0), avifOk);
        if (r.url) urls.current.add(r.url);
        if (cancelled) return;
        next[it.id] = r;
        // Show progress row by row.
        setResults((prev) => ({ ...prev, [it.id]: r }));
      }
      setResults(next);
      prune(next);
      setBusy(false);
    }, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [items, target, quality, maxW, maxH, avifOk]);

  function addFiles(list: FileList | null | undefined) {
    if (!list?.length) return;
    const added: Item[] = [];
    const newThumbs: Record<number, string> = {};
    Array.from(list).forEach((file) => {
      if (!file.type.startsWith('image/') && !isHeic(file)) return;
      const id = nextId.current++;
      added.push({ id, file });
      const u = URL.createObjectURL(file);
      thumbs.current[id] = u;
      newThumbs[id] = u;
    });
    if (!added.length) return;
    setThumbUrls((t) => ({ ...t, ...newThumbs }));
    setItems((xs) => [...xs, ...added]);
  }

  function remove(id: number) {
    const u = thumbs.current[id];
    if (u) URL.revokeObjectURL(u);
    delete thumbs.current[id];
    setThumbUrls((t) => {
      const n = { ...t };
      delete n[id];
      return n;
    });
    setItems((xs) => xs.filter((x) => x.id !== id));
  }

  function clearAll() {
    Object.values(thumbs.current).forEach((u) => URL.revokeObjectURL(u));
    thumbs.current = {};
    setThumbUrls({});
    setItems([]);
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setOver(false);
    addFiles(e.dataTransfer.files);
  }

  const outName = (it: Item, r: Result) => `${baseName(it.file.name)}-min.${EXT[r.type] ?? 'png'}`;
  const better = (it: Item, r?: Result) => !!r?.blob && r.blob.size < it.file.size;

  async function downloadAll() {
    for (const it of items) {
      const r = results[it.id];
      if (better(it, r) && r?.blob) downloadFile(outName(it, r), r.blob);
      else downloadFile(it.file.name, it.file);
      await new Promise((res) => window.setTimeout(res, 350));
    }
  }

  const totalBefore = items.reduce((s, it) => s + it.file.size, 0);
  const totalAfter = items.reduce((s, it) => {
    const r = results[it.id];
    return s + (better(it, r) && r?.blob ? r.blob.size : it.file.size);
  }, 0);
  const savedPct = totalBefore ? Math.round((1 - totalAfter / totalBefore) * 100) : 0;

  const summary = items.length
    ? [
        ...items.map((it) => {
          const r = results[it.id];
          if (!r) return `${it.file.name}: ${formatBytes(it.file.size)}, processing`;
          if (r.error) return `${it.file.name}: ${r.error}`;
          const after = r.blob?.size ?? it.file.size;
          const pct = Math.round((1 - after / it.file.size) * 100);
          return `${it.file.name}: ${formatBytes(it.file.size)} to ${formatBytes(after)} (${pct >= 0 ? `${pct}% smaller` : 'larger, keep original'}), ${(EXT[r.type] ?? '').toUpperCase()} ${r.w}x${r.h}`;
        }),
        '',
        `Total: ${formatBytes(totalBefore)} to ${formatBytes(totalAfter)}, ${savedPct}% saved.`,
      ].join('\n')
    : '';
  useToolResult(summary);

  const formatOptions: { value: Target; label: string }[] = [
    { value: 'keep', label: 'Keep original' },
    { value: 'image/webp', label: 'WebP' },
    { value: 'image/jpeg', label: 'JPEG' },
    { value: 'image/png', label: 'PNG' },
    ...(avifOk ? [{ value: 'image/avif' as Target, label: 'AVIF' }] : []),
  ];

  return (
    <div className="ft-stack">
      <div className="ft-grid">
        <div className="ft-card">
          <p className="ft-label">Images</p>
          <label
            htmlFor={ids.file}
            className={`ft-drop${over ? ' is-over' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={onDrop}
          >
            <span>
              <strong>Drop images here</strong> or click to choose
            </span>
            <span className="ft-hint">JPG, PNG, WebP, GIF. Your files never leave your browser.</span>
          </label>
          <input
            id={ids.file}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = '';
            }}
          />
        </div>

        <div className="ft-card">
          <p className="ft-label">Settings</p>
          <SelectField label="Output format" value={target} onChange={setTarget} options={formatOptions} />
          <div className="ft-field">
            <label htmlFor={ids.q}>Quality: {quality}</label>
            <input
              id={ids.q}
              type="range"
              min={10}
              max={100}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              disabled={target === 'image/png'}
            />
            <p className="ft-hint">
              {target === 'image/png' ? 'PNG is lossless, so quality does not apply.' : '75 to 85 looks the same as the original to most eyes.'}
            </p>
          </div>
          <div className="ft-row">
            <div className="ft-field">
              <label htmlFor={ids.w}>Max width</label>
              <input id={ids.w} type="number" inputMode="numeric" placeholder="Any" value={maxW} onChange={(e) => setMaxW(e.target.value)} />
            </div>
            <div className="ft-field">
              <label htmlFor={ids.h}>Max height</label>
              <input id={ids.h} type="number" inputMode="numeric" placeholder="Any" value={maxH} onChange={(e) => setMaxH(e.target.value)} />
            </div>
          </div>
          <p className="ft-hint">Re-encoding strips EXIF metadata, including GPS location.</p>
        </div>
      </div>

      <div className="ft-card" aria-live="polite">
        {items.length ? (
          <>
            <dl className="ft-stats" style={{ marginBottom: 16 }}>
              <div>
                <dt>Before</dt>
                <dd>{formatBytes(totalBefore)}</dd>
              </div>
              <div>
                <dt>After</dt>
                <dd>{formatBytes(totalAfter)}</dd>
              </div>
              <div className="is-key">
                <dt>Saved</dt>
                <dd>{savedPct}%</dd>
                <small>{busy ? 'Working' : `${items.length} file${items.length === 1 ? '' : 's'}`}</small>
              </div>
            </dl>
            <ul className="pr-files">
              {items.map((it) => {
                const r = results[it.id];
                const after = r?.blob?.size;
                const pct = after ? Math.round((1 - after / it.file.size) * 100) : 0;
                return (
                  <li className="pr-file" key={it.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r?.url ?? thumbUrls[it.id]} alt="" />
                    <div style={{ minWidth: 0 }}>
                      <div className="pr-file-name" title={it.file.name}>
                        {it.file.name}
                      </div>
                      <div className="pr-file-meta">
                        {r?.error ? (
                          <span className="pr-bad">{r.error}</span>
                        ) : r ? (
                          <>
                            <span>
                              {formatBytes(it.file.size)} to {formatBytes(after ?? 0)}
                            </span>
                            {after && after < it.file.size ? (
                              <span className="pr-good">{pct}% smaller</span>
                            ) : (
                              <span className="pr-bad">Larger, keep original</span>
                            )}
                            <span>
                              {r.ow !== r.w ? `${r.ow}x${r.oh} to ` : ''}
                              {r.w}x{r.h}
                            </span>
                            <span>{(EXT[r.type] ?? '').toUpperCase()}</span>
                          </>
                        ) : (
                          <span>{formatBytes(it.file.size)}, compressing</span>
                        )}
                      </div>
                    </div>
                    <div className="pr-file-actions">
                      {r?.blob && r.url ? (
                        <a
                          className="tool-btn tool-btn-small"
                          href={better(it, r) ? r.url : thumbUrls[it.id]}
                          download={better(it, r) ? outName(it, r) : it.file.name}
                        >
                          {better(it, r) ? 'Download' : 'Download original'}
                        </a>
                      ) : null}
                      <button type="button" className="tool-btn tool-btn-small" onClick={() => remove(it.id)} aria-label={`Remove ${it.file.name}`}>
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="ft-actions">
              <button type="button" className="tool-btn tool-btn-primary" onClick={downloadAll} disabled={busy}>
                Download all
              </button>
              <button type="button" className="tool-btn tool-btn-small" onClick={clearAll}>
                Clear all
              </button>
            </div>
          </>
        ) : (
          <p className="ft-empty">Add images to see how much you can save.</p>
        )}
      </div>
    </div>
  );
}
