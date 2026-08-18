const SERVICE_ILLUSTRATIONS: Record<string, string> = {
  'custom-software': '/images/illustrations/custom-software.svg',
  'ai-machine-learning': '/images/illustrations/ai-ml.svg',
  'cloud-devops': '/images/illustrations/cloud-devops.svg',
  'mobile-apps': '/images/illustrations/mobile-apps.svg',
  'e-commerce': '/images/illustrations/e-commerce.svg',
};

const FALLBACK = '/images/illustrations/pattern-1.svg';

export function serviceIllustration(slug: string): string {
  return SERVICE_ILLUSTRATIONS[slug] ?? FALLBACK;
}
