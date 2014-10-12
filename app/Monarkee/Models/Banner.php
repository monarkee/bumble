<?php namespace Monarkee\Models;

use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Models\BumbleModel;

class Banner extends BumbleModel
{
    public $validation = [
        'title' => 'required',
        'link'  => 'url',
        'content' => 'required',
    ];

    public function setComponents()
    {
        $this->components = [
            new TextField('title'),
            new TextField('link'),
            new TextareaField('content'),
        ];
    }
}
