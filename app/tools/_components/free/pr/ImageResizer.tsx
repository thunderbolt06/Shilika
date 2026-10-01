'use client';

import { useEffect, useId, useMemo, useRef, useState, type DragEvent, type MouseEvent } from 'react';
import { downloadFile, num, useToolResult } from '../kit';
import { drawHQ } from './canvas';
import { SelectField, fileSlug, formatBytes } from './shared';
import './pr.css';

type Preset = { id: string; label: string; w: number; h: number };

const PRESETS: Preset[] = [
  { id: 'ig-post', label: 'Instagram post', w: 1080, h: 1080 },
  { id: 'ig-portrait', label: 'Instagram portrait', w: 1080, h: 1350 },
  { id: 'ig-story', label: 'Instagram story / Reel', w: 1080, h: 1920 },
  { id: 'li-post', label: 'LinkedIn post', w: 1200, h: 627 },
  { id: 'li-banner', label: 'LinkedIn banner', w: 1584, h: 396 },
  { id: 'x-post', label: 'X post', w: 1600, h: 900 },
  { id: 'x-header', label: 'X header', w: 1500, h: 500 },
  { id: 'fb-post', label: 'Facebook post', w: 1200, h: 630 },
  { id: 'fb-cover', label: 'Facebook cover', w: 851, h: 315 },
  { id: 'yt-thumb', label: 'YouTube thumbnail', w: 1280, h: 720 },
  { id: 'yt-banner', label: 'YouTube banner', w: 2560, h: 1440 },
  { id: 'og', label: 'Open Graph', w: 1200, h: 630 },
  { id: 'tiktok', label: 'TikTok', w: 1080, h: 1920 },
  { id: 'pinterest', label: 'Pinterest', w: 1000, h: 1500 },
];

type Fmt = 'image/png' | 'image/jpeg' | 'image/webp';
const EXT: Record<Fmt, string> = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };

type Out = { id: string; label: string; w: number; h: number; url: string; blob: Blob; upscaled: boolean };

function render(
  img: HTMLImageElement,
  W: number,
  H: number,
  mode: 'crop' | 'fit',
  focus: { x: number; y: number },
  bg: string,
  fmt: Fmt,
  quality: number,
): Promise<Blob | null> {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return Promise.resolve(null);
  if (mode === 'fit' || fmt === 'image/jpeg') {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
  }
  if (mode === 'crop') {
    const scale = Math.max(W / iw, H / ih);
    const sw = W / scale;
    const sh = H / scale;
    const sx = Math.min(Math.max(focus.x * iw - sw / 2, 0), iw - sw);
    const sy = Math.min(Math.max(focus.y * ih - sh / 2, 0), ih - sh);
    drawHQ(ctx, img, sx, sy, sw, sh, 0, 0, W, H);
  } else {
    const scale = Math.min(W / iw, H / ih);
    const dw = Math.round(iw * scale);
    const dh = Math.round(ih * scale);
    drawHQ(ctx, img, 0, 0, iw, ih, Math.round((W - dw) / 2), Math.round((H - dh) / 2), dw, dh);
  }
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), fmt, quality / 100));
}

