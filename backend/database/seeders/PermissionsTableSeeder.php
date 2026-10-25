<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('permissions')->delete();
        
        \DB::table('permissions')->insert(array (
            0 => 
            array (
                'id' => '0af5c3be-5fea-477d-8f80-9895d3cc8308',
                'name' => 'manage-services',
                'description' => 'Quản lý dịch vụ',
                'created_at' => '2026-10-09 08:42:19',
                'updated_at' => '2026-10-09 08:42:19',
            ),
            1 => 
            array (
                'id' => '12ee9fe1-be14-4bfd-a04b-edef8c825bb8',
                'name' => 'manage-products',
                'description' => 'Quản lý sản phẩm',
                'created_at' => '2026-10-09 08:42:19',
                'updated_at' => '2026-10-09 08:42:19',
            ),
            2 => 
            array (
                'id' => '3014f3ad-99b9-4162-be16-aacb1be00169',
                'name' => 'manage-users',
                'description' => 'Quản lý tài khoản',
                'created_at' => '2026-10-09 08:42:19',
                'updated_at' => '2026-10-09 08:42:19',
            ),
            3 => 
            array (
                'id' => '3560afe6-a321-44d4-8209-36b56605ba73',
                'name' => 'manage-images',
                'description' => 'Quản lý hình ảnh',
                'created_at' => '2026-10-09 08:42:19',
                'updated_at' => '2026-10-09 08:42:19',
            ),
            4 => 
            array (
                'id' => '3f8872c1-012a-4d97-aab0-4913c841a445',
                'name' => 'manage-promotions',
                'description' => 'Quản lý khuyến mãi',
                'created_at' => '2026-10-09 08:42:19',
                'updated_at' => '2026-10-09 08:42:19',
            ),
            5 => 
            array (
                'id' => '8f0b4f37-b56f-4a87-9114-2940b96b8178',
                'name' => 'manage-articles',
                'description' => 'Quản lý bài viết',
                'created_at' => '2026-10-09 08:42:19',
                'updated_at' => '2026-10-09 08:42:19',
            ),
            6 => 
            array (
                'id' => 'b2e28f28-acc8-4d85-b22a-7f9f8f00a6f2',
                'name' => 'manage-projects',
                'description' => 'Quản lý dự án',
                'created_at' => '2026-10-09 08:42:19',
                'updated_at' => '2026-10-09 08:42:19',
            ),
            7 => 
            array (
                'id' => 'b64cb00d-4e5a-45b1-a3a8-d7c42f8e6c45',
                'name' => 'manage-contacts',
                'description' => 'Quản lý liên hệ',
                'created_at' => '2026-10-09 08:42:19',
                'updated_at' => '2026-10-09 08:42:19',
            ),
            8 => 
            array (
                'id' => 'd8ef9e12-ae4d-4fd5-8651-1a71794000e3',
                'name' => 'manage-reviews',
                'description' => 'Quản lý đánh giá',
                'created_at' => '2026-10-09 08:42:19',
                'updated_at' => '2026-10-09 08:42:19',
            ),
            9 => 
            array (
                'id' => 'e871d317-2ab4-4a75-be00-2157a00a491e',
                'name' => 'manage-banners',
                'description' => 'Quản lý banner',
                'created_at' => '2026-10-09 08:42:19',
                'updated_at' => '2026-10-09 08:42:19',
            ),
        ));
        
        
    }
}