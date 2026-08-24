"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticLink from './MagneticLink';
import type { SocialLink, SiteSettings } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

const EXPLORE_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Brochure', href: '/brochure' },
  { label: 'Contact', href: '/contact' },
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

function LocalTimeClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        }).format(new Date())
      );
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="inline-flex items-center gap-[6px] mono text-[11.5px] text-[var(--muted)]">
      <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent-2)] animate-pulse" />
      Local time {time}
    </span>
  );
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
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container.current,
              start: 'top 90%',
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
    <footer ref={container} className="relative z-10 bg-gradient-to-b from-[var(--bg-alt)] to-[#E4EDF7] text-[var(--ink)] overflow-hidden border-t border-[var(--line)]">
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent)]" />

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[480px] h-[320px] bg-[radial-gradient(ellipse_at_top_right,rgba(23,104,214,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[280px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(14,188,212,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative px-[6vw] pt-[64px] pb-[32px]">
        <div className="footer-reveal grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1.1fr] gap-[40px] pb-[48px] border-b border-[var(--line)]">

          {/* Brand */}
          <div className="md:col-span-2 md:pr-[24px]">
            <Link href="/" className="inline-flex items-center gap-[12px] group">
              <div className="relative w-[44px] h-[44px] rounded-xl overflow-hidden shadow-sm border border-[rgba(10,23,47,0.12)] bg-white p-[1px] flex items-center justify-center transition-all duration-300 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_20px_rgba(23,104,214,0.25)]">
                <Image
                  src="/images/logo.png"
                  alt={`${settings.orgName} logo`}
                  width={44}
                  height={44}
                  className="object-contain w-full h-full rounded-[8px] scale-[1.08]"
                />
              </div>
              <span className="font-[var(--font-display)] font-extrabold text-[20px] text-[var(--ink)] tracking-tight leading-none">
                {settings.orgName}
              </span>
            </Link>
            <p className="mt-[16px] max-w-[36ch] text-[13.5px] text-[var(--muted)] leading-[1.65]">
              {settings.footerBlurb}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-[22px] flex items-center gap-[10px]">
                {socialLinks.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[36px] h-[36px] rounded-full border border-[var(--line)] bg-white flex items-center justify-center text-[var(--muted)] hover:text-white hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:-translate-y-[2px] transition-all duration-300 shadow-sm"
                    aria-label={s.label}
                  >
                    <SocialIcon label={s.label} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Explore */}
          <div>
            <div className="mono text-[10.5px] uppercase tracking-wide text-[var(--muted)] mb-[16px]">Explore</div>
            <ul className="flex flex-col gap-[11px]">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13.5px] text-[var(--ink)]/75 hover:text-[var(--accent)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="mono text-[10.5px] uppercase tracking-wide text-[var(--muted)] mb-[16px]">Company</div>
            <ul className="flex flex-col gap-[11px]">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13.5px] text-[var(--ink)]/75 hover:text-[var(--accent)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <div className="mono text-[10.5px] uppercase tracking-wide text-[var(--muted)] mb-[16px]">Start a project</div>
            <a href={`mailto:${settings.contactEmail}`} className="block text-[13.5px] text-[var(--ink)]/75 hover:text-[var(--accent)] transition-colors break-all">
              {settings.contactEmail}
            </a>
            <div className="mt-[10px]">
              <LocalTimeClock />
            </div>
            <MagneticLink
              href="/contact"
              className="mt-[18px] inline-flex items-center gap-[8px] bg-[var(--ink)] text-white py-[11px] px-[22px] rounded-full text-[13px] font-bold hover:bg-[var(--accent)] transition-colors shadow-[0_8px_24px_rgba(10,23,47,0.15)]"
            >
              Get started →
            </MagneticLink>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-reveal pt-[24px] flex flex-col sm:flex-row items-center justify-between gap-[12px] text-[12px] text-[var(--muted)]">
          <span>{settings.copyrightText}</span>
          <div className="flex items-center gap-[20px]">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-[var(--accent)] transition-colors">
                {l.label}
              </Link>
            ))}
            <span className="mono text-[11px] hidden sm:inline">Designed &amp; engineered in-house.</span>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-[24px] right-[24px] z-40 w-[44px] h-[44px] rounded-full bg-[var(--ink)] border border-white/20 shadow-[0_8px_24px_rgba(10,23,47,0.3)] flex items-center justify-center text-white hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 ${
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
