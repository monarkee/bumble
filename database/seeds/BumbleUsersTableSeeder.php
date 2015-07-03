<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class BumbleUsersTableSeeder extends Seeder {

    public function run()
    {
        // Uncomment the below to wipe the table clean before populating
//        DB::table('users')->truncate();

        $users = array([
            'email' => 'admin@bumble.dev',
            'first_name' => 'Bumble',
            'last_name' => 'Administrator',
            'password' => bcrypt('password'),
            'active' => true,
            'created_at' => new Carbon,
            'updated_at' => new Carbon,
        ]);

        // Uncomment the below to run the seeder
        DB::table('users')->insert($users);
    }

}
