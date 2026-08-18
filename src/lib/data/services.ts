import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { Service } from '@/lib/types';

async function fetchServices(): Promise<Service[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getServices] failed to fetch services', error);
    return [];
  }

  return (data ?? []).map((row, index) => ({
    id: row.id,
    num: String(index + 1).padStart(2, '0'),
    slug: row.slug,
    title: row.title,
    desc: row.description,
    capabilities: row.capabilities ?? [],
    stack: row.stack ?? null,
    seoTitle: row.seo_title ?? null,
    seoDescription: row.seo_description ?? null,
  }));
}

export const getServices = unstable_cache(fetchServices, ['services'], {
  tags: ['services'],
  revalidate: 60,
});

async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  const services = await fetchServices();
  return services.find((s) => s.slug === slug) ?? null;
}

export const getServiceBySlug = unstable_cache(fetchServiceBySlug, ['service-by-slug'], {
  tags: ['services'],
  revalidate: 60,
});
