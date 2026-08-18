-- Adds tags + a cover accent color to blog posts, for filtering and a
-- visual cover card on /blog (matching the gradient-card style already
-- used for services/work, not a real photo upload).

alter table blog_posts
  add column tags jsonb not null default '[]'::jsonb,
  add column accent text not null default 'accent' check (accent in ('accent', 'accent-2'));
