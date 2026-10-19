<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('roles')->delete();
        
        \DB::table('roles')->insert(array (
            0 => 
            array (
                'id' => 'd63e18b2-b8ec-4fc1-80bc-10409a0d4203',
                'name' => 'Admin',
                'description' => 'Quản trị viên toàn quyền',
                'created_at' => '2026-10-09 08:42:19',
                'updated_at' => '2026-10-09 08:42:19',
            ),
        ));
        
        
    }
}