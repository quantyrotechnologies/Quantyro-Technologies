"use client";
import React, { useState } from 'react';
import { trackEvent } from '@/lib/gtag';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/** Compact lead-capture form for service/industry/city/deep-dive pages — name + email only, no friction. */
export default function InlineInquiryForm({
  source,
  heading = 'Get a quote',
}: {
  /** Which page this form lives on, e.g. "Service: Website Development — Delhi". Stored with the submission. */
  source: string;
  heading?: string;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLInputElement)?.value || '',
      source,
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
      trackEvent('generate_lead', { source, form_type: 'inline_inquiry' });
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[24px] text-center shadow-sm">
        <div className="w-[40px] h-[40px] rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-[12px]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="text-[15px] font-bold text-[var(--ink)]">Quotation Request Received!</div>
        <p className="mt-[6px] text-[13px] text-[var(--muted)] leading-[1.5]">
          Our engineering team will review your requirements and send a tailored quotation within <span className="font-bold text-[var(--accent)]">30 minutes</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[18px] border border-[rgba(10,23,47,0.14)] bg-[var(--surface)] p-[22px] max-w-[420px] shadow-[0_4px_24px_rgba(10,23,47,0.04)]">
      <h3 className="text-[15.5px] font-bold text-[var(--ink)] mb-[4px]">{heading}</h3>
      <p className="text-[12.5px] text-[var(--muted)] mb-[16px] leading-[1.5]">
        Share your project details — our team will send you a tailored quotation within <span className="font-bold text-[var(--accent)]">30 minutes</span>.
      </p>

      <div className="space-y-[10px]">
        <input
          name="name"
          type="text"
          required
          placeholder="Your full name *"
          className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[14px] py-[10px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors shadow-2xs"
        />
        <input
          name="phone"
          type="tel"
          required
          placeholder="Phone / WhatsApp number *"
          className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[14px] py-[10px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors shadow-2xs"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Work email address *"
          className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[14px] py-[10px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors shadow-2xs"
        />
        <input
          name="message"
          type="text"
          placeholder="Project scope / requirements (optional)"
          className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[14px] py-[10px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors shadow-2xs"
        />
      </div>

      {status === 'error' && (
        <p className="mt-[10px] text-[12.5px] text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-[14px] w-full bg-[var(--ink)] text-[var(--bg)] py-[12px] px-[20px] rounded-full text-[13.5px] font-semibold hover:bg-[var(--accent)] transition-all duration-300 disabled:opacity-60 shadow-md hover:shadow-lg flex items-center justify-center gap-[6px]"
      >
        <span>{status === 'submitting' ? 'Sending request…' : 'Get Quotation in 30 Min →'}</span>
      </button>
    </form>
  );
}
