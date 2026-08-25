const REAL_PHOTOS = [
  '/images/photos/services/website-development.jpg',
  '/images/photos/services/custom-software.jpg',
  '/images/photos/industries/banking-fintech.jpg',
  '/images/photos/services/mobile-apps.jpg',
  '/images/photos/services/e-commerce.jpg',
  '/images/photos/industries/healthcare-telemedicine.jpg',
  '/images/photos/services/cloud-devops.jpg',
  '/images/photos/industries/real-estate-proptech.jpg',
  '/images/photos/services/seo-marketing.jpg',
  '/images/photos/industries/education-edtech.jpg',
];

/** Deterministic realistic photography cover image for a given project slug. */
export function patternImageForSlug(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes('chaitanya') || s.includes('accountan') || s.includes('ca-firm')) {
    return '/images/projects/chaitanya-associates.png';
  }
  if (s.includes('scoutx') || s.includes('security') || s.includes('protection')) {
    return '/images/projects/scoutx-security.png';
  }

  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return REAL_PHOTOS[hash % REAL_PHOTOS.length];
}
