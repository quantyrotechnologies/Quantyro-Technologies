import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { Service } from '@/lib/types';

export const SAMPLE_SERVICES: Service[] = [
  {
    id: 'svc-6',
    num: '01',
    slug: 'website-development',
    title: 'Website Development',
    desc: 'SEO-first websites and web platforms — from MERN-stack applications to PHP/Laravel enterprise sites — engineered for search visibility and Core Web Vitals from the first commit, not retrofitted before launch.',
    capabilities: [
      'Technical SEO Architecture — Core Web Vitals, Semantic HTML & Schema Markup',
      'MERN Stack Web Applications (MongoDB, Express, React, Node.js)',
      'PHP & Laravel Enterprise Web Platforms',
      'Next.js & React Server-Rendered Marketing Sites',
      'WordPress & Headless CMS Development',
      'Progressive Web Apps (PWA) & JAMstack Architecture',
    ],
    stack: ['Next.js 15', 'React', 'Node.js', 'MongoDB', 'PHP', 'Laravel', 'WordPress', 'MySQL'],
    imageUrl: null,
    seoTitle: 'Website Development Services (SEO-First) | Quantyro',
    seoDescription: 'SEO-optimized website development across MERN, React, PHP, and Laravel — built for Core Web Vitals, technical SEO, and search visibility from day one.',
    targetKeywords: ['website development services', 'web development company', 'custom website development', 'custom website development services', 'web development services', 'website development company in India', 'website development services in India', 'SEO-friendly website development', 'SEO-ready website development'],
  },
  {
    id: 'svc-5',
    num: '02',
    slug: 'e-commerce',
    title: 'Modern Headless E-Commerce',
    desc: 'Composible headless storefronts, ultra-fast checkout funnels, dynamic inventory orchestration, and ERP integrations built for high-conversion global retail.',
    capabilities: [
      'Headless Next.js Storefront & Edge Caching',
      'Sub-Second Checkout & Global Payment Routing',
      'Omnichannel Real-Time Inventory Synchronization',
      'Personalized AI Recommendation Engines',
      'Automated Multi-Currency & Tax Localization',
    ],
    stack: ['Next.js 15', 'Shopify Plus', 'Medusa.js', 'Stripe', 'Algolia', 'Tailwind CSS', 'Redis'],
    imageUrl: null,
    seoTitle: 'Headless E-Commerce Development & Storefronts | Quantyro',
    seoDescription: 'Sub-second headless e-commerce platforms engineered for extreme peak traffic, instant checkout, and maximum conversion rates.',
    targetKeywords: ['e-commerce website development', 'e-commerce development company', 'custom e-commerce development', 'custom e-commerce development services', 'e-commerce development services', 'e-commerce development company in India', 'e-commerce development services in India', 'headless e-commerce development', 'Shopify Plus development company'],
  },
  {
    id: 'svc-4',
    num: '03',
    slug: 'mobile-apps',
    title: 'Mobile App Development',
    desc: 'High-performance native and cross-platform iOS & Android mobile applications engineered with 60fps animations, offline-first data sync, and hardware-level biometrics.',
    capabilities: [
      'Cross-Platform React Native & Flutter Architecture',
      'Native Swift & Kotlin Module Integration',
      'Offline-First IndexedDB & SQLite Sync',
      'Biometric Security & Hardware Telemetry',
      'Automated App Store & Google Play CI/CD Deployment',
    ],
    stack: ['React Native', 'Flutter', 'TypeScript', 'Swift', 'Kotlin', 'SQLite', 'Firebase', 'Fastlane'],
    imageUrl: null,
    seoTitle: 'Cross-Platform Mobile App Development (iOS & Android) | Quantyro',
    seoDescription: 'Build beautiful, high-retention mobile applications with offline-first synchronization and native device performance.',
    targetKeywords: ['mobile app development services', 'mobile app development company', 'custom mobile app development', 'custom mobile app development services', 'app development services', 'mobile app development company in India', 'mobile app development services in India', 'iOS and Android app development', 'cross-platform app development company'],
  },
  {
    id: 'svc-1',
    num: '04',
    slug: 'custom-software',
    title: 'Custom Software Development',
    desc: 'Bespoke web applications, enterprise SaaS platforms, and distributed microservices architected from day one for extreme scale, security, and high transactional concurrency.',
    capabilities: [
      'Distributed Microservices & Event Streaming',
      'High-Concurrency Next.js & Node.js Architecture',
      'Role-Based Multi-Tenant SaaS Enclaves',
      'Zero-Downtime Blue/Green CI/CD Pipelines',
      'API Gateway & Sub-Millisecond gRPC Protocols',
    ],
    stack: ['Next.js 15', 'TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    imageUrl: null,
    seoTitle: 'Custom Software Development & Enterprise SaaS Engineering | Quantyro',
    seoDescription: 'Bespoke enterprise software development and scalable fullstack web engineering built for ambitious high-growth companies.',
    targetKeywords: ['custom software development services', 'software development company', 'custom software development', 'bespoke software development services', 'software development services', 'custom software development company in India', 'software development services in India', 'enterprise software development company', 'SaaS product development services'],
  },
  {
    id: 'svc-2',
    num: '05',
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning Solutions',
    desc: 'Production-grade AI integration: deterministic RAG architectures, high-accuracy vector search, autonomous workflow agents, and custom domain-specific LLM fine-tuning.',
    capabilities: [
      'Hybrid Dense-Sparse Vector Search Pipelines',
      'Autonomous Multi-Agent Workflow Orchestration',
      'Zero-Data-Leakage Enterprise Knowledge Enclaves',
      'Domain Model Fine-Tuning & Quantization',
      'Real-Time Multimodal Vision & Audio Processing',
    ],
    stack: ['Python', 'PyTorch', 'LangChain', 'LlamaIndex', 'Pinecone', 'Qdrant', 'OpenAI', 'vLLM'],
    imageUrl: null,
    seoTitle: 'Enterprise AI & Machine Learning Engineering | Quantyro',
    seoDescription: 'Build production-ready AI solutions, vector search pipelines, and autonomous agents grounded in your private enterprise data.',
    targetKeywords: ['AI development services', 'AI development company', 'custom AI solutions', 'machine learning development services', 'AI and ML development services', 'AI development company in India', 'machine learning development services in India', 'generative AI development company', 'RAG pipeline development services'],
  },
  {
    id: 'svc-7',
    num: '06',
    slug: 'seo-marketing',
    title: 'SEO & Marketing',
    desc: 'Technical SEO, structured data, and performance marketing systems built by engineers — Core Web Vitals, schema markup, and content architecture treated as production infrastructure, not agency guesswork.',
    capabilities: [
      'Technical SEO Audits & Core Web Vitals Optimization',
      'Structured Data & Schema Markup Implementation',
      'Content Architecture & Keyword-Driven Information Design',
      'Programmatic SEO for Multi-Location & Multi-Service Pages',
      'Conversion-Rate Optimization & A/B Testing Infrastructure',
      'Marketing Analytics & Attribution Pipeline Engineering',
    ],
    stack: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'GA4', 'Google Tag Manager', 'Next.js', 'Schema.org', 'PostHog'],
    imageUrl: null,
    seoTitle: 'SEO & Marketing Services (Engineer-Led) | Quantyro',
    seoDescription: 'Technical SEO, structured data, and performance marketing engineered by developers — Core Web Vitals, schema markup, and measurable organic growth.',
    targetKeywords: ['SEO services', 'SEO company', 'technical SEO services', 'SEO agency', 'digital marketing services', 'SEO company in India', 'SEO services in India', 'Core Web Vitals optimization services', 'programmatic SEO agency'],
  },
  {
    id: 'svc-3',
    num: '07',
    slug: 'cloud-devops',
    title: 'Cloud Architecture & DevOps',
    desc: 'Resilient multi-region cloud infrastructure, Infrastructure-as-Code automation, Kubernetes cluster orchestration, and 24/7 observability with automated self-healing.',
    capabilities: [
      'Multi-Region Automated Failover Architecture',
      'Kubernetes (K8s) Autoscaling & Mesh Orchestration',
      'Terraform & OpenTofu Infrastructure-as-Code',
      'Zero-Trust Network Microsegmentation',
      'Real-Time APM Distributed Tracing & Telemetry',
    ],
    stack: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Docker', 'GitHub Actions', 'Datadog', 'ArgoCD'],
    imageUrl: null,
    seoTitle: 'Cloud Architecture & DevOps Engineering | Quantyro',
    seoDescription: 'Enterprise cloud infrastructure, automated CI/CD pipelines, and high-availability architecture engineered by senior cloud engineers.',
    targetKeywords: ['cloud DevOps services', 'DevOps consulting company', 'cloud infrastructure services', 'cloud migration services', 'DevOps services', 'DevOps consulting company in India', 'cloud infrastructure services in India', 'AWS cloud infrastructure company', 'Kubernetes consulting services'],
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

