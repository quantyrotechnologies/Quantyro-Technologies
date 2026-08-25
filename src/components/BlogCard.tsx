import React from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import { stripHtml } from '@/lib/stripHtml';

interface BlogCardProps {
  post: BlogPost;
  compact?: boolean;
}

export default function BlogCard({ post, compact = false }: BlogCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }).toUpperCase()
    : 'LATEST';

  return (
    <Link
      href={`/blog/${post.slug}`}
      title={post.title}
      className={`group relative flex flex-col justify-between rounded-[22px] bg-[#0A1324] border border-white/[0.09] p-[28px] md:p-[32px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgba(23,104,214,0.5)] hover:shadow-[0_20px_45px_rgba(10,23,47,0.35)] ${
        compact ? 'min-h-[220px] p-[22px] md:p-[24px]' : 'min-h-[300px]'
      }`}
    >
      {/* Subtle radial ambient glow on hover */}
      <div
        className="pointer-events-none absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-[var(--accent)]/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Date header */}
        <div className="mono text-[12px] font-semibold tracking-wider text-[#0EBCD4] uppercase mb-[14px]">
          {formattedDate}
        </div>

        {/* Title */}
        <h3
          className={`font-[var(--font-display)] font-bold text-white leading-[1.25] tracking-tight group-hover:text-[#60A5FA] transition-colors ${
            compact ? 'text-[18px] md:text-[20px] line-clamp-2' : 'text-[21px] md:text-[23px] line-clamp-3'
          }`}
        >
          {post.title}
        </h3>

        {/* Excerpt if not compact */}
        {!compact && post.excerpt && (
          <p className="mt-[14px] text-[14.5px] leading-[1.65] text-slate-300/80 line-clamp-3">
            {stripHtml(post.excerpt)}
          </p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-[16px] flex flex-wrap gap-[6px]">
            {post.tags.slice(0, compact ? 2 : 3).map((tag) => (
              <span
                key={tag}
                className="mono text-[10.5px] px-[9px] py-[3px] rounded-full bg-white/[0.06] border border-white/[0.1] text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Row */}
      <div className="relative z-10 mt-[24px] pt-[12px] flex items-center justify-between">
        <span className="mono text-[12px] text-slate-400 group-hover:text-slate-200 transition-colors">
          {post.authorName || 'Quantyro Engineering'}
        </span>

        {/* Circular Action Arrow button */}
        <div
          className="w-[38px] h-[38px] rounded-full border border-white/25 bg-white/[0.04] flex items-center justify-center text-white transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white group-hover:translate-x-1 group-hover:shadow-[0_0_16px_rgba(23,104,214,0.5)]"
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
