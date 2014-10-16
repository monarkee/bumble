<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Interfaces\FieldInterface;

class DropdownField extends Field implements FieldInterface
{
    public function getTitleOption()
    {
        return isset($this->options['title_column']) ? $this->options['title_column'] : 'title';
    }

    public function getValues()
    {
        return isset($this->options['options']) ? $this->options['options'] : [];
    }

    public function getDefaultOption()
    {
        return isset($this->options['default']) ? $this->options['default'] : null;
    }

    public function getValue($key)
    {
        return $this->options['options'][$key];

    }

}
