<?php namespace Monarkee\Bumble\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Monarkee\Bumble\Exceptions\TableNotFoundException;
use ReflectionClass;
use Str;
use Config;
use Request;

abstract class BumbleModel extends Eloquent
{
    /**
     * If not in the admin, boot the traits of the model
     *
     * @return void
     */
    protected static function bootTraits()
    {
        if (Request::segment(1) !== Config::get('bumble::admin_prefix'))
        {
            parent::bootTraits();
        }

        // Boot soft-delete trait all the time
        if (method_exists(get_called_class(), $method = 'bootSoftDeletingTrait'))
        {
            forward_static_call([get_called_class(), $method]);
        }
    }

    /**
     * The fieldset for the model
     *
     * @var
     */
    protected $fieldset;

    /**
     * The validation rules used for creation and updating
     *
     * @var
     */
    public $rules = [];

    /**
     * The editing title key for the model
     *
     * @var
     */
    protected $editingTitle;

    /**
     * The edit validation rules
     *
     * @var
     */
    private $editRules;

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
        $this->fieldset = $this->setFields();
    }

    /**
     * @var
     */
    public $description;

    /**
     * Whether the model should be hidden from the CMS
     *
     * @var
     */
    public $invisible;

    /**
     * Whether to show the model in the top nav
     *
     * @var bool
     */
    public $showInTopNav = false;

    /**
     * Find out if the model supports Soft Deletes
     *
     * @return boolean
     */
    public function isSoftDeleting()
    {
        return in_array('Illuminate\Database\Eloquent\SoftDeletingTrait', class_uses($this));
    }

    /**
     * Get the description for the model
     *
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Get the fields for the model
     *
     * @return mixed
     */
    public function getFields()
    {
        return $this->fieldset->getFields();
    }

    /**
     * The fields of the model
     *
     * @var
     */
    protected $fields;

    /**
     * Set the fields on the model
     *
     * @return mixed
     */
    abstract public function setFields();

    /**
     * Check wheter the model has fields
     *
     * @return bool
     */
    public function hasFields()
    {
        return isset($this->fields);
    }

    /**
     * Get the tabs for the model
     *
     * @return mixed
     */
    public function getTabs()
    {
        return $this->fieldset->getTabs();
    }

    /**
     * Get the fields in a certain tab by ID
     *
     * @param $tabId
     * @return mixed
     */
    public function getTabFields($tabId)
    {
        return $this->fieldset->getTabFields($tabId);
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
        return array_key_exists($field->getLowerName(), $this->rules);
    }

    /**
     * Get the edit validation rules for the model
     *
     * @return mixed
     */
    public function getEditValidationRules()
    {
        return $this->editRules;
    }

    /**
     * Get the validation rules for the model
     *
     * @return mixed
     */
    public function getValidationRules()
    {
        return $this->rules;
    }

    /**
     * Check if the model is hidden completely from the CMS
     *
     * @return mixed
     */
    public function isHidden()
    {
        return $this->invisible;
    }

    /**
     * Check if the model is hidden from the top nav
     *
     * @return bool
     */
    public function isHiddenFromTopNav()
    {
        if ($this->getShowinTopNav() === false) return true;
    }

    /**
     * Check whether to show this model in the top navigation
     *
     * @return boolean
     */
    public function getShowInTopNav()
    {
        return $this->showInTopNav;
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
        if ($this->columnExists($this->editingTitle)) return $this->{$this->editingTitle};

        if ($this->columnExists('title')) return $this->title;

        return '';
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
}
