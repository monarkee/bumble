<?php namespace Monarkee\Models;

use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Models\BumbleModel;

class Page extends BumbleModel
{
    public $showInTopNav = true;

    protected $description = 'Pages are ways to pages of content';

    public $validation = [
        'title' => 'required',
        'slug' => 'required',
    ];

    public function setComponents()
    {
        $this->components = [
            new TextField('title', [
                'sort'          => 1,
                'description'   => 'The title of the Page',
            ]),
            new TextField('slug', [
                'sort'          => 2,
            ]),
            new TextareaField('content', [
                'sort'          => 3,
            ]),
            new TextField('created_at', [
                'sort'          => 4,
            ]),
            new TextField('updated_at', [
                'sort'          => 5,
            ]),
        ];
    }
}
