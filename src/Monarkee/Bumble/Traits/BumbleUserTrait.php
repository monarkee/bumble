<?php namespace Monarkee\Bumble\Traits;

use Monarkee\Bumble\Support\Facades\Gravatar;

trait BumbleUserTrait {
    /**
     * Get the user's full name by concatenating
     * the first and last name columns
     *
     * @return string
     */
    public function getFullName()
    {
        return trim($this->getFirstName() .' '.$this->getLastName());
    }

    /**
     * Get the first name of the user
     *
     * @return mixed
     */
    public function getFirstName()
    {
        $config = app('config');
        return $config->has('bumble::first_name') ? $this->attributes[$config->get('bumble::first_name')] : $this->attributes['first_name'];
    }

    /**
     * Get the last name of the user
     *
     * @return mixed
     */
    public function getLastName()
    {
        $config = app('config');
        return $config->has('bumble::last_name') ? $this->attributes[$config->get('bumble::last_name')] : $this->attributes['last_name'];
    }

    /**
     * Get the Gravatar URL for a user
     *
     * @return mixed
     */
    public function getAvatar()
    {
        $config = app('config');
        return $config->has('bumble::email') ? Gravatar::get($this->attributes[$config->get('bumble::email')]) : $this->attributes['email'];
    }
}
