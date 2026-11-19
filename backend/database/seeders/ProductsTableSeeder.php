<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        \DB::table('products')->delete();
        
        \DB::table('products')->insert(array (
            0 => 
            array (
                'id' => '5a0c4a0a-aa1f-4ad6-a564-eec5e2a4121e',
                'title' => 'Thang máy hố xây gia đình',
                'subtitle' => 'Giải pháp tối ưu cho nhà phố, biệt thự và công trình nhiều tầng',
                'icon' => 'building',
                'image' => 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435936672-mrkll2obexe.png',
                'short_description' => 'Hải Phát lắp thang máy hố xây tải 350–650 kg, cabin gia công theo kích thước hố thật của từng nhà.',
                'full_description' => 'Thang máy hố xây Hải Phát là giải pháp vận chuyển tối ưu cho các công trình xây mới, nhà phố, biệt thự và các công trình thương mại với giếng thang đổ cột bê tông và tường gạch kiên cố. Kết cấu bền bỉ trọn đời, tối ưu hóa kích thước cabin lớn nhất trong lòng hố, vận hành êm ái và an toàn tuyệt đối.',
                'features' => '["Tốc độ vận hành đa dạng", "Hệ thống nhóm thông minh", "Màn hình LCD 10\\" - 21\\"", "Nội thất gỗ/inox cao cấp", "Hệ thống dự báo tầng", "Chống rung vận hành êm", "Chế độ tiết kiệm điện", "Kết nối BMS tòa nhà"]',
                'gallery' => '["https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435953008-q97eevv5tcd.png", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435962214-72uzkf3hnhs.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435966649-c396d01fzmh.png", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435970972-h23t68qhoee.png"]',
                'specifications' => '[{"label": "Số tầng tối đa", "value": "9 tầng"}, {"label": "Tải trọng", "value": "350 - 650 kg"}, {"label": "Kích thước cabin", "value": "Hố từ 1300×1300 mm"}, {"label": "Công suất", "value": "1.0 - 1.5 m/s"}, {"label": "Bảo hành", "value": "18 tháng"}, {"label": "Bảo trì", "value": "2 tháng/lần"}]',
                'benefits' => '["Tăng năng suất vận chuyển", "Giảm thời gian chờ đợi", "An toàn tuyệt đối cho người dùng", "Tiết kiệm chi phí vận hành", "Dễ dàng tích hợp BMS", "Vận hành bền bỉ 24/7"]',
                'faqs' => '[{"answer": "Giá khởi điểm từ 290 triệu đồng cho nhà 3 tầng, cabin inox tiêu chuẩn.", "question": "Chi phí thang máy hố xây như thế nào?"}]',
                'related_projects' => '["landmark-office", "vinmec-times-city"]',
                'sort_order' => 1,
                'is_published' => 1,
                'created_at' => '2026-07-16 07:48:21',
                'updated_at' => '2026-10-15 16:16:19',
            ),
            1 => 
            array (
                'id' => 'f4920e71-6a1e-4ca7-a50d-6efd7a5dadda',
                'title' => 'Thang máy khung thép vách kính',
                'subtitle' => 'Đón trọn ánh sáng tự nhiên qua giếng trời, thẩm mỹ sang trọng',
                'icon' => 'home',
                'image' => 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786423677456-x93ehnbq5h.png',
                'short_description' => 'Thang máy kính hố thép định hình, cabin 4 mặt kính cường lực đón trọn ánh sáng tự nhiên qua giếng trời.',
                'full_description' => 'Thang máy khung thép vách kính Hải Phát là sự kết hợp hoàn mỹ giữa kỹ thuật cơ khí chính xác và nghệ thuật kiến trúc hiện đại, nâng tầm đẳng cấp không gian sống cho gia chủ. Kết cấu khung thép định hình chịu lực cao kết hợp 4 mặt kính cường lực an toàn trong suốt mở ra tầm nhìn Panorama 360 độ thoáng đãng.',
                'features' => '["Cabin kính cường lực cao cấp", "Cửa mở tự động êm ái", "Hệ thống an toàn đa điểm", "Vận hành siêu êm < 45dB", "Đèn LED tiết kiệm điện", "Màn hình hiển thị tầng số", "Hệ thống báo động tự động", "Chống quá tải thông minh"]',
                'gallery' => '["https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786423681161-qenl4co6hv.png", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786423685133-hpycnsw9stp.png", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786423692032-5i0hisx4uya.png"]',
                'specifications' => '[{"label": "Số tầng tối đa", "value": "6 tầng"}, {"label": "Tải trọng", "value": "350 - 650 kg"}, {"label": "Đặc tính", "value": "Kính an toàn 2 lớp"}, {"label": "Vị trí lắp", "value": "Trong nhà & giếng trời"}, {"label": "Thời gian lắp", "value": "Lắp đặt 5–7 ngày"}, {"label": "Bảo hành", "value": "18 tháng"}]',
                'benefits' => '["Tăng giá trị bất động sản lên 15-20%", "Tiện lợi cho người già và trẻ nhỏ", "Không gian sang trọng, đẳng cấp"]',
                'faqs' => '[{"answer": "Giá trọn gói từ 380 triệu đồng cho nhà 2 tầng bao gồm khung thép định hình và vách kính.", "question": "Giá thang khung thép vách kính từ bao nhiêu?"}]',
                'related_projects' => '["villa-ecopark", "house-thao-dien"]',
                'sort_order' => 2,
                'is_published' => 1,
                'created_at' => '2026-07-16 07:48:21',
                'updated_at' => '2026-10-15 16:16:19',
            ),
            2 => 
            array (
                'id' => '0857710f-a18b-474c-a736-9ff60cf39642',
                'title' => 'Thang máy không hố pit (thang máy mini)',
                'subtitle' => 'Hố PIT siêu nông từ 200mm – dòng thang cứu cánh cho nhà cải tạo',
                'icon' => 'home',
                'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
                'short_description' => 'Thang máy không hố pit – còn gọi là thang máy nhỏ gọn – là dòng thang cứu cánh cho nhà cải tạo đang ở.',
                'full_description' => 'Thang máy gia đình Homelift mini Hải Phát được thiết kế chuyên biệt cho các công trình nhà ở gia đình, biệt thự, nhà phố với hố pit chỉ từ 200mm, không cần đào móng bè.',
                'features' => '["Không cần phòng máy cồng kềnh", "Hố PIT siêu nông chỉ từ 200mm", "Động cơ Gearless tiết kiệm 40% điện", "Vận hành siêu êm ái < 45dB"]',
                'gallery' => '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80"]',
                'specifications' => '[{"label": "Hố PIT", "value": "Hố pit chỉ từ 200 mm"}, {"label": "Hiện trạng", "value": "Nhà đã hoàn thiện"}, {"label": "Nguồn điện", "value": "Điện 1 pha 220V"}, {"label": "Tải trọng", "value": "250kg - 450kg (3 - 6 người)"}]',
                'benefits' => '["Tăng giá trị bất động sản", "Thuận tiện di chuyển cho người lớn tuổi", "An toàn tuyệt đối chuẩn Châu Âu"]',
                'faqs' => '[{"answer": "Giá thang homelift mini không hố pit khởi điểm từ 320 triệu đồng.", "question": "Giá thang máy mini bao nhiêu?"}]',
                'related_projects' => NULL,
                'sort_order' => 3,
                'is_published' => 1,
                'created_at' => '2026-10-09 08:44:20',
                'updated_at' => '2026-10-09 08:46:03',
            ),
            3 => 
            array (
                'id' => '9534651f-b83f-49c0-8cb2-6efea1f0017e',
                'title' => 'Thang máy tải khách & tải hàng công nghiệp',
                'subtitle' => 'Tải trọng lớn cho nhà xưởng, showroom, văn phòng và khách sạn',
                'icon' => 'building',
                'image' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
                'short_description' => 'Giải pháp di chuyển chuyên nghiệp, tải trọng lớn cho nhà xưởng, showroom, văn phòng và khách sạn.',
                'full_description' => 'Dòng thang máy tải khách và hàng hóa tiêu chuẩn quốc tế dành cho cao ốc, văn phòng, nhà xưởng công nghiệp.',
                'features' => '["Tốc độ cao từ 1.0m/s đến 2.5m/s", "Hệ điều khiển vi xử lý 32-bit thông minh", "Tiết kiệm năng lượng chuẩn A+++"]',
                'gallery' => '["https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80"]',
                'specifications' => '[{"label": "Tải trọng", "value": "Tải 500 - 3.000kg"}, {"label": "Lưu lượng", "value": "Lưu thông lớn"}, {"label": "Tiêu chuẩn", "value": "Tiêu chuẩn quốc tế"}]',
                'benefits' => '["Tối ưu thời gian chờ đợi", "Tiết kiệm chi phí bảo trì lâu dài"]',
                'faqs' => '[{"answer": "Chi phí thang máy tải khách & hàng công nghiệp từ 320 triệu đồng.", "question": "Giá thang máy tải khách công nghiệp bao nhiêu?"}]',
                'related_projects' => NULL,
                'sort_order' => 4,
                'is_published' => 1,
                'created_at' => '2026-10-09 08:44:21',
                'updated_at' => '2026-10-09 08:46:03',
            ),
            4 => 
            array (
                'id' => 'a5e0fdd9-d5f4-448f-b74b-b01034da3ec6',
                'title' => 'Thang máy kính quan sát Panorama',
                'subtitle' => 'Nâng tầm đẳng cấp kiến trúc không gian mở 360 độ',
                'icon' => 'eye',
                'image' => 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
                'short_description' => 'Thiết kế 4 mặt kính cường lực trong suốt, mang lại trải nghiệm ngắm nhìn toàn cảnh độc đáo.',
                'full_description' => 'Thang máy kính Panorama là sự kết hợp hoàn hảo giữa công nghệ hiện đại và nghệ thuật kiến trúc. Cabin kính trong suốt mang lại cảm giác thông thoáng, tận dụng tối đa ánh sáng tự nhiên.',
                'features' => '["Kính an toàn 2 lớp cường lực", "Khung hợp kim nhôm Anode hoặc Inox gương vàng", "Đèn LED trần đổi màu ambient", "View 360 độ toàn cảnh"]',
                'gallery' => '["https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"]',
                'specifications' => '[{"label": "Tải trọng", "value": "300kg - 630kg"}, {"label": "Tốc độ", "value": "0.5m/s - 1.0m/s"}, {"label": "Loại kính", "value": "Kính dán an toàn 10.38mm"}]',
                'benefits' => '["Tạo điểm nhấn thị giác đẳng cấp", "Không gian thoáng đãng không bị bí bách"]',
                'faqs' => '[{"answer": "Giá thang máy kính Panorama từ 380 triệu đồng.", "question": "Giá thang máy kính Panorama bao nhiêu?"}]',
                'related_projects' => NULL,
                'sort_order' => 5,
                'is_published' => 1,
                'created_at' => '2026-10-09 08:43:38',
                'updated_at' => '2026-10-09 08:43:38',
            ),
            5 => 
            array (
                'id' => 'cf54fb82-40b2-4800-a9d9-8b43c3fa6aa0',
                'title' => 'Thang máy quan sát ngoài trời',
                'subtitle' => 'Thang máy kính toàn cảnh cho kiến trúc nổi bật',
                'icon' => 'eye',
                'image' => 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786420808857-lsr5o68sgjc.jpg',
                'short_description' => 'Thang máy kính toàn cảnh lắp ngoài công trình, mang lại điểm nhấn kiến trúc độc đáo và trải nghiệm thị giác ấn tượng cho người sử dụng.',
                'full_description' => 'Thang máy quan sát Hải Phát được thiết kế với cabin kính toàn cảnh, lắp đặt bên ngoài các công trình cao tầng như khách sạn, trung tâm thương mại, tòa nhà văn phòng và các công trình biểu tượng.',
                'features' => '["Cabin kính cường lực toàn cảnh 360°", "Kính an toàn đa lớp dày 12mm+", "Hệ thống chiếu sáng LED trang trí", "Đối trọng ẩn không cản tầm nhìn", "Vận hành êm ái, chống rung"]',
                'gallery' => '["https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786421642006-aokmt4tkt19.jpg"]',
                'specifications' => '[{"label": "Số tầng tối đa", "value": "9 tầng"}, {"label": "Tải trọng", "value": "350 - 650 kg"}, {"label": "Kính cabin", "value": "Kính cường lực 10 - 12 mm"}, {"label": "Bảo hành", "value": "18 tháng"}]',
                'benefits' => '["Tăng giá trị thẩm mỹ công trình", "Điểm nhấn kiến trúc độc đáo"]',
                'faqs' => '[{"answer": "Giá thang máy quan sát ngoài trời từ 360 triệu đồng.", "question": "Giá thang máy quan sát ngoài trời bao nhiêu?"}]',
                'related_projects' => '["sheraton-da-nang", "landmark-office"]',
                'sort_order' => 6,
                'is_published' => 1,
                'created_at' => '2026-07-16 07:48:21',
                'updated_at' => '2026-10-15 16:16:19',
            ),
        ));
    }
}
