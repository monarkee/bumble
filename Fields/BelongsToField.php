<?php

namespace Monarkee\Bumble\Fields;

use Exception;
use Monarkee\Bumble\Interfaces\FieldInterface;

class BelongsToField extends HasOneField implements FieldInterface
{
    /**
     * Makes sure the field is set up with all
     * the options it needs before proceeding
     */
    public function setUp()
    {
        if (!isset($this->options['related_title_column'])) {
            throw new Exception('BelongsToField requires option `related_title_column` to be set');
        }
    }

    public function getWidgetType()
    {
        // $widget = parent::getWidgetType();

        return $this->hasOption('widget') ? $this->getOption('widget') : $this->viewPrefix . '.HasOneField';
    }

    public function method()
    {
        // We're going to try and figure out the relation
        // by stripping _id from the column name. If not
        // then we're going to rely on the method option
        // being set.
        if ($this->hasOption('method')) {
            return $this->getOption('method');
        }

        return str_replace('_id', '', $this->getColumn());
    }
}
