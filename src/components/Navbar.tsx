"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Button from '@mui/material/Button';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
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
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-[4vw] pt-[14px] md:pt-[18px] pointer-events-none">
      <nav
        className={`pointer-events-auto w-full max-w-[850px] rounded-full transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-white/95 border border-[rgba(23,104,214,0.3)] shadow-[0_16px_36px_rgba(10,23,47,0.09)]'
            : 'bg-white/85 border border-[rgba(23,104,214,0.16)] shadow-[0_8px_24px_rgba(10,23,47,0.05)]'
        }`}
      >
        <div className="flex items-center justify-between gap-[12px] px-[10px] md:px-[14px] py-[7px]">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center group shrink-0" aria-label="Quantyro Technologies Home">
            <div className="relative w-[38px] h-[38px] rounded-xl overflow-hidden shadow-sm border border-[rgba(10,23,47,0.1)] bg-white/95 p-[2px] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_16px_rgba(23,104,214,0.3)]">
              <Image
                src="/images/logo.jpeg"
                alt="Quantyro Technologies Logo"
                width={38}
                height={38}
                className="object-cover w-full h-full rounded-[10px]"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-[2px]">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group relative px-[13px] py-[7px] rounded-full text-[14px] font-semibold transition-all duration-300 flex items-center ${
                    active
                      ? 'text-[var(--accent)] bg-[rgba(23,104,214,0.07)]'
                      : 'text-slate-600 hover:text-[var(--ink)] hover:bg-slate-900/[0.04]'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-[3px] left-[13px] right-[13px] h-[2px] rounded-full bg-[var(--accent)] transition-all duration-300 ${
                      active
                        ? 'opacity-100 scale-x-100'
                        : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block shrink-0">
            <Button
              variant="contained"
              component={Link}
              href="/contact"
              sx={{
                fontSize: '13px',
                padding: '7px 18px',
                borderRadius: '999px',
                backgroundColor: 'var(--accent)',
                color: '#fff',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#1256B4',
                  boxShadow: '0 6px 20px rgba(23,104,214,0.35)',
                },
              }}
            >
              Start a project
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden relative w-[30px] h-[22px] flex flex-col justify-between"
          >
            <span
              className={`block h-[2.5px] w-full bg-[var(--ink)] rounded-full transition-transform duration-300 ${
                menuOpen ? 'translate-y-[9.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[2.5px] w-full bg-[var(--ink)] rounded-full transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-[2.5px] w-full bg-[var(--ink)] rounded-full transition-transform duration-300 ${
                menuOpen ? '-translate-y-[9.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out border-t border-[rgba(23,104,214,0.08)] ${
            menuOpen ? 'max-h-[340px] opacity-100' : 'max-h-0 opacity-0 border-t-0'
          }`}
        >
          <div className="flex flex-col gap-[6px] px-[20px] py-[16px] text-[16px]">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-[10px] px-[14px] rounded-xl font-semibold transition-all flex items-center justify-between ${
                    active
                      ? 'text-[var(--accent)] bg-[rgba(23,104,214,0.07)]'
                      : 'text-[var(--ink)] hover:bg-slate-900/[0.04]'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-[10px] text-center bg-[var(--accent)] text-white py-[12px] rounded-full text-[14.5px] font-semibold hover:bg-[#1256B4] transition-all shadow-md"
            >
              Start a project
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
