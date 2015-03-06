<?php namespace Monarkee\Bumble\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Illuminate\Database\Schema\Blueprint;
use Schema;
use Monarkee\Bumble\Exceptions\TableNotFoundException;
use ReflectionClass;
use Str;
use Config;
use App;
use Request;

abstract class BumbleModel extends Model
{
    /**
     * If not in the admin, boot the traits of the model
     *
     * @return void
     */
    protected static function bootTraits()
    {
        $segment = Request::segment(1);

        if ($segment == config('bumble.admin_prefix') && self::enableTraits() == true)
        {
            parent::bootTraits();
        }
        elseif ($segment !== config('bumble.admin_prefix'))
        {
            parent::bootTraits();
        }

        // Boot soft-delete trait all the time
        if (method_exists(get_called_class(), $method = 'bootSoftDeletes'))
        {
            forward_static_call([get_called_class(), $method]);
        }
    }

    /**
     * Create a new BumbleModel
     *
     * @param array $attributes
     * @throws TableNotFoundException
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        $this->checkIfTableExists();

        // Set up the model's fieldset by going to the config
        // and spinning up the class
        $modelConfig = config('bumble.models');

        if (method_exists($this, 'bumble'))
        {
            $adminClass = $this->bumble();
            $this->admin = new $adminClass;
        }
    }

    /**
     * Whether to enable traits
     * @var boolean
     */
    protected static $enableTraits = false;

    /**
     * The admin instance
     *
     * @var $admin
     */
    protected $admin;

    /**
     * Return the model's related admin class
     *
     * @param $adminClass
     * @return string
     */
    public function hasAdmin($adminClass)
    {
        return $adminClass;
    }

    /**
     * Get the model's ModelAdmin instance
     *
     * @return mixed
     */
    public function admin()
    {
        return $this->admin;
    }

    /**
     * Find out if the model supports Soft Deletes
     *
     * @return boolean
     */
    public function isSoftDeleting()
    {
        return in_array('Illuminate\Database\Eloquent\SoftDeletes', class_uses($this));
    }

    /**
     * Get the description for the model
     *
     * @return mixed
     */
    public function getDescription()
    {
        return $this->admin()->description;
    }

    /**
     * Get the fields for the model
     *
     * @return mixed
     */
    public function getFields()
    {
        return $this->admin()->getFields();
    }

    /**
     * Check whether the model has fields
     *
     * @return bool
     */
    public function hasFields()
    {
        return $this->admin()->hasFields();
    }

    /**
     * Get the tabs for the model
     *
     * @return mixed
     */
    public function getTabs()
    {
        return $this->admin()->getTabs();
    }

    /**
     * Get the fields in a certain tab by ID
     *
     * @param $tabId
     * @return mixed
     */
    public function getTabFields($tabId)
    {
        return $this->admin()->getTabFields($tabId);
    }

    /**
     * Get the model's name
     *
     * @return mixed
     */
    public function getModelName()
    {
        return sentence_name(ucwords(class_basename($this)));
    }

    /**
     * Get the plural name for the model
     *
     * @return string
     */
    public function getPluralName()
    {
        return str_plural($this->getModelName());
    }

    /**
     * Get the plural slug for the model
     *
     * @return string
     */
    public function getPluralSlug()
    {
        return resource_name(class_basename($this));
    }

    /**
     * Check whether a field is required on the model
     *
     * @param $field
     * @return bool
     */
    public function fieldIsRequired($field)
    {
        return $this->admin()->fieldIsRequired($field);
    }

    /**
     * Get the edit validation rules for the model
     *
     * @return mixed
     */
    public function getEditValidationRules()
    {
        return $this->admin()->getEditValidationRules();
    }

    /**
     * Get the validation rules for the model
     *
     * @return mixed
     */
    public function getValidationRules()
    {
        return $this->admin()->getValidationRules();
    }

    /**
     * Check if the model is hidden completely from the CMS
     *
     * @return mixed
     */
    public function isHidden()
    {
        return $this->admin()->invisible;
    }

    /**
     * Check if the model is hidden from the top nav
     *
     * @return bool
     */
    public function isHiddenFromTopNav()
    {
        if ($this->getShowInTopNav() === false) return true;
    }

    /**
     * Check if the model is hidden from the top nav
     *
     * @return bool
     */
    public function isHiddenFromSideNav()
    {
        if ($this->getShowInSideNav() === false) return true;
    }

    /**
     * Check whether to show this model in the top navigation
     *
     * @return boolean
     */
    public function getShowInTopNav()
    {
        return $this->admin()->showInTopNav;
    }

    /**
     * Check whether to show this model in the top navigation
     *
     * @return boolean
     */
    public function getShowInSideNav()
    {
        return $this->admin()->showInSideNav;
    }


    /**
     * Check if the table exists for the model
     *
     * @return bool
     * @throws TableNotFoundException
     */
    public function checkIfTableExists()
    {
        if (!Schema::hasTable($this->getTable()))
        {
            throw new TableNotFoundException("The specified table '{$this->getTable()}' doesn't exist.");
        }

        return true;
    }

    /**
     * Check for arbitrary Field Types on the model
     *
     * @param $type
     * @return bool
     */
    public function hasFieldTypes($type)
    {
        foreach ($this->getFields() as $component)
        {
            if ($component->isFieldType($type)) return true;
        }
    }

    /**
     * Get the required class name of the model
     *
     * @param $field
     * @return string
     */
    public function getRequiredClass($field)
    {
        return $this->fieldIsRequired($field) ? ' required' : '';
    }

    /**
     * Get the specified field for the model
     *
     * @param $field
     * @return mixed|string
     */
    public function getField($field)
    {
        return isset($this->{$field}) ? $this->{$field} : '';
    }

    /**
     * Get the editing title for the model
     *
     * @return mixed
     */
    public function editingTitle()
    {
        $editingTitle = $this->admin()->editingTitle;

        // Check for the custom option first and
        // return it if it exists
        if ($this->columnExists($editingTitle)) return $this->{$editingTitle};

        // As a last-ditch effort, see if there's a title option
        // we can use so the user doesn't have to ask for it
        if ($this->columnExists('title')) return $this->title;

        return;
    }

    /**
     * Check if a column exists on a the model's table
     * @param $column
     * @return mixed
     */
    public function columnExists($column)
    {
        return Schema::hasColumn($this->getTable(), $column);
    }

    /**
     * Enable the Model's traits
     * @return boolean
     */
    public static function enableTraits()
    {
        return static::$enableTraits;
    }
}
