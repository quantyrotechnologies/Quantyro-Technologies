"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { patternImageForSlug } from '@/lib/patternImage';
import { serviceSlugForTag } from '@/lib/serviceTagMap';
import Breadcrumbs from './Breadcrumbs';
import TableOfContents from './TableOfContents';
import CtaSection from './CtaSection';
import RichText from './RichText';
import type { Project } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function WorkDetailContent({ project }: { project: Project }) {
  const container = useRef<HTMLDivElement>(null);

  const tocItems = [
    { id: 'overview', label: 'Overview' },
    ...(project.stack && project.stack.length > 0 ? [{ id: 'stack', label: 'Tech stack' }] : []),
    ...(project.highlights && project.highlights.length > 0 ? [{ id: 'highlights', label: 'What made this hard' }] : []),
  ];

  const highlights = [
    { icon: 'check', label: project.result },
    ...(project.duration ? [{ icon: 'bolt', label: `Delivered in ${project.duration}` }] : []),
    { icon: 'shield', label: project.region },
  ];

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>('.wd-reveal');
      reveals.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 96%', once: true },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [project]);

  return (
    <div ref={container}>
      <section className="relative px-[6vw] pt-[160px] pb-[70px] z-10 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[60vw] h-[420px] opacity-[0.5] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 70% 20%, var(--${project.accent}) 0%, transparent 65%)` }}
        />

        <div className="relative max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-[32px] items-center">
          <div>
            <Breadcrumbs items={[{ label: 'Work', href: '/work' }, { label: project.title, href: `/work/${project.slug}` }]} />
            <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">
              {project.client} · {project.region}{project.year ? ` · ${project.year}` : ''}
            </div>
            <h1 className="wd-reveal text-[clamp(32px,5.4vw,56px)] max-w-[20ch] font-[var(--font-display)] font-bold leading-[1.05]">
              {project.title}
            </h1>

            {project.summary && (
              <p className="wd-reveal mt-[16px] text-[15px] md:text-[16.5px] text-[var(--muted)] leading-[1.65] max-w-[560px]">
                {project.summary}
              </p>
            )}

            <div className="wd-reveal mt-[22px] flex flex-wrap gap-[10px]">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="inline-flex items-center gap-[7px] px-[13px] py-[7px] rounded-full bg-white border border-[rgba(10,23,47,0.18)] shadow-[0_2px_10px_rgba(10,23,47,0.04)] text-[12.5px] font-medium text-[var(--ink)]"
                >
                  <span
                    className="w-[16px] h-[16px] rounded-full flex items-center justify-center"
                    style={{ background: `color-mix(in srgb, var(--${project.accent}) 12%, transparent)`, color: `var(--${project.accent})` }}
                  >
                    {h.icon === 'check' && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    )}
                    {h.icon === 'bolt' && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" /></svg>
                    )}
                    {h.icon === 'shield' && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    )}
                  </span>
                  {h.label}
                </div>
              ))}
            </div>

            {/* Visit Live Website Button */}
            {project.url && (
              <div className="wd-reveal mt-[24px]">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[9px] px-[20px] py-[10px] rounded-full bg-[var(--accent)] text-white text-[13.5px] font-bold shadow-[0_4px_16px_rgba(23,104,214,0.3)] hover:bg-[#0A1324] hover:shadow-lg transition-all"
                >
                  <span>Visit Live Website</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {/* Browser Mockup Visual Card */}
          <div className="wd-reveal hidden md:block rounded-[22px] bg-[#0A1324] border border-[rgba(10,23,47,0.2)] shadow-[0_24px_60px_rgba(10,23,47,0.18)] p-[10px] overflow-hidden">
            <div className="flex items-center justify-between px-[12px] py-[6px] border-b border-white/10 text-white/50 text-[11px] mono">
              <div className="flex items-center gap-[6px]">
                <span className="w-[8px] h-[8px] rounded-full bg-red-400/80" />
                <span className="w-[8px] h-[8px] rounded-full bg-amber-400/80" />
                <span className="w-[8px] h-[8px] rounded-full bg-emerald-400/80" />
              </div>
              <span className="truncate max-w-[200px] text-slate-400">{project.url ? project.url.replace(/^https?:\/\//, '') : project.slug}</span>
              <span className="text-emerald-400 font-semibold">Live ⚡</span>
            </div>
            <div className="relative w-full h-[240px] rounded-[10px] overflow-hidden bg-slate-900 mt-[6px]">
              <Image
                src={project.imageUrl || patternImageForSlug(project.slug)}
                alt={`${project.title} — live production screenshot`}
                title={project.title}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-[6vw] pb-[60px] z-10 max-w-[1100px] mx-auto">
        {tocItems.length > 1 && (
          <div className="wd-reveal max-w-[500px]">
            <TableOfContents items={tocItems} />
          </div>
        )}

        <h2 id="overview" className="wd-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px] scroll-mt-[100px]">
          Overview
        </h2>
        <RichText
          html={project.detail}
          className="wd-reveal text-[16px] text-[var(--ink)]/85 leading-[1.75] max-w-[760px] mb-[16px]"
        />
        {project.tags.length > 0 && (
          <div className="wd-reveal flex flex-wrap gap-[8px] mb-[56px]">
            {project.tags.map((t) => {
              const serviceSlug = serviceSlugForTag(t);
              return serviceSlug ? (
                <Link
                  key={t}
                  href={`/services/${serviceSlug}`}
                  className="mono text-[11px] px-[10px] py-[5px] rounded-full border border-[var(--line)] text-[var(--accent)] hover:bg-[rgba(23,104,214,0.06)] transition-colors"
                >
                  {t} →
                </Link>
              ) : (
                <span key={t} className="mono text-[11px] px-[10px] py-[5px] rounded-full border border-[var(--line)] text-[var(--muted)]">
                  {t}
                </span>
              );
            })}
          </div>
        )}
        {project.tags.length === 0 && <div className="mb-[40px]" />}

        {project.stack && project.stack.length > 0 && (
          <>
            <h2 id="stack" className="wd-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px] scroll-mt-[100px]">
              Tech stack
            </h2>
            <div className="wd-reveal rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-[16px] flex flex-wrap gap-[8px] mb-[56px] max-w-[760px]">
              {project.stack.map((t) => (
                <span key={t} className="inline-flex items-center gap-[6px] mono text-[11px] px-[10px] py-[5px] rounded-full border border-[var(--line)] bg-white text-[var(--muted)]">
                  <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
                  {t}
                </span>
              ))}
            </div>
          </>
        )}

        {project.highlights && project.highlights.length > 0 && (
          <>
            <h2 id="highlights" className="wd-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px] scroll-mt-[100px]">
              What made this hard
            </h2>
            <div className="wd-reveal grid grid-cols-1 md:grid-cols-2 gap-[12px] mb-[40px] max-w-[760px]">
              {project.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-[12px] rounded-[14px] border border-[var(--line)] bg-[var(--surface)] px-[16px] py-[14px]"
                >
                  <span className="shrink-0 w-[26px] h-[26px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.18)] flex items-center justify-center text-[var(--accent)]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" /></svg>
                  </span>
                  <span className="text-[14px] text-[var(--ink)] font-medium">{h}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <CtaSection />
    </div>
  );
}
