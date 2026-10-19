<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserRolesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('user_roles')->delete();
        
        \DB::table('user_roles')->insert(array (
            0 => 
            array (
                'id' => 1,
                'user_id' => 1,
                'role_id' => 'd63e18b2-b8ec-4fc1-80bc-10409a0d4203',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
        ));
        
        
    }
}