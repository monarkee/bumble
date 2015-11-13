<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class BumbleUsersTableSeeder extends Seeder {

    public function run()
    {
        $users = array([
            'email' => 'admin@bumble.dev',
            'name' => 'Bumble Administrator',
            'password' => bcrypt('password'),
            'active' => true,
            'created_at' => new Carbon,
            'updated_at' => new Carbon,
        ]);

        // Uncomment the below to run the seeder
        DB::table('users')->insert($users);
    }

}
