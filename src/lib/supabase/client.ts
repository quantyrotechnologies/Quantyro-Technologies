"use client";
import { createBrowserClient } from '@supabase/ssr';

/** Browser-side Supabase client (anon key, RLS-scoped). Used only in the admin login form. */
const FALLBACK_SUPABASE_URL = 'https://soclkwfudtzeluevhhwk.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'sb_publishable_s_tFU93tCEpsVfBvpCRL4Q_kkQA02Dv';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY
  );
}
