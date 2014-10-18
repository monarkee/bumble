<?php namespace Monarkee\Models;

use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Fieldset\Fieldset;
use Monarkee\Bumble\Models\BumbleModel;

class Homepage extends BumbleModel
{
    public $rules = [
        'title' => 'required',
    ];

    public function setComponents()
    {
        return new Fieldset([
            new TextField('title'),
            new TextField('feature_1_title'),
            new TextareaField('featured_1_content'),
            new TextField('feature_2_title'),
            new TextareaField('featured_2_content'),
        ]);
    }
}
