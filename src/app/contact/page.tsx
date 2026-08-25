import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import FaqSection from '@/components/FaqSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getFaqs } from '@/lib/data/faqs';
import { getSiteSettings } from '@/lib/data/siteSettings';

import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Quantyro Technologies | Speak With Senior Software Architects',
  description: 'Initiate a project with Quantyro Technologies. Speak directly with senior software engineers and architects. Guaranteed 4-hour response SLA, zero junior gatekeepers, and mutual NDA protection.',
  alternates: { canonical: '/contact' },
  keywords: [
    'contact Quantyro Technologies',
    'hire senior software engineers',
    'hire Next.js developers',
    'custom software development inquiry',
    'enterprise AI consultancy contact',
    'software engineering partner Delhi Noida India',
  ],
  openGraph: {
    title: 'Contact Quantyro Technologies | Speak With Senior Software Architects',
    description: 'Initiate a project with Quantyro Technologies. Speak directly with senior software engineers and architects. Guaranteed 4-hour response SLA.',
    url: `${SITE_URL}/contact`,
    siteName: 'Quantyro Technologies',
    type: 'website',
  },
};

export default async function ContactPage() {
  const [faqs, settings] = await Promise.all([getFaqs('contact'), getSiteSettings()]);

  const engagementSteps = [
    {
      step: '01',
      title: 'Technical Scope Review',
      timeframe: 'Hour 0 – 4',
      desc: 'A senior software architect reviews your project requirements, target architecture, and business objectives.',
    },
    {
      step: '02',
      title: 'Architecture & Feasibility Call',
      timeframe: 'Within 24 Hours',
      desc: 'A focused 30-minute technical deep dive to align on tech stack, constraints, scalability targets, and delivery milestones.',
    },
    {
      step: '03',
      title: 'Fixed-Sprint Roadmap Proposal',
      timeframe: 'Day 3',
      desc: 'Receive a transparent sprint roadmap with deliverable milestones, fixed pricing, and direct GitHub onboarding.',
    },
  ];

  const engagementModels = [
    {
      title: 'Dedicated Senior Squad',
      tag: 'Full-Stack Delivery',
      desc: 'Cross-functional senior engineering pod (Frontend, Backend, AI/Cloud & QA) committed 100% to your product.',
    },
    {
      title: 'Targeted Sprint Modernization',
      tag: 'High-Impact Acceleration',
      desc: 'Fixed-duration sprints for architectural refactoring, Core Web Vitals optimization, or enterprise RAG AI integration.',
    },
    {
      title: 'Fractional CTO Advisory',
      tag: 'System Architecture & Strategy',
      desc: 'Senior architectural guidance, code quality audits, security hardening, and cloud infrastructure cost optimization.',
    },
  ];

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact/#contactpage`,
    url: `${SITE_URL}/contact`,
    name: 'Contact Quantyro Technologies — Senior Software Engineering Firm',
    description: 'Tell Quantyro Technologies about your project — we reply within one business day, every time.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: settings.contactEmail,
      ...(settings.contactPhone ? { telephone: settings.contactPhone } : {}),
      availableLanguage: ['English'],
    },
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* 1. Hero & Interactive Inquiry Terminal */}
      <section className="relative px-[6vw] pt-[150px] md:pt-[170px] pb-[80px] z-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_1.15fr] gap-[50px] lg:gap-[70px] items-start">
          <div>
            <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />

            <div className="inline-flex items-center gap-[6px] px-[12px] py-[3.5px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.2)] text-[var(--accent)] text-[11.5px] font-mono font-semibold uppercase mb-[14px]">
              <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] animate-pulse" />
              <span>Direct Engineering Access</span>
            </div>

            <h1 className="text-[clamp(32px,4.5vw,56px)] font-[var(--font-display)] font-bold leading-[1.1] text-[var(--ink)] tracking-tight">
              Let&apos;s engineer your next breakthrough.
            </h1>

            <p className="mt-[20px] max-w-[560px] text-[16px] md:text-[17px] text-[var(--muted)] leading-[1.7]">
              Speak directly with senior software architects and technical leads — no junior gatekeepers, sales scripts, or multi-week runarounds.
            </p>

            {/* Direct Contact Cards */}
            <div className="mt-[36px] space-y-[14px] max-w-[520px]">
              <div className="rounded-[18px] bg-[var(--surface)] border border-[var(--line)] p-[18px] flex items-center justify-between hover:border-[var(--accent)] transition-colors">
                <div>
                  <div className="text-[11.5px] font-mono font-bold text-[var(--accent)] uppercase">Direct Email</div>
                  <a href={`mailto:${settings.contactEmail}`} className="mt-[2px] text-[15.5px] font-bold text-[var(--ink)] hover:text-[var(--accent)] transition-colors">
                    {settings.contactEmail}
                  </a>
                </div>
                <span className="mono text-[11px] px-[10px] py-[4px] rounded-full bg-blue-50 text-[var(--accent)] font-medium">
                  Verified Inbox
                </span>
              </div>

              <div className="rounded-[18px] bg-[var(--surface)] border border-[var(--line)] p-[18px] flex items-center justify-between">
                <div>
                  <div className="text-[11.5px] font-mono font-bold text-emerald-600 uppercase">Guaranteed Response SLA</div>
                  <div className="mt-[2px] text-[15px] font-semibold text-[var(--ink)]">
                    {settings.responseTime || 'Within 4 Business Hours'}
                  </div>
                </div>
                <span className="mono text-[11px] px-[10px] py-[4px] rounded-full bg-emerald-50 text-emerald-700 font-medium">
                  Strict SLA
                </span>
              </div>

              <div className="rounded-[18px] bg-[var(--surface)] border border-[var(--line)] p-[18px] flex items-center justify-between">
                <div>
                  <div className="text-[11.5px] font-mono font-bold text-slate-500 uppercase">IP &amp; Confidentiality</div>
                  <div className="mt-[2px] text-[15px] font-semibold text-[var(--ink)]">
                    Mutual NDA Available Before Call
                  </div>
                </div>
                <span className="mono text-[11px] px-[10px] py-[4px] rounded-full bg-slate-100 text-slate-700 font-medium">
                  100% Confidential
                </span>
              </div>
            </div>

            <div className="mt-[28px] pt-[20px] border-t border-[var(--line)] max-w-[520px]">
              <Link
                href="/brochure"
                className="inline-flex items-center gap-[8px] text-[14px] font-semibold text-[var(--accent)] hover:text-[var(--ink)] transition-colors group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span>Download Quantyro Capabilities Brochure</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* 2. What Happens Next (3-Step Roadmap) */}
      <section className="relative px-[6vw] pb-[80px] z-10 max-w-[1280px] mx-auto">
        <div className="mb-[32px]">
          <div className="mono text-[11.5px] uppercase font-bold text-[var(--accent)] mb-[8px] flex items-center gap-[6px]">
            <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
            <span>Consultation Process</span>
          </div>
          <h2 className="text-[clamp(26px,3.8vw,38px)] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.15]">
            What happens after you reach out.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          {engagementSteps.map((s) => (
            <div
              key={s.step}
              className="rounded-[22px] bg-white border border-[rgba(10,23,47,0.12)] shadow-[0_8px_24px_rgba(10,23,47,0.04)] p-[26px] flex flex-col justify-between hover:border-[var(--accent)] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-[14px]">
                  <span className="mono text-[13px] font-bold text-[var(--accent)] px-[10px] py-[3px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.2)]">
                    STEP {s.step}
                  </span>
                  <span className="mono text-[11px] font-medium text-slate-500">
                    {s.timeframe}
                  </span>
                </div>
                <h3 className="text-[18px] font-[var(--font-display)] font-bold text-[var(--ink)]">
                  {s.title}
                </h3>
                <p className="mt-[10px] text-[13.5px] text-[var(--muted)] leading-[1.65]">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Engagement Models */}
      <section className="relative px-[6vw] pb-[80px] z-10 max-w-[1280px] mx-auto">
        <div className="mb-[32px]">
          <div className="mono text-[11.5px] uppercase font-bold text-[var(--accent)] mb-[8px] flex items-center gap-[6px]">
            <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
            <span>Delivery Models</span>
          </div>
          <h2 className="text-[clamp(26px,3.8vw,38px)] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.15]">
            How we partner with your team.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
          {engagementModels.map((m) => (
            <div
              key={m.title}
              className="rounded-[22px] bg-[var(--surface)] border border-[var(--line)] p-[26px] hover:border-[rgba(23,104,214,0.35)] transition-all"
            >
              <div className="mono text-[11px] font-bold text-[var(--accent)] mb-[8px] uppercase">
                {m.tag}
              </div>
              <h3 className="text-[18.5px] font-[var(--font-display)] font-bold text-[var(--ink)]">
                {m.title}
              </h3>
              <p className="mt-[10px] text-[13.5px] text-[var(--muted)] leading-[1.65]">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FAQs */}
      <FaqSection heading="Frequently Asked Questions About Working With Us" items={faqs} />
    </div>
  );
}
