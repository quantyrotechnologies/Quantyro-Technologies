"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tiltOnMouseMove, tiltOnMouseLeave } from '@/hooks/tilt';
import { regionToSlug } from '@/lib/regions';
import { citySlug } from '@/lib/cities';
import { serviceIllustration } from '@/lib/serviceIllustration';
import { stripHtml } from '@/lib/stripHtml';
import Breadcrumbs from './Breadcrumbs';
import TableOfContents from './TableOfContents';
import FaqSection, { type FaqItem } from './FaqSection';
import InlineInquiryForm from './InlineInquiryForm';
import CtaSection from './CtaSection';
import RichText from './RichText';
import { SERVICE_EXECUTIVE_DATA } from '@/lib/data/serviceExecutiveData';
import type { Service, RoadmapStep, Project, IndustryApplication } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

const SLA_GUARANTEES = [
  {
    title: 'Zero-Downtime Delivery',
    desc: 'Blue-green deployments and automated canary rollbacks eliminate maintenance downtime.',
  },
  {
    title: 'Deterministic Code Quality',
    desc: 'Strict TypeScript typing, integration tests, and static security linting on every pull request.',
  },
  {
    title: 'Full Intellectual Property Transfer',
    desc: 'All source code, CI/CD pipelines, and infrastructure manifests belong 100% to your enterprise.',
  },
];

