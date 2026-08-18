import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { Value } from '@/lib/types';

async function fetchValues(): Promise<Value[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('values_content')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getValues] failed', error);
    return [];
  }
  return (data ?? []).map((row) => ({ id: row.id, title: row.title, desc: row.description }));
}

export const getValues = unstable_cache(fetchValues, ['values'], {
  tags: ['values'],
  revalidate: 60,
});
