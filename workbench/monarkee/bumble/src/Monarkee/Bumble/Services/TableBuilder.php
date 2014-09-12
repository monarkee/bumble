<?php namespace Monarkee\Bumble\Services;

use Schema;

class TableBuilder
{
    public function renameTable($oldTableName, $newTableName)
    {
        Schema::rename($oldTableName, $newTableName);
    }

    /**
     * Create a Table
     * @param  string  $tableName     The name of the table to create
     * @param  array $fields          An array of columns to create
     * @param  boolean $columnValues  An array of optional values (if enum)
     * @return boolean                Did it work?
     */
    public function createTable($tableName, $columns = false, $columnValues = false)
    {
        Schema::create($tableName, function($table) use ($columns, $columnValues)
        {
            $table->increments('id');

            // We have to generate these statements: $table->string('email');
            if (!empty($columns))
            {
                foreach ($columns as $type => $columnName)
                {
                    if ($type === 'enum')
                    {
                        $table->enum($columnName, $columnValues[$columnName]);
                    }
                    else
                    {
                        $table->$type($columnName);
                    }
                }
            }

            $table->boolean('active')->default(1); // We always add an active field
            $table->softDeletes();
            $table->timestamps();
        });

        return true;
    }

    /**
     * Add columns to the database
     * @param string $tableName The name of the table you wish to alter
     * @param string $column    The name of the column to add
     * @param string $type      The name of the Laravel-specific method to call
     * @return void
     */
    public function addColumn($tableName, $column, $type)
    {
        Schema::table($tableName, function($table) use ($type, $column)
        {
            $table->$type($column);
        });

        return true;
    }

    /**
     * Remove multiple columns from the database
     * @param  string $tableName The name of the table to alter
     * @param  string $column    The name of the column name you wish to remove
     * @return void
     */
    public function removeColumns($tableName, $columns)
    {
        Schema::table($tableName, function($table) use ($columns)
        {
            // We have to generate these statements: $table->string('email');
            foreach ($columns as $column)
            {
                $table->dropColumn($column);
            }
        });
    }

    /**
     * Remove a single column
     * @param  string $tableName The name of the table to alter
     * @param  string $column    The name of the column name you wish to remove
     * @return void
     */
    public function removeColumn($tableName, $column)
    {
        return $this->removeColumns($tableName, [$column]);
    }

    /**
     * Rename a column
     * @param  string $tableName  The name of the table to alter
     * @param  string $columnFrom The name of the column to rename
     * @param  string $columnTo   The new name of the changed column
     * @return void
     */
    public function renameColumn($tableName, $columnFrom, $columnTo)
    {
        Schema::table($tableName, function($table) use ($columnFrom, $columnTo)
        {
            $table->renameColumn($columnFrom, $columnTo);
        });
    }
}