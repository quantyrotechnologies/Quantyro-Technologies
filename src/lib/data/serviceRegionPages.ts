import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { ServiceRegionPage } from '@/lib/types';

async function fetchServiceRegionPage(serviceSlug: string, region: string): Promise<ServiceRegionPage | null> {
  const supabase = createPublicClient();

  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', serviceSlug)
    .eq('is_active', true)
    .maybeSingle();
  if (!service) return null;

  const { data: page } = await supabase
    .from('service_region_pages')
    .select('*')
    .eq('service_id', service.id)
    .eq('region', region)
    .eq('is_active', true)
    .maybeSingle();
  if (!page) return null;

  return {
    id: page.id,
    region: page.region,
    intro: page.intro,
    seoTitle: page.seo_title ?? null,
    seoDescription: page.seo_description ?? null,
    service: {
      id: service.id,
      slug: service.slug,
      title: service.title,
      desc: service.description,
      capabilities: service.capabilities ?? [],
    },
  };
}

export const getServiceRegionPage = unstable_cache(fetchServiceRegionPage, ['service-region-page'], {
  tags: ['service-region-pages'],
  revalidate: 60,
});

/** All active regions per service, keyed by service id — for the internal link block on /services. */
async function fetchActiveRegionsByService(): Promise<Record<string, string[]>> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('service_region_pages')
    .select('service_id, region')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getActiveRegionsByService] failed', error);
    return {};
  }

  const grouped: Record<string, string[]> = {};
  for (const row of data ?? []) {
    (grouped[row.service_id] ??= []).push(row.region);
  }
  return grouped;
}

export const getActiveRegionsByService = unstable_cache(fetchActiveRegionsByService, ['active-regions-by-service'], {
  tags: ['service-region-pages'],
  revalidate: 60,
});

/** Every active (service slug, region) pair — used to build the sitemap. */
async function fetchAllActiveServiceRegionSlugs(): Promise<{ serviceSlug: string; region: string }[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('service_region_pages')
    .select('region, service:services!inner(slug)')
    .eq('is_active', true);

  if (error) {
    console.error('[getAllActiveServiceRegionSlugs] failed', error);
    return [];
  }

  return (data ?? []).map((row: { region: string; service: { slug: string } | { slug: string }[] }) => ({
    serviceSlug: Array.isArray(row.service) ? row.service[0]?.slug : row.service.slug,
    region: row.region,
  }));
}

export const getAllActiveServiceRegionSlugs = unstable_cache(fetchAllActiveServiceRegionSlugs, ['all-active-service-region-slugs'], {
  tags: ['service-region-pages'],
  revalidate: 60,
});
