alter table services add column target_keywords jsonb not null default '[]'::jsonb;
alter table industries add column target_keywords jsonb not null default '[]'::jsonb;
alter table location_pages add column target_keywords jsonb not null default '[]'::jsonb;
alter table tech_stack_pages add column target_keywords jsonb not null default '[]'::jsonb;
alter table industry_solution_pages add column target_keywords jsonb not null default '[]'::jsonb;
