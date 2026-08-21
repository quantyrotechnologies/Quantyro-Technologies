alter table contact_submissions
  add column source text;

-- Compact inline inquiry forms (service/industry/city pages) omit the
-- message field to stay low-friction; the full /contact form still shows it.
alter table contact_submissions
  alter column message drop not null;
