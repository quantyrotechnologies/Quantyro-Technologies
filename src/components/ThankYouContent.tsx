"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { sendGTMEvent } from '@next/third-parties/google';

export default function ThankYouContent() {
  useEffect(() => {
    // Official Lead Conversion Event Push for GTM, Google Ads & GA4
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      const conversionPayload = {
        event: 'conversion',
        conversion_type: 'lead_form_submitted',
        timestamp: new Date().toISOString(),
      };
      window.dataLayer.push(conversionPayload);

      try {
        sendGTMEvent(conversionPayload);
      } catch (err) {
        console.error('[GTM Conversion Error]:', err);
      }
    }
  }, []);

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center items-center px-[5vw] pt-[130px] pb-[80px] overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(23,104,214,0.08)_0%,rgba(247,251,254,0.3)_60%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="w-full max-w-[820px] mx-auto text-center">
        
        {/* Animated Success Badge */}
        <div className="inline-flex items-center justify-center w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-200/80 shadow-[0_12px_36px_rgba(16,185,129,0.18)] mb-[24px] animate-in zoom-in duration-300">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px]"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        {/* Status Eyebrow */}
        <div className="inline-flex items-center gap-[8px] mono text-[12px] sm:text-[12.5px] font-semibold text-emerald-700 bg-emerald-50 px-[14px] py-[5px] rounded-full border border-emerald-200 mb-[20px]">
          <span className="w-[6px] h-[6px] rounded-full bg-emerald-500 animate-ping" />
          <span>Inquiry Received & Logged</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="text-[clamp(32px,5vw,54px)] leading-[1.12] font-[var(--font-display)] font-extrabold tracking-tight text-[var(--ink)] mb-[18px]">
          Thank You! We’ve Received Your Project Requirements.
        </h1>

        <p className="text-[16px] sm:text-[18px] text-[var(--muted)] leading-[1.65] max-w-[660px] mx-auto mb-[36px]">
          Our senior software architects and technical leads are reviewing your project scope. You will receive a detailed engineering roadmap and quotation within <strong className="text-[var(--ink)]">24 hours</strong>.
        </p>

        {/* What Happens Next - 3 Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px] mb-[40px] text-left">
          
          <div className="p-[20px] rounded-[20px] bg-white border border-[rgba(10,23,47,0.1)] shadow-[0_4px_20px_rgba(10,23,47,0.04)]">
            <div className="mono text-[11px] font-bold text-[var(--accent)] mb-[8px] uppercase tracking-wider">
              Step 01
            </div>
            <h3 className="text-[15px] font-bold text-[var(--ink)] mb-[6px]">
              Technical Review
            </h3>
            <p className="text-[13px] text-[var(--muted)] leading-[1.5]">
              We evaluate your architecture, tech stack compatibility, and delivery timelines.
            </p>
          </div>

          <div className="p-[20px] rounded-[20px] bg-white border border-[rgba(10,23,47,0.1)] shadow-[0_4px_20px_rgba(10,23,47,0.04)]">
            <div className="mono text-[11px] font-bold text-[var(--accent)] mb-[8px] uppercase tracking-wider">
              Step 02
            </div>
            <h3 className="text-[15px] font-bold text-[var(--ink)] mb-[6px]">
              Discovery Session
            </h3>
            <p className="text-[13px] text-[var(--muted)] leading-[1.5]">
              A concise 15-minute call with our lead architect to clarify specs and SLAs.
            </p>
          </div>

          <div className="p-[20px] rounded-[20px] bg-white border border-[rgba(10,23,47,0.1)] shadow-[0_4px_20px_rgba(10,23,47,0.04)]">
            <div className="mono text-[11px] font-bold text-[var(--accent)] mb-[8px] uppercase tracking-wider">
              Step 03
            </div>
            <h3 className="text-[15px] font-bold text-[var(--ink)] mb-[6px]">
              Fixed Bid Proposal
            </h3>
            <p className="text-[13px] text-[var(--muted)] leading-[1.5]">
              Detailed sprint milestones, transparent pricing, and 100% IP assignment terms.
            </p>
          </div>

        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-[12px] sm:gap-[16px]">
          <Link
            href="/"
            className="inline-flex items-center gap-[8px] px-[24px] py-[13px] rounded-full bg-[#0A1324] text-white text-[14px] font-bold hover:bg-[var(--accent)] shadow-md hover:shadow-lg transition-all"
          >
            <span>Return to Homepage</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/work"
            className="inline-flex items-center gap-[8px] px-[22px] py-[12.5px] rounded-full bg-white text-[var(--ink)] text-[14px] font-bold border border-[rgba(10,23,47,0.16)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 shadow-xs transition-all"
          >
            <span>Explore Case Studies</span>
          </Link>
        </div>

        {/* Immediate Assistance Notice */}
        <p className="mt-[32px] text-[13px] text-[var(--muted)]">
          Need an urgent response? Email us directly at{' '}
          <a href="mailto:contact@quantyrotechnologies.com" className="font-semibold text-[var(--ink)] hover:text-[var(--accent)] underline transition-colors">
            contact@quantyrotechnologies.com
          </a>
        </p>

      </div>
    </div>
  );
}
