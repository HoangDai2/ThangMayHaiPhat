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
