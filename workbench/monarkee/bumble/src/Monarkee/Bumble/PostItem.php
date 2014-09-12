<?php namespace Monarkee\Bumble;

use App, DB;
use dflydev\markdown\MarkdownParser;
use Carbon\Carbon;
use Monarkee\Bumble\Exceptions\ComponentNotFoundException;

class PostItem
{
    protected $item;
    protected $components;

    public function __construct($item, $itemCount, $isFirst, $isLast, $components = null)
    {
        $this->item = $item; // The original item object from the result set
        $this->itemCount = $itemCount; // The object's index in the array
        $this->isFirst = $isFirst; // Whether the item is first in the result set
        $this->isLast = $isLast; // Whether the item is last in the result set
        $this->components = $components; // The original components from the module
    }

    public function itemCount()
    {
        return $this->itemCount;
    }

    public function isFirst()
    {
        return $this->isFirst;
    }

    public function isLast()
    {
        return $this->isLast;
    }

    public function get($column, $transformations = false)
    {
        if (isset($this->item->$column)) {
            if ($transformations !== false)
            {
                return $this->transform($this->item->$column, $transformations);
            }
            return $this->item->$column;
        }
        throw new ComponentNotFoundException("There is no component `{$column}` in this module.");
    }

    /**
     * Get a related item
     * @param  string  $relationship
     * @return PostItem
     */
    public function getItem($relationship)
    {
        // Find the component with that $relationship
        $component = $this->components[$relationship];

        // JSON decode the options field to get the relationship data
        $relationshipData = json_decode($component['options']);

        // Get the relationship data from this module component
        $item = DB::table($relationshipData->module)
                    ->where('id', '=', $this->item->$relationship)
                    ->first();

        return new PostItem($item, 1, true, true);
    }

    public function permalink($path = false)
    {
        return url($path.'/'.$this->item->slug);
    }

    public function transform($value, $transformations)
    {
        $finalValue = $value;

        foreach ($transformations as $t => $tValue)
        {
            if ($t == 'dateFormat')
            {
                switch ($tValue) {
                    case 'diffForHumans':
                        $finalValue = Carbon::createFromTimestamp(strtotime($value))->diffForHumans();
                        break;
                    default:
                        // Return a carbon instance formatted like the user wants
                        $finalValue = Carbon::createFromTimestamp(strtotime($value))->format($tValue);
                        break;
                }
            }
            elseif ($t == 'format')
            {
                switch ($tValue) {
                    case 'markdown':
                        $parser = App::make('markdown');
                        $finalValue = $parser->transformMarkdown($value);
                        break;
                }
            }
        }
        return $finalValue;
    }
}
?>