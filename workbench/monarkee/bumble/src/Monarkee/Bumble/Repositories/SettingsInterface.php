<?php namespace Monarkee\Bumble\Repositories;

use Monarkee\Bumble\Models\Setting;

interface SettingsInterface
{
    /**
     * Get all the settings in the database
     * @param string $value
     */
    public function all();

    /**
     * Create a setting in the database
     * @param array $input
     */
    public function create($input);

    /**
     * Update a setting in the database
     * @param integer $id
     * @param array $input
     */
    public function update($id, $input);

    /**
     * Get a setting from the database
     * @param string $key
     */
    public function get($key);
}