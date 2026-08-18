import { createClient } from '@/lib/supabase/server';

/**
 * Defense-in-depth session check for admin API routes (middleware already
 * gates /admin/* pages, but API routes are checked independently since
 * middleware matchers can be bypassed by direct fetches in edge cases).
 */
export async function requireAdminSession() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
