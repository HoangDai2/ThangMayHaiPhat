-- Add icon column to products and services tables
ALTER TABLE products ADD COLUMN IF NOT EXISTS icon text NOT NULL DEFAULT '';
ALTER TABLE services ADD COLUMN IF NOT EXISTS icon text NOT NULL DEFAULT '';
