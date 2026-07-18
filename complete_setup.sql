-- HẢI PHÁT THANG MÁY - COMPLETE DATABASE SETUP & SEED

-- ==================================================================
-- FROM: 20260706090619_create_cms_tables.sql
-- ==================================================================

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


-- ==================================================================
-- FROM: 20260707014118_20260707000000_create_cms_admin_tables.sql.sql
-- ==================================================================

/*
# Tạo bảng CMS mở rộng cho quản trị (Thang Máy Hải Phát)

## Mô tả
Bổ sung 3 bảng quản trị nội dung mới: banners, articles, reviews.
Đồng thời tạo storage bucket "images" để quản lý hình ảnh tải lên.
Ứng dụng single-tenant (không auth người dùng cuối), nên policies mở cho anon + authenticated.

## Bảng mới

### 1. banners (quản lý banner trang chủ / trang)
- id: uuid primary key
- title: tiêu đề banner
- subtitle: tiêu đề phụ / mô tả ngắn
- image_url: URL ảnh banner (đường dẫn storage hoặc URL ngoài)
- link_url: đường dẫn khi click vào banner
- position: vị trí hiển thị (hero / sub / sidebar)
- sort_order: thứ tự sắp xếp (mặc định 0)
- is_active: trạng thái hiển thị (mặc định true)
- created_at: timestamp

### 2. articles (quản lý bài viết / tin tức)
- id: uuid primary key
- slug: text unique (dùng cho URL bài viết)
- title: tiêu đề bài viết
- excerpt: đoạn tóm tắt
- content: nội dung đầy đủ (hỗ trợ HTML)
- cover_image: URL ảnh bìa
- author: tên tác giả
- category: danh mục bài viết
- tags: mảng JSONB các thẻ
- is_published: trạng thái xuất bản (mặc định false)
- published_at: thời điểm xuất bản
- created_at: timestamp

### 3. reviews (quản lý đánh giá khách hàng)
- id: uuid primary key
- name: tên khách hàng
- role: chức danh / vai trò
- avatar: URL ảnh đại diện
- rating: số sao (1-5, mặc định 5)
- text: nội dung đánh giá
- project: dự án liên quan
- is_published: trạng thái hiển thị (mặc định true)
- sort_order: thứ tự sắp xếp
- created_at: timestamp

## Storage
- Tạo bucket "images" công khai để lưu hình ảnh tải lên từ admin (banner, bìa bài viết, gallery).

## Bảo mật
- RLS bật trên tất cả bảng mới.
- Policies TO anon, authenticated (CRUD mở vì không có auth người dùng).
- Storage bucket công khai cho phép đọc; ghi xóa mở cho anon + authenticated.
*/

-- ==================== BANNERS ====================
CREATE TABLE IF NOT EXISTS banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  link_url text NOT NULL DEFAULT '',
  position text NOT NULL DEFAULT 'hero',
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_banners" ON banners;
CREATE POLICY "anon_select_banners" ON banners FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_banners" ON banners;
CREATE POLICY "anon_insert_banners" ON banners FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_banners" ON banners;
CREATE POLICY "anon_update_banners" ON banners FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_banners" ON banners;
CREATE POLICY "anon_delete_banners" ON banners FOR DELETE TO anon, authenticated USING (true);

-- ==================== ARTICLES ====================
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  cover_image text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  tags jsonb NOT NULL DEFAULT '[]',
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_articles" ON articles;
CREATE POLICY "anon_select_articles" ON articles FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_articles" ON articles;
CREATE POLICY "anon_insert_articles" ON articles FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_articles" ON articles;
CREATE POLICY "anon_update_articles" ON articles FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_articles" ON articles;
CREATE POLICY "anon_delete_articles" ON articles FOR DELETE TO anon, authenticated USING (true);

-- ==================== REVIEWS ====================
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL DEFAULT '',
  avatar text NOT NULL DEFAULT '',
  rating int NOT NULL DEFAULT 5,
  text text NOT NULL DEFAULT '',
  project text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_reviews" ON reviews;
CREATE POLICY "anon_select_reviews" ON reviews FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews" ON reviews FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_reviews" ON reviews;
CREATE POLICY "anon_update_reviews" ON reviews FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_reviews" ON reviews;
CREATE POLICY "anon_delete_reviews" ON reviews FOR DELETE TO anon, authenticated USING (true);

-- ==================== STORAGE BUCKET ====================
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: cho phép anon + authenticated đọc/ghi/xóa trong bucket "images"
DROP POLICY IF EXISTS "anon_select_images" ON storage.objects;
CREATE POLICY "anon_select_images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'images');

DROP POLICY IF EXISTS "anon_insert_images" ON storage.objects;
CREATE POLICY "anon_insert_images" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'images');

DROP POLICY IF EXISTS "anon_update_images" ON storage.objects;
CREATE POLICY "anon_update_images" ON storage.objects
  FOR UPDATE TO anon, authenticated
  USING (bucket_id = 'images') WITH CHECK (bucket_id = 'images');

DROP POLICY IF EXISTS "anon_delete_images" ON storage.objects;
CREATE POLICY "anon_delete_images" ON storage.objects
  FOR DELETE TO anon, authenticated
  USING (bucket_id = 'images');


-- ==================================================================
-- FROM: supabase_rbac_migration.sql
-- ==================================================================

