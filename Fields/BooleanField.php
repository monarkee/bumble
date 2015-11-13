<?php

namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;
use Monarkee\Bumble\Interfaces\FieldInterface;

class BooleanField extends Field implements FieldInterface
{
    /**
     * Process the model, assign its input and return the model to the user
     *
     * @param $model
     * @param $input
     * @return mixed
     */
    public function process($model, $input)
    {
        $column = $this->getColumn();

        $model->{$this->getColumn()} = isset($input[$column]) ?: false;

        return $model;
    }
}
