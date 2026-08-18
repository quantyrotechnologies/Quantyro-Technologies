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
-- publicly readable — drafts/future-scheduled posts stay invisible to the
-- anon key even though the admin (service_role) can always see everything.
create policy "public read published" on blog_posts for select
  using (status = 'published' or (status = 'scheduled' and published_at <= now()));

-- Only approved comments are publicly readable. Submitting a new comment
-- happens through the app's own API route using service_role (same pattern
-- as contact_submissions), so no public insert policy is defined here.
create policy "public read approved" on blog_comments for select
  using (status = 'approved');

create policy "public read" on certifications for select using (true);
