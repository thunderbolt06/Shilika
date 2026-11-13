#!/usr/bin/env python3
"""Weekly GSC pull for the 30-day SEO run (read-only).

Compares the last 7 final days with the 7 days before them.
Writes OUT_CSV (default: argv[1] or ./gsc-weekly.csv) with rows:
  kind=metric  site totals, non-homepage clicks, mobile CTR
  kind=pair    position of each fixed query+page pair from
               docs/gsc-audit-2026-10-30.md (striking distance table)

Key path comes from GSC_KEY env var or the default below. Never print it.
"""
import csv, os, socket, sys, datetime as dt

# IPv6 to googleapis times out on this machine; force IPv4.
_gai = socket.getaddrinfo
socket.getaddrinfo = lambda h, p, f=0, *a, **k: _gai(h, p, socket.AF_INET, *a, **k)

from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY = os.environ.get("GSC_KEY", "/Users/thunderbolt/Downloads/rahil-jain-defd2457949c.json")
SITE = "sc-domain:shilikajain.com"
HOME = "https://www.shilikajain.com/"
BASE = "https://www.shilikajain.com"
OUT = sys.argv[1] if len(sys.argv) > 1 else "gsc-weekly.csv"

# Fixed pairs: the 17 striking-distance pairs in the 30 Oct baseline (L28 position).
PAIRS = [
    ("cointelegraph submit press release", "/playbook/how-to-pitch-cointelegraph-2026", 7.2),
    ("defi pr agency", "/playbook/best-defi-pr-agency-2026", 9.1),
    ("defi pr", "/playbook/best-defi-pr-agency-2026", 6.7),
    ("defi pr agencies", "/playbook/best-defi-pr-agency-2026", 5.9),
    ("fluence network", "/work/fluence", 8.9),
    ("rari chain competitors nft infrastructure", "/work/rari-chain", 5.2),
    ("web3 kol marketing", "/services/kol-marketing", 18.6),
    ("schema markup generator", "/tools/schema-markup-generator", 12.2),
    ("enterprise ai pr", "/playbook/enterprise-ai-pr-2026", 9.6),
    ("how do b2b tech companies get featured in trade media?", "/blog/b2b-saas-trade-press-guide", 6.7),
    ("fractional pr vs pr agency cost", "/playbook/fractional-vs-agency", 4.9),
    ("web3 fractional cmo", "/playbook/fractional-cmo-web3-2026", 5.4),
    ("saas pr agencies", "/playbook/best-b2b-saas-pr-agencies-2026", 16.2),
    ("what are the top analyst relations agencies for saas in 2026", "/playbook/best-b2b-saas-pr-agencies-2026", 4.7),
    ("how do security ai startups pitch?", "/blog/ai-security-startup-pr-dual-track-pitch", 4.3),
    ("hire token launch marketing agency", "/playbook/best-token-launch-marketing-agencies-2026", 9.7),
    ("pr agency for ai startups", "/playbook/ai-startup-pr-agency-india-2026", 10.7),
]

creds = service_account.Credentials.from_service_account_file(
    KEY, scopes=["https://www.googleapis.com/auth/webmasters.readonly"])
svc = build("searchconsole", "v1", credentials=creds, cache_discovery=False)


def q(body):
    return svc.searchanalytics().query(siteUrl=SITE, body=body).execute().get("rows", [])


today = dt.date.today()
dates = sorted(r["keys"][0] for r in q({
    "startDate": str(today - dt.timedelta(days=10)), "endDate": str(today),
    "dimensions": ["date"], "dataState": "final", "rowLimit": 50}))
end = dt.date.fromisoformat(dates[-1]) if dates else today - dt.timedelta(days=3)
W = {"last7": (end - dt.timedelta(days=6), end),
     "prior7": (end - dt.timedelta(days=13), end - dt.timedelta(days=7))}
print(f"last7 {W['last7'][0]}..{W['last7'][1]}  prior7 {W['prior7'][0]}..{W['prior7'][1]} (final)")


def pull(win, dims):
    s, e = W[win]
    rows, off = [], 0
    while True:
        res = q({"startDate": str(s), "endDate": str(e), "dimensions": dims, "type": "web",
                 "dataState": "final", "rowLimit": 25000, "startRow": off})
        rows += res
        if len(res) < 25000:
            return rows
        off += 25000


m = {}
for win in W:
    tot = pull(win, [])
    t = tot[0] if tot else {"clicks": 0, "impressions": 0, "position": 0}
    pages = pull(win, ["page"])
    dev = {r["keys"][0]: r for r in pull(win, ["device"])}
    mob = dev.get("MOBILE", {"clicks": 0, "impressions": 0})
    qp = {(r["keys"][0], r["keys"][1]): r for r in pull(win, ["query", "page"])}
    m[win] = {
        "clicks": t["clicks"], "impressions": t["impressions"],
        "avg_position": round(t.get("position", 0), 2),
        "non_home_clicks": sum(r["clicks"] for r in pages if r["keys"][0] != HOME),
        "mobile_clicks": mob["clicks"], "mobile_impressions": mob["impressions"],
        "mobile_ctr_pct": round(100 * mob["clicks"] / mob["impressions"], 2) if mob["impressions"] else 0,
        "qp": qp,
    }

with open(OUT, "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["kind", "name", "page", "baseline_oct30", "prior7", "last7", "delta",
                "prior7_impr", "last7_impr", "window_last7", "window_prior7"])
    wl = f"{W['last7'][0]}..{W['last7'][1]}"
    wp = f"{W['prior7'][0]}..{W['prior7'][1]}"
    for k in ["clicks", "impressions", "non_home_clicks", "mobile_clicks",
              "mobile_impressions", "mobile_ctr_pct", "avg_position"]:
        a, b = m["prior7"][k], m["last7"][k]
        w.writerow(["metric", k, "", "", a, b, round(b - a, 2), "", "", wl, wp])
    for query, path, base in PAIRS:
        vals = []
        for win in ["prior7", "last7"]:
            r = m[win]["qp"].get((query, BASE + path))
            vals.append((round(r["position"], 1), r["impressions"]) if r else ("", 0))
        (pp, pi), (lp, li) = vals
        d = round(lp - pp, 1) if pp != "" and lp != "" else ""
        w.writerow(["pair", query, path, base, pp, lp, d, pi, li, wl, wp])
print(f"wrote {OUT}")
