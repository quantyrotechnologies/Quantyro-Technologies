import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { TickerMetric } from '@/lib/types';

async function fetchTickerMetrics(): Promise<TickerMetric[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('ticker_metrics')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getTickerMetrics] failed', error);
    return [];
  }
  return (data ?? []).map((row) => ({ id: row.id, label: row.label, value: row.value }));
}

export const getTickerMetrics = unstable_cache(fetchTickerMetrics, ['ticker-metrics'], {
  tags: ['ticker-metrics'],
  revalidate: 60,
});
