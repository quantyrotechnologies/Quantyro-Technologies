import React from 'react';
import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function AdminDashboardPage() {
  const supabase = createAdminClient();

  const [
    services,
    projects,
    team,
    testimonials,
    blogPosts,
    faqs,
    submissions,
  ] = await Promise.all([
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('team_members').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('faqs').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('status', 'new'),
  ]);

  const newSubmissionsCount = submissions.count ?? 0;
  const servicesCount = services.count ?? 0;
  const projectsCount = projects.count ?? 0;
  const teamCount = team.count ?? 0;
  const testimonialsCount = testimonials.count ?? 0;
  const blogCount = blogPosts.count ?? 0;
  const faqsCount = faqs.count ?? 0;

  const websiteSections = [
    {
      title: 'Site & Brand Settings',
      description: 'Header logo, tagline (H2), hero intro, SLA response, privacy & terms',
      icon: '⚙️',
      href: '/admin/site-settings',
      tag: 'Global Brand',
      count: '1 Active',
    },
    {
      title: 'Homepage Device Showcase',
      description: 'Interactive Laptop & Mobile mockup slides on the homepage',
      icon: '💻',
      href: '/admin/showcase-items',
      tag: 'Homepage',
      count: 'Interactive',
    },
    {
      title: 'Services & Tech Stack',
      description: 'Website development, AI/ML, cloud, mobile apps & deep-dive pages',
      icon: '💼',
      href: '/admin/services',
      tag: 'Services',
      count: `${servicesCount} Services`,
    },
    {
      title: 'Case Studies / Projects',
      description: 'Client success stories, outcomes, screenshots, and live website links',
      icon: '🚀',
      href: '/admin/projects',
      tag: 'Work',
      count: `${projectsCount} Projects`,
    },
    {
      title: 'Senior Engineering Team',
      description: 'Founder, architects, engineers, skill tags, bios, and profile photos',
      icon: '👥',
      href: '/admin/team',
      tag: 'Team',
      count: `${teamCount} Members`,
    },
    {
      title: 'Client Testimonials & Reviews',
      description: 'Client quotes, ratings, avatars, and company credentials',
      icon: '⭐',
      href: '/admin/testimonials',
      tag: 'Social Proof',
      count: `${testimonialsCount} Reviews`,
    },
    {
      title: 'Engineering Blog & Articles',
      description: 'Technical insights, rich text articles, drafts, and comment reviews',
      icon: '✍️',
      href: '/admin/blog-posts',
      tag: 'Blog',
      count: `${blogCount} Posts`,
    },
    {
      title: 'Frequently Asked Questions',
      description: 'Page-wise expandable FAQ accordions across the website',
      icon: '❓',
      href: '/admin/faqs',
      tag: 'FAQs',
      count: `${faqsCount} FAQs`,
    },
    {
      title: 'Delivery Roadmap & Values',
      description: '4-phase delivery framework, operating principles, and key stats',
      icon: '📐',
      href: '/admin/roadmap-steps',
      tag: 'About / Process',
      count: '4 Steps',
    },
  ];

  return (
    <div className="space-y-[32px]">
      {/* Header Banner */}
      <div className="rounded-[24px] bg-gradient-to-r from-[#0A1324] via-[#0F1D38] to-[#0A1324] p-[32px] md:p-[40px] text-white border border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_top_right,rgba(23,104,214,0.35),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-[700px]">
          <div className="inline-flex items-center gap-[6px] px-[12px] py-[3.5px] rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[11.5px] font-mono font-semibold uppercase mb-[14px]">
            <span className="w-[6px] h-[6px] rounded-full bg-cyan-400 animate-pulse" />
            <span>Quantyro Visual CMS Studio</span>
          </div>

          <h1 className="text-[clamp(26px,3.5vw,38px)] font-[var(--font-display)] font-extrabold text-white leading-[1.15] tracking-tight">
            Control every word, headline, and image on your website.
          </h1>

          <p className="mt-[10px] text-[14.5px] text-slate-300 leading-[1.6]">
            Every card below maps directly to a section of your live website. Click any section to edit titles (H1), subtitles (H2), paragraphs (P), images, and badges with real-time live previews.
          </p>
        </div>

        {/* Top Quick Status Pill */}
        {newSubmissionsCount > 0 && (
          <div className="mt-[24px] pt-[20px] border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-[8px] text-[13px] text-emerald-400 font-semibold">
              <span className="w-[8px] h-[8px] rounded-full bg-emerald-400 animate-ping" />
              <span>You have {newSubmissionsCount} new client contact inquiry waiting!</span>
            </div>
            <Link
              href="/admin/submissions"
              className="mono text-[12px] font-bold px-[14px] py-[6px] rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
            >
              View Inquiries →
            </Link>
          </div>
        )}
      </div>

      {/* Website Sections Visual Grid */}
      <div>
        <div className="flex items-center justify-between mb-[16px]">
          <div>
            <h2 className="text-[18px] font-[var(--font-display)] font-bold text-[var(--ink)]">
              Website Page Editors
            </h2>
            <p className="text-[12.5px] text-[var(--muted)]">
              Select what part of the live website you want to update:
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="text-[12.5px] font-semibold text-[var(--accent)] hover:underline flex items-center gap-[4px]"
          >
            <span>View Live Website</span>
            <span>↗</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {websiteSections.map((sec) => (
            <Link
              key={sec.title}
              href={sec.href}
              className="group rounded-[20px] border border-[var(--line)] bg-white p-[24px] shadow-xs hover:border-[var(--accent)] hover:shadow-[0_12px_32px_rgba(23,104,214,0.09)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-[12px]">
                  <span className="text-[26px]">{sec.icon}</span>
                  <span className="mono text-[10.5px] font-bold px-[8px] py-[2.5px] rounded-full bg-slate-100 text-slate-600 group-hover:bg-[rgba(23,104,214,0.09)] group-hover:text-[var(--accent)] transition-colors">
                    {sec.count}
                  </span>
                </div>

                <h3 className="text-[16.5px] font-[var(--font-display)] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                  {sec.title}
                </h3>

                <p className="mt-[6px] text-[13px] text-[var(--muted)] leading-[1.55]">
                  {sec.description}
                </p>
              </div>

              <div className="mt-[20px] pt-[14px] border-t border-[var(--line)] flex items-center justify-between text-[12.5px] font-semibold text-[var(--accent)]">
                <span>Edit Content</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
