-- City-level SEO landing pages for services AND industries, replacing the
-- coarse 4-region system for this use case (service_region_pages stays as
-- is — this is additive, not a migration of that data). Polymorphic: exactly
-- one of service_id/industry_id is set, enforced by the check constraint.
--
-- Deliberately kept unpublished by default (is_active defaults false) —
-- same "no doorway pages" principle as service_region_pages: only turn a
-- combination on once local_note has something genuinely city-specific in
-- it (a project delivered there, a client, a real stat), not just the city
-- name swapped into a template.

create table location_pages (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id) on delete cascade,
  industry_id uuid references industries(id) on delete cascade,
  city text not null,
  nearby_areas text,
  local_note text,
  seo_title text,
  seo_description text,
  sort_order int not null default 0,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint location_pages_one_entity check (
    (service_id is not null and industry_id is null) or
    (service_id is null and industry_id is not null)
  ),
  unique (service_id, industry_id, city)
);
create trigger location_pages_set_updated_at before update on location_pages
  for each row execute function set_updated_at();

alter table location_pages enable row level security;
create policy "public read active" on location_pages for select using (is_active = true);