-- Bảng lưu trữ danh sách các quyền hạn (Permissions)
CREATE TABLE public.permissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bảng lưu trữ danh sách các vai trò (Roles)
CREATE TABLE public.roles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bảng trung gian gán Permission cho Role
CREATE TABLE public.role_permissions (
  role_id uuid REFERENCES public.roles(id) ON DELETE CASCADE,
  permission_id uuid REFERENCES public.permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- Bảng gán Role cho User (liên kết với auth.users của Supabase)
CREATE TABLE public.user_roles (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role_id uuid REFERENCES public.roles(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bật Row Level Security (RLS)
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho phép tất cả những người đã đăng nhập được XEM danh sách roles và permissions
CREATE POLICY "Cho phép đọc roles" ON public.roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Cho phép đọc permissions" ON public.permissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Cho phép đọc role_permissions" ON public.role_permissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Cho phép đọc user_roles" ON public.user_roles FOR SELECT TO authenticated USING (true);

-- (Quan trọng) Tạm thời cho phép authenticated users có thể UPDATE/INSERT/DELETE để bạn có thể làm chức năng Quản lý phân quyền trên Frontend mà không cần backend phức tạp.
-- Trong dự án thực tế lớn hơn, bạn nên giới hạn chỉ role 'Manager' mới có quyền này.
CREATE POLICY "Cho phép sửa roles" ON public.roles FOR ALL TO authenticated USING (true);
CREATE POLICY "Cho phép sửa permissions" ON public.permissions FOR ALL TO authenticated USING (true);
CREATE POLICY "Cho phép sửa role_permissions" ON public.role_permissions FOR ALL TO authenticated USING (true);
CREATE POLICY "Cho phép sửa user_roles" ON public.user_roles FOR ALL TO authenticated USING (true);

-- ==========================================
-- DỮ LIỆU MẪU BAN ĐẦU
-- ==========================================

-- 1. Tạo các quyền hạn cơ bản
INSERT INTO public.permissions (name, description) VALUES
('manage_all', 'Toàn quyền hệ thống'),
('manage_projects', 'Quản lý dự án'),
('manage_products', 'Quản lý sản phẩm'),
('manage_services', 'Quản lý dịch vụ'),
('manage_banners', 'Quản lý banner'),
('manage_articles', 'Quản lý bài viết'),
('manage_reviews', 'Quản lý đánh giá khách hàng'),
('manage_images', 'Quản lý hình ảnh')
ON CONFLICT (name) DO NOTHING;

-- 2. Tạo 2 vai trò mặc định
INSERT INTO public.roles (name, description) VALUES
('Quản lý', 'Quản trị viên cấp cao, có toàn quyền'),
('Nhân viên', 'Nhân viên quản lý nội dung')
ON CONFLICT (name) DO NOTHING;

-- 3. Gán quyền cho vai trò
-- 3.1. Quản lý -> Có quyền manage_all
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM public.roles r, public.permissions p
WHERE r.name = 'Quản lý' AND p.name = 'manage_all'
ON CONFLICT DO NOTHING;

-- 3.2. Nhân viên -> Có quyền manage_articles và manage_images
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM public.roles r, public.permissions p
WHERE r.name = 'Nhân viên' AND p.name IN ('manage_articles', 'manage_images')
ON CONFLICT DO NOTHING;

-- ==========================================
-- VIEW LẤY QUYỀN CỦA USER (để tiện truy vấn)
-- ==========================================
CREATE OR REPLACE VIEW user_permissions_view AS
SELECT 
  ur.user_id,
  r.name as role_name,
  p.name as permission_name
FROM user_roles ur
JOIN roles r ON ur.role_id = r.id
JOIN role_permissions rp ON r.id = rp.role_id
JOIN permissions p ON rp.permission_id = p.id;


-- ==================================================================
-- FROM: supabase_seed.sql
-- ==================================================================

-- Supabase Seed Data generated automatically
-- ===============================================

-- ==================== PROJECTS ====================
INSERT INTO projects (slug, title, location, category, image, specs, description, floors, capacity, speed, brand, completion_date, warranty, features, gallery, testimonial) VALUES (
    'villa-ecopark',
    'Biệt thự Vinhomes Ocean Park',
    'Gia Lâm, Hà Nội',
    'Gia đình',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    'Thang máy gia đình · 4 tầng',
    'Dự án biệt thự cao cấp tại Ocean Park với giải pháp thang máy gia đình cabin kính toàn phần, thiết kế sang trọng phù hợp với kiến trúc hiện đại của ngôi nhà. Thang máy được lắp đặt trong giếng trời, tận dụng ánh sáng tự nhiên và tạo điểm nhấn kiến trúc ấn tượng.',
    4,
    '320 kg (4-5 người)',
    '0.5 m/s',
    'Mitsubishi Electric',
    'Tháng 3/2024',
    '18 tháng',
    '["Cabin kính cường lực trong suốt","Hệ thống cửa tự động êm ái","Đèn LED tiết kiệm điện","Màn hình hiển thị tầng số","Hệ thống an toàn đa điểm","Vận hành siêu êm"]'::jsonb,
    '["https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"]'::jsonb,
    '{"name":"Nguyễn Văn Minh","role":"Chủ hộ","text":"Hải Phát đã làm việc rất chuyên nghiệp. Thang máy không chỉ tiện ích mà còn là điểm nhấn kiến trúc của ngôi nhà. Cả gia đình tôi đều rất hài lòng.","avatar":"https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&q=80"}'::jsonb
  ) ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, title, location, category, image, specs, description, floors, capacity, speed, brand, completion_date, warranty, features, gallery, testimonial) VALUES (
    'landmark-office',
    'Tòa nhà văn phòng Landmark 81',
    'Bình Thạnh, TP.HCM',
    'Tải khách',
    'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    'Thang máy tải khách · 20 tầng',
    'Hệ thống thang máy tải khách cao tốc cho tòa nhà văn phòng hạng A tại Landmark 81. Được thiết kế để phục vụ lưu lượng khách lớn trong giờ cao điểm, với hệ thống điều khiển thông minh phân bổ luồng người tối ưu.',
    20,
    '1000 kg (13-15 người)',
    '2.5 m/s',
    'Otis',
    'Tháng 8/2023',
    '18 tháng + Bảo trì 2 tháng/lần',
    '["Tốc độ cao 2.5 m/s","Hệ thống nhóm thông minh","Màn hình LCD 10\"","Cabin nội thất gỗ cao cấp","Hệ thống dự báo tầng","Chống rung êm ái"]'::jsonb,
    '["https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"]'::jsonb,
    '{"name":"Trần Thị Hoa","role":"Quản lý tòa nhà","text":"Hệ thống thang máy hoạt động rất ổn định, đáp ứng tốt nhu cầu của 500 nhân viên trong tòa nhà. Đặc biệt là hệ thống phân bổ thông minh giúp giảm thời gian chờ đợi đáng kể.","avatar":"https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&q=80"}'::jsonb
  ) ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, title, location, category, image, specs, description, floors, capacity, speed, brand, completion_date, warranty, features, gallery, testimonial) VALUES (
    'sheraton-da-nang',
    'Khách sạn Sheraton Đà Nẵng',
    'Ngũ Hành Sơn, Đà Nẵng',
    'Thương mại',
    'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    'Thang máy khách sạn · 15 tầng',
    'Dự án trang bị hệ thống thang máy cao cấp cho khách sạn 5 sao Sheraton Đà Nẵng. Với thiết kế nội thất sang trọng, vận hành êm ái đáp ứng tiêu chuẩn quốc tế của thương hiệu khách sạn hạng sang.',
    15,
    '800 kg (10-11 người)',
    '1.75 m/s',
    'Schindler',
    'Tháng 1/2024',
    '18 tháng',
    '["Nội thất da Ý cao cấp","Hệ thống âm thanh nhẹ nhàng","Điều hòa tích hợp","Hệ thống key card","Chế độ VIP riêng biệt","Tiêu chuẩn EN 81-20/50"]'::jsonb,
    '["https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/3225530/pexels-photo-3225530.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"]'::jsonb,
    NULL
  ) ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, title, location, category, image, specs, description, floors, capacity, speed, brand, completion_date, warranty, features, gallery, testimonial) VALUES (
    'house-thao-dien',
    'Nhà phố Thảo Điền',
    'Quận 2, TP.HCM',
    'Gia đình',
    'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    'Thang máy gia đình · 5 tầng',
    'Giải pháp thang máy gia đình mini cho nhà phố liền kề tại khu vực Thảo Điền cao cấp. Thiết kế nhỏ gọn, tiết kiệm diện tích nhưng vẫn đảm bảo công năng và thẩm mỹ.',
    5,
    '250 kg (3 người)',
    '0.4 m/s',
    'Nissan',
    'Tháng 6/2024',
    '18 tháng',
    '["Cabin inox mờ cao cấp","Kích thước nhỏ gọn 1.2m x 1.2m","Cửa mở tay thông minh","Tiết kiệm diện tích","Vận hành êm ái","Phù hợp nhà phố"]'::jsonb,
    '["https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"]'::jsonb,
    '{"name":"Phạm Thị Lan","role":"Chủ hộ","text":"Nhà tôi diện tích nhỏ nhưng Hải Phát vẫn tìm được giải pháp thang máy phù hợp. Ba mẹ già di chuyển dễ dàng hơn rất nhiều.","avatar":"https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&q=80"}'::jsonb
  ) ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, title, location, category, image, specs, description, floors, capacity, speed, brand, completion_date, warranty, features, gallery, testimonial) VALUES (
    'aeon-long-bien',
    'Trung tâm thương mại AEON',
    'Long Biên, Hà Nội',
    'Thương mại',
    'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    'Thang cuốn & thang máy · 3 tầng',
    'Hệ thống thang cuốn và thang máy cho trung tâm thương mại AEON Long Biên. Được thiết kế để phục vụ lượng khách lớn trong giờ cao điểm cuối tuần với độ bền cao và vận hành liên tục.',
    3,
    '2000 kg / thang',
    '0.5 m/s (thang cuốn)',
    'Kone',
    'Tháng 11/2023',
    '12 tháng + Bảo trì 2 tháng/lần',
    '["6 thang cuốn song song","4 thang máy tải khách","Hệ thống an toàn tối đa","Chạy liên tục 14h/ngày","Dễ dàng bảo dưỡng","Tiết kiệm điện năng"]'::jsonb,
    '["https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"]'::jsonb,
    NULL
  ) ON CONFLICT (slug) DO NOTHING;
