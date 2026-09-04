-- Quantyro Technologies â€” initial schema for the admin CRUD backend.
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
-- projects (case studies â€” consolidates WorkContent + FeaturedWorkSection)
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
-- site_settings (singleton row â€” Organization/footer/contact info)
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
-- contact_submissions (leads â€” admin-only, no public read/write)
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
-- the service_role key, which bypasses RLS entirely â€” so no write policy is
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

-- contact_submissions holds leads' personal info â€” RLS enabled, no public
-- policy at all, so it's reachable only via the service_role key server-side.
alter table contact_submissions enable row level security;
-- Adds blog (with comments + scheduled publishing) and certifications.
-- Run after 0001_init.sql, in the same SQL editor.

-- ---------------------------------------------------------------------------
-- blog_posts
-- ---------------------------------------------------------------------------
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  author_name text not null default 'Quantyro Team',
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published')),
  published_at timestamptz,
  seo_title text,
  seo_description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index blog_posts_status_published_idx on blog_posts (status, published_at desc);
create trigger blog_posts_set_updated_at before update on blog_posts
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- blog_comments
-- ---------------------------------------------------------------------------
create table blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references blog_posts(id) on delete cascade,
  name text not null,
  email text not null,
  comment text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);
create index blog_comments_post_id_idx on blog_comments (post_id, created_at);

-- ---------------------------------------------------------------------------
-- certifications
-- ---------------------------------------------------------------------------
create table certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null,
  issue_date date,
  credential_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger certifications_set_updated_at before update on certifications
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table blog_posts enable row level security;
alter table blog_comments enable row level security;
alter table certifications enable row level security;

-- Only published posts (or scheduled posts whose time has arrived) are
-- publicly readable â€” drafts/future-scheduled posts stay invisible to the
-- anon key even though the admin (service_role) can always see everything.
create policy "public read published" on blog_posts for select
  using (status = 'published' or (status = 'scheduled' and published_at <= now()));

-- Only approved comments are publicly readable. Submitting a new comment
-- happens through the app's own API route using service_role (same pattern
-- as contact_submissions), so no public insert policy is defined here.
create policy "public read approved" on blog_comments for select
  using (status = 'approved');

create policy "public read" on certifications for select using (true);
-- Adds tags + a cover accent color to blog posts, for filtering and a
-- visual cover card on /blog (matching the gradient-card style already
-- used for services/work, not a real photo upload).

alter table blog_posts
  add column tags jsonb not null default '[]'::jsonb,
  add column accent text not null default 'accent' check (accent in ('accent', 'accent-2'));
-- Service x Region landing pages for multi-location SEO. Deliberately kept
-- empty by default (is_active defaults false) â€” only publish a combination
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
-- The faqs table's page_slug check constraint was missing 'blog' (the /blog
-- page was added after the original schema and never wired the FAQ back in).

alter table faqs drop constraint faqs_page_slug_check;
alter table faqs add constraint faqs_page_slug_check
  check (page_slug in ('home', 'services', 'work', 'about', 'contact', 'blog'));

-- The admin resource dropdown offers 'blog' too â€” update its options.
-- Individual service detail pages (/services/[slug]) need their own <title>/meta
-- description, independent of the on-page H1/description â€” same pattern already
-- used by blog_posts and service_region_pages.

alter table services add column seo_title text;
alter table services add column seo_description text;
-- The faqs.page_slug CHECK constraint (fixed enum of 6 page names) has already
-- had to be patched once (0005, adding 'blog') and is about to block a second
-- legitimate use: one FAQ set per individual service detail page
-- (/services/[slug], slugs like 'service-custom-software'). Every new page
-- type added to the site would otherwise require another migration just to
-- widen this list. Drop the enum and keep a lightweight non-empty check
-- instead â€” the admin UI's page_slug dropdown is still the source of truth
-- for which values are actually in use.

alter table faqs drop constraint faqs_page_slug_check;
alter table faqs add constraint faqs_page_slug_check check (length(trim(page_slug)) > 0);
-- Optional real office photo, admin-uploadable later. Stays null (no image
-- shown) until a real photo URL is set â€” never a fabricated/stock photo.

