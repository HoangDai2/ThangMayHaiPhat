<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ContactsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('contacts')->delete();
        
        \DB::table('contacts')->insert(array (
            0 => 
            array (
                'id' => '82734d71-f09d-40e0-a319-faf8f9300da5',
                'name' => 'NguyNguyen Van Minh',
                'phone' => '0988776655',
                'email' => NULL,
                'service' => 'Tư vấn khảo sát: Thang máy gia đình / Nhà phố',
                'message' => '[YÊU CẦU BÁO GIÁ DỊCH VỤ THANG MÁY]
- Loại công trình: Thang máy gia đình / Nhà phố
- Địa chỉ khảo sát: Ha Noi
- Ghi chú kỹ thuật: Không có
- Nguồn tiếp nhận: Trang Dịch Vụ (Web Hub)',
                    'status' => 'new',
                    'created_at' => '2026-10-16 11:17:23',
                    'updated_at' => '2026-10-16 11:17:23',
                ),
            ));
        
        
    }
}