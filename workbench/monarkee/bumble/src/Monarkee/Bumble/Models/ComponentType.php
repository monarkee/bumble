<?php namespace Monarkee\Bumble\Models;

use Monarkee\Bumble\Models\BumbleModel;
use Monarkee\Bumble\Models\Component;

class ComponentType extends BumbleModel
{
    protected $table = 'component_types';

    public function components()
    {
        return $this->hasMany('Monarkee\Bumble\Models\Component');
    }

    public function types()
    {
        return ComponentType::lists('name', 'id');
    }
}