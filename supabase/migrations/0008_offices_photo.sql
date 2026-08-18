-- Optional real office photo, admin-uploadable later. Stays null (no image
-- shown) until a real photo URL is set — never a fabricated/stock photo.

alter table offices add column photo_url text;
