<?php namespace Monarkee\Bumble\Fields;

class SlugField extends TextField
{
    public function isSlugField()
    {
        return true;
    }

    public function getSetFrom()
    {
        return isset($this->options['set_from']) ? $this->options['set_from'] : false;
    }

    public function isRequired()
    {
        return isset($this->options['set_from']) ? false : true;
    }
}
