"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RESOURCES } from '@/lib/admin/resources';
import { logout } from '@/app/admin/login/actions';

function Icon({ path }: { path: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d={path} />
    </svg>
  );
}

const ICONS = {
  dashboard: 'M3 12h4v9H3zM10 3h4v18h-4zM17 8h4v13h-4z',
  inbox: 'M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
  content: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
};

const LEAD_KEYS = ['contact-submissions', 'blog-comments'];

const CONTENT_RESOURCES = Object.values(RESOURCES).filter(
  (r) => !LEAD_KEYS.includes(r.key) && r.key !== 'site-settings'
);

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || (href !== '/admin' && pathname.startsWith(href));

  const linkClass = (active: boolean) =>
    `flex items-center gap-[9px] px-[20px] py-[8px] text-[13.5px] transition-colors ${
      active ? 'text-[var(--accent)] font-semibold bg-[rgba(23,104,214,0.06)]' : 'text-[var(--muted)] hover:text-[var(--ink)]'
    }`;

  return (
    <aside className="w-[220px] shrink-0 border-r border-[var(--line)] bg-[var(--surface)] flex flex-col h-screen sticky top-0">
      <div className="px-[20px] py-[20px] border-b border-[var(--line)]">
        <div className="font-[var(--font-display)] font-bold text-[var(--ink)] text-[15px]">Quantyro</div>
        <div className="text-[11px] mono text-[var(--muted)]">Admin panel</div>
      </div>

      <nav className="flex-1 overflow-y-auto py-[14px]">
        <Link href="/admin" className={linkClass(pathname === '/admin')}>
          <Icon path={ICONS.dashboard} />
          Dashboard
        </Link>

        <div className="mt-[16px] px-[20px] mb-[4px] text-[10px] font-mono font-semibold uppercase tracking-wide text-slate-400 flex items-center gap-[6px]">
          <Icon path={ICONS.inbox} />
          Leads
        </div>
        <Link href="/admin/submissions" className={linkClass(isActive('/admin/submissions'))}>
          Submissions
        </Link>
        <Link href="/admin/blog-comments" className={linkClass(isActive('/admin/blog-comments'))}>
          Blog comments
        </Link>

        <div className="mt-[16px] px-[20px] mb-[4px] text-[10px] font-mono font-semibold uppercase tracking-wide text-slate-400 flex items-center gap-[6px]">
          <Icon path={ICONS.content} />
          Content
        </div>
        {CONTENT_RESOURCES.map((r) => (
          <Link key={r.key} href={`/admin/${r.key}`} className={linkClass(isActive(`/admin/${r.key}`))}>
            {r.pluralLabel}
          </Link>
        ))}

        <div className="mt-[16px] px-[20px] mb-[4px] text-[10px] font-mono font-semibold uppercase tracking-wide text-slate-400 flex items-center gap-[6px]">
          <Icon path={ICONS.settings} />
          Settings
        </div>
        <Link href="/admin/site-settings" className={linkClass(isActive('/admin/site-settings'))}>
          Site settings
        </Link>
      </nav>

      <form action={logout} className="p-[16px] border-t border-[var(--line)]">
        <button type="submit" className="text-[12.5px] font-semibold text-[var(--muted)] hover:text-red-600 transition-colors">
          Sign out
        </button>
      </form>
    </aside>
  );
}
