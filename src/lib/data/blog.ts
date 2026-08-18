import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { BlogPost, BlogComment } from '@/lib/types';

export const SAMPLE_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'architecting-high-concurrency-microservices-nextjs-nodejs',
    title: 'Architecting Resilient High-Concurrency Microservices with Next.js & Node.js',
    excerpt: 'A comprehensive technical blueprint for scaling decoupled fullstack web applications under burst traffic spikes, featuring edge caching, event streaming, and distributed circuit breakers.',
    content: `## The Modern Fullstack Concurrency Challenge

Enterprise web applications regularly face unpredictable traffic surges during product launches and high-volume transaction windows. Designing an application layer that degrades gracefully without crashing requires combining edge rendering with resilient asynchronous backend architectures.

### Decoupling Client-Side State from Core Compute

When scaling high-throughput web platforms, isolating the user presentation layer from transactional database writes is crucial.

#### 1. Edge-Distributed Caching Strategies
Distributing static assets and edge-rendered server responses globally reduces round-trip times (RTT) to sub-30ms for 90% of user requests.

##### Granular Stale-While-Revalidate Invalidation
Leveraging tag-based on-demand cache revalidation prevents stale cache anomalies across multi-region deployments.

#### 2. Event-Driven Asynchronous Message Queuing
Offloading compute-heavy tasks like report generation and external webhooks to Kafka or Redis message streams preserves HTTP request throughput.

### Database Connection Management and Pooling

Database connection exhaustion represents one of the most common bottlenecks in serverless and containerized Node.js workloads.

#### Tactical Connection Optimization Techniques
- **Serverless Connection Pooling**: Utilizing managed PgBouncer and Supabase connection pools to prevent max connection timeouts.
- **Read-Replica Query Routing**: Splitting analytical read queries away from transactional write masters.
- **Idempotency Keys for Write Retries**: Enforcing unique transaction keys to safely retry failed network requests.

##### Circuit Breaker Fault Isolation
Wrapping third-party API dependencies in automated circuit breakers prevents downstream outages from cascading into full application downtime.

## Long-Term Architectural Recommendations

Always design for failure: incorporate distributed OpenTelemetry tracing, configure proactive CPU/memory auto-scaling triggers, and perform regular chaos engineering drills.`,
    authorName: 'Quantyro Engineering Team',
    publishedAt: '2026-08-10T10:00:00Z',
    seoTitle: 'Architecting Resilient High-Concurrency Microservices | Quantyro',
    seoDescription: 'Learn how to architect high-concurrency Next.js and Node.js microservices with edge caching, distributed queuing, and automated circuit breakers.',
    tags: ['Architecture', 'Backend', 'Next.js', 'Performance'],
    accent: 'accent',
  },
  {
    id: 'post-2',
    slug: 'practical-llm-integration-enterprise-rag-vector-search',
    title: 'Practical Enterprise AI: Building Production-Grade RAG with Vector Search',
    excerpt: 'Step-by-step architectural breakdown of implementing high-accuracy Retrieval-Augmented Generation (RAG) pipelines with hybrid keyword-vector search and strict data privacy.',
    content: `## Bridging Large Language Models with Proprietary Business Data

Generative AI models provide incredible reasoning capabilities out-of-the-box, but they lack internal domain context. Retrieval-Augmented Generation (RAG) bridges this gap by grounding responses in enterprise knowledge stores.

### The Multi-Stage Retrieval Pipeline

A naive vector similarity lookup is rarely sufficient for production enterprise search. High accuracy requires a multi-stage hybrid retrieval strategy.

#### 1. Document Ingestion & Chunking Optimization
Raw documents must be chunked with semantic boundary awareness rather than arbitrary token counts.

##### Dynamic Overlapping Chunk Windows
Employing 512-token chunks with 15% sliding window overlap preserves contextual continuity across complex tabular documents.

#### 2. Hybrid Dense-Sparse Vector Retrieval
Combining dense embeddings (e.g. text-embedding-3-large) with sparse BM25 keyword matching ensures precise domain terminology lookup.

### Reducing Hallucinations with Reranking and Context Filtering

Feeding irrelevant search results into the model context window increases token costs and drives hallucinations.

#### Production RAG Optimization Tactics
- **Cross-Encoder Reranking**: Re-scoring top-50 vector search candidates down to the top-5 most relevant context fragments.
- **Strict Role-Based Document Access (RBAC)**: Enforcing document-level security filtering before vector indexing occurs.
- **Deterministic Citation Grounding**: Requiring the LLM to output verified bracketed source references for every factual claim.

##### Guardrail Prompt Defense
Integrating prompt injection filters and deterministic output schema validation prevents malicious prompt overrides.

## Enterprise Deployment Checklist

Monitor retrieval accuracy with automated evaluation metrics (Hit Rate, MRR, Context Precision), maintain vector index backups, and cache frequent query completions.`,
    authorName: 'Quantyro AI Guild',
    publishedAt: '2026-08-04T12:30:00Z',
    seoTitle: 'Enterprise RAG & Vector Search Architecture Guide | Quantyro',
    seoDescription: 'How to build production-grade enterprise RAG systems with hybrid vector search, cross-encoder reranking, and zero-trust security.',
    tags: ['AI & ML', 'Vector Search', 'Cloud & DevOps', 'Architecture'],
    accent: 'accent-2',
  },
  {
    id: 'post-3',
    slug: 'mastering-technical-seo-nextjs-core-web-vitals',
    title: 'Mastering Technical SEO & Core Web Vitals with Next.js App Router',
    excerpt: 'How we achieve 100/100 Google Lighthouse scores, instant First Contentful Paint, and rich structured JSON-LD data graphs for enterprise search visibility.',
    content: `## The Modern Search Engine Optimization Reality

Search engine algorithms reward websites that load instantaneously, exhibit zero visual layout shift, and present unambiguous semantic content structures.

### Optimizing the Critical Rendering Path

Reducing client-side JavaScript execution is the fastest route to top-tier Core Web Vitals rankings.

#### 1. Server-Rendered Component Foundations
Executing code on high-speed server runtimes ensures search crawlers receive complete, hydrated HTML on the initial network packet.

##### Zero-Layout-Shift Font & Image Strategies
Preloading variable display fonts and configuring Next.js responsive image sizes guarantees Cumulative Layout Shift (CLS) scores below 0.01.

#### 2. Dynamic JSON-LD Schema Graphs
Injecting structured metadata provides search engines with direct entity knowledge graphs.

### Essential Structured Data Formats for 2026

Providing rich metadata unlocks search result rich snippets and enhanced AI search engine previews.

#### Critical SEO Implementation Vectors
- **Organization & Author E-E-A-T Signals**: Associating publications with certified engineering organizations.
- **Interactive FAQPage Schema**: Embedding structured Q&A accordions directly into search engine snippet results.
- **Hierarchical BreadcrumbList Mapping**: Clarifying site navigation and category depth for crawl spiders.

##### Canonical URL Integrity
Enforcing self-referencing canonical tags prevents duplicate content penalties caused by campaign UTM parameters and dynamic filters.

## Summary

Combining server-rendered speed, semantic heading structures, and automated JSON-LD schema graphs builds the foundation for long-term organic authority.`,
    authorName: 'Quantyro Search & Performance',
    publishedAt: '2026-07-28T14:15:00Z',
    seoTitle: 'Next.js App Router Technical SEO & Core Web Vitals | Quantyro',
    seoDescription: 'Master modern technical SEO with Next.js App Router: 100/100 Core Web Vitals, JSON-LD schema graphs, and automated canonical enforcement.',
    tags: ['Technical', 'Web Dev', 'Performance', 'Next.js'],
    accent: 'accent',
  },
];

