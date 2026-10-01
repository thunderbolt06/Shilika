'use client';

import QRCode from 'qrcode';
import { useEffect, useId, useState, type InputHTMLAttributes } from 'react';
import { CopyButton, downloadFile, useToolResult, Verdict } from '../kit';
import './everyday.css';

type Kind = 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'vcard';
type Ecl = 'L' | 'M' | 'Q' | 'H';

const KINDS: { id: Kind; label: string }[] = [
  { id: 'url', label: 'URL' },
  { id: 'text', label: 'Text' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'sms', label: 'SMS' },
  { id: 'wifi', label: 'WiFi' },
  { id: 'vcard', label: 'vCard' },
];

const ECL: { id: Ecl; label: string }[] = [
  { id: 'L', label: 'L 7%' },
  { id: 'M', label: 'M 15%' },
  { id: 'Q', label: 'Q 25%' },
  { id: 'H', label: 'H 30%' },
];

type Fields = Record<string, string>;

const DEFAULTS: Fields = {
  url: 'https://example.com/launch',
  text: 'Thanks for stopping by our booth. Say hi on LinkedIn.',
  emailTo: 'hello@example.com',
  emailSubject: 'Media kit request',
  emailBody: '',
  phone: '+1 555 010 2026',
  smsTo: '+1 555 010 2026',
  smsBody: 'Send me the deck',
  ssid: 'Office-Guest',
  wifiPass: '',
  wifiSec: 'WPA',
  vName: 'Alex Rivera',
  vPhone: '+1 555 010 2026',
  vEmail: 'alex@example.com',
  vCompany: 'Example Labs',
  vTitle: 'Founder',
  vUrl: 'https://example.com',
};

