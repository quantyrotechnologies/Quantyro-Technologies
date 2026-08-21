-- Per-service "Industry Applications" cards on /services/[slug]. Previously
-- a single hardcoded array shown identically on every service page —
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
