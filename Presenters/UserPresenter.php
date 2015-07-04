<?php

namespace Monarkee\Bumble\Presenters;

use Exception;
use App\User;
use Monarkee\Bumble\Support\Gravatar;

class UserPresenter
{
    function __construct(User $user) {
        $this->user = $user;
    }

    /**
     * Get the Gravatar for the User
     * @return string
     */
    public function getAvatar()
    {
        $avatarColumn = config('bumble.avatar');

        return app(Gravatar::class)->get($this->user->$avatarColumn);
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