function wifiEscape(s: string) {
  return s.replace(/([\\;,:"])/g, '\\$1');
}

function vEscape(s: string) {
  return s.replace(/([\\;,])/g, '\\$1').replace(/\n/g, '\\n');
}

function encode(kind: Kind, f: Fields): string {
  switch (kind) {
    case 'url': {
      const u = f.url.trim();
      if (!u) return '';
      return /^[a-z][a-z0-9+.-]*:/i.test(u) ? u : `https://${u}`;
    }
    case 'text':
      return f.text;
    case 'email': {
      if (!f.emailTo.trim()) return '';
      const q = new URLSearchParams();
      if (f.emailSubject.trim()) q.set('subject', f.emailSubject.trim());
      if (f.emailBody.trim()) q.set('body', f.emailBody.trim());
      const qs = q.toString().replace(/\+/g, '%20');
      return `mailto:${f.emailTo.trim()}${qs ? `?${qs}` : ''}`;
    }
    case 'phone': {
      const p = f.phone.replace(/[^\d+]/g, '');
      return p ? `tel:${p}` : '';
    }
    case 'sms': {
      const p = f.smsTo.replace(/[^\d+]/g, '');
      return p ? `SMSTO:${p}:${f.smsBody}` : '';
    }
    case 'wifi': {
      if (!f.ssid.trim()) return '';
      const sec = f.wifiSec === 'nopass' ? 'nopass' : f.wifiSec;
      return `WIFI:T:${sec};S:${wifiEscape(f.ssid)};${sec === 'nopass' ? '' : `P:${wifiEscape(f.wifiPass)};`};`;
    }
    case 'vcard': {
      if (!f.vName.trim()) return '';
      const parts = f.vName.trim().split(/\s+/);
      const last = parts.length > 1 ? parts.pop()! : '';
      const first = parts.join(' ');
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${vEscape(last)};${vEscape(first)};;;`,
        `FN:${vEscape(f.vName.trim())}`,
        f.vCompany.trim() ? `ORG:${vEscape(f.vCompany.trim())}` : '',
        f.vTitle.trim() ? `TITLE:${vEscape(f.vTitle.trim())}` : '',
        f.vPhone.trim() ? `TEL;TYPE=CELL:${f.vPhone.trim()}` : '',
        f.vEmail.trim() ? `EMAIL:${f.vEmail.trim()}` : '',
        f.vUrl.trim() ? `URL:${f.vUrl.trim()}` : '',
        'END:VCARD',
      ]
        .filter(Boolean)
        .join('\n');
    }
  }
}

function luminance(hex: string) {
  const m = hex.replace('#', '').match(/.{2}/g);
  if (!m || m.length < 3) return 0;
  const [r, g, b] = m.slice(0, 3).map((x) => {
    const c = parseInt(x, 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export default function QrCodeGenerator() {
  const id = useId();
  const [kind, setKind] = useState<Kind>('url');
  const [f, setF] = useState<Fields>(DEFAULTS);
  const [fg, setFg] = useState('#111111');
  const [bg, setBg] = useState('#ffffff');
  const [size, setSize] = useState(1024);
  const [margin, setMargin] = useState(4);
  const [ecl, setEcl] = useState<Ecl>('M');
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const data = new URLSearchParams(window.location.search).get('data');
      if (data) {
        setKind('url');
        setF((prev) => ({ ...prev, url: data }));
      }
    } catch {
      /* ignore */
    }
  }, []);

  const content = encode(kind, f);
  const opts = { errorCorrectionLevel: ecl, margin, color: { dark: fg, light: bg } };

  useEffect(() => {
    let live = true;
    if (!content) {
      setPreview('');
      setError('');
      return;
    }
    QRCode.toDataURL(content, { errorCorrectionLevel: ecl, margin, color: { dark: fg, light: bg }, width: 480 })
      .then((url) => {
        if (!live) return;
        setPreview(url);
        setError('');
      })
      .catch(() => {
        if (!live) return;
        setPreview('');
        setError('Too much data for one QR code. Shorten the content or lower error correction.');
      });
    return () => {
      live = false;
    };
  }, [content, ecl, margin, fg, bg]);

  const lf = luminance(fg);
  const lb = luminance(bg);
  const contrast = (Math.max(lf, lb) + 0.05) / (Math.min(lf, lb) + 0.05);
  const inverted = lf > lb;

  const result = content
    ? [
        `QR code content (${KINDS.find((k) => k.id === kind)!.label}):`,
        content,
        '',
        `Colours: ${fg} on ${bg} (contrast ${contrast.toFixed(1)}:1)`,
        `Size: ${size}px, margin: ${margin} modules, error correction: ${ecl}`,
        'Static QR code. It never expires.',
      ].join('\n')
    : '';
  useToolResult(result);

  function set(key: string, value: string) {
    setF((prev) => ({ ...prev, [key]: value }));
  }

  async function downloadPng() {
    if (!content) return;
    try {
      const url = await QRCode.toDataURL(content, { ...opts, width: size });
      const blob = await (await fetch(url)).blob();
      downloadFile(`qr-code-${size}.png`, blob);
    } catch {
      setError('Could not create the PNG. Try a smaller size.');
    }
  }

  async function downloadSvg() {
    if (!content) return;
    try {
      const svg = await QRCode.toString(content, { ...opts, type: 'svg', width: size });
      downloadFile('qr-code.svg', svg, 'image/svg+xml;charset=utf-8');
    } catch {
      setError('Could not create the SVG.');
    }
  }

  function field(key: string, label: string, props: InputHTMLAttributes<HTMLInputElement> = {}) {
    return (
      <div className="ft-field">
        <label htmlFor={`${id}-${key}`}>{label}</label>
        <input id={`${id}-${key}`} value={f[key]} onChange={(e) => set(key, e.target.value)} autoComplete="off" {...props} />
      </div>
    );
  }

  return (
    <div className="ft-grid">
      <div className="ft-card">
        <div className="ft-tabs" role="group" aria-label="QR code type">
          {KINDS.map((k) => (
            <button key={k.id} type="button" aria-pressed={kind === k.id} onClick={() => setKind(k.id)}>
              {k.label}
            </button>
          ))}
        </div>

        {kind === 'url' && field('url', 'Website URL', { type: 'url', inputMode: 'url', spellCheck: false })}
        {kind === 'text' && (
          <div className="ft-field">
            <label htmlFor={`${id}-text`}>Text</label>
            <textarea id={`${id}-text`} value={f.text} onChange={(e) => set('text', e.target.value)} rows={4} />
          </div>
        )}
        {kind === 'email' && (
          <>
            {field('emailTo', 'Email address', { type: 'email', inputMode: 'email' })}
            {field('emailSubject', 'Subject')}
            <div className="ft-field">
              <label htmlFor={`${id}-emailBody`}>Message (optional)</label>
              <textarea id={`${id}-emailBody`} value={f.emailBody} onChange={(e) => set('emailBody', e.target.value)} rows={3} />
            </div>
          </>
        )}
        {kind === 'phone' && field('phone', 'Phone number', { type: 'tel', inputMode: 'tel' })}
        {kind === 'sms' && (
          <>
            {field('smsTo', 'Phone number', { type: 'tel', inputMode: 'tel' })}
            <div className="ft-field">
              <label htmlFor={`${id}-smsBody`}>Message</label>
              <textarea id={`${id}-smsBody`} value={f.smsBody} onChange={(e) => set('smsBody', e.target.value)} rows={3} />
            </div>
          </>
        )}
        {kind === 'wifi' && (
          <>
            {field('ssid', 'Network name (SSID)')}
            <div className="ft-field">
              <label htmlFor={`${id}-wifiSec`}>Security</label>
              <select id={`${id}-wifiSec`} value={f.wifiSec} onChange={(e) => set('wifiSec', e.target.value)}>
                <option value="WPA">WPA / WPA2 / WPA3</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None</option>
              </select>
            </div>
            {f.wifiSec !== 'nopass' && field('wifiPass', 'Password', { type: 'text', spellCheck: false })}
          </>
        )}
        {kind === 'vcard' && (
          <>
            {field('vName', 'Full name')}
            <div className="ft-row">
              {field('vPhone', 'Phone', { type: 'tel', inputMode: 'tel' })}
              {field('vEmail', 'Email', { type: 'email', inputMode: 'email' })}
            </div>
            <div className="ft-row">
              {field('vCompany', 'Company')}
              {field('vTitle', 'Job title')}
            </div>
            {field('vUrl', 'Website', { type: 'url', inputMode: 'url' })}
          </>
        )}

        <p className="ft-label ev-mt">Style</p>
        <div className="ft-row">
          <div className="ft-field">
            <label htmlFor={`${id}-fg`}>Foreground</label>
            <div className="ev-color">
              <input id={`${id}-fg`} type="color" value={fg} onChange={(e) => setFg(e.target.value)} />
              <span className="mono">{fg}</span>
            </div>
          </div>
          <div className="ft-field">
            <label htmlFor={`${id}-bg`}>Background</label>
            <div className="ev-color">
              <input id={`${id}-bg`} type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
              <span className="mono">{bg}</span>
            </div>
          </div>
        </div>
        <div className="ft-field">
          <label htmlFor={`${id}-size`}>Download size: {size}px</label>
          <input id={`${id}-size`} type="range" min={256} max={2048} step={64} value={size} onChange={(e) => setSize(Number(e.target.value))} />
        </div>
        <div className="ft-field">
          <label htmlFor={`${id}-margin`}>Quiet zone: {margin} modules</label>
          <input id={`${id}-margin`} type="range" min={0} max={10} step={1} value={margin} onChange={(e) => setMargin(Number(e.target.value))} />
        </div>
        <div className="ft-field">
          <span id={`${id}-ecl`}>Error correction</span>
          <div className="ft-tabs" role="group" aria-labelledby={`${id}-ecl`}>
            {ECL.map((e) => (
              <button key={e.id} type="button" aria-pressed={ecl === e.id} onClick={() => setEcl(e.id)}>
                {e.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="ft-card" aria-live="polite">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="ft-preview-img ev-qr" src={preview} alt="QR code preview" width={480} height={480} />
        ) : (
          <p className="ft-empty">{error || 'Fill in the details to see your QR code.'}</p>
        )}
        <div className="ft-actions">
          <button type="button" className="tool-btn tool-btn-primary" onClick={downloadPng} disabled={!preview}>
            Download PNG
          </button>
          <button type="button" className="tool-btn tool-btn-small" onClick={downloadSvg} disabled={!preview}>
            Download SVG
          </button>
          <CopyButton text={content} label="Copy content" />
        </div>
        {preview && (contrast < 4 || inverted || margin < 2) ? (
          <ul className="ft-checks ev-mt">
            {contrast < 4 ? (
              <li>
                <Verdict level="bad">Contrast</Verdict>
                <span>Contrast is {contrast.toFixed(1)}:1. Some phones will not scan it.</span>
                <p>Aim for at least 4:1. Dark on light works best.</p>
              </li>
            ) : null}
            {inverted ? (
              <li>
                <Verdict level="warn">Inverted</Verdict>
                <span>The foreground is lighter than the background.</span>
                <p>Many older scanner apps cannot read light-on-dark codes.</p>
              </li>
            ) : null}
            {margin < 2 ? (
              <li>
                <Verdict level="warn">Margin</Verdict>
                <span>A small quiet zone can make scanning harder.</span>
                <p>Keep 4 modules unless the design already has white space around it.</p>
              </li>
            ) : null}
          </ul>
        ) : null}
        <p className="ft-hint ev-mt">Static code: the content lives in the image, so it never expires. Test it with your phone before you print.</p>
      </div>
    </div>
  );
}
