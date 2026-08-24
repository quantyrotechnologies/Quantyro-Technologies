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
  return (
    <div className="brochure-root">
      <style>{`
        @media print {
          header, footer, .no-print { display: none !important; }
          main { padding-top: 0 !important; }
          .brochure-root { padding-top: 0 !important; }
          .brochure-section { page-break-inside: avoid; }
          @page { size: A4 landscape; margin: 14mm; }
        }
      `}</style>

      {/* Screen-only toolbar */}
      <div className="no-print px-[6vw] pt-[150px] pb-[24px] flex items-center justify-between flex-wrap gap-[14px]">
        <div>
          <div className="mono text-[12px] text-[var(--muted)] mb-[6px]">Company Brochure</div>
          <h1 className="text-[26px] font-[var(--font-display)] font-bold text-[var(--ink)]">
            {settings.orgName} — Media Kit
          </h1>
          <p className="mt-[6px] text-[13.5px] text-[var(--muted)] max-w-[520px]">
            This page always reflects the live contact details and services from Site Settings — print it or save as PDF whenever you need an updated copy.
          </p>
        </div>
        <PrintButton />
      </div>

      {/* Cover */}
      <section className="brochure-section relative px-[6vw] py-[64px] bg-[#0A172F] overflow-hidden">
        <div className="absolute top-[-80px] right-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(23,104,214,0.35) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-100px] left-[-80px] w-[360px] h-[360px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(14,188,212,0.22) 0%, transparent 70%)' }} />

        <div className="relative max-w-[900px] mx-auto text-center">
          <div className="inline-flex items-center gap-[10px] mb-[28px]">
            <div className="w-[44px] h-[44px] rounded-[12px] overflow-hidden bg-white p-[2px] shadow-lg">
              <Image src="/images/logo.png" alt={`${settings.orgName} logo`} width={44} height={44} className="w-full h-full object-contain rounded-[9px]" />
            </div>
            <div className="text-left">
              <div className="font-[var(--font-display)] font-extrabold text-[20px] text-white leading-none">{settings.orgName}</div>
            </div>
          </div>

          <h2 className="font-[var(--font-display)] font-bold text-[clamp(32px,5vw,52px)] text-white leading-[1.05]">
            {settings.tagline}
          </h2>
          <p className="mt-[18px] text-[15px] text-white/65 max-w-[520px] mx-auto leading-[1.7]">
            {settings.description}
          </p>

          <div className="mt-[28px] inline-flex items-center gap-[10px] mono text-[12px] text-white/80">
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent-2)]" />
            Senior engineers only · Full IP ownership · Global delivery
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="brochure-section px-[6vw] py-[56px]">
        <div className="mono text-[11px] font-semibold uppercase tracking-wide text-[var(--accent)] mb-[10px] before:content-['01_//_']">What we do</div>
        <h3 className="font-[var(--font-display)] font-bold text-[26px] text-[var(--ink)] mb-[26px]">
          Seven services, one senior team.
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
          {services.map((s) => (
            <div key={s.id} className="rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-[18px]">
              <div className="text-[14.5px] font-bold text-[var(--ink)]">{s.title}</div>
              <p className="mt-[6px] text-[12.5px] text-[var(--muted)] leading-[1.55] line-clamp-2">{stripHtml(s.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries + trust */}
      <section className="brochure-section px-[6vw] py-[56px] bg-[var(--bg-alt)]">
        <div className="mono text-[11px] font-semibold uppercase tracking-wide text-[var(--accent)] mb-[10px] before:content-['02_//_']">Who we build for</div>
        <h3 className="font-[var(--font-display)] font-bold text-[26px] text-[var(--ink)] mb-[26px]">
          Industries we build for.
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] mb-[36px]">
          {industries.map((i) => (
            <div key={i.id} className="rounded-[10px] bg-white border border-[var(--line)] px-[14px] py-[12px]">
              <span className="text-[12.5px] font-semibold text-[var(--ink)]">{i.title}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px] pt-[24px] border-t border-[var(--line)]">
          <div>
            <div className="font-[var(--font-display)] font-extrabold text-[22px] text-[var(--accent)]">Zero-Downtime</div>
            <div className="text-[12px] text-[var(--muted)] mt-[4px]">Deployment practice</div>
          </div>
          <div>
            <div className="font-[var(--font-display)] font-extrabold text-[26px] text-[var(--accent)]">100%</div>
            <div className="text-[12px] text-[var(--muted)] mt-[4px]">IP transfer, always</div>
          </div>
          <div>
            <div className="font-[var(--font-display)] font-extrabold text-[22px] text-[var(--accent)]">Senior</div>
            <div className="text-[12px] text-[var(--muted)] mt-[4px]">Engineers only</div>
          </div>
          <div>
            <div className="font-[var(--font-display)] font-extrabold text-[22px] text-[var(--accent)]">Multi-Region</div>
            <div className="text-[12px] text-[var(--muted)] mt-[4px]">Delivery architecture</div>
          </div>
        </div>
      </section>

      {/* Process */}
      {roadmapSteps.length > 0 && (
        <section className="brochure-section px-[6vw] py-[56px]">
          <div className="mono text-[11px] font-semibold uppercase tracking-wide text-[var(--accent)] mb-[10px] before:content-['03_//_']">How we work</div>
          <h3 className="font-[var(--font-display)] font-bold text-[26px] text-[var(--ink)] mb-[26px]">
            From first talk to happy delivery.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-[14px]">
            {roadmapSteps.map((step) => (
              <div key={step.id} className="rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-[16px]">
                <div className="w-[26px] h-[26px] rounded-full bg-[var(--accent)] text-white flex items-center justify-center mono text-[11px] font-bold mb-[10px]">
                  {step.step}
                </div>
                <div className="text-[13px] font-bold text-[var(--ink)]">{step.title}</div>
                <p className="mt-[5px] text-[11.5px] text-[var(--muted)] leading-[1.5] line-clamp-3">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="brochure-section px-[6vw] py-[56px] bg-[var(--ink)]">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[32px] items-center">
          <div>
            <h3 className="font-[var(--font-display)] font-bold text-[26px] text-white mb-[10px]">
              Let&apos;s build something great.
            </h3>
            <p className="text-[13.5px] text-white/65 leading-[1.7] max-w-[420px]">
              {settings.footerBlurb}
            </p>
          </div>
          <div className="flex flex-col gap-[14px]">
            <div>
              <div className="mono text-[10px] uppercase tracking-wide text-white/45">Email</div>
              <div className="text-[16px] font-semibold text-white mt-[2px]">{settings.contactEmail}</div>
            </div>
            <div>
              <div className="mono text-[10px] uppercase tracking-wide text-white/45">Phone</div>
              <div className="text-[16px] font-semibold text-white mt-[2px]">
                {settings.contactPhone || '[Add a phone number in Site Settings]'}
              </div>
            </div>
            <div>
              <div className="mono text-[10px] uppercase tracking-wide text-white/45">Website</div>
              <div className="text-[16px] font-semibold text-white mt-[2px]">{settings.url.replace(/^https?:\/\//, '')}</div>
            </div>
            <div className="mono text-[11px] text-white/40 mt-[6px]">{settings.copyrightText}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
