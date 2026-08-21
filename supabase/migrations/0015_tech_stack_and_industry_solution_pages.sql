-- Moves the two big content sets (service capability deep-dives and
-- industry solution deep-dives) from hardcoded TypeScript into the CMS, so
-- they're editable from the admin panel like everything else. Unlike
-- service_region_pages / location_pages, these default is_active to TRUE:
-- the content already seeded here is finished, unique, production-quality
-- copy (not a placeholder "no doorway pages" case) — it's already live
-- today as static data, so this migration keeps it live, just DB-backed.

create table tech_stack_pages (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  capability_label text not null,
  slug text not null,
  title text not null,
  tagline text not null,
  overview text not null,
  overview_extra text not null,
  implementation jsonb not null default '[]'::jsonb,
  benefits jsonb not null default '[]'::jsonb,
  companies jsonb not null default '[]'::jsonb,
  use_cases jsonb not null default '[]'::jsonb,
  faqs jsonb not null default '[]'::jsonb,
  primary_tech jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (service_id, slug)
);
create trigger tech_stack_pages_set_updated_at before update on tech_stack_pages
  for each row execute function set_updated_at();

alter table tech_stack_pages enable row level security;
create policy "public read active" on tech_stack_pages for select using (is_active = true);

create table industry_solution_pages (
  id uuid primary key default gen_random_uuid(),
  industry_id uuid not null references industries(id) on delete cascade,
  capability_label text not null,
  slug text not null,
  title text not null,
  tagline text not null,
  overview text not null,
  overview_extra text not null,
  implementation jsonb not null default '[]'::jsonb,
  benefits jsonb not null default '[]'::jsonb,
  companies jsonb not null default '[]'::jsonb,
  use_cases jsonb not null default '[]'::jsonb,
  faqs jsonb not null default '[]'::jsonb,
  primary_tech jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (industry_id, slug)
);
create trigger industry_solution_pages_set_updated_at before update on industry_solution_pages
  for each row execute function set_updated_at();

alter table industry_solution_pages enable row level security;
create policy "public read active" on industry_solution_pages for select using (is_active = true);
