import { notFound } from 'next/navigation';
import { getResourceConfig } from '@/lib/admin/resources';
import { resolveRelationFields } from '@/lib/admin/resolveRelations';
import { createAdminClient } from '@/lib/supabase/admin';
import ResourceForm from '@/components/admin/ResourceForm';

export default async function EditResourcePage({ params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource, id } = await params;
  const config = getResourceConfig(resource);
  if (!config || config.singleton) notFound();

  const supabase = createAdminClient();
  const { data } = await supabase.from(config.table).select('*').eq('id', id).maybeSingle();
  if (!data) notFound();

  const resolvedConfig = await resolveRelationFields(config);

  return (
    <div>
      <h1 className="text-[24px] font-[var(--font-display)] font-bold text-[var(--ink)] mb-[20px]">
        Edit {config.label.toLowerCase()}
      </h1>
      <ResourceForm config={resolvedConfig} initialData={data} id={id} />
    </div>
  );
}
