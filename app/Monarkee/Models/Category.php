<?php namespace Monarkee\Models;

use Monarkee\Bumble\Fields\SlugField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Fieldset\Fieldset;
use Monarkee\Bumble\Models\BumbleModel;

class Category extends BumbleModel
{
    public $rules = [
        'title' => 'required',
    ];

    /**
     * @return mixed
     */
    public function setComponents()
    {
        $this->fieldset = new Fieldset([
            new TextField('title'),
            new SlugField('slug', [
                'set_from' => 'title'
            ]),
        ]);
    }
}
