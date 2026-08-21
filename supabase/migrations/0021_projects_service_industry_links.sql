-- Explicit many-to-many links from a project (case study) to the service
-- and industry pages it should appear on under "Related Work" — replaces
-- the old tag-string-matching heuristic with admin-controlled selection.
-- One project can be assigned to multiple services and multiple industries.

alter table projects add column service_ids uuid[] not null default '{}'::uuid[];
alter table projects add column industry_ids uuid[] not null default '{}'::uuid[];

create index projects_service_ids_idx on projects using gin (service_ids);
create index projects_industry_ids_idx on projects using gin (industry_ids);
