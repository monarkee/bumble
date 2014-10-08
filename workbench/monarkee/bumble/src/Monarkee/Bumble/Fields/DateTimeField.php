<?php namespace Monarkee\Bumble\Fields;

use Carbon\Carbon;

class DateTimeField extends TextField
{
    const DEFAULT_FORMAT = 'l jS \\of F Y h:i:s A';



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
