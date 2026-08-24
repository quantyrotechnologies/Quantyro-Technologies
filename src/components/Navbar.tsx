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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-[3vw] pt-[12px] md:pt-[16px] pointer-events-none transition-all duration-300">
      <nav
        className={`pointer-events-auto w-full max-w-[1280px] rounded-[24px] md:rounded-full transition-all duration-300 backdrop-saturate-[220%] ${
          scrolled || menuOpen
            ? 'bg-white/18 backdrop-blur-3xl border border-[rgba(23,104,214,0.35)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_0_0_1px_rgba(255,255,255,0.15),0_16px_44px_rgba(23,104,214,0.16)] py-[8px] md:py-[10px]'
            : 'bg-white/10 backdrop-blur-3xl border border-[rgba(23,104,214,0.26)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_0_0_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(23,104,214,0.1)] py-[10px] md:py-[12px]'
        }`}
        style={{ backdropFilter: 'blur(28px) saturate(220%)', WebkitBackdropFilter: 'blur(28px) saturate(220%)' }}
      >
        <div className="flex items-center justify-between px-[16px] md:px-[24px]">
          
          {/* Brand Logo with Icon & Full Name "Quantyro Technologies" */}
          <Link href="/" className="flex items-center gap-[12px] group shrink-0" aria-label="Quantyro Technologies Home">
            <div className="relative w-[38px] h-[38px] md:w-[42px] md:h-[42px] rounded-xl overflow-hidden shadow-sm border border-[rgba(10,23,47,0.12)] bg-white p-[2px] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_20px_rgba(23,104,214,0.35)]">
              <Image
                src="/images/logo.png"
                alt="Quantyro Technologies Logo"
                width={42}
                height={42}
                className="object-contain w-full h-full rounded-[9px]"
                priority
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="font-[var(--font-display)] font-extrabold text-[18px] md:text-[20px] text-[var(--ink)] tracking-tight leading-none group-hover:text-[var(--accent)] transition-colors">
                Quantyro
              </span>
              <span className="mono text-[9px] md:text-[10px] uppercase font-bold tracking-[0.14em] text-[var(--muted)] mt-[3px] group-hover:text-[var(--ink)] transition-colors">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-[6px]">
            {MAIN_LINKS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-[16px] py-[8px] rounded-full text-[16px] font-semibold transition-all duration-200 ${
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

          {/* Right Action: Availability Pulse & High-Contrast CTA */}
          <div className="hidden sm:flex items-center gap-[14px]">
            <div className="hidden xl:inline-flex items-center gap-[6px] mono text-[11.5px] text-emerald-600 bg-emerald-50 px-[12px] py-[5px] rounded-full border border-emerald-200">
              <span className="w-[6px] h-[6px] rounded-full bg-emerald-500 animate-pulse" />
              Available for Q3/Q4 Projects
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-[8px] px-[20px] py-[10px] rounded-full bg-[#0A1324] text-white text-[13.5px] font-bold hover:bg-[var(--accent)] shadow-md hover:shadow-lg transition-all duration-300 group shrink-0"
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
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden relative w-[40px] h-[40px] rounded-full bg-[rgba(10,23,47,0.05)] border border-[rgba(10,23,47,0.18)] flex items-center justify-center"
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

        {/* Mobile Slide-Down Drawer */}
        {menuOpen && (
          <div className="lg:hidden px-[16px] pt-[16px] pb-[20px] border-t border-[var(--line)] mt-[10px] space-y-[14px] animate-in fade-in duration-200">
            <div className="space-y-[4px]">
              {MAIN_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-[12px] py-[9px] rounded-xl font-bold text-[14.5px] text-[var(--ink)] hover:bg-[var(--bg-alt)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-[8px]">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-[12px] rounded-full bg-[var(--accent)] text-white font-bold text-[14px] block shadow-md hover:bg-[var(--ink)] transition-colors"
              >
                Start a Project →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
