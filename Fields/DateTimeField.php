<?php namespace Monarkee\Bumble\Fields;

use Carbon\Carbon;
use Monarkee\Bumble\Interfaces\FieldInterface;

class DateTimeField extends TextField implements FieldInterface
{
    const DEFAULT_FORMAT = 'M d Y';

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
        if (is_null($value)) return 'NULL';

        return Carbon::parse($value)->format($this->getFormat());
    }

    /**
     * Process the DateTimeField data
     *
     * @param $model
     * @param $input
     * @return BumbleModel
     */
    public function process($model, $input)
    {
        $column = $this->getColumn();

        // Handle a special case where the data in the database is 0000-00-00 00:00:00
        if ($input[$column] == '-0001-11-30 00:00:00' || $input[$column] == '0000-00-00 00:00:00')
        {
            $model->{$column} = Carbon::now();
        }
        elseif (isset($input[$column]))
        {
            $model->{$column} = $input[$column];
        }

        if (empty($input[$column])) $model->{$column} = null;

        return $model;
    }
}
