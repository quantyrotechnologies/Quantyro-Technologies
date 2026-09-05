"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tiltOnMouseMove, tiltOnMouseLeave } from '@/hooks/tilt';
import { serviceIllustration } from '@/lib/serviceIllustration';
import { stripHtml } from '@/lib/stripHtml';
import type { Service } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.config({ nullTargetWarn: false });

export default function ServicesSection({ services }: { services: Service[] }) {
  const container = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    const section = container.current;
    if (!track || !section) return;

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
            start: 'top 85%',
          },
        }
      );
    }

    // Horizontal pinned scroll only on wide and tall desktop screens
    mm.add('(min-width: 1024px) and (min-height: 680px)', () => {
      const getDistance = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.08;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.round(getDistance())}`,
          pin: true,
          scrub: 0.1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true,
        },
      });
    });
  }, { scope: container, dependencies: [services] });

  return (
    <section
      ref={container}
      id="services-wrapper"
      className="relative w-full bg-white z-10 overflow-hidden"
    >
      <div className="w-full flex flex-col justify-start min-h-0 lg:min-h-screen py-[60px] lg:pt-[95px] lg:pb-[35px]">
        {/* Heading with safe navbar clearance */}
        <div className="services-heading shrink-0 px-[6vw] pb-[16px] md:pb-[20px] flex flex-col md:flex-row md:items-end justify-between gap-[16px]">
          <div>
            <div className="inline-flex items-center gap-[6px] px-[12px] py-[3.5px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.2)] text-[var(--accent)] text-[11.5px] font-mono font-semibold uppercase mb-[8px]">
              <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] animate-pulse" />
              <span>Enterprise Services</span>
            </div>

            <h2 className="text-[clamp(26px,3.6vw,44px)] font-[var(--font-display)] font-bold leading-[1.12] text-[var(--ink)] tracking-tight">
              Nine services,{' '}
              <span className="text-[var(--accent)]">one senior team</span>.
            </h2>
          </div>

          {/* Explore all services link */}
          <Link
            href="/services"
            className="inline-flex items-center gap-[6px] text-[14px] md:text-[15px] font-bold text-[var(--accent)] hover:text-[var(--ink)] transition-colors group shrink-0"
          >
            <span>Explore all services</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 font-mono">→</span>
          </Link>
        </div>

        {/* Horizontal Cards Track */}
        <div
          ref={trackRef}
          id="services-track"
          className="flex items-start pl-[6vw] pr-[6vw] lg:pr-0 flex-1 min-h-0 will-change-transform overflow-x-auto lg:overflow-visible no-scrollbar pb-[20px] lg:pb-0 pt-[10px]"
        >
          {services.map((s) => (
            <Link
              key={s.num}
              href={`/services/${s.slug}`}
              title={`${s.title} — Quantyro Technologies`}
              onMouseMove={(e) => tiltOnMouseMove(e, 6)}
              onMouseLeave={tiltOnMouseLeave}
              className="service-panel-card group relative flex-none w-[min(84vw,370px)] h-auto min-h-105 mr-[20px] md:mr-[28px] rounded-[24px] bg-white border border-[rgba(10,23,47,0.12)] shadow-[0_10px_35px_rgba(10,23,47,0.05)] hover:border-[var(--accent)] hover:shadow-[0_24px_60px_rgba(23,104,214,0.16)] p-[8px] flex flex-col justify-between overflow-hidden transition-[border-color,box-shadow] duration-300 ease-out transform-gpu"
              style={{ perspective: '1000px' }}
            >
              {/* Ambient hover glow beam */}
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[var(--accent)]/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />

              <div className="flex flex-col">
                {/* Showcase Image Frame */}
                <div className="relative h-[145px] md:h-[155px] shrink-0 rounded-[18px] overflow-hidden bg-[#0A172F]">
                  <Image
                    src={serviceIllustration(s.slug)}
                    alt={`${s.title} services by Quantyro Technologies`}
                    title={s.title}
                    fill
                    sizes="(max-width: 768px) 320px, 380px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
                    loading="lazy"
                  />

                  {/* Subtle dark gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A172F]/75 via-transparent to-black/10 pointer-events-none" />

                  {/* Status HUD Tag */}
                  <div className="absolute bottom-[10px] left-[10px] inline-flex items-center gap-[5px] px-[9px] py-[3px] rounded-full bg-[#0A172F]/95 border border-white/20 text-white text-[10.5px] font-mono font-medium shadow-md">
                    <span className="w-[5px] h-[5px] rounded-full bg-[#00E599] animate-pulse" />
                    <span>Production SLA</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="px-[16px] pt-[16px]">
                  <h3 className="text-[21px] md:text-[23px] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.2] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                    {s.title}
                  </h3>

                  <p className="mt-[10px] text-[15px] md:text-[15.5px] text-slate-700 leading-[1.6] line-clamp-2">
                    {stripHtml(s.desc)}
                  </p>
                </div>
              </div>

              {/* Bottom Capabilities Tags */}
              <div className="px-[16px] pb-[14px] pt-[14px] border-t border-[var(--line)] flex flex-col gap-[8px] shrink-0">
                <span className="text-[11.5px] font-mono font-bold uppercase tracking-wider text-slate-600">
                  What&apos;s Included
                </span>
                {s.capabilities.slice(0, 3).map((c) => (
                  <div
                    key={c}
                    title={c}
                    className="flex items-center gap-[8px] px-[10px] py-[5px] rounded-lg bg-slate-50 border border-slate-200/80 text-[13.5px] font-medium text-slate-800 group-hover:border-[rgba(23,104,214,0.3)] group-hover:bg-[rgba(23,104,214,0.04)] transition-all overflow-hidden"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
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
