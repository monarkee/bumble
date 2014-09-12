<?php namespace Monarkee\Bumble\Services;

use Monarkee\Bumble\Validators\ModuleValidator;
use Monarkee\Bumble\Services\TableBuilder;
use Monarkee\Bumble\Models\Module;

class ModuleBuilder
{
    public function __construct(TableBuilder $tableBuilder, ModuleValidator $validator)
    {
        $this->validator = $validator;
        $this->tableBuilder = $tableBuilder;
    }

    public function createModule($input)
    {
        // Validate
        $this->validator->validateForCreate($input);

        // Create the table
        $this->tableBuilder->createTable($input['system_name']);

        // Create the module in the system
        $module = new Module;
        $module->name = $input['name'];
        $module->system_name = $input['system_name'];
        $module->sort_column = $input['sort_column'];
        $module->sort_order = $input['sort_order'];
        $module->description = $input['description'];
        $module->active = isset($input['active']) ? 1 : 0;
        $module->save();
    }

    public function updateModule($id, $input)
    {
        // Get the module from the DB
        $module = Module::findorFail($id);

        // Update the model's rules to ignore the current module's ID
        $this->validator->updateRules['name'] = 'required|unique:modules,name,' . $module->id;
        $this->validator->updateRules['system_name'] = 'required|system_name|unique:modules,system_name,' . $module->id;

        // Validate
        $this->validator->validateForUpdate($input);

        // Save the old table name!
        $oldTableName = $module->system_name;

        $module->name = $input['name'];
        $module->system_name = $input['system_name'];
        $module->sort_column = $input['sort_column'];
        $module->sort_order = $input['sort_order'];
        $module->description = $input['description'];
        $module->active = isset($input['active']) ? 1 : 0;

        // Save the module
        $module->save();

        // Update the table name if needed
        if ($oldTableName !== $input['system_name'])
        {
            $this->tableBuilder->renameTable($oldTableName, $input['system_name']);
        }
    }
}