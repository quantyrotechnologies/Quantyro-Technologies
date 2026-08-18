-- Service x Region landing pages for multi-location SEO. Deliberately kept
-- empty by default (is_active defaults false) — only publish a combination
-- once it has genuine, non-duplicate content and at least one real project
-- backing it, per the "no doorway pages" guidance this was built against.

create table service_region_pages (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  region text not null check (region in ('North America', 'Europe', 'South Asia', 'APAC')),
  intro text not null,
  seo_title text,
  seo_description text,
  sort_order int not null default 0,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (service_id, region)
);
create trigger service_region_pages_set_updated_at before update on service_region_pages
  for each row execute function set_updated_at();

alter table service_region_pages enable row level security;
create policy "public read active" on service_region_pages for select using (is_active = true);
