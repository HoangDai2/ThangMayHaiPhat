/*
# Tạo bảng CMS cho quản lý nội dung (Thang Máy Hải Phát)

## Mô tả
Tạo 3 bảng quản lý nội dung chính: projects (dự án), products (sản phẩm), services (dịch vụ).
Đây là ứng dụng single-tenant không có đăng nhập người dùng cuối, nên policies mở cho anon + authenticated.

## Bảng mới

### 1. projects
- id: uuid primary key
- slug: text unique (dùng cho URL, ví dụ: villa-ecopark)
- title: tên dự án
- location: địa điểm
- category: loại dự án (Gia đình / Tải khách / Thương mại / Tải hàng)
- image: URL ảnh đại diện
- specs: thông số ngắn
- description: mô tả chi tiết
- floors, capacity, speed, brand, completion_date, warranty: chi tiết kỹ thuật
- features: mảng JSONB các tính năng
- gallery: mảng JSONB URL ảnh gallery
- testimonial: JSONB thông tin nhận xét khách hàng

### 2. products
- id: uuid primary key
- slug: text unique
- title, subtitle, image, short_description: thông tin cơ bản
- full_description: mô tả đầy đủ
- features, specifications, benefits, faqs, related_projects: JSONB arrays

### 3. services
- id: uuid primary key
- slug: text unique
- title, subtitle, short_description, full_description: thông tin cơ bản
- highlights, process: JSONB arrays

## Bảo mật
- RLS bật trên tất cả bảng
- Policies TO anon, authenticated (CRUD mở vì không có auth người dùng)
*/

-- ==================== PROJECTS ====================
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  location text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Gia đình',
  image text NOT NULL DEFAULT '',
  specs text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  floors int NOT NULL DEFAULT 1,
  capacity text NOT NULL DEFAULT '',
  speed text NOT NULL DEFAULT '',
  brand text NOT NULL DEFAULT '',
  completion_date text NOT NULL DEFAULT '',
  warranty text NOT NULL DEFAULT '',
  features jsonb NOT NULL DEFAULT '[]',
  gallery jsonb NOT NULL DEFAULT '[]',
  testimonial jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_projects" ON projects;
CREATE POLICY "anon_select_projects" ON projects FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_projects" ON projects;
CREATE POLICY "anon_insert_projects" ON projects FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_projects" ON projects;
CREATE POLICY "anon_update_projects" ON projects FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_projects" ON projects;
CREATE POLICY "anon_delete_projects" ON projects FOR DELETE TO anon, authenticated USING (true);

-- ==================== PRODUCTS ====================
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  short_description text NOT NULL DEFAULT '',
  full_description text NOT NULL DEFAULT '',
  features jsonb NOT NULL DEFAULT '[]',
  specifications jsonb NOT NULL DEFAULT '[]',
  benefits jsonb NOT NULL DEFAULT '[]',
  faqs jsonb NOT NULL DEFAULT '[]',
  related_projects jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE TO anon, authenticated USING (true);

-- ==================== SERVICES ====================
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  short_description text NOT NULL DEFAULT '',
  full_description text NOT NULL DEFAULT '',
  highlights jsonb NOT NULL DEFAULT '[]',
  process jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_services" ON services;
CREATE POLICY "anon_select_services" ON services FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_services" ON services;
CREATE POLICY "anon_insert_services" ON services FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_services" ON services;
CREATE POLICY "anon_update_services" ON services FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_services" ON services;
CREATE POLICY "anon_delete_services" ON services FOR DELETE TO anon, authenticated USING (true);
