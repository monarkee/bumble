<?php namespace Monarkee\Bumble\Fields;

class HasOneField extends Field
{
    public function getTitleOption()
    {
        return isset($this->options['title_column']) ? $this->options['title_column'] : 'title';
    }
}
