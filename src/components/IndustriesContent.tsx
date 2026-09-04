"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaSection from './CtaSection';
import FaqSection, { type FaqItem } from './FaqSection';
import Breadcrumbs from './Breadcrumbs';
import { industryIllustration } from '@/lib/industryIllustration';
import { citySlug } from '@/lib/cities';
import { stripHtml } from '@/lib/stripHtml';
import type { Industry } from '@/lib/types';
import { tiltOnMouseMove, tiltOnMouseLeave } from '@/hooks/tilt';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function IndustriesContent({
  industries,
  faqs,
}: {
  industries: Industry[];
  citiesByIndustry?: Record<string, string[]>;
  faqs: FaqItem[];
}) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.industry-card');
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 96%', once: true },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [industries]);

  return (
    <div ref={container}>
      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <Breadcrumbs items={[{ label: 'Industries', href: '/industries' }]} />
        <h1 className="text-[clamp(32px,4.8vw,64px)] font-[var(--font-display)] font-bold leading-[1.1] text-[var(--ink)] tracking-tight">
          Domain expertise, not a generic template.
        </h1>
        <p className="mt-[24px] max-w-[560px] text-[var(--muted)] text-[16px] leading-[1.7]">
          We&apos;ve shipped production systems in these sectors — each with its own compliance requirements, integration patterns, and failure modes we already know to design around.
        </p>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px]">
          Sectors we build for
        </h2>

        <nav aria-label="Industries on this page" className="mb-[36px] flex flex-wrap gap-[8px]">
          {industries.map((i) => (
            <a
              key={i.slug}
              href={`#${i.slug}`}
              className="mono text-[11.5px] px-[12px] py-[6px] rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[rgba(23,104,214,0.4)] transition-colors"
            >
              {i.num} {i.title}
            </a>
          ))}
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
          {industries.map((i) => (
            <Link
              key={i.num}
              href={`/industries/${i.slug}`}
              id={i.slug}
              onMouseMove={(e) => tiltOnMouseMove(e, 4)}
              onMouseLeave={tiltOnMouseLeave}
              style={{ transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s, border-color 0.3s' }}
              className="industry-card group relative rounded-[16px] bg-[var(--surface)] border border-[var(--line)] overflow-hidden flex flex-col scroll-mt-[100px] cursor-pointer hover:border-[rgba(23,104,214,0.4)] hover:shadow-[0_20px_50px_rgba(23,104,214,0.15)]"
            >
              <div className="relative aspect-[16/9] bg-[var(--bg-alt)] overflow-hidden">
                <Image
                  src={industryIllustration(i.slug)}
                  alt={`${i.title} industry solutions by Quantyro Technologies`}
                  title={i.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-[10px] right-[10px] w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center opacity-0 -translate-y-2 translate-x-2 rotate-[-35deg] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:rotate-0 transition-all duration-300 ease-out shadow-[0_4px_14px_rgba(10,23,47,0.25)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </div>
              </div>
              <div className="p-[18px] flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[var(--muted)] mono">{i.num}</span>
                  <span className="mono text-[10px] px-[8px] py-[3.5px] rounded-full bg-[rgba(23,104,214,0.08)] text-[var(--accent)] border border-[rgba(23,104,214,0.2)]">
                    {i.statValue} {i.statLabel}
                  </span>
                </div>
                <h3 className="mt-[8px] text-[18px] font-[var(--font-display)] font-bold group-hover:text-[var(--accent)] transition-colors duration-300">{i.title}</h3>
                <p className="mt-[6px] text-[var(--muted)] text-[13px] leading-[1.5] line-clamp-2">{stripHtml(i.desc)}</p>

                <h4 className="mt-[12px] text-[9.5px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)]">
                  What we deliver
                </h4>
                <ul className="mt-[7px] space-y-[5px]">
                  {i.capabilities.slice(0, 3).map((c) => (
                    <li key={c} className="text-[12px] text-[var(--ink)] flex items-start gap-[6px]">
                      <span className="mt-[6px] w-[4px] h-[4px] rounded-full bg-[var(--accent)] flex-none" />
                      <span className="line-clamp-1">{c}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-[14px] inline-flex items-center gap-[6px] text-[12px] font-semibold text-[var(--accent)]">
                  View full details
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FaqSection heading="Industries FAQ" items={faqs} />

      <CtaSection />
    </div>
  );
}
