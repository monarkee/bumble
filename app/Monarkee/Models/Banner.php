<?php namespace Monarkee\Models;

use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Fieldset\Fieldset;
use Monarkee\Bumble\Models\BumbleModel;

class Banner extends BumbleModel
{
    public $rules = [
        'title' => 'required',
        'link'  => 'url',
        'content' => 'required',
    ];

    public function setComponents()
    {
        return new Fieldset([
            new TextField('title'),
            new TextField('link'),
            new TextareaField('content'),
        ]);
    }
}
