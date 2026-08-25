"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StatsSection from './StatsSection';
import CtaSection from './CtaSection';
import FaqSection, { type FaqItem } from './FaqSection';
import { tiltOnMouseMove, tiltOnMouseLeave } from '@/hooks/tilt';
import type { Certification, Value, Office, Stat } from '@/lib/types';
import Breadcrumbs from './Breadcrumbs';
import RichText from './RichText';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function AboutContent({
  certifications,
  faqs,
  values,
  offices,
  stats,
}: {
  certifications: Certification[];
  faqs: FaqItem[];
  values: Value[];
  offices: Office[];
  stats: Stat[];
}) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.about-reveal');
      cards.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            delay: i * 0.02,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 96%',
              once: true,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [values, offices]);

  const engineeringStandards = [
    {
      title: '100% Complete IP Ownership',
      icon: 'lock',
      tag: 'Zero Vendor Lock-in',
      desc: 'All source code, design assets, and infrastructure configurations belong entirely to you from day one. We commit directly to your GitHub/GitLab repositories with zero proprietary runtime hooks.',
    },
    {
      title: 'Sub-Second Latency & Core Web Vitals',
      icon: 'zap',
      tag: '95+ Lighthouse Score',
      desc: 'We engineer with server-side streaming, edge caching, and atomic CSS to guarantee sub-500ms First Contentful Paint (FCP) and perfect Core Web Vitals across mobile and desktop viewports.',
    },
    {
      title: 'Bank-Grade Security Hardening',
      icon: 'shield',
      tag: 'SOC 2 & OWASP Top 10',
      desc: 'Every application undergoes continuous automated static analysis (SAST), secret scanning, dynamic penetration audits, and role-based access control (RBAC) to ensure enterprise compliance.',
    },
    {
      title: 'Senior Squads by Default',
      icon: 'users',
      tag: '8+ Yrs Avg Experience',
      desc: 'No bait-and-switch staffing. Your project is architected and built by veteran software engineers who have scaled systems to millions of daily active users, not learned on your budget.',
    },
  ];

  const milestones = [
    {
      year: 'Q1 2026',
      title: 'Foundation & Senior Engineering Lab',
      desc: 'Founded to eradicate legacy agency flaws: delivering senior-only engineering squads, clean TypeScript codebases, and 100% intellectual property ownership from day one.',
      metric: '100% Client IP Ownership Standard',
    },
    {
      year: 'Q2 2026',
      title: 'Autonomous AI & Enterprise RAG Systems',
      desc: 'Engineered private enterprise RAG pipelines, dense-sparse vector databases, and deterministic LLM tool-calling with zero external data leakage.',
      metric: 'Sub-10ms Vector Search SLA',
    },
    {
      year: 'Q3 2026',
      title: 'High-Scale Cloud & Microservices',
      desc: 'Architected distributed event-driven microservices, Kubernetes cluster orchestration, and sub-second Core Web Vitals optimization across all viewports.',
      metric: '99.99% Production Uptime Benchmark',
    },
    {
      year: 'Q4 2026 & Beyond',
      title: 'Global Enterprise Transformation',
      desc: 'Expanding bespoke digital transformation partnerships with high-growth startups and global enterprises seeking long-term engineering excellence.',
      metric: 'Continuous CI/CD Delivery',
    },
  ];

  return (
    <div ref={container} className="relative overflow-hidden bg-white">
      {/* 1. Hero Header Section - Awwwards 2-Column Split */}
      <section className="relative px-[6vw] pt-[150px] md:pt-[170px] pb-[70px] z-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-[40px] lg:gap-[60px] items-center">
          <div>
            <Breadcrumbs items={[{ label: 'About', href: '/about' }]} />
            
            <div className="inline-flex items-center gap-[6px] px-[12px] py-[3.5px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.2)] text-[var(--accent)] text-[11.5px] font-mono font-semibold uppercase mb-[14px]">
              <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] animate-pulse" />
              <span>About Quantyro Technologies</span>
            </div>

            <h1 className="text-[clamp(32px,4.5vw,58px)] font-[var(--font-display)] font-bold leading-[1.1] text-[var(--ink)] tracking-tight">
              Engineering the future, one idea at a time.
            </h1>

            <p className="mt-[20px] max-w-[620px] text-[16px] md:text-[17.5px] text-[var(--muted)] leading-[1.7]">
              Quantyro Technologies is an elite software engineering and digital transformation consultancy. We partner with visionary founders and global enterprises to architect, build, and scale high-impact web, mobile, and autonomous AI systems.
            </p>

            {/* Quick Highlights Badge Row */}
            <div className="mt-[32px] flex flex-wrap gap-[10px] pt-[20px] border-t border-[var(--line)]">
              <span className="inline-flex items-center gap-[6px] px-[12px] py-[5px] rounded-full bg-slate-50 border border-slate-200/80 text-[12px] font-mono text-slate-700">
                <span className="w-[5px] h-[5px] rounded-full bg-emerald-500" />
                100% Senior Engineering Teams
              </span>
              <span className="inline-flex items-center gap-[6px] px-[12px] py-[5px] rounded-full bg-slate-50 border border-slate-200/80 text-[12px] font-mono text-slate-700">
                <span className="w-[5px] h-[5px] rounded-full bg-blue-500" />
                Complete IP &amp; Codebase Ownership
              </span>
              <span className="inline-flex items-center gap-[6px] px-[12px] py-[5px] rounded-full bg-slate-50 border border-slate-200/80 text-[12px] font-mono text-slate-700">
                <span className="w-[5px] h-[5px] rounded-full bg-purple-500" />
                99.99% Production Uptime SLA
              </span>
            </div>
          </div>

          {/* Right Column: Immersive Visual Media Showcase Frame */}
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-[32px] opacity-40 blur-2xl pointer-events-none bg-gradient-to-tr from-[var(--accent)]/30 via-cyan-400/20 to-purple-500/20"
              aria-hidden="true"
            />

            <div className="relative rounded-[26px] bg-white border border-[rgba(10,23,47,0.14)] shadow-[0_24px_70px_rgba(10,23,47,0.08)] p-[8px] overflow-hidden group">
              <div className="relative h-[340px] md:h-[380px] w-full rounded-[20px] overflow-hidden bg-[#0A172F]">
                <Image
                  src="/images/photos/services/custom-software.jpg"
                  alt="Quantyro Technologies Senior Engineering Team at Work"
                  title="Senior Software Engineering Lab"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                  unoptimized
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A172F]/85 via-[#0A172F]/20 to-black/20 pointer-events-none" />

                {/* Top Status Pill */}
                <div className="absolute top-[14px] left-[14px] z-10 inline-flex items-center gap-[6px] px-[11px] py-[4.5px] rounded-full bg-[#0A172F]/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-medium shadow-md">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#00E599] animate-pulse" />
                  <span>Senior Engineering Squad · Active</span>
                </div>

                {/* Bottom HUD Analytics Badge */}
                <div className="absolute bottom-[14px] left-[14px] right-[14px] z-10 rounded-[14px] bg-[#0A172F]/85 backdrop-blur-md border border-white/15 p-[14px] text-white shadow-xl">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 mb-[6px]">
                    <span>PRODUCTION BENCHMARK</span>
                    <span className="text-emerald-400">100/100 VERIFIED</span>
                  </div>
                  <div className="grid grid-cols-3 gap-[8px] pt-[6px] border-t border-white/10 text-center">
                    <div>
                      <div className="text-[14px] font-bold text-white font-mono">18.4ms</div>
                      <div className="text-[9.5px] text-slate-400 font-mono">EDGE TTFB</div>
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-emerald-400 font-mono">99.99%</div>
                      <div className="text-[9.5px] text-slate-400 font-mono">UPTIME SLA</div>
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-cyan-300 font-mono">0% DEBT</div>
                      <div className="text-[9.5px] text-slate-400 font-mono">CLEAN ARCH</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Executive Founding Story & Live Architecture Blueprint Card */}
      <section className="relative px-[6vw] pb-[80px] z-10">
        <div className="max-w-[1280px] mx-auto rounded-[28px] bg-[var(--surface)] border border-[var(--line)] p-[32px] md:p-[48px] shadow-[0_16px_45px_rgba(10,23,47,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[40px] items-center">
            <div>
              <span className="mono text-[11.5px] px-[10px] py-[4px] rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 font-semibold uppercase tracking-wider">
                Our Origin &amp; Philosophy
              </span>
              <h2 className="text-[26px] md:text-[34px] font-[var(--font-display)] font-bold text-[var(--ink)] mt-[14px] leading-[1.2]">
                Why we founded Quantyro Technologies.
              </h2>

              <div className="mt-[20px] space-y-[16px] text-[15px] md:text-[16px] text-[var(--muted)] leading-[1.75]">
                <p>
                  Too many software agencies operate on broken incentives: quoting low upfront fees, staffing junior developers who learn on client budgets, and delivering bloated, unmaintainable code that falls apart under production traffic spikes. The result is technical debt, delayed product launches, and costly architectural rewrites.
                </p>
                <p>
                  Quantyro Technologies was founded on a simple, non-negotiable principle: <strong>engineering excellence as a core business driver</strong>. We treat every line of code as high-value intellectual property. From day one, our clients collaborate directly with senior software architects and domain specialists who have shipped large-scale consumer apps, enterprise SaaS platforms, and high-frequency trading systems.
                </p>
                <p>
                  We do not believe in black-box development. Our clients get real-time visibility into active git branches, automated CI/CD deployment pipelines, weekly live product demos, and complete autonomy over their technology stack. When you build with Quantyro, you build for longevity, scale, and uncompromising quality.
                </p>
              </div>
            </div>

            {/* Architectural Blueprint Card */}
            <div className="rounded-[22px] bg-[#0A1324] border border-white/10 p-[24px] text-white shadow-xl">
              <div className="flex items-center justify-between pb-[14px] border-b border-white/10 mb-[16px]">
                <div className="flex items-center gap-[8px]">
                  <span className="w-[10px] h-[10px] rounded-full bg-rose-500" />
                  <span className="w-[10px] h-[10px] rounded-full bg-amber-500" />
                  <span className="w-[10px] h-[10px] rounded-full bg-emerald-500" />
                  <span className="mono text-[11px] text-slate-400 ml-[8px]">quantyro-standards.config.ts</span>
                </div>
                <span className="mono text-[10.5px] px-[8px] py-[2px] rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Strict Type Safety
                </span>
              </div>

              <div className="space-y-[12px] font-mono text-[12.5px]">
                <div className="p-[10px] rounded-[10px] bg-white/[0.04] border border-white/[0.06]">
                  <span className="text-cyan-400">const</span> <span className="text-amber-300">ClientEngagement</span> = &#123;
                  <div className="pl-[16px] text-slate-300 text-[11.5px] space-y-[4px] mt-[4px]">
                    <div>ipOwnership: <span className="text-emerald-400">&apos;100% Client Retained&apos;</span>,</div>
                    <div>staffingModel: <span className="text-emerald-400">&apos;Senior Engineers Only (8+ Yrs)&apos;</span>,</div>
                    <div>deployment: <span className="text-emerald-400">&apos;Zero-Downtime Blue/Green&apos;</span>,</div>
                    <div>testCoverage: <span className="text-emerald-400">&apos;&gt;90% Automated Unit/E2E&apos;</span>,</div>
                  </div>
                  &#125;;
                </div>

                <div className="p-[12px] rounded-[12px] bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-blue-500/20 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">CORE GUARANTEE</div>
                    <div className="text-[13px] font-bold text-white">Production IP Handoff</div>
                  </div>
                  <span className="text-[18px]">🔒</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Company Evolution & Milestone Roadmap */}
      <section className="relative px-[6vw] pb-[90px] z-10 max-w-[1280px] mx-auto">
        <div className="mb-[36px]">
          <div className="mono text-[11.5px] uppercase font-bold text-[var(--accent)] mb-[8px] flex items-center gap-[6px]">
            <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
            <span>Company Trajectory</span>
          </div>
          <h2 className="text-[clamp(26px,3.8vw,42px)] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.15]">
            Our journey of continuous innovation.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="about-reveal rounded-[22px] bg-white border border-[rgba(10,23,47,0.12)] shadow-[0_8px_24px_rgba(10,23,47,0.04)] p-[24px] flex flex-col justify-between hover:border-[var(--accent)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(23,104,214,0.1)]"
            >
              <div>
                <span className="mono text-[18px] font-bold text-[var(--accent)] block mb-[8px]">
                  {m.year}
                </span>
                <h3 className="text-[17px] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.3]">
                  {m.title}
                </h3>
                <p className="mt-[10px] text-[13px] text-[var(--muted)] leading-[1.6]">
                  {m.desc}
                </p>
              </div>

              <div className="mt-[18px] pt-[12px] border-t border-[var(--line)]">
                <span className="mono text-[11px] font-semibold text-emerald-600">
                  ✓ {m.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Engineering Delivery Standards & SLAs */}
      <section className="relative px-[6vw] pb-[90px] z-10 max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[16px] mb-[32px]">
          <div>
            <div className="mono text-[11.5px] uppercase font-bold text-[var(--accent)] mb-[8px] flex items-center gap-[6px]">
              <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
              <span>Engineering SLA &amp; Standards</span>
            </div>
            <h2 className="text-[clamp(26px,3.8vw,42px)] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.15]">
              How we guarantee production excellence.
            </h2>
          </div>
          <p className="max-w-[420px] text-[14px] text-[var(--muted)] leading-[1.6]">
            Every engagement is backed by deterministic engineering guardrails, strict compliance auditing, and clean architectural patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {engineeringStandards.map((std, idx) => (
            <div
              key={std.title}
              className="about-reveal rounded-[22px] bg-white border border-[rgba(10,23,47,0.12)] shadow-[0_8px_24px_rgba(10,23,47,0.04)] p-[24px] flex flex-col justify-between hover:border-[var(--accent)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(23,104,214,0.1)]"
            >
              <div>
                <div className="flex items-center justify-between mb-[14px]">
                  <span className="mono text-[11px] font-bold text-[var(--accent)] px-[8px] py-[3px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.2)]">
                    0{idx + 1}
                  </span>
                  <span className="mono text-[10.5px] text-slate-500 font-medium">
                    {std.tag}
                  </span>
                </div>
                <h3 className="text-[17.5px] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.3]">
                  {std.title}
                </h3>
                <p className="mt-[10px] text-[13.5px] text-[var(--muted)] leading-[1.6]">
                  {std.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Core Values & Principles */}
      <section className="relative px-[6vw] pb-[90px] z-10 max-w-[1280px] mx-auto">
        <div className="mb-[28px]">
          <div className="mono text-[11.5px] uppercase font-bold text-[var(--accent)] mb-[8px] flex items-center gap-[6px]">
            <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="text-[clamp(26px,3.8vw,42px)] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.15]">
            Our operating values.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          {values.map((v, idx) => (
            <div
              key={v.id}
              onMouseMove={(e) => tiltOnMouseMove(e, 4)}
              onMouseLeave={tiltOnMouseLeave}
              className="about-reveal rounded-[24px] bg-[var(--surface)] border border-[var(--line)] p-[30px] md:p-[36px] hover:border-[rgba(23,104,214,0.35)] hover:shadow-[0_16px_40px_rgba(23,104,214,0.08)] transition-all duration-300"
            >
              <div className="mono text-[11px] font-bold text-[var(--accent)] mb-[10px]">
                VALUE 0{idx + 1}
              </div>
              <h3 className="text-[21px] md:text-[22px] font-[var(--font-display)] font-bold text-[var(--ink)]">{v.title}</h3>
              <div className="mt-[10px] text-[var(--muted)] text-[14.5px] md:text-[15px] leading-[1.65]">
                <RichText html={v.desc} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Technical Certifications */}
      {certifications.length > 0 && (
        <section className="relative px-[6vw] pb-[90px] z-10 max-w-[1280px] mx-auto">
          <div className="mb-[24px]">
            <div className="mono text-[11.5px] uppercase font-bold text-[var(--accent)] mb-[8px] flex items-center gap-[6px]">
              <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
              <span>Verified Accreditations</span>
            </div>
            <h2 className="text-[26px] md:text-[34px] font-[var(--font-display)] font-bold text-[var(--ink)]">
              Certified technical expertise.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
            {certifications.map((c) => {
              const Card = c.credentialUrl ? 'a' : 'div';
              return (
                <Card
                  key={c.id}
                  {...(c.credentialUrl ? { href: c.credentialUrl, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="about-reveal rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[20px] hover:border-[rgba(23,104,214,0.35)] transition-all hover:shadow-sm"
                >
                  <div className="text-[15px] font-bold text-[var(--ink)]">{c.title}</div>
                  <div className="mt-[4px] text-[12.5px] text-[var(--muted)] mono">{c.issuer}</div>
                  {c.issueDate && (
                    <div className="mt-[4px] text-[11px] text-slate-400 mono">
                      {new Date(c.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* 8. Key Delivery Stats */}
      <StatsSection stats={stats} />

      {/* 9. FAQ Section */}
      <FaqSection heading="Frequently Asked Questions About Quantyro" items={faqs} />

      {/* 10. CTA */}
      <CtaSection />
    </div>
  );
}
