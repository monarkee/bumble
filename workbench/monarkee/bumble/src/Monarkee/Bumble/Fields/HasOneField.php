<?php namespace Monarkee\Bumble\Fields;

class HasOneField extends Field
{
    public function getTitleOption()
    {
        return $this->options['title_column'];
    }
}
