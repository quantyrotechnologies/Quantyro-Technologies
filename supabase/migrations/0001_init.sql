-- Quantyro Technologies — initial schema for the admin CRUD backend.
-- Run this once in the Supabase SQL editor (or `supabase db push`) against a fresh project.

create extension if not exists pgcrypto;

-- Shared helper: keeps `updated_at` current on every UPDATE.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------------
create table services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  capabilities jsonb not null default '[]'::jsonb,
  stack jsonb,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger services_set_updated_at before update on services
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- projects (case studies — consolidates WorkContent + FeaturedWorkSection)
-- ---------------------------------------------------------------------------
create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client text not null,
  region text not null,
  result text not null,
  tags jsonb not null default '[]'::jsonb,
  summary text not null,
  detail text not null,
  accent text not null default 'accent' check (accent in ('accent', 'accent-2')),
  is_featured boolean not null default false,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger projects_set_updated_at before update on projects
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- testimonials
-- ---------------------------------------------------------------------------
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text not null,
  company text not null,
  initials text not null,
  avatar_bg text not null,
  avatar_fg text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger testimonials_set_updated_at before update on testimonials
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- faqs (per-page)
-- ---------------------------------------------------------------------------
create table faqs (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null check (page_slug in ('home', 'services', 'work', 'about', 'contact')),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index faqs_page_slug_idx on faqs (page_slug, sort_order);
create trigger faqs_set_updated_at before update on faqs
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- stats
-- ---------------------------------------------------------------------------
create table stats (
  id uuid primary key default gen_random_uuid(),
  count int not null,
  suffix text not null default '+',
  label text not null,
  tag text not null,
  accent text not null default 'accent' check (accent in ('accent', 'accent-2')),
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger stats_set_updated_at before update on stats
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- roadmap_steps (Manifesto section)
-- ---------------------------------------------------------------------------
create table roadmap_steps (
  id uuid primary key default gen_random_uuid(),
  step text not null,
  phase_tag text not null,
  badge text not null,
  title text not null,
  description text not null,
  deliverables jsonb not null default '[]'::jsonb,
  status text not null,
  terminal_cmd text not null,
  terminal_output text not null,
  icon_key text not null check (icon_key in ('handshake', 'calendar', 'blueprint', 'sprint', 'launch')),
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger roadmap_steps_set_updated_at before update on roadmap_steps
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- values (About page)
-- ---------------------------------------------------------------------------
create table values_content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger values_content_set_updated_at before update on values_content
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- offices (About page + future multi-location SEO)
-- ---------------------------------------------------------------------------
create table offices (
  id uuid primary key default gen_random_uuid(),
  city text not null,
  region text not null,
  address_line1 text,
  address_line2 text,
  locality text,
  admin_area text,
  postal_code text,
  country text,
  latitude numeric,
  longitude numeric,
  phone text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger offices_set_updated_at before update on offices
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- ticker_metrics (EnterpriseTicker)
-- ---------------------------------------------------------------------------
create table ticker_metrics (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger ticker_metrics_set_updated_at before update on ticker_metrics
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- social_links (Footer)
-- ---------------------------------------------------------------------------
create table social_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger social_links_set_updated_at before update on social_links
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- site_settings (singleton row — Organization/footer/contact info)
-- ---------------------------------------------------------------------------
create table site_settings (
  id smallint primary key default 1 check (id = 1),
  org_name text not null,
  tagline text not null,
  description text not null,
  url text not null,
  contact_email text not null,
  contact_phone text,
  response_time text not null default 'Within 1 business day',
  footer_blurb text not null,
  copyright_text text not null,
  updated_at timestamptz not null default now()
);
create trigger site_settings_set_updated_at before update on site_settings
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- contact_submissions (leads — admin-only, no public read/write)
-- ---------------------------------------------------------------------------
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);
create index contact_submissions_created_at_idx on contact_submissions (created_at desc);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
-- Public content tables: anyone can SELECT (the marketing site reads with the
-- anon key), all writes happen server-side through Next.js API routes using
-- the service_role key, which bypasses RLS entirely — so no write policy is
-- defined here on purpose.

alter table services enable row level security;
alter table projects enable row level security;
alter table testimonials enable row level security;
alter table faqs enable row level security;
alter table stats enable row level security;
alter table roadmap_steps enable row level security;
alter table values_content enable row level security;
alter table offices enable row level security;
alter table ticker_metrics enable row level security;
alter table social_links enable row level security;
alter table site_settings enable row level security;

create policy "public read" on services for select using (true);
create policy "public read" on projects for select using (true);
create policy "public read" on testimonials for select using (true);
create policy "public read" on faqs for select using (true);
create policy "public read" on stats for select using (true);
create policy "public read" on roadmap_steps for select using (true);
create policy "public read" on values_content for select using (true);
create policy "public read" on offices for select using (true);
create policy "public read" on ticker_metrics for select using (true);
create policy "public read" on social_links for select using (true);
create policy "public read" on site_settings for select using (true);

-- contact_submissions holds leads' personal info — RLS enabled, no public
-- policy at all, so it's reachable only via the service_role key server-side.
alter table contact_submissions enable row level security;
