import { CALCULATOR_TOOLS } from './calculators';
import { EVERYDAY_TOOLS } from './everyday';
import { PR_TOOLS } from './pr';
import { SEO_TOOLS } from './seo';
import type { FreeTool } from './types';

export { GROUPS, type FreeTool, type ToolGroup } from './types';

export const FREE_TOOLS: FreeTool[] = [...EVERYDAY_TOOLS, ...SEO_TOOLS, ...CALCULATOR_TOOLS, ...PR_TOOLS];

export const FREE_TOOL_BY_SLUG: Record<string, FreeTool> = Object.fromEntries(FREE_TOOLS.map((t) => [t.slug, t]));
