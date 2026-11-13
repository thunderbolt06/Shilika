#!/usr/bin/env python3
"""Build data/seo-30d/redirect-map.csv from keyword-ownership.csv (MERGE-301 rows).

Tier by 90-day GSC page impressions: SAFE 0-5, REVIEW 6-19, NEEDS APPROVAL 20+.
WAIT overrides for URLs that must not move yet. Nothing here touches the site.
"""
import csv, json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, 'data/seo-30d')
WAIT = {'/pages/defi-pr-agency': 'Wait until /playbook/best-defi-pr-agency-2026 names firms and holds its unique copy.'}
meta = json.load(open(os.path.join(D, 'gsc-l90/meta.json')))
rows = [r for r in csv.DictReader(open(os.path.join(D, 'keyword-ownership.csv'))) if r['recommendation'] == 'MERGE-301']
out = []
for r in rows:
    imp = int(r['impressions'] or 0)
    tier = 'SAFE' if imp <= 5 else 'REVIEW' if imp < 20 else 'NEEDS APPROVAL'
    note = ''
    if r['url'] in WAIT:
        tier, note = 'WAIT', WAIT[r['url']]
    out.append(dict(tier=tier, source=r['url'], target=r['target_url'], impressions_90d=imp,
                    clicks_90d=r['clicks'], family=r['family'], index_status=r['coverage_2026_10_30'],
                    note=note, reason=r['reason']))
order = {'WAIT': 0, 'NEEDS APPROVAL': 1, 'REVIEW': 2, 'SAFE': 3}
out.sort(key=lambda x: (order[x['tier']], -x['impressions_90d'], x['source']))
with open(os.path.join(D, 'redirect-map.csv'), 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=list(out[0].keys()))
    w.writeheader(); w.writerows(out)
from collections import Counter
print('window', meta['start'], '..', meta['end'], 'total', len(out), dict(Counter(x['tier'] for x in out)))
for x in out:
    if x['tier'] in ('WAIT', 'NEEDS APPROVAL'):
        print(x['tier'], x['source'], '->', x['target'], x['impressions_90d'])
