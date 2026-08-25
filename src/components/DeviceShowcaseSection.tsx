"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { DEFAULT_SHOWCASE_ITEMS, type ShowcaseItem } from '@/lib/data/showcase';
import RichText from './RichText';

export default function DeviceShowcaseSection({ items = DEFAULT_SHOWCASE_ITEMS }: { items?: ShowcaseItem[] }) {
  const showcaseList = items && items.length > 0 ? items : DEFAULT_SHOWCASE_ITEMS;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const activeItem = showcaseList[activeIndex] || showcaseList[0];

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % showcaseList.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + showcaseList.length) % showcaseList.length);
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  // Optional subtle auto-rotation (can be paused on hover)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [showcaseList.length]);

  return (
    <section className="relative px-[6vw] py-[60px] md:py-[85px] z-10 overflow-hidden bg-gradient-to-b from-transparent via-[var(--bg-alt)]/35 to-transparent">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--accent)]/10 blur-[110px] rounded-full -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto">
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[20px] mb-[28px] md:mb-[36px]">
          <div className="max-w-[700px]">
            <div className="inline-flex items-center gap-[7px] mono text-[11.5px] uppercase font-semibold text-[var(--accent)] px-[12px] py-[4px] rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-[10px]">
              <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)] animate-pulse" />
              Engineering &amp; Platform Architecture
            </div>

            <h2 className="text-[clamp(26px,3.6vw,42px)] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.12] tracking-tight">
              Architecting High-Impact Websites, Cloud &amp; AI Platforms
            </h2>
          </div>

          {/* Integrated Slider Controls in Header */}
          <div className="flex items-center gap-[12px] shrink-0">
            {/* Step Counter */}
            <div className="mono text-[13px] font-bold text-[var(--ink)] px-[14px] py-[6px] rounded-full bg-white border border-[rgba(10,23,47,0.12)] shadow-xs">
              <span className="text-[var(--accent)]">0{activeIndex + 1}</span>
              <span className="text-[var(--muted)]"> / 0{showcaseList.length}</span>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-[6px]">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="w-[38px] h-[38px] rounded-full bg-white border border-[rgba(10,23,47,0.12)] flex items-center justify-center text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] shadow-xs transition-all cursor-pointer"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Slide"
                className="w-[38px] h-[38px] rounded-full bg-white border border-[rgba(10,23,47,0.12)] flex items-center justify-center text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] shadow-xs transition-all cursor-pointer"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Sliding Card Window */}
        <div className="relative rounded-[28px] bg-white border border-[rgba(10,23,47,0.12)] p-[32px] md:p-[48px] shadow-[0_20px_50px_rgba(10,23,47,0.06)] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[36px] md:gap-[56px] items-center"
            >
              {/* Left Column: Solution Architecture Details with generous open spacing */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-[6px] mono text-[12px] uppercase font-bold tracking-wider text-[var(--accent)] mb-[12px]">
                    <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)]" />
                    <span>{activeItem.tag}</span>
                  </div>

                  <h3 className="text-[25px] md:text-[32px] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.18] mb-[14px]">
                    {activeItem.title}
                  </h3>

                  <p className="text-[15px] md:text-[16.5px] font-medium text-[var(--ink)]/85 leading-[1.65] mb-[12px]">
                    {activeItem.subtitle}
                  </p>

                  <div className="text-[14px] md:text-[15px] text-[var(--muted)] leading-[1.7]">
                    <RichText html={activeItem.description} />
                  </div>
                </div>

                <div>
                  {/* Real Metrics Grid */}
                  <div className="grid grid-cols-3 gap-[16px] mt-[28px] pt-[24px] border-t border-[var(--line)]">
                    {activeItem.metrics.map((m, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="mono text-[20px] md:text-[24px] font-bold text-[var(--ink)]">
                          {m.value}
                        </span>
                        <span className="text-[11.5px] text-[var(--muted)] mt-[3px] leading-tight">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="mt-[28px] flex flex-wrap items-center gap-[14px]">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-[8px] px-[20px] py-[11px] rounded-full bg-[var(--accent)] text-white text-[13.5px] font-semibold hover:bg-[var(--ink)] hover:shadow-lg transition-all duration-300 group"
                    >
                      <span>Schedule Architecture Review</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/work"
                      className="mono text-[12.5px] px-[16px] py-[10px] rounded-full border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      View Case Studies
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Realistic High-Fidelity UI Interface Screens */}
              <div className="relative w-full h-[350px] md:h-[390px] flex items-center justify-center">
                
                {/* 1. Mobile App Screen (iPhone Real Frame) */}
                {activeItem.deviceType === 'mobile' ? (
                  <div className="relative w-[260px] md:w-[280px] h-[350px] md:h-[380px] rounded-[40px] bg-[#0A1324] border-[8px] border-[#162238] shadow-[0_24px_60px_rgba(10,23,47,0.35)] overflow-hidden flex flex-col p-[10px] transition-all duration-300">
                    
                    {/* Dynamic Island */}
                    <div className="w-[80px] h-[18px] bg-black rounded-full mx-auto mb-[10px] flex items-center justify-center">
                      <div className="w-[8px] h-[8px] rounded-full bg-[#1A2638] mr-[6px]" />
                      <div className="w-[4.5px] h-[4.5px] rounded-full bg-[#0EBCD4]" />
                    </div>

                    {activeItem.screenType === 'ai' ? (
                      /* AI Copilot Mobile Screen */
                      <div className="flex-1 rounded-[24px] bg-[#0B1528] p-[14px] flex flex-col justify-between text-white overflow-hidden">
                        <div>
                          <div className="flex items-center justify-between border-b border-white/10 pb-[8px]">
                            <div className="flex items-center gap-[6px]">
                              <div className="w-[24px] h-[24px] rounded-lg bg-[var(--accent)] flex items-center justify-center text-[11px] font-bold">
                                Q
                              </div>
                              <div>
                                <div className="text-[12px] font-bold leading-none">Quantyro AI</div>
                                <div className="text-[9.5px] text-cyan-400 mono">Active RAG Node</div>
                              </div>
                            </div>
                            <span className="w-[6px] h-[6px] rounded-full bg-emerald-400 animate-pulse" />
                          </div>

                          <div className="mt-[12px] space-y-[10px]">
                            <div className="bg-white/10 rounded-2xl rounded-tl-xs p-[10px] text-[11px] leading-relaxed text-slate-200">
                              Analyzing multi-region database latency. Shard #4 optimized.
                            </div>
                            <div className="bg-[var(--accent)] text-white rounded-2xl rounded-tr-xs p-[10px] text-[11px] leading-relaxed ml-[14px]">
                              Apply automated index rebalance &amp; edge warm-up.
                            </div>
                            <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-[8px] text-[10px] text-cyan-300 mono flex items-center justify-between">
                              <span>✓ Vector Re-index complete</span>
                              <span className="text-emerald-400">18ms</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/10 border border-white/15 rounded-full px-[12px] py-[6px] flex items-center justify-between text-[10px] text-slate-400">
                          <span>Ask AI anything...</span>
                          <div className="w-[20px] h-[20px] rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-[9px]">
                            ↑
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Telehealth / Cloud Mobile Screen */
                      <div className="flex-1 rounded-[24px] bg-[#071224] p-[14px] flex flex-col justify-between text-white overflow-hidden">
                        <div>
                          <div className="flex items-center justify-between border-b border-white/10 pb-[8px]">
                            <div className="text-[12px] font-bold">PulseCare Telehealth</div>
                            <span className="mono text-[9px] px-[7px] py-[2px] rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              HIPAA Secure
                            </span>
                          </div>

                          <div className="mt-[12px] bg-white/5 border border-white/10 rounded-xl p-[12px]">
                            <div className="text-[9.5px] text-slate-400 uppercase mono">Patient Biometrics</div>
                            <div className="text-[20px] font-bold text-indigo-400 mt-[2px]">98.6 bpm</div>
                            <div className="h-[24px] w-full mt-[6px] flex items-end gap-[3px]">
                              {[40, 65, 80, 55, 90, 75, 85, 60, 95, 70].map((h, i) => (
                                <div
                                  key={i}
                                  className="flex-1 bg-indigo-500/60 rounded-t"
                                  style={{ height: `${h}%` }}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="mt-[10px] bg-white/5 border border-white/10 rounded-xl p-[8px] flex items-center gap-[8px]">
                            <div className="w-[26px] h-[26px] rounded-full bg-indigo-600/30 flex items-center justify-center text-indigo-300 font-bold text-[11px]">
                              Dr
                            </div>
                            <div>
                              <div className="text-[11px] font-semibold">Dr. Sarah Jenkins</div>
                              <div className="text-[9px] text-slate-400">Consultation in 15 mins</div>
                            </div>
                          </div>
                        </div>

                        <button className="w-full py-[7.5px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-[11px] font-bold text-white transition-colors">
                          Join Secure Video Session
                        </button>
                      </div>
                    )}
                  </div>
                ) : activeItem.screenType === 'seo' ? (
                  /* 2. SEO Google Search Console & Core Web Vitals Laptop Browser */
                  <div className="w-full max-w-[490px] h-[330px] md:h-[360px] bg-[#0A1324] rounded-[20px] border-[7px] border-[#162238] shadow-[0_24px_60px_rgba(10,23,47,0.35)] overflow-hidden p-[14px] text-white flex flex-col justify-between transition-all duration-300">
                    <div>
                      {/* Browser Bar */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-[8px] mb-[10px]">
                        <div className="flex items-center gap-[5px]">
                          <div className="w-[7px] h-[7px] rounded-full bg-rose-500" />
                          <div className="w-[7px] h-[7px] rounded-full bg-amber-500" />
                          <div className="w-[7px] h-[7px] rounded-full bg-emerald-500" />
                        </div>
                        <div className="mono text-[9.5px] text-slate-400 bg-white/5 px-[12px] py-[2px] rounded-full">
                          https://search.google.com/search-console/performance
                        </div>
                        <div className="w-[10px]" />
                      </div>

                      {/* 4 Perfect 100/100 Lighthouse Badges */}
                      <div className="grid grid-cols-4 gap-[6px] mb-[10px]">
                        {[
                          { label: 'Performance', score: '100' },
                          { label: 'Accessibility', score: '100' },
                          { label: 'Best Practices', score: '100' },
                          { label: 'SEO Engine', score: '100' },
                        ].map((badge) => (
                          <div key={badge.label} className="bg-white/5 border border-emerald-500/30 rounded-xl p-[6px] text-center">
                            <div className="w-[26px] h-[26px] rounded-full border-2 border-emerald-400 bg-emerald-950/40 mx-auto flex items-center justify-center text-[11px] font-bold text-emerald-400 mono">
                              {badge.score}
                            </div>
                            <div className="text-[9px] text-slate-300 mt-[3px] font-medium leading-tight">
                              {badge.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Google Search Growth Graph */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-[12px]">
                        <div className="flex items-center justify-between mb-[6px]">
                          <span className="text-[11px] font-semibold text-slate-300">Total Organic Search Clicks</span>
                          <span className="mono text-[10px] text-emerald-400">↑ +480% Organic Surge</span>
                        </div>
                        <div className="h-[50px] w-full flex items-end gap-[3.5px]">
                          {[15, 20, 24, 30, 42, 50, 58, 65, 78, 85, 92, 98, 100].map((v, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t opacity-90"
                              style={{ height: `${v}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mono text-[9.5px] text-slate-400 pt-[2px]">
                      <span>Schema.org: FAQPage, Product, Breadcrumbs ✓</span>
                      <span className="text-emerald-400">Core Web Vitals: Good</span>
                    </div>
                  </div>
                ) : (
                  /* 3. Enterprise SaaS & Web Platform Laptop Browser */
                  <div className="w-full max-w-[490px] h-[330px] md:h-[360px] bg-[#0A1324] rounded-[20px] border-[7px] border-[#162238] shadow-[0_24px_60px_rgba(10,23,47,0.35)] overflow-hidden p-[14px] text-white flex flex-col justify-between transition-all duration-300">
                    <div>
                      {/* Browser Bar */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-[8px] mb-[10px]">
                        <div className="flex items-center gap-[5px]">
                          <div className="w-[7px] h-[7px] rounded-full bg-rose-500" />
                          <div className="w-[7px] h-[7px] rounded-full bg-amber-500" />
                          <div className="w-[7px] h-[7px] rounded-full bg-emerald-500" />
                        </div>
                        <div className="mono text-[9.5px] text-slate-400 bg-white/5 px-[12px] py-[2px] rounded-full">
                          https://app.quantyro.io/analytics
                        </div>
                        <div className="w-[10px]" />
                      </div>

                      {/* Financial & Latency Cards */}
                      <div className="grid grid-cols-2 gap-[8px] mb-[10px]">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-[10px]">
                          <div className="text-[9.5px] text-slate-400 mono">Global Transactions</div>
                          <div className="text-[17px] font-bold text-cyan-400 mt-[1px]">$1,428,950</div>
                          <div className="text-[9px] text-emerald-400">↑ +24.8% vs last week</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-[10px]">
                          <div className="text-[9.5px] text-slate-400 mono">Edge TTFB Latency</div>
                          <div className="text-[17px] font-bold text-emerald-400 mt-[1px]">18.4 ms</div>
                          <div className="text-[9px] text-slate-400">Global Edge Nodes</div>
                        </div>
                      </div>

                      {/* Throughput Stream Graph */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-[12px]">
                        <div className="flex items-center justify-between mb-[6px]">
                          <span className="text-[11px] font-semibold text-slate-300">Real-Time Event Stream</span>
                          <span className="mono text-[10px] text-cyan-400">99.99% Uptime</span>
                        </div>
                        <div className="h-[50px] w-full flex items-end gap-[3.5px]">
                          {[35, 50, 45, 70, 65, 85, 75, 95, 80, 100, 90, 85, 92].map((v, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gradient-to-t from-[var(--accent)] to-cyan-400 rounded-t opacity-90"
                              style={{ height: `${v}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mono text-[9.5px] text-slate-400 pt-[2px]">
                      <span>Serverless Edge Workers: 24 Regions</span>
                      <span className="text-cyan-400">TLS 1.3 Active</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Slide Dots Indicator at Bottom */}
          <div className="mt-[28px] pt-[20px] border-t border-[var(--line)] flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              {showcaseList.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(idx)}
                  className={`h-[6px] rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? 'w-[28px] bg-[var(--accent)]'
                      : 'w-[8px] bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="mono text-[11.5px] text-[var(--muted)] font-medium">
              Active Module: <span className="text-[var(--ink)] font-bold">{activeItem.tag}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

