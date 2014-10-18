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
//        if (empty($this->tabs)) $this->tabs[] = [];

        $this->assignTabs($this->originalFields);
    }

    public function getTabs()
    {
        return $this->tabs;
    }

    public function getTabFields($tabId)
    {
//        dd($this->tabs);
        return $this->tabs[$tabId];
//        return $tab->fields;
    }

    /**
     * @param $field
     */
    private function assignTabs($tabs = [])
    {
        foreach ($tabs as $key => $fields)
        {
            if (is_array($fields))
            {
                $this->tabs[$key] = $fields;
                $this->assignTabs($fields);
            }
            else
            {
                $this->fields[] = $fields;
            }
        }

        if (empty($this->tabs))
        {
            $this->tabs['content'] = $this->fields;
        }
    }
}
