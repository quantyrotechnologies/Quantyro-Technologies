"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaSection from './CtaSection';
import FaqSection, { type FaqItem } from './FaqSection';
import { patternImageForSlug } from '@/lib/patternImage';
import type { Project } from '@/lib/types';
import Breadcrumbs from './Breadcrumbs';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function WorkContent({ projects, faqs }: { projects: Project[]; faqs: FaqItem[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<string | null>(projects[0]?.id ?? null);

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>('.work-row');
      rows.forEach((row) => {
        gsap.fromTo(row,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 96%', once: true },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div ref={container} className="bg-white">
      {/* Hero */}
      <section className="relative px-[6vw] pt-[150px] pb-[50px] z-10 max-w-[1280px] mx-auto">
        <Breadcrumbs items={[{ label: 'Work', href: '/work' }]} />
        <div className="inline-flex items-center gap-[6px] px-[12px] py-[3.5px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.2)] text-[var(--accent)] text-[11px] font-mono font-semibold uppercase mb-[12px]">
          <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
          <span>Case Studies &amp; Engineering Outcomes</span>
        </div>
        <h1 className="text-[clamp(32px,4.8vw,64px)] font-[var(--font-display)] font-extrabold leading-[1.08] text-[var(--ink)] tracking-tight">
          Real outcomes, across regions.
        </h1>
        <p className="mt-[20px] max-w-[580px] text-[var(--muted)] text-[15.5px] leading-[1.7]">
          A sample of enterprise engagements across our practice areas. Click a project row to explore the architectural solution and metrics.
        </p>
      </section>

      {/* Interactive Expandable Rows */}
      <section className="relative px-[6vw] pb-[100px] z-10 max-w-[1100px] mx-auto">
        <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px]">
          Selected case studies
        </h2>
        <div className="border-t border-[var(--line)]">
          {projects.map((p, i) => {
            const isOpen = openId === p.id;
            return (
              <div
                key={p.id}
                className="work-row border-b border-[var(--line)]"
                onMouseEnter={() => setOpenId(p.id)}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : p.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-[16px] py-[24px] text-left group cursor-pointer"
                >
                  <div className="flex items-baseline gap-[16px] md:gap-[28px] min-w-0">
                    <span
                      className={`mono text-[15px] md:text-[18px] font-bold shrink-0 transition-colors ${
                        isOpen ? 'text-[var(--accent)]' : 'text-[var(--muted)]/50'
                      }`}
                    >
                      {p.year ?? String(i + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className={`text-[19px] md:text-[26px] font-[var(--font-display)] font-bold truncate transition-colors ${
                        isOpen ? 'text-[var(--ink)]' : 'text-[var(--muted)]/60 group-hover:text-[var(--ink)]'
                      }`}
                    >
                      {p.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-[12px] shrink-0">
                    <span
                      className={`hidden sm:inline-flex items-center gap-[7px] px-[12px] py-[6px] rounded-full border text-[11.5px] font-semibold transition-colors ${
                        isOpen
                          ? 'border-[rgba(23,104,214,0.3)] bg-[rgba(23,104,214,0.06)] text-[var(--accent)]'
                          : 'border-[var(--line)] text-[var(--muted)]'
                      }`}
                    >
                      <span className="w-[5px] h-[5px] rounded-full bg-current" />
                      <span className="max-w-[200px] truncate">{p.result}</span>
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-[var(--muted)] transition-transform duration-300 ${isOpen ? 'rotate-45 text-[var(--accent)]' : ''}`}
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                </button>

                <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                  <div className="overflow-hidden">
                    <div className="pb-[28px]">
                      <div className="rounded-[22px] bg-[#0A1324] text-white p-[24px] md:p-[32px] flex flex-col md:flex-row gap-[28px] items-stretch border border-white/10 shadow-xl">
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="inline-flex items-center gap-[6px] text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold mb-[12px]">
                              <span aria-hidden>✳</span> Executive Overview
                            </div>
                            <p className="text-[14.5px] md:text-[15.5px] text-slate-200 leading-[1.7]">
                              {p.summary}
                            </p>
                            <div className="mt-[16px] flex items-center gap-[14px] text-[12px] text-slate-400 mono">
                              <span className="text-white font-semibold">{p.client}</span>
                              <span>·</span>
                              <span className="text-cyan-300">{p.region}</span>
                            </div>
                            {p.tags.length > 0 && (
                              <div className="mt-[16px] flex flex-wrap gap-[6px]">
                                {p.tags.map((t) => (
                                  <span key={t} className="mono text-[10.5px] px-[10px] py-[3.5px] rounded-full bg-white/[0.06] border border-white/15 text-slate-300 font-medium">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-[24px] pt-[16px] border-t border-white/10 flex items-center justify-between">
                            <Link
                              href={`/work/${p.slug}`}
                              className="inline-flex items-center gap-[6px] text-[13.5px] font-bold text-cyan-400 hover:text-white transition-all group/link"
                            >
                              <span>View complete technical case study</span>
                              <span className="transition-transform group-hover/link:translate-x-1">→</span>
                            </Link>
                            <span className="mono text-[11px] text-slate-400 hidden sm:inline">100% Client IP</span>
                          </div>
                        </div>

                        {/* Real Photography Box */}
                        <div className="relative w-full md:w-[280px] h-[180px] md:h-auto shrink-0 rounded-[16px] overflow-hidden bg-slate-900 border border-white/15">
                          <Image
                            src={patternImageForSlug(p.slug)}
                            alt={`${p.title} — case study preview`}
                            title={p.title}
                            fill
                            sizes="(min-width: 768px) 280px, 100vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FaqSection heading="Work FAQ" items={faqs} />
      <CtaSection />
    </div>
  );
}
