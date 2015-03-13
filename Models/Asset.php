<?php namespace Monarkee\Bumble\Models;

use Monarkee\Bumble\Admins\AssetAdmin;

class Asset extends BumbleModel
{
    public function bumble()
    {
        return $this->hasAdmin(AssetAdmin::class);
    }
}