function mapPost(row: Record<string, unknown>): BlogPost {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    content: row.content as string,
    authorName: row.author_name as string,
    publishedAt: (row.published_at as string) ?? null,
    seoTitle: (row.seo_title as string) ?? null,
    seoDescription: (row.seo_description as string) ?? null,
    tags: (row.tags as string[]) ?? [],
    accent: (row.accent as 'accent' | 'accent-2') ?? 'accent',
  };
}

async function fetchPublishedPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .or(`status.eq.published,and(status.eq.scheduled,published_at.lte.${new Date().toISOString()})`)
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return SAMPLE_BLOG_POSTS;
    }
    return data.map(mapPost);
  } catch (err) {
    console.error('[getPublishedPosts] falling back to sample posts', err);
    return SAMPLE_BLOG_POSTS;
  }
}

export const getPublishedPosts = unstable_cache(fetchPublishedPosts, ['blog-posts'], {
  tags: ['blog-posts'],
  revalidate: 60,
});

async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) {
      return mapPost(data);
    }
    const sample = SAMPLE_BLOG_POSTS.find((p) => p.slug === slug);
    return sample ?? null;
  } catch {
    const sample = SAMPLE_BLOG_POSTS.find((p) => p.slug === slug);
    return sample ?? null;
  }
}

export const getPostBySlug = unstable_cache(fetchPostBySlug, ['blog-post-by-slug'], {
  tags: ['blog-posts'],
  revalidate: 60,
});

export async function getRelatedPosts(currentSlug: string, tags: string[] = [], limit: number = 3): Promise<BlogPost[]> {
  const all = await getPublishedPosts();
  const others = all.filter((p) => p.slug !== currentSlug);
  if (tags.length === 0) return others.slice(0, limit);

  // Score by matching tags
  const scored = others.map((post) => {
    const common = post.tags.filter((t) => tags.includes(t)).length;
    return { post, score: common };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

async function fetchApprovedComments(postId: string): Promise<BlogComment[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('post_id', postId)
      .eq('status', 'approved')
      .order('created_at', { ascending: true });

    if (error) {
      return [];
    }
    return (data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      comment: row.comment,
      createdAt: row.created_at,
    }));
  } catch {
    return [];
  }
}

export const getApprovedComments = unstable_cache(fetchApprovedComments, ['blog-comments'], {
  tags: ['blog-comments'],
  revalidate: 60,
});

