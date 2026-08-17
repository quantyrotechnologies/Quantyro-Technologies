"use client";
import React, { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
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
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
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
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[36px] text-center">
        <div className="text-[20px] font-[var(--font-display)] font-bold text-[var(--ink)]">Message sent.</div>
        <p className="mt-[10px] text-[var(--muted)] text-[15px]">We reply within one business day, every time.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-[18px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
        <div>
          <label htmlFor="name" className="block text-[12px] mono text-[var(--muted)] mb-[8px]">Name *</label>
          <input
            id="name" name="name" type="text" required
            className="w-full rounded-[12px] border border-[var(--line)] bg-[var(--surface)] px-[16px] py-[13px] text-[15px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[12px] mono text-[var(--muted)] mb-[8px]">Email *</label>
          <input
            id="email" name="email" type="email" required
            className="w-full rounded-[12px] border border-[var(--line)] bg-[var(--surface)] px-[16px] py-[13px] text-[15px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="block text-[12px] mono text-[var(--muted)] mb-[8px]">Company</label>
        <input
          id="company" name="company" type="text"
          className="w-full rounded-[12px] border border-[var(--line)] bg-[var(--surface)] px-[16px] py-[13px] text-[15px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-[12px] mono text-[var(--muted)] mb-[8px]">Message *</label>
        <textarea
          id="message" name="message" rows={5} required
          className="w-full rounded-[12px] border border-[var(--line)] bg-[var(--surface)] px-[16px] py-[13px] text-[15px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-[14px] text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-[var(--ink)] text-[var(--bg)] py-[15px] px-[26px] rounded-full text-[14px] font-semibold hover:bg-[var(--muted)] transition-colors disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
