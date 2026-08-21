import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getResourceConfig } from '@/lib/admin/resources';
import { createAdminClient } from '@/lib/supabase/admin';
import ResourceTable from '@/components/admin/ResourceTable';

export default async function ResourceListPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const config = getResourceConfig(resource);
  if (!config || config.singleton) notFound();

  const supabase = createAdminClient();
  const { data: rows } = await supabase
    .from(config.table)
    .select('*')
    .order(config.orderBy, { ascending: config.orderDirection !== 'desc' });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-[var(--font-display)] font-bold text-[var(--ink)]">{config.pluralLabel}</h1>
        <div className="flex items-center gap-[10px]">
          {config.key === 'location-pages' && (
            <Link
              href="/admin/location-pages/bulk"
              className="border border-[var(--line)] text-[var(--ink)] py-[9px] px-[18px] rounded-full text-[13px] font-semibold hover:border-[rgba(23,104,214,0.4)] transition-colors"
            >
              Bulk create
            </Link>
          )}
          {config.allowCreate !== false && (
            <Link
              href={`/admin/${config.key}/new`}
              className="bg-[var(--ink)] text-white py-[9px] px-[18px] rounded-full text-[13px] font-semibold hover:bg-[var(--accent)] transition-colors"
            >
              + New {config.label.toLowerCase()}
            </Link>
          )}
        </div>
      </div>

      <div className="mt-[20px]">
        <ResourceTable config={config} rows={rows ?? []} />
      </div>
    </div>
  );
}
