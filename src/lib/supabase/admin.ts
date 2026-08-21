import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Service-role Supabase client — bypasses RLS entirely. Server-only:
 * used exclusively inside API routes under src/app/api/admin/** and the
 * public contact-form route, never imported into anything that ships to
 * the browser. SUPABASE_SERVICE_ROLE_KEY must never be prefixed
 * NEXT_PUBLIC_ or referenced from a "use client" file.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://soclkwfudtzeluevhhwk.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key-for-build';
  return createSupabaseClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