INSERT INTO projects (slug, title, location, category, image, specs, description, floors, capacity, speed, brand, completion_date, warranty, features, gallery, testimonial) VALUES (
    'vinmec-times-city',
    'Bệnh viện Vinmec Times City',
    'Hai Bà Trưng, Hà Nội',
    'Tải khách',
    'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    'Thang máy bệnh viện · 8 tầng',
    'Hệ thống thang máy chuyên dụng cho bệnh viện với khả năng chở giường bệnh, kích thước cabin lớn, vận hành êm ái. Trang bị hệ thống ưu tiên cho cấp cứu và xe cứu thương.',
    8,
    '1600 kg (giường bệnh + 6 người)',
    '1.0 m/s',
    'ThyssenKrupp',
    'Tháng 9/2023',
    '18 tháng + Bảo trì 2 tháng/lần',
    '["Cabin lớn 2.0m x 2.5m","Chở được giường bệnh","Chế độ ưu tiên cấp cứu","Vận hành êm không rung","Hệ thống báo sự cố","Dễ vệ sinh kháng khuẩn"]'::jsonb,
    '["https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800&q=80","https://images.pexels.com/photos/3557590/pexels-photo-3557590.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"]'::jsonb,
    '{"name":"BS. Lê Hoàng Nam","role":"Giám đốc điều hành","text":"Hệ thống thang máy hoạt động rất tin cậy trong môi trường bệnh viện. Chế độ ưu tiên cấp cứu đã giúp cứu sống nhiều bệnh nhân trong tình huống khẩn cấp.","avatar":"https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&q=80"}'::jsonb
  ) ON CONFLICT (slug) DO NOTHING;

