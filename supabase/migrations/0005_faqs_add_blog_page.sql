-- The faqs table's page_slug check constraint was missing 'blog' (the /blog
-- page was added after the original schema and never wired the FAQ back in).

alter table faqs drop constraint faqs_page_slug_check;
alter table faqs add constraint faqs_page_slug_check
  check (page_slug in ('home', 'services', 'work', 'about', 'contact', 'blog'));

-- The admin resource dropdown offers 'blog' too — update its options.
