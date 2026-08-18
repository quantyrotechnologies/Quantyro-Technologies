import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getResourceConfig } from '@/lib/admin/resources';
import { validateResourcePayload } from '@/lib/admin/validate';
import { requireAdminSession } from '@/lib/admin/auth';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(_req: Request, { params }: { params: Promise<{ resource: string; id: string }> }) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { resource, id } = await params;
  const config = getResourceConfig(resource);
  if (!config) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });

  const supabase = createAdminClient();
  const { data, error } = await supabase.from(config.table).select('*').eq('id', id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ resource: string; id: string }> }) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { resource, id } = await params;
  const config = getResourceConfig(resource);
  if (!config) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const result = validateResourcePayload(config, body);
  if ('errors' in result) return NextResponse.json({ error: result.errors.join(', ') }, { status: 400 });

  const supabase = createAdminClient();

  // Singleton resources (site-settings) may not have a row yet before
  // seeding — upsert so the same form works for first save and every edit.
  const { data, error } = config.singleton
    ? await supabase.from(config.table).upsert({ id: 1, ...result.data }).select('*').single()
    : await supabase.from(config.table).update(result.data).eq('id', id).select('*').single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateTag(config.revalidateTag, { expire: 1 });
  return NextResponse.json({ data });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ resource: string; id: string }> }) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { resource, id } = await params;
  const config = getResourceConfig(resource);
  if (!config) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });
  if (config.singleton) return NextResponse.json({ error: 'Delete is not allowed for this resource' }, { status: 405 });
  if (config.allowDelete === false) return NextResponse.json({ error: 'Delete is not allowed for this resource' }, { status: 405 });

  const supabase = createAdminClient();
  const { error } = await supabase.from(config.table).delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateTag(config.revalidateTag, { expire: 1 });
  return NextResponse.json({ ok: true });
}
