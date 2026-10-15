import { AI_AGENCIES } from './ai';
import type { Agency } from './types';
import { WEB3_AGENCIES } from './web3';

export const AGENCIES: Agency[] = [...WEB3_AGENCIES, ...AI_AGENCIES];

export function agencyBySlug(slug: string): Agency | undefined {
  return AGENCIES.find((a) => a.slug === slug);
}

export function comparePath(a: Pick<Agency, 'slug'>): string {
  return `/compare/shilika-jain-vs-${a.slug}`;
}
