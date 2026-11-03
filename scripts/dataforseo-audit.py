"""DataForSEO audit pulls for shilikajain.com (paid endpoints).

Credentials come from env vars, never the repo:
  DFS_LOGIN, DFS_PASSWORD  (stored in Notion: SLATE -> Credentials)

Usage: python3 -I scripts/dataforseo-audit.py data/dataforseo-audit/<date>
Each call is skipped if the balance would drop below MIN_BALANCE.
"""
import base64, json, os, sys, urllib.request, subprocess

OUT = sys.argv[1]
DOMAIN = "www.shilikajain.com"
US = 2840
MIN_BALANCE = 0.06
AUTH = base64.b64encode(f"{os.environ['DFS_LOGIN']}:{os.environ['DFS_PASSWORD']}".encode()).decode()

def call(path, body=None):
    # curl, because python urllib fails SSL on this Mac
    cmd = ["curl", "-s", "-H", f"Authorization: Basic {AUTH}", "-H", "Content-Type: application/json",
           f"https://api.dataforseo.com/v3/{path}"]
    if body is not None:
        cmd[1:1] = ["-X", "POST", "-d", json.dumps(body)]
    return json.loads(subprocess.run(cmd, capture_output=True, text=True).stdout)

def balance():
    import time
    for _ in range(5):
        try:
            return call("appendix/user_data")["tasks"][0]["result"][0]["money"]["balance"]
        except (TypeError, KeyError, IndexError, json.JSONDecodeError):
            time.sleep(5)
    raise SystemExit("balance check failed")

def run(name, path, body):
    if os.path.exists(f"{OUT}/{name}.json"):
        print(f"have {name}"); return None
    b = balance()
    if b < MIN_BALANCE:
        print(f"SKIP {name}: balance {b:.3f}")
        return None
    d = call(path, [body])
    t = d["tasks"][0]
    json.dump(d, open(f"{OUT}/{name}.json", "w"), indent=1)
    n = (t.get("result") or [{}])[0] or {}
    print(f"{name}: {t['status_code']} {t['status_message']} cost={t.get('cost')} "
          f"items={n.get('items_count', n.get('total_count'))} bal_before={b:.3f}")
    return d

lab = {"target": DOMAIN, "location_code": US, "language_code": "en"}
run("labs_domain_rank_overview", "dataforseo_labs/google/domain_rank_overview/live", lab)
run("labs_ranked_keywords", "dataforseo_labs/google/ranked_keywords/live",
    {**lab, "limit": 300, "order_by": ["keyword_data.keyword_info.search_volume,desc"]})
run("labs_competitors_domain", "dataforseo_labs/google/competitors_domain/live",
    {**lab, "limit": 20, "exclude_top_domains": True})

run("backlinks_summary", "backlinks/summary/live",
    {"target": "shilikajain.com", "include_subdomains": True, "internal_list_limit": 10, "backlinks_status_type": "live"})
run("backlinks_referring_domains", "backlinks/referring_domains/live",
    {"target": "shilikajain.com", "limit": 100, "order_by": ["rank,desc"], "backlinks_status_type": "live"})
run("backlinks_anchors", "backlinks/anchors/live",
    {"target": "shilikajain.com", "limit": 50, "order_by": ["backlinks,desc"]})

KW = ["web3 pr agency", "crypto pr agency", "blockchain pr agency", "ai pr agency", "pr for ai startups",
      "defi pr agency", "cybersecurity pr agency", "token launch marketing agency", "crypto kol marketing",
      "web3 pr firm", "fractional pr consultant", "fractional cmo web3", "crypto pr cost",
      "best web3 pr agencies", "crypto press release", "web3 marketing agency", "ai startup pr agency",
      "crypto pr singapore", "web3 pr india", "crypto pr agency dubai", "crypto pr korea", "shilika jain"]
run("labs_keyword_overview", "dataforseo_labs/google/keyword_overview/live",
    {"keywords": KW, "location_code": US, "language_code": "en"})

GEO = {"crypto pr singapore": 2702, "web3 pr india": 2356, "crypto pr agency dubai": 2784, "crypto pr korea": 2410}
serp = {}
for i, k in enumerate(KW):
    loc = GEO.get(k, US)
    if i % 5 == 0 and balance() < MIN_BALANCE:
        print("SKIP serp", k); continue
    d = call("serp/google/organic/live/advanced", [{"keyword": k, "location_code": loc, "language_code": "en", "depth": 50}])
    r = (d["tasks"][0].get("result") or [{}])[0]
    items = r.get("items") or []
    org = [i for i in items if i.get("type") == "organic"]
    mine = [i for i in org if "shilikajain.com" in (i.get("domain") or "")]
    serp[k] = {"location_code": loc, "cost": d["tasks"][0].get("cost"),
               "item_types": r.get("item_types"),
               "ours": [{"rank": i["rank_group"], "url": i["url"], "title": i.get("title")} for i in mine],
               "top10": [{"rank": i["rank_group"], "domain": i["domain"], "url": i["url"], "title": i.get("title")} for i in org[:10]]}
    print(f"serp {k}: ours={[m['rank'] for m in serp[k]['ours']]}")
json.dump(serp, open(f"{OUT}/serp_buyer_keywords.json", "w"), indent=1)
print("final balance", balance())
