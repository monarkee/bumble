<?php namespace Monarkee\Models;

use Monarkee\Bumble\Fields\IntField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Models\BumbleModel;

class Tag extends BumbleModel
{
    public $timestamps = false;

    protected $description = 'Tags are ways to organize things';

    public $validation = [
        'slug' => 'required',
    ];

    public function setComponents()
    {
        $this->components = [
            new TextField('slug', [
                'sort'          => '1',
                'description'   => 'The tag',
            ]),
        ];
    }
}
