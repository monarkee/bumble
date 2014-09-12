<?php namespace Monarkee\Bumble\Models;

use DB;
use DirectoryIterator;
use Monarkee\Bumble\Models\BumbleModel;
use Monarkee\Bumble\Models\Module;
use Monarkee\Bumble\Models\ComponentType;

class Component extends BumbleModel
{
    protected $table = 'components';

    protected $fillable = ['component_type', 'module_id', 'name', 'column', 'display_listing', 'active', 'sort_order', 'description', 'options', 'validation'];

    public function module()
    {
        return $this->belongsTo('Monarkee\Bumble\Models\Module');
    }

    /**
     * (MOVING THIS TO CLASS-BASED FIELD DEFINITIONS SOON)
     * Return the type relation of the component
     * @return [type] [description]
     */
    // public function type()
    // {
    //     return $this->hasOne('Monarkee\Bumble\Models\ComponentType', 'id', 'component_type_id');
    // }

    public function type()
    {
        $class = 'Monarkee\\Bumble\\ComponentTypes\\' . $this->component_type . 'Component';
        return new $class;
    }

    public function columnType()
    {
        $class = 'Monarkee\\Bumble\\ComponentTypes\\' . $this->component_type . 'Component';
        return (new $class)->columnType;
    }

    public static function componentTypes()
    {
        $types = [];

        // // Foreach class file in the ComponentTypes folder, add it to the array of types
        foreach (new \DirectoryIterator(dirname(__FILE__).'/../ComponentTypes') as $file)
        {
            if ($file->isFile() and $file->getFilename() !== 'BaseComponent.php')
            {
                $key = str_replace('.php', '', $file->getFilename());
                $class = 'Monarkee\\Bumble\\ComponentTypes\\'.$key;
                $types[(new $class)->name] = (new $class)->name;
            }
        }

        // dd($types);
        return $types;
    }

    public function editLink($module)
    {
        return route('admin.'.module_name($module->system_name).'.edit');
        // return route('bumble_posts_edit', ['system_name' => swap_sep($this->module->system_name, '_', '-'), 'id' => $id]);
    }

    public function scopeOrdered($query, $column = 'sort_order', $direction = 'asc')
    {
        return $query->orderBy($column, $direction);
    }

    public function scopeDisplayInListing($query)
    {
        return $query->whereDisplayListing(1);
    }

    public function getValidationStringAttribute()
    {
        $string = json_decode($this->validation);
        return $string->validation_string;
    }

    public function setValidationStringAttribute($value)
    {
        $this->attributes['validation_string'] = json_encode($value);
    }

    public function getRelationValues()
    {
        // Get this fields options array, and return an array of `id => display_column` values
        $options = json_decode($this->options);
        return DB::table($options->module)->lists($options->display_column, 'id');
    }
}
