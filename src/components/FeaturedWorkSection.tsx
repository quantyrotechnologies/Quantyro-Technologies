"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from './SmoothScroll';
import { patternImageForSlug } from '@/lib/patternImage';
import type { Project } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FeaturedWorkSection({ projects }: { projects: Project[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects.find((p) => p.id === selectedId) ?? null;

  useGSAP(() => {
    gsap.fromTo('.featured-work-reveal',
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
  }, { scope: container });

  useEffect(() => {
    if (!selected) return;

    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selected]);

  return (
    <section ref={container} id="featured-work" className="relative px-[6vw] py-[80px] md:py-[100px] z-10">

      {/* Heading */}
      <div className="featured-work-reveal flex flex-col md:flex-row md:items-end justify-between gap-[16px] mb-[40px] md:mb-[56px]">
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

      {/* Cards */}
      <div className="featured-work-reveal grid grid-cols-1 md:grid-cols-3 gap-[24px]">
        {projects.map((p) => (
          <motion.button
            key={p.id}
            type="button"
            layoutId={`featured-card-${p.id}`}
            onClick={() => setSelectedId(p.id)}
            className="text-left rounded-[22px] bg-[var(--surface)] border border-[rgba(10,23,47,0.18)] overflow-hidden hover:border-[rgba(23,104,214,0.4)] hover:shadow-[0_16px_40px_rgba(23,104,214,0.12)] hover:-translate-y-1 transition-[border-color,box-shadow,transform] duration-300 cursor-pointer"
          >
            <motion.div layoutId={`featured-visual-${p.id}`} className="relative h-[150px] overflow-hidden bg-[var(--bg-alt)]">
              <Image
                src={patternImageForSlug(p.slug)}
                alt={`${p.title} — case study cover illustration`}
                title={p.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <div className="p-[24px]">
              <div className="flex items-center justify-between text-[12px] text-[var(--muted)] mono">
                <span>{p.client}</span>
                <span>{p.region}</span>
              </div>
              <h3 className="mt-[10px] text-[18px] font-[var(--font-display)] font-bold text-[var(--ink)]">{p.title}</h3>
              <div className="mt-[8px] text-[13.5px] text-[var(--accent)] font-semibold">{p.result}</div>
              <p className="mt-[10px] text-[13px] text-[var(--muted)] leading-[1.55]">{p.summary}</p>
              <span className="mt-[14px] inline-flex items-center gap-[5px] text-[11.5px] font-semibold text-[var(--muted)]">
                Read the story
                <span aria-hidden>→</span>
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {selected && (
          <React.Fragment>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[100] bg-[rgba(10,23,47,0.55)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-[5vw] pointer-events-none">
              <motion.div
                layoutId={`featured-card-${selected.id}`}
                className="pointer-events-auto w-full max-w-[640px] max-h-[85vh] overflow-y-auto rounded-[26px] bg-[var(--surface)] border border-[rgba(10,23,47,0.18)] shadow-[0_30px_80px_rgba(10,23,47,0.3)]"
              >
                <motion.div layoutId={`featured-visual-${selected.id}`} className="relative h-[200px] overflow-hidden bg-[var(--bg-alt)]">
                  <Image
                    src={patternImageForSlug(selected.slug)}
                    alt={`${selected.title} — case study cover illustration`}
                    title={selected.title}
                    fill
                    sizes="640px"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    aria-label="Close"
                    className="absolute top-[16px] right-[16px] w-[36px] h-[36px] rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[var(--ink)] shadow-md transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </motion.div>

                <motion.div
                  className="p-[32px] md:p-[40px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                >
                  <div className="flex items-center justify-between text-[12px] text-[var(--muted)] mono">
                    <span>{selected.client}</span>
                    <span>{selected.region}</span>
                  </div>
                  <h3 className="mt-[10px] text-[26px] md:text-[30px] font-[var(--font-display)] font-bold text-[var(--ink)]">
                    {selected.title}
                  </h3>
                  <div className="mt-[10px] text-[15px] text-[var(--accent)] font-semibold">{selected.result}</div>
                  <p className="mt-[18px] text-[15px] text-[var(--muted)] leading-[1.7]">{selected.detail}</p>
                  <div className="mt-[20px] flex flex-wrap gap-[8px]">
                    {selected.tags.map((t) => (
                      <span key={t} className="mono text-[11px] px-[10px] py-[5px] rounded-full border border-[var(--line)] text-[var(--muted)]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`/work/${selected.slug}`}
                    className="mt-[26px] inline-flex items-center gap-[6px] text-[13.5px] font-semibold text-[var(--accent)] hover:text-[var(--ink)] transition-colors"
                  >
                    View full case study
                    <span aria-hidden>→</span>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </section>
  );
}
