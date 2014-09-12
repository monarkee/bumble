<?php namespace Monarkee\Bumble\Models;

use Eloquent;
use Illuminate\Database\Eloquent\SoftDeletingTrait;
use ReflectionClass;
use Str;
use Config;

class BumbleModel extends Eloquent
{
    protected static $fields;

    public function __construct()
    {
        if (method_exists($this, 'setFields')) $this->setFields();
    }

    public function hasFields()
    {
        return isset($this->fields);
    }

    // public function update(array $attributes = [])
    // {
        // $class = get_class($this);
        // $path = "Monarkee\\Bumble\\Services\\{$class}Validator";

        // if (class_exists($path))
        // {
        //     App::make($path)->validateForUpdate($attributes);
        // }

        // return parent::update($attributes);
    // }

    public function getCreateLinkAttribute()
    {
        $permalink = str_replace('_', '-', $this->system_name);
        return url(Config::get('bumble::urls.admin_prefix').'/'.$permalink.'/create');
    }

    public function getIndexLinkAttribute()
    {
        $permalink = str_replace('_', '-', $this->system_name);
        return url(Config::get('bumble::urls.admin_prefix').'/'.$permalink);
    }
}
