#!/usr/bin/env python3
"""Wire the 100 /pages landing pages into the app.

Creates each route page.tsx (reading the pages__<slug>-body.html /
pages__<slug>-jsonld.json partials the generation workflow wrote) and patches
sitemap.ts. Idempotent via markers. Skips the hand-built web3-pr-agency route.
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOPICS = json.load(open(os.path.join(ROOT, "data", "landing-pages.json")))
MARK = "AUTO-LANDING-PAGES"
HANDBUILT = {"web3-pr-agency"}

def jss(s: str) -> str:
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"

PAGE_TPL = """import fs from 'node:fs';
import path from 'node:path';
import type {{ Metadata }} from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {{
  title: {title},
  description: {desc},
  alternates: {{ canonical: `${{SITE_URL}}/pages/{slug}` }},
  openGraph: {{
    title: {title},
    description: {desc},
    url: `${{SITE_URL}}/pages/{slug}`,
    type: 'website',
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
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__{slug}-body.html'), 'utf8');
}}

function loadJsonLd(): string {{
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__{slug}-jsonld.json'), 'utf8');
}}

export default function Page() {{
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-{slug}-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{{{ __html: jsonLd }}}} />
      <div dangerouslySetInnerHTML={{{{ __html: body }}}} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}}
"""

routes = 0
for t in TOPICS:
    slug = t["slug"]
    if slug in HANDBUILT:
        continue
    rdir = os.path.join(ROOT, "app", "pages", slug)
    os.makedirs(rdir, exist_ok=True)
    with open(os.path.join(rdir, "page.tsx"), "w") as f:
        f.write(PAGE_TPL.format(title=jss(t["title"]), desc=jss(t["deck"]), slug=slug))
    routes += 1
print(f"landing routes written: {routes} (+1 hand-built)")

# sitemap.ts
sm = os.path.join(ROOT, "app", "sitemap.ts")
src = open(sm).read()
if MARK not in src:
    rows = [f"  // {MARK}", "  { path: '/pages', priority: 0.85, changeFrequency: 'weekly' },"]
    for t in TOPICS:
        rows.append(f"  {{ path: '/pages/{t['slug']}', priority: 0.8, changeFrequency: 'monthly' }},")
    block = "\n".join(rows)
    anchor = "  { path: '/japan', priority: 0.85, changeFrequency: 'monthly' },"
    assert anchor in src, "sitemap anchor not found"
    src = src.replace(anchor, anchor + "\n" + block, 1)
    open(sm, "w").write(src)
    print("patched sitemap.ts with /pages entries")
else:
    print("sitemap already has landing pages, skipping")
print("DONE")
