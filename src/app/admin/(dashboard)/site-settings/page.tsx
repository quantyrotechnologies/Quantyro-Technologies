import { getResourceConfig } from '@/lib/admin/resources';
import { createAdminClient } from '@/lib/supabase/admin';
import ResourceForm from '@/components/admin/ResourceForm';

export default async function SiteSettingsPage() {
  const config = getResourceConfig('site-settings')!;

  const supabase = createAdminClient();
  const { data } = await supabase.from(config.table).select('*').eq('id', 1).maybeSingle();

  return (
    <div>
      <h1 className="text-[24px] font-[var(--font-display)] font-bold text-[var(--ink)] mb-[6px]">Site settings</h1>
      <p className="text-[13.5px] text-[var(--muted)] mb-[20px]">
        Organization info shown in the footer, contact page, and search-engine structured data.
      </p>
      <ResourceForm config={config} initialData={data ?? undefined} id="1" />
    </div>
  );
}
