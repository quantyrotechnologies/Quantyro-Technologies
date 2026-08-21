-- Lets a blog post point at the one service/industry page it's most
-- relevant to, so the post can carry a contextual internal link back to a
-- money page instead of leaving readers with nowhere to go next.
alter table blog_posts
  add column related_service_id uuid references services(id) on delete set null,
  add column related_industry_id uuid references industries(id) on delete set null;
