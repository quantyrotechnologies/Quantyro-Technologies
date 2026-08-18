-- Team members, for a public /team page. Deliberately no code-level sample
-- fallback (unlike services/industries) — a team page must show real people,
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
