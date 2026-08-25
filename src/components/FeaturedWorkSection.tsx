"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { patternImageForSlug } from '@/lib/patternImage';
import type { Project } from '@/lib/types';
import { stripHtml } from '@/lib/stripHtml';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function FeaturedWorkSection({ projects }: { projects: Project[] }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current || !projects || projects.length === 0) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>('.featured-work-reveal');
      if (targets.length === 0) return;

      gsap.fromTo(targets,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top 96%',
            once: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={container} id="featured-work" className="relative px-[6vw] py-[80px] md:py-[100px] z-10 max-w-[1280px] mx-auto">

      {/* Heading */}
      <div className="featured-work-reveal flex flex-col md:flex-row md:items-end justify-between gap-[16px] mb-[40px] md:mb-[52px]">
        <div>
          <div className="inline-flex items-center gap-[6px] px-[12px] py-[3.5px] rounded-full bg-[rgba(23,104,214,0.07)] border border-[rgba(23,104,214,0.2)] text-[var(--accent)] text-[11px] font-mono font-semibold uppercase mb-[8px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)]" />
            <span className="before:content-['05_//_']">Featured work</span>
          </div>
          <h2 className="text-[clamp(26px,3.6vw,44px)] font-[var(--font-display)] font-bold leading-[1.1] text-[var(--ink)]">
            Real outcomes,{' '}
            <span className="text-[var(--accent)]">not portfolio filler</span>.
          </h2>
        </div>
        <Link
          href="/work"
          className="inline-flex items-center gap-[6px] text-[13.5px] font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors group shrink-0"
        >
          <span>See all case studies</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Direct Link Cards (No Popup Modal, Instant Direct Navigation) */}
      <div className="featured-work-reveal grid grid-cols-1 md:grid-cols-3 gap-[24px]">
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/work/${p.slug}`}
            className="group flex flex-col justify-between text-left rounded-[22px] bg-[var(--surface)] border border-[rgba(10,23,47,0.14)] overflow-hidden hover:border-[rgba(23,104,214,0.4)] hover:shadow-[0_20px_45px_rgba(23,104,214,0.14)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
          >
            <div>
              {/* Photo Banner with Clean Floating Badges */}
              <div className="relative h-[200px] overflow-hidden bg-[#0A1324]">
                <Image
                  src={p.imageUrl || patternImageForSlug(p.slug)}
                  alt={`${p.title} — live production showcase`}
                  title={p.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1324]/75 via-transparent to-transparent pointer-events-none" />
                
                {/* Top status & region badges */}
                <div className="absolute top-[12px] left-[12px] right-[12px] flex items-center justify-between pointer-events-none">
                  <span className="mono text-[10.5px] font-bold px-[10px] py-[3px] rounded-full bg-white/95 text-[var(--ink)] shadow-xs">
                    Next.js 15
                  </span>
                  <span className="mono text-[10.5px] font-semibold text-white bg-black/60 backdrop-blur-md px-[10px] py-[3px] rounded-full border border-white/20">
                    {p.region}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-[22px] md:p-[26px]">
                <div className="mono text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-[6px]">
                  {p.client}
                </div>
                <h3 className="text-[19px] md:text-[21px] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.25] group-hover:text-[var(--accent)] transition-colors">
                  {p.title}
                </h3>

                {/* Outcome Highlight Box */}
                {p.result && (
                  <div className="mt-[12px] flex items-start gap-[8px] px-[12px] py-[8px] rounded-[10px] bg-blue-50/80 border border-blue-100/90 text-[12px] text-[var(--accent)] font-semibold leading-[1.45]">
                    <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)] mt-[5px] shrink-0 animate-pulse" />
                    <span className="line-clamp-2">{p.result}</span>
                  </div>
                )}

                <p className="mt-[12px] text-[13.5px] text-[var(--muted)] leading-[1.6] line-clamp-2">
                  {stripHtml(p.summary || p.detail)}
                </p>
              </div>
            </div>

            {/* Card Action Footer */}
            <div className="px-[22px] md:px-[26px] pb-[20px] pt-[12px] border-t border-[var(--line)] flex items-center justify-between">
              <span className="text-[13px] font-bold text-[var(--accent)] group-hover:text-[var(--ink)] transition-colors flex items-center gap-[6px]">
                <span>Read Case Study</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              {p.url && (
                <span className="mono text-[11px] text-emerald-600 font-semibold flex items-center gap-[4px]">
                  <span className="w-[5px] h-[5px] rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Site ↗</span>
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
