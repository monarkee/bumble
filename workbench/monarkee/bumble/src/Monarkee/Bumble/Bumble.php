<?php namespace Monarkee\Bumble;

use Monarkee\Bumble\Posts;
use Monarkee\Bumble\Models\Module;
use Monarkee\Bumble\Exceptions\ModuleNotFoundException;

/**
 * This is a factory to create a new Posts object
 */
class Bumble {

    /**
     * Get a new Posts instance
     * @param  string $type The singular name of the table you want to get posts from
     * @return Monarkee\Bumble\Posts
     */
    public function get($type)
    {
        // Validate the $type value is a valid module, by checking the
        // modules table, then return a new Posts() object
        $module = Module::whereSystemName(str_plural($type))->first();

        if (!is_null($module))
        {
            return new Posts($type);
        }

        throw new ModuleNotFoundException('The module provided was not found in the database');
    }
}