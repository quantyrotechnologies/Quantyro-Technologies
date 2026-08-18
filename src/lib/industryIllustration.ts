const INDUSTRY_ILLUSTRATIONS: Record<string, string> = {
  'banking-fintech': '/images/illustrations/banking-fintech.svg',
  'fitness-wellness': '/images/illustrations/fitness-wellness.svg',
  'taxi-ride-hailing': '/images/illustrations/taxi-ride-hailing.svg',
  'education-edtech': '/images/illustrations/education-edtech.svg',
  'dating-social': '/images/illustrations/dating-social.svg',
  'ecommerce-retail': '/images/illustrations/e-commerce.svg',
  'real-estate-proptech': '/images/illustrations/real-estate-proptech.svg',
  'healthcare-telemedicine': '/images/illustrations/healthcare-telemedicine.svg',
};

const FALLBACK = '/images/illustrations/pattern-1.svg';

export function industryIllustration(slug: string): string {
  return INDUSTRY_ILLUSTRATIONS[slug] ?? FALLBACK;
}
