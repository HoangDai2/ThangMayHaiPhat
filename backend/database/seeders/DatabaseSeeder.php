<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Tạo Role Admin
        $adminRole = Role::firstOrCreate(
            ['name' => 'Admin'],
            ['id' => (string) Str::uuid(), 'description' => 'Quản trị viên toàn quyền']
        );

        // 2. Định nghĩa các Permission (Chức năng)
        $permissions = [
            'manage-projects' => 'Quản lý dự án',
            'manage-products' => 'Quản lý sản phẩm',
            'manage-services' => 'Quản lý dịch vụ',
            'manage-articles' => 'Quản lý bài viết',
            'manage-reviews' => 'Quản lý đánh giá',
            'manage-banners' => 'Quản lý banner',
            'manage-contacts' => 'Quản lý liên hệ',
            'manage-promotions' => 'Quản lý khuyến mãi',
            'manage-images' => 'Quản lý hình ảnh',
            'manage-users' => 'Quản lý tài khoản',
        ];

        foreach ($permissions as $name => $description) {
            Permission::firstOrCreate(
                ['name' => $name],
                ['id' => (string) Str::uuid(), 'description' => $description]
            );
        }

        // 3. Tạo tài khoản Admin
        $admin = User::firstOrCreate(
            ['email' => 'tranminhhoangdai@gmail.com'],
            [
                'name' => 'Admin Hải Phát',
                'password' => Hash::make('HaiPhat@2020'),
            ]
        );

        // 4. Gán role Admin cho user
        $admin->roles()->syncWithoutDetaching([$adminRole->id]);
    }
}
