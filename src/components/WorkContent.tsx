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
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 88%' },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div ref={container}>
      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <Breadcrumbs items={[{ label: 'Work', href: '/work' }]} />
        <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">Work</div>
        <h1 className="text-[clamp(36px,6vw,72px)] max-w-[18ch] font-[var(--font-display)] font-bold leading-[1]">
          Real outcomes, across regions.
        </h1>
        <p className="mt-[24px] max-w-[560px] text-[var(--muted)] text-[16px] leading-[1.7]">
          A sample of engagements across our practice areas. Click a case study to read the full story.
        </p>
      </section>

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
                  className="w-full flex items-center justify-between gap-[16px] py-[24px] text-left group"
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
                      className={`text-[19px] md:text-[28px] font-[var(--font-display)] font-bold truncate transition-colors ${
                        isOpen ? 'text-[var(--ink)]' : 'text-[var(--muted)]/50 group-hover:text-[var(--ink)]/70'
                      }`}
                    >
                      {p.title}
                    </h3>
                  </div>
                  <span
                    className={`hidden sm:inline-flex shrink-0 items-center gap-[7px] px-[14px] py-[8px] rounded-full border text-[12px] font-semibold transition-colors ${
                      isOpen
                        ? 'border-[rgba(23,104,214,0.3)] bg-[rgba(23,104,214,0.06)] text-[var(--accent)]'
                        : 'border-[var(--line)] text-[var(--muted)]'
                    }`}
                  >
                    <span className="w-[6px] h-[6px] rounded-full bg-current" />
                    {p.result}
                  </span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                    className={`shrink-0 text-[var(--muted)] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>

                <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                  <div className="overflow-hidden">
                    <div className="pb-[28px]">
                      <div className="rounded-[22px] bg-[var(--ink)] p-[20px] md:p-[28px] flex flex-col md:flex-row gap-[24px] items-stretch">
                        <div className="flex-1 min-w-0">
                          <div className="inline-flex items-center gap-[6px] text-[11px] font-mono uppercase tracking-wide text-white/50 mb-[14px]">
                            <span aria-hidden>✳</span> Overview
                          </div>
                          <p className="text-[14.5px] md:text-[15.5px] text-white/90 leading-[1.75]">
                            {p.detail}
                          </p>
                          <div className="mt-[18px] flex items-center gap-[16px] text-[12px] text-white/50 mono">
                            <span>{p.client}</span>
                            <span>·</span>
                            <span>{p.region}</span>
                          </div>
                          {p.tags.length > 0 && (
                            <div className="mt-[16px] flex flex-wrap gap-[8px]">
                              {p.tags.map((t) => (
                                <span key={t} className="mono text-[11px] px-[10px] py-[4px] rounded-full border border-white/15 text-white/70">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                          <Link
                            href={`/work/${p.slug}`}
                            className="mt-[20px] inline-flex items-center gap-[6px] text-[13px] font-semibold text-white hover:gap-[9px] transition-all"
                          >
                            View full case study →
                          </Link>
                        </div>
                        <div className="relative w-full md:w-[260px] h-[160px] md:h-auto shrink-0 rounded-[14px] overflow-hidden bg-white">
                          <Image
                            src={patternImageForSlug(p.slug)}
                            alt={`${p.title} — case study cover illustration`}
                            title={p.title}
                            fill
                            sizes="(min-width: 768px) 260px, 100vw"
                            className="object-cover"
                          />
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
