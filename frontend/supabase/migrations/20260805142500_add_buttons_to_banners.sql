/*
# Thêm các trường cho nút bấm tùy chỉnh trên Banner

## Mô tả
Bổ sung các trường để lưu trữ text và link cho 2 nút bấm trên banner:
- primary_button_text: Text cho nút chính (VD: Tư vấn miễn phí)
- primary_button_link: Link cho nút chính
- secondary_button_text: Text cho nút phụ (VD: Xem dự án)
- secondary_button_link: Link cho nút phụ
*/

-- ==================== BANNERS ====================
CREATE TABLE IF NOT EXISTS banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  link_url text NOT NULL DEFAULT '',
  position text NOT NULL DEFAULT 'hero',
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  media_type text NOT NULL DEFAULT 'image',
  video_url text NOT NULL DEFAULT '',
  primary_button_text text NOT NULL DEFAULT 'Tư vấn miễn phí',
  primary_button_link text NOT NULL DEFAULT '#contact',
  secondary_button_text text NOT NULL DEFAULT 'Xem dự án',
  secondary_button_link text NOT NULL DEFAULT '#projects',
  created_at timestamptz DEFAULT now()
);

-- Cho phép truy cập bảng (Row Level Security)
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_banners" ON banners;
CREATE POLICY "anon_select_banners" ON banners FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_banners" ON banners;
CREATE POLICY "anon_insert_banners" ON banners FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_banners" ON banners;
CREATE POLICY "anon_update_banners" ON banners FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_banners" ON banners;
CREATE POLICY "anon_delete_banners" ON banners FOR DELETE TO anon, authenticated USING (true);

-- Đề phòng bảng đã tồn tại từ trước nhưng thiếu các cột mới:
ALTER TABLE banners ADD COLUMN IF NOT EXISTS description text NOT NULL DEFAULT '';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS media_type text NOT NULL DEFAULT 'image';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS video_url text NOT NULL DEFAULT '';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS primary_button_text text NOT NULL DEFAULT 'Tư vấn miễn phí';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS primary_button_link text NOT NULL DEFAULT '#contact';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS secondary_button_text text NOT NULL DEFAULT 'Xem dự án';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS secondary_button_link text NOT NULL DEFAULT '#projects';

-- Thêm 1 dữ liệu mẫu (chỉ thêm nếu bảng chưa có dữ liệu nào)
INSERT INTO banners (title, subtitle, description, image_url, link_url, position, sort_order, is_active, media_type, video_url, primary_button_text, primary_button_link, secondary_button_text, secondary_button_link)
SELECT 
  'Giải Pháp Thang Máy Hiện Đại & Uy Tín', 
  'Chất lượng khẳng định thương hiệu', 
  'Chuyên lắp đặt thang máy gia đình và thang máy tải khách cao cấp. Chúng tôi mang đến sự an toàn, sang trọng và đẳng cấp cho không gian sống của bạn.', 
  'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80', 
  '', 
  'hero', 
  1, 
  true, 
  'image', 
  '', 
  'Tư vấn miễn phí', 
  '#contact', 
  'Xem dự án', 
  '#projects'
WHERE NOT EXISTS (SELECT 1 FROM banners);
