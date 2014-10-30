<?php namespace Monarkee\Bumble\Traits;

use Thomaswelton\LaravelGravatar\Facades\Gravatar;

trait BumbleUserTrait {
    /**
     * Get the user's full name by concatenating
     * the first and last name columns
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        return trim($this->first_name .' '.$this->last_name);
    }

    /**
     * Get the Gravatar URL for a user
     *
     * @return mixed
     */
    public function getAvatarAttribute()
    {
        return Gravatar::src($this->getField('email'));
    }
}
