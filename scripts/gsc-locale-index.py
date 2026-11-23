#!/usr/bin/env python3
"""Locale page index status + 90-day impressions (read-only GSC).

Reads locale URLs from the 3 Nov DataForSEO crawl, runs URL Inspection on each
and pulls 90-day page metrics. Writes data/seo-30d/locale-index.csv.
Key path comes from GSC_KEY or the default below. Never print it.
"""
import csv, json, os, re, socket, sys, time, datetime as dt

# IPv6 to googleapis times out on this machine; force IPv4.
_gai = socket.getaddrinfo
socket.getaddrinfo = lambda h, p, f=0, *a, **k: _gai(h, p, socket.AF_INET, *a, **k)
socket.setdefaulttimeout(30)  # a stalled call must fail, not hang the run

from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY = os.environ.get("GSC_KEY", "/Users/thunderbolt/Downloads/rahil-jain-defd2457949c.json")
SITE = "sc-domain:shilikajain.com"
CRAWL = "data/dataforseo-audit/2026-11-03/crawl_pages.json"
OUT = sys.argv[1] if len(sys.argv) > 1 else "data/seo-30d/locale-index.csv"
LOCALE = re.compile(r"\.com/(ja|zh|ko|es|ru)(/|$)")

creds = service_account.Credentials.from_service_account_file(
    KEY, scopes=["https://www.googleapis.com/auth/webmasters.readonly"])
svc = build("searchconsole", "v1", credentials=creds, cache_discovery=False)

pages = {}
for it in json.load(open(CRAWL)):
    m = LOCALE.search(it["url"])
    if m:
        c = it["meta"].get("content") or {}
        pages[it["url"]] = {"locale": m.group(1), "words": c.get("plain_text_word_count") or 0,
                            "chars": c.get("plain_text_size") or 0,
                            "inlinks": it["meta"].get("inbound_links_count") or 0}

end = dt.date.today() - dt.timedelta(days=3)
start = end - dt.timedelta(days=89)
perf, row0 = {}, 0
while True:
    r = svc.searchanalytics().query(siteUrl=SITE, body={
        "startDate": str(start), "endDate": str(end), "dimensions": ["page"],
        "rowLimit": 25000, "startRow": row0}).execute()
    rows = r.get("rows", [])
    for x in rows:
        perf[x["keys"][0].rstrip("/")] = x
    if len(rows) < 25000:
        break
    row0 += 25000

def inspect_url(url):
    # One inspection takes about 7 s, so run 6 at a time. httplib2 is not thread-safe: one client per call.
    client = build("searchconsole", "v1", credentials=creds, cache_discovery=False)
    err = ""
    for attempt in range(3):
        try:
            res = client.urlInspection().index().inspect(
                body={"inspectionUrl": url, "siteUrl": SITE}).execute()
            s = res["inspectionResult"]["indexStatusResult"]
            return s.get("verdict", ""), s.get("coverageState", ""), s.get("lastCrawlTime", "")[:10]
        except Exception as e:
            err = type(e).__name__
            time.sleep(2)
    return "ERROR", err, ""

from concurrent.futures import ThreadPoolExecutor
urls = sorted(pages)
with ThreadPoolExecutor(6) as ex:
    status = dict(zip(urls, ex.map(inspect_url, urls)))

out = []
for url in urls:
    p = pages[url]
    verdict, cov, crawled = status[url]
    x = perf.get(url.rstrip("/"), {})
    out.append([url, p["locale"], p["words"], p["chars"], p["inlinks"], verdict, cov, crawled,
                int(x.get("impressions", 0)), int(x.get("clicks", 0)),
                round(x.get("position", 0), 1) if x else ""])

with open(OUT, "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["url", "locale", "words", "chars", "inlinks", "verdict", "coverage", "last_crawl",
                "impressions_90d", "clicks_90d", "position", f"window={start}..{end}"])
    w.writerows(out)
print(f"wrote {OUT}: {len(out)} urls, window {start}..{end}")
