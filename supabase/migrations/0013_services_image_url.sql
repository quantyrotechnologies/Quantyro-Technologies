-- Optional admin-uploaded image per service, shown instead of the built-in
-- illustration when set. Falls back to the illustration SVG when null.

alter table services add column image_url text;
