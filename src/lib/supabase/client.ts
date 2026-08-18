"use client";
import { createBrowserClient } from '@supabase/ssr';

/** Browser-side Supabase client (anon key, RLS-scoped). Used only in the admin login form. */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
