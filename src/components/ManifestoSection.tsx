"use client";
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RoadmapStepItem {
  step: string;
  phaseTag: string;
  badge: string;
  title: string;
  desc: string;
  deliverables: string[];
  status: string;
  terminalCmd: string;
  terminalOutput: string;
  icon: React.ReactNode;
}

const ROADMAP_STEPS: RoadmapStepItem[] = [
  {
    step: '01',
    phaseTag: 'STAGE 01 // FIRST TOUCH',
    badge: '🤝 Direct Connect',
    title: 'Client Outreach & Scoping',
    desc: 'You share your vision. Within 24 hours, our senior engineers review scope, constraints, and architecture without sales pitch decks.',
    deliverables: ['24h Rapid Response', 'Initial Architecture Scope'],
    status: 'DISCOVERY READY',
    terminalCmd: 'align_scope --client="Enterprise" --target=MVP',
    terminalOutput: '✓ Target: 14-Day Sprint · Zero-Lockin Spec locked',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    step: '02',
    phaseTag: 'STAGE 02 // STRATEGIC ALIGNMENT',
    badge: '📅 Discovery Call',
    title: 'Client Discovery Meeting',
    desc: '1-on-1 strategic session with software architects to align on target users, technology trade-offs, release milestones, and fixed budget.',
    deliverables: ['1-on-1 Senior Alignment', 'Milestone Schedule Lock'],
    status: 'MILESTONE COMMITTED',
    terminalCmd: 'validate_milestones --budget=Fixed --team=SeniorOnly',
    terminalOutput: '✓ Timeline committed · SLA 99.999% contract active',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    step: '03',
    phaseTag: 'STAGE 03 // ARCHITECTURE SPEC',
    badge: '💡 Architecture Spec',
    title: 'Discussion & Blueprint Lock',
    desc: 'Collaborative technical planning where database schemas, OpenAPI contracts, and system architecture are locked before writing code.',
    deliverables: ['System Schema ERD', 'OpenAPI Contracts Locked'],
    status: 'SCHEMA DEFINED',
    terminalCmd: 'build_schema --graphql --security=ZeroTrust',
    terminalOutput: '✓ 32 API endpoints locked · PostgreSQL ERD ready',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    step: '04',
    phaseTag: 'STAGE 04 // SPRINT LAB',
    badge: '⚡ Dev & QA Lab',
    title: 'Coding & Testing Lab',
    desc: 'Rapid sprint cycles in our coding lab. Working staging environments are tested with automated CI/CD and demoed live every week.',
    deliverables: ['Weekly Staging Demos', '100% CI/CD Test Coverage'],
    status: 'WEEKLY LIVE DEMOS',
    terminalCmd: 'ci_cd_deploy --branch=main --test=all',
    terminalOutput: '✓ 142/142 tests passing · Deployed to staging.app',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    step: '05',
    phaseTag: 'STAGE 05 // ENTERPRISE LAUNCH',
    badge: '🚀 Happy Launch',
    title: 'Happy Delivery & Ongoing SLA',
    desc: 'Staged zero-downtime production rollout, real-time observability telemetry from day one, and lifelong senior engineering support.',
    deliverables: ['Zero-Downtime Deployment', '99.999% SLA Uptime'],
    status: '99.999% SLA ACTIVE',
    terminalCmd: 'cluster_cutover --region=multi-region --traffic=100%',
    terminalOutput: '✓ Production 100% healthy · 0ms downtime cutover',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export default function ManifestoSection() {
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
          <span className="w-[7px] h-[7px] rounded-full bg-[var(--accent)] animate-ping duration-1000" />
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
          {ROADMAP_STEPS.map((item, idx) => {
            const isEven = idx % 2 === 1;
            const isRunning = simulatedSteps[item.step];

            return (
              <div
                key={item.step}
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
                          <span className="w-[2px] bg-[var(--accent)] h-[40%] animate-pulse opacity-60" />
                          <span className="w-[2px] bg-[var(--accent)] h-[80%] animate-pulse delay-75 opacity-60" />
                          <span className="w-[2px] bg-[var(--accent)] h-[100%] animate-pulse delay-150 opacity-60" />
                          <span className="w-[2px] bg-[var(--accent)] h-[60%] animate-pulse delay-100 opacity-60" />
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
                          onClick={() => handleSimulate(item.step)}
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
