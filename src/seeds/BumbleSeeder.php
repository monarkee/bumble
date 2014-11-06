<?php

class BumbleSeeder extends Seeder
{
    public function run()
    {
        $this->call('BumbleUsersTableSeeder');

        $this->command->info('Default Bumble user was successfully installed');
    }
}
