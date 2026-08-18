"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticLink from './MagneticLink';
import type { SocialLink, SiteSettings } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EXPLORE_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

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
      <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)]" />
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

  useGSAP(() => {
    gsap.fromTo('.footer-reveal',
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
  }, { scope: container });

  return (
    <footer ref={container} className="relative z-10 border-t border-[var(--line)]">
      <div className="px-[6vw] pt-[64px] pb-[40px]">
        <div className="footer-reveal grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-[40px] pb-[48px]">

          {/* Brand */}
          <div>
            <div className="font-[var(--font-display)] font-bold text-[var(--ink)] text-[18px]">{settings.orgName}</div>
            <p className="mt-[10px] max-w-[32ch] text-[13.5px] text-[var(--muted)] leading-[1.6]">
              {settings.footerBlurb}
            </p>
            {socialLinks.length > 0 && (
            <div className="mt-[18px] flex items-center gap-[14px]">
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  className="w-[32px] h-[32px] rounded-full border border-[var(--line)] flex items-center justify-center text-[11px] font-semibold text-[var(--muted)] hover:text-[var(--accent)] hover:border-[rgba(23,104,214,0.4)] transition-colors"
                  aria-label={s.label}
                >
                  {s.label.slice(0, 2)}
                </a>
              ))}
            </div>
            )}
          </div>

          {/* Explore */}
          <div>
            <div className="mono text-[11px] uppercase tracking-wide text-[var(--muted)] mb-[14px]">Explore</div>
            <ul className="flex flex-col gap-[10px]">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13.5px] text-[var(--ink)]/80 hover:text-[var(--accent)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <div className="mono text-[11px] uppercase tracking-wide text-[var(--muted)] mb-[14px]">Get in touch</div>
            <a href={`mailto:${settings.contactEmail}`} className="block text-[13.5px] text-[var(--ink)]/80 hover:text-[var(--accent)] transition-colors">
              {settings.contactEmail}
            </a>
            <div className="mt-[6px]">
              <LocalTimeClock />
            </div>
          </div>

          {/* CTA */}
          <div className="md:text-right">
            <div className="mono text-[11px] uppercase tracking-wide text-[var(--muted)] mb-[14px] md:text-right">Start a project</div>
            <p className="text-[13.5px] text-[var(--muted)] leading-[1.6] md:ml-auto max-w-[30ch]">
              Tell us about your roadmap — we reply within one business day.
            </p>
            <MagneticLink
              href="/contact"
              className="mt-[16px] inline-flex bg-[var(--ink)] text-[var(--bg)] py-[11px] px-[24px] rounded-full text-[13.5px] font-semibold hover:bg-[var(--accent)] hover:text-white transition-colors"
            >
              Get started →
            </MagneticLink>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-reveal pt-[24px] border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-[12px] text-[12px] text-[var(--muted)]">
          <span>{settings.copyrightText}</span>
          <span className="mono text-[11px]">Designed &amp; engineered in-house.</span>
        </div>
      </div>
    </footer>
  );
}
