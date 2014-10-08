<?php namespace Monarkee\Models;

use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Models\BumbleModel;

class Setting extends BumbleModel
{
    protected $showInTopNav = true;

    protected $description = 'Place your site settings here and use them throughout your app';

    public $validation = [
        'key' => 'required|unique:settings',
        'value' => 'required',
    ];

    public function setComponents()
    {
        $this->components = array(
            new TextField('key'),
            new TextField('value'),
            new TextareaField('description'),
        );
    }
}
