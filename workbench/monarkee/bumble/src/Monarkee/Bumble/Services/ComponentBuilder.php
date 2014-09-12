<?php namespace Monarkee\Bumble\Services;

use Monarkee\Bumble\Exceptions\ValidationException;
use Monarkee\Bumble\Validators\ComponentValidator;
use Monarkee\Bumble\Services\TableBuilder;
use Monarkee\Bumble\Models\Component;
use Monarkee\Bumble\Models\Module;
use Schema;

class ComponentBuilder
{
    public function __construct(TableBuilder $tableBuilder, ComponentValidator $validator)
    {
        $this->validator = $validator;
        $this->tableBuilder = $tableBuilder;
    }

    /**
     * Create a Component
     * @param  array $component An array of Input to use to create the component
     * @return boolean Did it work?
     */
    public function createComponent($component)
    {
        // Get the module's table name
        $tableName = Module::whereId($component['module_id'])->pluck('system_name');

        // If the component and the column don't exist, then add them
        if (!(Component::whereModuleId($component['module_id'])
            ->whereComponentType($component['component_type'])
            ->first() and Schema::hasColumn($tableName, $component['column'])))
        {
            // Validate
            $this->validator->validateForCreate($component);

            // Set up the options field for the component
            $component['options'] = serialize([
                'display_listing' => isset($component['display_listing']) ? 1 : 0,
            ]);

            // Set up the validation field for the component
            $component['validation'] = json_encode([
                'validation_string' => $component['validation_string'],
            ]);

            // TEMPORARY, use the serialized options instead one day
            $component['display_listing'] = isset($component['display_listing']) and $component['display_listing'] == 'on' ? '1' : '0';

            // Add the component to the components table
            $newComponent = Component::create($component);

            // Add column to the table
            $this->tableBuilder->addColumn($tableName, $component['column'], $newComponent->columnType());

            return true;
        }

        return false;
    }

    /**
     * Delete a component (Not implmented yet)
     * @param  array $component ('module_id', 'id', 'column')
     * @return bool false
     */
    public function deleteComponent($component)
    {
        // Get the module's table name
        $tableName = Module::whereId($component['module_id'])->pluck('system_name');

        // Remove component from the components table
        Component::find($component['id'])->delete();

        // Delete the Column from the table
        $this->tableBuilder->removeColumn($tableName, $component['column']);
    }

    /**
     * Update the component
     * @param  array $component An array of details about the component
     * @return boolean Did it work?
     */
    public function updateComponent($component)
    {
        // Validate
        $this->validator->validateForUpdate($component);

        // Get the original component's info
        $originalComponent = Component::find($component['id']);

        // Store the originalComponent's column name
        $originalComponentColumnName = $originalComponent->column;

        // Get the module's table name
        $tableName = Module::whereId($component['module_id'])->pluck('system_name');

        // Save the validation rules for the component
        $component['validation'] = serialize([
            'validation_string' => $component['validation_string'],
        ]);

        $component['display_listing'] = isset($component['display_listing']) and $component['display_listing'] == 'on' ? '1' : '0';

        // Update component in the components table
        $originalComponent->update($component);

        // If the column name has changed, then rename the column
        if ($originalComponentColumnName != $component['column']) {
            $this->tableBuilder->renameColumn($tableName, $originalComponentColumnName, $component['column']);
        }

        return true;
    }
}
