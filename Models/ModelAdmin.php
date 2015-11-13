<?php

namespace Monarkee\Bumble\Models;

class ModelAdmin
{
    /**
     * Whether the model should be hidden from the CMS
     *
     * @var boolean
     */
    public $invisible = false;

    /**
     * Whether to show the ID field in the listing
     *
     * @var boolean
     */
    public $showIdInListing;

    /**
     * Whether to show the model in the top nav
     *
     * @var bool
     */
    public $showInTopNav = false;

    /**
     * Whether to show the model in the side nav
     *
     * @var bool
     */
    public $showInSideNav = true;

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
    public $editingTitle;

    /**
     * The edit validation rules
     *
     * @var
     */
    public $editRules;

    /**
     * The description for the model
     *
     * @var $description
     */
    public $description;

    /**
     * The fields of the model
     *
     * @var
     */
    protected $fields;

    /**
     * The fieldset for the model
     *
     * @var
     */
    protected $fieldset;

    /**
     * Create a new ModelAdmin object
     */
    public function __construct()
    {
        $this->fieldset = $this->setFields();
    }

    /**
     * Check whether the model has fields
     *
     * @return bool
     */
    public function hasFields()
    {
        return isset($this->fields);
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

    public function getValidationRules()
    {
        return $this->rules;
    }

    public function getEditValidationRules()
    {
        return $this->editRules ?: $this->getValidationRules();
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

    public function fieldIsRequired($field)
    {
        $field_name = $field->getLowerName();

        if (array_key_exists($field_name, $this->rules)) {
            if (is_array($this->rules[$field_name])) {
                return in_array('required', $this->rules[$field_name]);
            }

            return str_contains($this->rules[$field_name], 'required');
        }
    }

    /**
     * Whether to show the ID field in the listing
     * @return boolean
     */
    public function showIdInListing()
    {
        return $this->showIdInListing ?: false;
    }

    /**
     * Allow the user to set a custom id field
     * @return string
     */
    public function getIdColumn()
    {
        return isset($this->idColumn) ? $this->idColumn : 'id';
    }
}
