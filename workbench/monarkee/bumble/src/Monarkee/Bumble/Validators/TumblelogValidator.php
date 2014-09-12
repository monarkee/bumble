<?php namespace Monarkee\Bumble\Validators;

use Monarkee\Bumble\Validators\Validator;

class TumblelogValidator extends Validator
{
    /**
     * The rules to use when creating the post
     * @var array
     */
    public $rules = [
        'title' => 'alpha_num',
        'slug' => 'alpha_dash',
    ];

    /**
     * The rules to use when updating the post
     * @var array
     */
    public $updateRules = [
        'title' => 'alpha_num',
        'slug' => 'alpha_dash',
    ];
}