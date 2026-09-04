"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const MAIN_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  const prevPathname = React.useRef(pathname);
  if (prevPathname.current !== pathname) {
    prevPathname.current = pathname;
    if (menuOpen) {
      setMenuOpen(false);
    }
  }

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 md:px-[3vw] pt-[8px] md:pt-[10px] pointer-events-none transition-all duration-300">
      {/* Mobile Drawer Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[-1] lg:hidden pointer-events-auto transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        className={`pointer-events-auto w-full max-w-[1280px] transition-all duration-300 backdrop-saturate-[220%] ${
          menuOpen
            ? 'rounded-[24px] bg-white/95 backdrop-blur-3xl border border-[rgba(23,104,214,0.35)] shadow-[0_20px_60px_rgba(10,23,47,0.18)] py-[8px] sm:py-[10px]'
            : scrolled
            ? 'rounded-full bg-white/20 backdrop-blur-3xl border border-[rgba(23,104,214,0.35)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_0_0_1px_rgba(255,255,255,0.15),0_16px_44px_rgba(23,104,214,0.16)] py-[4px] md:py-[5px]'
            : 'rounded-full bg-white/12 backdrop-blur-3xl border border-[rgba(23,104,214,0.26)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_0_0_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(23,104,214,0.1)] py-[5px] md:py-[6px]'
        }`}
        style={{ backdropFilter: 'blur(28px) saturate(220%)', WebkitBackdropFilter: 'blur(28px) saturate(220%)' }}
      >
        <div className="flex items-center justify-between px-[12px] sm:px-[16px] md:px-[20px]">
          
          {/* Brand Logo with Icon & Full Name "Quantyro Technologies" */}
          <Link href="/" className="flex items-center gap-[8px] sm:gap-[10px] md:gap-[12px] group shrink-0" aria-label="Quantyro Technologies Home">
            <div className="relative w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] md:w-[44px] md:h-[44px] overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <Image
                src="/images/quantyro-technologies.png"
                alt="Quantyro Technologies Logo"
                width={44}
                height={44}
                className="object-contain w-full h-full scale-[1.12]"
                priority
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="font-[var(--font-display)] font-extrabold text-[17px] sm:text-[18px] md:text-[20px] text-[var(--ink)] tracking-tight leading-none group-hover:text-[var(--accent)] transition-colors">
                Quantyro
              </span>
              <span className="mono text-[8px] sm:text-[8.5px] md:text-[9.5px] uppercase font-bold tracking-[0.14em] text-[var(--muted)] mt-[2px] sm:mt-[2.5px] group-hover:text-[var(--ink)] transition-colors">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-[4px]">
            {MAIN_LINKS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-[13px] py-[5px] rounded-full text-[16.5px] font-semibold leading-none transition-all duration-200 ${
                    active
                      ? 'text-[var(--accent)] bg-[var(--accent)]/10 font-bold'
                      : 'text-black hover:text-black hover:bg-[rgba(10,23,47,0.04)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action: Availability Pulse, CTA & Mobile Hamburger */}
          <div className="flex items-center gap-[8px] sm:gap-[10px] md:gap-[12px]">
            <div className="hidden xl:inline-flex items-center gap-[5px] mono text-[11px] font-bold text-emerald-950 bg-emerald-100/90 px-[10px] py-[3.5px] rounded-full border border-emerald-300">
              <span className="w-[5px] h-[5px] rounded-full bg-emerald-600 animate-pulse" />
              Available for Q3/Q4
            </div>

            {/* Desktop & Tablet CTA Button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-[6px] px-[14px] md:px-[18px] py-[6px] md:py-[7.5px] rounded-full bg-[#0A1324] text-white text-[12px] md:text-[13px] font-bold hover:bg-[var(--accent)] shadow-sm hover:shadow-md transition-all duration-300 group shrink-0"
            >
              <span>Start a Project</span>
              <svg
                width="13"
                height="13"
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

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden relative w-[38px] h-[38px] rounded-full bg-[rgba(10,23,47,0.05)] border border-[rgba(10,23,47,0.18)] flex items-center justify-center shrink-0 hover:bg-[rgba(10,23,47,0.1)] active:scale-95 transition-all"
            >
              <div className="w-[18px] h-[14px] flex flex-col justify-between">
                <span
                  className={`block h-[2px] w-full bg-[var(--ink)] rounded-full transition-transform duration-300 origin-center ${
                    menuOpen ? 'translate-y-[6px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-[2px] w-full bg-[var(--ink)] rounded-full transition-opacity duration-300 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-[2px] w-full bg-[var(--ink)] rounded-full transition-transform duration-300 origin-center ${
                    menuOpen ? '-translate-y-[6px] -rotate-45' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {menuOpen && (
          <div className="lg:hidden px-[14px] sm:px-[16px] pt-[14px] pb-[16px] border-t border-[rgba(10,23,47,0.08)] mt-[8px] space-y-[12px] animate-in fade-in duration-200">
            <div className="grid grid-cols-1 gap-[3px]">
              {MAIN_LINKS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-[14px] py-[10px] rounded-xl font-bold text-[15px] transition-colors ${
                      active
                        ? 'text-[var(--accent)] bg-[var(--accent)]/10'
                        : 'text-[var(--ink)] hover:bg-[rgba(23,104,214,0.08)] hover:text-[var(--accent)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Drawer CTA & Availability */}
            <div className="pt-[10px] border-t border-[rgba(10,23,47,0.08)] flex flex-col gap-[10px]">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center justify-center gap-[8px] py-[11px] px-[16px] rounded-xl bg-[#0A1324] text-white text-[14px] font-bold hover:bg-[var(--accent)] shadow-md transition-all duration-300 group"
              >
                <span>Start a Project</span>
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

              <div className="flex items-center justify-center gap-[6px] mono text-[11px] font-bold text-emerald-950 bg-emerald-100/90 py-[7px] px-[12px] rounded-lg border border-emerald-300">
                <span className="w-[6px] h-[6px] rounded-full bg-emerald-600 animate-pulse" />
                <span>Available for Q3/Q4 Projects</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

