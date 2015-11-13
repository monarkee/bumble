<?php

namespace Monarkee\Bumble\Fields;

use Carbon\Carbon;
use Monarkee\Bumble\Interfaces\FieldInterface;

class DateField extends TextField implements FieldInterface
{
    const DEFAULT_FORMAT = 'Y-m-d';

    public function hasFormat()
    {
        return isset($this->options['format']);
    }

    public function getFormat()
    {
        return isset($this->options['format']) ? $this->options['format'] : self::DEFAULT_FORMAT;
    }

    public function display($value)
    {
        return Carbon::parse($value)->format($this->getFormat());
    }
}
