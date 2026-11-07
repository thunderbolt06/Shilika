// Run: node --experimental-strip-types scripts/check-blog-excel-guard.mjs
import assert from 'node:assert/strict';
import { checkBulkCommit, BULK_COMMIT_LIMIT } from '../lib/blog-excel-guard.ts';

assert.equal(BULK_COMMIT_LIMIT, 10);
assert.deepEqual(checkBulkCommit(0, null), { ok: true });
assert.deepEqual(checkBulkCommit(10, null), { ok: true });

const blocked = checkBulkCommit(11, null);
assert.equal(blocked.ok, false);
if (!blocked.ok) {
  assert.equal(blocked.status, 409);
  assert.equal(blocked.body.error, 'confirm_required');
  assert.equal(blocked.body.rows, 11);
}
assert.equal(checkBulkCommit(500, 'false').ok, false);
assert.equal(checkBulkCommit(500, 'yes').ok, false);
assert.deepEqual(checkBulkCommit(500, 'true'), { ok: true });

console.log('blog-excel-guard: all checks passed');
