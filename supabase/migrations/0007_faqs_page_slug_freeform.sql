-- The faqs.page_slug CHECK constraint (fixed enum of 6 page names) has already
-- had to be patched once (0005, adding 'blog') and is about to block a second
-- legitimate use: one FAQ set per individual service detail page
-- (/services/[slug], slugs like 'service-custom-software'). Every new page
-- type added to the site would otherwise require another migration just to
-- widen this list. Drop the enum and keep a lightweight non-empty check
-- instead — the admin UI's page_slug dropdown is still the source of truth
-- for which values are actually in use.

alter table faqs drop constraint faqs_page_slug_check;
alter table faqs add constraint faqs_page_slug_check check (length(trim(page_slug)) > 0);