-- ==================== PRODUCTS ====================
INSERT INTO products (slug, title, subtitle, image, short_description, full_description, features, specifications, benefits, faqs, related_projects) VALUES (
    'thang-homelift',
    'Thang Homelift',
    'Giải pháp thang máy cao cấp cho không gian sống',
    'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    'Thiết kế sang trọng, tối ưu không gian. Phù hợp với nhà phố, biệt thự với cabin kính toàn phần hoặc inox mờ cao cấp.',
    'Thang Homelift Hải Phát được thiết kế riêng biệt cho từng không gian sống, mang đến sự tiện nghi và đẳng cấp cho gia đình bạn. Với công nghệ tiên tiến từ các thương hiệu hàng đầu thế giới như Mitsubishi, Otis, Schindler, chúng tôi cam kết mang đến sản phẩm chất lượng cao với vận hành êm ái, an toàn tuyệt đối.

Dòng thang Homelift của chúng tôi phù hợp với nhiều kiểu kiến trúc khác nhau - từ nhà phố liền kề, biệt thự cổ điển đến biệt thự hiện đại. Cabin có thể tùy chỉnh với nhiều vật liệu cao cấp: kính cường lực trong suốt, inox mờ, gỗ tự nhiên hay laminate chống trầy xước.',
    '["Cabin kính cường lực cao cấp","Cửa mở tự động êm ái","Hệ thống an toàn đa điểm","Vận hành siêu êm < 45dB","Đèn LED tiết kiệm điện","Màn hình hiển thị tầng số","Hệ thống báo động tự động","Chống quá tải thông minh"]'::jsonb,
    '[{"label":"Tải trọng","value":"250kg - 630kg (3-8 người)"},{"label":"Tốc độ","value":"0.4 - 1.0 m/s"},{"label":"Số tầng","value":"Tối đa 12 tầng"},{"label":"Kích thước cabin","value":"Từ 1.0m x 1.2m"},{"label":"Công suất motor","value":"2.2 - 5.5 kW"},{"label":"Điện áp","value":"220V/380V, 50Hz"},{"label":"Bảo hành","value":"18 tháng toàn bộ"},{"label":"Bảo trì","value":"Miễn phí 2 tháng/lần"}]'::jsonb,
    '["Tăng giá trị bất động sản lên 15-20%","Tiện lợi cho người già và trẻ nhỏ","Vận chuyển đồ đạc dễ dàng","Không gian sang trọng, đẳng cấp","Tiết kiệm thời gian di chuyển","An toàn với hệ thống đa lớp"]'::jsonb,
    '[{"question":"Nhà tôi diện tích nhỏ, có lắp được thang máy không?","answer":"Có thể. Chúng tôi có các dòng Homelift mini với kích thước cabin chỉ từ 1.0m x 1.2m, phù hợp với nhà phố nhỏ."},{"question":"Thời gian lắp đặt mất bao lâu?","answer":"Từ 7-14 ngày làm việc tùy theo độ phức tạp của công trình và điều kiện hiện trạng."},{"question":"Thang Homelift tốn nhiều điện không?","answer":"Không. Thang tiêu thụ khoảng 2-5 kWh/ngày, tương đương chi phí 5,000-12,000 VND/ngày."},{"question":"Bảo hành như thế nào?","answer":"Bảo hành 18 tháng toàn bộ thiết bị, bảo trì miễn phí 2 tháng/lần trong thời gian bảo hành, hỗ trợ kỹ thuật 24/7."}]'::jsonb,
    '["villa-ecopark","house-thao-dien"]'::jsonb
  ) ON CONFLICT (slug) DO NOTHING;
