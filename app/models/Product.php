<?php

use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Models\BumbleModel;

class Product extends BumbleModel
{
    public $timestamps = false;

    protected $description = 'A beautiful place to put your entries';

    public $validation = [
        'title' => 'required',
    ];

    public function setComponents()
    {
        $this->components = [
            new TextField('title', [
                'sort'        => 1,
                'description' => 'Fun field for the title to live in',
            ]),
            new TextField('slug', [
                'sort'        => 2,
                'description' => 'A slug is a short label for something, containing only letters, numbers, underscores or hyphens.',
            ]),
            new TextareaField('description', [
                'sort'        => 3,
                'description' => 'The description of the product',
            ]),
        ];
    }
}
