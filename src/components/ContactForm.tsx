"use client";
import React, { useState } from 'react';
import { trackEvent } from '@/lib/gtag';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const company = (form.elements.namedItem('company') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const data = {
      name,
      email,
      phone,
      company: company || undefined,
      message: message || undefined,
      source: 'Contact Page (Direct Inquiry)',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      trackEvent('generate_lead', { source: 'Contact Page' });
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-[26px] border border-[rgba(23,104,214,0.3)] bg-[var(--surface)] p-[36px] md:p-[48px] text-center shadow-[0_20px_60px_rgba(23,104,214,0.12)]">
        <div className="w-[56px] h-[56px] rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-[18px] border border-emerald-200">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-[24px] font-[var(--font-display)] font-bold text-[var(--ink)]">Inquiry Received.</h3>
        <p className="mt-[10px] text-[var(--muted)] text-[15.5px] max-w-[420px] mx-auto leading-[1.6]">
          A senior software architect will review your details and connect with you within one business day.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-[24px] inline-flex items-center gap-[6px] px-[20px] py-[9px] rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-[13px] font-semibold transition-colors"
        >
          Send another inquiry →
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[26px] bg-white border border-[rgba(10,23,47,0.14)] p-[28px] md:p-[36px] shadow-[0_20px_60px_rgba(10,23,47,0.06)]">
      <div className="mb-[20px]">
        <span className="mono text-[11px] font-bold text-[var(--accent)] uppercase tracking-wider">
          Direct Engineering Inquiry
        </span>
        <h2 className="text-[22px] md:text-[24px] font-[var(--font-display)] font-bold text-[var(--ink)] mt-[4px]">
          Start your project conversation
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-[16px]">
        {/* Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
          <div>
            <label htmlFor="name" className="block text-[11.5px] mono font-semibold text-[var(--muted)] mb-[6px] uppercase">
              Your Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Alex Rivera"
              required
              className="w-full rounded-[14px] border border-slate-200 bg-slate-50/50 px-[16px] py-[12px] text-[14.5px] text-[var(--ink)] outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-[11.5px] mono font-semibold text-[var(--muted)] mb-[6px] uppercase">
              Work Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="alex@company.com"
              required
              className="w-full rounded-[14px] border border-slate-200 bg-slate-50/50 px-[16px] py-[12px] text-[14.5px] text-[var(--ink)] outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Phone (Mandatory) & Company (Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
          <div>
            <label htmlFor="phone" className="block text-[11.5px] mono font-semibold text-[var(--muted)] mb-[6px] uppercase">
              Phone Number / WhatsApp *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              required
              className="w-full rounded-[14px] border border-slate-200 bg-slate-50/50 px-[16px] py-[12px] text-[14.5px] text-[var(--ink)] outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-[11.5px] mono font-semibold text-[var(--muted)] mb-[6px] uppercase">
              Company Name (Optional)
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="e.g. Acme Corp"
              className="w-full rounded-[14px] border border-slate-200 bg-slate-50/50 px-[16px] py-[12px] text-[14.5px] text-[var(--ink)] outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Message (Optional) */}
        <div>
          <label htmlFor="message" className="block text-[11.5px] mono font-semibold text-[var(--muted)] mb-[6px] uppercase">
            Project Scope / Requirements (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Tell us what you are building, key goals, or any specific timeline..."
            className="w-full rounded-[14px] border border-slate-200 bg-slate-50/50 px-[16px] py-[12px] text-[14.5px] text-[var(--ink)] outline-none focus:border-[var(--accent)] focus:bg-white transition-all resize-none"
          />
        </div>

        {status === 'error' && (
          <div className="p-[12px] rounded-[12px] bg-rose-50 border border-rose-200 text-rose-700 text-[13.5px]">
            {errorMsg}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-[var(--ink)] hover:bg-[var(--accent)] text-white py-[15px] px-[28px] rounded-full text-[15px] font-bold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-[8px]"
        >
          {status === 'submitting' ? (
            <>
              <span className="w-[16px] h-[16px] rounded-full border-2 border-white/30 border-t-white animate-spin" />
              <span>Submitting Inquiry…</span>
            </>
          ) : (
            <>
              <span>Submit Inquiry</span>
              <span className="font-mono">→</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
