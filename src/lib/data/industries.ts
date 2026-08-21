import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { Industry } from '@/lib/types';

export const SAMPLE_INDUSTRIES: Industry[] = [
  {
    id: 'ind-1',
    num: '01',
    slug: 'banking-fintech',
    title: 'Banking & FinTech',
    desc: 'Secure, compliant banking and payments platforms — from core banking modernization to AI-driven fraud detection — built to withstand a regulatory audit and a transaction spike on the same day.',
    challenges: [
      'Legacy core banking systems that block new product launches',
      'Real-time fraud detection at high transaction volume',
      'Meeting PCI-DSS, KYC, and regional financial compliance',
      'Rising customer expectations for instant digital banking',
    ],
    capabilities: [
      'Core banking system integration and modernization',
      'Real-time payment gateways and digital wallets',
      'AI-powered fraud detection and risk scoring',
      'Biometric authentication (fingerprint, facial, voice)',
      'Open banking API integration',
      'P2P transfers and instant bill payments',
      'Cardless ATM and QR-based transactions',
      'AI-driven personalized financial insights',
    ],
    marketStats: [
      '39% of people worldwide now use a digital banking app',
      '74% of millennials and 68% of Gen Z say they prefer digital-first banking',
      'Neobanking users are projected to reach 376.9 million by 2027',
    ],
    relatedServiceSlugs: ['custom-software', 'ai-machine-learning', 'cloud-devops'],
    statValue: '99.999%',
    statLabel: 'Transaction reliability',
    seoTitle: 'Banking & FinTech Software Development | Quantyro',
    seoDescription: 'Secure banking platforms, real-time payment gateways, and AI-driven fraud detection engineered for regulated financial institutions and neobanks.',
  },
  {
    id: 'ind-2',
    num: '02',
    slug: 'fitness-wellness',
    title: 'Fitness & Wellness',
    desc: 'Activity tracking, wearable integration, and personalized coaching platforms for fitness brands, gyms, and wellness startups competing in a fast-growing digital health market.',
    challenges: [
      'Low user retention past the first few weeks',
      'Syncing accurately with wearables and health APIs',
      'Delivering real personalization, not generic workout plans',
      'Protecting sensitive health and biometric data',
    ],
    capabilities: [
      'Wearable device and health API integration (HealthKit, Google Fit)',
      'AI-driven workout and nutrition personalization',
      'Real-time activity tracking and progress analytics',
      'Live and on-demand video coaching',
      'Gamification and streak/challenge systems',
      'Sleep and recovery tracking',
      'Social and community engagement features',
      'Subscription and in-app payment integration',
    ],
    marketStats: [
      'The global fitness app market is valued at roughly $12 billion in 2025',
      'The category is growing at a projected CAGR of around 14% through 2030',
      'Wearable-synced fitness apps see meaningfully higher retention than manual-log apps',
    ],
    relatedServiceSlugs: ['mobile-apps', 'ai-machine-learning', 'custom-software'],
    statValue: 'Real-Time',
    statLabel: 'Activity sync',
    seoTitle: 'Fitness & Wellness App Development | Quantyro',
    seoDescription: 'Wearable-integrated fitness apps, AI-driven personalization, and live coaching platforms engineered for gyms, trainers, and wellness startups.',
  },
  {
    id: 'ind-3',
    num: '03',
    slug: 'taxi-ride-hailing',
    title: 'Taxi & Ride-Hailing',
    desc: 'Dispatch, routing, and fare systems built to handle surge demand and real-time GPS at scale — the operational core of a ride-hailing platform, not just the rider-facing app.',
    challenges: [
      'Real-time GPS tracking and ETA accuracy at scale',
      'Dynamic, demand-based fare calculation',
      'Driver onboarding, KYC, and fleet compliance',
      'Peak-demand load without dispatch delays',
    ],
    capabilities: [
      'Real-time GPS tracking and route optimization',
      'AI-powered dynamic fare and surge-pricing engines',
      'Driver onboarding with automated KYC verification',
      'Fleet and dispatch admin dashboards',
      'Multi-payment and digital wallet integration',
      'In-app SOS and safety/route-deviation alerts',
      'Driver earnings and shift-scheduling tools',
      'Multi-city and multi-service fleet support',
    ],
    marketStats: [
      'The global ride-hailing market is valued at well over $280 billion',
      'Urban ride-hailing demand continues to grow at double-digit rates in most regions',
      'Real-time dispatch accuracy is now a primary driver of rider retention',
    ],
    relatedServiceSlugs: ['mobile-apps', 'ai-machine-learning', 'cloud-devops'],
    statValue: '<3s',
    statLabel: 'Dispatch matching time',
    seoTitle: 'Taxi & Ride-Hailing App Development | Quantyro',
    seoDescription: 'Real-time dispatch, GPS tracking, and dynamic fare engines engineered for ride-hailing startups and fleet operators at scale.',
  },
  {
    id: 'ind-4',
    num: '04',
    slug: 'education-edtech',
    title: 'Education & EdTech',
    desc: 'Learning platforms, AI tutoring, and school management systems built for real classroom and corporate-training workflows — not a generic course-hosting template.',
    challenges: [
      'Keeping learners engaged past the first module',
      'Supporting live, on-demand, and offline learning in one platform',
      'Tracking progress and outcomes accurately at scale',
      'Data privacy for student and minor users',
    ],
    capabilities: [
      'AI-powered tutoring and adaptive learning paths',
      'Live and on-demand video classrooms',
      'Student progress analytics and reporting',
      'Gamification and interactive assessment tools',
      'School and corporate LMS integration',
      'Parent-teacher communication hubs',
      'Multilingual content support',
      'Subscription and institutional billing models',
    ],
    marketStats: [
      'The global EdTech market is projected to approach $470 billion by 2027',
      'Adaptive, AI-personalized learning paths are increasingly the baseline expectation, not a differentiator',
      'Corporate upskilling platforms are one of the fastest-growing EdTech sub-segments',
    ],
    relatedServiceSlugs: ['custom-software', 'ai-machine-learning', 'mobile-apps'],
    statValue: 'Adaptive',
    statLabel: 'AI-personalized learning',
    seoTitle: 'Education & EdTech Software Development | Quantyro',
    seoDescription: 'AI-powered tutoring, live classrooms, and school management systems engineered for EdTech platforms and corporate training teams.',
  },
  {
    id: 'ind-5',
    num: '05',
    slug: 'dating-social',
    title: 'Dating & Social',
    desc: 'Matchmaking algorithms, real-time messaging, and identity verification for dating and social platforms — where trust and safety are the product, not a feature.',
    challenges: [
      'Building genuine trust through photo and identity verification',
      'Matchmaking that feels relevant, not random',
      'Real-time messaging and video at scale',
      'Moderation and fraud/bot prevention',
    ],
    capabilities: [
      'AI-powered matchmaking and compatibility scoring',
      'Real-time chat and video calling infrastructure',
      'Photo and identity verification systems',
      'Geolocation-based discovery and matching',
      'Automated content moderation and fraud detection',
      'Swipe-based and preference-based discovery UI',
      'Push notifications and re-engagement flows',
      'Privacy controls and reporting/blocking tools',
    ],
    marketStats: [
      'Global dating app users are projected to exceed 450 million by 2028–2029',
      'The dating app industry is projected to surpass $10 billion in value by 2026',
      'Trust and safety features increasingly drive platform choice over feature count alone',
    ],
    relatedServiceSlugs: ['mobile-apps', 'ai-machine-learning', 'custom-software'],
    statValue: 'AI-Matched',
    statLabel: 'Compatibility scoring',
    seoTitle: 'Dating & Social App Development | Quantyro',
    seoDescription: 'AI-powered matchmaking, real-time messaging, and identity verification systems engineered for dating and social discovery platforms.',
  },
  {
    id: 'ind-6',
    num: '06',
    slug: 'ecommerce-retail',
    title: 'E-Commerce & Retail',
    desc: 'Headless storefronts and inventory systems engineered for peak traffic — Black Friday-proof architecture, not a plugin patched onto a template.',
    challenges: [
      'Checkout latency under peak holiday traffic',
      'Real-time inventory sync across channels and warehouses',
      'Cart abandonment from slow, template-based storefronts',
      'ERP and fulfillment system integration',
    ],
    capabilities: [
      'Headless storefronts on Next.js with edge caching',
      'Sub-second checkout and payment orchestration',
      'Omnichannel real-time inventory synchronization',
      'ERP and fulfillment system integration',
      'AI-driven product recommendation engines',
      'Visual and voice-enabled search',
      'AR/VR virtual try-on and product previews',
      'Marketplace and multi-vendor portal support',
    ],
    marketStats: [
      'The global e-commerce market is valued at over $20 trillion',
      'Online is projected to account for roughly a quarter of all retail purchases by 2027',
      'Sub-second page load times measurably reduce cart abandonment rates',
    ],
    relatedServiceSlugs: ['e-commerce', 'ai-machine-learning', 'cloud-devops'],
    statValue: '<30ms',
    statLabel: 'Edge response time',
    seoTitle: 'Headless E-Commerce Development for Retail | Quantyro',
    seoDescription: 'Headless storefronts, real-time inventory sync, and peak-traffic-proof checkout systems built for e-commerce and retail brands.',
  },
  {
    id: 'ind-7',
    num: '07',
    slug: 'real-estate-proptech',
    title: 'Real Estate & PropTech',
    desc: 'Property search, virtual tours, and transaction management platforms that turn a slow, manual buying and renting process into a self-serve digital one.',
    challenges: [
      'Manual, spreadsheet-driven listing and lead management',
      'Buyers expecting rich media and virtual tours before visiting',
      'Fragmented workflows across agents, brokers, and buyers',
      'MLS and third-party listing data integration',
    ],
    capabilities: [
      'AI-driven property search and recommendation engines',
      'Virtual 3D tours and AR/VR walkthroughs',
      'MLS and third-party listing data integration',
      'Lead and commission management for brokers',
      'Document management with e-signature',
      'Mortgage and affordability calculators',
      'Geofenced price-drop and new-listing alerts',
      'Tenant screening and property management tools',
    ],
    marketStats: [
      'Roughly 70% of home buyers begin their property search online',
      'PropTech investment continues to grow as buyers expect rich media before scheduling a visit',
      'Listings with virtual tours consistently see higher engagement than photo-only listings',
    ],
    relatedServiceSlugs: ['custom-software', 'mobile-apps', 'ai-machine-learning'],
    statValue: '3D/AR',
    statLabel: 'Virtual tour ready',
    seoTitle: 'Real Estate & PropTech Software Development | Quantyro',
    seoDescription: 'AI-driven property search, virtual tour platforms, and MLS-integrated listing systems engineered for real estate and PropTech businesses.',
  },
  {
    id: 'ind-8',
    num: '08',
    slug: 'healthcare-telemedicine',
    title: 'Healthcare & Telemedicine',
    desc: 'HIPAA-compliant patient platforms, telemedicine, and EHR integrations built with zero-trust security as the default, not a retrofit before a compliance review.',
    challenges: [
      'HIPAA and HL7/FHIR interoperability requirements',
      'Fragmented patient data across EHR systems',
      'Secure telemedicine infrastructure at scale',
      'Medication adherence and patient engagement',
    ],
    capabilities: [
      'HIPAA-compliant patient portals and telemedicine platforms',
      'HL7/FHIR-based EHR interoperability',
      'Remote patient monitoring and IoT device integration',
      'Zero-trust access control for clinical data',
      'Medical billing and appointment scheduling systems',
      'E-prescription and pharmacy integration',
      'Doctor-side dashboards and patient data insights',
      'Multi-provider and multi-clinic support',
    ],
    marketStats: [
      'The global digital health market is valued at well over $1 trillion',
      'A large and growing share of chronic-disease patients now rely on smartphones to manage care',
      'Telemedicine adoption remains structurally higher than pre-2020 levels across most regions',
    ],
    relatedServiceSlugs: ['custom-software', 'cloud-devops', 'ai-machine-learning'],
    statValue: 'Zero-Trust',
    statLabel: 'Security architecture',
    seoTitle: 'Healthcare & Telemedicine Software Development | Quantyro',
    seoDescription: 'HIPAA-compliant patient portals, telemedicine platforms, and EHR-integrated systems engineered for healthcare providers.',
  },
];

