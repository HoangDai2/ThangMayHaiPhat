<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ArticlesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('articles')->delete();
        
        \DB::table('articles')->insert(array (
            0 => 
            array (
                'id' => '3e19c86d-0a0d-4e51-9bcc-b6dfcb9bcc5b',
                'slug' => 'quy-trinh-bao-tri-thang-may-dinh-ky-32-buoc-theo-tieu-chuan',
                'title' => 'Quy Trình Bảo Trì Thang Máy Định Kỳ 32 Bước Theo Tiêu Chuẩn',
                'excerpt' => 'Khám phá quy trình kiểm tra an toàn 32 hạng mục khắt khe của Hải Phát nhằm đảm bảo thang máy luôn vận hành êm ái.',
                'content' => 'Bảo trì định kỳ là yếu tố quyết định tuổi thọ và sự an toàn của thang máy. Đội ngũ kỹ thuật viên Hải Phát thực hiện đầy đủ 32 bước kiểm tra chi tiết từ phòng máy, hố thang, cabin đến hệ thống phanh khẩn cấp.',
                'cover_image' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
                'author' => 'Ban Kỹ Thuật Dịch Vụ',
                'category' => 'Bảo trì - Bảo dưỡng',
                'tags' => '["bao tri thang may", "an toan thang may", "dich vu 24/7"]',
                'is_published' => 1,
                'published_at' => '2026-10-09 08:46:03',
                'created_at' => '2026-10-09 08:45:39',
                'updated_at' => '2026-10-09 08:46:03',
            ),
            1 => 
            array (
                'id' => '48502826-bac4-467d-9833-72fa4b315fb9',
                'slug' => '5-tieu-chi-vang-khi-chon-lap-dat-thang-may-gia-dinh-nam-2026',
                'title' => '5 Tiêu Chí Vàng Khi Chọn Lắp Đặt Thang Máy Gia Đình Năm 2026',
                'excerpt' => 'Tổng hợp kinh nghiệm thực tế giúp gia chủ lựa chọn đúng tải trọng, loại thang và công nghệ phù hợp nhất cho ngôi nhà của mình.',
                'content' => 'Lắp đặt thang máy gia đình là một khoản đầu tư quan trọng. Dưới đây là 5 tiêu chí cốt lõi: 1. Kích thước & Hố PIT 2. Công nghệ truyền động 3. Tính thẩm mỹ nội thất 4. Hệ thống an toàn 5. Dịch vụ bảo trì hậu mãi.',
                'cover_image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
                'author' => 'Kỹ sư Trưởng Hải Phát',
                'category' => 'Tư vấn kỹ thuật',
                'tags' => '["thang may gia dinh", "kinh nghiem lap dat", "homelift"]',
                'is_published' => 1,
                'published_at' => '2026-10-09 08:46:03',
                'created_at' => '2026-10-09 08:45:39',
                'updated_at' => '2026-10-09 08:46:03',
            ),
            2 => 
            array (
                'id' => '4cfe9e8b-9e3a-4f42-9a52-765b73248165',
                'slug' => 'quy-trinh-bao-tri-thang-may-chuan',
                'title' => 'Quy Trình Bảo Trì Thang Máy Định Kỳ 32 Bước Theo Tiêu Chuẩn',
                'excerpt' => 'Tại sao cần bảo dưỡng định kỳ 2 tháng một lần? Cùng tìm hiểu quy trình kiểm tra an toàn chuyên nghiệp của Hải Phát.',
                'content' => 'Bảo trì định kỳ là yếu tố quyết định tuổi thọ và độ an toàn của hệ thống thang máy...',
                'cover_image' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
                'author' => 'Phòng Kỹ Thuật Hải Phát',
                'category' => 'Tin tức',
                'tags' => '["Bảo trì", "An toàn", "Dịch vụ"]',
                'is_published' => 1,
                'published_at' => '2026-10-09 08:42:37',
                'created_at' => '2026-10-09 08:42:38',
                'updated_at' => '2026-10-09 08:42:38',
            ),
            3 => 
            array (
                'id' => 'd9823f3f-ac59-4497-86d2-b47f6969540b',
                'slug' => 'kinh-nghiem-chon-thang-may-gia-dinh',
                'title' => '5 Tiêu Chí Vàng Khi Chọn Lắp Đặt Thang Máy Gia Đình Năm 2026',
                'excerpt' => 'Hướng dẫn chi tiết từ chuyên gia giúp gia chủ chọn đúng loại thang máy tối ưu diện tích, tiết kiệm điện và an toàn tuyệt đối.',
                'content' => 'Lựa chọn thang máy gia đình là quyết định quan trọng đòi hỏi gia chủ phải cân nhắc kỹ lưỡng về kích thước, loại động cơ, thương hiệu và đơn vị lắp đặt uy tín...',
                'cover_image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
                'author' => 'Kỹ Sư Hoàng Đại',
                'category' => 'Hướng dẫn',
                'tags' => '["Thang máy gia đình", "Kinh nghiệm", "Tư vấn"]',
                'is_published' => 1,
                'published_at' => '2026-10-09 08:42:37',
                'created_at' => '2026-10-09 08:42:38',
                'updated_at' => '2026-10-09 08:42:38',
            ),
        ));
        
        
    }
}