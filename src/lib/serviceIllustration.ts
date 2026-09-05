const SERVICE_ILLUSTRATIONS: Record<string, string> = {
  'website-development': '/images/photos/services/website-development.jpg',
  'seo-marketing': '/images/photos/services/seo-marketing.jpg',
  'custom-software': '/images/photos/services/custom-software.jpg',
  'ai-machine-learning': '/images/photos/services/ai-machine-learning.jpg',
  'cloud-devops': '/images/photos/services/cloud-devops.jpg',
  'mobile-apps': '/images/photos/services/mobile-apps.jpg',
  'e-commerce': '/images/photos/services/e-commerce.jpg',
  'ui-ux-design': '/images/photos/services/ui-ux-design.jpg',
  'cybersecurity-compliance': '/images/photos/services/cybersecurity-compliance.jpg',
};

const FALLBACK = '/images/illustrations/pattern-1.svg';

export function serviceIllustration(slug: string): string {
  return SERVICE_ILLUSTRATIONS[slug] ?? FALLBACK;
}