INSERT INTO products (slug, title, subtitle, image, short_description, full_description, features, specifications, benefits, faqs, related_projects) VALUES (
    'thang-may-tai-khach',
    'Thang Máy Tải Khách',
    'Hiệu suất cao cho tòa nhà văn phòng và chung cư',
    'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    'Giải pháp lý tưởng cho tòa nhà, văn phòng, bệnh viện, khách sạn. Tải trọng lớn, vận hành êm ái, đáp ứng tiêu chuẩn QCVN và EN 81.',
    'Thang máy tải khách Hải Phát là giải pháp vận chuyển tối ưu cho các công trình thương mại, văn phòng, chung cư cao tầng với lưu lượng người lớn. Với công nghệ điều khiển nhóm thông minh, hệ thống phân bổ luồng người tự động giúp giảm thời gian chờ đợi và tăng hiệu suất vận hành.

Chúng tôi cung cấp các dòng thang từ tốc độ tiêu chuẩn 1.0 m/s đến tốc độ cao 2.5 m/s cho các tòa nhà cao tầng. Thiết kế cabin hiện đại với nhiều lựa chọn nội thất cao cấp, đáp ứng mọi yêu cầu thẩm mỹ khắt khe nhất.',
    '["Tốc độ vận hành đa dạng","Hệ thống nhóm thông minh","Màn hình LCD 10\" - 21\"","Nội thất gỗ/inox cao cấp","Hệ thống dự báo tầng","Chống rung vận hành êm","Chế độ tiết kiệm điện","Kết nối BMS tòa nhà"]'::jsonb,
    '[{"label":"Tải trọng","value":"630kg - 2000kg (8-26 người)"},{"label":"Tốc độ","value":"1.0 - 4.0 m/s"},{"label":"Số tầng","value":"Tối đa 50 tầng"},{"label":"Kích thước cabin","value":"Từ 1.4m x 1.6m"},{"label":"Công suất motor","value":"7.5 - 30 kW"},{"label":"Điện áp","value":"380V, 50Hz"},{"label":"Bảo hành","value":"18 tháng thiết bị"},{"label":"Bảo trì","value":"2 tháng/lần trong BH"}]'::jsonb,
    '["Tăng năng suất vận chuyển","Giảm thời gian chờ đợi","An toàn tuyệt đối cho người dùng","Tiết kiệm chi phí vận hành","Dễ dàng tích hợp BMS","Vận hành bền bỉ 24/7"]'::jsonb,
    '[{"question":"Bao nhiêu thang máy cho tòa nhà 20 tầng?","answer":"Phụ thuộc vào mật độ người. Trung bình cần 1 thang cho mỗi 50-70 người, tối thiểu 2 thang cho tòa nhà trên 10 tầng."},{"question":"Thang máy tốc độ cao có an toàn không?","answer":"Có. Thang máy tốc độ cao được trang bị hệ thống phanh đa lớp, bộ điều tốc độc lập và cảm biến an toàn đầy đủ theo chuẩn EN 81."},{"question":"Chi phí bảo trì hàng năm khoảng bao nhiêu?","answer":"Chi phí bảo trì khoảng 8-15 triệu/tháng cho một thang máy, tùy vào số lượng tầng và điều kiện vận hành."},{"question":"Có tích hợp được với hệ thống BMS không?","answer":"Có. Thang máy của chúng tôi hỗ trợ giao thức giao tiếp chuẩn, dễ dàng tích hợp với hệ thống quản lý tòa nhà."}]'::jsonb,
    '["landmark-office","vinmec-times-city"]'::jsonb
  ) ON CONFLICT (slug) DO NOTHING;
INSERT INTO products (slug, title, subtitle, image, short_description, full_description, features, specifications, benefits, faqs, related_projects) VALUES (
    'thang-may-tai-hang',
    'Thang Máy Tải Hàng',
    'Giải pháp vận chuyển hàng hóa công nghiệp',
    'https://images.pexels.com/photos/3557590/pexels-photo-3557590.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    'Thang máy chuyên dụng cho nhà kho, nhà máy sản xuất, bệnh viện với tải trọng lớn và sàn cabin chịu lực cao.',
    'Thang máy tải hàng Hải Phát được thiết kế chuyên biệt cho các nhu cầu vận chuyển hàng hóa trong nhà kho, nhà xưởng, bệnh viện. Với sàn cabin bằng thép chịu lực hoặc gạch granit dày, hệ thống cửa chắn gờ chắc chắn, tải trọng từ 1000kg đến 5000kg.

Dòng thang tải hàng có thể tùy chỉnh theo nhu cầu đặc biệt: thang chở xe đẩy, thang tải ô tô, thang chuyên dụng cho bệnh viện với kích thước cabin lớn để vận chuyển giường bệnh.',
    '["Sàn cabin chịu lực cao","Cửa chắn gờ 2 lớp","Tải trọng lên đến 5000kg","Điều khiển từ cabin","Hệ thống cân bằng tự động","Chống rung êm ái","An toàn quá tải","Dễ vệ sinh sàn"]'::jsonb,
    '[{"label":"Tải trọng","value":"1000kg - 5000kg"},{"label":"Tốc độ","value":"0.25 - 1.0 m/s"},{"label":"Kích thước cabin","value":"Tùy chỉnh theo nhu cầu"},{"label":"Sàn cabin","value":"Thép / Gạch granit dày"},{"label":"Cửa","value":"Cửa kéo / Cửa mở tay"},{"label":"Động cơ","value":"AC 3 pha, 380V"},{"label":"Bảo hành","value":"3 năm thiết bị"},{"label":"Bảo trì","value":"2 tháng/lần trong BH"}]'::jsonb,
    '["Vận chuyển hàng nặng dễ dàng","Tăng năng suất kho bãi","An toàn cho người và hàng","Tiết kiệm chi phí nhân công","Vận hành bền bỉ 24/7","Dễ dàng tích hợp hệ thống"]'::jsonb,
    '[{"question":"Thang tải hàng khác thang tải khách thế nào?","answer":"Thang tải hàng có sàn chịu lực cao, tốc độ chậm hơn, cửa chắn gờ và không có yêu cầu thẩm mỹ nội thất."},{"question":"Có chở được xe tải không?","answer":"Có dòng thang tải ô tô chuyên dụng với tải trọng 3000-5000kg và kích thước cabin đủ cho xe bán tải."},{"question":"Bảo trì thang tải hàng khác gì thang thường?","answer":"Bảo trì tập trung vào các chi tiết chịu lực: cáp, rulo, ray dẫn hướng, thay thế định kỳ theo khuyến nghị."},{"question":"Thang tải hàng chạy 24/7 được không?","answer":"Có với dòng công nghiệp. Thang được thiết kế vận hành liên tục với hệ thống làm mát motor riêng."}]'::jsonb,
    '["vinmec-times-city"]'::jsonb
  ) ON CONFLICT (slug) DO NOTHING;
