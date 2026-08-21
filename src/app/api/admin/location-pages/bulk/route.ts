import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { requireAdminSession } from '@/lib/admin/auth';
import { createAdminClient } from '@/lib/supabase/admin';
import { CITIES } from '@/lib/cities';

/**
 * Cross-products the selected services/industries with the selected cities
 * and inserts one location_pages row per combination. Rows are created with
 * is_active: false regardless of input — same "no doorway pages" principle
 * as the single-record form: bulk-creating the row is just reserving the
 * URL and giving the admin a form to fill in; publishing is a separate,
 * deliberate step once local_note has something genuinely city-specific.
 * Existing (entity, city) combinations are silently skipped, not overwritten.
 */
export async function POST(req: Request) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const serviceIds: string[] = Array.isArray(body.serviceIds) ? body.serviceIds.filter((v: unknown) => typeof v === 'string') : [];
  const industryIds: string[] = Array.isArray(body.industryIds) ? body.industryIds.filter((v: unknown) => typeof v === 'string') : [];
  const cities: string[] = Array.isArray(body.cities) ? body.cities.filter((v: unknown) => typeof v === 'string' && (CITIES as readonly string[]).includes(v)) : [];

  if (cities.length === 0) {
    return NextResponse.json({ error: 'Select at least one city' }, { status: 400 });
  }
  if (serviceIds.length === 0 && industryIds.length === 0) {
    return NextResponse.json({ error: 'Select at least one service or industry' }, { status: 400 });
  }

  const rows: { service_id?: string; industry_id?: string; city: string; sort_order: number; is_active: false }[] = [];
  for (const city of cities) {
    for (const serviceId of serviceIds) {
      rows.push({ service_id: serviceId, city, sort_order: 0, is_active: false });
    }
    for (const industryId of industryIds) {
      rows.push({ industry_id: industryId, city, sort_order: 0, is_active: false });
    }
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('location_pages')
    .upsert(rows, { onConflict: 'service_id,industry_id,city', ignoreDuplicates: true })
    .select('id');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateTag('location-pages', { expire: 1 });
  return NextResponse.json({ requested: rows.length, created: data?.length ?? 0 }, { status: 201 });
}
