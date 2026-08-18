"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaSection from './CtaSection';
import FaqSection, { type FaqItem } from './FaqSection';
import type { Service } from '@/lib/types';
import Breadcrumbs from './Breadcrumbs';
import { regionToSlug } from '@/lib/regions';
import { serviceIllustration } from '@/lib/serviceIllustration';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ServicesContent({
  services,
  regionsByService = {},
  faqs,
}: {
  services: Service[];
  regionsByService?: Record<string, string[]>;
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
          Five practice areas, one senior team. We plug in wherever your product needs us — from a single sprint to the full build.
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {services.map((s) => (
            <div
              key={s.num}
              id={s.slug}
              className="service-card rounded-[22px] bg-[var(--surface)] border border-[var(--line)] overflow-hidden flex flex-col scroll-mt-[100px]"
            >
              <div className="relative h-[130px] bg-[var(--bg-alt)]">
                <Image
                  src={serviceIllustration(s.slug)}
                  alt={`${s.title} — illustration of the delivery approach`}
                  title={s.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-[36px] flex flex-col flex-1">
              <span className="text-[13px] text-[var(--muted)] mono">{s.num}</span>
              <h3 className="mt-[14px] text-[26px] font-[var(--font-display)] font-bold">{s.title}</h3>
              <p className="mt-[12px] text-[var(--muted)] text-[15px] leading-[1.6]">{s.desc}</p>

              <h4 className="mt-[20px] text-[11px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)]">
                What&apos;s included
              </h4>
              <ul className="mt-[10px] space-y-[8px]">
                {s.capabilities.map((c) => (
                  <li key={c} className="text-[14px] text-[var(--ink)] flex items-start gap-[8px]">
                    <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[var(--accent)] flex-none" />
                    {c}
                  </li>
                ))}
              </ul>

              <h5 className="mt-[20px] text-[10.5px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)]">
                Tech stack
              </h5>
              <div className="mt-[10px] flex flex-wrap gap-[8px]">
                {(s.stack ?? []).map((t) => (
                  <span key={t} className="mono text-[11px] px-[10px] py-[5px] rounded-full border border-[var(--line)] text-[var(--muted)]">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={`/services/${s.slug}`}
                className="mt-[24px] inline-flex items-center gap-[6px] text-[13.5px] font-semibold text-[var(--accent)] hover:gap-[9px] transition-all"
              >
                View full details →
              </a>

              {(regionsByService[s.id]?.length ?? 0) > 0 && (
                <>
                  <h5 className="mt-[20px] text-[10.5px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)]">
                    Also serving
                  </h5>
                  <div className="mt-[10px] flex flex-wrap gap-[8px]">
                    {regionsByService[s.id].map((region) => (
                      <a
                        key={region}
                        href={`/services/${s.slug}/${regionToSlug(region)}`}
                        className="mono text-[11px] px-[10px] py-[5px] rounded-full border border-[rgba(23,104,214,0.25)] text-[var(--accent)] hover:bg-[rgba(23,104,214,0.06)] transition-colors"
                      >
                        {s.title} in {region}
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
