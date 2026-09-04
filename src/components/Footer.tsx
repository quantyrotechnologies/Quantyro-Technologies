"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticLink from './MagneticLink';
import type { SocialLink, SiteSettings } from '@/lib/types';
import RichText from './RichText';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

const PRACTICE_AREAS = [
  { label: 'Website Development', href: '/services/website-development' },
  { label: 'Custom Software & SaaS', href: '/services/custom-software' },
  { label: 'Mobile Apps (iOS/Android)', href: '/services/mobile-apps' },
  { label: 'Headless E-Commerce', href: '/services/e-commerce' },
  { label: 'AI & Machine Learning', href: '/services/ai-machine-learning' },
  { label: 'Cloud & DevOps Solutions', href: '/services/cloud-devops' },
  { label: 'Technical SEO & Growth', href: '/services/seo-marketing' },
];

const INDUSTRY_LINKS = [
  { label: 'Banking & FinTech', href: '/industries/banking-fintech' },
  { label: 'Healthcare & Telemedicine', href: '/industries/healthcare-telemedicine' },
  { label: 'E-Commerce & Retail', href: '/industries/ecommerce-retail' },
  { label: 'SaaS & Cloud Platforms', href: '/industries/saas-cloud' },
  { label: 'Supply Chain & Logistics', href: '/industries/supply-chain-logistics' },
];

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Senior Team', href: '/team' },
  { label: 'Verified Certifications', href: '/certifications' },
  { label: 'Case Studies', href: '/work' },
  { label: 'Company Brochure', href: '/brochure' },
  { label: 'Engineering Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
];

/** Matches a social link's admin-entered label to a recognizable glyph; falls back to initials. */
function SocialIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  if (key.includes('linkedin')) {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M6.94 8.5H3.56V20.4h3.38V8.5ZM5.25 3.6a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20.4h-3.37v-6.24c0-1.49-.03-3.4-2.07-3.4-2.08 0-2.4 1.62-2.4 3.3v6.34H9.24V8.5h3.24v1.63h.05c.45-.86 1.56-1.77 3.22-1.77 3.44 0 4.7 2.63 4.7 5.75v6.29Z" />
      </svg>
    );
  }
  if (key.includes('twitter') || key === 'x' || key.includes('x.com')) {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M18.24 3H21l-6.55 7.5L22.2 21h-6.4l-5-6.5-5.73 6.5H2.3l7.02-8-7.3-9.5h6.56l4.53 5.94L18.24 3Zm-1.12 16.2h1.77L7.03 4.7H5.13l12 14.5Z" />
      </svg>
    );
  }
  if (key.includes('github')) {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.61-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.55 2.36 1.11 2.94.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z" />
      </svg>
    );
  }
  if (key.includes('instagram')) {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (key.includes('facebook')) {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M14.5 21v-7.5h2.5l.4-3H14.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.3c-.28-.04-1.22-.12-2.32-.12-2.3 0-3.87 1.4-3.87 3.98v2.22H9v3h2.4V21h3.1Z" />
      </svg>
    );
  }
  if (key.includes('youtube')) {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M21.6 7.6a2.75 2.75 0 0 0-1.94-1.95C18 5.2 12 5.2 12 5.2s-6 0-7.66.45A2.75 2.75 0 0 0 2.4 7.6 28.8 28.8 0 0 0 2 12a28.8 28.8 0 0 0 .4 4.4 2.75 2.75 0 0 0 1.94 1.95c1.66.45 7.66.45 7.66.45s6 0 7.66-.45a2.75 2.75 0 0 0 1.94-1.95A28.8 28.8 0 0 0 22 12a28.8 28.8 0 0 0-.4-4.4ZM10 15V9l5.2 3-5.2 3Z" />
      </svg>
    );
  }
  return <span className="text-[11px] font-bold">{label.slice(0, 2).toUpperCase()}</span>;
}

