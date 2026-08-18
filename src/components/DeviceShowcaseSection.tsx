"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { DEFAULT_SHOWCASE_ITEMS, type ShowcaseItem } from '@/lib/data/showcase';


export default function DeviceShowcaseSection({ items = DEFAULT_SHOWCASE_ITEMS }: { items?: ShowcaseItem[] }) {
  const showcaseList = items && items.length > 0 ? items : DEFAULT_SHOWCASE_ITEMS;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeItem = showcaseList[activeIndex] || showcaseList[0];

  return (
    <section className="relative px-[6vw] py-[100px] md:py-[130px] z-10 overflow-hidden bg-gradient-to-b from-transparent via-[var(--bg-alt)]/50 to-transparent">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[var(--accent)]/10 blur-[120px] rounded-full -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto mb-[40px] md:mb-[60px]">
          <div className="inline-flex items-center gap-[8px] mono text-[12px] uppercase font-semibold text-[var(--accent)] px-[14px] py-[6px] rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-[16px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] animate-ping" />
            Engineering &amp; Website Architecture
          </div>

          <h2 className="text-[clamp(32px,5vw,54px)] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.08] tracking-tight">
            Architecting High-Impact Websites, Cloud &amp; AI Platforms
          </h2>

          <p className="mt-[16px] text-[16px] md:text-[17.5px] text-[var(--muted)] leading-[1.65]">
            Explore how our senior engineering teams design, build, and scale mission-critical websites, scalable SaaS platforms, and enterprise AI systems for ambitious global brands.
          </p>

          {/* Interactive Category Selector Pills */}
          <div className="mt-[32px] inline-flex p-[5px] rounded-full bg-[var(--surface)] border border-[var(--line)] shadow-sm max-w-full overflow-x-auto">
            {showcaseList.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`mono text-[12px] md:text-[13px] px-[16px] md:px-[22px] py-[9px] rounded-full transition-all duration-300 whitespace-nowrap font-medium ${
                  activeIndex === idx
                    ? 'bg-[#0A1324] text-white shadow-md font-semibold'
                    : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {item.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive 2-Column Showcase Box (Fixed Height Container to prevent size jumps) */}
        <div className="min-h-[580px] lg:min-h-[600px] grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[40px] md:gap-[50px] items-center rounded-[32px] bg-[var(--surface)] border border-[var(--line)] p-[28px] md:p-[48px] shadow-[0_24px_60px_rgba(10,23,47,0.06)]">
          
          {/* Left Column: Stable min-height to eliminate height shifts */}
          <div className="flex flex-col justify-between min-h-[380px] md:min-h-[460px]">
            <div>
              <div className="mono text-[12px] uppercase font-bold tracking-wider text-[var(--accent)] mb-[10px]">
                {activeItem.tag}
              </div>

              <h3 className="text-[26px] md:text-[32px] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.18] min-h-[70px]">
                {activeItem.title}
              </h3>

              <p className="mt-[12px] text-[15px] md:text-[16px] font-medium text-[var(--ink)]/85 leading-[1.6]">
                {activeItem.subtitle}
              </p>

              <p className="mt-[12px] text-[14px] md:text-[14.5px] text-[var(--muted)] leading-[1.7]">
                {activeItem.description}
              </p>
            </div>

            <div>
              {/* Live Metrics Row */}
              <div className="grid grid-cols-3 gap-[14px] mt-[28px] pt-[20px] border-t border-[var(--line)]">
                {activeItem.metrics.map((m, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="mono text-[20px] md:text-[24px] font-bold text-[var(--ink)]">
                      {m.value}
                    </span>
                    <span className="text-[11.5px] text-[var(--muted)] mt-[2px] leading-tight">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-[28px] flex flex-wrap items-center gap-[12px]">
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

          {/* Right Column: Standardized Fixed Height Mockup Container */}
          <div className="relative w-full h-[460px] md:h-[500px] flex items-center justify-center">
            
            {/* Phone Mockup Frame */}
            {activeItem.deviceType === 'mobile' ? (
              <div className="relative w-[270px] md:w-[290px] h-[460px] md:h-[490px] rounded-[40px] bg-[#0A1324] border-[8px] border-[#162238] shadow-[0_24px_60px_rgba(10,23,47,0.35)] overflow-hidden flex flex-col p-[10px] transition-all duration-300">
                
                {/* Dynamic Island */}
                <div className="w-[80px] h-[18px] bg-black rounded-full mx-auto mb-[10px] flex items-center justify-center">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#1A2638] mr-[6px]" />
                  <div className="w-[5px] h-[5px] rounded-full bg-[#0EBCD4]" />
                </div>

                {/* Internal Screen Content (AI or Healthcare) */}
                {activeItem.screenType === 'ai' ? (
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
                        <span className="w-[7px] h-[7px] rounded-full bg-emerald-400 animate-pulse" />
                      </div>

                      <div className="mt-[14px] space-y-[10px]">
                        <div className="bg-white/10 rounded-2xl rounded-tl-sm p-[10px] text-[11.5px] leading-relaxed text-slate-200">
                          Analyzing multi-region database latency. Shard #4 optimized.
                        </div>
                        <div className="bg-[var(--accent)] text-white rounded-2xl rounded-tr-sm p-[10px] text-[11.5px] leading-relaxed ml-[14px]">
                          Apply automated index rebalance &amp; edge warm-up.
                        </div>
                        <div className="bg-white/5 border border-cyan-500/30 rounded-xl p-[8px] text-[10.5px] text-cyan-300 mono flex items-center justify-between">
                          <span>✓ Vector Re-index complete</span>
                          <span className="text-emerald-400">18ms</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 border border-white/15 rounded-full px-[12px] py-[6px] flex items-center justify-between text-[10.5px] text-slate-400">
                      <span>Ask AI anything...</span>
                      <div className="w-[20px] h-[20px] rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-[9px]">
                        ↑
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Healthcare Screen */
                  <div className="flex-1 rounded-[24px] bg-[#071224] p-[14px] flex flex-col justify-between text-white overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-[8px]">
                        <div className="text-[12px] font-bold">PulseCare Telehealth</div>
                        <span className="mono text-[9px] px-[7px] py-[2px] rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          HIPAA Encrypted
                        </span>
                      </div>

                      <div className="mt-[14px] bg-white/5 border border-white/10 rounded-xl p-[12px]">
                        <div className="text-[10px] text-slate-400 uppercase mono">Patient Biometrics</div>
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
                        <div className="w-[28px] h-[28px] rounded-full bg-indigo-600/30 flex items-center justify-center text-indigo-300 font-bold text-[11px]">
                          Dr
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold">Dr. Sarah Jenkins</div>
                          <div className="text-[9.5px] text-slate-400">Consultation in 15 mins</div>
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-[8px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-[11px] font-bold text-white transition-colors">
                      Join Secure Video Session
                    </button>
                  </div>
                )}
              </div>
            ) : activeItem.screenType === 'seo' ? (
              /* SEO & Growth Dashboard Laptop Mockup */
              <div className="w-full max-w-[490px] h-[360px] md:h-[390px] bg-[#0A1324] rounded-[22px] border-[8px] border-[#162238] shadow-[0_24px_60px_rgba(10,23,47,0.35)] overflow-hidden p-[16px] text-white flex flex-col justify-between transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-[8px] mb-[12px]">
                    <div className="flex items-center gap-[5px]">
                      <div className="w-[8px] h-[8px] rounded-full bg-rose-500" />
                      <div className="w-[8px] h-[8px] rounded-full bg-amber-500" />
                      <div className="w-[8px] h-[8px] rounded-full bg-emerald-500" />
                    </div>
                    <div className="mono text-[10px] text-slate-400 bg-white/5 px-[12px] py-[2px] rounded-full">
                      https://quantyro.com/audit/seo-engine
                    </div>
                    <div className="w-[10px]" />
                  </div>

                  {/* 4 Perfect 100/100 Lighthouse Badges */}
                  <div className="grid grid-cols-4 gap-[8px] mb-[12px]">
                    {[
                      { label: 'Performance', score: '100' },
                      { label: 'Accessibility', score: '100' },
                      { label: 'Best Practices', score: '100' },
                      { label: 'SEO Engine', score: '100' },
                    ].map((badge) => (
                      <div key={badge.label} className="bg-white/5 border border-emerald-500/30 rounded-xl p-[8px] text-center">
                        <div className="w-[30px] h-[30px] rounded-full border-2 border-emerald-400 bg-emerald-950/40 mx-auto flex items-center justify-center text-[12px] font-bold text-emerald-400 mono">
                          {badge.score}
                        </div>
                        <div className="text-[9.5px] text-slate-300 mt-[4px] font-medium leading-tight">
                          {badge.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Organic Search Growth Chart */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-[12px]">
                    <div className="flex items-center justify-between mb-[6px]">
                      <span className="text-[11px] font-semibold text-slate-300">Organic Search Impressions</span>
                      <span className="mono text-[10px] text-emerald-400">↑ +480% vs 90d ago</span>
                    </div>
                    <div className="h-[60px] w-full flex items-end gap-[3px]">
                      {[15, 20, 24, 30, 42, 50, 58, 65, 78, 85, 92, 98, 100].map((v, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t opacity-90 hover:opacity-100 transition-opacity"
                          style={{ height: `${v}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mono text-[10px] text-slate-400 pt-[4px]">
                  <span>Schema.org: FAQPage, BlogPosting, Service ✓</span>
                  <span className="text-emerald-400">Index Status: Healthy</span>
                </div>
              </div>
            ) : (
              /* Enterprise Web SaaS Dashboard Laptop Mockup */
              <div className="w-full max-w-[490px] h-[360px] md:h-[390px] bg-[#0A1324] rounded-[22px] border-[8px] border-[#162238] shadow-[0_24px_60px_rgba(10,23,47,0.35)] overflow-hidden p-[16px] text-white flex flex-col justify-between transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-[8px] mb-[12px]">
                    <div className="flex items-center gap-[5px]">
                      <div className="w-[8px] h-[8px] rounded-full bg-rose-500" />
                      <div className="w-[8px] h-[8px] rounded-full bg-amber-500" />
                      <div className="w-[8px] h-[8px] rounded-full bg-emerald-500" />
                    </div>
                    <div className="mono text-[10px] text-slate-400 bg-white/5 px-[12px] py-[2px] rounded-full">
                      https://app.quantyro.io/analytics
                    </div>
                    <div className="w-[10px]" />
                  </div>

                  <div className="grid grid-cols-2 gap-[8px] mb-[12px]">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-[10px]">
                      <div className="text-[10px] text-slate-400 mono">Global Transactions</div>
                      <div className="text-[18px] font-bold text-cyan-400 mt-[2px]">$1,428,950</div>
                      <div className="text-[9.5px] text-emerald-400 mt-[1px]">↑ +24.8% vs last week</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-[10px]">
                      <div className="text-[10px] text-slate-400 mono">Avg API Latency</div>
                      <div className="text-[18px] font-bold text-emerald-400 mt-[2px]">18.4 ms</div>
                      <div className="text-[9.5px] text-slate-400 mt-[1px]">Global Edge Nodes</div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-[12px]">
                    <div className="flex items-center justify-between mb-[6px]">
                      <span className="text-[11px] font-semibold text-slate-300">Throughput Stream</span>
                      <span className="mono text-[10px] text-cyan-400">Live 99.99%</span>
                    </div>
                    <div className="h-[60px] w-full flex items-end gap-[3px]">
                      {[35, 50, 45, 70, 65, 85, 75, 95, 80, 100, 90, 85, 92].map((v, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-[var(--accent)] to-cyan-400 rounded-t opacity-90 hover:opacity-100 transition-opacity"
                          style={{ height: `${v}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mono text-[10px] text-slate-400 pt-[4px]">
                  <span>Serverless Edge Workers: 24 Regions</span>
                  <span className="text-cyan-400">TLS 1.3 Active</span>
                </div>
              </div>
            )}

            {/* Floating Badges */}
            <div className="absolute -top-2 right-0 bg-[#0A1324] text-white text-[11px] mono font-semibold px-[12px] py-[5px] rounded-full border border-cyan-500/40 shadow-lg">
              ⚡ 100/100 Core Web Vitals
            </div>
            <div className="absolute -bottom-2 left-2 bg-[#0A1324] text-white text-[11px] mono font-semibold px-[12px] py-[5px] rounded-full border border-[var(--accent)]/40 shadow-lg">
              🛡️ Zero-Downtime Releases
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

