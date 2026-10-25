<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ReviewsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('reviews')->delete();
        
        \DB::table('reviews')->insert(array (
            0 => 
            array (
                'id' => '07ba3617-d914-40f5-b368-16356ae4c605',
                'name' => 'Trần Thị Hoa',
                'role' => 'Giám đốc, Khách sạn Mường Thanh',
                'avatar' => 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
                'rating' => 5,
                'text' => 'Chúng tôi đã tin tưởng Hải Phát lắp đặt 4 thang máy tải khách cho khách sạn 12 tầng. Chất lượng vượt kỳ vọng, hệ thống hoạt động ổn định sau 2 năm không có sự cố. Dịch vụ bảo trì định kỳ rất chu đáo.',
                'project' => 'Thang máy tải khách - 12 tầng',
                'is_published' => 1,
                'sort_order' => 2,
                'created_at' => '2026-08-10 10:22:38',
                'updated_at' => '2026-10-15 16:16:22',
            ),
            1 => 
            array (
                'id' => '644c191d-5e59-4c50-98c2-6c5fde6d0e98',
                'name' => 'Nguyễn Văn Minh',
                'role' => 'Chủ hộ, Biệt thự Ecopark',
                'avatar' => 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
                'rating' => 5,
                'text' => 'Hải Phát đã lắp đặt thang máy gia đình cho biệt thự của tôi rất chuyên nghiệp. Đội thợ làm việc gọn gàng, đúng tiến độ. Thang máy hoạt động êm ái, thiết kế cabin kính rất đẹp. Tôi rất hài lòng và sẽ giới thiệu cho bạn bè.',
                'project' => 'Thang máy gia đình - 5 tầng',
                'is_published' => 1,
                'sort_order' => 1,
                'created_at' => '2026-08-10 10:22:38',
                'updated_at' => '2026-10-15 16:16:22',
            ),
            2 => 
            array (
                'id' => '72e0b14c-6f48-4471-bdcc-df8afb0fe144',
                'name' => 'Chị Lê Thu Hằng',
                'role' => 'Giám đốc Công ty Tân Á',
                'avatar' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
                'rating' => 5,
                'text' => 'Lắp đặt đúng tiến độ cam kết trong hợp đồng. Thiết kế cabin kính rất hiện đại và tôn dáng tòa nhà.',
                'project' => 'Thang kính Panorama 6 tầng',
                'is_published' => 1,
                'sort_order' => 2,
                'created_at' => '2026-10-09 08:42:39',
                'updated_at' => '2026-10-09 08:42:39',
            ),
            3 => 
            array (
                'id' => '99fb8cea-8766-452c-9142-f010d16bd16a',
                'name' => 'Bác Trần Văn Thắng',
                'role' => 'Chủ biệt thự Ecopark',
                'avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
                'rating' => 5,
                'text' => 'Gia đình tôi có người già nên thang máy là vị cứu tinh. Thang chạy rất êm, không hề giật cục. Đội thợ làm việc nhiệt tình, sạch sẽ.',
                'project' => 'Thang Homelift 4 tầng',
                'is_published' => 1,
                'sort_order' => 1,
                'created_at' => '2026-10-09 08:43:40',
                'updated_at' => '2026-10-09 08:43:40',
            ),
            4 => 
            array (
                'id' => 'c55e2d10-bc3c-450c-b76f-27e64a7f6990',
                'name' => 'Lê Hoàng Nam',
                'role' => 'Kiến trúc sư, Studio NAM',
                'avatar' => 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
                'rating' => 5,
                'text' => 'Tôi thường xuyên hợp tác với Hải Phát trong các dự án thiết kế nội thất cao cấp. Họ luôn tư vấn giải pháp phù hợp nhất với không gian, đảm bảo thẩm mỹ và tính năng. Đây là đối tác tin cậy của tôi.',
                'project' => 'Thang máy gia đình - Nhiều dự án',
                'is_published' => 1,
                'sort_order' => 3,
                'created_at' => '2026-08-10 10:22:38',
                'updated_at' => '2026-10-15 16:16:22',
            ),
            5 => 
            array (
                'id' => 'd6cda996-3c02-4587-8eae-f393c2f8575b',
                'name' => 'Phạm Thị Lan',
                'role' => 'Chủ nhà, Quận 7, TP.HCM',
                'avatar' => 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&q=80',
                'rating' => 5,
                'text' => 'Nhà tôi 4 tầng, lắp thang máy Hải Phát đã hơn 3 năm. Ba mẹ tôi cao tuổi đi lại rất thuận tiện. Khi có sự cố nhỏ, gọi là có thợ đến ngay trong vòng 1-2 giờ. Rất yên tâm khi sử dụng.',
                'project' => 'Thang máy gia đình - 4 tầng',
                'is_published' => 1,
                'sort_order' => 4,
                'created_at' => '2026-08-10 10:22:38',
                'updated_at' => '2026-10-15 16:16:22',
            ),
        ));
        
        
    }
}