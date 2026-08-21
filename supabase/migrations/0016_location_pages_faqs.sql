alter table location_pages
  add column faqs jsonb not null default '[]'::jsonb;
