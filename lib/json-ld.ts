import fs from 'node:fs';
import path from 'node:path';

type Node = Record<string, unknown>;

/**
 * The site's single Organization item (with its sameAs profiles) lives in the
 * homepage graph. Pages that need to carry it reuse this copy instead of
 * redefining it, so the profile list is edited in one place.
 */
export function organizationNode(): Node {
  const file = path.join(process.cwd(), 'app/_partials/homepage-jsonld.json');
  const graph = (JSON.parse(fs.readFileSync(file, 'utf8')) as { '@graph': Node[] })['@graph'];
  const org = graph.find((n) => n['@type'] === 'Organization');
  if (!org) throw new Error('homepage-jsonld.json has no Organization item');
  return org;
}

/** Adds the Organization item to a JSON-LD document that does not define it. */
export function withOrganization(doc: Node | string): Node {
  const parsed: Node = typeof doc === 'string' ? JSON.parse(doc) : doc;
  const org = organizationNode();
  const { '@context': context, ...single } = parsed;
  const graph = (parsed['@graph'] as Node[] | undefined) ?? [single];
  if (graph.some((n) => n['@id'] === org['@id'])) return parsed;
  return { '@context': context ?? 'https://schema.org', '@graph': [...graph, org] };
}

/**
 * Serialises JSON-LD for a plain <script> tag. Unlike next/script, which injects
 * the tag on the client, a plain tag is in the served HTML where crawlers that
 * do not run JavaScript can read it. "<" is escaped so the payload cannot close
 * the script element.
 */
export function jsonLdString(doc: Node | string): string {
  const json = typeof doc === 'string' ? doc : JSON.stringify(doc);
  return json.replace(/</g, '\\u003c');
}
