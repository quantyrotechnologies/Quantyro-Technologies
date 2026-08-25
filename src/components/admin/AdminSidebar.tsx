"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/admin/login/actions';

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

interface NavGroup {
  title: string;
  icon: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Homepage & Core',
    icon: '🏠',
    items: [
      { label: 'Site & Brand Settings', href: '/admin/site-settings' },
      { label: 'Interactive Device Showcase', href: '/admin/showcase-items' },
      { label: 'Delivery Roadmap (4 Steps)', href: '/admin/roadmap-steps' },
      { label: 'Operating Values & Principles', href: '/admin/values' },
      { label: 'Key Delivery Stats', href: '/admin/stats' },
      { label: 'Ticker Metrics', href: '/admin/ticker-metrics' },
      { label: 'Social Media Links', href: '/admin/social-links' },
    ],
  },
  {
    title: 'Services & Tech',
    icon: '💼',
    items: [
      { label: 'All Services (Main Cards)', href: '/admin/services' },
      { label: 'Tech Stack Deep-Dives', href: '/admin/tech-stack-pages' },
      { label: 'Industry Applications', href: '/admin/industry-applications' },
    ],
  },
  {
    title: 'Industries & Verticals',
    icon: '🏢',
    items: [
      { label: 'All Industries (Main Cards)', href: '/admin/industries' },
      { label: 'Industry Solution Deep-Dives', href: '/admin/industry-solution-pages' },
      { label: 'City Location Pages', href: '/admin/location-pages' },
      { label: 'Regional Service Pages', href: '/admin/service-region-pages' },
    ],
  },
  {
    title: 'Portfolio & Work',
    icon: '🚀',
    items: [
      { label: 'Case Studies / Projects', href: '/admin/projects' },
    ],
  },
  {
    title: 'Team & Credibility',
    icon: '👥',
    items: [
      { label: 'Team Members & Engineers', href: '/admin/team' },
      { label: 'Client Testimonials / Reviews', href: '/admin/testimonials' },
      { label: 'Verified Certifications', href: '/admin/certifications' },
      { label: 'Global Offices', href: '/admin/offices' },
    ],
  },
  {
    title: 'Blog & Insights',
    icon: '✍️',
    items: [
      { label: 'Articles & Blog Posts', href: '/admin/blog-posts' },
      { label: 'Blog Comments Moderation', href: '/admin/blog-comments' },
    ],
  },
  {
    title: 'Help & FAQs',
    icon: '❓',
    items: [
      { label: 'All FAQs (Page-wise)', href: '/admin/faqs' },
    ],
  },
  {
    title: 'Inquiries & Leads',
    icon: '📬',
    items: [
      { label: 'Contact Submissions', href: '/admin/submissions' },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="w-[260px] shrink-0 border-r border-[var(--line)] bg-white flex flex-col h-screen sticky top-0 shadow-[2px_0_12px_rgba(10,23,47,0.02)]">
      {/* Brand Header */}
      <div className="px-[20px] py-[18px] border-b border-[var(--line)] flex items-center justify-between bg-slate-50/50">
        <div>
          <Link href="/admin" className="flex items-center gap-[8px]">
            <div className="w-[28px] h-[28px] rounded-[8px] bg-[var(--ink)] text-white flex items-center justify-center font-bold text-[13px]">
              Q
            </div>
            <div>
              <div className="font-[var(--font-display)] font-bold text-[var(--ink)] text-[14px] leading-tight">
                Quantyro
              </div>
              <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">
                Visual Studio CMS
              </div>
            </div>
          </Link>
        </div>
        <Link
          href="/"
          target="_blank"
          title="Open live website in new tab"
          className="text-[11px] font-mono text-[var(--accent)] hover:underline flex items-center gap-[3px]"
        >
          <span>Live</span>
          <span>↗</span>
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-[12px] py-[14px] space-y-[18px]">
        <Link
          href="/admin"
          className={`flex items-center gap-[10px] px-[12px] py-[8px] rounded-[10px] text-[13px] font-semibold transition-all ${
            pathname === '/admin'
              ? 'bg-[var(--ink)] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100/80 hover:text-[var(--ink)]'
          }`}
        >
          <span className="text-[14px]">📊</span>
          <span>Dashboard Overview</span>
        </Link>

        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="space-y-[4px]">
            <div className="px-[12px] pt-[6px] pb-[4px] text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-[6px]">
              <span className="text-[12px]">{group.icon}</span>
              <span>{group.title}</span>
            </div>
            <div className="space-y-[2px]">
              {group.items.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-[12px] py-[6.5px] rounded-[8px] text-[12.5px] transition-all ${
                      active
                        ? 'bg-[rgba(23,104,214,0.09)] text-[var(--accent)] font-semibold border-l-2 border-[var(--accent)]'
                        : 'text-slate-600 hover:text-[var(--ink)] hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="mono text-[9.5px] px-[6px] py-[1.5px] rounded-full bg-emerald-100 text-emerald-700 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer / Sign out */}
      <div className="p-[14px] border-t border-[var(--line)] bg-slate-50/50 flex items-center justify-between">
        <div className="text-[11px] text-slate-500 truncate max-w-[150px]">
          admin@quantyro.com
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="text-[11.5px] font-semibold text-red-600 hover:text-red-800 hover:underline transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
