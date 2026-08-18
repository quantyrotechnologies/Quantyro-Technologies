"use client";

import React, { useState } from 'react';

interface TechCategory {
  id: string;
  name: string;
  badge: string;
  description: string;
  tools: {
    name: string;
    role: string;
    highlight: string;
  }[];
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'ai-ml',
    name: 'AI & Vector Systems',
    badge: 'Enterprise Intelligence',
    description: 'Autonomous agents, custom RAG pipelines, semantic search, and deterministic prompt engineering.',
    tools: [
      { name: 'OpenAI & Claude', role: 'Foundation Models', highlight: 'Complex Reasoning & Tool Calling' },
      { name: 'LangChain & LlamaIndex', role: 'Agent Orchestration', highlight: 'Multi-Agent State Machines' },
      { name: 'Pinecone & Qdrant', role: 'Vector Databases', highlight: 'Sub-10ms Hybrid Vector Search' },
      { name: 'PyTorch & HuggingFace', role: 'Model Fine-Tuning', highlight: 'Domain-Specific Embeddings' },
      { name: 'Ollama & vLLM', role: 'Private On-Prem Inference', highlight: 'Zero External Data Transit' },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend & UI',
    badge: 'Zero-CLS Performance',
    description: 'Ultra-fast, accessible, and responsive user interfaces engineered for 100/100 Google Lighthouse scores.',
    tools: [
      { name: 'Next.js 15 (App Router)', role: 'React Framework', highlight: 'Streaming Edge Server Components' },
      { name: 'React 19 & TypeScript', role: 'Core Client UI', highlight: 'Type-Safe Reactive State' },
      { name: 'Tailwind CSS v4', role: 'Styling Architecture', highlight: 'Atomic Zero-Runtime Overhead' },
      { name: 'GSAP & Framer Motion', role: 'Micro-Animations', highlight: '60fps Hardware-Accelerated Motion' },
      { name: 'Radix UI Primitives', role: 'Accessibility Layer', highlight: 'Full WAI-ARIA Compliance' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    badge: 'High Concurrency',
    description: 'Resilient event-driven microservices designed for high transactional throughput and fault tolerance.',
    tools: [
      { name: 'Node.js & TypeScript', role: 'Runtime Environment', highlight: 'Asynchronous Event Loop' },
      { name: 'Go (Golang)', role: 'High-Throughput Services', highlight: 'Sub-Millisecond Concurrency' },
      { name: 'GraphQL & RESTful APIs', role: 'API Layer', highlight: 'Deterministic Schema Contracts' },
      { name: 'Apache Kafka & Redis PubSub', role: 'Event Streaming', highlight: 'Idempotent Message Queues' },
      { name: 'gRPC & Protocol Buffers', role: 'Internal RPC', highlight: 'Compact Binary Serialization' },
    ],
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & Infrastructure',
    badge: '99.99% Availability',
    description: 'Multi-region automated cloud infrastructure with automated CI/CD pipelines and zero-downtime releases.',
    tools: [
      { name: 'AWS & Google Cloud Platform', role: 'Cloud Infrastructure', highlight: 'Multi-Region High Availability' },
      { name: 'Docker & Kubernetes (K8s)', role: 'Container Orchestration', highlight: 'Automated Horizontal Pod Scaling' },
      { name: 'Terraform & OpenTofu', role: 'Infrastructure as Code', highlight: 'Deterministic Environment Replicas' },
      { name: 'GitHub Actions & ArgoCD', role: 'CI/CD Pipelines', highlight: 'Automated Canary Deployments' },
      { name: 'Datadog & OpenTelemetry', role: 'Observability & APM', highlight: 'Real-Time Distributed Tracing' },
    ],
  },
  {
    id: 'databases',
    name: 'Databases & Storage',
    badge: 'ACID Compliance',
    description: 'Distributed relational and analytical storage layers engineered for low-latency queries and zero data loss.',
    tools: [
      { name: 'PostgreSQL & Supabase', role: 'Primary Relational DB', highlight: 'Row-Level Security & Sharding' },
      { name: 'Redis & Upstash', role: 'In-Memory Cache', highlight: 'Microsecond Key-Value Retrieval' },
      { name: 'ClickHouse', role: 'Columnar Analytics', highlight: 'Real-Time Telemetry Queries' },
      { name: 'Prisma & Drizzle ORM', role: 'Type-Safe ORM', highlight: 'Automated Schema Migrations' },
    ],
  },
];

export default function TechStackHub() {
  const [activeTab, setActiveTab] = useState<string>('ai-ml');
  const currentCategory = TECH_CATEGORIES.find((c) => c.id === activeTab) || TECH_CATEGORIES[0];

  return (
    <section className="relative px-[6vw] py-[90px] md:py-[120px] z-10">
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[24px] mb-[40px] md:mb-[56px] border-b border-[var(--line)] pb-[28px]">
          <div>
            <div className="mono text-[12px] uppercase font-bold text-[var(--accent)] mb-[10px] flex items-center gap-[8px]">
              <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)]" />
              02 // Engineering &amp; Website Architecture
            </div>
            <h2 className="text-[clamp(30px,4.5vw,48px)] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.1] tracking-tight">
              Enterprise-Grade Tech Stack Matrix
            </h2>
          </div>
          <p className="max-w-[420px] text-[15px] text-[var(--muted)] leading-[1.6]">
            We select battle-tested, high-performance technologies to build scalable software assets that outlast short-lived industry trends.
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap gap-[8px] md:gap-[12px] mb-[32px]">
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`mono text-[12.5px] md:text-[13.5px] px-[16px] md:px-[20px] py-[9px] rounded-full border transition-all duration-300 ${
                activeTab === cat.id
                  ? 'bg-[#0A1324] text-white border-[#0EBCD4] font-semibold shadow-md'
                  : 'bg-[var(--surface)] border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--accent)]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dynamic Category Card Grid */}
        <div className="rounded-[28px] bg-[var(--surface)] border border-[var(--line)] p-[28px] md:p-[40px] shadow-[0_16px_40px_rgba(10,23,47,0.04)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-[12px] mb-[28px] border-b border-[var(--line)] pb-[18px]">
            <div>
              <span className="mono text-[11.5px] px-[10px] py-[4px] rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 font-semibold uppercase tracking-wider">
                {currentCategory.badge}
              </span>
              <h3 className="text-[22px] font-bold font-[var(--font-display)] text-[var(--ink)] mt-[8px]">
                {currentCategory.name}
              </h3>
            </div>
            <p className="text-[14.5px] text-[var(--muted)] max-w-[500px]">
              {currentCategory.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
            {currentCategory.tools.map((tool) => (
              <div
                key={tool.name}
                className="group relative rounded-[20px] bg-[#0A1324] border border-white/[0.08] p-[20px] text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#0EBCD4]/50 hover:shadow-[0_12px_28px_rgba(10,23,47,0.3)]"
              >
                <div className="flex items-center justify-between mb-[8px]">
                  <h4 className="font-bold text-[16.5px] text-white group-hover:text-cyan-300 transition-colors">
                    {tool.name}
                  </h4>
                  <span className="mono text-[10.5px] text-slate-400">
                    {tool.role}
                  </span>
                </div>
                <div className="mono text-[12px] text-emerald-400 mt-[6px] flex items-center gap-[6px]">
                  <span>⚡</span>
                  <span>{tool.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
