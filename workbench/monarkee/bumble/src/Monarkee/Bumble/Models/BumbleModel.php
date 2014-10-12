<?php namespace Monarkee\Bumble\Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Monarkee\Bumble\Exceptions\TableNotFoundException;
use ReflectionClass;
use Str;
use Config;

abstract class BumbleModel extends Eloquent
{

    /**
     * @var
     */
    public $validation = [];

    private $passwordFields;

    /**
     * @var
     */
    private $editValidation;

    private $slugFields;

    /**
     * @var Blueprint
     */
    private $schema;

    /**
     * @var
     */
    private $binaryFields;

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        $this->checkIfTableExists();

        if (method_exists($this, 'setComponents')) $this->setComponents();
        $this->setImageFields();
        $this->setBinaryFields();
        $this->setSlugFields();
        $this->setPasswordFields();
    }

    /**
     * @var
     */
    protected $description;

    /**
     * Whether the model should be hidden from the CMS
     *
     * @var
     */
    protected $invisible;

    /**
     * @var bool
     */
    protected $showInTopNav = false;

    /**
     * @var array
     */
    public $imageFields;

    /**
     */
    public function isSoftDeleting()
    {
        return in_array('Illuminate\Database\Eloquent\SoftDeletingTrait', class_uses($this));
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @return mixed
     */
    public function getComponents()
    {
        return $this->components;
    }

    /**
     * @var
     */
    protected $components;

    /**
     * @return mixed
     */
    abstract public function setComponents();

    /**
     * @return bool
     */
    public function hasComponents()
    {
        return isset($this->components);
    }

    /**
     * @return mixed
     */
    public function getModelName()
    {
        return sentence_name(ucwords(class_basename($this)));
    }

    /**
     * @return string
     */
    public function getPluralName()
    {
        return str_plural($this->getModelName());
    }

    /**
     * @return string
     */
    public function getPluralSlug()
    {
        return resource_name(class_basename($this));
    }

    /**
     * @param $field
     * @return bool
     */
    public function fieldIsRequired($field)
    {
        return array_key_exists($field->getLowerName(), $this->validation);
    }

    /**
     * @return mixed
     */
    public function getEditValidationRules()
    {
        return $this->editValidation;
    }

    /**
     * @return mixed
     */
    public function getValidationRules()
    {
        return $this->validation;
    }

    /**
     * @return string
     */
    public function getCreateLinkAttribute()
    {
        return url(Config::get('bumble::admin_prefix').'/'.$this->getPluralSlug().'/create');
    }

    /**
     * @return string
     */
    public function getIndexLinkAttribute()
    {
        $permalink = str_replace('_', '-', $this->system_name);
        return url(Config::get('bumble::admin_prefix').'/'.$permalink);
    }

    /**
     * @return mixed
     */
    public function isHidden()
    {
        return $this->invisible;
    }

    /**
     * @return bool
     */
    public function isHiddenFromTopNav()
    {
        if ($this->getShowinTopNav() === false) return true;
    }

    /**
     * @return boolean
     */
    public function getShowInTopNav()
    {
        return $this->showInTopNav;
    }

    /**
     * @return bool
     */
    public function hasImageFields()
    {
        // Loop through the components and determine if any are ImageFields
        foreach ($this->getComponents() as $component)
        {
            if ($component->isImageField()) return true;
        }
    }

    /**
     *
     */
    public function getImageFields()
    {
        return $this->imageFields;
    }

    /**
     *
     */
    private function setImageFields()
    {
        // Loop through the components and determine if any are ImageFields
        foreach ($this->getComponents() as $component)
        {
            if ($component->isImageField()) {
                $this->imageFields[] = $component;
            }
        }
    }

    /**
     * @return bool
     */
    public function hasBinaryFields()
    {
        foreach ($this->getComponents() as $component)
        {
            if ($component->isBinaryField()) return true;
        }
    }

    /**
     * @return mixed
     */
    public function getBinaryFields()
    {
        return $this->binaryFields;
    }

    /**
     *
     */
    private function setBinaryFields()
    {
        foreach ($this->getComponents() as $component) {
            if ($component->isBinaryField()) {
                $this->binaryFields[] = $component;
            }
        }
    }

    /**
     * @return bool
     */
    public function hasSlugFields()
    {
        foreach ($this->getComponents() as $component)
        {
            if ($component->isSlugField()) return true;
        }
    }

    /**
     * @return mixed
     */
    public function getSlugFields()
    {
        return $this->slugFields;
    }

    /**
     *
     */
    private function setSlugFields()
    {
        foreach ($this->getComponents() as $component) {
            if ($component->isSlugField()) {
                $this->slugFields[] = $component;
            }
        }
    }

    /**
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

    public function hasFieldTypes($type)
    {
        foreach ($this->getComponents() as $component)
        {
            if ($component->isFieldType($type)) return true;
        }
    }

    public function getPasswordFields()
    {
        return $this->passwordFields;
    }

    public function setPasswordFields()
    {
        foreach ($this->getComponents() as $component) {
            if ($component->isFieldType('PasswordField')) {
                $this->passwordFields[] = $component;
            }
        }
    }
}
