<?php namespace Monarkee\Models;

use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Monarkee\Bumble\Fields\BinaryField;
use Monarkee\Bumble\Fields\SlugField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Fieldset\Fieldset;
use Monarkee\Bumble\Models\BumbleModel;

class Tag extends BumbleModel
{
    use SoftDeletingTrait;

    protected $description = 'Tags are ways to organize things';

    public $rules = [
        'slug' => 'required',
    ];

    public function setComponents()
    {
        $this->fieldset = new Fieldset([
            new SlugField('slug'),
        ]);
    }
}
