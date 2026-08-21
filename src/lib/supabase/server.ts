import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Server-side Supabase client (anon key, RLS-scoped), bound to the request's
 * auth cookies. Use this to read the current admin session in Server
 * Components, Route Handlers, and Server Actions.
 */
const FALLBACK_SUPABASE_URL = 'https://soclkwfudtzeluevhhwk.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'sb_publishable_s_tFU93tCEpsVfBvpCRL4Q_kkQA02Dv';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component render (not a Server Action or
            // Route Handler) — cookies can't be written here. Session refresh
            // is still handled by middleware, so this is safe to ignore.
          }
        },
      },
    }
  );
}
