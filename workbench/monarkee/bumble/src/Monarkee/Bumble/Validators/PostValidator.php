<?php namespace Monarkee\Bumble\Validators;

use Monarkee\Bumble\Validators\Validator;

class PostValidator extends Validator
{
    /**
     * The rules to use when creating the module
     * @var array
     */
    public $rules = [
        'active' => 'integer'
    ];

    /**
     * The rules to use when updating the module
     * @var array
     */
    public $updateRules = [
        'active' => 'integer'
    ];
}