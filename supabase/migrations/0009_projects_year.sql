-- Optional case-study year, shown on the redesigned /work timeline. Stays
-- null (falls back to a sequence number in the UI) until real dates are set.

alter table projects add column year int;
