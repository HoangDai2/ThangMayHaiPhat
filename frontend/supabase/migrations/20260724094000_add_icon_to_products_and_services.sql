-- Add icon, is_published, and sort_order columns to products and services tables
ALTER TABLE products ADD COLUMN IF NOT EXISTS icon text NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_order int NOT NULL DEFAULT 0;

ALTER TABLE services ADD COLUMN IF NOT EXISTS icon text NOT NULL DEFAULT '';
ALTER TABLE services ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;
ALTER TABLE services ADD COLUMN IF NOT EXISTS sort_order int NOT NULL DEFAULT 0;

