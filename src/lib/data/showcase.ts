import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';

export interface ShowcaseMetric {
  label: string;
  value: string;
}

export interface ShowcaseItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: ShowcaseMetric[];
  accentColor: string;
  deviceType: 'mobile' | 'laptop';
  screenType: 'web' | 'ai' | 'healthcare' | 'seo';
  sortOrder?: number;
  isActive?: boolean;
}

export const DEFAULT_SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'enterprise-web',
    tag: 'Web & Enterprise Platforms',
    title: 'High-Performance Websites & Multi-Tenant SaaS Dashboards',
    subtitle: 'Mission-critical web platforms handling millions of real-time transactions with zero downtime and instant page loads.',
    description: 'Engineered with Next.js 15, streaming server components, distributed PostgreSQL connection pooling, and global edge caching for 100/100 Core Web Vitals.',
    metrics: [
      { label: 'Deployment Model', value: 'Zero-Downtime' },
      { label: 'Delivery', value: 'Edge-Cached' },
      { label: 'Core Web Vitals', value: 'Optimized' },
    ],
    accentColor: '#1768D6',
    deviceType: 'laptop',
    screenType: 'web',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'seo-marketing',
    tag: 'SEO & Organic Growth',
    title: 'Technical SEO, Search Visibility & Growth Architecture',
    subtitle: 'Programmatic SEO, structured entity graphs, and extreme performance engineering for dominant search engine rankings.',
    description: 'We engineer automated JSON-LD graphs, sub-50ms TTFB edge caching, self-referencing canonical architectures, and 100/100 Core Web Vitals to outrank competitors organically.',
    metrics: [
      { label: 'Lighthouse SEO', value: 'Optimized' },
      { label: 'Search Visibility', value: 'Engineered for Growth' },
      { label: 'Indexing', value: 'Fast & Structured' },
    ],
    accentColor: '#10B981',
    deviceType: 'laptop',
    screenType: 'seo',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'ai-copilot',
    tag: 'AI & Enterprise Automation',
    title: 'Autonomous AI Copilots & Real-Time RAG Pipelines',
    subtitle: 'Enterprise-grade conversational intelligence connected directly to proprietary data stores.',
    description: 'We architect low-latency vector search pipelines, multi-agent orchestrators, and contextual LLM copilots that reduce operational workflow times by up to 70%.',
    metrics: [
      { label: 'Response', value: 'Low-Latency' },
      { label: 'Grounded Answers', value: 'RAG-Powered' },
      { label: 'Workflow Impact', value: 'Automation-Driven' },
    ],
    accentColor: '#0EBCD4',
    deviceType: 'mobile',
    screenType: 'ai',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 'healthcare-app',
    tag: 'Cloud & Mobile Ecosystems',
    title: 'HIPAA-Compliant Portals & Cross-Platform Applications',
    subtitle: 'Full-featured web portals and companion mobile applications designed with zero-trust data enclaves.',
    description: 'Delivering end-to-end encrypted medical telemetry, automated appointment routing, and offline-first synchronization for modern clinical systems.',
    metrics: [
      { label: 'Data Handling', value: 'HIPAA-Aware Design' },
      { label: 'UX Focus', value: 'Retention-Driven' },
      { label: 'Design Approach', value: 'User-Tested' },
    ],
    accentColor: '#6366F1',
    deviceType: 'mobile',
    screenType: 'healthcare',
    sortOrder: 4,
    isActive: true,
  },
];

async function fetchShowcaseItems(): Promise<ShowcaseItem[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('showcase_items')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_SHOWCASE_ITEMS;
    }

    return data.map((row) => ({
      id: row.id || row.slug,
      tag: row.tag,
      title: row.title,
      subtitle: row.subtitle,
      description: row.description,
      metrics: Array.isArray(row.metrics)
        ? row.metrics
        : [
            { label: row.metric_1_label || 'Metric 1', value: row.metric_1_value || 'Optimized' },
            { label: row.metric_2_label || 'Metric 2', value: row.metric_2_value || 'High-Performance' },
            { label: row.metric_3_label || 'Metric 3', value: row.metric_3_value || 'Low-Latency' },
          ],
      accentColor: row.accent_color || '#1768D6',
      deviceType: row.device_type || 'laptop',
      screenType: row.screen_type || 'web',
      sortOrder: row.sort_order ?? 0,
      isActive: row.is_active ?? true,
    }));
  } catch {
    return DEFAULT_SHOWCASE_ITEMS;
  }
}

export const getShowcaseItems = unstable_cache(fetchShowcaseItems, ['showcase-items'], {
  tags: ['showcase-items'],
  revalidate: 60,
});
