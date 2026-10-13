#!/usr/bin/env python3
"""Inject "Field notes from X" pull-quotes into playbook partials.

Reads data/x-notes-quotes.json (playbook path -> list of Shilika's own X posts)
and adds one <aside class="x-notes"> block before the last content <h2> of each
mapped playbook body partial. Idempotent via the 'x-notes' marker; pass
--refresh to replace existing blocks. Pass --dry-run to only report.
"""
import html, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUOTES = json.load(open(os.path.join(ROOT, "data", "x-notes-quotes.json"), encoding="utf-8"))
DRY = "--dry-run" in sys.argv
REFRESH = "--refresh" in sys.argv

CSS = """
.x-notes { margin: 44px 0; padding: 28px 30px; border: 1px solid var(--line); border-left: 3px solid var(--lime); border-radius: 14px; background: var(--paper); }
.x-notes-eyebrow { font-family: var(--font-mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); margin: 0 0 18px; }
.x-note { margin: 0; padding: 0; }
.x-note + .x-note { margin-top: 22px; padding-top: 22px; border-top: 1px solid var(--line); }
.x-note blockquote { margin: 0; padding: 0; border: 0; font-family: var(--font-display); font-style: italic; font-size: clamp(19px, 2vw, 24px); line-height: 1.38; color: var(--ink); }
.x-note figcaption { margin-top: 10px; font-family: var(--font-mono); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }
.x-note figcaption a { color: inherit; text-decoration: underline; text-decoration-color: var(--lime); text-underline-offset: 3px; }
"""

BLOCK_RE = re.compile(r'\n?<aside class="x-notes".*?</aside>\n?', re.S)


def partial_for(route: str) -> str:
    page = open(os.path.join(ROOT, "app", route.strip("/"), "page.tsx"), encoding="utf-8").read()
    m = re.search(r"app/_partials/(article-\d+-body\.html)", page)
    if not m:
        raise SystemExit(f"no body partial referenced by {route}")
    return os.path.join(ROOT, "app", "_partials", m.group(1))


def block(notes) -> str:
    figs = []
    for n in notes:
        text = html.escape(n["text"], quote=False).replace("\n", "<br>")
        figs.append(
            f'  <figure class="x-note"><blockquote>{text}</blockquote>'
            f'<figcaption><a href="{n["url"]}" target="_blank" rel="noopener">Shilika Jain on X, {n["date"]}</a></figcaption></figure>'
        )
    return '<aside class="x-notes" aria-label="Field notes from X">\n  <p class="x-notes-eyebrow">Field notes from my X feed</p>\n' + "\n".join(figs) + "\n</aside>\n\n"


def inject(path: str, notes) -> str:
    s = open(path, encoding="utf-8").read()
    if "x-notes" in s:
        if not REFRESH:
            return "skip (already has x-notes)"
        s = BLOCK_RE.sub("\n", s)
    else:
        if "</style>" not in s:
            return "skip (no <style> block)"
        s = s.replace("</style>", CSS + "</style>", 1)
    # last content <h2>: the final plain <h2> before the FAQ block (or CTA strip)
    end = len(s)
    for stop in ('<div class="faq-block"', '<section class="cta-strip"'):
        i = s.find(stop)
        if i != -1:
            end = min(end, i)
    heads = [m.start() for m in re.finditer(r"<h2>", s[:end])]
    if len(heads) < 2:
        return "skip (fewer than two content h2s)"
    at = heads[-1]
    s = s[:at] + block(notes) + s[at:]
    if not DRY:
        open(path, "w", encoding="utf-8").write(s)
    return f"ok ({len(notes)} notes)"


if __name__ == "__main__":
    for route, notes in sorted(QUOTES.items()):
        p = partial_for(route)
        print(f"{route} -> {os.path.basename(p)}: {inject(p, notes)}")
