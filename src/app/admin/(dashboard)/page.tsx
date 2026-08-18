import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';

export default async function AdminDashboardPage() {
  const supabase = createAdminClient();

  const [services, projects, testimonials, submissions] = await Promise.all([
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('status', 'new'),
  ]);

  const servicesCount = services.count ?? 0;
  const projectsCount = projects.count ?? 0;
  const testimonialsCount = testimonials.count ?? 0;
  const newSubmissions = submissions.count ?? 0;

  const stats = [
    { label: 'New submissions', value: newSubmissions, href: '/admin/submissions', accent: true },
    { label: 'Services', value: servicesCount, href: '/admin/services' },
    { label: 'Projects', value: projectsCount, href: '/admin/projects' },
    { label: 'Testimonials', value: testimonialsCount, href: '/admin/testimonials' },
  ];

  const quickLinks = [
    { label: '+ New service', href: '/admin/services/new' },
    { label: '+ New project', href: '/admin/projects/new' },
    { label: '+ New testimonial', href: '/admin/testimonials/new' },
    { label: '+ New FAQ', href: '/admin/faqs/new' },
  ];

  return (
    <div>
      <h1 className="text-[24px] font-[var(--font-display)] font-bold text-[var(--ink)]">Dashboard</h1>
      <p className="mt-[6px] text-[14px] text-[var(--muted)]">Manage every piece of content on the site from here.</p>

      <div className="mt-[28px] grid grid-cols-2 sm:grid-cols-4 gap-[14px]">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`rounded-[16px] border p-[18px] transition-colors ${
              s.accent
                ? 'border-[rgba(23,104,214,0.3)] bg-[rgba(23,104,214,0.04)] hover:border-[rgba(23,104,214,0.5)]'
                : 'border-[var(--line)] bg-[var(--surface)] hover:border-[rgba(23,104,214,0.3)]'
            }`}
          >
            <div className={`text-[26px] font-[var(--font-display)] font-bold ${s.accent ? 'text-[var(--accent)]' : 'text-[var(--ink)]'}`}>
              {s.value}
            </div>
            <div className="mt-[3px] text-[12.5px] text-[var(--muted)]">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-[32px]">
        <div className="text-[11px] font-mono font-semibold uppercase tracking-wide text-slate-400 mb-[10px]">Quick actions</div>
        <div className="flex flex-wrap gap-[10px]">
          {quickLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[12.5px] font-semibold text-[var(--accent)] border border-[rgba(23,104,214,0.25)] rounded-full px-[14px] py-[7px] hover:bg-[rgba(23,104,214,0.06)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-[32px] rounded-[16px] border border-dashed border-[var(--line)] p-[20px] text-[13.5px] text-[var(--muted)]">
        Real-time analytics widget will appear here once GA4 credentials are connected (Phase 8).
      </div>
    </div>
  );
}
