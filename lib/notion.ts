// Notion lead logging — appends each inbound lead as a row in the Leads database.
//
// Env vars:
//   NOTION_TOKEN        Internal integration secret from notion.so/my-integrations
//   NOTION_LEADS_DB_ID  ID of the Leads database (default: the one created for Shilika)

import { Client } from '@notionhq/client';
import type { LeadPayload } from '@/lib/email';

const DB_ID =
  process.env.NOTION_LEADS_DB_ID || '2d7353d88fe9464794181e065628326f';

// Known service select options in the Leads database.
const KNOWN_SERVICES = new Set([
  'Crypto PR',
  'AI PR',
  'Web3 Marketing',
  'KOL / Influencer',
  'Content Writing',
  'Token Launch PR',
  'Other',
]);

function resolveService(s?: string): string | null {
  if (!s) return null;
  // Exact match first
  if (KNOWN_SERVICES.has(s)) return s;
  // Case-insensitive match
  for (const opt of KNOWN_SERVICES) {
    if (opt.toLowerCase() === s.toLowerCase()) return opt;
  }
  // Partial match (e.g. "crypto" → "Crypto PR")
  for (const opt of KNOWN_SERVICES) {
    if (opt.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(opt.toLowerCase().split(' ')[0])) {
      return opt;
    }
  }
  return 'Other';
}

let _client: Client | null = null;
function client(): Client {
  if (!_client) {
    _client = new Client({ auth: process.env.NOTION_TOKEN });
  }
  return _client;
}

export function isNotionConfigured(): boolean {
  return Boolean(process.env.NOTION_TOKEN);
}

export async function addLeadToNotion(p: LeadPayload): Promise<void> {
  if (!isNotionConfigured()) {
    console.warn('[notion] NOTION_TOKEN not set — skipping Notion entry.');
    return;
  }

  const service = resolveService(p.service);

  await client().pages.create({
    parent: { database_id: DB_ID },
    properties: {
      Name: { title: [{ text: { content: p.name } }] },
      Email: { email: p.email },
      ...(p.company && { Company: { rich_text: [{ text: { content: p.company } }] } }),
      ...(service && { Service: { select: { name: service } } }),
      ...(p.stage && { Stage: { rich_text: [{ text: { content: p.stage } }] } }),
      ...(p.timeline && { Timeline: { rich_text: [{ text: { content: p.timeline } }] } }),
      ...(p.budget && { Budget: { rich_text: [{ text: { content: p.budget } }] } }),
      ...(p.region && { Region: { rich_text: [{ text: { content: p.region } }] } }),
      ...(p.source && { Source: { rich_text: [{ text: { content: p.source } }] } }),
      Message: { rich_text: [{ text: { content: p.message.slice(0, 2000) } }] },
      Status: { select: { name: 'New' } },
    },
  });
}
