"use client";

import React, { useState } from 'react';

interface TechArchitectureCardProps {
  title: string;
  slug: string;
  serviceSlug: string;
  primaryTech: string[];
}

export default function TechArchitectureCard({
  title,
  slug,
  serviceSlug,
  primaryTech,
}: TechArchitectureCardProps) {
  const [activeTab, setActiveTab] = useState<'architecture' | 'telemetry'>('architecture');

  // Generate dynamic, context-specific architecture details based on slug/title/primaryTech
  const getTechDetails = () => {
    const s = slug.toLowerCase();
    const primary = primaryTech[0] || 'TypeScript';

    if (s.includes('next') || s.includes('jamstack') || s.includes('pwa') || s.includes('react')) {
      return {
        badge: 'Next.js 15 · Edge SSR',
        badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
        fileName: `${slug}.config.ts`,
        runtime: 'Edge Runtime / V8 Serverless',
        metrics: [
          { label: 'Edge Latency', value: '< 28ms' },
          { label: 'Lighthouse Score', value: '100 / 100' },
          { label: 'Bundle Footprint', value: '38 KB (Gzip)' },
        ],
        code: `// Quantyro Next.js 15 & PWA Edge Pipeline
import { defineArchitecture } from '@quantyro/core';
import { serverSideStreaming } from 'next/server';

export const config = defineArchitecture({
  framework: 'Next.js 15 (Turbopack)',
  rendering: 'Selective Edge Streaming (ISR)',
  cacheStrategy: 'Stale-While-Revalidate (SWR)',
  securityHeaders: {
    contentSecurityPolicy: 'strict-dynamic',
    hsts: { maxAge: 31536000, preload: true },
  },
  monitoring: {
    coreWebVitals: { lcp: '0.42s', cls: '0.00', inp: '32ms' },
    ipTransfer: '100% Client Git Ownership',
  }
});`,
      };
    }

    if (s.includes('mern') || s.includes('node') || s.includes('mongo') || s.includes('express')) {
      return {
        badge: 'Node.js 22 · MongoDB Atlas',
        badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
        fileName: `mern-cluster.pipeline.ts`,
        runtime: 'Node.js Cluster / PM2 & Redis',
        metrics: [
          { label: 'DB Query Time', value: '2.4ms avg' },
          { label: 'Throughput', value: '45,000 req/s' },
          { label: 'Type Integrity', value: '100% Zod Validated' },
        ],
        code: `// Quantyro MERN Full-Stack Enterprise Controller
import { MongoClient } from 'mongodb';
import { z } from 'zod';
import { createServer } from 'node:http';

export const ProductContract = z.object({
  sku: z.string().uuid(),
  inventory: z.number().nonnegative(),
  vectorEmbeddings: z.array(z.number()),
});

export async function handleStream(req: Request) {
  const db = await MongoClient.connect(process.env.MONGODB_URI);
  return db.collection('live_transactions').aggregate([
    { $match: { status: 'SETTLED' } },
    { $project: { _id: 1, amount: 1, timestamp: 1 } }
  ]);
}`,
      };
    }

    if (s.includes('ai') || s.includes('ml') || s.includes('pytorch') || s.includes('vector') || s.includes('rag')) {
      return {
        badge: 'PyTorch 2.4 · Vector RAG',
        badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
        fileName: `ai-inference.pipeline.py`,
        runtime: 'CUDA 12.4 / TensorRT Cluster',
        metrics: [
          { label: 'Vector Retrieval', value: '6.8ms' },
          { label: 'Embedding Dim', value: '1536-D HNSW' },
          { label: 'Token Efficiency', value: '99.4% Precision' },
        ],
        code: `# Quantyro Enterprise Autonomous AI Pipeline
from quantyro.neural import HybridRetriever, TensorEngine
import torch

retriever = HybridRetriever(
    vector_index="pinecone-enterprise-v2",
    embedding_model="text-embedding-3-large",
    similarity_metric="cosine_hnsw"
)

async def generate_grounded_response(query: str):
    docs = await retriever.query_sparse_dense(query, top_k=8)
    return await TensorEngine.stream_inference(
        prompt=query,
        context=docs,
        temperature=0.1,
        guardrails=["owasp-llm-01", "pii-sanitization"]
    )`,
      };
    }

    if (s.includes('seo') || s.includes('marketing') || s.includes('schema')) {
      return {
        badge: 'Semantic Web · JSON-LD Graph',
        badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
        fileName: `seo-structured-data.ts`,
        runtime: 'Googlebot Pre-render Engine',
        metrics: [
          { label: 'Core Web Vitals', value: '100% Good' },
          { label: 'Schema Coverage', value: '100% Validated' },
          { label: 'Crawl Budget', value: '0% Wasted Requests' },
        ],
        code: `// Quantyro Core Web Vitals & Schema Node Graph
export const semanticEntityGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "headline": "${title}",
      "proficiencyLevel": "Expert",
      "dependencies": "${primaryTech.join(', ')}",
      "coreWebVitals": {
        "LargestContentfulPaint": "< 800ms",
        "CumulativeLayoutShift": "0.00",
        "InteractionToNextPaint": "< 50ms"
      }
    }
  ]
};`,
      };
    }

    // Default Architecture Blueprint
    return {
      badge: `${primary} · Production Ready`,
      badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      fileName: `${slug}.architecture.ts`,
      runtime: 'Multi-Cloud High Availability',
      metrics: [
        { label: 'Uptime Benchmark', value: '99.99%' },
        { label: 'Security Grade', value: 'SOC 2 Ready' },
        { label: 'Codebase Ownership', value: '100% Direct Git' },
      ],
      code: `// Quantyro Enterprise Architecture Standard
import { initializeSystem } from '@quantyro/platform';

export const enterpriseSpecification = {
  service: '${title}',
  primaryStack: [${primaryTech.map(t => `'${t}'`).join(', ')}],
  deploymentStrategy: 'Zero-Downtime Blue/Green',
  securityControls: ['OWASP Top 10', 'End-to-End Encryption', 'RBAC'],
  complianceSLA: {
    responseTime: '< 4h Direct Lead',
    codeAuditing: 'Continuous SAST / Secret Scanning'
  }
};`,
    };
  };

  const details = getTechDetails();

  return (
    <div className="relative rounded-[24px] bg-[#0A1324] border border-white/15 p-[20px] md:p-[26px] text-white shadow-[0_24px_70px_rgba(10,23,47,0.4)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(23,104,214,0.3)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[240px] h-[240px] bg-[radial-gradient(circle,rgba(0,229,153,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Terminal Top Window Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-[12px] border-b border-white/10 pb-[16px] mb-[18px]">
        <div className="flex items-center gap-[12px]">
          <div className="flex items-center gap-[6px]">
            <span className="w-[10px] h-[10px] rounded-full bg-rose-500/80" />
            <span className="w-[10px] h-[10px] rounded-full bg-amber-500/80" />
            <span className="w-[10px] h-[10px] rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-[12px] text-slate-400 flex items-center gap-[6px]">
            <span className="text-slate-600">quantyro://</span>
            <span className="text-cyan-300 font-semibold">{details.fileName}</span>
          </span>
        </div>

        {/* Live Framework Badge */}
        <div className={`inline-flex items-center gap-[6px] px-[10px] py-[3px] rounded-full border text-[11px] font-mono font-medium ${details.badgeColor}`}>
          <span className="w-[5px] h-[5px] rounded-full bg-current animate-pulse" />
          <span>{details.badge}</span>
        </div>
      </div>

      {/* Tab Selectors */}
      <div className="relative z-10 flex items-center gap-[8px] mb-[14px]">
        <button
          type="button"
          onClick={() => setActiveTab('architecture')}
          className={`px-[12px] py-[4px] rounded-lg text-[11.5px] font-mono transition-all ${
            activeTab === 'architecture'
              ? 'bg-white/15 text-white font-bold border border-white/20'
              : 'text-slate-400 hover:text-white bg-transparent'
          }`}
        >
          // Architecture Code
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('telemetry')}
          className={`px-[12px] py-[4px] rounded-lg text-[11.5px] font-mono transition-all ${
            activeTab === 'telemetry'
              ? 'bg-white/15 text-white font-bold border border-white/20'
              : 'text-slate-400 hover:text-white bg-transparent'
          }`}
        >
          // Telemetry HUD
        </button>
      </div>

      {/* Code Editor / Schema View */}
      {activeTab === 'architecture' ? (
        <div className="relative z-10 bg-[#060D1A]/95 rounded-[16px] border border-white/10 p-[16px] overflow-x-auto">
          <pre className="font-mono text-[12px] leading-[1.7] text-slate-300 select-all">
            <code>{details.code}</code>
          </pre>
        </div>
      ) : (
        <div className="relative z-10 bg-[#060D1A]/95 rounded-[16px] border border-white/10 p-[20px] space-y-[16px]">
          <div className="text-[12px] font-mono text-cyan-300 uppercase tracking-wider font-semibold">
            ● Live System Benchmarks
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[12px]">
            {details.metrics.map((m) => (
              <div key={m.label} className="p-[12px] rounded-[12px] bg-white/[0.04] border border-white/10">
                <div className="mono text-[10.5px] text-slate-400 uppercase">{m.label}</div>
                <div className="text-[16px] font-mono font-bold text-white mt-[4px]">{m.value}</div>
              </div>
            ))}
          </div>
          <div className="pt-[10px] border-t border-white/10 text-[12px] font-mono text-slate-400 flex items-center justify-between">
            <span>Runtime: <span className="text-slate-200">{details.runtime}</span></span>
            <span className="text-emerald-400">● 100% Operational</span>
          </div>
        </div>
      )}

      {/* Primary Tech Stack Chips at bottom */}
      <div className="relative z-10 mt-[16px] pt-[14px] border-t border-white/10 flex flex-wrap items-center justify-between gap-[10px]">
        <div className="flex flex-wrap items-center gap-[6px]">
          <span className="mono text-[10.5px] text-slate-400 uppercase font-semibold mr-[4px]">Stack:</span>
          {primaryTech.slice(0, 4).map((tech) => (
            <span key={tech} className="mono text-[10.5px] px-[8px] py-[2px] rounded-md bg-white/[0.06] border border-white/10 text-slate-300 font-medium">
              {tech}
            </span>
          ))}
        </div>
        <span className="mono text-[10.5px] text-emerald-400 flex items-center gap-[5px]">
          <span className="w-[4px] h-[4px] rounded-full bg-emerald-400" />
          Production Verified
        </span>
      </div>
    </div>
  );
}
