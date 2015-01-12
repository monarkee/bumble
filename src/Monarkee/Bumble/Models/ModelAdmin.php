<?php namespace Monarkee\Bumble\Models;

class ModelAdmin
{
    /**
     * Whether the model should be hidden from the CMS
     *
     * @var
     */
    public $invisible;

    /**
     * Whether to show the model in the top nav
     *
     * @var bool
     */
    public $showInTopNav = false;

    /**
     * The validation rules used for creation and updating
     *
     * @var
     */
    public $rules = [];

    /**
     * The editing title key for the model
     *
     * @var
     */
    public $editingTitle;

    /**
     * The edit validation rules
     *
     * @var
     */
    public $editRules;
}