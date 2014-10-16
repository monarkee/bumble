<?php namespace Monarkee\Bumble\Fieldset;

use Whoops\Example\Exception;

class Fieldset
{
    public $fields;

    protected $tabs;

    protected $originalFields;

    public function __construct(array $fields = [])
    {
        $this->originalFields = $fields;

        $this->setTabs();
    }

    /**
     * @return array
     */
    public function getFields()
    {
        return $this->fields;
    }

    /**
     * @param array $fields
     */
//    public function setFields($fields)
//    {
//        $this->fields = $fields;
//    }

    public function setTabs()
    {
        // Check the tabs property and if it's not empty
        // we know we have tabs and can assign a new tab
        // instead of creating one
        if (empty($this->tabs)) $this->tabs['content'] = [];

        $this->assignFields($this->originalFields);
    }

    public function getTabs()
    {
        return $this->tabs;
    }

    /**
     * @param $field
     */
    private function assignFields($fields = [])
    {
        foreach ($fields as $field)
        {
            if (is_array($field))
            {
                $this->tabs[] = $field;

                $this->assignFields($field);
            }
            else
            {
                $this->tabs['content'] = $field;

                $this->fields[] = $field;
            }
        }
    }
}
