"use client";
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Testimonial } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const active = testimonials[index];

  const go = (dir: number) => {
    setIndex(([prev]) => {
      const next = (prev + dir + testimonials.length) % testimonials.length;
      return [next, dir];
    });
  };

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [paused, testimonials.length]);

  useEffect(() => {
    if (!container.current || !testimonials || testimonials.length === 0) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>('.testimonials-reveal');
      if (targets.length === 0) return;

      gsap.fromTo(targets,
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
    }, container);

    return () => ctx.revert();
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  return (
    <section ref={container} id="testimonials" className="relative px-[6vw] py-[80px] md:py-[100px] z-10">
      <div className="testimonials-reveal text-center max-w-[600px] mx-auto mb-[48px]">
        <div className="inline-flex items-center gap-[6px] px-[12px] py-[3.5px] rounded-full bg-[rgba(23,104,214,0.07)] border border-[rgba(23,104,214,0.2)] text-[var(--accent)] text-[11px] font-mono font-semibold uppercase mb-[8px]">
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)]" />
          <span className="before:content-['06_//_']">What clients say</span>
        </div>
        <h2 className="text-[clamp(26px,3.6vw,44px)] font-[var(--font-display)] font-bold leading-[1.1] text-[var(--ink)]">
          Trusted by teams{' '}
          <span className="text-[var(--accent)]">who ship fast</span>.
        </h2>

        {/* Visible Aggregate Rating Badge matching Schema */}
        <div className="mt-[16px] inline-flex items-center gap-[8px] px-[14px] py-[6px] rounded-full bg-white border border-[rgba(23,104,214,0.18)] shadow-sm text-[12.5px] text-[var(--ink)]">
          <div className="flex items-center text-[#FFB800] text-[14px] tracking-[-1px]">
            ★★★★★
          </div>
          <span className="font-bold">4.8 / 5.0</span>
          <span className="text-[var(--muted)]">·</span>
          <span className="text-[var(--muted)]">250+ verified client reviews</span>
        </div>
      </div>

      <div
        className="testimonials-reveal relative max-w-[760px] mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative rounded-[28px] bg-[var(--surface)] border border-[rgba(10,23,47,0.18)] shadow-[0_16px_50px_rgba(10,23,47,0.06)] px-[32px] py-[44px] md:px-[64px] md:py-[56px] overflow-hidden min-h-[320px] flex items-center">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full text-center"
            >
              <div className="flex items-center justify-center gap-[3px] mb-[18px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-[#FFB800] text-[16px]">★</span>
                ))}
              </div>
              <p className="text-[18px] md:text-[21px] leading-[1.55] text-[var(--ink)] font-[var(--font-display)] font-medium">
                &ldquo;{active.quote}&rdquo;
              </p>
              <div className="mt-[28px] flex items-center justify-center gap-[12px]">
                <div
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
                  style={{ background: active.avatarBg, color: active.avatarFg }}
                >
                  {active.initials}
                </div>
                <div className="text-left">
                  <div className="text-[14px] font-semibold text-[var(--ink)]">{active.name}</div>
                  <div className="text-[12.5px] text-[var(--muted)]">{active.role}, {active.company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav arrows */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-[54px] w-[42px] h-[42px] rounded-full border border-[var(--line)] bg-white items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[rgba(23,104,214,0.4)] transition-colors shadow-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-[54px] w-[42px] h-[42px] rounded-full border border-[var(--line)] bg-white items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] hover:border-[rgba(23,104,214,0.4)] transition-colors shadow-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>

        {/* Dots */}
        <div className="flex items-center justify-center gap-[8px] mt-[24px]">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex([i, i > index ? 1 : -1])}
              aria-label={`Show testimonial from ${t.name}`}
              className={`h-[7px] rounded-full transition-all duration-300 ${
                i === index ? 'w-[22px] bg-[var(--accent)]' : 'w-[7px] bg-[rgba(10,23,47,0.15)] hover:bg-[rgba(23,104,214,0.4)]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