INSERT INTO products (slug, title, subtitle, image, short_description, full_description, features, specifications, benefits, faqs, related_projects) VALUES (
    'thang-may-quan-sat',
    'Thang Máy Quan Sát',
    'Thang máy kính toàn cảnh cho kiến trúc nổi bật',
    'https://images.pexels.com/photos/32260201/pexels-photo-32260201.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    'Thang máy kính toàn cảnh lắp ngoài công trình, mang lại điểm nhấn kiến trúc độc đáo và trải nghiệm thị giác ấn tượng cho người sử dụng.',
    'Thang máy quan sát Hải Phát được thiết kế với cabin kính toàn cảnh, lắp đặt bên ngoài các công trình cao tầng như khách sạn, trung tâm thương mại, tòa nhà văn phòng và các công trình biểu tượng. Với tầm nhìn 360 độ, thang máy quan sát không chỉ là phương tiện di chuyển mà còn là một điểm nhấn kiến trúc độc đáo, nâng tầm giá trị thẩm mỹ cho công trình.

Cabin kính được chế tạo từ kính cường lực an toàn đa lớp, chịu được chênh lệch áp suất và điều kiện thời tiết khắc nghiệt. Hệ thống dẫn hướng và đối trọng được bố trí khéo léo để không cản trở tầm nhìn, kết hợp với hệ thống chiếu sáng LED tạo hiệu ứng ánh sáng ấn tượng về đêm.',
    '["Cabin kính cường lực toàn cảnh 360°","Kính an toàn đa lớp dày 12mm+","Hệ thống chiếu sáng LED trang trí","Đối trọng ẩn không cản tầm nhìn","Vận hành êm ái, chống rung","Chống tia UV, cách nhiệt","Thiết kế chịu điều kiện thời tiết","Hiệu ứng ánh sáng ban đêm"]'::jsonb,
    '[{"label":"Tải trọng","value":"630kg - 1600kg (8-21 người)"},{"label":"Tốc độ","value":"1.0 - 2.5 m/s"},{"label":"Số tầng","value":"Tối đa 40 tầng"},{"label":"Kính cabin","value":"Kính cường lực dày 12-19mm"},{"label":"Kiểu lắp","value":"Ngoài công trình / Trong atrium"},{"label":"Điện áp","value":"380V, 50Hz"},{"label":"Bảo hành","value":"18 tháng toàn bộ"},{"label":"Bảo trì","value":"2 tháng/lần trong BH"}]'::jsonb,
    '["Tăng giá trị thẩm mỹ công trình","Điểm nhấn kiến trúc độc đáo","Trải nghiệm thị giác ấn tượng","Thu hút khách hàng, tăng doanh thu","Tối ưu ánh sáng tự nhiên","Nâng tầm thương hiệu tòa nhà"]'::jsonb,
    '[{"question":"Thang kính có an toàn khi gặp sự cố không?","answer":"Có. Kính cường lực đa lớp chịu lực cao, không vỡ thành mảnh nhọn. Thang còn có hệ thống phanh khẩn cấp và bộ điều tốc độc lập."},{"question":"Thang quan sát lắp ngoài có bị ảnh hưởng thời tiết?","answer":"Không. Kính và khung được thiết kế chịu điều kiện thời tiết khắc nghiệt, chống tia UV, cách nhiệt và chống ăn mòn."},{"question":"Có lắp được cho tòa nhà đang hoạt động không?","answer":"Có. Chúng tôi có phương án lắp ngoài công trình không ảnh hưởng đến hoạt động bên trong, thi công nhanh chóng."},{"question":"Bảo trì thang kính có phức tạp hơn không?","answer":"Hơi. Ngoài bảo trì tiêu chuẩn, cần vệ sinh kính định kỳ và kiểm tra độ kín khít, nhưng chi phí không chênh lệch nhiều."}]'::jsonb,
    '["sheraton-da-nang","landmark-office"]'::jsonb
  ) ON CONFLICT (slug) DO NOTHING;
