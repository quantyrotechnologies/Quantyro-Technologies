import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { Service } from '@/lib/types';

export const SAMPLE_SERVICES: Service[] = [
  {
    id: 'svc-1',
    num: '01',
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
    seoTitle: 'Custom Software Development & Enterprise SaaS Engineering | Quantyro',
    seoDescription: 'Bespoke enterprise software development and scalable fullstack web engineering built for ambitious high-growth companies.',
  },
  {
    id: 'svc-2',
    num: '02',
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
    seoTitle: 'Enterprise AI & Machine Learning Engineering | Quantyro',
    seoDescription: 'Build production-ready AI solutions, vector search pipelines, and autonomous agents grounded in your private enterprise data.',
  },
  {
    id: 'svc-3',
    num: '03',
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
    seoTitle: 'Cloud Architecture & DevOps Engineering | Quantyro',
    seoDescription: 'Enterprise cloud infrastructure, automated CI/CD pipelines, and 99.99% availability SLAs engineered by certified cloud architects.',
  },
  {
    id: 'svc-4',
    num: '04',
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
    seoTitle: 'Cross-Platform Mobile App Development (iOS & Android) | Quantyro',
    seoDescription: 'Build beautiful, high-retention mobile applications with offline-first synchronization and native device performance.',
  },
  {
    id: 'svc-5',
    num: '05',
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
    seoTitle: 'Headless E-Commerce Development & Storefronts | Quantyro',
    seoDescription: 'Sub-second headless e-commerce platforms engineered for extreme peak traffic, instant checkout, and maximum conversion rates.',
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
      seoTitle: row.seo_title ?? null,
      seoDescription: row.seo_description ?? null,
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

