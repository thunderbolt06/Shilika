import 'server-only';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY!;

/**
 * Per-request server client honouring user cookies. Use in server components,
 * server actions, and route handlers that read public data on behalf of a visitor.
 * RLS applies.
 */
export async function getServerSupabase() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (entries: { name: string; value: string; options: CookieOptions }[]) => {
        for (const { name, value, options } of entries) {
          cookieStore.set(name, value, options);
        }
      },
    },
  });
}

/**
 * Service-role client. Bypasses RLS. Use only in trusted server contexts:
 * admin API routes, cron jobs, server actions guarded by admin session.
 * Never expose to the client.
 */
export function getAdminSupabase() {
  if (!SUPABASE_SECRET_KEY) {
    throw new Error('SUPABASE_SECRET_KEY missing — required for admin operations');
  }
  return createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
