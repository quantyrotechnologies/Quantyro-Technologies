import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { IndustryApplication } from '@/lib/types';

async function fetchIndustryApplicationsForService(serviceId: string): Promise<IndustryApplication[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('industry_applications')
    .select('*')
    .eq('service_id', serviceId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getIndustryApplicationsForService] failed', error);
    return [];
  }
  return (data ?? []).map((row) => ({
    id: row.id,
    serviceId: row.service_id,
    sector: row.sector,
    useCase: row.use_case,
    metric: row.metric,
  }));
}

export const getIndustryApplicationsForService = unstable_cache(fetchIndustryApplicationsForService, ['industry-applications-by-service'], {
  tags: ['industry-applications'],
  revalidate: 60,
});
