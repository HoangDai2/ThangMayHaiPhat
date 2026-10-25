<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ProjectsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('projects')->delete();
        
        \DB::table('projects')->insert(array (
            0 => 
            array (
                'id' => '02626f9e-7d63-44d6-9377-3dea44d1afad',
                'slug' => 'lam-thao-phu-tho',
                'title' => 'Công trình thang máy tại Lâm Thao - Phú Thọ',
                'location' => 'Lâm Thao - Phú Thọ',
                'category' => 'Thang Máy Tải Khách',
                'image' => 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1787539827277-ohroiza4m39.jpg',
                'specs' => 'Thang máy tải khách ~ 5 tầng',
                'description' => '📍 DẤU ẤN SANG TRỌNG – CÔNG TRÌNH THANG MÁY TẠI LÂM THAO
Không chỉ đơn thuần là phương tiện di chuyển, một chiếc thang máy được thiết kế chỉn chu còn góp phần tạo nên “chất riêng” cho cả không gian.
Tại công trình Lâm Thao, từng chi tiết được đầu tư đồng bộ: từ ngoại thất, cửa tầng đến cabin thang máy với sắc vàng sang trọng, họa tiết trang trí nổi bật và hệ thống đèn tạo điểm nhấn. ✨
Đặc biệt, phần cabin được chăm chút kỹ lưỡng để khi bước vào thang, người dùng không chỉ cảm nhận sự tiện lợi mà còn thấy được sự tinh tế trong từng chi tiết.
🏡 Phù hợp cho nhà ở, biệt thự, khách sạn, nhà hàng và các công trình kinh doanh.
⚙️ Thiết kế theo nhu cầu – tối ưu công năng – đồng bộ với kiến trúc.
🛠️ Tư vấn, lắp đặt và bảo trì thang máy trọn gói.
Một công trình đẹp không chỉ nằm ở bên ngoài – mà còn ở cách từng chi tiết được hoàn thiện.',
                'floors' => 5,
                'capacity' => '450 kg',
                'speed' => '1 m/s',
                'brand' => 'Fuji',
                'completion_date' => '03/08/2025',
                'warranty' => '18 tháng',
                'features' => '[]',
                'gallery' => '["https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1787553507314-dl1gk2wl6h.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1787553526761-26g4ta6bpot.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1787553526761-qwc2n8rpq3i.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1787553526761-sxq59o184r.jpg"]',
                'testimonial' => NULL,
                'created_at' => '2026-08-24 02:00:07',
                'updated_at' => '2026-10-15 16:12:43',
            ),
            1 => 
            array (
                'id' => '0ab0ac2e-46e0-4c62-8a75-8e74c3430bb1',
                'slug' => 'ngoc-truc-dai-mo',
                'title' => 'Công trình thang máy Ngọc Trục - Đại Mỗ',
                'location' => 'Nam Từ Liêm - Hà Nội',
                'category' => 'Thang Máy Tải Khách',
                'image' => 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789530868902-53hcnypj45f.jpg',
                'specs' => 'Tháng máy tải khách ~ 4 tầng',
                'description' => '🛗 THANG MÁY XÂY  TẠI NGỌC TRỤC – ĐẠI MỖ
Một diện mạo sang trọng, nổi bật với đá vân tự nhiên kết hợp inox gương, tạo nên điểm nhấn tinh tế ngay từ khu vực sảnh thang máy. ✨
Từng chi tiết được hoàn thiện chỉn chu, hài hòa với không gian công trình — đẹp từ bên ngoài, tiện nghi từ bên trong.
📍 Công trình: Ngọc Trục – Đại Mỗ
🔧 Thang máy Hải Phát – Chất lượng khẳng định thương hiệu.',
                'floors' => 4,
                'capacity' => '350kg',
                'speed' => '1 m/s',
                'brand' => 'Misubishi',
                'completion_date' => 'Tháng 01/2026',
                'warranty' => '24 tháng',
                'features' => '[]',
                'gallery' => '["https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789531147053-1ehdxhsbxr2.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789531147053-ngybklbead.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789531147053-5tbz8h0szto.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789531147053-2a2n459ni43.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789531147053-6s7qtczl51m.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789531147053-9sd6jvyc1ti.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789531147053-0q678cfr4ayr.jpg"]',
                'testimonial' => NULL,
                'created_at' => '2026-09-16 03:59:24',
                'updated_at' => '2026-10-15 16:12:43',
            ),
            2 => 
            array (
                'id' => '1ab86166-4a6c-4829-af6f-4a30b7a3b675',
                'slug' => 'cong-trinh-thang-may-tai-phu-luong',
                'title' => 'Công trình thang máy tại Phú Lương',
                'location' => 'Hà Đông, Hà Nội',
                'category' => 'Thang Máy Gia Đình',
                'image' => 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790045641823-t6915sm46uk.jpg',
                'specs' => 'Thang máy gia đình ~ 6 tầng',
                'description' => 'PHÚ LƯƠNG – MỘT CÔNG TRÌNH, NHIỀU CHI TIẾT ĐƯỢC CHĂM CHÚT
Một chiếc thang máy đẹp không chỉ nằm ở phần cabin hay cánh cửa inox sáng bóng. Đằng sau mỗi hành trình êm ái là cả một hệ thống được lắp đặt, kiểm tra và hoàn thiện kỹ lưỡng.
Tại Phú Lương, đội ngũ Thang máy Hải Phát tập trung vào từng chi tiết: từ hệ thống truyền động, tủ điều khiển đến cabin và các thiết bị an toàn. Mỗi bộ phận đều cần được kiểm tra đúng kỹ thuật để chiếc thang vận hành ổn định, an toàn và bền bỉ trong quá trình sử dụng.
✨ Hải Phát không chỉ lắp một chiếc thang – chúng tôi hoàn thiện một giải pháp di chuyển phù hợp với từng công trình.',
                'floors' => 6,
                'capacity' => '350kg',
                'speed' => '1 m/s',
                'brand' => 'Montanari',
                'completion_date' => 'Tháng 06/2026',
                'warranty' => '18 tháng',
                'features' => '[]',
                'gallery' => '["https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790045962037-bntgljxw6t.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790045962036-yz54ur1rjzh.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790045962037-1sn4l7th6ve.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790045962037-6s7navtfwdf.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790045962037-c0gicbtgl4g.jpg"]',
                'testimonial' => NULL,
                'created_at' => '2026-09-22 03:00:00',
                'updated_at' => '2026-10-15 16:12:43',
            ),
            3 => 
            array (
                'id' => '2e1227bb-a07c-417d-b6d4-5f831066b7a7',
                'slug' => 'duong-noi-ha-dong',
                'title' => 'Công trình tháng máy tại Dương Nội',
                'location' => 'Hà Đông - Hà Nội',
                'category' => 'Thang Máy Gia Đình',
                'image' => 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789523810438-3k3yunlzti7.jpg',
                'specs' => 'Tháng máy gia đình ~ 5 tầng',
                'description' => 'Một thiết kế mang đậm dấu ấn sang trọng với inox gương vàng kết hợp họa tiết trang trí tinh tế, tạo nên không gian thang máy nổi bật và đồng điệu với tổng thể nội thất.
Không chỉ là phương tiện di chuyển, thang máy còn trở thành một điểm nhấn thẩm mỹ, góp phần nâng tầm vẻ đẹp và giá trị cho công trình. 🤝
📍 Công trình: Dương Nội – Hà Nội
🏢 Hải Phát – Đồng hành kiến tạo những công trình chất lượng, chỉn chu từ chi tiết nhỏ nhất.',
                'floors' => 5,
                'capacity' => '450kg',
                'speed' => '1 m/s',
                'brand' => 'Fuji Hàn ',
                'completion_date' => 'Tháng 8/2025',
                'warranty' => '24 tháng',
                'features' => '[]',
                'gallery' => '["https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789523825644-abddpvav5sk.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789523825644-5oniv3icb9.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789523825644-8qlla1hz80j.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789523825644-06w4p5hywti2.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789523825644-4qp0pfqmn9.jpg"]',
                'testimonial' => NULL,
                'created_at' => '2026-09-16 02:01:11',
                'updated_at' => '2026-10-15 16:12:42',
            ),
            4 => 
            array (
                'id' => '359f3023-37a7-44d4-9f30-c5e2e2a73a00',
                'slug' => 'cong-trinh-thang-may-tai-gia-lam',
                'title' => 'Công trình thang máy tại Gia Lâm',
                'location' => 'Hà Nội',
                'category' => 'Thang Máy Gia Đình',
                'image' => 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790046781141-sb1fvhgnis.jpg',
                'specs' => 'Thang máy gia đình ~ 4 tầng',
                'description' => '🎉HẢI PHÁT HÂN HẠNH BÀN GIAO THANG MÁY GIA ĐÌNH ĐẾN VỊ KHÁCH ĐẶC BIỆT TẠI GIA LÂM
Sau quá trình khảo sát, tư vấn và thi công, Hải Phát đã hoàn thiện và bàn giao thang máy gia đình cho anh Nguyễn Trung Hòa tại Gia Lâm. Công trình được triển khai đúng tiến độ, đảm bảo yêu cầu về kỹ thuật và thẩm mỹ. Thang được thiết kế phù hợp với không gian thực tế, vận hành ổn định, êm ái khi sử dụng. 
☺ Hải Phát xin chân thành cảm ơn anh Hòa đã tin tưởng lựa chọn Thang máy Hải Phát là một phần để hoàn thiện không gian sống của gia đình. Sự tin tưởng của anh luôn là điều mà Hải Phát trân trọng và nỗ lực đáp lại bằng chất lượng thực tế.
🔧 Thông số công trình:
📌 Tải trọng: 450kg (6 người)
📌 Mặt cửa hiển thị ngày, giờ, nhiệt độ
📌 Khung thép dựng mới không đế sập
📌 Kính phủ tràn viền mặt cửa
📌 Cabin inox gương đen
📌 Vận hành êm, tiết kiệm điện
👉 Hải Phát không chỉ lắp đặt thang máy mà còn mang đến giải pháp phù hợp với từng ngôi nhà',
                'floors' => 4,
                'capacity' => '450 kg',
                'speed' => '1.2 m/s',
                'brand' => 'Mitsubishi',
                'completion_date' => 'Tháng 05/2026',
                'warranty' => '18 tháng',
            'features' => '["Tải trọng: 450kg (6 người)", "Mặt cửa hiển thị ngày, giờ, nhiệt độ", "Khung thép dựng mới không đế sập", "Kính phủ tràn viền mặt cửa", "Cabin inox gương đen", "Vận hành êm, tiết kiệm điện"]',
                'gallery' => '["https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790046925767-khivhm811fo.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790046925767-cjw8yb5p55h.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790046925767-embdhj7pds6.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790046925767-a7jrt4sq0q.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790046925767-pq6kp9s1np.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790046925767-0s8fj60h4s6.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790046925767-96x2503l84k.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790046925767-fyetvyymqau.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790046804276-hues4z1jdf9.jpg"]',
                'testimonial' => NULL,
                'created_at' => '2026-09-22 03:17:54',
                'updated_at' => '2026-10-15 16:12:44',
            ),
            5 => 
            array (
                'id' => '5ee532bd-1e4e-4f64-b0de-fc8d9baa96bf',
                'slug' => 'villa-ocean-park',
                'title' => 'Biệt Thự Vinhomes Ocean Park',
                'location' => 'Gia Lâm, Hà Nội',
                'category' => 'Gia đình',
                'image' => 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
                'specs' => 'Thang máy kính Homelift 450kg · 4 tầng',
                'description' => 'Lắp đặt thang máy kính gia đình khung hợp kim nhôm định hình cao cấp, hài hòa với kiến trúc sang trọng của biệt thự tân cổ điển.',
                'floors' => 4,
            'capacity' => '450 kg (6 người)',
                'speed' => '0.5 m/s',
                'brand' => 'Hải Phát - Fuji Nhật Bản',
                'completion_date' => 'Tháng 12/2025',
                'warranty' => '24 tháng chính hãng',
                'features' => '["Cabin kính toàn cảnh", "Hệ điều khiển Fuji", "Vận hành êm dịu"]',
                'gallery' => '["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"]',
                'testimonial' => '{"name": "Anh Nguyễn Minh Quang", "role": "Chủ biệt thự San Hô", "text": "Đội ngũ kỹ sư Hải Phát làm việc rất cẩn thận, hoàn thành đúng hạn và hỗ trợ nhiệt tình.", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"}',
                'created_at' => '2026-10-09 08:42:36',
                'updated_at' => '2026-10-09 08:42:36',
            ),
            6 => 
            array (
                'id' => '61be9eba-7278-4887-9834-ca579a60f4f5',
                'slug' => 'khach-san-boutique-tay-ho',
                'title' => 'Khách Sạn Boutique Tây Hồ',
                'location' => 'Tây Hồ, Hà Nội',
                'category' => 'Tải khách',
                'image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
                'specs' => 'Kính Panorama 450kg - 6 Điểm dừng',
                'description' => 'Thang máy kính quan sát nhìn ra Hồ Tây thơ mộng, tạo điểm nhấn kiến trúc cho khách sạn boutique.',
                'floors' => 6,
            'capacity' => '450kg (6 người)',
                'speed' => '1.0 m/s',
                'brand' => 'Montanari Italy',
                'completion_date' => '02/2026',
                'warranty' => '24 tháng',
                'features' => '["Kính cong nghệ thuật", "Đèn trần LED thiết kế riêng", "Tay vịn mạ titan vàng bóng"]',
                'gallery' => NULL,
                'testimonial' => NULL,
                'created_at' => '2026-10-09 08:42:37',
                'updated_at' => '2026-10-09 08:46:03',
            ),
            7 => 
            array (
                'id' => 'a4b388c1-0c71-4a72-98de-09e7c15d7c2f',
                'slug' => 'toa-nha-van-phong-cau-giay',
                'title' => 'Tòa Nhà Văn Phòng Cầu Giấy',
                'location' => 'Cầu Giấy, Hà Nội',
                'category' => 'Thương mại',
                'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
                'specs' => 'Tải khách 630kg - 8 Điểm dừng',
                'description' => 'Cung cấp và thi công trọn gói 2 thang máy tải khách tốc độ 1.75m/s cho tòa nhà văn phòng 8 tầng.',
                'floors' => 8,
            'capacity' => '630kg (8 người)',
                'speed' => '1.75 m/s',
                'brand' => 'Fuji Japan Tech',
                'completion_date' => '01/2026',
                'warranty' => '36 tháng',
                'features' => '["Hệ thống gọi tầng thông minh", "Inox sọc nhuyễn kết hợp gương", "Hệ thống thẻ từ phân tầng bảo mật"]',
                'gallery' => NULL,
                'testimonial' => NULL,
                'created_at' => '2026-10-09 08:42:37',
                'updated_at' => '2026-10-09 08:46:03',
            ),
            8 => 
            array (
                'id' => 'a52d8779-6fda-4c3a-a125-6210b49d6da1',
                'slug' => 'biet-thu-vinhomes-ocean-park',
                'title' => 'Biệt Thự Vinhomes Ocean Park',
                'location' => 'Gia Lâm, Hà Nội',
                'category' => 'Gia đình',
                'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                'specs' => 'Homelift 350kg - 4 Điểm dừng',
                'description' => 'Lắp đặt hệ thống thang máy kính Homelift khung nhôm định hình vàng champagne cao cấp.',
                'floors' => 4,
            'capacity' => '350kg (4-5 người)',
                'speed' => '0.4 m/s',
                'brand' => 'Hải Phát Custom Design',
                'completion_date' => '12/2025',
                'warranty' => '24 tháng',
                'features' => '["Kính cường lực 10mm 4 mặt", "Cửa mở tự động 2 cánh trung tâm", "Sàn đá Granite tự nhiên"]',
                'gallery' => NULL,
                'testimonial' => NULL,
                'created_at' => '2026-10-09 08:45:38',
                'updated_at' => '2026-10-09 08:46:03',
            ),
            9 => 
            array (
                'id' => 'd85e5f64-ad27-4601-be82-2f21d14f9f4a',
                'slug' => 'cong-trinh-thang-may-trieu-khuc',
                'title' => 'Công trình thang máy Triều Khúc',
                'location' => 'Thanh Xuân, Hà Nội',
                'category' => 'Thang Máy Tải Khách',
                'image' => 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790041626060-w152nht8enf.jpg',
                'specs' => 'Thang máy tải khách ~ 5 tầng',
                'description' => 'CÔNG TRÌNH THANG MÁY TRIỀU KHÚC – THANH XUÂN, HÀ NỘI
Một công trình mang vẻ đẹp sang trọng, hiện đại nhưng vẫn ấm áp với sự kết hợp tinh tế giữa inox và vân gỗ.
✨ Thiết kế cabin nổi bật:
• Cabin ốp vân gỗ tông nâu sang trọng
• Hệ thống gương tạo cảm giác cabin rộng và thoáng hơn
• Trần LED khung viền hiện đại, ánh sáng hài hòa
• Tay vịn inox tăng tính tiện dụng và hoàn thiện tổng thể
• Trang bị camera trong cabin
• Bảng điều khiển và hiển thị tầng thiết kế gọn gàng, hiện đại
🚪 Ngoại thất: cửa tầng inox cùng hệ thống gọi tầng tối giản, kết hợp hài hòa với không gian kiến trúc xung quanh.
Một mẫu thang máy phù hợp với những công trình đề cao tính thẩm mỹ, sự tiện nghi và độ hoàn thiện trong từng chi tiết.
📍 Công trình: Triều Khúc – Thanh Xuân – Hà Nội
🏢 Hải Phát Elevator – Chất lượng khẳng định thương hiệu.',
                'floors' => 5,
                'capacity' => '450kg',
                'speed' => '1.2 m/s',
                'brand' => 'Fuji nhật',
                'completion_date' => 'Tháng 08/2026',
                'warranty' => '24 tháng',
                'features' => '["Cabin ốp vân gỗ tông nâu sang trọng", "Hệ thống gương tạo cảm giác cabin rộng và thoáng hơn", "Trần LED khung viền hiện đại, ánh sáng hài hòa", "Tay vịn inox tăng tính tiện dụng và hoàn thiện tổng thể", "Trang bị camera trong cabin", "Bảng điều khiển và hiển thị tầng thiết kế gọn gàng, hiện đại"]',
                'gallery' => '["https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790042226355-ppuzbh90fcc.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790042226355-8vbryugww38.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790042226355-goyw2b6c6pc.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790042226355-ulg6jlbsbbr.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790042226355-gk9dao3d5k.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790042226355-3xdla2p8k8q.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790042226355-mbq4pr3dnxr.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790042226355-e3ae2rd2rij.jpg"]',
                'testimonial' => NULL,
                'created_at' => '2026-09-22 01:58:29',
                'updated_at' => '2026-10-15 16:12:43',
            ),
            10 => 
            array (
                'id' => 'e3ea7aca-c8ae-4a72-8e3a-781d3c74d566',
                'slug' => 'sao-bien-vinhomes-ocean-park',
                'title' => 'Công trình tháng máy tại Sao Biển - Vinhomes Ocean Park',
                'location' => 'Gia Lâm - Hà Nội',
                'category' => 'Thang Máy Tải Khách',
                'image' => 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789532336867-1zlnwqddcat.jpg',
                'specs' => 'Thang máy tải khách ~ 5 tầng',
                'description' => '✨ CÔNG TRÌNH THANG MÁY SAO BIỂN – HOÀN THIỆN ✨
Một thiết kế mang vẻ đẹp sang trọng, tinh tế và hiện đại với cabin inox sáng kết hợp hệ thống đèn trần tạo hiệu ứng ánh sáng nổi bật.
Điểm nhấn nằm ở phần cửa tầng và sảnh thang được ốp đá vân tự nhiên, hài hòa cùng nội thất cabin, mang đến tổng thể đồng bộ và đẳng cấp cho không gian.
Từng chi tiết được hoàn thiện chỉn chu – từ ngoại thất đến nội thất cabin, để mỗi hành trình di chuyển cũng trở thành một trải nghiệm tiện nghi. 🤝
📍 Công trình: Sao Biển
🏢 Hải Phát – Chất lượng khẳng định thương hiệu.',
                'floors' => 5,
                'capacity' => '450kg',
                'speed' => '1 m/s',
                'brand' => 'Fuji Nhật',
                'completion_date' => 'Tháng 03/2026',
                'warranty' => '24 tháng',
                'features' => '[]',
                'gallery' => '["https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789532464396-4dqr1nwvq23.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789532464396-3k4i2fsb99g.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789532464396-dmi205o8q04.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789532480549-o9n0recibns.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789532480549-flfuvcmr9zg.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789532480549-g1yduaa1q75.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1789532480549-0ytmfgr3hrp.jpg"]',
                'testimonial' => NULL,
                'created_at' => '2026-09-16 04:21:39',
                'updated_at' => '2026-10-15 16:12:43',
            ),
            11 => 
            array (
                'id' => 'f0976e4c-8744-450b-80f2-50a2de66616e',
                'slug' => 'vinh-tay-vinhomes-ocean-park-3',
                'title' => 'Công trình thang máy tại Vịnh Tây - Vinhomes Ocean Park 3',
                'location' => 'Nghĩa Trụ, Hưng Yên',
                'category' => 'Thang Máy Gia Đình',
                'image' => 'https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790050576069-1q211clqe4y.jpg',
                'specs' => 'Thang máy gia đình ~ 5 tầng',
                'description' => '✨ CÔNG TRÌNH THANG MÁY TẠI VỊNH TÂY – VINHOMES OCEAN PARK 3✨
Một thiết kế thang máy không chỉ phục vụ nhu cầu di chuyển giữa các tầng mà còn góp phần hoàn thiện tổng thể không gian sống. Với công trình tại Vịnh Tây, thang máy được lựa chọn theo hướng hiện đại, hài hòa với kiến trúc và nội thất của ngôi nhà.
🔹 Linh hoạt theo nhu cầu sử dụng:
Từ tải trọng, kích thước cabin, số tầng phục vụ đến kiểu dáng cửa và vật liệu hoàn thiện, mỗi hạng mục đều có thể được tư vấn, thiết kế phù hợp với đặc điểm công trình và nhu cầu sử dụng thực tế.
🔹 Nâng tầm giá trị thẩm mỹ:
Cabin inox kết hợp kính, hệ thống chiếu sáng và các chi tiết hoàn thiện tạo nên diện mạo sang trọng, hiện đại. Thang máy được bố trí hài hòa giúp không gian không chỉ tiện nghi hơn mà còn trở thành một điểm nhấn trong tổng thể ngôi nhà.
🔹 Tiện nghi cho cuộc sống:
Đặc biệt với nhà nhiều tầng, thang máy giúp việc di chuyển trở nên thuận tiện hơn, tiết kiệm thời gian và phù hợp với nhu cầu sử dụng lâu dài của gia đình.
📍 Công trình: Vịnh Tây – Vinhomes ocean park 3
🏢 Thang máy Hải Phát – Chất lượng khẳng định thương hiệu.',
                'floors' => 5,
                'capacity' => '450kg',
                'speed' => '1 m/s',
                'brand' => 'Fuji',
                'completion_date' => 'Tháng 09/2026',
                'warranty' => '18 tháng',
                'features' => '[]',
                'gallery' => '["https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790050576069-ahlnv04wjbi.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790050576068-y6cf4rv6ecl.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790050576069-wwbb2d1svyf.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790050576069-sgfch0t0na.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790050576069-1q211clqe4y.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790050576069-6vmmhsasize.jpg", "https://lfwsvizmqinwbarxhddr.supabase.co/storage/v1/object/public/images/1790050576069-91imzst062m.jpg"]',
                'testimonial' => NULL,
                'created_at' => '2026-09-22 04:16:48',
                'updated_at' => '2026-10-15 16:12:44',
            ),
        ));
        
        
    }
}