<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ServicesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('services')->delete();
        
        \DB::table('services')->insert(array (
            0 => 
            array (
                'id' => '06a080b1-79ac-4f34-8f56-c46187ae3e80',
                'title' => 'Bảo Trì - Bảo Dưỡng',
                'slug' => 'bao-tri-bao-duong',
                'icon' => 'shield-check',
                'image' => NULL,
                'short_description' => 'Dịch vụ bảo trì, bảo dưỡng định kỳ giúp thang máy luôn hoạt động ổn định, êm ái và kéo dài tuổi thọ.',
                'full_description' => 'Chăm sóc thang máy định kỳ 2 tháng/lần với quy trình kiểm tra 32 hạng mục an toàn.',
                'features' => '["Hotline cứu hộ 24/7", "Bảo trì định kỳ 2 tháng/lần", "Linh kiện chính hãng thay thế sẵn có"]',
                'benefits' => '["Vận hành êm ái", "Kéo dài tuổi thọ", "Hỗ trợ 24/7"]',
                'faqs' => '[]',
                'sort_order' => 4,
                'is_published' => 1,
                'created_at' => '2026-10-09 08:45:17',
                'updated_at' => '2026-10-09 08:46:03',
            ),
            1 => 
            array (
                'id' => '577308ef-de26-4c4c-a586-1f4052a064a1',
                'title' => 'Khảo Sát - Báo Giá',
                'slug' => 'khao-sat-bao-gia',
                'icon' => 'clipboard-search',
                'image' => NULL,
                'short_description' => 'Tiếp nhận yêu cầu kỹ thuật, khảo sát hiện trạng, phân tích và tư vấn giải pháp tối ưu nhất cho từng công trình.',
                'full_description' => 'Dịch vụ khảo sát và báo giá của Hải Phát là bước đầu tiên trong quy trình cung cấp giải pháp thang máy. Đội ngũ kỹ sư giàu kinh nghiệm sẽ đến tận công trình.',
                'features' => '["Khảo sát miễn phí trong 48 giờ", "Báo giá chi tiết trong 24 giờ", "Đo đạc hiện trạng 3D", "Cam kết không phát sinh chi phí"]',
                'benefits' => '["Tối ưu ngân sách", "Chính xác 100%", "Bảo mật thông tin"]',
                'faqs' => '[{"answer": "Hoàn toàn miễn phí 100% trong khu vực nội thành.", "question": "Chi phí khảo sát là bao nhiêu?"}, {"answer": "Sau khi khảo sát, chúng tôi gửi báo giá chi tiết trong vòng 24 giờ.", "question": "Mất bao lâu để có báo giá?"}]',
                'sort_order' => 1,
                'is_published' => 1,
                'created_at' => '2026-10-09 08:45:17',
                'updated_at' => '2026-10-09 08:46:03',
            ),
            2 => 
            array (
                'id' => '834eaccd-471b-49b3-a8c2-9c6f09ed9b42',
                'title' => 'Lắp Đặt - Thi Công',
                'slug' => 'lap-dat-thi-cong',
                'icon' => 'wrench',
                'image' => NULL,
                'short_description' => 'Đội ngũ kỹ thuật viên lành nghề, tuân thủ nghiêm ngặt quy trình an toàn lao động và tiêu chuẩn kỹ thuật.',
                'full_description' => 'Thi công lắp đặt thang máy chuẩn xác từng chi tiết, đảm bảo vận hành êm ái và an toàn tuyệt đối.',
                'features' => '["Kỹ thuật viên chứng chỉ chuyên nghiệp", "Kiểm tra chất lượng từng giai đoạn", "Bàn giao đúng tiến độ"]',
                'benefits' => '["An toàn tuyệt đối", "Đúng tiến độ", "Bàn giao trọn gói"]',
                'faqs' => '[]',
                'sort_order' => 3,
                'is_published' => 1,
                'created_at' => '2026-10-09 08:45:17',
                'updated_at' => '2026-10-09 08:46:03',
            ),
            3 => 
            array (
                'id' => 'be26c1fe-4608-467b-aec9-909ba0b17c4a',
                'title' => 'Tư Vấn - Thiết Kế',
                'slug' => 'tu-van-thiet-ke',
                'icon' => 'ruler',
                'image' => NULL,
                'short_description' => 'Tư vấn giải pháp và thiết kế đảm bảo công năng sử dụng cũng như tính thẩm mỹ cao, phù hợp với kiến trúc.',
                'full_description' => 'Dịch vụ tư vấn và thiết kế của Hải Phát giúp khách hàng lựa chọn giải pháp thang máy tối ưu cho công trình.',
                'features' => '["Tư vấn loại thang & tải trọng phù hợp", "Bản vẽ kỹ thuật 2D/3D chi tiết", "Phối cảnh cabin & nội thất"]',
                'benefits' => '["Thẩm mỹ sang trọng", "Chuẩn kỹ thuật", "Tiết kiệm diện tích"]',
                'faqs' => '[{"answer": "Có, chúng tôi tùy biến linh hoạt theo từng diện tích công trình.", "question": "Có thiết kế theo kích thước riêng không?"}]',
                'sort_order' => 2,
                'is_published' => 1,
                'created_at' => '2026-10-09 08:45:17',
                'updated_at' => '2026-10-09 08:46:03',
            ),
        ));
        
        
    }
}