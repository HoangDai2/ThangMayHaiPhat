CREATE TABLE IF NOT EXISTS promotions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    discount_text TEXT,
    description TEXT,
    button_text TEXT,
    button_link TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

-- Policies for promotions
CREATE POLICY "anon_select_promotions" ON promotions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anon_insert_promotions" ON promotions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_update_promotions" ON promotions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_promotions" ON promotions FOR DELETE TO anon, authenticated USING (true);

-- Insert default promotion data
INSERT INTO promotions (title, subtitle, discount_text, description, button_text, button_link, is_active)
VALUES (
    'ƯU ĐÃI THÁNG VÀNG',
    'Cơ hội vàng rinh ngàn ưu đãi cùng Thang máy Hải Phát',
    '10%',
    'Dành riêng cho 10 khách hàng đầu tiên đăng ký lắp đặt thang máy gia đình trong tháng này. Miễn phí khảo sát và tư vấn tận nơi!',
    'Nhận Ưu Đãi',
    '#contact',
    true
)
ON CONFLICT DO NOTHING;
