import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { Service } from '@/lib/types';

export const SAMPLE_SERVICES: Service[] = [
  {
    id: 'svc-6',
    num: '01',
    slug: 'website-development',
    title: 'Website Development',
    desc: 'Enterprise-grade, SEO-first web applications and digital platforms engineered for high conversion, sub-second load times, and perfect Core Web Vitals. From complex MERN-stack portals to modern Next.js 15 and PHP/Laravel systems, we deliver production-ready code with 100% IP ownership.',
    capabilities: [
      'Technical SEO & Core Web Vitals',
      'MERN & Next.js 15 Applications',
      'PHP & Laravel Enterprise Systems',
      'Headless CMS & Scalable Platforms',
      'Progressive Web Apps (PWA)',
    ],
    stack: ['Next.js 15', 'React', 'Node.js', 'MongoDB', 'PHP', 'Laravel', 'WordPress', 'MySQL', 'TypeScript', 'Tailwind CSS'],
    imageUrl: null,
    seoTitle: 'Enterprise Website Development Services & Custom Full-Stack Web Engineering',
    seoDescription: 'Partner with senior web engineers for high-converting, SEO-optimized website development across Next.js, MERN, React, and Laravel — engineered for speed, ranking, and business growth.',
    targetKeywords: ['website development services', 'web development company', 'custom website development', 'custom website development services', 'web development services', 'website development company in India', 'website development services in India', 'SEO-friendly website development', 'SEO-ready website development', 'enterprise web development agency', 'Next.js web development company'],
  },
  {
    id: 'svc-5',
    num: '02',
    slug: 'e-commerce',
    title: 'Modern Headless E-Commerce',
    desc: 'Composable headless storefronts, frictionless checkout funnels, dynamic inventory orchestration, and ERP integrations built for high-volume global retail brands. We engineer lightning-fast digital storefronts that eliminate cart abandonment and scale effortlessly.',
    capabilities: [
      'Headless Next.js Storefronts',
      'Sub-Second Checkout & Payments',
      'Real-Time ERP & Inventory Sync',
      'AI Recommendation Engines',
      'Multi-Currency & Global Tax',
    ],
    stack: ['Next.js 15', 'Shopify Plus', 'Medusa.js', 'Stripe', 'Algolia', 'Tailwind CSS', 'Redis', 'PostgreSQL'],
    imageUrl: null,
    seoTitle: 'Headless E-Commerce Development Services & Custom Shopify Plus Engineering',
    seoDescription: 'Scale your online revenue with sub-second headless e-commerce platforms, custom Shopify Plus storefronts, and automated checkout funnels built for extreme peak traffic.',
    targetKeywords: ['e-commerce website development', 'e-commerce development company', 'custom e-commerce development', 'custom e-commerce development services', 'e-commerce development services', 'e-commerce development company in India', 'e-commerce development services in India', 'headless e-commerce development', 'Shopify Plus development company', 'Medusa.js headless store development'],
  },
  {
    id: 'svc-4',
    num: '03',
    slug: 'mobile-apps',
    title: 'Mobile App Development',
    desc: 'High-retention, native and cross-platform iOS & Android mobile applications engineered with buttery-smooth 60fps animations, robust offline-first synchronization, and hardware-grade security for enterprise and consumer scale.',
    capabilities: [
      'iOS & Android Native Delivery',
      'React Native & Flutter 60fps',
      'Offline-First Synchronization',
      'Biometric Telemetry & Security',
      'Automated App Store CI/CD',
    ],
    stack: ['React Native', 'Flutter', 'TypeScript', 'Swift', 'Kotlin', 'SQLite', 'Firebase', 'Fastlane', 'PostgreSQL'],
    imageUrl: null,
    seoTitle: 'Cross-Platform Mobile App Development Services (iOS & Android)',
    seoDescription: 'Build high-performance, offline-capable iOS and Android mobile apps with senior engineers. Native Swift, Kotlin, React Native, and Flutter app development.',
    targetKeywords: ['mobile app development services', 'mobile app development company', 'custom mobile app development', 'custom mobile app development services', 'app development services', 'mobile app development company in India', 'mobile app development services in India', 'iOS and Android app development', 'cross-platform app development company', 'React Native development agency'],
  },
  {
    id: 'svc-1',
    num: '04',
    slug: 'custom-software',
    title: 'Custom Software Development',
    desc: 'Bespoke enterprise software, scalable multi-tenant SaaS platforms, and distributed microservices architected from ground zero for mission-critical reliability, bank-grade data security, and high transactional concurrency.',
    capabilities: [
      'Distributed Microservices & APIs',
      'Multi-Tenant SaaS Architecture',
      'High-Concurrency Backend Systems',
      'Zero-Downtime Blue/Green CI/CD',
      'High-Throughput GraphQL Gateways',
    ],
    stack: ['Next.js 15', 'TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Kubernetes'],
    imageUrl: null,
    seoTitle: 'Custom Software Development Company & Enterprise SaaS Product Engineering',
    seoDescription: 'Bespoke enterprise software engineering, scalable multi-tenant SaaS platforms, and cloud-native microservices engineered by dedicated senior software architects.',
    targetKeywords: ['custom software development services', 'software development company', 'custom software development', 'bespoke software development services', 'software development services', 'custom software development company in India', 'software development services in India', 'enterprise software development company', 'SaaS product development services', 'custom software engineering firm'],
  },
  {
    id: 'svc-2',
    num: '05',
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning Solutions',
    desc: 'Production-ready AI systems and autonomous agent workflows grounded in your private enterprise data. We engineer deterministic RAG pipelines, high-precision vector search architectures, and domain-specific LLM fine-tuning.',
    capabilities: [
      'Enterprise Vector Search & RAG',
      'Autonomous Multi-Agent Systems',
      'Private LLM Data Enclaves',
      'Domain Model Fine-Tuning',
      'Multimodal Document Intelligence',
    ],
    stack: ['Python', 'PyTorch', 'LangChain', 'LlamaIndex', 'Pinecone', 'Qdrant', 'OpenAI', 'vLLM', 'FastAPI'],
    imageUrl: null,
    seoTitle: 'Enterprise AI & Machine Learning Development Services | Custom Generative AI',
    seoDescription: 'Unlock business automation with production-grade AI solutions, custom enterprise RAG pipelines, vector search, and autonomous multi-agent workflows built on your proprietary data.',
    targetKeywords: ['AI development services', 'AI development company', 'custom AI solutions', 'machine learning development services', 'AI and ML development services', 'AI development company in India', 'machine learning development services in India', 'generative AI development company', 'RAG pipeline development services', 'enterprise LLM fine-tuning'],
  },
  {
    id: 'svc-7',
    num: '06',
    slug: 'seo-marketing',
    title: 'SEO & Marketing',
    desc: 'Engineer-led technical SEO, programmatic search architecture, and performance marketing infrastructure built for aggressive organic growth, Core Web Vitals excellence, and predictable inbound pipeline generation.',
    capabilities: [
      'Technical SEO & Entity Graphs',
      'Programmatic Landing Pages',
      'Conversion Rate Optimization',
      'Core Web Vitals Engineering',
      'GA4 Server-Side Attribution',
    ],
    stack: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'GA4', 'Google Tag Manager', 'Next.js', 'Schema.org', 'PostHog'],
    imageUrl: null,
    seoTitle: 'Technical SEO Services & Engineer-Led Performance Marketing Agency',
    seoDescription: 'Dominate Google search results with developer-driven technical SEO, programmatic search architecture, Core Web Vitals optimization, and high-converting marketing funnels.',
    targetKeywords: ['SEO services', 'SEO company', 'technical SEO services', 'SEO agency', 'digital marketing services', 'SEO company in India', 'SEO services in India', 'Core Web Vitals optimization services', 'programmatic SEO agency', 'B2B technical SEO consultants'],
  },
  {
    id: 'svc-3',
    num: '07',
    slug: 'cloud-devops',
    title: 'Cloud & DevOps Engineering',
    desc: 'High-availability cloud architecture, automated CI/CD pipelines, container orchestration, and 24/7 site reliability engineering designed to maintain 99.99% uptime, strict zero-trust security, and cloud cost efficiency.',
    capabilities: [
      'Multi-Cloud AWS, GCP & Azure',
      'Kubernetes & Infrastructure-as-Code',
      'Automated Zero-Downtime CI/CD',
      'Zero-Trust VPC & Cloud Security',
      '24/7 SRE & 99.99% Availability',
    ],
    stack: ['AWS', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Datadog', 'Prometheus', 'Cloudflare'],
    imageUrl: null,
    seoTitle: 'Cloud & DevOps Consulting Services | AWS, Kubernetes & Infrastructure as Code',
    seoDescription: 'Automate deployments, scale infrastructure, and guarantee 99.99% uptime with enterprise Cloud & DevOps engineering across AWS, GCP, Azure, and Kubernetes.',
    targetKeywords: ['cloud devops services', 'cloud consulting company', 'DevOps consulting services', 'AWS consulting services', 'cloud infrastructure management', 'cloud DevOps company in India', 'DevOps services in India', 'Kubernetes consulting services', 'cloud cost optimization services', 'CI/CD pipeline automation company'],
  },
];

async function fetchServices(): Promise<Service[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return SAMPLE_SERVICES;
    }

    return data.map((row, index) => ({
      id: row.id,
      num: String(index + 1).padStart(2, '0'),
      slug: row.slug,
      title: row.title,
      desc: row.description,
      capabilities: row.capabilities ?? [],
      stack: row.stack ?? null,
      imageUrl: row.image_url ?? null,
      seoTitle: row.seo_title ?? null,
      seoDescription: row.seo_description ?? null,
      targetKeywords: row.target_keywords ?? [],
      executiveHeadline: row.executive_headline ?? null,
      executiveNarrative: row.executive_narrative ?? null,
      executivePillars: row.executive_pillars ?? null,
    }));
  } catch (err) {
    console.error('[getServices] falling back to sample services', err);
    return SAMPLE_SERVICES;
  }
}

export const getServices = unstable_cache(fetchServices, ['services'], {
  tags: ['services'],
  revalidate: 60,
});

async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getServices();
  return services.find((s) => s.slug === slug) ?? null;
}

export const getServiceBySlug = unstable_cache(fetchServiceBySlug, ['service-by-slug'], {
  tags: ['services'],
  revalidate: 60,
});

