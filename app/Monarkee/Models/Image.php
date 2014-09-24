<?php namespace Monarkee\Models;

use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Monarkee\Bumble\Fields\ImageField;
use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Models\BumbleModel;

class Image extends BumbleModel
{

    use SoftDeletingTrait;

    public $validation = [
        'image' => 'required',
    ];

    public function setComponents()
    {
        $this->components = [
            new TextField('title'),
            new TextareaField('content', [
                'description' => 'Describe the image'
            ]),
            new ImageField('image', [
                'upload_to'       => 'uploads/images',
                'sort'            => 5,
                'anonymize'       => true
            ]),
        ];
    }
}
