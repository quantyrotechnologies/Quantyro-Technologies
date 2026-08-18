import { getResourceConfig } from '@/lib/admin/resources';
import { createAdminClient } from '@/lib/supabase/admin';
import ResourceTable from '@/components/admin/ResourceTable';

export default async function SubmissionsPage() {
  const config = getResourceConfig('contact-submissions')!;

  const supabase = createAdminClient();
  const { data: rows } = await supabase
    .from(config.table)
    .select('*')
    .order(config.orderBy, { ascending: config.orderDirection !== 'desc' });

  return (
    <div>
      <h1 className="text-[24px] font-[var(--font-display)] font-bold text-[var(--ink)] mb-[6px]">Submissions</h1>
      <p className="text-[13.5px] text-[var(--muted)] mb-[20px]">
        Leads from the contact form. Click Edit to mark as read/archived.
      </p>
      <ResourceTable config={config} rows={rows ?? []} />
    </div>
  );
}
