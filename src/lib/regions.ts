export const REGIONS = ['North America', 'Europe', 'South Asia', 'APAC'] as const;
export type Region = (typeof REGIONS)[number];

const SLUG_MAP: Record<Region, string> = {
  'North America': 'north-america',
  Europe: 'europe',
  'South Asia': 'south-asia',
  APAC: 'apac',
};

const REVERSE_MAP: Record<string, Region> = Object.fromEntries(
  Object.entries(SLUG_MAP).map(([region, slug]) => [slug, region as Region])
);

export function regionToSlug(region: string): string {
  return SLUG_MAP[region as Region] ?? region.toLowerCase().replace(/\s+/g, '-');
}

export function slugToRegion(slug: string): string | null {
  return REVERSE_MAP[slug] ?? null;
}
