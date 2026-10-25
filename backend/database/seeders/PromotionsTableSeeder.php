<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PromotionsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('promotions')->delete();
        
        \DB::table('promotions')->insert(array (
            0 => 
            array (
                'id' => 1,
                'title' => 'Ưu Đãi Đặc Biệt Mùa Xây Dựng 2026',
                'subtitle' => 'Tiết kiệm chi phí đầu tư thang máy',
                'description' => 'Tặng ngay gói bảo trì miễn phí 2 năm + Giảm trực tiếp 15% chi phí lắp đặt gói thang máy gia đình cao cấp.',
                'discount_text' => NULL,
                'image_url' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
                'link_url' => '#contact',
                'delay_seconds' => 10,
                'is_active' => 1,
                'created_at' => '2026-10-09 08:46:04',
                'updated_at' => '2026-10-19 09:56:53',
            ),
        ));
        
        
    }
}