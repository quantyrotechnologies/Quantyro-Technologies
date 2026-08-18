import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { Project } from '@/lib/types';

function mapProject(row: Record<string, unknown>): Project {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    client: row.client as string,
    region: row.region as string,
    result: row.result as string,
    tags: (row.tags as string[]) ?? [],
    summary: row.summary as string,
    detail: row.detail as string,
    accent: (row.accent as 'accent' | 'accent-2') ?? 'accent',
    isFeatured: Boolean(row.is_featured),
    year: (row.year as number | null) ?? null,
    stack: (row.stack as string[] | null) ?? null,
    duration: (row.duration as string | null) ?? null,
    highlights: (row.highlights as string[] | null) ?? null,
  };
}

async function fetchProjects(): Promise<Project[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getProjects] failed', error);
    return [];
  }
  return (data ?? []).map(mapProject);
}

export const getProjects = unstable_cache(fetchProjects, ['projects'], {
  tags: ['projects'],
  revalidate: 60,
});

async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error || !data) {
    if (error) console.error('[getProjectBySlug] failed', error);
    return null;
  }
  return mapProject(data);
}

export const getProjectBySlug = unstable_cache(fetchProjectBySlug, ['project-by-slug'], {
  tags: ['projects'],
  revalidate: 60,
});

async function fetchFeaturedProjects(): Promise<Project[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getFeaturedProjects] failed', error);
    return [];
  }
  return (data ?? []).map(mapProject);
}

export const getFeaturedProjects = unstable_cache(fetchFeaturedProjects, ['featured-projects'], {
  tags: ['projects'],
  revalidate: 60,
});

async function fetchProjectsByRegion(region: string): Promise<Project[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .eq('region', region)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getProjectsByRegion] failed', error);
    return [];
  }
  return (data ?? []).map(mapProject);
}

export const getProjectsByRegion = unstable_cache(fetchProjectsByRegion, ['projects-by-region'], {
  tags: ['projects'],
  revalidate: 60,
});
