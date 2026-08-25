"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Stat } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function StatsSection({ stats }: { stats: Stat[] }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current || !stats || stats.length === 0) return;

    const ctx = gsap.context(() => {
      const statTargets = gsap.utils.toArray<HTMLElement>('.stat');
      if (statTargets.length > 0) {
        gsap.fromTo(statTargets,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container.current,
              start: 'top 80%',
            },
          }
        );
      }

      const statsElements = gsap.utils.toArray<HTMLElement>('.stat .count-val');
      statsElements.forEach((el) => {
        const parent = el.closest('h2');
        const target = parseInt(parent?.dataset.count ?? '0', 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          onUpdate: () => {
            el.innerText = String(Math.round(obj.v));
          }
        });
      });
    }, container);

    return () => ctx.revert();
  }, [stats]);

  if (stats.length === 0) return null;

  return (
    <section ref={container} id="stats" className="relative py-[80px] md:py-[100px] px-[6vw] z-10">
      {/* Section Label */}
      <div className="mono text-[12px] text-[var(--muted)] mb-[40px] before:content-['05_/_']">Enterprise Impact</div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px] md:gap-[20px]">
        {stats.map((s) => (
          <div
            key={s.id}
            className="stat relative bg-white rounded-2xl p-[28px] md:p-[36px] border border-[rgba(10,23,47,0.18)] shadow-[0_4px_20px_rgba(10,23,47,0.04)] hover:border-[rgba(23,104,214,0.25)] hover:shadow-[0_8px_30px_rgba(23,104,214,0.1)] transition-all duration-300 group overflow-hidden"
          >
            {/* Subtle top border accent on hover */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
            
            {/* Soft background radial */}
            <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-[radial-gradient(circle_at_top_right,rgba(23,104,214,0.05),transparent_70%)]" />

            <h2
              data-count={s.count}
              data-suffix={s.suffix}
              className="text-[clamp(40px,5.2vw,76px)] text-[var(--ink)] font-[var(--font-display)] font-bold leading-[0.98]"
            >
              <span className="count-val" suppressHydrationWarning>0</span>
              <span className="count-suffix">{s.suffix}</span>
            </h2>
            <div className="mt-[14px] text-[13.5px] text-[var(--muted)] font-medium">{s.label}</div>
            <div className="mt-[6px] mono text-[11px] text-[var(--accent)] flex items-center gap-[4px]">
              <span className="w-[4px] h-[4px] rounded-full bg-[var(--accent)]" />
              {s.tag}
            </div>
          </div>
        ))}
      </div>

      {/* Divider stripe below stats */}
      <div className="mt-[60px] h-[1px] bg-[var(--line)]" />
    </section>
  );
}