export default function Footer({
  socialLinks,
  settings,
}: {
  socialLinks: SocialLink[];
  settings: SiteSettings;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      const footerTargets = gsap.utils.toArray<HTMLElement>('.footer-reveal');
      if (footerTargets.length > 0) {
        gsap.fromTo(footerTargets,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container.current,
              start: 'top 95%',
              once: true,
            },
          }
        );
      }

      ScrollTrigger.create({
        trigger: container.current,
        start: 'top 85%',
        onEnter: () => setShowTop(true),
        onLeaveBack: () => setShowTop(false),
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={container} className="relative z-10 bg-gradient-to-b from-[#0A1324] to-[#060D1A] text-white overflow-hidden border-t border-white/10">
      {/* Top Gradient Laser Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[350px] bg-[radial-gradient(ellipse_at_top_right,rgba(23,104,214,0.18),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[300px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,229,153,0.1),transparent_70%)] pointer-events-none" />

      {/* Main 5-Column Navigation Grid */}
      <div className="relative px-[6vw] pt-[44px] pb-[24px]">
        <div className="footer-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr] gap-[32px] lg:gap-[36px] pb-[36px] border-b border-white/10">

          {/* Column 1: Brand & Philosophy */}
          <div className="lg:pr-[20px]">
            <Link href="/" className="inline-flex items-center gap-[14px] group">
              <div className="relative w-[42px] h-[42px] md:w-[48px] md:h-[48px] rounded-[12px] overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/images/quantyro-technologies.png?v=2"
                  alt={`${settings.orgName} logo`}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                  unoptimized
                />
              </div>
              <span className="font-[var(--font-display)] font-extrabold text-[20px] md:text-[22px] text-white tracking-tight leading-none">
                {settings.orgName}
              </span>
            </Link>

            <div className="mt-[16px] max-w-[34ch] text-[13.5px] text-slate-300 leading-[1.65]">
              <RichText html={settings.footerBlurb || 'Senior software engineering and digital transformation consultancy. Direct GitHub IP ownership, zero junior benches.'} />
            </div>

            {/* Social Icons */}
            {socialLinks.length > 0 && (
              <div className="mt-[24px] flex items-center gap-[8px]">
                {socialLinks.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[36px] h-[36px] rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-300 hover:text-white hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:-translate-y-[2px] transition-all duration-300"
                    aria-label={s.label}
                  >
                    <SocialIcon label={s.label} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Practice Areas */}
          <div>
            <div className="mono text-[11px] uppercase font-bold tracking-wider text-sky-400 mb-[16px]">
              Practice Areas
            </div>
            <ul className="flex flex-col gap-[10px]">
              {PRACTICE_AREAS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-slate-300 hover:text-cyan-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industries */}
          <div>
            <div className="mono text-[11px] uppercase font-bold tracking-wider text-sky-400 mb-[16px]">
              Industries
            </div>
            <ul className="flex flex-col gap-[10px]">
              {INDUSTRY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-slate-300 hover:text-cyan-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <div className="mono text-[11px] uppercase font-bold tracking-wider text-sky-400 mb-[16px]">
              Company &amp; Firm
            </div>
            <ul className="flex flex-col gap-[10px]">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-slate-300 hover:text-cyan-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Direct Engineering Access & SLA */}
          <div className="rounded-[20px] bg-white/[0.03] border border-white/10 p-[20px] flex flex-col justify-between">
            <div>
              <div className="mono text-[11px] uppercase font-bold tracking-wider text-emerald-400 mb-[8px]">
                Direct Architect Access
              </div>
              <p className="text-[12.5px] text-slate-300 leading-[1.6]">
                Guaranteed response within 4 business hours from a senior technical lead.
              </p>
              <a
                href={`mailto:${settings.contactEmail}`}
                className="mt-[12px] block text-[13px] font-mono text-cyan-300 hover:underline break-all font-semibold"
              >
                {settings.contactEmail}
              </a>
            </div>

            <div className="mt-[20px]">
              <MagneticLink
                href="/contact"
                className="w-full text-center inline-flex items-center justify-center gap-[6px] bg-[var(--accent)] hover:bg-blue-600 text-white py-[11px] px-[18px] rounded-full text-[13px] font-bold transition-all shadow-[0_8px_24px_rgba(23,104,214,0.3)]"
              >
                <span>Initiate Project</span>
                <span>→</span>
              </MagneticLink>
            </div>
          </div>
        </div>

        {/* Bottom Bar with IP & Compliance badges */}
        <div className="footer-reveal pt-[18px] flex flex-col md:flex-row items-center justify-between gap-[12px] text-[12px] text-slate-300">
          <div className="flex flex-wrap items-center gap-[12px]">
            <span>{settings.copyrightText || `© ${new Date().getFullYear()} Quantyro Technologies. All Rights Reserved.`}</span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="mono text-[11px] text-slate-300">100% Client IP Ownership Standard</span>
          </div>

          <div className="flex flex-wrap items-center gap-[16px]">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-slate-300 hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
            <span className="mono text-[11px] px-[8px] py-[2px] rounded-md bg-white/[0.05] border border-white/10 text-slate-300">
              SOC 2 &amp; ISO-Ready
            </span>
          </div>
        </div>
      </div>

      {/* Floating Back to top button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-[24px] right-[24px] z-40 w-[44px] h-[44px] rounded-full bg-[#0A172F] border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex items-center justify-center text-white hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 ${
          showTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-[10px] pointer-events-none'
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}
