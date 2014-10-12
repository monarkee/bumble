<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;

class BinaryField extends Field
{
    public function isBinaryField()
    {
        return true;
    }

    public function process($model, $input)
    {
        $column = $this->getColumn();

        $model->{$this->getColumn()} = isset($input[$column]) ?: false;

        return $model;
    }
}
