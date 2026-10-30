#!/usr/bin/env python3
"""Inject first-hand "From the field" sections into pages flagged by Search Console.

Reads data/recrawl-content.json (built by scripts/_recrawl_content_src.py) and, for each route:
  - adds one <section|div data-recrawl> block (eyebrow, h2, 2 paragraphs, optional X quotes)
    before the FAQ (/pages landing pages) or before the author block (playbooks)
  - appends one FAQ entry to the visible FAQ and to the FAQPage JSON-LD (kept in parity)
  - stamps a real modified date (landing: "Updated October 2026"; playbook JSON-LD dateModified)
Idempotent via the data-recrawl marker; pass --refresh to rebuild blocks, --dry-run to only report.
"""
import html, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = json.load(open(os.path.join(ROOT, "data", "recrawl-content.json"), encoding="utf-8"))
DRY = "--dry-run" in sys.argv
REFRESH = "--refresh" in sys.argv
TODAY = "2026-10-30"

CSS = """
.x-notes { margin: 36px 0 0; padding: 28px 30px; border: 1px solid var(--line); border-left: 3px solid var(--lime); border-radius: 14px; background: var(--paper); max-width: 64ch; }
.x-notes-eyebrow { font-family: var(--font-mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); margin: 0 0 18px; }
.x-note { margin: 0; padding: 0; }
.x-note + .x-note { margin-top: 22px; padding-top: 22px; border-top: 1px solid var(--line); }
.x-note blockquote { margin: 0; padding: 0; border: 0; font-family: var(--font-display); font-style: italic; font-size: clamp(19px, 2vw, 24px); line-height: 1.38; color: var(--ink); }
.x-note figcaption { margin-top: 10px; font-family: var(--font-mono); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }
.x-note figcaption a { color: inherit; text-decoration: underline; text-decoration-color: var(--lime); text-underline-offset: 3px; }
"""

BLOCK_RE = re.compile(r'\n?<(section|div) class="[^"]*" data-recrawl="v1".*?</\1><!--/recrawl-->\n?', re.S)


def quotes_html(ids):
    if not ids:
        return ""
    figs = []
    for i in ids:
        t = DATA["tweets"][i]
        text = html.escape(t["text"], quote=False).replace("\n", "<br>")
        figs.append(
            f'  <figure class="x-note"><blockquote>{text}</blockquote>'
            f'<figcaption><a href="{t["url"]}" target="_blank" rel="noopener">Shilika Jain on X, {t["date"]}</a></figcaption></figure>'
        )
    return '\n<aside class="x-notes" aria-label="Field notes from X">\n  <p class="x-notes-eyebrow">Field notes from my X feed</p>\n' + "\n".join(figs) + "\n</aside>"


def block(kind, c):
    paras = "\n".join(f"<p>{p}</p>" for p in c["paras"])
    q = quotes_html(c["quotes"])
    if kind == "landing":
        return (
            '\n<section class="lp-section" data-recrawl="v1"><div class="lp-sec-inner">\n'
            f'<p class="lp-eyebrow" data-reveal>{html.escape(c["eyebrow"])}</p>\n'
            f'<h2 class="lp-h2" data-reveal>{html.escape(c["h2"])}</h2>\n'
            f'<div class="lp-prose">\n{paras}\n</div>{q}\n</div></section><!--/recrawl-->\n'
        )
    return (
        '\n<div class="recrawl-notes" data-recrawl="v1">\n'
        f'<h2>{html.escape(c["h2"])}</h2>\n{paras}{q}\n</div><!--/recrawl-->\n\n'
    )


def files_for(route):
    slug = route.strip("/")
    page = open(os.path.join(ROOT, "app", "(site)", slug, "page.tsx"), encoding="utf-8").read()
    body = re.search(r"app/_partials/([\w\-]+-body\.html)", page).group(1)
    return os.path.join(ROOT, "app", "_partials", body), os.path.join(ROOT, "app", "_partials", body.replace("-body.html", "-jsonld.json"))


def add_faq_jsonld(path, faq, kind):
    """Edit the JSON-LD as text so the file's existing formatting (and git diff) stay untouched."""
    s = open(path, encoding="utf-8").read()
    json.loads(s)
    m = re.search(r'"@type"\s*:\s*"FAQPage"', s)
    if not m:
        return "no FAQPage node"
    if json.dumps(faq["q"], ensure_ascii=False) not in s:
        k = s.index("[", s.index('"mainEntity"', m.start()))
        depth, j = 0, k
        while True:
            ch = s[j]
            if ch == "[":
                depth += 1
            elif ch == "]":
                depth -= 1
                if depth == 0:
                    break
            elif ch == '"':
                j += 1
                while s[j] != '"':
                    j += 2 if s[j] == "\\" else 1
            j += 1
        entity = json.dumps(
            {"@type": "Question", "name": faq["q"], "acceptedAnswer": {"@type": "Answer", "text": faq["a"]}}, ensure_ascii=False
        )
        prev = s[:j].rstrip()
        s = prev + ",\n" + " " * 6 + entity + "\n" + " " * 4 + s[j:]
    if kind == "playbook":
        s = re.sub(r'("dateModified"\s*:\s*")[0-9-]+(")', r"\g<1>" + TODAY + r"\2", s)
    json.loads(s)
    if not DRY:
        open(path, "w", encoding="utf-8").write(s)
    return "ok"


def process(route, c):
    bpath, jpath = files_for(route)
    s = open(bpath, encoding="utf-8").read()
    kind = "landing" if route.startswith("/pages/") else "playbook"
    if 'data-recrawl="v1"' in s:
        if not REFRESH:
            return "skip (already injected)"
        s = BLOCK_RE.sub("\n", s)
    # --- section
    if kind == "landing":
        m = re.search(r'<p class="lp-eyebrow"[^>]*>FAQ</p>', s)
        if not m:
            return "skip (no FAQ eyebrow)"
        at = s.rfind("<section", 0, m.start())
    else:
        at = s.find('<div class="author-block">')
        if at == -1:
            at = s.find('<div class="faq-block"')
        if at == -1:
            return "skip (no anchor)"
    s = s[:at].rstrip("\n") + "\n" + block(kind, c) + s[at:].lstrip("\n")
    if c["quotes"] and "</style>" in s and ".x-note {" not in s:
        s = s.replace("</style>", CSS + "</style>", 1)
    # --- visible FAQ
    faq = c["faq"]
    qh, ah = html.escape(faq["q"], quote=False), html.escape(faq["a"], quote=False)
    if qh not in s:
        if kind == "landing":
            i = s.rfind("</details>")
            s = s[: i + len("</details>")] + f'\n      <details><summary>{qh}</summary><div class="faq-a">{ah}</div></details>' + s[i + len("</details>"):]
        else:
            f = s.find('<div class="faq-block"')
            last = s.rfind('<div class="faq-a">', f)
            end = s.find("</div>", last) + len("</div>")
            s = s[:end] + f'\n\n   <div class="faq-q">{qh}</div>\n   <div class="faq-a">{ah}</div>' + s[end:]
    if kind == "landing":
        s = re.sub(r"· Updated [A-Z][a-z]+ 20\d\d", "· Updated October 2026", s, count=1)
    r = add_faq_jsonld(jpath, faq, kind)
    if not DRY:
        open(bpath, "w", encoding="utf-8").write(s)
    return f"ok (jsonld: {r})"


if __name__ == "__main__":
    for route, c in sorted(DATA["pages"].items()):
        print(f"{route}: {process(route, c)}")
