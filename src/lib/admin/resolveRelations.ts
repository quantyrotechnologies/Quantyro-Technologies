import { createAdminClient } from '@/lib/supabase/admin';
import type { ResourceConfig } from './resources';

/**
 * Returns a copy of the config where every 'relation' field's `options` is
 * populated from its target table (id -> label). Server-only (uses the
 * service-role client) — call this in the admin page before rendering
 * ResourceForm, since the form itself is a client component and can't fetch.
 */
export async function resolveRelationFields(config: ResourceConfig): Promise<ResourceConfig> {
  const relationFields = config.fields.filter((f) => (f.type === 'relation' || f.type === 'relation-multi') && f.relationTable);
  if (relationFields.length === 0) return config;

  const supabase = createAdminClient();

  const resolved = await Promise.all(
    relationFields.map(async (field) => {
      const labelField = field.relationLabelField ?? 'title';
      const { data } = await supabase.from(field.relationTable!).select('*');
      const rows = (data ?? []) as Record<string, unknown>[];
      rows.sort((a, b) => String(a[labelField]).localeCompare(String(b[labelField])));

      return {
        name: field.name,
        options: rows.map((row) => ({
          value: String(row.id),
          label: String(row[labelField]),
        })),
      };
    })
  );

  return {
    ...config,
    fields: config.fields.map((field) => {
      const match = resolved.find((r) => r.name === field.name);
      return match ? { ...field, options: match.options } : field;
    }),
  };
}
