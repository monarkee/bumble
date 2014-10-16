<?php namespace Monarkee\Models;

use Monarkee\Bumble\Fields\SlugField;
use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Models\BumbleModel;

class Product extends BumbleModel
{
    public $timestamps = false;

    protected $description = 'A beautiful place to put your entries';

    public $rules = [
        'title' => 'required',
    ];

    public function setComponents()
    {
        $this->components = [
            new TextField('title'),
            new SlugField('slug'),
            new TextareaField('description'),
        ];
    }
}
