"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tiltOnMouseMove, tiltOnMouseLeave } from '@/hooks/tilt';
import { serviceIllustration } from '@/lib/serviceIllustration';
import { stripHtml } from '@/lib/stripHtml';
import type { Service } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function ServicesSection({ services }: { services: Service[] }) {
  const container = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = container.current;
    if (!track || !section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const headingTargets = gsap.utils.toArray<HTMLElement>('.services-heading > *');
      if (headingTargets.length > 0) {
        gsap.fromTo(
          headingTargets,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
          }
        );
      }

      mm.add('(min-width: 821px)', () => {
        const getDistance = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.06;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [services]);

  return (
    <section ref={container} id="services-wrapper" className="relative w-full h-auto md:h-[300vh] bg-white z-10">
      <div className="w-full h-auto md:sticky md:top-0 md:h-screen flex flex-col justify-center overflow-hidden">

      {/* Heading */}
      <div className="services-heading shrink-0 px-[6vw] pt-[100px] md:pt-[120px] pb-[20px] flex flex-col md:flex-row md:items-end justify-between gap-[16px]">
        <div>
          <div className="inline-flex items-center gap-[6px] px-[12px] py-[3.5px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.2)] text-[var(--accent)] text-[11.5px] font-mono font-semibold uppercase mb-[10px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] animate-pulse" />
            <span>Enterprise Services</span>
          </div>

          <h2 className="text-[clamp(26px,3.8vw,46px)] font-[var(--font-display)] font-bold leading-[1.1] text-[var(--ink)] tracking-tight">
            Seven services,{' '}
            <span className="text-[var(--accent)]">one senior team</span>.
          </h2>
        </div>

        {/* Explore all services link positioned in right corner */}
        <Link
          href="/services"
          className="inline-flex items-center gap-[6px] text-[14px] md:text-[15px] font-bold text-[var(--accent)] hover:text-[var(--ink)] transition-colors group shrink-0"
        >
          <span>Explore all services</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1 font-mono">→</span>
        </Link>
      </div>

      {/* Horizontal Cards Track with Modern Animated Cards */}
      <div
        ref={trackRef}
        id="services-track"
        className="flex items-stretch pl-[6vw] flex-1 min-h-0 will-change-transform max-md:overflow-x-auto max-md:pb-[60px] py-[24px]"
      >
        {services.map((s) => (
          <Link
            key={s.num}
            href={`/services/${s.slug}`}
            title={`${s.title} — Quantyro Technologies`}
            onMouseMove={(e) => tiltOnMouseMove(e, 6)}
            onMouseLeave={tiltOnMouseLeave}
            className="service-panel-card group relative flex-none w-[min(82vw,380px)] h-full min-h-[520px] mr-[2.5vw] rounded-[24px] bg-white border border-[rgba(10,23,47,0.12)] shadow-[0_10px_35px_rgba(10,23,47,0.05)] hover:border-[var(--accent)] hover:shadow-[0_24px_60px_rgba(23,104,214,0.16)] p-[8px] flex flex-col justify-between overflow-hidden transition-all duration-400 ease-out"
            style={{ perspective: '1000px' }}
          >
            {/* Ambient hover glow beam behind card */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-52 h-52 rounded-full bg-[var(--accent)]/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            />

            <div className="flex flex-col">
              {/* Showcase Image Frame with 8px inset container */}
              <div className="relative h-[165px] shrink-0 rounded-[18px] overflow-hidden bg-[#0A172F]">
                <Image
                  src={serviceIllustration(s.slug)}
                  alt={`${s.title} services by Quantyro Technologies`}
                  title={s.title}
                  fill
                  sizes="380px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  unoptimized
                />
                
                {/* Subtle dark gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A172F]/75 via-transparent to-black/10 pointer-events-none" />

                {/* Status HUD Tag */}
                <div className="absolute bottom-[10px] left-[10px] inline-flex items-center gap-[5px] px-[9px] py-[3px] rounded-full bg-[#0A172F]/80 backdrop-blur-md border border-white/20 text-white text-[10.5px] font-mono font-medium shadow-md">
                  <span className="w-[5px] h-[5px] rounded-full bg-[#00E599] animate-pulse" />
                  <span>Production SLA</span>
                </div>
              </div>

              {/* Title & Full Complete Description */}
              <div className="px-[14px] pt-[14px]">
                <h3 className="text-[20px] md:text-[22px] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.2] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                  {s.title}
                </h3>
                
                <p className="mt-[8px] text-[13px] md:text-[13.5px] text-[var(--muted)] leading-[1.6]">
                  {stripHtml(s.desc)}
                </p>
              </div>
            </div>

            {/* Bottom Capabilities Tags - 100% Even & Structured */}
            <div className="px-[14px] pb-[14px] pt-[12px] border-t border-[var(--line)] flex flex-col gap-[6px] shrink-0">
              {s.capabilities.slice(0, 3).map((c) => (
                <div
                  key={c}
                  title={c}
                  className="flex items-center gap-[6px] px-[9px] py-[4px] rounded-lg bg-slate-50 border border-slate-200/80 text-[11.5px] font-medium text-slate-700 group-hover:border-[rgba(23,104,214,0.3)] group-hover:bg-[rgba(23,104,214,0.04)] transition-all overflow-hidden"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="truncate">{c}</span>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}
