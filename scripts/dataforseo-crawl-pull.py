"""Pull the free On-Page reports for a finished DataForSEO crawl task and summarise them.
Usage: DFS_LOGIN=.. DFS_PASSWORD=.. python3 -I scripts/dataforseo-crawl-pull.py <task_id> <outdir>"""
import base64, json, os, sys, subprocess, collections

TID, OUT = sys.argv[1], sys.argv[2]
AUTH = base64.b64encode(f"{os.environ['DFS_LOGIN']}:{os.environ['DFS_PASSWORD']}".encode()).decode()

def call(path, body=None):
    cmd = ["curl", "-s", "-H", f"Authorization: Basic {AUTH}", "-H", "Content-Type: application/json",
           f"https://api.dataforseo.com/v3/on_page/{path}"]
    if body is not None:
        cmd[1:1] = ["-X", "POST", "-d", json.dumps(body)]
    return json.loads(subprocess.run(cmd, capture_output=True, text=True).stdout)

def paged(path, extra=None, cap=3000):
    items, off = [], 0
    while True:
        d = call(path, [{"id": TID, "limit": 1000, "offset": off, **(extra or {})}])
        r = (d["tasks"][0].get("result") or [{}])[0] or {}
        batch = r.get("items") or []
        items += batch
        off += 1000
        if len(batch) < 1000 or off >= cap:
            return items, r

summary = call(f"summary/{TID}")["tasks"][0]["result"][0]
json.dump(summary, open(f"{OUT}/crawl_summary.json", "w"), indent=1)
pages, _ = paged("pages")
json.dump(pages, open(f"{OUT}/crawl_pages.json", "w"))
reports = {}
for name, path, extra in [
    ("duplicate_title", "duplicate_tags", {"type": "duplicate_title"}),
    ("duplicate_description", "duplicate_tags", {"type": "duplicate_description"}),
    ("duplicate_content", "duplicate_content", {"url": "https://www.shilikajain.com/", "similarity": 6}),
    ("broken_links", "links", {"filters": [["is_broken", "=", True]]}),
    ("redirect_chains", "redirect_chains", None),
    ("non_indexable", "non_indexable", None),
    ("broken_resources", "resources", {"filters": [["status_code", ">=", 400]]}),
]:
    items, _ = paged(path, extra, cap=2000)
    reports[name] = items
    json.dump(items, open(f"{OUT}/crawl_{name}.json", "w"))

# ---- summary printout
dm = summary.get("domain_info") or {}
print("crawl:", summary["crawl_progress"], summary["crawl_status"])
print("domain_info:", {k: dm.get(k) for k in ["name", "cms", "server", "total_pages", "checks"] if k != "checks"})
print("site checks:", (dm.get("checks") or {}))
pm = summary.get("page_metrics") or {}
print("onpage_score:", pm.get("onpage_score"), "links_external", pm.get("links_external"), "internal", pm.get("links_internal"),
      "broken_links", pm.get("broken_links"), "broken_resources", pm.get("broken_resources"),
      "dup_title", pm.get("duplicate_title"), "dup_desc", pm.get("duplicate_description"), "dup_content", pm.get("duplicate_content"),
      "non_indexable", pm.get("non_indexable"))
print("page checks (count of pages flagged):")
for k, v in sorted((pm.get("checks") or {}).items(), key=lambda x: -x[1]):
    if v: print(f"  {k}: {v}")

codes = collections.Counter(p.get("status_code") for p in pages)
print("status codes:", dict(codes))
types = collections.Counter(p.get("resource_type") for p in pages)
print("resource types:", dict(types))
sec = collections.Counter("/" + (p["url"].split("/", 3)[3].split("/")[0] if p["url"].count("/") > 2 else "") for p in pages if p.get("resource_type") == "html")
print("html by section:", sec.most_common(25))
for name, items in reports.items():
    print(f"{name}: {len(items)}")
