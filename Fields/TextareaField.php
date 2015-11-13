<?php

namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;
use Monarkee\Bumble\Interfaces\FieldInterface;

class TextareaField extends Field implements FieldInterface
{
    /**
     * Get the number of rows a textarea should have
     *
     * @return bool
     */
    public function getRowsOption()
    {
        return isset($this->options['rows']) ? $this->options['rows'] : 10;
    }
}
