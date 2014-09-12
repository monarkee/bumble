<?php namespace Monarkee\Bumble\Facades;

use Illuminate\Support\Facades\Facade;

class Bumble extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor() { return 'bumble'; }
}