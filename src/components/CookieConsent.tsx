"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'quantyro_cookie_consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already made a cookie consent choice
    try {
      const storedPreference = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!storedPreference) {
        // Show after 3 seconds as requested
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is disabled or restricted
    }
  }, []);

  const handleChoice = (type: 'all' | 'necessary') => {
    setIsClosing(true);
    try {
      localStorage.setItem(
        COOKIE_CONSENT_KEY,
        JSON.stringify({
          consent: type,
          timestamp: new Date().toISOString(),
        })
      );
    } catch {
      // Ignore write errors
    }
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie Consent Banner"
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[999] max-w-[370px] w-[calc(100vw-32px)] transition-all duration-500 ease-out ${
        isClosing
          ? 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          : 'opacity-100 translate-y-0 scale-100'
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-2xl border border-[rgba(23,104,214,0.18)] shadow-[0_16px_40px_rgba(10,23,47,0.1),0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0_#ffffff] p-4 md:p-5 text-[#0A172F]">
        {/* Subtle accent top border highlight */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-80" />

        <div className="flex items-start gap-3">
          {/* Cookie Icon */}
          <div className="shrink-0 w-8 h-8 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center border border-[var(--accent)]/20 mt-0.5 shadow-sm">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
              <path d="M8.5 8.5v.01" />
              <path d="M16 15.5v.01" />
              <path d="M12 12v.01" />
              <path d="M11 17v.01" />
              <path d="M7 13v.01" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="font-[var(--font-display)] font-bold text-[14px] leading-tight text-[#0A172F]">
                Cookie Preferences
              </h4>
              <button
                onClick={() => handleChoice('necessary')}
                aria-label="Close cookie consent"
                className="text-[#5B6478] hover:text-[#0A172F] p-1 rounded-md transition-colors hover:bg-slate-100"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <p className="text-[12px] leading-relaxed text-[#5B6478] mb-3">
              We use cookies to ensure optimal performance and comply with privacy regulations. Read our{' '}
              <Link
                href="/privacy-policy"
                className="text-[var(--accent)] underline underline-offset-2 hover:text-[#1253af] transition-colors font-medium"
              >
                Privacy Policy
              </Link>.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleChoice('all')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-[var(--accent)] hover:bg-[#1253af] active:scale-[0.98] text-white text-[12px] font-semibold transition-all shadow-[0_2px_8px_rgba(23,104,214,0.25)] text-center cursor-pointer"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={() => handleChoice('necessary')}
                className="py-1.5 px-3 rounded-lg bg-[#F0F4F9] hover:bg-[#E4EBF4] text-[#0A172F] text-[12px] font-medium transition-all text-center cursor-pointer border border-[rgba(10,23,47,0.08)]"
              >
                Essential Only
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
