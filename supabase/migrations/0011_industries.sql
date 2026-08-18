-- Industries served — mirrors the `services` table pattern so it plugs into
-- the same admin CRUD + public-read RLS setup. Optional: the site already
-- renders real content from SAMPLE_INDUSTRIES in src/lib/data/industries.ts
-- as a fallback, so this migration is only needed once you want to manage
-- industries from the admin panel instead of the code fallback.

create table industries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  challenges jsonb not null default '[]'::jsonb,
  capabilities jsonb not null default '[]'::jsonb,
  market_stats jsonb not null default '[]'::jsonb,
  related_service_slugs jsonb not null default '[]'::jsonb,
  stat_value text not null,
  stat_label text not null,
  seo_title text,
  seo_description text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger industries_set_updated_at before update on industries
  for each row execute function set_updated_at();

alter table industries enable row level security;
create policy "public read" on industries for select using (true);
