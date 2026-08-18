"use client";
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RoadmapStep } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ManifestoSection({ steps }: { steps: RoadmapStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spineFillRef = useRef<HTMLDivElement>(null);
  const laserDotRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [simulatedSteps, setSimulatedSteps] = useState<Record<string, boolean>>({});

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.roadmap-card');
    const beacons = gsap.utils.toArray<HTMLElement>('.roadmap-node-beacon');
    const bridges = gsap.utils.toArray<HTMLElement>('.roadmap-bridge-line');

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 70%',
      end: 'bottom 80%',
      scrub: 0.35,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(Math.round(p * 100));

        if (spineFillRef.current) {
          spineFillRef.current.style.transform = `scaleY(${p})`;
        }
        if (laserDotRef.current) {
          laserDotRef.current.style.top = `${p * 100}%`;
        }

        cards.forEach((card, i) => {
          const threshold = i / cards.length;
          const isActive = p >= threshold;
          card.classList.toggle('is-active', isActive);
          if (beacons[i]) beacons[i].classList.toggle('is-active', isActive);
          if (bridges[i]) bridges[i].classList.toggle('roadmap-bridge-active', isActive);
          if (isActive) setActiveStep(i);
        });
      },
    });
  }, { scope: containerRef });

  if (steps.length === 0) return null;

  const handleSimulate = (stepKey: string) => {
    setSimulatedSteps(prev => ({ ...prev, [stepKey]: true }));
    setTimeout(() => {
      setSimulatedSteps(prev => ({ ...prev, [stepKey]: false }));
    }, 4000);
  };

  return (
    <section ref={containerRef} id="manifesto" className="relative px-[6vw] py-[80px] md:py-[105px] z-10">
      
      {/* Section Header */}
      <div className="max-w-[640px] mx-auto text-center mb-[50px] md:mb-[70px]">
        <div className="inline-flex items-center gap-[6px] px-[12px] py-[4px] rounded-full bg-[rgba(23,104,214,0.07)] border border-[rgba(23,104,214,0.2)] text-[var(--accent)] text-[11px] font-mono font-semibold uppercase mb-[12px]">
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] animate-pulse" />
          <span>01 // Complete Delivery Roadmap</span>
        </div>
        <h2 className="text-[clamp(26px,3.2vw,40px)] font-[var(--font-display)] font-bold leading-[1.15] text-[var(--ink)]">
          From first talk to{' '}
          <span className="text-[var(--accent)]">happy delivery</span>.
        </h2>
        <p className="mt-[12px] text-[var(--muted)] text-[15px] leading-[1.6]">
          A step-by-step interactive roadmap where every milestone is collaborative, transparent, and engineered for long-term scalability.
        </p>

        {/* Live Progress Tracker */}
        <div className="mt-[20px] inline-flex items-center gap-[10px] px-[14px] py-[6px] rounded-full bg-white border border-[rgba(23,104,214,0.2)] shadow-[0_4px_16px_rgba(23,104,214,0.1)] text-[11.5px] font-mono text-[var(--ink)] font-bold">
          <span className="w-[7px] h-[7px] rounded-full bg-[var(--accent)]" />
          <span>MILESTONE PROGRESS: <span className="text-[var(--accent)] font-extrabold">{scrollProgress}%</span></span>
        </div>
      </div>

      {/* Roadmap Timeline Container */}
      <div className="relative max-w-[940px] mx-auto">
        
        {/* Central Vertical Spine */}
        <div className="roadmap-spine-track left-[20px] md:left-1/2 md:-translate-x-1/2">
          <div ref={spineFillRef} className="roadmap-spine-fill" />
          <div ref={laserDotRef} className="roadmap-spine-laser" style={{ top: '0%' }} />
        </div>

        {/* Roadmap Milestone Cards */}
        <div className="flex flex-col gap-[36px] md:gap-[44px] relative z-10">
          {steps.map((item, idx) => {
            const isEven = idx % 2 === 1;
            const isRunning = simulatedSteps[item.id];

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-[16px] md:gap-0 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Roadmap Card */}
                <div className="w-full md:w-[44%] pl-[50px] md:pl-0">
                  <div className="roadmap-card p-[18px] md:p-[22px] rounded-2xl bg-white border border-[rgba(10,23,47,0.09)] shadow-[0_4px_20px_rgba(10,23,47,0.05)] transition-all duration-300 relative overflow-hidden group">
                    
                    {/* Top Accent Line on Hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Header */}
                    <div className="flex items-center justify-between gap-[8px]">
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        {item.phaseTag}
                      </span>
                      <div className="flex items-center gap-[6px]">
                        <span className="px-[8px] py-[2.5px] rounded-md bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.18)] text-[var(--accent)] text-[10px] font-mono font-bold">
                          {item.badge}
                        </span>
                        {/* Activity indicator bars */}
                        <div className="hidden sm:flex items-end gap-[1.5px] h-[10px]">
                          <span className="w-[2px] bg-[var(--accent)] h-[40%] opacity-60" />
                          <span className="w-[2px] bg-[var(--accent)] h-[80%] opacity-60" />
                          <span className="w-[2px] bg-[var(--accent)] h-[100%] opacity-60" />
                          <span className="w-[2px] bg-[var(--accent)] h-[60%] opacity-60" />
                        </div>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="mt-[8px] text-[17px] md:text-[18px] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.2]">
                      {item.title}
                    </h3>
                    <p className="mt-[6px] text-[13px] text-[var(--muted)] leading-[1.55]">
                      {item.desc}
                    </p>

                    {/* Mini Terminal */}
                    <div className="mt-[12px] rounded-xl bg-[#0F172A] p-[10px] border border-slate-700/50 font-mono text-[10.5px] leading-[1.5] text-blue-300">
                      <div className="flex items-center justify-between pb-[4px] mb-[4px] border-b border-slate-700/50 text-[9.5px] text-slate-500">
                        <span className="truncate">$ {item.terminalCmd}</span>
                        <button
                          type="button"
                          onClick={() => handleSimulate(item.id)}
                          className="shrink-0 px-[6px] py-[1.5px] rounded bg-[rgba(23,104,214,0.2)] text-[var(--accent)] hover:bg-[rgba(23,104,214,0.35)] font-bold transition-colors cursor-pointer text-[9px]"
                        >
                          {isRunning ? '⚡ RUNNING...' : '▶ RUN TEST'}
                        </button>
                      </div>
                      <div className="text-[10px] text-sky-400 font-mono truncate">
                        {isRunning ? (
                          <span className="animate-pulse text-sky-300">➔ [EXEC]: Telemetry checks verified in 12ms... ✓</span>
                        ) : (
                          item.terminalOutput
                        )}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="mt-[12px] pt-[10px] border-t border-[rgba(10,23,47,0.06)] flex items-center justify-between gap-[8px] text-[11px] font-mono text-slate-600 flex-wrap">
                      {item.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-[4px]">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span className="truncate">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Central Beacon Node */}
                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 z-20">
                  <div className="roadmap-node-beacon w-[40px] h-[40px] md:w-[46px] md:h-[46px] rounded-2xl bg-white border-2 border-slate-300 text-slate-600 shadow-md flex items-center justify-center font-mono font-extrabold text-[13px] md:text-[14px] relative">
                    <span className="relative z-10">{item.step}</span>
                  </div>
                </div>

                {/* Empty column for balance */}
                <div className="hidden md:block w-[44%]" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
