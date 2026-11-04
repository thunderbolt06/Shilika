#!/usr/bin/env python3
"""Pull GSC data for the keyword-ownership map (read-only).

Writes, into OUT_DIR (default: argv[1] or ./gsc-ownership-raw):
  query_page.csv  - query x page, last 90 final days
  page.csv        - page totals, same window
  query.csv       - query totals, same window
  meta.json       - date window used

Key path comes from GSC_KEY env var or the default below. Never print it.
"""
import csv, json, os, sys, datetime as dt
from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY = os.environ.get("GSC_KEY", "/Users/thunderbolt/Downloads/rahil-jain-defd2457949c.json")
SITE = "sc-domain:shilikajain.com"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
OUT = sys.argv[1] if len(sys.argv) > 1 else "gsc-ownership-raw"
os.makedirs(OUT, exist_ok=True)

creds = service_account.Credentials.from_service_account_file(KEY, scopes=SCOPES)
svc = build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def q(body):
    return svc.searchanalytics().query(siteUrl=SITE, body=body).execute()


# latest final date
today = dt.date.today()
r = q({"startDate": str(today - dt.timedelta(days=10)), "endDate": str(today),
       "dimensions": ["date"], "dataState": "final", "rowLimit": 50})
dates = sorted(row["keys"][0] for row in r.get("rows", []))
end = dt.date.fromisoformat(dates[-1]) if dates else today - dt.timedelta(days=3)
start = end - dt.timedelta(days=89)
print(f"window {start} .. {end} (final)")


def pull(dims, fname):
    rows, off = [], 0
    while True:
        body = {"startDate": str(start), "endDate": str(end), "dimensions": dims,
                "dataState": "final", "rowLimit": 25000, "startRow": off, "type": "web"}
        res = q(body).get("rows", [])
        rows += res
        if len(res) < 25000:
            break
        off += 25000
    with open(os.path.join(OUT, fname), "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(dims + ["clicks", "impressions", "ctr", "position"])
        for row in rows:
            w.writerow(row["keys"] + [row["clicks"], row["impressions"],
                                      round(row["ctr"], 5), round(row["position"], 2)])
    print(f"{fname}: {len(rows)} rows")


pull(["query", "page"], "query_page.csv")
pull(["page"], "page.csv")
pull(["query"], "query.csv")
json.dump({"start": str(start), "end": str(end), "dataState": "final", "site": SITE},
          open(os.path.join(OUT, "meta.json"), "w"))
