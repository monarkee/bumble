<?php namespace Monarkee\Bumble;

use DB;
use stdClass;
use Exception;
use Monarkee\Bumble\PostItem;

class Posts
{
    /**
     * The original type variable passed
     */
    protected $singularType;

    /**
     * The plural name of the passed Post type
     * @var string
     */
    protected $type;

    /**
     * The offset for the query
     * @var integer
     */
    protected $offset;

    /**
     * The component data for the Post query
     */
    protected $components;

    /**
     * The number of rows that should be returned
     */
    protected $limit;
    protected $whereClauses = [];
    protected $orWhereClauses = [];
    protected $returnItems = []; // The final array of items returned from getItems
    protected $hasItems;
    protected $queryRan;
    protected $returnCount;

    public function __construct($type)
    {
        $this->singularType = $type;
        $this->type = str_plural($type);
    }

    /**
     * The type of post to get
     * @param  string $string The table name in singular form
     * @return object
     */
    public function get($string)
    {
        // Reset the object
        $this->reset();
        return $this;
    }

    /**
     * Return the value of $this->type
     * @return string The type of post asked for
     */
    public function getType()
    {
        return $this->singularType;
    }

    /**
     * Limit the query
     * @param  integer $amount The amount of Items to retrieve
     * @return object Monarkee\Bumble\Item
     */
    public function limit($amount)
    {
        $this->limit = $amount;
        return $this;
    }

    /**
     * Attach a WHERE clause to the query
     * @param  string $column
     * @param  string $operator
     * @param  string $value
     * @return Monarkee\Bumble\Posts
     */
    public function where($column, $operator, $value)
    {
        $clause = new stdClass;
        $clause->column = $column;
        $clause->operator = $operator;
        $clause->value = $value;

        $this->whereClauses[] = $clause;
        return $this;
    }

    /**
     * Attach an OR WHERE clause to the query
     * @param  string $column
     * @param  string $operator
     * @param  string $value
     * @return Monarkee\Bumble\Posts
     */
    public function orWhere($column, $operator, $value)
    {
        $clause = new stdClass;
        $clause->column = $column;
        $clause->operator = $operator;
        $clause->value = $value;

        $this->orWhereClauses[] = $clause;
        return $this;
    }

    /**
     * Get the items, if you haven't already. If you have, just return those items
     * @return array Monarkee\Bumble\PostItem
     */
    public function getItems()
    {
        if (!is_null($this->queryRan)) // We've ran the query before
        {
            if ($this->hasItems())
            {
                return $this->returnItems;
            }
        }
        else
        {
            $this->retrieveItems();

            if ($this->hasItems)
            {
                return $this->returnItems;
            }

            // We could throw an Exception here of our own, but instead we'll catch it and let them go on about their day
            throw new Exception("There are no posts in the module `{$this->type}`");
        }
    }

    /**
     * Returns whether the query gave us results
     * @return boolean
     */
    public function hasItems()
    {
        $this->retrieveItems(); // We'll do the query and $this->hasItems will be set properly, so we can return it
        return $this->hasItems;
    }

    /**
     * Retrieve the items from the database and load them into the returnItems array
     * @return void
     */
    private function retrieveItems()
    {
        // Reset the Query
        $this->resetQuery();

        // Set up a query
        $query = DB::table($this->type);

        // Loop through the where clauses
        foreach ($this->whereClauses as $where)
        {
            $query->where($where->column, $where->operator, $where->value);
        }

        // Loop through the orWhere clauses
        foreach ($this->orWhereClauses as $where)
        {
            $query->orWhere($where->column, $where->operator, $where->value);
        }

        // Now do the limiting
        $query->limit($this->limit);

        // Do the offset, if one was provided
        if ($this->offset > 0)
        {
            $query->offset($this->offset);
        }

        // And finally, let's get the items
        $items = $query->get();

        // Tell the class that we've used it before
        $this->queryRan = true;

        if ($items)
        {
            $this->hasItems = true;
            $this->loadItems($items);
            return;
        }

        // The module doesn't have items
        $this->hasItems = false;
    }

    /**
     * Load an array of items into the returned array
     * @param  array $items The database result of items to be loaded
     * @return [type]        [description]
     */
    private function loadItems($items)
    {
        // We want to load the component data into memory now to pass to the
        // newly instantiated PostItem array
        $this->loadComponents();

        $i = 1;
        $this->returnCount = count($items);

        foreach ($items as $item)
        {
            $isFirst = $i == 1 ? true : false; // Set whether the generated PostItem is first in the results
            $isLast = $i == $this->returnCount ? true : false; // Set whether the generated PostItem is last in the results

            $this->returnItems[] = new PostItem($item, $i, $isFirst, $isLast, $this->components);
            $i++;
        }

    }

    public function reset()
    {
        // Reset the whole object
        $this->type = false;
        $this->limit = false;
        $this->whereClauses = [];
        $this->orWhereClauses = [];
        $this->returnItems = [];
        $this->hasItems = false;
        $this->queryRan = false;
        $this->returnCount = false;
    }

    public function resetQuery()
    {
        // We've ran this before, so we need to clear it out
        // $this->type = null;
        // $this->limit = null;
        // $this->whereClauses = [];
        // $this->orWhereClauses = [];
        $this->returnItems = null;
        $this->hasItems = null;
        $this->queryRan = null;
        $this->returnCount = null;

        return true;
    }

    /**
     * Get the first item out of the result set
     * @return Monarkee\Bumble\PostItem
     */
    public function getItem()
    {
        // dd($this->hasItems);
        // dd($this->getItems()[0]);
        if ($this->hasItems())
        {
            return $this->getItems()[0];
        }
    }

    public function offset($amount)
    {
        $this->offset = $amount;

        return $this;
    }

    public function loadComponents()
    {
        $componentsArray = [];

        // Set the component data to be passed to the PostItem
       $moduleId = DB::table('modules')->where('system_name', '=', $this->type)->pluck('id');

       $query = DB::table('components')
       ->where('module_id', '=', $moduleId)
       ->orderBy('sort_order')
       ->get();

       // Loop through each component
       foreach ($query as $row) {
            $this->components[$row->column] = [
                'id' => $row->id,
//                'component_type' => $row->component_type,
                'module_id' => $row->module_id,
                'name' => $row->name,
                'column' => $row->column,
                'display_listing' => $row->display_listing,
                'options' => $row->options,
            ];
       }

       return true;
   }
}