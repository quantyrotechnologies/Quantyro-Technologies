import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { AdminToastProvider } from '@/components/admin/Toast';

// Crawlable (robots.txt allows it — including AI bots) but never indexed:
// low-value, session-gated pages have no business showing up in search
// results, and everything under here redirects to the noindexed login
// page anyway if there's no session.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Defense in depth — middleware already gates /admin/*, this is the
  // Server Component-side check per the approved plan.
  if (!user) redirect('/admin/login');

  return (
    <AdminToastProvider>
      <div className="flex min-h-screen bg-[var(--bg)]">
        <AdminSidebar />
        <main className="flex-1 px-[40px] py-[36px] max-w-[1100px]">{children}</main>
      </div>
    </AdminToastProvider>
  );
}