async function fetchIndustries(): Promise<Industry[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('industries')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return SAMPLE_INDUSTRIES;
    }

    return data.map((row, index) => ({
      id: row.id,
      num: String(index + 1).padStart(2, '0'),
      slug: row.slug,
      title: row.title,
      desc: row.description,
      challenges: row.challenges ?? [],
      capabilities: row.capabilities ?? [],
      marketStats: row.market_stats ?? [],
      relatedServiceSlugs: row.related_service_slugs ?? [],
      statValue: row.stat_value,
      statLabel: row.stat_label,
      seoTitle: row.seo_title ?? null,
      seoDescription: row.seo_description ?? null,
      targetKeywords: row.target_keywords ?? [],
    }));
  } catch (err) {
    console.error('[getIndustries] falling back to sample industries', err);
    return SAMPLE_INDUSTRIES;
  }
}

export const getIndustries = unstable_cache(fetchIndustries, ['industries'], {
  tags: ['industries'],
  revalidate: 60,
});

async function fetchIndustryBySlug(slug: string): Promise<Industry | null> {
  const industries = await getIndustries();
  return industries.find((i) => i.slug === slug) ?? null;
}

export const getIndustryBySlug = unstable_cache(fetchIndustryBySlug, ['industry-by-slug'], {
  tags: ['industries'],
  revalidate: 60,
});
