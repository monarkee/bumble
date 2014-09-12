<?php namespace Monarkee\Bumble\Validators;

use Monarkee\Bumble\Validators\Validator;

class SettingsValidator extends Validator
{
    /**
     * The rules to use when creating the setting
     * @var array
     */
    public $rules = [
        'key' => 'required|alpha_dash',
        'value' => 'required',
        // 'description' => 'required',
    ];

    /**
     * The rules to use when updating the setting
     * @var array
     */
    public $updateRules = [
        'key' => 'required|alpha_dash',
        'value' => 'required',
        // 'description' => '',
    ];
}