import { createProxyRouteHandler } from '@axiomhq/nextjs';
import { logger } from '@/lib/axiom';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = createProxyRouteHandler(logger);
