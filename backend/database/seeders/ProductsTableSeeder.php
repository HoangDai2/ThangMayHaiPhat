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
                'id' => '0857710f-a18b-474c-a736-9ff60cf39642',
                'title' => 'Thang Máy Gia Đình Homelift',
                'subtitle' => 'Thiết kế tinh gọn, sang trọng cho nhà phố & biệt thự',
                'icon' => 'home',
                'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
                'short_description' => 'Giải pháp di chuyển thông minh, tối ưu diện tích cho không gian sống gia đình hiện đại.',
                'full_description' => 'Thang máy gia đình Homelift Hải Phát được thiết kế chuyên biệt cho các công trình nhà ở gia đình, biệt thự, nhà phố.',
                'features' => '["Không cần phòng máy cồng kềnh", "Hố PIT siêu nông chỉ từ 200mm", "Động cơ Gearless tiết kiệm 40% điện", "Vận hành siêu êm ái < 45dB"]',
                'gallery' => '["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"]',
            'specifications' => '[{"label": "Tải trọng", "value": "250kg - 450kg (3 - 6 người)"}, {"label": "Tốc độ", "value": "0.4m/s - 0.6m/s"}, {"label": "Số tầng phục vụ", "value": "2 - 6 tầng"}, {"label": "Nguồn điện", "value": "1 pha 220V hoặc 3 pha 380V"}]',
                'benefits' => '["Tăng giá trị bất động sản", "Thuận tiện di chuyển cho người lớn tuổi", "An toàn tuyệt đối chuẩn Châu Âu"]',
                'faqs' => '[{"answer": "Có, Hải Phát có giải pháp khung thép kính lắp ngoài trời hoặc giếng trời trong nhà không cần đập phá nhiều.", "question": "Nhà cải tạo có lắp được Homelift không?"}]',
                'related_projects' => NULL,
                'sort_order' => 1,
                'is_published' => 1,
                'created_at' => '2026-10-09 08:44:20',
                'updated_at' => '2026-10-09 08:46:03',
            ),
            1 => 
            array (
                'id' => '5a0c4a0a-aa1f-4ad6-a564-eec5e2a4121e',
                'title' => 'Thang Máy Tải Khách',
                'subtitle' => 'Hiệu suất cao cho tòa nhà văn phòng và chung cư',
                'icon' => '',
                'image' => 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435936672-mrkll2obexe.png',
                'short_description' => 'Giải pháp lý tưởng cho tòa nhà, văn phòng, bệnh viện, khách sạn. Tải trọng lớn, vận hành êm ái, đáp ứng tiêu chuẩn QCVN và EN 81.',
                'full_description' => 'Thang máy tải khách Hải Phát là giải pháp vận chuyển tối ưu cho các công trình thương mại, văn phòng, chung cư cao tầng với lưu lượng người lớn. Với công nghệ điều khiển nhóm thông minh, hệ thống phân bổ luồng người tự động giúp giảm thời gian chờ đợi và tăng hiệu suất vận hành.

Chúng tôi cung cấp các dòng thang từ tốc độ tiêu chuẩn 1.0 m/s đến tốc độ cao 2.5 m/s cho các tòa nhà cao tầng. Thiết kế cabin hiện đại với nhiều lựa chọn nội thất cao cấp, đáp ứng mọi yêu cầu thẩm mỹ khắt khe nhất.',
                'features' => '["Tốc độ vận hành đa dạng", "Hệ thống nhóm thông minh", "Màn hình LCD 10\\" - 21\\"", "Nội thất gỗ/inox cao cấp", "Hệ thống dự báo tầng", "Chống rung vận hành êm", "Chế độ tiết kiệm điện", "Kết nối BMS tòa nhà"]',
                'gallery' => '["https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435953008-q97eevv5tcd.png", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435962214-72uzkf3hnhs.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435966649-c396d01fzmh.png", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786435970972-h23t68qhoee.png"]',
                'specifications' => '[{"label": "Số tầng tối đa ", "value": "9 tầng"}, {"label": "Tải trọng ", "value": "350 - 650 kg"}, {"label": "Kích thước cabin ", "value": "1.100 - 1.200 mm"}, {"label": "Công suất ", "value": "1.0 - 1.5 m/s"}, {"label": "Bảo hành ", "value": "18 tháng"}, {"label": "Bảo trì ", "value": "2 tháng/lần"}]',
                'benefits' => '["Tăng năng suất vận chuyển", "Giảm thời gian chờ đợi", "An toàn tuyệt đối cho người dùng", "Tiết kiệm chi phí vận hành", "Dễ dàng tích hợp BMS", "Vận hành bền bỉ 24/7"]',
                'faqs' => '[{"answer": "Phụ thuộc vào mật độ người. Trung bình cần 1 thang cho mỗi 50-70 người, tối thiểu 2 thang cho tòa nhà trên 10 tầng.", "question": "Bao nhiêu thang máy cho tòa nhà 20 tầng?"}, {"answer": "Có. Thang máy tốc độ cao được trang bị hệ thống phanh đa lớp, bộ điều tốc độc lập và cảm biến an toàn đầy đủ theo chuẩn EN 81.", "question": "Thang máy tốc độ cao có an toàn không?"}, {"answer": "Chi phí bảo trì khoảng 8-15 triệu/tháng cho một thang máy, tùy vào số lượng tầng và điều kiện vận hành.", "question": "Chi phí bảo trì hàng năm khoảng bao nhiêu?"}, {"answer": "Có. Thang máy của chúng tôi hỗ trợ giao thức giao tiếp chuẩn, dễ dàng tích hợp với hệ thống quản lý tòa nhà.", "question": "Có tích hợp được với hệ thống BMS không?"}]',
                'related_projects' => '["landmark-office", "vinmec-times-city"]',
                'sort_order' => 0,
                'is_published' => 1,
                'created_at' => '2026-07-16 07:48:21',
                'updated_at' => '2026-10-15 16:16:19',
            ),
            2 => 
            array (
                'id' => '9534651f-b83f-49c0-8cb2-6efea1f0017e',
                'title' => 'Thang Máy Tải Khách Tòa Nhà',
                'subtitle' => 'Tốc độ cao, tải trọng lớn cho khách sạn, chung cư, văn phòng',
                'icon' => 'building',
                'image' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
                'short_description' => 'Tốc độ cao, tải trọng lớn cho khách sạn, chung cư, văn phòng.',
                'full_description' => 'Dòng thang máy tải khách tiêu chuẩn quốc tế dành cho cao ốc, văn phòng, khách sạn.',
                'features' => '["Tốc độ cao từ 1.0m/s đến 2.5m/s", "Hệ điều khiển vi xử lý 32-bit thông minh", "Tiết kiệm năng lượng chuẩn A+++"]',
                'gallery' => '["https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"]',
            'specifications' => '[{"label": "Tải trọng", "value": "630kg - 1600kg (8 - 21 người)"}, {"label": "Tốc độ", "value": "1.0m/s - 2.5m/s"}, {"label": "Số tầng phục vụ", "value": "Đến 30 tầng"}]',
                'benefits' => '["Tối ưu thời gian chờ đợi", "Tiết kiệm chi phí bảo trì lâu dài"]',
                'faqs' => NULL,
                'related_projects' => NULL,
                'sort_order' => 3,
                'is_published' => 1,
                'created_at' => '2026-10-09 08:44:21',
                'updated_at' => '2026-10-09 08:46:03',
            ),
            3 => 
            array (
                'id' => 'a5e0fdd9-d5f4-448f-b74b-b01034da3ec6',
                'title' => 'Thang Máy Kính Quan Sát Panorama',
                'subtitle' => 'Nâng tầm đẳng cấp kiến trúc không gian mở',
                'icon' => 'eye',
                'image' => 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
                'short_description' => 'Thiết kế 4 mặt kính cường lực trong suốt, mang lại trải nghiệm ngắm nhìn toàn cảnh độc đáo.',
                'full_description' => 'Thang máy kính Panorama là sự kết hợp hoàn hảo giữa công nghệ hiện đại và nghệ thuật kiến trúc. Cabin kính trong suốt mang lại cảm giác thông thoáng, tận dụng tối đa ánh sáng tự nhiên.',
                'features' => '["Kính an toàn 2 lớp cường lực", "Khung hợp kim nhôm Anode hoặc Inox gương vàng", "Đèn LED trần đổi màu ambient", "View 360 độ toàn cảnh"]',
                'gallery' => '["https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"]',
                'specifications' => '[{"label": "Tải trọng", "value": "300kg - 630kg"}, {"label": "Tốc độ", "value": "0.5m/s - 1.0m/s"}, {"label": "Loại kính", "value": "Kính dán an toàn cường lực 10.38mm"}]',
                'benefits' => '["Tạo điểm nhấn thị giác đẳng cấp", "Không gian thoáng đãng không bị bí bách"]',
                'faqs' => NULL,
                'related_projects' => NULL,
                'sort_order' => 2,
                'is_published' => 1,
                'created_at' => '2026-10-09 08:43:38',
                'updated_at' => '2026-10-09 08:43:38',
            ),
            4 => 
            array (
                'id' => 'cf54fb82-40b2-4800-a9d9-8b43c3fa6aa0',
                'title' => 'Thang Máy Quan Sát',
                'subtitle' => 'Thang máy kính toàn cảnh cho kiến trúc nổi bật',
                'icon' => '',
                'image' => 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786420808857-lsr5o68sgjc.jpg',
                'short_description' => 'Thang máy kính toàn cảnh lắp ngoài công trình, mang lại điểm nhấn kiến trúc độc đáo và trải nghiệm thị giác ấn tượng cho người sử dụng.',
                'full_description' => 'Thang máy quan sát Hải Phát được thiết kế với cabin kính toàn cảnh, lắp đặt bên ngoài các công trình cao tầng như khách sạn, trung tâm thương mại, tòa nhà văn phòng và các công trình biểu tượng. Với tầm nhìn 360 độ, thang máy quan sát không chỉ là phương tiện di chuyển mà còn là một điểm nhấn kiến trúc độc đáo, nâng tầm giá trị thẩm mỹ cho công trình.

Cabin kính được chế tạo từ kính cường lực an toàn đa lớp, chịu được chênh lệch áp suất và điều kiện thời tiết khắc nghiệt. Hệ thống dẫn hướng và đối trọng được bố trí khéo léo để không cản trở tầm nhìn, kết hợp với hệ thống chiếu sáng LED tạo hiệu ứng ánh sáng ấn tượng về đêm.',
                'features' => '["Cabin kính cường lực toàn cảnh 360°", "Kính an toàn đa lớp dày 12mm+", "Hệ thống chiếu sáng LED trang trí", "Đối trọng ẩn không cản tầm nhìn", "Vận hành êm ái, chống rung", "Chống tia UV, cách nhiệt", "Thiết kế chịu điều kiện thời tiết", "Hiệu ứng ánh sáng ban đêm"]',
                'gallery' => '["https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786421642006-aokmt4tkt19.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786421645780-n44xqj1gho.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786421649163-r5va8tatx0f.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786421753904-q2lxnvwmbn.jpg"]',
                'specifications' => '[{"label": "Số tầng tối đa ", "value": "9 tầng"}, {"label": "Tải trọng ", "value": "350 - 650 kg"}, {"label": "Kích thước cabin ", "value": "1.100 - 1.200 mm"}, {"label": "Công suất ", "value": "1.0 - 1.5 m/s"}, {"label": "Kính cabin ", "value": "Kính cường lực 10 - 12 mm"}, {"label": "Bảo hành ", "value": "18 tháng"}, {"label": "Bảo trì ", "value": "2 tháng/lần"}]',
                'benefits' => '["Tăng giá trị thẩm mỹ công trình", "Điểm nhấn kiến trúc độc đáo", "Trải nghiệm thị giác ấn tượng", "Thu hút khách hàng, tăng doanh thu", "Tối ưu ánh sáng tự nhiên", "Nâng tầm thương hiệu tòa nhà"]',
                'faqs' => '[{"answer": "Có. Kính cường lực đa lớp chịu lực cao, không vỡ thành mảnh nhọn. Thang còn có hệ thống phanh khẩn cấp và bộ điều tốc độc lập.", "question": "Thang kính có an toàn khi gặp sự cố không?"}, {"answer": "Không. Kính và khung được thiết kế chịu điều kiện thời tiết khắc nghiệt, chống tia UV, cách nhiệt và chống ăn mòn.", "question": "Thang quan sát lắp ngoài có bị ảnh hưởng thời tiết?"}, {"answer": "Có. Chúng tôi có phương án lắp ngoài công trình không ảnh hưởng đến hoạt động bên trong, thi công nhanh chóng.", "question": "Có lắp được cho tòa nhà đang hoạt động không?"}, {"answer": "Hơi. Ngoài bảo trì tiêu chuẩn, cần vệ sinh kính định kỳ và kiểm tra độ kín khít, nhưng chi phí không chênh lệch nhiều.", "question": "Bảo trì thang kính có phức tạp hơn không?"}]',
                'related_projects' => '["sheraton-da-nang", "landmark-office"]',
                'sort_order' => 0,
                'is_published' => 1,
                'created_at' => '2026-07-16 07:48:21',
                'updated_at' => '2026-10-15 16:16:19',
            ),
            5 => 
            array (
                'id' => 'f4920e71-6a1e-4ca7-a50d-6efd7a5dadda',
                'title' => 'Thang Máy Gia Đình',
                'subtitle' => 'Giải pháp thang máy cao cấp cho không gian sống',
                'icon' => 'home',
                'image' => 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786423677456-x93ehnbq5h.png',
                'short_description' => 'Thiết kế sang trọng, tối ưu không gian. Phù hợp với nhà phố, biệt thự với cabin kính toàn phần hoặc inox mờ cao cấp.',
                'full_description' => 'Thang máy khung thép vách kính Hải Phát là sự kết hợp hoàn mỹ giữa kỹ thuật cơ khí chính xác và nghệ thuật kiến trúc hiện đại, nâng tầm đẳng cấp không gian sống cho gia chủ. Kết cấu khung thép định hình chịu lực cao kết hợp 4 mặt kính cường lực an toàn trong suốt mở ra tầm nhìn Panorama 360 độ thoáng đãng, tận dụng tối đa ánh sáng tự nhiên từ giếng trời để ngôi nhà luôn ngập tràn sinh khí. Cabin được cá nhân hóa linh hoạt theo phong cách nội thất riêng biệt: từ kính màu trà sang trọng, inox sọc nhuyễn mạ PVD vàng ánh kim cho đến sàn đá hoa cương cao cấp.

Trang bị công nghệ động cơ không hộp số đồng bộ nam châm vĩnh cửu cùng hệ biến tần điều khiển thông minh, thang vận hành êm ái vượt trội với độ ồn dưới 45dB và tiết kiệm đến 40% điện năng tiêu thụ. Giải pháp hố PIT siêu nông chỉ từ 600mm không chạm vào móng bè hay hệ thống ngầm, cùng công nghệ lắp dựng khung thép module bu-lông sạch sẽ chỉ từ 5–7 ngày, giúp tối ưu diện tích và không làm gián đoạn sinh hoạt của gia đình. Hệ thống an toàn đa tầng chuẩn Châu Âu (cứu hộ tự động ARD khi mất điện, mành cảm quang chống kẹt cửa) mang lại sự an tâm tuyệt đối cho mọi thế hệ thành viên.',
                'features' => '["Cabin kính cường lực cao cấp", "Cửa mở tự động êm ái", "Hệ thống an toàn đa điểm", "Vận hành siêu êm < 45dB", "Đèn LED tiết kiệm điện", "Màn hình hiển thị tầng số", "Hệ thống báo động tự động", "Chống quá tải thông minh"]',
                'gallery' => '["https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786423681161-qenl4co6hv.png", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786423685133-hpycnsw9stp.png", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1786423692032-5i0hisx4uya.png"]',
                'specifications' => '[{"label": "Số tầng tối đa ", "value": "6 tầng"}, {"label": "Tải trọng  ", "value": "250 - 450 kg"}, {"label": "Kích thước cabin ", "value": "900 - 1000 mm"}, {"label": "Công suất ", "value": "2.2 - 3.0 m/s"}, {"label": "Bảo hành ", "value": "18 tháng"}, {"label": "Bảo trì ", "value": "2 tháng/lần"}]',
                'benefits' => '["Tăng giá trị bất động sản lên 15-20%", "Tiện lợi cho người già và trẻ nhỏ", "Vận chuyển đồ đạc dễ dàng", "Không gian sang trọng, đẳng cấp", "Tiết kiệm thời gian di chuyển", "An toàn với hệ thống đa lớp"]',
                'faqs' => '[{"answer": "Có thể. Chúng tôi có các dòng Homelift mini với kích thước cabin chỉ từ 1.0m x 1.2m, phù hợp với nhà phố nhỏ.", "question": "Nhà tôi diện tích nhỏ, có lắp được thang máy không?"}, {"answer": "Từ 7-14 ngày làm việc tùy theo độ phức tạp của công trình và điều kiện hiện trạng.", "question": "Thời gian lắp đặt mất bao lâu?"}, {"answer": "Không. Thang tiêu thụ khoảng 2-5 kWh/ngày, tương đương chi phí 5,000-12,000 VND/ngày.", "question": "Thang Homelift tốn nhiều điện không?"}, {"answer": "Bảo hành 18 tháng toàn bộ thiết bị, bảo trì miễn phí 2 tháng/lần trong thời gian bảo hành, hỗ trợ kỹ thuật 24/7.", "question": "Bảo hành như thế nào?"}]',
                'related_projects' => '["villa-ecopark", "house-thao-dien"]',
                'sort_order' => 0,
                'is_published' => 1,
                'created_at' => '2026-07-16 07:48:21',
                'updated_at' => '2026-10-15 16:16:19',
            ),
        ));
        
        
    }
}