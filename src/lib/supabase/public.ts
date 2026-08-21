import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Stateless anon-key client for public content reads (services, projects,
 * testimonials, etc.) from src/lib/data/*.ts. No cookies/session involved —
 * RLS's "public read" policies handle access. Not for admin writes.
 */
const FALLBACK_SUPABASE_URL = 'https://soclkwfudtzeluevhhwk.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'sb_publishable_s_tFU93tCEpsVfBvpCRL4Q_kkQA02Dv';

export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
