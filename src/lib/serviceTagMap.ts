/**
 * Maps a project's free-text tag (as entered in the admin Projects form)
 * to the service page it should link to, so work case studies and service
 * pages can interlink both directions without a formal foreign key.
 */
const SERVICE_SLUG_BY_TAG: Record<string, string> = {
  'Website Development': 'website-development',
  'E-Commerce': 'e-commerce',
  'Mobile Apps': 'mobile-apps',
  'Custom Software': 'custom-software',
  'AI & Machine Learning': 'ai-machine-learning',
  'SEO & Marketing': 'seo-marketing',
  'Cloud & DevOps': 'cloud-devops',
};

export function serviceSlugForTag(tag: string): string | null {
  return SERVICE_SLUG_BY_TAG[tag] ?? null;
}
