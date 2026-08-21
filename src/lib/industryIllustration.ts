const INDUSTRY_ILLUSTRATIONS: Record<string, string> = {
  'banking-fintech': '/images/photos/industries/banking-fintech.jpg',
  'fitness-wellness': '/images/photos/industries/fitness-wellness.jpg',
  'taxi-ride-hailing': '/images/photos/industries/taxi-ride-hailing.jpg',
  'education-edtech': '/images/photos/industries/education-edtech.jpg',
  'dating-social': '/images/photos/industries/dating-social.jpg',
  'ecommerce-retail': '/images/photos/industries/ecommerce-retail.jpg',
  'real-estate-proptech': '/images/photos/industries/real-estate-proptech.jpg',
  'healthcare-telemedicine': '/images/photos/industries/healthcare-telemedicine.jpg',
};

const FALLBACK = '/images/illustrations/pattern-1.svg';

export function industryIllustration(slug: string): string {
  return INDUSTRY_ILLUSTRATIONS[slug] ?? FALLBACK;
}
