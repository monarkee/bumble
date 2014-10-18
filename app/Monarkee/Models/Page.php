<?php namespace Monarkee\Models;

use Monarkee\Bumble\Fields\DateTimeField;
use Monarkee\Bumble\Fields\SlugField;
use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Fieldset\Fieldset;
use Monarkee\Bumble\Models\BumbleModel;

class Page extends BumbleModel
{
    public $showInTopNav = true;

    protected $description = 'Pages are ways to pages of content';

    public $rules = [
        'title' => 'required',
        'slug' => 'required',
    ];

    public function setComponents()
    {
        return new Fieldset([
            'title' => [
                new TextField('title'),
                new SlugField('slug'),
            ],
            'content' => [
                new TextareaField('content'),
            ],
        ]);
    }
}
