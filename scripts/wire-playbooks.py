#!/usr/bin/env python3
"""Wire playbooks 015-114 into the app.

Deterministic, runs after the generation workflow has written the
article-N-body.html / article-N-jsonld.json partials. Creates each route
page.tsx + JS asset and patches the four shared files. Idempotent via markers.
"""
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOPICS = json.load(open(os.path.join(ROOT, "data", "playbook-topics.json")))
MARK = "AUTO-PLAYBOOKS-15-114"

def jss(s: str) -> str:
    """Safe single-quoted JS/TS string literal."""
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"

# ---------- 1. per-route page.tsx + JS asset ----------
PAGE_TPL = """import fs from 'node:fs';
import path from 'node:path';
import type {{ Metadata }} from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {{
  title: {title},
  description: {desc},
  alternates: {{ canonical: `${{SITE_URL}}/playbook/{slug}` }},
  openGraph: {{
    title: {title},
    description: {desc},
    url: `${{SITE_URL}}/playbook/{slug}`,
    type: 'article',
    images: [{{ url: `${{SITE_URL}}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }}],
  }},
  twitter: {{
    card: 'summary_large_image',
    title: {title},
    description: {desc},
    images: [`${{SITE_URL}}/assets/shilika-press-landscape-1200x628.jpg`],
  }},
}};

function loadBody(): string {{
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-{n}-body.html'), 'utf8');
}}

function loadJsonLd(): string {{
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-{n}-jsonld.json'), 'utf8');
}}

export default function Page() {{
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-{n}-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{{{ __html: jsonLd }}}} />
      <div dangerouslySetInnerHTML={{{{ __html: body }}}} />

      <Script src="/assets/article-{n}.js" strategy="afterInteractive" />
    </>
  );
}}
"""

JS_TPL = """/* Scroll progress bar for the {slug} playbook */
const bar = document.getElementById('progress-bar');
if (bar) {{
  window.addEventListener('scroll', () => {{
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + '%';
  }}, {{ passive: true }});
}}
"""

routes = 0
for t in TOPICS:
    n, slug = t["n"], t["slug"]
    rdir = os.path.join(ROOT, "app", "playbook", slug)
    os.makedirs(rdir, exist_ok=True)
    with open(os.path.join(rdir, "page.tsx"), "w") as f:
        f.write(PAGE_TPL.format(title=jss(t["title"]), desc=jss(t["deck"]), slug=slug, n=n))
    with open(os.path.join(ROOT, "public", "assets", f"article-{n}.js"), "w") as f:
        f.write(JS_TPL.format(slug=slug))
    routes += 1
print(f"routes+assets written: {routes}")

# ---------- 2. PLAYBOOKS array in app/playbook/page.tsx ----------
pb_page = os.path.join(ROOT, "app", "playbook", "page.tsx")
src = open(pb_page).read()
if MARK not in src:
    entries = [f"  // {MARK} — generated from data/playbook-topics.json"]
    for t in TOPICS:
        entries.append("  {")
        entries.append(f"    n: {t['n']},")
        entries.append(f"    slug: {jss(t['slug'])},")
        entries.append(f"    title: {jss(t['title'])},")
        entries.append(f"    description: {jss(t['deck'])},")
        entries.append(f"    tag: {jss(t['tag'])},")
        entries.append(f"    time: {t['time']},")
        entries.append("  },")
    block = "\n".join(entries) + "\n"
    anchor = "\n];\n\nfunction loadJsonLd(): string {"
    assert anchor in src, "PLAYBOOKS array anchor not found"
    src = src.replace(anchor, "\n" + block + "];\n\nfunction loadJsonLd(): string {", 1)
    # count copy
    src = src.replace("Playbook · 14 field guides", "Playbook · 114 field guides")
    src = src.replace("Fourteen long-form playbooks", "114 long-form playbooks")
    src = src.replace("Twelve long-form playbooks", "114 long-form playbooks")
    open(pb_page, "w").write(src)
    print("patched PLAYBOOKS array + counts")
else:
    print("PLAYBOOKS already patched, skipping")

# ---------- 3. sitemap.ts ----------
sm = os.path.join(ROOT, "app", "sitemap.ts")
src = open(sm).read()
if MARK not in src:
    rows = [f"  // {MARK}"]
    for t in TOPICS:
        rows.append(f"  {{ path: '/playbook/{t['slug']}', priority: 0.7, changeFrequency: 'monthly' }},")
    block = "\n".join(rows)
    anchor = "  { path: '/playbook/cybersecurity-pr-2026', priority: 0.85, changeFrequency: 'monthly' },"
    assert anchor in src, "sitemap anchor not found"
    src = src.replace(anchor, anchor + "\n" + block, 1)
    open(sm, "w").write(src)
    print("patched sitemap.ts")
else:
    print("sitemap already patched, skipping")

# ---------- 4. playbook-jsonld.json collection ----------
jl = os.path.join(ROOT, "app", "_partials", "playbook-jsonld.json")
data = json.load(open(jl))
SITE = "https://www.shilikajain.com"
for node in data["@graph"]:
    if node.get("@type") == "CollectionPage":
        il = node["mainEntity"]
        existing = {x["url"] for x in il["itemListElement"]}
        pos = len(il["itemListElement"])
        for t in TOPICS:
            url = f"{SITE}/playbook/{t['slug']}"
            if url in existing:
                continue
            pos += 1
            il["itemListElement"].append({
                "@type": "ListItem", "position": pos, "url": url, "name": t["title"],
            })
        il["numberOfItems"] = len(il["itemListElement"])
        node["description"] = node["description"].replace("Fourteen long-form playbooks", "114 long-form playbooks")
json.dump(data, open(jl, "w"), indent=2, ensure_ascii=False)
print(f"patched playbook-jsonld.json -> numberOfItems now {data['@graph'][0]['mainEntity']['numberOfItems']}")
print("DONE")
