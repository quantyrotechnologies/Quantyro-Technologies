"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaSection from './CtaSection';
import FaqSection, { type FaqItem } from './FaqSection';
import type { Service } from '@/lib/types';
import Breadcrumbs from './Breadcrumbs';
import { regionToSlug } from '@/lib/regions';
import { citySlug } from '@/lib/cities';
import { serviceIllustration } from '@/lib/serviceIllustration';
import { tiltOnMouseMove, tiltOnMouseLeave } from '@/hooks/tilt';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.service-card').forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <Breadcrumbs items={[{ label: 'Services', href: '/services' }]} />
        <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">Services</div>
        <h1 className="text-[clamp(36px,6vw,72px)] max-w-[18ch] font-[var(--font-display)] font-bold leading-[1]">
          Full-stack expertise, end to end.
        </h1>
        <p className="mt-[24px] max-w-[560px] text-[var(--muted)] text-[16px] leading-[1.7]">
          Seven practice areas, one senior team. We plug in wherever your product needs us — from a single sprint to the full build.
        </p>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px]">
          What we build
        </h2>

        {/* Table of contents */}
        <nav aria-label="Services on this page" className="mb-[36px] flex flex-wrap gap-[8px]">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="mono text-[11.5px] px-[12px] py-[6px] rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[rgba(23,104,214,0.4)] transition-colors"
            >
              {s.num} {s.title}
            </a>
          ))}
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
          {services.map((s) => (
            <div
              key={s.num}
              id={s.slug}
              onMouseMove={(e) => tiltOnMouseMove(e, 4)}
              onMouseLeave={tiltOnMouseLeave}
              style={{ transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s, border-color 0.3s' }}
              className="service-card group relative rounded-[16px] bg-[var(--surface)] border border-[var(--line)] overflow-hidden flex flex-col scroll-mt-[100px] cursor-pointer hover:border-[rgba(23,104,214,0.4)] hover:shadow-[0_20px_50px_rgba(23,104,214,0.15)]"
            >
              <Link
                href={`/services/${s.slug}`}
                className="absolute inset-0 z-10"
                aria-label={`View full details for ${s.title}`}
              />

              <div className="relative aspect-[16/9] bg-[var(--bg-alt)] overflow-hidden">
                {s.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- admin-supplied arbitrary URL, host unknown ahead of time
                  <img
                    src={s.imageUrl}
                    alt={`${s.title} services by Quantyro Technologies`}
                    title={s.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                ) : (
                  <Image
                    src={serviceIllustration(s.slug)}
                    alt={`${s.title} services by Quantyro Technologies`}
                    title={s.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-[10px] right-[10px] w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center opacity-0 -translate-y-2 translate-x-2 rotate-[-35deg] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:rotate-0 transition-all duration-300 ease-out shadow-[0_4px_14px_rgba(10,23,47,0.25)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </div>
              </div>
              <div className="p-[18px] flex flex-col flex-1">
              <span className="text-[11px] text-[var(--muted)] mono">{s.num}</span>
              <h3 className="mt-[8px] text-[18px] font-[var(--font-display)] font-bold group-hover:text-[var(--accent)] transition-colors duration-300">{s.title}</h3>
              <p className="mt-[6px] text-[var(--muted)] text-[13px] leading-[1.5] line-clamp-2">{s.desc}</p>

              <h4 className="mt-[12px] text-[9.5px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)]">
                What&apos;s included
              </h4>
              <ul className="mt-[7px] space-y-[5px]">
                {s.capabilities.slice(0, 3).map((c) => (
                  <li key={c} className="text-[12px] text-[var(--ink)] flex items-start gap-[6px]">
                    <span className="mt-[6px] w-[4px] h-[4px] rounded-full bg-[var(--accent)] flex-none" />
                    <span className="line-clamp-1">{c}</span>
                  </li>
                ))}
              </ul>

              <h5 className="mt-[12px] text-[9px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)]">
                Tech stack
              </h5>
              <div className="mt-[7px] flex flex-wrap gap-[6px]">
                {(s.stack ?? []).slice(0, 5).map((t) => (
                  <span key={t} className="mono text-[10px] px-[8px] py-[3.5px] rounded-full border border-[var(--line)] text-[var(--muted)]">
                    {t}
                  </span>
                ))}
              </div>

              <span className="mt-[14px] inline-flex items-center gap-[6px] text-[12px] font-semibold text-[var(--accent)]">
                View full details
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>

              {((regionsByService[s.id]?.length ?? 0) > 0 || (citiesByService[s.id]?.length ?? 0) > 0) && (
                <>
                  <h5 className="mt-[12px] text-[9px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)]">
                    Also serving
                  </h5>
                  <div className="mt-[7px] flex flex-wrap gap-[6px]">
                    {(regionsByService[s.id] ?? []).slice(0, 4).map((region) => (
                      <a
                        key={region}
                        href={`/services/${s.slug}/${regionToSlug(region)}`}
                        className="relative z-20 mono text-[10px] px-[8px] py-[3.5px] rounded-full border border-[rgba(23,104,214,0.25)] text-[var(--accent)] hover:bg-[rgba(23,104,214,0.06)] transition-colors"
                      >
                        {s.title} in {region}
                      </a>
                    ))}
                    {(citiesByService[s.id] ?? []).slice(0, 6).map((city) => (
                      <a
                        key={city}
                        href={`/services/${s.slug}/${citySlug(city)}`}
                        className="relative z-20 mono text-[10px] px-[8px] py-[3.5px] rounded-full border border-[rgba(23,104,214,0.25)] text-[var(--accent)] hover:bg-[rgba(23,104,214,0.06)] transition-colors"
                      >
                        {s.title} in {city}
                      </a>
                    ))}
                  </div>
                </>
              )}
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
