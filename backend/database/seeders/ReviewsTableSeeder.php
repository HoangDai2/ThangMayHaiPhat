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
                'id' => '99fb8cea-8766-452c-9142-f010d16bd16a',
                'name' => 'Anh Dũng',
                'role' => 'Kiến Hưng - Hà Đông',
                'avatar' => '',
                'rating' => 5,
                'text' => 'Qua nhiều tiêu chí cân nhắc và cũng đã hỏi qua vài đơn vị tư vấn nhưng anh lựa chọn Hải Phát. Các bạn tư vấn và phục vụ nhiệt tình, hướng dẫn rõ ràng. Thang sau khi nghiệm thu anh thấy rất hài lòng, chạy êm. Không chỉ gia đình anh có được cái thang máy ưng ý mà anh cũng đã giới thiệu thêm cho người quen lắp bên mình.',
                'project' => 'Thang máy gia đình - 5 tầng',
                'is_published' => 1,
                'sort_order' => 1,
                'created_at' => '2026-10-09 08:43:40',
                'updated_at' => '2026-11-12 14:25:00',
            ),
            1 => 
            array (
                'id' => '72e0b14c-6f48-4471-bdcc-df8afb0fe144',
                'name' => 'Chị Hương',
                'role' => 'Yên Hòa - Cầu Giấy',
                'avatar' => '',
                'rating' => 5,
                'text' => 'Nhà mình cải tạo lại để lắp thêm thang cho bố mẹ lớn tuổi đi lại cho đỡ vất vả. Lúc đầu cũng ngại đục đẽo bụi bặm nhưng đội thợ Hải Phát làm khá gọn gàng, đúng lịch hẹn. Đến giờ dùng hơn một năm rồi chưa thấy trục trặc gì, cứ đến kỳ là bên kỹ thuật chủ động gọi hẹn qua bảo dưỡng.',
                'project' => 'Thang máy gia đình - 4 tầng',
                'is_published' => 1,
                'sort_order' => 2,
                'created_at' => '2026-10-09 08:42:39',
                'updated_at' => '2026-11-12 14:25:00',
            ),
            2 => 
            array (
                'id' => '07ba3617-d914-40f5-b368-16356ae4c605',
                'name' => 'Anh Tuấn',
                'role' => 'Việt Hưng - Long Biên',
                'avatar' => '',
                'rating' => 5,
                'text' => 'Mình làm nhà 5 tầng nên lắp thang gia đình 450kg của Hải Phát. Ấn tượng nhất là khâu khảo sát và lên bản vẽ khá kỹ, hố thang hơi hẹp nhưng các bạn vẫn bố trí được cabin rộng rãi, sáng sủa. Giá cả chốt ngay từ đầu trong hợp đồng nên đến lúc bàn giao không bị phát sinh thêm.',
                'project' => 'Thang máy gia đình - 450kg',
                'is_published' => 1,
                'sort_order' => 3,
                'created_at' => '2026-08-10 10:22:38',
                'updated_at' => '2026-11-12 14:25:00',
            ),
            3 => 
            array (
                'id' => '644c191d-5e59-4c50-98c2-6c5fde6d0e98',
                'name' => 'Chú Hòa',
                'role' => 'Khương Trung - Thanh Xuân',
                'avatar' => '',
                'rating' => 5,
                'text' => 'Tôi lớn tuổi rồi nên chọn đơn vị nào làm ăn chắc chắn, giấy tờ rõ ràng thì mới yên tâm. Bên Hải Phát bàn giao đầy đủ CO, CQ máy móc, kiểm định an toàn xong xuôi mới nghiệm thu. Có lần mất điện lưới đột ngột, bộ cứu hộ tự động đưa thang về tầng mở cửa ngay nên gia đình rất an tâm.',
                'project' => 'Thang Homelift - 4 tầng',
                'is_published' => 1,
                'sort_order' => 4,
                'created_at' => '2026-08-10 10:22:38',
                'updated_at' => '2026-11-12 14:25:00',
            ),
            4 => 
            array (
                'id' => 'c55e2d10-bc3c-450c-b76f-27e64a7f6990',
                'name' => 'Anh Minh',
                'role' => 'Xuân La - Tây Hồ',
                'avatar' => '',
                'rating' => 5,
                'text' => 'Công trình nhà mình vừa ở vừa cho thuê văn phòng 6 tầng nên thang chạy tần suất khá nhiều. Mình chọn thang máy Hải Phát lắp đặt trọn gói từ phần khung kính đến máy móc. Thang vận hành ổn định, đóng mở cửa nhẹ nhàng, khách thuê nhà cũng khen tiện nghi và sạch sẽ.',
                'project' => 'Thang kính Panorama - 6 tầng',
                'is_published' => 1,
                'sort_order' => 5,
                'created_at' => '2026-08-10 10:22:38',
                'updated_at' => '2026-11-12 14:25:00',
            ),
            5 => 
            array (
                'id' => 'd6cda996-3c02-4587-8eae-f393c2f8575b',
                'name' => 'Chị Lan Anh',
                'role' => 'Văn Quán - Hà Đông',
                'avatar' => '',
                'rating' => 5,
                'text' => 'Trước khi quyết định mình cũng đi xem thực tế hai công trình Hải Phát đã làm gần khu nhà mình rồi mới ký hợp đồng. Từ lúc thi công đến lúc bàn giao khoảng hơn một tháng, tiến độ đều đặn. Thích nhất là các bạn kỹ thuật hỗ trợ rất nhanh, hỏi gì qua Zalo cũng trả lời ngay.',
                'project' => 'Thang máy gia đình - 5 tầng',
                'is_published' => 1,
                'sort_order' => 6,
                'created_at' => '2026-08-10 10:22:38',
                'updated_at' => '2026-11-12 14:25:00',
            ),
        ));
        
        
    }
}