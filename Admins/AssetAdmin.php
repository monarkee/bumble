<?php namespace Monarkee\Bumble\Admins;

use Monarkee\Bumble\Fields\ImageField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Fieldset\Fieldset;
use Monarkee\Bumble\Models\ModelAdmin;

class AssetAdmin extends ModelAdmin
{
    public function setFields()
    {
        return new Fieldset(
            [
                new TextField('title'),
                new ImageField('image')
            ]
        );
    }
}
