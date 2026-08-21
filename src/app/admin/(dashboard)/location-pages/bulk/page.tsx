import { createAdminClient } from '@/lib/supabase/admin';
import { CITIES } from '@/lib/cities';
import BulkLocationForm from '@/components/admin/BulkLocationForm';

export default async function BulkLocationPagesPage() {
  const supabase = createAdminClient();
  const [{ data: services }, { data: industries }] = await Promise.all([
    supabase.from('services').select('id, title').order('title'),
    supabase.from('industries').select('id, title').order('title'),
  ]);

  return (
    <div>
      <h1 className="text-[24px] font-[var(--font-display)] font-bold text-[var(--ink)] mb-[8px]">
        Bulk-create city pages
      </h1>
      <p className="text-[13.5px] text-[var(--muted)] mb-[24px] max-w-[560px]">
        Pick any combination of services, industries, and cities — a page gets reserved for every
        pairing. Everything is created unpublished; open each one from the City pages list and add
        a genuine local note before turning it on.
      </p>
      <BulkLocationForm
        services={services ?? []}
        industries={industries ?? []}
        cities={[...CITIES]}
      />
    </div>
  );
}