INSERT INTO products (slug, title, subtitle, image, short_description, full_description, features, specifications, benefits, faqs, related_projects) VALUES (
    'thang-may-benh-vien',
    'Thang Máy Bệnh Viện',
    'Thang máy y tế chuyên dụng cho giường bệnh và băng ca',
    'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
    'Thang máy y tế chuyên dụng với cabin rộng, sàn chịu lực cao, vận chuyển giường bệnh, băng ca và thiết bị y tế an toàn, êm ái.',
    'Thang máy bệnh viện Hải Phát được thiết kế chuyên biệt cho các cơ sở y tế như bệnh viện, phòng khám, trung tâm chăm sóc sức khỏe. Với cabin rộng rãi để vận chuyển giường bệnh, băng ca, xe lăn và thiết bị y tế cồng kềnh, sàn cabin chịu lực cao và vận hành êm ái đặc biệt để đảm bảo sự thoải mái cho bệnh nhân.

Thang máy bệnh viện tuân thủ các tiêu chuẩn y tế khắt khe: hệ thống cửa mở rộng để giường bệnh ra vào dễ dàng, chế độ vận hành êm ái đặc biệt giảm tối đa rung động, hệ thống ưu tiên cho ca khẩn cấp, và khả năng tích hợp với hệ thống điều hành trung tâm của bệnh viện.',
    '["Cabin rộng cho giường bệnh & băng ca","Cửa mở rộng êm ái","Sàn chịu lực cao, chống trượt","Vận hành siêu êm cho bệnh nhân","Chế độ ưu tiên ca khẩn cấp","Hệ thống khử khuẩn UV (tùy chọn)","Bảng điều khiển chống khuẩn","Tích hợp hệ thống điều hành bệnh viện"]'::jsonb,
    '[{"label":"Tải trọng","value":"1000kg - 2500kg"},{"label":"Tốc độ","value":"0.5 - 1.6 m/s"},{"label":"Kích thước cabin","value":"Từ 1.4m x 2.4m"},{"label":"Cửa","value":"Mở tự động 2 cánh rộng"},{"label":"Sàn cabin","value":"Gạch chống trượt y tế"},{"label":"Điện áp","value":"380V, 50Hz + UPS dự phòng"},{"label":"Bảo hành","value":"18 tháng thiết bị"},{"label":"Bảo trì","value":"2 tháng/lần trong BH"}]'::jsonb,
    '["Vận chuyển giường bệnh an toàn","Ưu tiên ca khẩn cấp kịp thời","Bệnh nhân thoải mái, ít rung động","Vệ sinh, chống khuẩn dễ dàng","Vận hành liên tục 24/7","Đáp ứng tiêu chuẩn y tế"]'::jsonb,
    '[{"question":"Thang bệnh viện khác thang tải khách thế nào?","answer":"Cabin rộng hơn để chở giường bệnh, cửa mở rộng, sàn chịu lực cao, vận hành êm ái hơn và có chế độ ưu tiên ca khẩn cấp."},{"question":"Có vận chuyển được giường ICU không?","answer":"Có. Cabin được thiết kế rộng đủ cho giường ICU cùng thiết bị y tế đi kèm, với tải trọng từ 1600kg trở lên."},{"question":"Thang có hoạt động khi mất điện không?","answer":"Có. Hệ thống UPS dự phòng và phát điện dự phòng đảm bảo thang vận hành liên tục trong sự cố mất điện."},{"question":"Thời gian phản ứng sự cố là bao lâu?","answer":"Với cơ sở y tế, chúng tôi cam kết phản ứng trong vòng 1 giờ tại nội thành và 2 giờ tại các tỉnh lân cận."}]'::jsonb,
    '["vinmec-times-city"]'::jsonb
  ) ON CONFLICT (slug) DO NOTHING;

-- ==================== SERVICES ====================
INSERT INTO services (slug, title, subtitle, short_description, full_description, highlights, process) VALUES (
    'khao-sat-bao-gia',
    'Khảo Sát - Báo Giá',
    'Khảo sát hiện trạng và báo giá minh bạch',
    'Đội ngũ kỹ sư đến tận công trình khảo sát, đo đạc, đánh giá hiện trạng và cung cấp báo giá chi tiết, minh bạch trong 24 giờ.',
    'Dịch vụ khảo sát và báo giá của Hải Phát là bước đầu tiên trong quy trình cung cấp giải pháp thang máy. Đội ngũ kỹ sư giàu kinh nghiệm sẽ đến tận công trình để khảo sát hiện trạng, đo đạc không gian, đánh giá kết cấu và đề xuất giải pháp phù hợp nhất.

Sau khi khảo sát, chúng tôi cung cấp báo giá chi tiết trong vòng 24 giờ, minh bạch từng hạng mục: thiết bị, vật tư, nhân công, vận hành thử và bảo hành. Không phát sinh chi phí ẩn, cam kết giá tốt nhất thị trường.',
    '["Khảo sát miễn phí trong 48 giờ","Báo giá chi tiết trong 24 giờ","Đo đạc hiện trạng 3D","Đánh giá kết cấu công trình","Đề xuất giải pháp tối ưu","Cam kết không phát sinh chi phí"]'::jsonb,
    '[{"step":1,"title":"Tiếp nhận yêu cầu","description":"Tiếp nhận thông tin qua hotline, website hoặc email. Ghi nhận nhu cầu, loại công trình và vị trí."},{"step":2,"title":"Khảo sát hiện trường","description":"Kỹ sư đến tận nơi đo đạc, đánh giá kết cấu, không gian và điều kiện lắp đặt."},{"step":3,"title":"Phân tích & Đề xuất","description":"Phân tích dữ liệu khảo sát, đề xuất giải pháp kỹ thuật và sản phẩm phù hợp nhất."},{"step":4,"title":"Báo giá chi tiết","description":"Cung cấp báo giá minh bạch từng hạng mục trong vòng 24 giờ sau khảo sát."}]'::jsonb
  ) ON CONFLICT (slug) DO NOTHING;
INSERT INTO services (slug, title, subtitle, short_description, full_description, highlights, process) VALUES (
    'tu-van-thiet-ke',
    'Tư Vấn - Thiết Kế',
    'Tư vấn giải pháp và thiết kế kỹ thuật chuyên sâu',
    'Tư vấn lựa chọn loại thang phù hợp, thiết kế bản vẽ kỹ thuật 2D/3D, phối cảnh cabin và bố trí giếng thang tối ưu.',
    'Dịch vụ tư vấn và thiết kế của Hải Phát giúp khách hàng lựa chọn giải pháp thang máy tối ưu cho công trình. Đội ngũ kỹ sư và kiến trúc sư sẽ tư vấn về loại thang, tải trọng, tốc độ, cabin và nội thất phù hợp với nhu cầu và ngân sách.

Sau khi thống nhất giải pháp, chúng tôi thiết kế bản vẽ kỹ thuật chi tiết 2D/3D, phối cảnh cabin, bố trí giếng thang và máy phòng. Thiết kế tuân thủ tiêu chuẩn QCVN 06:2022 và EN 81, đảm bảo an toàn và thẩm mỹ.',
    '["Tư vấn loại thang & tải trọng phù hợp","Bản vẽ kỹ thuật 2D/3D chi tiết","Phối cảnh cabin & nội thất","Bố trí giếng thang tối ưu","Tuân thủ QCVN 06:2022 & EN 81","Thiết kế tối ưu chi phí"]'::jsonb,
    '[{"step":1,"title":"Tư vấn giải pháp","description":"Phân tích nhu cầu, ngân sách và đặc điểm công trình để đề xuất loại thang phù hợp."},{"step":2,"title":"Thiết kế kỹ thuật","description":"Thiết kế bản vẽ 2D/3D chi tiết: giếng thang, máy phòng, cabin, hệ thống điện."},{"step":3,"title":"Phối cảnh nội thất","description":"Thiết kế phối cảnh cabin với nhiều lựa chọn vật liệu và phong cách nội thất."},{"step":4,"title":"Duyệt & Hoàn thiện","description":"Trình duyệt thiết kế, chỉnh sửa theo ý kiến khách hàng và hoàn thiện bản vẽ thi công."}]'::jsonb
  ) ON CONFLICT (slug) DO NOTHING;
