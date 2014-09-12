<?php namespace Monarkee\Bumble\Models;

use Monarkee\Bumble\Models\BumbleModel;
use Monarkee\Bumble\Models\Component;
use Monarkee\Bumble\Validators\ModuleValidator;

class Module extends BumbleModel
{
    protected $table = 'modules';

    protected $fillable = ['name', 'system_name', 'sort_column', 'sort_order', 'description', 'active'];

    /**
     * Components Relation
     * @return Relationship
     */
    public function components()
    {
        return $this->hasMany('Monarkee\Bumble\Models\Component');
    }

    /**
     * Active Scope
     */
    public function scopeActive($query)
    {
        return $query->whereActive(1);
    }

    /**
     * Active color
     */
    public function getColorAttribute()
    {
        return $this->active == 1 ? 'green' : 'red';
    }

    // public function getSortOrderAttribute()
    // {
    //     // Get the property from the modules table
    //     $moduleData = Module::find($this->id);

    //     return $moduleData->sort_order;
    // }
}