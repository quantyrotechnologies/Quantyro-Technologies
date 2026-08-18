-- Full case-study detail pages (/work/[slug]) need more than the summary
-- card had: tech stack, delivery timeframe, and advanced/highlight features.
-- All nullable — stay empty (hidden in the UI) until real data is entered.

alter table projects add column stack jsonb;
alter table projects add column duration text;
alter table projects add column highlights jsonb;