INSERT INTO services (slug, title, subtitle, short_description, full_description, highlights, process) VALUES (
    'thi-cong-lap-dat',
    'Thi Công - Lắp Đặt',
    'Thi công lắp đặt chuyên nghiệp, đúng tiến độ',
    'Đội ngũ kỹ thuật được đào tạo bài bản, thi công lắp đặt theo tiêu chuẩn quốc tế, đúng tiến độ cam kết, không ảnh hưởng công trình.',
    'Dịch vụ thi công và lắp đặt của Hải Phát được thực hiện bởi đội ngũ kỹ thuật được đào tạo bài bản, có chứng chỉ từ các nhà sản xuất hàng đầu. Chúng tôi thi công theo tiêu chuẩn QCVN 06:2022 và EN 81, đảm bảo an toàn tuyệt đối.

Quá trình thi công được quản lý chặt chẽ, đúng tiến độ cam kết, không gây ảnh hưởng đến hoạt động của công trình. Vận hành thử, hiệu chỉnh và kiểm định trước khi bàn giao, đảm bảo thang vận hành êm ái và an toàn.',
    '["Đội ngũ kỹ thuật có chứng chỉ","Thi công theo chuẩn QCVN & EN 81","Đúng tiến độ cam kết","Không ảnh hưởng công trình","Vận hành thử & hiệu chỉnh","Kiểm định trước khi bàn giao"]'::jsonb,
    '[{"step":1,"title":"Chuẩn bị thi công","description":"Chuẩn bị vật tư, thiết bị, lập kế hoạch thi công và bảo vệ khu vực làm việc."},{"step":2,"title":"Lắp đặt kết cấu","description":"Lắp đặt khung giếng, ray dẫn hướng, đối trọng và hệ thống điện theo bản vẽ."},{"step":3,"title":"Lắp cabin & Thiết bị","description":"Lắp cabin, cửa tầng, motor, bảng điều khiển và hệ thống an toàn."},{"step":4,"title":"Vận hành thử & Bàn giao","description":"Vận hành thử, hiệu chỉnh, kiểm định và bàn giao cho khách hàng."}]'::jsonb
  ) ON CONFLICT (slug) DO NOTHING;
INSERT INTO services (slug, title, subtitle, short_description, full_description, highlights, process) VALUES (
    'bao-hanh-bao-tri',
    'Bảo Hành - Bảo Trì',
    'Bảo hành 18 tháng và bảo trì định kỳ 2 tháng/lần',
    'Bảo hành 18 tháng toàn bộ thiết bị, bảo trì định kỳ miễn phí 2 tháng/lần trong thời gian bảo hành, hỗ trợ kỹ thuật 24/7, phản ứng sự cố trong 2 giờ.',
    'Dịch vụ bảo hành và bảo trì của Hải Phát cam kết mang lại sự an tâm tuyệt đối cho khách hàng. Bảo hành 18 tháng toàn bộ thiết bị, bảo trì định kỳ miễn phí 2 tháng/lần trong suốt thời gian bảo hành.

Đội ngũ kỹ thuật túc trực 24/7, phản ứng sự cố trong vòng 2 giờ tại nội thành. Cung cấp phụ tùng chính hãng với giá cạnh tranh, kho phụ tùng luôn sẵn các linh kiện thông dụng để đảm bảo thang vận hành ổn định.',
    '["Bảo hành 18 tháng toàn bộ thiết bị","Bảo trì miễn phí 2 tháng/lần trong thời gian bảo hành","Hỗ trợ kỹ thuật 24/7","Phản ứng sự cố trong 2 giờ","Phụ tùng chính hãng, giá cạnh tranh","Kiểm định định kỳ hàng năm"]'::jsonb,
    '[{"step":1,"title":"Ký hợp đồng bảo trì","description":"Ký hợp đồng bảo trì với gói dịch vụ phù hợp: tiêu chuẩn, nâng cao hoặc cao cấp."},{"step":2,"title":"Bảo trì định kỳ","description":"Bảo trì định kỳ mỗi 2 tháng, kiểm tra toàn bộ hệ thống, vệ sinh và bôi trơn."},{"step":3,"title":"Xử lý sự cố","description":"Tiếp nhận sự cố 24/7, phản ứng trong 2 giờ, xử lý nhanh chóng và chuyên nghiệp."},{"step":4,"title":"Kiểm định hàng năm","description":"Phối hợp đơn vị kiểm định, bảo trì và cấp chứng nhận theo quy định pháp luật."}]'::jsonb
  ) ON CONFLICT (slug) DO NOTHING;


