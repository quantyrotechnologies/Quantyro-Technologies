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
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLInputElement).value,
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
      <div className="rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[24px] text-center">
        <div className="text-[15px] font-bold text-[var(--ink)]">Thanks — we&apos;ll be in touch shortly.</div>
        <p className="mt-[6px] text-[13px] text-[var(--muted)]">We reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[22px] max-w-[420px]">
      <h3 className="text-[15px] font-bold text-[var(--ink)] mb-[4px]">{heading}</h3>
      <p className="text-[12.5px] text-[var(--muted)] mb-[16px]">Leave your details, no obligation.</p>

      <div className="space-y-[10px]">
        <input
          name="name" type="text" required placeholder="Your name"
          className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[14px] py-[10px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors"
        />
        <input
          name="email" type="email" required placeholder="Work email"
          className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[14px] py-[10px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors"
        />
        <input
          name="message" type="text" placeholder="What do you need? (optional)"
          className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[14px] py-[10px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>

      {status === 'error' && (
        <p className="mt-[10px] text-[12.5px] text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-[14px] w-full bg-[var(--ink)] text-[var(--bg)] py-[12px] px-[20px] rounded-full text-[13.5px] font-semibold hover:bg-[var(--accent)] transition-colors disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Request a callback'}
      </button>
    </form>
  );
}