export default function ImageResizer() {
  const [fileName, setFileName] = useState('');
  const [srcUrl, setSrcUrl] = useState('');
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [error, setError] = useState('');
  const [over, setOver] = useState(false);
  const [focus, setFocus] = useState({ x: 0.5, y: 0.5 });
  const [selected, setSelected] = useState<string[]>(['ig-post', 'li-post', 'x-post', 'og']);
  const [customs, setCustoms] = useState<Preset[]>([]);
  const [cw, setCw] = useState('1200');
  const [ch, setCh] = useState('1200');
  const [mode, setMode] = useState<'crop' | 'fit'>('crop');
  const [bg, setBg] = useState('#ffffff');
  const [fmt, setFmt] = useState<Fmt>('image/jpeg');
  const [quality, setQuality] = useState(90);
  const [outs, setOuts] = useState<Out[]>([]);
  const [busy, setBusy] = useState(false);
  const outsRef = useRef<Out[]>([]);
  const srcRef = useRef('');
  const ids = { file: useId(), bg: useId(), q: useId(), cw: useId(), ch: useId() };

  // Revoke object URLs when the component unmounts.
  useEffect(
    () => () => {
      outsRef.current.forEach((o) => URL.revokeObjectURL(o.url));
      if (srcRef.current) URL.revokeObjectURL(srcRef.current);
    },
    [],
  );

  function loadFile(file: File | undefined) {
    if (!file) return;
    setError('');
    const isHeic = /hei[cf]$/i.test(file.name) || /hei[cf]/i.test(file.type);
    if (!file.type.startsWith('image/') && !isHeic) {
      setError('That file is not an image. Try a JPG, PNG or WebP.');
      return;
    }
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = () => {
      if (srcRef.current) URL.revokeObjectURL(srcRef.current);
      srcRef.current = url;
      setSrcUrl(url);
      setImg(im);
      setFileName(file.name);
      setFocus({ x: 0.5, y: 0.5 });
    };
    im.onerror = () => {
      URL.revokeObjectURL(url);
      setError(
        isHeic
          ? 'This browser cannot open HEIC photos. Export it as JPG first (on iPhone: Settings, Camera, Formats, Most Compatible).'
          : 'Could not read that image. Try a JPG, PNG or WebP.',
      );
    };
    im.src = url;
  }

  const all = useMemo(() => [...PRESETS, ...customs], [customs]);
  const chosen = useMemo(() => all.filter((p) => selected.includes(p.id)), [all, selected]);

  // Re-render outputs when anything changes (debounced).
  useEffect(() => {
    if (!img || !chosen.length) {
      outsRef.current.forEach((o) => URL.revokeObjectURL(o.url));
      outsRef.current = [];
      setOuts([]);
      return;
    }
    let cancelled = false;
    const t = window.setTimeout(async () => {
      setBusy(true);
      const next: Out[] = [];
      for (const p of chosen) {
        const blob = await render(img, p.w, p.h, mode, focus, bg, fmt, quality);
        if (cancelled) {
          next.forEach((o) => URL.revokeObjectURL(o.url));
          return;
        }
        if (blob) {
          const upscaled =
            mode === 'crop'
              ? Math.max(p.w / img.naturalWidth, p.h / img.naturalHeight) > 1
              : Math.min(p.w / img.naturalWidth, p.h / img.naturalHeight) > 1;
          next.push({ id: p.id, label: p.label, w: p.w, h: p.h, blob, url: URL.createObjectURL(blob), upscaled });
        }
      }
      outsRef.current.forEach((o) => URL.revokeObjectURL(o.url));
      outsRef.current = next;
      setOuts(next);
      setBusy(false);
    }, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [img, chosen, mode, focus, bg, fmt, quality]);

  const base = fileSlug(fileName.replace(/\.[^.]+$/, ''), 'image');
  const nameFor = (o: Out) => `${base}-${o.id}-${o.w}x${o.h}.${EXT[fmt]}`;

  async function downloadAll() {
    for (const o of outs) {
      downloadFile(nameFor(o), o.blob);
      await new Promise((r) => window.setTimeout(r, 350));
    }
  }

  function pickFocus(e: MouseEvent<HTMLButtonElement>) {
    if (e.detail === 0) return; // keyboard activation
    const r = e.currentTarget.getBoundingClientRect();
    setFocus({
      x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
      y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)),
    });
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setOver(false);
    loadFile(e.dataTransfer.files?.[0]);
  }

  function addCustom() {
    const w = Math.round(num(cw, 0));
    const h = Math.round(num(ch, 0));
    if (w < 16 || h < 16 || w > 8000 || h > 8000) return;
    const id = `custom-${w}x${h}`;
    if (!customs.some((c) => c.id === id)) setCustoms((c) => [...c, { id, label: 'Custom', w, h }]);
    setSelected((s) => (s.includes(id) ? s : [...s, id]));
  }

  const summary =
    img && outs.length
      ? `${fileName} (${img.naturalWidth}x${img.naturalHeight}) resized to:\n${outs
          .map((o) => `- ${o.label} ${o.w}x${o.h} ${EXT[fmt].toUpperCase()}, ${formatBytes(o.blob.size)}`)
          .join('\n')}`
      : '';
  useToolResult(summary);

  return (
    <div className="ft-stack">
      <div className="ft-grid">
        <div className="ft-card">
          <p className="ft-label">Your image</p>
          {!img ? (
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
                <strong>Drop an image here</strong> or click to choose
              </span>
              <span className="ft-hint">Your image never leaves your browser.</span>
            </label>
          ) : (
            <>
              <button type="button" className="pr-source" onClick={pickFocus} aria-label="Set the crop focus point">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={srcUrl} alt="Source" className="ft-preview-img" />
                {mode === 'crop' ? <span className="pr-focus" style={{ left: `${focus.x * 100}%`, top: `${focus.y * 100}%` }} /> : null}
              </button>
              <p className="ft-hint" style={{ marginTop: 8 }}>
                {fileName}, {img.naturalWidth} x {img.naturalHeight}.{' '}
                {mode === 'crop' ? 'Click the image to choose what stays in frame.' : ''} Your image never leaves your browser.
              </p>
              <div className="ft-actions">
                <label htmlFor={ids.file} className="tool-btn tool-btn-small" style={{ cursor: 'pointer' }}>
                  Choose another
                </label>
                {mode === 'crop' ? (
                  <button type="button" className="tool-btn tool-btn-small" onClick={() => setFocus({ x: 0.5, y: 0.5 })}>
                    Center focus
                  </button>
                ) : null}
              </div>
            </>
          )}
          <input
            id={ids.file}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              loadFile(e.target.files?.[0]);
              e.target.value = '';
            }}
          />
          {error ? (
            <p className="ft-hint pr-bad" role="alert" style={{ marginTop: 10 }}>
              {error}
            </p>
          ) : null}
        </div>

        <div className="ft-card">
          <p className="ft-label">Output</p>
          <div className="ft-tabs" role="group" aria-label="Fit mode">
            <button type="button" aria-pressed={mode === 'crop'} onClick={() => setMode('crop')}>
              Crop to fill
            </button>
            <button type="button" aria-pressed={mode === 'fit'} onClick={() => setMode('fit')}>
              Fit with padding
            </button>
          </div>
          <div className="ft-row">
            <SelectField
              label="Format"
              value={fmt}
              onChange={setFmt}
              options={[
                { value: 'image/jpeg', label: 'JPEG' },
                { value: 'image/png', label: 'PNG' },
                { value: 'image/webp', label: 'WebP' },
              ]}
            />
            {mode === 'fit' || fmt === 'image/jpeg' ? (
              <div className="ft-field">
                <label htmlFor={ids.bg}>Background</label>
                <div className="pr-color">
                  <input id={ids.bg} type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
                  <span className="mono">{bg.toUpperCase()}</span>
                </div>
              </div>
            ) : null}
          </div>
          {fmt !== 'image/png' ? (
            <div className="ft-field">
              <label htmlFor={ids.q}>Quality: {quality}</label>
              <input id={ids.q} type="range" min={40} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
            </div>
          ) : null}
          <p className="ft-label pr-section-gap">Custom size</p>
          <div className="pr-inline">
            <div className="ft-field">
              <label htmlFor={ids.cw}>Width</label>
              <input id={ids.cw} type="number" inputMode="numeric" value={cw} onChange={(e) => setCw(e.target.value)} />
            </div>
            <div className="ft-field">
              <label htmlFor={ids.ch}>Height</label>
              <input id={ids.ch} type="number" inputMode="numeric" value={ch} onChange={(e) => setCh(e.target.value)} />
            </div>
            <button type="button" className="tool-btn tool-btn-small" onClick={addCustom}>
              Add size
            </button>
          </div>
        </div>
      </div>

      <div className="ft-card">
        <div className="pr-head">
          <p className="ft-label">Sizes ({chosen.length} selected)</p>
          <div className="ft-actions" style={{ marginTop: 0 }}>
            <button type="button" className="tool-btn tool-btn-small" onClick={() => setSelected(all.map((p) => p.id))}>
              Select all
            </button>
            <button type="button" className="tool-btn tool-btn-small" onClick={() => setSelected([])}>
              Clear
            </button>
          </div>
        </div>
        <div className="pr-presets">
          {all.map((p) => (
            <label key={p.id} className="ft-check">
              <input
                type="checkbox"
                checked={selected.includes(p.id)}
                onChange={() => setSelected((s) => (s.includes(p.id) ? s.filter((x) => x !== p.id) : [...s, p.id]))}
              />
              <span>
                {p.label} <small>{p.w}x{p.h}</small>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="ft-card" aria-live="polite">
        <div className="pr-head">
          <p className="ft-label">{busy ? 'Resizing' : `Ready to download (${outs.length})`}</p>
          <button type="button" className="tool-btn tool-btn-primary" onClick={downloadAll} disabled={!outs.length || busy}>
            Download all
          </button>
        </div>
        {!img ? (
          <p className="ft-empty">Add an image to see every size side by side.</p>
        ) : !outs.length && !busy ? (
          <p className="ft-empty">Pick at least one size.</p>
        ) : (
          <div className="pr-outs">
            {outs.map((o) => (
              <div className="pr-out" key={o.id}>
                <div className="pr-out-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.url} alt={`${o.label} preview`} />
                </div>
                <strong>{o.label}</strong>
                <small>
                  {o.w}x{o.h} · {formatBytes(o.blob.size)}
                </small>
                {o.upscaled ? <small className="pr-bad">Source is smaller. May look soft.</small> : null}
                <a className="tool-btn tool-btn-small" href={o.url} download={nameFor(o)} style={{ textAlign: 'center' }}>
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
