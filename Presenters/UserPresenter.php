<?php

namespace Monarkee\Bumble\Presenters;

use Exception;
use Monarkee\Bumble\Support\Gravatar;
use Illuminate\Contracts\Auth\Authenticatable as Authenticatable;

class UserPresenter
{
    public function __construct(Authenticatable $authenticatable)
    {
        $this->user = $authenticatable;
    }

    /**
     * Get the Gravatar for the User
     * @return string
     */
    public function getAvatar()
    {
        $avatarColumn = config('bumble.avatar');

        return app(Gravatar::class)->get($this->user->{$avatarColumn});
    }

    /**
     * Pass on calls to the Presented User object
     * @param  string $name
     * @return mixed
     */
    public function __get($name)
    {
        return $this->user->__get($name);
    }
}
