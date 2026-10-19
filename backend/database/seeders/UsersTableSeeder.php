<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('users')->delete();
        
        \DB::table('users')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Admin Hải Phát',
                'email' => 'tranminhhoangdai@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$12$rJGxeby8MpvnzPdlQPXF/.DYQfMXMakQvAjxBXT6qOCiO5k0z0MeK',
                'remember_token' => NULL,
                'created_at' => '2026-10-09 08:42:19',
                'updated_at' => '2026-10-09 08:42:19',
            ),
        ));
        
        
    }
}