import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { LocationPage } from '@/lib/types';

async function fetchServiceLocationPage(serviceSlug: string, city: string): Promise<LocationPage | null> {
  const supabase = createPublicClient();

  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', serviceSlug)
    .eq('is_active', true)
    .maybeSingle();
  if (!service) return null;

  const { data: page } = await supabase
    .from('location_pages')
    .select('*')
    .eq('service_id', service.id)
    .eq('city', city)
    .eq('is_active', true)
    .maybeSingle();
  if (!page) return null;

  return {
    id: page.id,
    city: page.city,
    nearbyAreas: page.nearby_areas ?? null,
    localNote: page.local_note ?? null,
    seoTitle: page.seo_title ?? null,
    seoDescription: page.seo_description ?? null,
    faqs: page.faqs ?? [],
    targetKeywords: page.target_keywords ?? [],
    entity: {
      kind: 'service',
      id: service.id,
      slug: service.slug,
      title: service.title,
      desc: service.description,
      capabilities: service.capabilities ?? [],
    },
  };
}

export const getServiceLocationPage = unstable_cache(fetchServiceLocationPage, ['service-location-page'], {
  tags: ['location-pages'],
  revalidate: 60,
});

async function fetchIndustryLocationPage(industrySlug: string, city: string): Promise<LocationPage | null> {
  const supabase = createPublicClient();

  const { data: industry } = await supabase
    .from('industries')
    .select('*')
    .eq('slug', industrySlug)
    .eq('is_active', true)
    .maybeSingle();
  if (!industry) return null;

  const { data: page } = await supabase
    .from('location_pages')
    .select('*')
    .eq('industry_id', industry.id)
    .eq('city', city)
    .eq('is_active', true)
    .maybeSingle();
  if (!page) return null;

  return {
    id: page.id,
    city: page.city,
    nearbyAreas: page.nearby_areas ?? null,
    localNote: page.local_note ?? null,
    seoTitle: page.seo_title ?? null,
    seoDescription: page.seo_description ?? null,
    faqs: page.faqs ?? [],
    targetKeywords: page.target_keywords ?? [],
    entity: {
      kind: 'industry',
      id: industry.id,
      slug: industry.slug,
      title: industry.title,
      desc: industry.description,
      capabilities: industry.capabilities ?? [],
    },
  };
}

export const getIndustryLocationPage = unstable_cache(fetchIndustryLocationPage, ['industry-location-page'], {
  tags: ['location-pages'],
  revalidate: 60,
});

/** Active cities per service id — powers the "Also serving" internal-link block on /services and service detail pages. */
async function fetchActiveCitiesByService(): Promise<Record<string, string[]>> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('location_pages')
    .select('service_id, city')
    .eq('is_active', true)
    .not('service_id', 'is', null)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error(`[getActiveCitiesByService] failed: ${error.message} (code ${error.code})`);
    return {};
  }

  const grouped: Record<string, string[]> = {};
  for (const row of data ?? []) {
    (grouped[row.service_id] ??= []).push(row.city);
  }
  return grouped;
}

export const getActiveCitiesByService = unstable_cache(fetchActiveCitiesByService, ['active-cities-by-service'], {
  tags: ['location-pages'],
  revalidate: 60,
});

/** Active cities per industry id — powers the equivalent block on /industries pages. */
async function fetchActiveCitiesByIndustry(): Promise<Record<string, string[]>> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('location_pages')
    .select('industry_id, city')
    .eq('is_active', true)
    .not('industry_id', 'is', null)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error(`[getActiveCitiesByIndustry] failed: ${error.message} (code ${error.code})`);
    return {};
  }

  const grouped: Record<string, string[]> = {};
  for (const row of data ?? []) {
    (grouped[row.industry_id] ??= []).push(row.city);
  }
  return grouped;
}

export const getActiveCitiesByIndustry = unstable_cache(fetchActiveCitiesByIndustry, ['active-cities-by-industry'], {
  tags: ['location-pages'],
  revalidate: 60,
});

/** Every active (kind, entity slug, city) triple — used to build the sitemap. */
async function fetchAllActiveLocationSlugs(): Promise<{ kind: 'service' | 'industry'; slug: string; city: string }[]> {
  const supabase = createPublicClient();

  const [{ data: servicePages, error: serviceErr }, { data: industryPages, error: industryErr }] = await Promise.all([
    supabase.from('location_pages').select('city, service:services!inner(slug)').eq('is_active', true).not('service_id', 'is', null),
    supabase.from('location_pages').select('city, industry:industries!inner(slug)').eq('is_active', true).not('industry_id', 'is', null),
  ]);

  if (serviceErr) console.error(`[getAllActiveLocationSlugs] service query failed: ${serviceErr.message} (code ${serviceErr.code})`);
  if (industryErr) console.error(`[getAllActiveLocationSlugs] industry query failed: ${industryErr.message} (code ${industryErr.code})`);

  const services = (servicePages ?? []).map((row: { city: string; service: { slug: string } | { slug: string }[] }) => ({
    kind: 'service' as const,
    city: row.city,
    slug: Array.isArray(row.service) ? row.service[0]?.slug : row.service.slug,
  }));
  const industries = (industryPages ?? []).map((row: { city: string; industry: { slug: string } | { slug: string }[] }) => ({
    kind: 'industry' as const,
    city: row.city,
    slug: Array.isArray(row.industry) ? row.industry[0]?.slug : row.industry.slug,
  }));

  return [...services, ...industries];
}

export const getAllActiveLocationSlugs = unstable_cache(fetchAllActiveLocationSlugs, ['all-active-location-slugs'], {
  tags: ['location-pages'],
  revalidate: 60,
});
