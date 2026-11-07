// Freeze guard for the admin Excel bulk import (90-day SEO plan, week 1).
// Large blog imports can flood the index with thin pages, so a commit of
// more than BULK_COMMIT_LIMIT rows needs an explicit confirm=true field.

export const BULK_COMMIT_LIMIT = 10;

export type BulkGuardResult =
  | { ok: true }
  | { ok: false; status: 409; body: { error: 'confirm_required'; rows: number; limit: number; message: string } };

export function checkBulkCommit(rowCount: number, confirmField: unknown): BulkGuardResult {
  if (rowCount <= BULK_COMMIT_LIMIT) return { ok: true };
  if (confirmField === 'true' || confirmField === true) return { ok: true };
  return {
    ok: false,
    status: 409,
    body: {
      error: 'confirm_required',
      rows: rowCount,
      limit: BULK_COMMIT_LIMIT,
      message: `This file has ${rowCount} rows. Imports over ${BULK_COMMIT_LIMIT} rows are frozen under the SEO plan unless you confirm.`,
    },
  };
}
