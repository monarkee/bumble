<?php

namespace Monarkee\Bumble\Traits;

use Monarkee\Bumble\Support\Facades\Gravatar;

trait BumbleUserTrait
{
    /**
     * Get the Gravatar URL for a user
     *
     * @return mixed
     */
    public function getAvatar()
    {
        $config = app('config');
        return $config->has('bumble.email') ? Gravatar::get($this->attributes[$config->get('bumble.email')]) : $this->attributes['email'];
    }
}
