"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaSection from './CtaSection';
import FaqSection, { type FaqItem } from './FaqSection';
import type { Service } from '@/lib/types';
import Breadcrumbs from './Breadcrumbs';
import { regionToSlug } from '@/lib/regions';
import { citySlug } from '@/lib/cities';
import { serviceIllustration } from '@/lib/serviceIllustration';
import { tiltOnMouseMove, tiltOnMouseLeave } from '@/hooks/tilt';
import { stripHtml } from '@/lib/stripHtml';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function ServicesContent({
  services,
  regionsByService = {},
  citiesByService = {},
  faqs,
}: {
  services: Service[];
  regionsByService?: Record<string, string[]>;
  citiesByService?: Record<string, string[]>;
  faqs: FaqItem[];
}) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.service-card');
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 96%',
              once: true,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [services]);

  return (
    <div ref={container}>
      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <Breadcrumbs items={[{ label: 'Services', href: '/services' }]} />
        <h1 className="text-[clamp(32px,4.8vw,64px)] font-[var(--font-display)] font-bold leading-[1.1] text-[var(--ink)] tracking-tight">
          Full-stack expertise, end to end.
        </h1>
        <p className="mt-[24px] max-w-[580px] text-[var(--muted)] text-[18px] leading-[1.7]">
          Nine practice areas, one senior team. We plug in wherever your product needs us — from architecture and design to full-scale build.
        </p>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        <h2 className="text-[14px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px]">
          What we build
        </h2>

        {/* Table of contents */}
        <nav aria-label="Services on this page" className="mb-[36px] flex flex-wrap gap-[8px]">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="mono text-[13px] px-[14px] py-[7px] rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[rgba(23,104,214,0.4)] transition-colors font-medium"
            >
              {s.num} {s.title}
            </a>
          ))}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {services.map((s) => (
            <div
              key={s.num}
              id={s.slug}
              onMouseMove={(e) => tiltOnMouseMove(e, 4)}
              onMouseLeave={tiltOnMouseLeave}
              style={{ transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s, border-color 0.3s' }}
              className="service-card group relative rounded-[22px] bg-white border border-[rgba(10,23,47,0.12)] shadow-[0_10px_35px_rgba(10,23,47,0.05)] overflow-hidden flex flex-col scroll-mt-[100px] cursor-pointer hover:border-[var(--accent)] hover:shadow-[0_24px_60px_rgba(23,104,214,0.16)] transition-all duration-300"
            >
              <Link
                href={`/services/${s.slug}`}
                className="absolute inset-0 z-10"
                aria-label={`View full details for ${s.title}`}
              />

              {/* Service Showcase Image */}
              <div className="relative aspect-[16/9] bg-[#0A172F] overflow-hidden">
                {s.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- admin-supplied arbitrary URL, host unknown ahead of time
                  <img
                    src={s.imageUrl}
                    alt={`${s.title} services by Quantyro Technologies`}
                    title={s.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-108"
                  />
                ) : (
                  <Image
                    src={serviceIllustration(s.slug)}
                    alt={`${s.title} services by Quantyro Technologies`}
                    title={s.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-600 ease-out group-hover:scale-108"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A172F]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Floating Arrow Badge */}
                <div className="absolute top-[12px] right-[12px] w-[36px] h-[36px] rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center opacity-0 -translate-y-2 translate-x-2 rotate-[-35deg] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:rotate-0 transition-all duration-300 ease-out shadow-[0_6px_18px_rgba(10,23,47,0.25)]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </div>

                {/* Status HUD Tag */}
                <div className="absolute bottom-[12px] left-[12px] inline-flex items-center gap-[6px] px-[10px] py-[3.5px] rounded-full bg-[#0A172F]/90 backdrop-blur-md border border-white/20 text-white text-[11.5px] font-mono font-medium shadow-md">
                  <span className="w-[5.5px] h-[5.5px] rounded-full bg-[#00E599] animate-pulse" />
                  <span>Production SLA</span>
                </div>
              </div>

              {/* Card Body with +2px Typography & Clean Spacing */}
              <div className="p-[22px] md:p-[26px] flex flex-col flex-1 justify-between bg-white">
                <div>
                  {/* Category Pill & Number */}
                  <div className="flex items-center justify-between mb-[12px]">
                    <span className="text-[13px] font-mono font-bold text-[var(--accent)] bg-[rgba(23,104,214,0.08)] px-[11px] py-[3.5px] rounded-full border border-[rgba(23,104,214,0.2)]">
                      Service {s.num}
                    </span>
                    <span className="text-[13px] font-mono text-slate-600 font-medium">Enterprise Ready</span>
                  </div>

                  {/* Title (+2px) */}
                  <h3 className="text-[21px] md:text-[23px] font-[var(--font-display)] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-300 leading-[1.2]">
                    {s.title}
                  </h3>

                  {/* Description (+2px, generous lines) */}
                  <p className="mt-[10px] text-slate-700 text-[15px] md:text-[15.5px] leading-[1.65] line-clamp-3 font-normal">
                    {stripHtml(s.desc)}
                  </p>

                  {/* What's Included Section */}
                  <div className="mt-[20px] pt-[16px] border-t border-[rgba(10,23,47,0.08)]">
                    <h4 className="text-[12px] font-mono font-bold uppercase tracking-wider text-[var(--ink)] mb-[10px] flex items-center gap-[6px]">
                      <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
                      What&apos;s Included
                    </h4>
                    <ul className="space-y-[8px]">
                      {s.capabilities.slice(0, 4).map((c) => (
                        <li key={c} className="text-[14px] text-slate-800 flex items-start gap-[8px] leading-snug">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2.5px]">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span className="font-medium">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-[24px] pt-[16px] border-t border-[rgba(10,23,47,0.08)] flex items-center justify-between">
                  <span className="inline-flex items-center gap-[8px] text-[14.5px] font-bold text-[var(--accent)] group-hover:text-[var(--ink)] transition-colors">
                    <span>View full details</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-mono text-[16px]">→</span>
                  </span>
                  <span className="text-[12px] font-mono text-slate-600">100% IP Ownership</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FaqSection heading="Services FAQ" items={faqs} />

      <CtaSection />
    </div>
  );
}
