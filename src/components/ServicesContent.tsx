"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaSection from './CtaSection';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERVICES = [
  {
    num: '01',
    title: 'Custom Software',
    desc: 'Applications engineered around how your business actually works, not around a template.',
    capabilities: ['Product discovery & scoping', 'Web & internal platforms', 'API & systems integration', 'Legacy modernization'],
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
  },
  {
    num: '02',
    title: 'AI & Machine Learning',
    desc: 'Production-grade AI features — retrieval, agents and automation — not proof-of-concept demos.',
    capabilities: ['RAG & retrieval pipelines', 'Agentic workflows', 'Model evaluation & guardrails', 'LLM cost optimization'],
    stack: ['Python', 'PyTorch', 'LangChain', 'Vector DBs'],
  },
  {
    num: '03',
    title: 'Cloud & DevOps',
    desc: 'Scalable infrastructure, CI/CD pipelines and 24/7 reliability built to survive real traffic.',
    capabilities: ['Infrastructure as code', 'CI/CD pipelines', 'Observability & alerting', 'Cost & performance tuning'],
    stack: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
  },
  {
    num: '04',
    title: 'Mobile Apps',
    desc: 'Native and cross-platform apps for iOS and Android that feel fast on day one.',
    capabilities: ['iOS & Android native', 'Cross-platform delivery', 'Offline-first sync', 'App store readiness'],
    stack: ['Swift', 'Kotlin', 'React Native', 'GraphQL'],
  },
  {
    num: '05',
    title: 'E-Commerce',
    desc: 'High-converting storefronts and headless commerce built for scale and speed.',
    capabilities: ['Headless storefronts', 'Payments & checkout', 'Catalog & inventory systems', 'Performance & Core Web Vitals'],
    stack: ['Next.js', 'Shopify', 'Stripe', 'Algolia'],
  },
];

export default function ServicesContent() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.service-card').forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
      });
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">Services</div>
        <h1 className="text-[clamp(36px,6vw,72px)] max-w-[18ch] font-[var(--font-display)] font-bold leading-[1]">
          Full-stack expertise, end to end.
        </h1>
        <p className="mt-[24px] max-w-[560px] text-[var(--muted)] text-[16px] leading-[1.7]">
          Five practice areas, one senior team. We plug in wherever your product needs us — from a single sprint to the full build.
        </p>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {SERVICES.map((s) => (
            <div
              key={s.num}
              className="service-card rounded-[22px] bg-[var(--surface)] border border-[var(--line)] p-[36px] flex flex-col"
            >
              <span className="text-[13px] text-[var(--muted)] mono">{s.num}</span>
              <h3 className="mt-[14px] text-[26px] font-[var(--font-display)] font-bold">{s.title}</h3>
              <p className="mt-[12px] text-[var(--muted)] text-[15px] leading-[1.6]">{s.desc}</p>
              <ul className="mt-[20px] space-y-[8px]">
                {s.capabilities.map((c) => (
                  <li key={c} className="text-[14px] text-[var(--ink)] flex items-start gap-[8px]">
                    <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[var(--accent)] flex-none" />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-[24px] flex flex-wrap gap-[8px]">
                {s.stack.map((t) => (
                  <span key={t} className="mono text-[11px] px-[10px] py-[5px] rounded-full border border-[var(--line)] text-[var(--muted)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
