const PATTERNS = [
  '/images/illustrations/pattern-1.svg',
  '/images/illustrations/pattern-2.svg',
  '/images/illustrations/pattern-3.svg',
  '/images/illustrations/pattern-4.svg',
];

/** Deterministic decorative cover image for a given slug — same slug always gets the same pattern. */
export function patternImageForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return PATTERNS[hash % PATTERNS.length];
}
