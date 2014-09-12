<?php namespace Monarkee\Bumble\Validators;

use Monarkee\Bumble\Validators\Validator;

class ComponentValidator extends Validator
{
    /**
     * The rules to use when creating the component
     * @var array
     */
    public $rules = [
        // 'component_type_id' => 'required|integer',
        'component_type' => 'required|alpha',
        'module_id' => 'required|integer',
        'name' => 'required|unique:modules',
        'column' => 'required|alpha_dash',
        'sort_order' => 'required',
    ];

    /**
     * The rules to use when updating the component
     * @var array
     */
    public $updateRules = [
        // 'component_type_id' => 'required|integer',
        'component_type' => 'required|alpha',
        'module_id' => 'required|integer',
        'name' => 'required|unique:modules,name,',
        'column' => 'required|alpha_dash',
        'sort_order' => 'required',
    ];
}