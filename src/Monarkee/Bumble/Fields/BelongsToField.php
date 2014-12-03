<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Interfaces\FieldInterface;

class BelongsToField extends HasOneField implements FieldInterface
{
    public function getWidgetType()
    {
        $widget = parent::getWidgetType();

        return $this->hasOption('widget') ? $this->getOption('widget') : $this->viewPrefix . '.HasOneField';
    }
}
