<?php

namespace Monarkee\Bumble\Fieldset;

use Exception;

class Fieldset
{
    /**
     * The fields for the Fieldset
     * @var array
     */
    public $fields;

    /**
     * The tabs for the Fieldset
     * @var array
     */
    protected $tabs;

    /**
     * The original configuration passed in
     * @var array
     */
    protected $originalFields;

    /**
     * Create a new instance
     * @param array $fields
     */
    public function __construct(array $fields = [])
    {
        $this->originalFields = $fields;

        $this->assignTabs($this->originalFields);
    }

    /**
     * Get the fields for the fieldset
     * @return array
     */
    public function getFields()
    {
        $this->checkForFields();

        return $this->fields;
    }

    /**
     * Assign the tabs for the Fieldset
     * @param array $tabs
     * @internal param $field
     */
    public function assignTabs($tabs = [])
    {
        foreach ($tabs as $key => $fields) {
            if (is_array($fields)) {
                $this->tabs[$key] = $fields;
                $this->assignTabs($fields);
            } else {
                $this->fields[] = $fields;
            }
        }

        // If the tabs are empty after that, then we were
        // given a flat array so create a default one
        // called 'content' and assign the fields to that
        if (empty($this->tabs)) {
            $this->tabs['content'] = $this->fields;
        }
    }

    /**
     * Get a tab from the Fieldset
     * @param  string $tabId
     * @return array
     */
    public function getTabFields($tabId)
    {
        $this->checkForFields();

        return $this->tabs[$tabId];
    }

    /**
     * Get a field from the Fieldset
     * @param  string $fieldName
     * @return array
     */
    public function getField($fieldName)
    {
        return $this->fields[$fieldName];
    }

    /**
     * Get the tabs for the Fieldset
     * @return array
     */
    public function getTabs()
    {
        return $this->tabs;
    }

    /**
     * Check if the Fieldset has fields assigned
     * @return void
     */
    protected function checkForFields()
    {
        if (empty($this->fields)) {
            throw new Exception('Model admins must have at least one field defined.');
        }
    }
}
