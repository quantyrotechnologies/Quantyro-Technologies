import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { Office } from '@/lib/types';

async function fetchOffices(): Promise<Office[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('offices')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getOffices] failed', error);
    return [];
  }
  return (data ?? []).map((row) => ({ id: row.id, city: row.city, region: row.region, photoUrl: row.photo_url ?? null }));
}

export const getOffices = unstable_cache(fetchOffices, ['offices'], {
  tags: ['offices'],
  revalidate: 60,
});
