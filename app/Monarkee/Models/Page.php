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
        $this->fieldset = new Fieldset([
            new TextField('title'),
            new SlugField('slug'),
            new TextareaField('content'),
            new DateTimeField('created_at'),
            new DateTimeField('updated_at'),
        ]);
    }
}
