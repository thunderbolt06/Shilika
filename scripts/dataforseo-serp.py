"""Live Google SERP check for buyer keywords (DataForSEO, depth 30 = $0.006 each).
Google wraps result URLs in google.com/goto links, so the domain is read from the breadcrumb.
Usage: DFS_LOGIN=.. DFS_PASSWORD=.. python3 -I scripts/dataforseo-serp.py <outdir>"""
import base64, json, os, sys, subprocess, re
OUT = sys.argv[1]
AUTH = base64.b64encode(f"{os.environ['DFS_LOGIN']}:{os.environ['DFS_PASSWORD']}".encode()).decode()
US = 2840
KW = [("crypto pr agency", US), ("web3 pr agency", US), ("ai pr agency", US), ("blockchain pr agency", US),
      ("cybersecurity pr agency", US), ("crypto press release", US), ("web3 marketing agency", US),
      ("pr for ai startups", US), ("defi pr agency", US), ("token launch marketing agency", US),
      ("crypto kol marketing", US), ("fractional cmo web3", US), ("best web3 pr agencies", US),
      ("crypto pr agency singapore", 2702), ("web3 pr agency india", 2356)]
def host(i):
    for f in ("domain", "url"):
        v = i.get(f) or ""
        if v and "google.com" not in v:
            return re.sub(r"^https?://", "", v).split("/")[0].removeprefix("www.")
    b = i.get("breadcrumb") or ""
    m = re.match(r"https?://([^\s›/]+)", b)
    return (m.group(1).removeprefix("www.") if m else (i.get("website_name") or "?"))
out = {}
for k, loc in KW:
    cmd = ["curl", "-s", "-X", "POST", "-H", f"Authorization: Basic {AUTH}", "-H", "Content-Type: application/json",
           "-d", json.dumps([{"keyword": k, "location_code": loc, "language_code": "en", "depth": 30}]),
           "https://api.dataforseo.com/v3/serp/google/organic/live/advanced"]
    d = json.loads(subprocess.run(cmd, capture_output=True, text=True).stdout)
    t = (d.get("tasks") or [{}])[0]
    r = (t.get("result") or [{}])[0] or {}
    items = r.get("items") or []
    org = [i for i in items if i.get("type") == "organic"]
    aio = [i for i in items if i.get("type") == "ai_overview"]
    aio_refs = sorted({host(x) for a in aio for x in (a.get("references") or [])})
    ours = [{"rank": i["rank_group"], "title": i.get("title"), "breadcrumb": i.get("breadcrumb")} for i in org if "shilikajain" in host(i)]
    out[k] = {"location_code": loc, "cost": t.get("cost"), "status": t.get("status_message"),
              "item_types": r.get("item_types"), "ours": ours, "ai_overview_refs": aio_refs,
              "top10": [{"rank": i["rank_group"], "domain": host(i), "title": i.get("title")} for i in org[:10]],
              "all_domains": [host(i) for i in org]}
    print(f"{k}: ours={[o['rank'] for o in ours]} aio={'Y' if aio else 'N'} cited={'shilikajain.com' in aio_refs} cost={t.get('cost')} top3={[x['domain'] for x in out[k]['top10'][:3]]}")
json.dump(out, open(f"{OUT}/serp_buyer_keywords.json", "w"), indent=1)
