"""Data layer for the keyword-ownership map. Reads saved GSC pulls (data/seo-30d/gsc-l90),
DataForSEO crawl and the 30 Oct URL-inspection CSV. No network, no site edits."""
import csv, json, re, collections, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = 'https://www.shilikajain.com'
GSC = os.path.join(ROOT, 'data/seo-30d/gsc-l90')
CRAWL = os.environ.get('CRAWL_JSON', '/Users/thunderbolt/Documents/projects/Shilika/.claude/worktrees/dataforseo-seo-audit-4dba96/data/dataforseo-audit/2026-11-03/crawl_pages.json')
INSPECT = os.path.join(ROOT, 'data/gsc-audit/2026-10-30/url-inspection.csv')
LOCALE = re.compile(r'^/(es|ko|ja|ru|zh|vi|fr|de|pt|id|tr|ar|hi|it)(/|$)')

def rel(u): return u.replace(B, '') or '/'

# scraper / operator / prompt-style queries: excluded from every family
JUNK = re.compile(r'"|@gmail|open to work|^context:|\?.{60,}|tencent|capybobo|\.(com|net)\b', re.I)

crawl = {rel(p['url']): p for p in json.load(open(CRAWL))}
page = {rel(r['page']): r for r in csv.DictReader(open(os.path.join(GSC, 'page.csv')))}
qp = [dict(r, page=rel(r['page'])) for r in csv.DictReader(open(os.path.join(GSC, 'query_page.csv')))]
inspect = {rel(r['url']): r for r in csv.DictReader(open(INSPECT))}
meta = json.load(open(os.path.join(GSC, 'meta.json')))

def pstat(u):
    p = page.get(u, {}); c = crawl.get(u)
    return dict(url=u, impressions=int(p.get('impressions', 0)), clicks=int(p.get('clicks', 0)),
                position=float(p['position']) if p.get('position') else None,
                inlinks=c['meta']['inbound_links_count'] if c else None,
                near_duplicate=bool(c.get('duplicate_content')) if c else None,
                title=(c['meta'].get('title') or '') if c else '',
                h1=((c['meta'].get('htags') or {}).get('h1') or [''])[0] if c else '',
                status=c.get('status_code') if c else None,
                coverage=inspect.get(u, {}).get('coverage', 'not inspected'))

def family_rows(qrx):
    rx = re.compile(qrx, re.I)
    return [r for r in qp if rx.search(r['query']) and not JUNK.search(r['query'])]

def fam_by_url(rows):
    agg = collections.defaultdict(lambda: dict(impr=0, clicks=0, wpos=0.0, queries=[]))
    for r in rows:
        a = agg[r['page']]; i = int(r['impressions'])
        a['impr'] += i; a['clicks'] += int(r['clicks']); a['wpos'] += i * float(r['position'])
        a['queries'].append((r['query'], i, float(r['position'])))
    for a in agg.values():
        a['pos'] = round(a['wpos'] / a['impr'], 1) if a['impr'] else None
        a['queries'].sort(key=lambda x: -x[1])
    return agg

def top_queries(u, n=4, clean=True):
    rs = [r for r in qp if r['page'] == u and not (clean and JUNK.search(r['query']))]
    rs.sort(key=lambda r: -int(r['impressions']))
    return [(r['query'], int(r['impressions']), float(r['position'])) for r in rs[:n]]

def indexed(u): return inspect.get(u, {}).get('coverage') == 'Submitted and indexed'
