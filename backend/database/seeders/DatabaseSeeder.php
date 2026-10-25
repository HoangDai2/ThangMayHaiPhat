<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Tắt kiểm tra khóa ngoại trong lúc seed dữ liệu
        Schema::disableForeignKeyConstraints();

        $this->command->info('Bắt đầu nạp dữ liệu phân quyền & tài khoản...');
        $this->call([
            RolesTableSeeder::class,
            PermissionsTableSeeder::class,
            UsersTableSeeder::class,
            UserRolesTableSeeder::class,
        ]);

        $this->command->info('Bắt đầu nạp dữ liệu nội dung website...');
        $this->call([
            ServicesTableSeeder::class,
            ProductsTableSeeder::class,
            ProjectsTableSeeder::class,
            ArticlesTableSeeder::class,
            BannersTableSeeder::class,
            ReviewsTableSeeder::class,
            PromotionsTableSeeder::class,
            ContactsTableSeeder::class,
        ]);

        $this->command->info('Bắt đầu nạp dữ liệu Bitrix CRM...');
        $this->call([
            BitrixUsersTableSeeder::class,
            BitrixCustomersTableSeeder::class,
            BitrixProjectsTableSeeder::class,
            BitrixTasksTableSeeder::class,
            BitrixTaskFilesTableSeeder::class,
            BitrixTaskCommentsTableSeeder::class,
        ]);

        // Bật lại kiểm tra khóa ngoại
        Schema::enableForeignKeyConstraints();

        $this->command->info('Đã hoàn tất nạp toàn bộ database mẫu thành công!');
    }
}
