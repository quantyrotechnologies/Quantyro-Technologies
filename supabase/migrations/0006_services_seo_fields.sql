-- Individual service detail pages (/services/[slug]) need their own <title>/meta
-- description, independent of the on-page H1/description — same pattern already
-- used by blog_posts and service_region_pages.

alter table services add column seo_title text;
alter table services add column seo_description text;