alter table offices add column photo_url text;
-- Optional case-study year, shown on the redesigned /work timeline. Stays
-- null (falls back to a sequence number in the UI) until real dates are set.

alter table projects add column year int;
-- Full case-study detail pages (/work/[slug]) need more than the summary
-- card had: tech stack, delivery timeframe, and advanced/highlight features.
-- All nullable â€” stay empty (hidden in the UI) until real data is entered.

alter table projects add column stack jsonb;
alter table projects add column duration text;
alter table projects add column highlights jsonb;
-- Industries served â€” mirrors the `services` table pattern so it plugs into
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
-- Team members, for a public /team page. Deliberately no code-level sample
-- fallback (unlike services/industries) â€” a team page must show real people,
-- so it stays empty until real rows exist. Run this once, then add real team
-- members via the admin panel.

create table team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  photo_url text,
  linkedin_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger team_members_set_updated_at before update on team_members
  for each row execute function set_updated_at();

alter table team_members enable row level security;
create policy "public read" on team_members for select using (true);
-- Optional admin-uploaded image per service, shown instead of the built-in
-- illustration when set. Falls back to the illustration SVG when null.

alter table services add column image_url text;
-- City-level SEO landing pages for services AND industries, replacing the
-- coarse 4-region system for this use case (service_region_pages stays as
-- is â€” this is additive, not a migration of that data). Polymorphic: exactly
-- one of service_id/industry_id is set, enforced by the check constraint.
--
-- Deliberately kept unpublished by default (is_active defaults false) â€”
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
-- Moves the two big content sets (service capability deep-dives and
-- industry solution deep-dives) from hardcoded TypeScript into the CMS, so
-- they're editable from the admin panel like everything else. Unlike
-- service_region_pages / location_pages, these default is_active to TRUE:
-- the content already seeded here is finished, unique, production-quality
-- copy (not a placeholder "no doorway pages" case) â€” it's already live
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
alter table location_pages
  add column faqs jsonb not null default '[]'::jsonb;
alter table services add column target_keywords jsonb not null default '[]'::jsonb;
alter table industries add column target_keywords jsonb not null default '[]'::jsonb;
alter table location_pages add column target_keywords jsonb not null default '[]'::jsonb;
alter table tech_stack_pages add column target_keywords jsonb not null default '[]'::jsonb;
alter table industry_solution_pages add column target_keywords jsonb not null default '[]'::jsonb;
alter table contact_submissions
  add column source text;

-- Compact inline inquiry forms (service/industry/city pages) omit the
-- message field to stay low-friction; the full /contact form still shows it.
alter table contact_submissions
  alter column message drop not null;
-- Lets a blog post point at the one service/industry page it's most
-- relevant to, so the post can carry a contextual internal link back to a
-- money page instead of leaving readers with nowhere to go next.
alter table blog_posts
  add column related_service_id uuid references services(id) on delete set null,
  add column related_industry_id uuid references industries(id) on delete set null;
-- Per-service "Industry Applications" cards on /services/[slug]. Previously
-- a single hardcoded array shown identically on every service page â€”
-- replaced with admin-managed, per-service content so each service can show
-- the industries actually relevant to it, editable without a code change.

create table industry_applications (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  sector text not null,
  use_case text not null,
  metric text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index industry_applications_service_id_idx on industry_applications(service_id);
create trigger industry_applications_set_updated_at before update on industry_applications
  for each row execute function set_updated_at();

alter table industry_applications enable row level security;
create policy "public read" on industry_applications for select using (true);
-- Explicit many-to-many links from a project (case study) to the service
-- and industry pages it should appear on under "Related Work" â€” replaces
-- the old tag-string-matching heuristic with admin-controlled selection.
-- One project can be assigned to multiple services and multiple industries.

alter table projects add column service_ids uuid[] not null default '{}'::uuid[];
alter table projects add column industry_ids uuid[] not null default '{}'::uuid[];

create index projects_service_ids_idx on projects using gin (service_ids);
create index projects_industry_ids_idx on projects using gin (industry_ids);
