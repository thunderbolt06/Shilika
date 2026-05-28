import 'server-only';
import * as XLSX from 'xlsx';
import type { BlogPost } from './supabase/types';

export const EXPECTED_COLUMNS = [
  'id',
  'slug',
  'title',
  'description',
  'body',
  'image',
  'author',
  'author_slug',
  'tags',
  'related_posts',
  'cta_label',
  'cta_url',
  'published',
  'published_at',
] as const;

export type RowError = { row: number; field: string; message: string };

export type ParsedRow = {
  row: number;
  source: Record<string, unknown>;
  parsed: Partial<BlogPost>;
  action: 'insert' | 'update' | 'invalid';
  errors: RowError[];
};

export type PreviewResult = {
  rows: ParsedRow[];
  summary: {
    inserts: number;
    updates: number;
    invalid: number;
    total: number;
  };
};

function asString(v: unknown): string | undefined {
  if (v === undefined || v === null) return undefined;
  if (typeof v === 'string') return v.trim() || undefined;
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (v instanceof Date) return v.toISOString();
  return String(v).trim() || undefined;
}

function asBool(v: unknown): boolean | undefined {
  if (v === undefined || v === null || v === '') return undefined;
  if (typeof v === 'boolean') return v;
  if (typeof v === 'number') return v === 1;
  if (typeof v === 'string') {
    const x = v.trim().toLowerCase();
    if (['true', 'yes', '1', 'y'].includes(x)) return true;
    if (['false', 'no', '0', 'n'].includes(x)) return false;
  }
  return undefined;
}

function asArray(v: unknown): string[] | undefined {
  const s = asString(v);
  if (!s) return undefined;
  return s
    .split(/[;,\n]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SLUG_RE = /^[a-z0-9-]+$/;

export function parseRow(rawRow: Record<string, unknown>, rowIndex: number): ParsedRow {
  const errors: RowError[] = [];
  const parsed: Partial<BlogPost> = {};

  const id = asString(rawRow.id);
  if (id) {
    if (!UUID_RE.test(id)) {
      errors.push({ row: rowIndex, field: 'id', message: 'id must be a UUID' });
    } else {
      parsed.id = id;
    }
  }

  const slug = asString(rawRow.slug);
  if (!id && !slug) {
    errors.push({ row: rowIndex, field: 'slug', message: 'slug is required when id is blank' });
  } else if (slug) {
    if (!SLUG_RE.test(slug)) {
      errors.push({ row: rowIndex, field: 'slug', message: 'slug must be lowercase letters, numbers, hyphens' });
    } else {
      parsed.slug = slug;
    }
  }

  const title = asString(rawRow.title);
  if (!id && !title) {
    errors.push({ row: rowIndex, field: 'title', message: 'title is required for new rows' });
  } else if (title) parsed.title = title;

  const description = asString(rawRow.description);
  if (!id && !description) {
    errors.push({ row: rowIndex, field: 'description', message: 'description is required for new rows' });
  } else if (description) parsed.description = description;

  const body = asString(rawRow.body);
  if (!id && !body) {
    errors.push({ row: rowIndex, field: 'body', message: 'body is required for new rows' });
  } else if (body) parsed.body = body;

  const image = asString(rawRow.image);
  if (image !== undefined) parsed.image = image;

  const author = asString(rawRow.author);
  if (author !== undefined) parsed.author = author;

  const authorSlug = asString(rawRow.author_slug);
  if (authorSlug !== undefined) parsed.author_slug = authorSlug;

  const tags = asArray(rawRow.tags);
  if (tags !== undefined) parsed.tags = tags;

  const related = asArray(rawRow.related_posts);
  if (related !== undefined) parsed.related_posts = related;

  const ctaLabel = asString(rawRow.cta_label);
  if (ctaLabel !== undefined) parsed.cta_label = ctaLabel;

  const ctaUrl = asString(rawRow.cta_url);
  if (ctaUrl !== undefined) parsed.cta_url = ctaUrl;

  const published = asBool(rawRow.published);
  if (published !== undefined) parsed.published = published;

  const publishedAt = asString(rawRow.published_at);
  if (publishedAt !== undefined) {
    const d = new Date(publishedAt);
    if (Number.isNaN(d.getTime())) {
      errors.push({ row: rowIndex, field: 'published_at', message: 'invalid date' });
    } else {
      parsed.published_at = d.toISOString();
    }
  }

  const action: ParsedRow['action'] = errors.length ? 'invalid' : id ? 'update' : 'insert';

  return { row: rowIndex, source: rawRow, parsed, action, errors };
}

export function parseXlsx(buffer: ArrayBuffer): PreviewResult {
  const workbook = XLSX.read(buffer, { type: 'array', cellDates: true });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    return { rows: [], summary: { inserts: 0, updates: 0, invalid: 0, total: 0 } };
  }
  const sheet = workbook.Sheets[sheetName];
  const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: undefined, raw: true });

  const rows = raw.map((r, i) => parseRow(r, i + 2)); // +2: header row is row 1, data starts at row 2
  const summary = rows.reduce(
    (acc, r) => {
      acc.total += 1;
      acc[r.action === 'insert' ? 'inserts' : r.action === 'update' ? 'updates' : 'invalid'] += 1;
      return acc;
    },
    { inserts: 0, updates: 0, invalid: 0, total: 0 },
  );
  return { rows, summary };
}

export function buildExportSheet(posts: BlogPost[]): Uint8Array {
  const sheetRows = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    body: p.body,
    image: p.image ?? '',
    author: p.author,
    author_slug: p.author_slug ?? '',
    tags: (p.tags || []).join(', '),
    related_posts: (p.related_posts || []).join(', '),
    cta_label: p.cta_label ?? '',
    cta_url: p.cta_url ?? '',
    published: p.published,
    published_at: p.published_at ?? '',
    created_at: p.created_at,
    updated_at: p.updated_at,
  }));
  const ws = XLSX.utils.json_to_sheet(sheetRows, { header: [...EXPECTED_COLUMNS, 'created_at', 'updated_at'] });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'blog_posts');
  return XLSX.write(wb, { type: 'array', bookType: 'xlsx' }) as Uint8Array;
}
