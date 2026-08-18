"use client";
import React, { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function BlogCommentForm({ postId }: { postId: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      postId,
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      comment: (form.elements.namedItem('comment') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/blog-comments', {
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
      <div className="rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[24px] text-center">
        <div className="text-[15px] font-semibold text-[var(--ink)]">Comment submitted.</div>
        <p className="mt-[6px] text-[13.5px] text-[var(--muted)]">It&apos;ll appear here once reviewed.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-[14px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
        <div>
          <label htmlFor="name" className="block text-[12px] mono text-[var(--muted)] mb-[6px]">Name *</label>
          <input
            id="name" name="name" type="text" required
            className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[14px] py-[10px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[12px] mono text-[var(--muted)] mb-[6px]">Email *</label>
          <input
            id="email" name="email" type="email" required
            className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[14px] py-[10px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-[12px] mono text-[var(--muted)] mb-[6px]">Comment *</label>
        <textarea
          id="comment" name="comment" rows={4} required
          className="w-full rounded-[10px] border border-[var(--line)] bg-white px-[14px] py-[10px] text-[14px] text-[var(--ink)] outline-none focus:border-[var(--accent)] transition-colors resize-none"
        />
      </div>

      {status === 'error' && <p className="text-[13px] text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-[var(--ink)] text-white py-[11px] px-[22px] rounded-full text-[13.5px] font-semibold hover:bg-[var(--accent)] transition-colors disabled:opacity-60"
      >
        {status === 'submitting' ? 'Posting…' : 'Post comment'}
      </button>
    </form>
  );
}
