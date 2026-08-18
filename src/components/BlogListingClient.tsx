"use client";

import React, { useState, useMemo } from 'react';
import type { BlogPost } from '@/lib/types';
import BlogCard from '@/components/BlogCard';

interface BlogListingClientProps {
  initialPosts: BlogPost[];
  allTags: string[];
  initialTag?: string;
}

const POSTS_PER_PAGE = 6;

export default function BlogListingClient({
  initialPosts,
  allTags,
  initialTag,
}: BlogListingClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>(initialTag || 'All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesTag =
        selectedTag === 'All' || (post.tags && post.tags.includes(selectedTag));
      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTag && matchesSearch;
    });
  }, [initialPosts, selectedTag, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedPosts = useMemo(() => {
    const start = (safeCurrentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, safeCurrentPage]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* Sub-header Bar: Count, Search & Top Pagination */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-[18px] mb-[28px] pt-[20px] border-b border-[var(--line)] pb-[20px]">
        
        {/* Left: Article Count */}
        <div className="mono text-[14px] font-semibold text-[var(--ink)] flex items-center gap-[10px]">
          <span className="inline-block w-[8px] h-[8px] rounded-full bg-[var(--accent)]" />
          <span>
            {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
          </span>
        </div>

        {/* Center / Search Input */}
        <div className="relative max-w-[320px] w-full">
          <div className="absolute inset-y-0 left-0 pl-[12px] flex items-center pointer-events-none text-[var(--muted)]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search insights..."
            aria-label="Search insights and technical articles"
            className="w-full pl-[36px] pr-[14px] py-[8px] rounded-full text-[13.5px] bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
          />
        </div>

        {/* Right: Top Pagination Controls */}
        {totalPages > 1 && (
          <nav aria-label="Top pagination" className="flex items-center gap-[6px] self-end md:self-auto">
            <button
              onClick={() => handlePageChange(safeCurrentPage - 1)}
              disabled={safeCurrentPage <= 1}
              aria-label="Previous page"
              className="mono text-[13px] px-[10px] py-[6px] rounded-lg border border-[var(--line)] text-[var(--ink)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                aria-current={safeCurrentPage === pageNum ? 'page' : undefined}
                className={`mono text-[13px] w-[34px] h-[34px] rounded-lg flex items-center justify-center font-medium transition-all ${
                  safeCurrentPage === pageNum
                    ? 'bg-[#0A1324] text-white font-bold border border-[#0EBCD4] shadow-sm'
                    : 'border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(safeCurrentPage + 1)}
              disabled={safeCurrentPage >= totalPages}
              aria-label="Next page"
              className="mono text-[13px] px-[10px] py-[6px] rounded-lg border border-[var(--line)] text-[var(--ink)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              »
            </button>
          </nav>
        )}
      </div>

      {/* Category Filter Pills */}
      {allTags.length > 0 && (
        <nav aria-label="Filter posts by category" className="mb-[36px] flex flex-wrap gap-[8px]">
          <button
            onClick={() => handleTagClick('All')}
            className={`mono text-[12px] px-[14px] py-[7px] rounded-full border transition-all ${
              selectedTag === 'All'
                ? 'bg-[#0A1324] text-white border-[#0EBCD4] shadow-[0_4px_14px_rgba(10,23,47,0.15)] font-semibold'
                : 'bg-[var(--surface)] border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--accent)]'
            }`}
          >
            All Topics
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`mono text-[12px] px-[14px] py-[7px] rounded-full border transition-all ${
                selectedTag === tag
                  ? 'bg-[#0A1324] text-white border-[#0EBCD4] shadow-[0_4px_14px_rgba(10,23,47,0.15)] font-semibold'
                  : 'bg-[var(--surface)] border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--accent)]'
              }`}
            >
              {tag}
            </button>
          ))}
        </nav>
      )}

      {/* 3-Column Blog Cards Grid */}
      {paginatedPosts.length === 0 ? (
        <div className="py-[60px] text-center rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-[32px]">
          <p className="text-[16px] text-[var(--ink)] font-semibold mb-[6px]">
            No insights found.
          </p>
          <p className="text-[14px] text-[var(--muted)]">
            Try adjusting your search query or selected topic filter.
          </p>
          <button
            onClick={() => {
              setSelectedTag('All');
              setSearchQuery('');
            }}
            className="mt-[18px] mono text-[12.5px] px-[16px] py-[8px] rounded-full bg-[var(--accent)] text-white hover:bg-[var(--ink)] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[28px]">
          {paginatedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Bottom Pagination Controls */}
      {totalPages > 1 && (
        <nav
          aria-label="Bottom pagination"
          className="mt-[48px] pt-[24px] border-t border-[var(--line)] flex items-center justify-center gap-[8px]"
        >
          <button
            onClick={() => handlePageChange(safeCurrentPage - 1)}
            disabled={safeCurrentPage <= 1}
            aria-label="Previous page"
            className="mono text-[13px] px-[14px] py-[8px] rounded-xl border border-[var(--line)] text-[var(--ink)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            « Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              aria-current={safeCurrentPage === pageNum ? 'page' : undefined}
              className={`mono text-[13px] w-[38px] h-[38px] rounded-xl flex items-center justify-center font-medium transition-all ${
                safeCurrentPage === pageNum
                  ? 'bg-[#0A1324] text-white font-bold border border-[#0EBCD4] shadow-sm'
                  : 'border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
              }`}
            >
              {pageNum}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(safeCurrentPage + 1)}
            disabled={safeCurrentPage >= totalPages}
            aria-label="Next page"
            className="mono text-[13px] px-[14px] py-[8px] rounded-xl border border-[var(--line)] text-[var(--ink)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            Next »
          </button>
        </nav>
      )}
    </div>
  );
}
