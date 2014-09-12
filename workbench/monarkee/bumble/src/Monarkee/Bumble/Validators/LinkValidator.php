<?php namespace Monarkee\Bumble\Validators;

use Monarkee\Bumble\Validators\Validator;

class LinkValidator extends Validator
{
    /**
     * The rules to use when creating the post
     * @var array
     */
    public $rules = [
        'title' => 'required|alpha_num',
        'slug' => 'alpha_dash',
        'link' => 'required|url',
        // 'content' => '',
    ];

    /**
     * The rules to use when updating the post
     * @var array
     */
    public $updateRules = [
        'title' => 'required|alpha_num',
        'slug' => 'alpha_dash',
        'link' => 'required|url',
        // 'content' => '',
    ];
}