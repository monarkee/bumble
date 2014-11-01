<?php namespace Monarkee\Bumble\Support\Facades;

use Illuminate\Support\Facades\Facade;

class Gravatar extends Facade
{
    protected static function getFacadeAccessor() { return 'bumble-gravatar'; }
}
