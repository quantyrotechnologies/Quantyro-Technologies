// Major Indian business hubs we support city-level SEO landing pages for.
// Deliberately a fixed, curated list (not free text) — keeps slugs
// predictable and stops the admin bulk-generator from spawning a page for
// every town someone types in, which is how thin-content problems start.
export const CITIES = [
  'Delhi',
  'Mumbai',
  'Bangalore',
  'Noida',
  'Gurgaon',
  'Pune',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Chandigarh',
] as const;

export type City = (typeof CITIES)[number];

export function citySlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, '-');
}

const REVERSE_MAP: Record<string, City> = Object.fromEntries(
  CITIES.map((c) => [citySlug(c), c])
);

export function slugToCity(slug: string): City | null {
  return REVERSE_MAP[slug] ?? null;
}
