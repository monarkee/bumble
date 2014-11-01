<?php namespace Monarkee\Bumble\Traits;

use Monarkee\Bumble\Support\Facades\Gravatar;

trait BumbleUserTrait {
    /**
     * Get the user's full name by concatenating
     * the first and last name columns
     *
     * @return string
     */
    public function getFullNameAttribute()
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
        return $this->attributes['first_name'];
    }

    /**
     * Get the last name of the user
     *
     * @return mixed
     */
    public function getLastName()
    {
        return $this->attributes['last_name'];
    }

    /**
     * Get the Gravatar URL for a user
     *
     * @return mixed
     */
    public function getAvatarAttribute()
    {
        return Gravatar::get($this->getField('email'));
    }
}
