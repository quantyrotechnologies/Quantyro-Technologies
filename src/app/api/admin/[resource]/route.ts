import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getResourceConfig } from '@/lib/admin/resources';
import { validateResourcePayload } from '@/lib/admin/validate';
import { requireAdminSession } from '@/lib/admin/auth';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(_req: Request, { params }: { params: Promise<{ resource: string }> }) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { resource } = await params;
  const config = getResourceConfig(resource);
  if (!config) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });

  const supabase = createAdminClient();

  if (config.singleton) {
    const { data, error } = await supabase.from(config.table).select('*').eq('id', 1).maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  }

  const { data, error } = await supabase
    .from(config.table)
    .select('*')
    .order(config.orderBy, { ascending: config.orderDirection !== 'desc' });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: Request, { params }: { params: Promise<{ resource: string }> }) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { resource } = await params;
  const config = getResourceConfig(resource);
  if (!config) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 });
  if (config.singleton || config.allowCreate === false) {
    return NextResponse.json({ error: 'Create is not allowed for this resource' }, { status: 405 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const result = validateResourcePayload(config, body);
  if ('errors' in result) return NextResponse.json({ error: result.errors.join(', ') }, { status: 400 });

  const supabase = createAdminClient();
  const { data, error } = await supabase.from(config.table).insert(result.data).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidateTag(config.revalidateTag, { expire: 1 });
  return NextResponse.json({ data }, { status: 201 });
}
