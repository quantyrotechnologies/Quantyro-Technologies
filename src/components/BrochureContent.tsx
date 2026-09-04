import Image from 'next/image';
import PrintButton from './PrintButton';
import { stripHtml } from '@/lib/stripHtml';
import type { Service, Industry, RoadmapStep, SiteSettings } from '@/lib/types';

export default function BrochureContent({
  settings,
  services,
  industries,
  roadmapSteps,
}: {
  settings: SiteSettings;
  services: Service[];
  industries: Industry[];
  roadmapSteps: RoadmapStep[];
}) {
  const engineeringSLAs = [
    {
      title: '100% Complete IP Ownership',
      metric: '0% Lock-in',
      desc: 'All source code, design systems, and cloud infrastructure belong strictly to the client from day one. Direct GitHub commits with zero proprietary runtime lock-in.',
    },
    {
      title: 'Sub-Second Latency & Web Vitals',
      metric: '95+ Lighthouse',
      desc: 'Engineered with server-side edge streaming, atomized CSS, and sub-500ms First Contentful Paint (FCP) across all mobile and desktop viewports.',
    },
    {
      title: 'Bank-Grade Security Hardening',
      metric: 'SOC 2 Ready',
      desc: 'Continuous static code analysis (SAST), automated secret scanning, penetration audit compliance, and strict role-based access controls.',
    },
    {
      title: 'Senior Engineering Squads',
      metric: '8+ Yrs Avg Exp',
      desc: 'No junior bait-and-switch. All systems are architected and delivered by veteran software engineers who have scaled enterprise platforms to millions of users.',
    },
  ];

  const engagementModels = [
    {
      title: 'Dedicated Senior Squad',
      tag: 'Full-Stack Pod',
      desc: 'Cross-functional team of senior frontend, backend, AI/cloud, and QA engineers dedicated 100% to your roadmap.',
    },
    {
      title: 'Targeted Sprint Modernization',
      tag: 'High-Impact Sprint',
      desc: 'Time-boxed 4-8 week sprints focused on architectural refactoring, performance optimization, or private AI integration.',
    },
    {
      title: 'Fractional CTO Advisory',
      tag: 'Architecture & Strategy',
      desc: 'Strategic system design, scalability auditing, tech stack selection, and cloud cost infrastructure optimization.',
    },
  ];

  return (
    <div className="brochure-root bg-white text-[var(--ink)]">
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 14mm;
          }
          body {
            background: #ffffff !important;
            color: #0A172F !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          header, footer, .no-print {
            display: none !important;
          }
          main {
            padding-top: 0 !important;
          }
          .brochure-root {
            padding-top: 0 !important;
          }
          .page-break {
            page-break-before: always !important;
            break-before: page !important;
          }
          .avoid-break {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .print-dark {
            background-color: #0A1324 !important;
            color: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* Screen-only Toolbar */}
      <div className="no-print px-[6vw] pt-[150px] pb-[32px] border-b border-[var(--line)] bg-slate-50/70">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between flex-wrap gap-[20px]">
          <div>
            <div className="inline-flex items-center gap-[6px] px-[10px] py-[3px] rounded-full bg-blue-50 border border-blue-200/80 text-[var(--accent)] text-[11px] font-mono font-semibold uppercase mb-[8px]">
              <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
              <span>Official Media Kit &amp; Capabilities Deck (2026)</span>
            </div>
            <h1 className="text-[28px] md:text-[34px] font-[var(--font-display)] font-bold text-[var(--ink)]">
              {settings.orgName} — Corporate Overview
            </h1>
            <p className="mt-[6px] text-[14px] text-[var(--muted)] max-w-[580px] leading-[1.6]">
              Real-time engineering capabilities, practice areas, delivery standards, and service offerings. Ready for immediate print or high-res PDF export.
            </p>
          </div>
          <PrintButton />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-[6vw] lg:px-[40px] py-[40px] space-y-[48px]">

        {/* 1. COVER DECK (Page 1) */}
        <section className="avoid-break rounded-[26px] bg-[#0A1324] text-white p-[40px] md:p-[64px] relative overflow-hidden shadow-2xl print-dark">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(23,104,214,0.3)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,229,153,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10">
            {/* Header Brand */}
            <div className="flex items-center justify-between border-b border-white/15 pb-[28px] mb-[40px]">
              <div className="flex items-center gap-[14px]">
                <div className="w-[48px] h-[48px] rounded-[12px] overflow-hidden flex items-center justify-center">
                  <Image src="/images/quantyro-technologies.png" alt={`${settings.orgName} logo`} width={48} height={48} className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-[var(--font-display)] font-extrabold text-[22px] tracking-tight leading-none text-white">{settings.orgName}</div>
                  <div className="mono text-[11px] text-slate-400 mt-[4px]">SENIOR SOFTWARE ENGINEERING &amp; AI FIRM</div>
                </div>
              </div>
              <span className="mono text-[12px] px-[12px] py-[4px] rounded-full bg-white/10 text-cyan-300 border border-white/15">
                EDITION 2026
              </span>
            </div>

            {/* Title & Mission */}
            <div className="max-w-[850px] mb-[48px]">
              <div className="mono text-[12px] text-cyan-400 font-bold uppercase tracking-widest mb-[12px]">
                CAPABILITIES &amp; TECHNICAL SPECIFICATIONS
              </div>
              <h2 className="font-[var(--font-display)] font-bold text-[clamp(32px,5vw,56px)] leading-[1.08] text-white">
                Engineering high-impact digital systems for global leaders.
              </h2>
              <p className="mt-[20px] text-[16px] md:text-[18px] text-slate-300 leading-[1.7] max-w-[720px]">
                Quantyro Technologies is an elite software engineering consultancy. We partner with visionary founders and enterprises to architect, scale, and maintain mission-critical web, mobile, cloud, and autonomous AI systems.
              </p>
            </div>

            {/* 4 Core Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[16px] pt-[28px] border-t border-white/15">
              <div className="p-[14px] rounded-[14px] bg-white/[0.04] border border-white/10">
                <div className="mono text-[16px] font-bold text-emerald-400">100% IP</div>
                <div className="text-[12px] text-slate-300 mt-[2px]">Complete Client Ownership</div>
              </div>
              <div className="p-[14px] rounded-[14px] bg-white/[0.04] border border-white/10">
                <div className="mono text-[16px] font-bold text-cyan-300">&lt; 500ms</div>
                <div className="text-[12px] text-slate-300 mt-[2px]">Sub-Second Edge Latency</div>
              </div>
              <div className="p-[14px] rounded-[14px] bg-white/[0.04] border border-white/10">
                <div className="mono text-[16px] font-bold text-purple-300">Senior Only</div>
                <div className="text-[12px] text-slate-300 mt-[2px]">8+ Yrs Avg Experience</div>
              </div>
              <div className="p-[14px] rounded-[14px] bg-white/[0.04] border border-white/10">
                <div className="mono text-[16px] font-bold text-amber-300">99.99%</div>
                <div className="text-[12px] text-slate-300 mt-[2px]">Production SLA Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. EXECUTIVE PHILOSOPHY & DELIVERY SLA (Page 2) */}
        <section className="avoid-break space-y-[32px] pt-[16px]">
          <div>
            <div className="mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] mb-[6px]">
              01 // Executive Overview &amp; Principles
            </div>
            <h3 className="font-[var(--font-display)] font-bold text-[28px] text-[var(--ink)]">
              Engineering excellence as a core business driver.
            </h3>
            <p className="mt-[10px] text-[15px] text-[var(--muted)] leading-[1.7] max-w-[850px]">
              Quantyro Technologies was founded on a simple premise: eliminate the broken incentives of legacy agencies (junior developer bait-and-switch, bloated technical debt, and proprietary vendor lock-in). We treat every line of code as high-value intellectual property, engineered to scale effortlessly under enterprise traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
            {engineeringSLAs.map((sla, idx) => (
              <div key={sla.title} className="rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[20px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-[10px]">
                    <span className="mono text-[11px] font-bold text-[var(--accent)]">0{idx + 1}</span>
                    <span className="mono text-[10.5px] px-[8px] py-[2px] rounded-full bg-blue-50 text-[var(--accent)] font-semibold">
                      {sla.metric}
                    </span>
                  </div>
                  <h4 className="text-[16px] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.3]">
                    {sla.title}
                  </h4>
                  <p className="mt-[8px] text-[13px] text-[var(--muted)] leading-[1.6]">
                    {sla.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. CORE PRACTICE AREAS (Page 3) */}
        <section className="avoid-break space-y-[28px] pt-[16px]">
          <div>
            <div className="mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] mb-[6px]">
              02 // Core Practice Areas &amp; Capabilities
            </div>
            <h3 className="font-[var(--font-display)] font-bold text-[28px] text-[var(--ink)]">
              Full-stack software engineering services.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
            {services.map((s, idx) => (
              <div key={s.id} className="rounded-[20px] border border-[var(--line)] bg-white p-[22px] shadow-xs">
                <div className="flex items-center justify-between mb-[10px]">
                  <h4 className="text-[17px] font-[var(--font-display)] font-bold text-[var(--ink)]">
                    {s.title}
                  </h4>
                  <span className="mono text-[11px] text-slate-400 font-bold">
                    PRACTICE 0{idx + 1}
                  </span>
                </div>
                <p className="text-[13.5px] text-[var(--muted)] leading-[1.65]">
                  {stripHtml(s.desc)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. INDUSTRY SPECIALIZATIONS (Page 4) */}
        <section className="avoid-break space-y-[24px] pt-[16px]">
          <div>
            <div className="mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] mb-[6px]">
              03 // Industry Specializations
            </div>
            <h3 className="font-[var(--font-display)] font-bold text-[28px] text-[var(--ink)]">
              Domain expertise, tailored to industry compliance.
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[14px]">
            {industries.map((i) => (
              <div key={i.id} className="rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[16px]">
                <div className="text-[14.5px] font-bold text-[var(--ink)]">{i.title}</div>
                <div className="mono text-[11px] text-[var(--accent)] mt-[4px]">Enterprise Ready</div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. ROADMAP & ENGAGEMENT MODELS (Page 5) */}
        {roadmapSteps.length > 0 && (
          <section className="avoid-break space-y-[24px] pt-[16px]">
            <div>
              <div className="mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] mb-[6px]">
                04 // Delivery Framework
              </div>
              <h3 className="font-[var(--font-display)] font-bold text-[28px] text-[var(--ink)]">
                From technical discovery to reliable production scale.
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-[14px]">
              {roadmapSteps.map((step) => (
                <div key={step.id} className="rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[18px]">
                  <div className="w-[28px] h-[28px] rounded-full bg-[var(--accent)] text-white flex items-center justify-center mono text-[11.5px] font-bold mb-[10px]">
                    {step.step}
                  </div>
                  <h4 className="text-[14px] font-bold text-[var(--ink)]">{step.title}</h4>
                  <p className="mt-[6px] text-[12px] text-[var(--muted)] leading-[1.5]">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Engagement Models */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] pt-[20px]">
              {engagementModels.map((m) => (
                <div key={m.title} className="rounded-[16px] bg-slate-50 border border-slate-200 p-[18px]">
                  <span className="mono text-[10.5px] font-bold uppercase text-[var(--accent)]">{m.tag}</span>
                  <h5 className="text-[15px] font-bold text-[var(--ink)] mt-[4px]">{m.title}</h5>
                  <p className="text-[12.5px] text-[var(--muted)] mt-[6px] leading-[1.55]">{m.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. CORPORATE CONTACT & INITIATION (Page 6) */}
        <section className="avoid-break rounded-[24px] bg-[#0A1324] text-white p-[36px] md:p-[48px] print-dark">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] items-center">
            <div>
              <div className="mono text-[11px] text-cyan-400 font-bold uppercase tracking-wider mb-[8px]">
                GET STARTED
              </div>
              <h3 className="font-[var(--font-display)] font-bold text-[28px] text-white leading-[1.2]">
                Initiate a project with our senior engineering team.
              </h3>
              <p className="mt-[12px] text-[14px] text-slate-300 leading-[1.65] max-w-[440px]">
                {settings.footerBlurb || 'Speak directly with senior software architects. Guaranteed 4-hour response SLA, zero junior gatekeepers, and mutual NDA protection.'}
              </p>
            </div>

            <div className="space-y-[12px] bg-white/[0.04] border border-white/10 rounded-[18px] p-[24px]">
              <div>
                <div className="mono text-[10.5px] uppercase tracking-wider text-slate-400">Direct Email</div>
                <div className="text-[16px] font-bold text-cyan-300 font-mono mt-[2px]">{settings.contactEmail}</div>
              </div>
              {settings.contactPhone && (
                <div>
                  <div className="mono text-[10.5px] uppercase tracking-wider text-slate-400">Phone / WhatsApp</div>
                  <div className="text-[15px] font-semibold text-white font-mono mt-[2px]">{settings.contactPhone}</div>
                </div>
              )}
              <div>
                <div className="mono text-[10.5px] uppercase tracking-wider text-slate-400">Official Portal</div>
                <div className="text-[15px] font-semibold text-white font-mono mt-[2px]">{settings.url.replace(/^https?:\/\//, '')}</div>
              </div>
              <div className="pt-[10px] border-t border-white/10 text-[11.5px] text-slate-400 mono">
                {settings.copyrightText || `© ${new Date().getFullYear()} Quantyro Technologies. All Rights Reserved.`}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