export default function ServiceDetailContent({
  service,
  faqs,
  roadmapSteps,
  regions,
  cities = [],
  techStackSlugs = {},
  relatedProjects = [],
  industryApplications = [],
}: {
  service: Service;
  faqs: FaqItem[];
  roadmapSteps: RoadmapStep[];
  regions: string[];
  cities?: string[];
  /** capabilityLabel -> deep-dive page slug, pre-fetched by the page so this client component doesn't call async data functions per capability. */
  techStackSlugs?: Record<string, string>;
  relatedProjects?: Project[];
  industryApplications?: IndustryApplication[];
}) {
  const container = useRef<HTMLDivElement>(null);
  const accent = Number(service.num) % 2 === 0 ? 'accent-2' : 'accent';

  const tocItems = [
    { id: 'overview', label: 'Executive Overview' },
    { id: 'capabilities', label: 'Core Technical Capabilities' },
    ...(industryApplications.length > 0 ? [{ id: 'industries', label: 'Industry Applications' }] : []),
    { id: 'sla-standards', label: 'Engineering SLAs & Standards' },
    { id: 'process', label: '4-Phase Delivery Framework' },
    { id: 'engagement', label: 'Engagement at a Glance' },
    ...(regions.length + cities.length > 0 ? [{ id: 'regions', label: 'Global Availability' }] : []),
    ...(relatedProjects.length > 0 ? [{ id: 'related-work', label: 'Related Work' }] : []),
    ...(faqs.length > 0 ? [{ id: 'faq', label: 'Frequently Asked Questions' }] : []),
  ];

  const highlights = [
    { icon: 'check', label: `${service.capabilities.length} core capabilities` },
    { icon: 'bolt', label: `${roadmapSteps.length}-step delivery process` },
    { icon: 'shield', label: 'Senior engineers only' },
  ];

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>('.svc-reveal');
      reveals.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 96%', once: true },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [service]);

  return (
    <div ref={container}>
      {/* Hero Header Section */}
      <section className="relative px-[6vw] pt-[160px] pb-[70px] z-10 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[60vw] h-[420px] opacity-[0.5] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 70% 20%, var(--${accent}) 0%, transparent 65%)` }}
        />

        <div className="relative max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-[32px] items-center">
          <div>
            <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: service.title, href: `/services/${service.slug}` }]} />
            <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">Services · {service.title}</div>
            
            <h1 className="svc-reveal text-[clamp(32px,5.4vw,56px)] max-w-[20ch] font-[var(--font-display)] font-bold leading-[1.05] text-[var(--ink)]">
              {service.title}
            </h1>

            {/* SEO-Optimized Hero Descriptive Subtitle */}
            <p className="svc-reveal mt-[16px] text-[15px] md:text-[16.5px] text-[var(--muted)] leading-[1.65] max-w-[560px]">
              {service.desc ? stripHtml(service.desc) : service.seoDescription}
            </p>

            <div className="svc-reveal mt-[22px] flex flex-wrap gap-[10px]">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="inline-flex items-center gap-[7px] px-[13px] py-[7px] rounded-full bg-white border border-[rgba(10,23,47,0.18)] shadow-[0_2px_10px_rgba(10,23,47,0.04)] text-[12.5px] font-medium text-[var(--ink)]"
                >
                  <span
                    className="w-[16px] h-[16px] rounded-full flex items-center justify-center"
                    style={{ background: `color-mix(in srgb, var(--${accent}) 12%, transparent)`, color: `var(--${accent})` }}
                  >
                    {h.icon === 'check' && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    )}
                    {h.icon === 'bolt' && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" /></svg>
                    )}
                    {h.icon === 'shield' && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    )}
                  </span>
                  {h.label}
                </div>
              ))}
            </div>
          </div>

          {/* Animated Interactive Hero Showcase Card */}
          <div 
            onMouseMove={(e) => tiltOnMouseMove(e, 8)}
            onMouseLeave={tiltOnMouseLeave}
            className="svc-reveal relative group cursor-default transition-all duration-300"
            style={{ perspective: '1000px' }}
          >
            {/* Ambient Animated Glow Aura behind image */}
            <div 
              className="absolute -inset-2 rounded-[32px] opacity-40 group-hover:opacity-75 blur-xl transition-all duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle, var(--${accent}) 0%, rgba(14,188,212,0.3) 50%, transparent 80%)`
              }}
            />

            {/* Main Glassmorphic Container Frame */}
            <div className="relative rounded-[26px] bg-white/90 backdrop-blur-xl border border-[rgba(10,23,47,0.14)] shadow-[0_20px_60px_rgba(10,23,47,0.1)] p-[10px] md:p-[12px] transition-all duration-500 group-hover:border-[var(--accent)] group-hover:shadow-[0_24px_70px_rgba(23,104,214,0.18)]">
              <div className="relative w-full aspect-video overflow-hidden rounded-[18px] bg-[#0A172F]">
                {service.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- admin-supplied arbitrary URL, host unknown ahead of time
                  <img
                    src={service.imageUrl}
                    alt={`${service.title} — Quantyro Technologies Enterprise Engineering`}
                    title={`${service.title} Architecture Blueprint`}
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={serviceIllustration(service.slug)}
                    alt={`${service.title} — Quantyro Technologies Enterprise Engineering`}
                    title={`${service.title} Architecture Blueprint`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                    unoptimized
                  />
                )}

                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A172F]/70 via-transparent to-black/20 pointer-events-none" />

                {/* Live System Status Pill */}
                <div className="absolute top-[12px] left-[12px] z-10 inline-flex items-center gap-[6px] px-[10px] py-[4px] rounded-full bg-[#0A172F]/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-medium shadow-lg">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#00E599] animate-pulse" />
                  <span>Enterprise SLA · Active</span>
                </div>

                {/* Bottom capability HUD tag */}
                <div className="absolute bottom-[12px] right-[12px] z-10 inline-flex items-center gap-[6px] px-[11px] py-[4.5px] rounded-full bg-white/95 backdrop-blur-md border border-[rgba(10,23,47,0.1)] text-[var(--ink)] text-[11.5px] font-semibold shadow-lg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>100% IP Ownership</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative px-[6vw] pb-[60px] z-10">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-x-[40px] items-start">
      <div>
        <div className="svc-reveal">
          <TableOfContents items={tocItems} />
        </div>

        {/* 1. Executive Overview */}
        {(() => {
          const defaultExec = SERVICE_EXECUTIVE_DATA[service.slug];
          const headline = service.executiveHeadline || defaultExec?.headline || 'Engineering Scalable Software Designed for Market Leadership';
          const narrative = (service.executiveNarrative && service.executiveNarrative.length > 0) ? service.executiveNarrative : defaultExec?.narrative;
          const pillars = (service.executivePillars && service.executivePillars.length > 0) ? service.executivePillars : defaultExec?.pillars;

          return (
            <div className="mb-[64px]">
              <h2 id="overview" className="svc-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['01_/_']">
                Executive Overview
              </h2>
              <h3 className="svc-reveal text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[16px] leading-[1.25]">
                {headline}
              </h3>
              
              {narrative ? (
                <div className="svc-reveal space-y-[16px] text-[16px] text-[var(--ink)]/85 leading-[1.8] mb-[24px]">
                  {narrative.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              ) : (
                <>
                  <RichText
                    html={service.desc}
                    className="svc-reveal text-[16.5px] text-[var(--ink)]/85 leading-[1.8] mb-[20px]"
                  />
                  <p className="svc-reveal text-[15.5px] text-[var(--muted)] leading-[1.75]">
                    We bridge deep technical architecture with rapid business delivery. Every system is built by senior engineers using type-safe protocols, decoupled services, and cloud-native resilience patterns.
                  </p>
                </>
              )}

              {/* 4 Executive Value Pillars Grid */}
              {pillars && (
                <div className="svc-reveal grid grid-cols-1 sm:grid-cols-2 gap-[14px] mt-[28px] pt-[24px] border-t border-[var(--line)]">
                  {pillars.map((p) => (
                    <div
                      key={p.title}
                      className="rounded-[16px] border border-[rgba(10,23,47,0.12)] bg-white p-[18px] shadow-[0_2px_12px_rgba(10,23,47,0.03)] hover:border-[var(--accent)] hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-[10px] mb-[8px]">
                        <span
                          className="w-[28px] h-[28px] rounded-lg flex items-center justify-center text-[var(--accent)] shrink-0 group-hover:scale-110 transition-transform"
                          style={{ background: `color-mix(in srgb, var(--${accent}) 12%, transparent)` }}
                        >
                          {p.icon === 'shield' && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                          )}
                          {p.icon === 'zap' && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                          )}
                          {p.icon === 'code' && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="16 18 22 12 16 6" />
                              <polyline points="8 6 2 12 8 18" />
                            </svg>
                          )}
                          {p.icon === 'lock' && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          )}
                        </span>
                        <h4 className="text-[14.5px] font-bold text-[var(--ink)]">{p.title}</h4>
                      </div>
                      <p className="text-[13px] text-[var(--muted)] leading-[1.55]">{p.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })()}

        {/* 2. Core Capabilities & Tech Stack */}
        <div className="mb-[64px]">
          <h2 id="capabilities" className="svc-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['02_/_']">
            Core Technical Capabilities
          </h2>
          <h3 className="svc-reveal text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[20px]">
            Comprehensive Engineering Vectors Included in This Service
          </h3>
          
          <div className="svc-reveal grid grid-cols-1 md:grid-cols-2 gap-[14px] mb-[32px]">
            {service.capabilities.map((c) => {
              const stackSlug = techStackSlugs[c] ?? null;
              const Card = (
                <>
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <span className="shrink-0 w-[28px] h-[28px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.18)] flex items-center justify-center text-[var(--accent)] mt-[2px]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <div className="flex-1">
                    <h4 className="text-[15px] text-[var(--ink)] font-bold">{c}</h4>
                    <h5 className="text-[12px] mono text-[var(--accent)] mt-[4px] uppercase font-semibold">
                      {stackSlug ? 'Production Verified · View deep dive →' : 'Production Verified'}
                    </h5>
                  </div>
                </>
              );

              const className = "group relative flex items-start gap-[14px] rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[18px] overflow-hidden hover:border-[rgba(23,104,214,0.4)] hover:shadow-md transition-all";

              return stackSlug ? (
                <Link
                  key={c}
                  href={`/services/${service.slug}/stack/${stackSlug}`}
                  onMouseMove={(e) => tiltOnMouseMove(e, 3)}
                  onMouseLeave={tiltOnMouseLeave}
                  className={className}
                >
                  {Card}
                </Link>
              ) : (
                <div
                  key={c}
                  onMouseMove={(e) => tiltOnMouseMove(e, 3)}
                  onMouseLeave={tiltOnMouseLeave}
                  className={className}
                >
                  {Card}
                </div>
              );
            })}
          </div>

          {service.stack && service.stack.length > 0 && (
            <div className="svc-reveal rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-[24px]">
              <h4 className="text-[14px] font-mono font-bold uppercase tracking-wider text-[var(--muted)] mb-[14px]">
                Primary Technology Stack
              </h4>
              <div className="flex flex-wrap gap-[8px]">
                {service.stack.map((t) => (
                  <span key={t} className="inline-flex items-center gap-[6px] mono text-[12px] px-[12px] py-[6px] rounded-full border border-[var(--line)] bg-white text-[var(--ink)] font-medium">
                    <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)]" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Industry Applications */}
        {industryApplications.length > 0 && (
          <div className="mb-[64px]">
            <h2 id="industries" className="svc-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['03_/_']">
              Industry Applications
            </h2>
            <h3 className="svc-reveal text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[20px]">
              Tailored Domain Solutions for High-Growth Sectors
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
              {industryApplications.map((app) => (
                <div
                  key={app.id}
                  className="rounded-[20px] bg-[#0A1324] border border-white/[0.08] p-[24px] text-white flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-[10px]">
                      <h4 className="text-[18px] font-bold text-white">{app.sector}</h4>
                      <span className="mono text-[11px] px-[8px] py-[3px] rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {app.metric}
                      </span>
                    </div>
                    <div className="text-[14px] text-slate-300 leading-[1.65]">
                      <RichText html={app.useCase} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Engineering SLAs & Standards */}
        <div className="mb-[64px]">
          <h2 id="sla-standards" className="svc-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['04_/_']">
            Engineering SLAs &amp; Quality Guarantees
          </h2>
          <h3 className="svc-reveal text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[20px]">
            Enterprise-Grade Commitments on Every Sprint
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
            {SLA_GUARANTEES.map((sla) => (
              <div
                key={sla.title}
                className="rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[22px]"
              >
                <div className="w-[8px] h-[8px] rounded-full bg-[var(--accent)] mb-[12px]" />
                <h4 className="text-[16px] font-bold text-[var(--ink)] mb-[8px]">{sla.title}</h4>
                <p className="text-[13.5px] text-[var(--muted)] leading-[1.6]">{sla.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. 4-Phase Delivery Process */}
        {roadmapSteps.length > 0 && (
          <div className="mb-[64px]">
            <h2 id="process" className="svc-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['05_/_']">
              4-Phase Delivery Framework
            </h2>
            <h3 className="svc-reveal text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[24px]">
              Transparent, Agile Lifecycle from Discovery to Scale
            </h3>

            <div className="relative">
              <div className="absolute left-[19px] top-[8px] bottom-[8px] w-[2px] bg-[var(--line)]" aria-hidden />
              <div className="flex flex-col gap-[20px]">
                {roadmapSteps.map((step) => (
                  <div key={step.id} className="svc-reveal relative pl-[52px]">
                    <div className="absolute left-0 top-0 w-[40px] h-[40px] rounded-full bg-white border-2 border-[var(--accent)] text-[var(--accent)] shadow-sm flex items-center justify-center mono font-bold text-[13px] z-10">
                      {step.step}
                    </div>
                    <div className="rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[22px] hover:border-[rgba(23,104,214,0.3)] hover:shadow-md transition-all">
                      <h4 className="text-[17px] font-[var(--font-display)] font-bold text-[var(--ink)]">
                        {step.title}
                      </h4>
                      <p className="mt-[6px] text-[14px] text-[var(--muted)] leading-[1.65]">{step.desc}</p>
                      {step.deliverables.length > 0 && (
                        <div className="mt-[14px] pt-[12px] border-t border-[var(--line)]">
                          <h5 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--accent)] mb-[8px]">
                            Phase Deliverables
                          </h5>
                          <ul className="flex flex-wrap gap-[6px]">
                            {step.deliverables.map((d) => (
                              <li key={d} className="mono text-[11px] px-[10px] py-[3px] rounded-full border border-[var(--line)] bg-white text-[var(--ink)]">
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. Engagement at a Glance */}
        <div className="mb-[64px]">
          <h2 id="engagement" className="svc-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['06_/_']">
            Engagement at a Glance
          </h2>
          <h3 className="svc-reveal text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[20px]">
            How Working Together Actually Looks
          </h3>
          <div className="svc-reveal overflow-hidden rounded-[16px] border border-[var(--line)]">
            <table className="w-full text-[14px] border-collapse">
              <tbody>
                {[
                  ['Delivery timeline', 'Typically 6–16 weeks, depending on scope'],
                  ['Engagement model', 'Fixed-scope project or dedicated team — your choice'],
                  ['Team', 'Senior engineers only — no outsourced junior benches'],
                  ['Code & IP ownership', '100% transferred to you — source code, CI/CD, infra'],
                  ['Pricing', 'Scoped to your project during discovery — request a custom quote below'],
                ].map(([label, value], i) => (
                  <tr key={label} className={i > 0 ? 'border-t border-[var(--line)]' : ''}>
                    <th scope="row" className="text-left font-semibold text-[var(--ink)] bg-[var(--surface)] px-[18px] py-[13px] w-[220px] align-top">
                      {label}
                    </th>
                    <td className="px-[18px] py-[13px] text-[var(--muted)] align-top">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 7. Global Regions & Cities */}
        {regions.length + cities.length > 0 && (
          <div className="mb-[64px]">
            <h2 id="regions" className="svc-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['07_/_']">
              Global Availability
            </h2>
            <div className="svc-reveal flex flex-wrap gap-[10px]">
              {regions.map((region) => (
                <Link
                  key={region}
                  href={`/services/${service.slug}/${regionToSlug(region)}`}
                  className="inline-flex items-center gap-[6px] mono text-[12.5px] px-[16px] py-[9px] rounded-full border border-[rgba(23,104,214,0.25)] text-[var(--accent)] bg-[rgba(23,104,214,0.04)] hover:bg-[rgba(23,104,214,0.1)] transition-colors"
                >
                  {service.title} in {region} →
                </Link>
              ))}
              {cities.map((city) => (
                <Link
                  key={city}
                  href={`/services/${service.slug}/${citySlug(city)}`}
                  className="inline-flex items-center gap-[6px] mono text-[12.5px] px-[16px] py-[9px] rounded-full border border-[rgba(23,104,214,0.25)] text-[var(--accent)] bg-[rgba(23,104,214,0.04)] hover:bg-[rgba(23,104,214,0.1)] transition-colors"
                >
                  {service.title} in {city} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Work */}
        {relatedProjects.length > 0 && (
          <div className="mb-[64px]">
            <h2 id="related-work" className={`svc-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] ${regions.length + cities.length > 0 ? "before:content-['08_/_']" : "before:content-['07_/_']"}`}>
              Related Work
            </h2>
            <div className="svc-reveal grid grid-cols-1 md:grid-cols-2 gap-[14px]">
              {relatedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="group relative flex flex-col gap-[6px] rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[18px] hover:border-[rgba(23,104,214,0.4)] hover:shadow-md transition-all"
                >
                  <span className="mono text-[11px] text-[var(--muted)]">{p.client} · {p.region}</span>
                  <h4 className="text-[15px] text-[var(--ink)] font-bold">{p.title}</h4>
                  <span className="text-[13px] text-[var(--muted)]">{p.result}</span>
                  <span className="mt-[4px] text-[12px] mono text-[var(--accent)] font-semibold">View case study →</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <aside className="svc-reveal lg:sticky lg:top-[100px]">
        <InlineInquiryForm source={`Service: ${service.title}`} heading={`Get a quote for ${service.title}`} />
      </aside>
      </div>
      </section>

      {/* 7. FAQs (3+ structured FAQs with FAQPage schema) */}
      {faqs.length > 0 && (
        <div id="faq" className="svc-reveal scroll-mt-[100px]">
          <FaqSection heading={`${service.title} FAQ`} items={faqs} />
        </div>
      )}

      <CtaSection />
    </div>
  );
}

