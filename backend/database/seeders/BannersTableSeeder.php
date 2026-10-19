<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class BannersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('banners')->delete();
        
        \DB::table('banners')->insert(array (
            0 => 
            array (
                'id' => '5a390350-61b6-49cf-a291-fda8d1ad939d',
                'title' => 'Giải Pháp Thang Máy Hiện Đại & Uy Tín',
                'subtitle' => 'Chất lượng khẳng định thương hiệu',
                'description' => 'Một đơn vị đồng hành cùng khách hàng từ khảo sát, tư vấn, thiết kế đến lắp đặt và bảo trì — với sự minh bạch trong từng hạng mục và trách nhiệm xuyên suốt sau khi bàn giao.',
                'image_url' => 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80',
                'link_url' => '',
                'position' => 'hero',
                'sort_order' => 1,
                'is_active' => 1,
                'media_type' => 'image',
                'video_url' => '',
                'primary_button_text' => 'Tư vấn miễn phí',
                'primary_button_link' => '#contact',
                'secondary_button_text' => 'Xem dự án',
                'secondary_button_link' => '#projects',
                'template_type' => NULL,
                'highlight_tag' => NULL,
                'features' => NULL,
                'stats' => NULL,
                'created_at' => '2026-08-05 07:44:10',
                'updated_at' => '2026-10-15 16:16:20',
            ),
        ));
        
        
    }
}