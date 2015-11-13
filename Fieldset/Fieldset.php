<?php

namespace Monarkee\Bumble\Fieldset;

use Whoops\Example\Exception;

class Fieldset
{
    public $fields;

    protected $tabs;

    protected $originalFields;

    public function __construct(array $fields = [])
    {
        $this->originalFields = $fields;

        $this->assignTabs($this->originalFields);
    }

    public function getFields()
    {
        return $this->fields;
    }

    /**
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

    public function getTabFields($tabId)
    {
        return $this->tabs[$tabId];
    }

    public function getField($fieldName)
    {
        return $this->fields[$fieldName];
    }

    public function getTabs()
    {
        return $this->tabs;
    }
}
