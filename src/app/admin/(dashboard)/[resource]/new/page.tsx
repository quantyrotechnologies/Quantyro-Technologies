import { notFound } from 'next/navigation';
import { getResourceConfig } from '@/lib/admin/resources';
import { resolveRelationFields } from '@/lib/admin/resolveRelations';
import ResourceForm from '@/components/admin/ResourceForm';

export default async function NewResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const config = getResourceConfig(resource);
  if (!config || config.singleton || config.allowCreate === false) notFound();

  const resolvedConfig = await resolveRelationFields(config);

  return (
    <div>
      <h1 className="text-[24px] font-[var(--font-display)] font-bold text-[var(--ink)] mb-[20px]">
        New {config.label.toLowerCase()}
      </h1>
      <ResourceForm config={resolvedConfig} />
    </div>
  );
}
