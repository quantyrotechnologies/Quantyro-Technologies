"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SERVICES_MENU = [
  {
    title: 'Custom Software Development',
    desc: 'Bespoke web apps, SaaS platforms & microservices',
    href: '/services/custom-software',
    icon: '⚡',
  },
  {
    title: 'AI & Machine Learning',
    desc: 'Enterprise RAG pipelines, vector search & autonomous agents',
    href: '/services/ai-machine-learning',
    icon: '🧠',
  },
  {
    title: 'Cloud Architecture & DevOps',
    desc: 'Kubernetes, multi-region failover & automated CI/CD',
    href: '/services/cloud-devops',
    icon: '☁️',
  },
  {
    title: 'Mobile App Development',
    desc: 'Native & cross-platform iOS & Android engineering',
    href: '/services/mobile-apps',
    icon: '📱',
  },
  {
    title: 'Modern Headless E-Commerce',
    desc: 'High-speed storefronts, checkout funnels & ERP sync',
    href: '/services/e-commerce',
    icon: '🛍️',
  },
];

const MAIN_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnterServices = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    dropdownTimeout.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-[3vw] pt-[12px] md:pt-[16px] pointer-events-none transition-all duration-300">
      <nav
        className={`pointer-events-auto w-full max-w-[1280px] rounded-[24px] md:rounded-full transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-white/95 backdrop-blur-xl border border-[rgba(10,23,47,0.12)] shadow-[0_16px_40px_rgba(10,23,47,0.08)] py-[8px] md:py-[10px]'
            : 'bg-white/80 backdrop-blur-lg border border-[rgba(10,23,47,0.08)] shadow-[0_8px_28px_rgba(10,23,47,0.04)] py-[10px] md:py-[12px]'
        }`}
      >
        <div className="flex items-center justify-between px-[16px] md:px-[24px]">
          
          {/* Brand Logo with Icon & Full Name "Quantyro Technologies" */}
          <Link href="/" className="flex items-center gap-[12px] group shrink-0" aria-label="Quantyro Technologies Home">
            <div className="relative w-[38px] h-[38px] md:w-[42px] md:h-[42px] rounded-xl overflow-hidden shadow-sm border border-[rgba(10,23,47,0.12)] bg-white p-[2px] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_20px_rgba(23,104,214,0.35)]">
              <Image
                src="/images/logo.jpeg"
                alt="Quantyro Technologies Logo"
                width={42}
                height={42}
                className="object-cover w-full h-full rounded-[9px]"
                priority
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-[6px]">
                <span className="font-[var(--font-display)] font-extrabold text-[18px] md:text-[20px] text-[var(--ink)] tracking-tight leading-none group-hover:text-[var(--accent)] transition-colors">
                  Quantyro
                </span>
                <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent-2)]" />
              </div>
              <span className="mono text-[9px] md:text-[10px] uppercase font-bold tracking-[0.14em] text-[var(--muted)] mt-[3px] group-hover:text-[var(--ink)] transition-colors">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-[6px]">
            {/* Services with Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterServices}
              onMouseLeave={handleMouseLeaveServices}
            >
              <Link
                href="/services"
                className={`group flex items-center gap-[4px] px-[16px] py-[8px] rounded-full text-[14px] font-semibold transition-all duration-200 ${
                  pathname.startsWith('/services')
                    ? 'text-[var(--accent)] bg-[var(--accent)]/10 font-bold'
                    : 'text-[var(--ink)]/80 hover:text-[var(--ink)] hover:bg-[rgba(10,23,47,0.04)]'
                }`}
              >
                <span>Services</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[var(--accent)]' : ''}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>

              {/* Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-[8px] w-[360px] rounded-[20px] bg-white border border-[rgba(10,23,47,0.12)] shadow-[0_20px_50px_rgba(10,23,47,0.14)] p-[12px] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="space-y-[4px]">
                    {SERVICES_MENU.map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-start gap-[12px] p-[10px] rounded-[14px] hover:bg-[var(--bg-alt)] transition-all duration-200 group"
                      >
                        <span className="w-[32px] h-[32px] rounded-lg bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center text-[15px] shrink-0 group-hover:scale-110 group-hover:border-[var(--accent)] transition-transform">
                          {svc.icon}
                        </span>
                        <div>
                          <div className="text-[13.5px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                            {svc.title}
                          </div>
                          <div className="text-[11.5px] text-[var(--muted)] leading-tight mt-[2px]">
                            {svc.desc}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-[8px] pt-[8px] border-t border-[var(--line)] px-[8px] flex items-center justify-between">
                    <Link
                      href="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="mono text-[11px] font-bold text-[var(--accent)] hover:underline flex items-center gap-[4px]"
                    >
                      <span>Explore all 5 engineering practices</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Other Nav Links */}
            {MAIN_LINKS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-[16px] py-[8px] rounded-full text-[14px] font-semibold transition-all duration-200 ${
                    active
                      ? 'text-[var(--accent)] bg-[var(--accent)]/10 font-bold'
                      : 'text-[var(--ink)]/80 hover:text-[var(--ink)] hover:bg-[rgba(10,23,47,0.04)]'
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
            className="lg:hidden relative w-[40px] h-[40px] rounded-full bg-[rgba(10,23,47,0.05)] border border-[rgba(10,23,47,0.1)] flex items-center justify-center"
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
            <div className="text-[11px] mono uppercase font-bold text-[var(--muted)] px-[8px]">
              Services
            </div>
            <div className="grid grid-cols-1 gap-[6px]">
              {SERVICES_MENU.map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-[10px] p-[10px] rounded-xl hover:bg-[var(--bg-alt)] transition-colors"
                >
                  <span className="text-[16px]">{svc.icon}</span>
                  <div>
                    <div className="text-[13.5px] font-bold text-[var(--ink)]">{svc.title}</div>
                    <div className="text-[11px] text-[var(--muted)]">{svc.desc}</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-[10px] border-t border-[var(--line)] space-y-[4px]">
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
