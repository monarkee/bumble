<?php namespace Monarkee\Bumble\Validators;

use Monarkee\Bumble\Validators\Validator;

class ModuleValidator extends Validator
{
    /**
     * The rules to use when creating the module
     * @var array
     */
    public $rules = [
        'name' => 'required|unique:modules',
        'system_name' => 'required|unique:modules|system_name',
        'sort_column' => 'required',
        'sort_order' => 'required|integer',
    ];

    /**
     * The rules to use when updating the module
     * @var array
     */
    public $updateRules = [
        'name' => 'required|unique:modules,name,',
        'system_name' => 'required|system_name|unique:modules,system_name,',
        'sort_column' => 'required',
        'sort_order' => 'required|integer',
    ];
}