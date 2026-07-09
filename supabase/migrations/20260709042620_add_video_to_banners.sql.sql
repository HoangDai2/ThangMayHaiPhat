/*
# Thêm hỗ trợ video cho banner

## Mô tả
Bổ sung trường media_type và video_url cho bảng banners để hỗ trợ hiển thị video.

## Thay đổi
- media_type: loại media (image / video), mặc định 'image'
- video_url: URL video (nếu media_type là video)
*/

-- Thêm cột media_type và video_url
ALTER TABLE banners ADD COLUMN IF NOT EXISTS media_type text NOT NULL DEFAULT 'image';
ALTER TABLE banners ADD COLUMN IF NOT EXISTS video_url text NOT NULL DEFAULT '';

-- Thêm check constraint để đảm bảo media_type chỉ nhận 'image' hoặc 'video'
DO $$ 
BEGIN
  -- Xóa constraint cũ nếu tồn tại
  EXECUTE 'ALTER TABLE banners DROP CONSTRAINT IF EXISTS banners_media_type_check';
  -- Thêm constraint mới
  EXECUTE 'ALTER TABLE banners ADD CONSTRAINT banners_media_type_check CHECK (media_type IN (''image'', ''video''))';
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;