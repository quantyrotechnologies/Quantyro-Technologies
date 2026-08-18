import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { Stat } from '@/lib/types';

async function fetchStats(): Promise<Stat[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('stats')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getStats] failed', error);
    return [];
  }
  return (data ?? []).map((row) => ({
    id: row.id,
    count: row.count,
    suffix: row.suffix,
    label: row.label,
    tag: row.tag,
    accent: (row.accent as 'accent' | 'accent-2') ?? 'accent',
  }));
}

export const getStats = unstable_cache(fetchStats, ['stats'], {
  tags: ['stats'],
  revalidate: 60,
});
